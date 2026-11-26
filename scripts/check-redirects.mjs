// Batería de redirecciones y comprobaciones de servidor contra un sitio ya
// desplegado (producción por defecto). Sin dependencias.
//
// Uso:
//   node scripts/check-redirects.mjs                    # contra https://mariadimitropouloulopez.com
//   node scripts/check-redirects.mjs --base=http://localhost:8080   # Apache local
//   node scripts/check-redirects.mjs --csv=urls-antiguas-wordpress.csv
//   node scripts/check-redirects.mjs --report           # escribe docs/REDIRECCIONES-VERIFICACION.md
//   --delay=1200  ms entre peticiones (secuenciales). ⚠️ No bajarlo: el 26/11/2026
//   una ráfaga de 4 en paralelo dejó la IP sin conexión con el servidor de Nicalia.
//
// Qué prueba:
//   1. Las URLs antiguas del WordPress (9 páginas + 49 posts) en forma
//      codificada (minúsculas, como las guardaba WordPress, y mayúsculas, como
//      las envía un navegador), con y sin barra final, y —solo contra
//      producción— por http:// y por www. Primer salto sin seguir la
//      redirección (código + Location) y luego la cadena completa.
//   2. Rutas de WordPress (category, tag, feed, ?p=, ?page_id=, wp-*), sitemaps
//      antiguos y rutas sin prefijo de idioma.
//   3. robots.txt, sitemap-index.xml y sitemaps (Content-Type, y que ninguna
//      URL del sitemap redirija ni dé error).
//   4. Plausible en cada página del sitemap y en las 404, y noindex donde toca.
//
// Fuente de las URLs antiguas: --csv (columna ruta_antigua) si se pasa; si no,
// las tablas de docs/REDIRECCIONES-WORDPRESS.md (secciones 1 y 2), que se
// generaron a partir de ese CSV. El destino esperado sale del mismo documento,
// no del .htaccess, para que una regla que falte se detecte.
//
// Sale con código 1 si alguna comprobación con resultado esperado falla.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const args = Object.fromEntries(
	process.argv.slice(2).map((a) => {
		const [k, ...v] = a.replace(/^--/, '').split('=');
		return [k, v.length ? v.join('=') : true];
	}),
);
const read = (p) => readFileSync(join(ROOT, p), 'utf8');

const SITE = /const SITE = '([^']+)'/.exec(read('src/consts.ts'))[1];
const PLAUSIBLE = /PLAUSIBLE_SCRIPT = '([^']+)'/.exec(read('src/consts.ts'))[1];
const BASE = String(args.base ?? SITE).replace(/\/$/, '');
const IS_PROD = BASE === SITE;
const HOST = new URL(SITE).host;
const UA = 'maria-astro-check-redirects/1.0';
const abs = (p) => `${SITE}${p}`;

// ---------- URLs antiguas ----------
function fromDoc() {
	const doc = read('docs/REDIRECCIONES-WORDPRESS.md');
	const s1 = doc.split('## 1.')[1].split('## 2.')[0];
	const s2 = doc.split('## 2.')[1].split('## 3.')[0];
	const pages = [...s1.matchAll(/^\| `([^`]+)` \| `([^`]+)` \|/gm)].map((m) => ({ type: 'página', path: m[1], dest: m[2] }));
	// «· **410**» al final de la línea = anuncio pasado retirado con 410 (opción D).
	const posts = [...s2.matchAll(/^- `([^`]+)` · (\d+)( · \*\*410\*\*)?/gm)].map((m) => ({ type: 'post', path: m[1], id: m[2], dest: m[3] ? null : '/nea/', gone: Boolean(m[3]) }));
	return [...pages, ...posts];
}

function fromCsv(file) {
	// CSV simple con cabecera; admite comillas dobles.
	const rows = readFileSync(resolve(file), 'utf8').replace(/^﻿/, '').trim().split(/\r?\n/).map((line) => {
		const out = []; let cur = ''; let q = false;
		for (const ch of line) {
			if (ch === '"') q = !q; else if (ch === ',' && !q) { out.push(cur); cur = ''; } else cur += ch;
		}
		return [...out, cur];
	});
	const head = rows.shift().map((h) => h.trim().toLowerCase());
	const col = (...names) => head.findIndex((h) => names.includes(h));
	const iPath = col('ruta_antigua');
	if (iPath < 0) throw new Error('El CSV no tiene la columna ruta_antigua');
	const iType = col('tipo', 'post_type', 'type');
	const iStatus = col('estado', 'status', 'post_status');
	const iId = col('id', 'wp_id', 'post_id');
	const docMap = new Map(fromDoc().map((u) => [u.path, u]));
	return rows
		.filter((r) => iStatus < 0 || /publish/i.test(r[iStatus]))
		.filter((r) => iType < 0 || /^(page|post|página)$/i.test(r[iType]))
		.map((r) => {
			const path = safeDecode(r[iPath]);
			const known = docMap.get(path);
			return { type: known?.type ?? r[iType] ?? '?', path, id: iId >= 0 ? r[iId] : known?.id, dest: known?.dest ?? null, gone: known?.gone ?? false };
		});
}

const safeDecode = (p) => { try { return decodeURIComponent(p); } catch { return p; } };
const encLower = (p) => p.split('/').map((s) => encodeURIComponent(s).replace(/%[0-9A-F]{2}/g, (x) => x.toLowerCase())).join('/');
const encUpper = (p) => p.split('/').map((s) => encodeURIComponent(s)).join('/');
const noSlash = (p) => (p === '/' ? p : p.replace(/\/$/, ''));

// ---------- peticiones ----------
const DELAY = Number(args.delay ?? 1200);
const slowFor = (url) => (url.startsWith(SITE) || url.includes(`www.${new URL(SITE).host}`) || url.startsWith(`http://${new URL(SITE).host}`) ? Math.max(DELAY, 1200) : DELAY); // ms entre peticiones: el hosting compartido bloquea IPs por ráfagas
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let consecutiveErrors = 0;
async function hit(url) {
	if (consecutiveErrors >= 3) return { code: 'ABORT', location: null, type: null };
	await sleep(slowFor(url));
	for (const method of ['HEAD', 'GET']) {
		try {
			const res = await fetch(url, { method, redirect: 'manual', headers: { 'user-agent': UA }, signal: AbortSignal.timeout(20000) });
			if (method === 'HEAD' && (res.status === 405 || res.status === 501)) continue;
			if (method === 'GET') await res.arrayBuffer();
			consecutiveErrors = 0;
			return { code: res.status, location: res.headers.get('location'), type: res.headers.get('content-type') };
		} catch (e) {
			if (method === 'GET') {
				if (++consecutiveErrors === 3) console.error('⛔ 3 errores de conexión seguidos: se detiene la batería (¿bloqueo del cortafuegos?).');
				return { code: 'ERR', location: null, type: null, error: e.cause?.code ?? e.message };
			}
		}
	}
}

async function hitRetry(url) {
	const r = await hit(url);
	return r.code === 'ERR' ? { ...(await hit(url)), retried: true } : r;
}

async function chain(url) {
	const first = await hitRetry(url);
	let cur = first; let at = url; let hops = 0;
	while (cur.location && hops < 10 && String(cur.code).startsWith('3')) {
		at = new URL(cur.location, at).href;
		// Contra un servidor local, los destinos absolutos de producción se
		// resuelven en local: nunca se lanzan ráfagas contra producción.
		if (!IS_PROD) at = at.replace(SITE, BASE);
		hops++;
		cur = await hitRetry(at);
	}
	return { url, code: first.code, location: first.location, hops, final: at, finalCode: cur.code, ctype: cur.type };
}

async function pool(items, fn, n = 1) {
	const out = new Array(items.length); let i = 0;
	await Promise.all(Array.from({ length: n }, async () => {
		while (i < items.length) { const k = i++; out[k] = await fn(items[k], k); }
	}));
	return out;
}

// ---------- 1. URLs antiguas ----------
const old = args.csv ? fromCsv(args.csv) : fromDoc();
const origins = IS_PROD ? [['https', `https://${HOST}`], ['http', `http://${HOST}`], ['www', `https://www.${HOST}`]] : [['base', BASE]];
const cases = [];
for (const u of old) {
	if (u.path === '/') continue; // la home no redirige
	for (const [oname, origin] of origins) {
		for (const [ename, enc] of [['wp', encLower], ['nav', encUpper]]) {
			if (oname !== 'https' && oname !== 'base' && ename === 'nav') continue; // http/www: basta con una codificación
			for (const slash of oname === 'http' || oname === 'www' ? [true] : [true, false]) {
				const p = enc(slash ? u.path : noSlash(u.path));
				cases.push({ ...u, variant: `${oname}·${ename === 'wp' ? 'cod. minúsc.' : 'cod. mayúsc.'}·${slash ? 'con /' : 'sin /'}`, url: origin + p, expected: u.gone ? { code: 410, hops: 0 } : u.dest && { code: 301, location: abs(u.dest), hops: 1, finalCode: 200 } });
			}
		}
	}
}

// ---------- 2. Rutas de WordPress, sitemaps antiguos y sin prefijo ----------
const extra = [
	['WordPress', '/category/blog/', { code: 301, location: abs('/nea/') }],
	['WordPress', '/category/εκδηλώσεις/', { code: 301, location: abs('/nea/') }],
	['WordPress', '/tag/mindfulness/', { code: 301, location: abs('/nea/') }],
	['WordPress', '/feed/', { code: 301, location: abs('/nea/') }],
	['WordPress', '/comments/feed/', { code: 301, location: abs('/nea/') }],
	['WordPress', '/?p=2178', { code: 301, location: abs('/nea/'), hops: 1, finalCode: 200 }],
	['WordPress', '/?page_id=1681', { code: 301, location: abs('/programmata/mindful-parenting/'), hops: 1, finalCode: 200 }],
	['WordPress', '/?page_id=4000', { code: 301, location: abs('/synedries/goneiki-oikogeneiaki-therapeia/'), hops: 1, finalCode: 200 }],
	['WordPress', '/?attachment_id=6', { code: 410 }],
	// wp-login.php y xmlrpc.php solo con --wp-probes: los cortafuegos de hosting
	// (Imunify360/CSF) bloquean la IP que los pide.
	...(args['wp-probes'] ? [['WordPress', '/wp-login.php', { code: 410 }], ['WordPress', '/xmlrpc.php', { code: 410 }]] : []),
	['WordPress', '/wp-admin/', { code: 410 }],
	['WordPress', '/wp-content/uploads/2021/01/ejemplo.jpg', { code: 410 }],
	['WordPress', '/wp-json/', null],
	['WordPress', '/author/admin/', null],
	['WordPress', '/page/2/', null],
	['Sitemap antiguo', '/sitemap.xml', { code: 301, location: abs('/sitemap-index.xml'), hops: 1, finalCode: 200 }],
	['Sitemap antiguo', '/sitemap_index.xml', { code: 301, location: abs('/sitemap-index.xml'), hops: 1, finalCode: 200 }],
	['Sitemap antiguo', '/post-sitemap.xml', { code: 301, location: abs('/sitemap-index.xml'), hops: 1, finalCode: 200 }],
	['Sitemap antiguo', '/page-sitemap.xml', { code: 301, location: abs('/sitemap-index.xml'), hops: 1, finalCode: 200 }],
	['Sitemap antiguo', '/category-sitemap.xml', { code: 301, location: abs('/sitemap-index.xml'), hops: 1, finalCode: 200 }],
	['Sitemap antiguo', '/post_tag-sitemap.xml', { code: 301, location: abs('/sitemap-index.xml'), hops: 1, finalCode: 200 }],
	['Sitemap antiguo', '/wp-sitemap.xml', { code: 301, location: abs('/sitemap-index.xml'), hops: 1, finalCode: 200 }],
	['Sitemap antiguo', '/wp-sitemap-posts-post-1.xml', { code: 301, location: abs('/sitemap-index.xml'), hops: 1, finalCode: 200 }],
	['Sin prefijo / WPML', '/contact/', { code: 301, location: abs('/en/contact/'), hops: 1, finalCode: 200 }],
	['Sin prefijo / WPML', '/contact', { code: 301, location: abs('/en/contact/'), hops: 1, finalCode: 200 }],
	['Sin prefijo / WPML', '/contacto/', { code: 301, location: abs('/es/contacto/'), hops: 1, finalCode: 200 }],
	['Sin prefijo / WPML', '/sobre-mi/', { code: 301, location: abs('/es/sobre-mi/'), hops: 1, finalCode: 200 }],
	['Sin prefijo / WPML', '/about/', { code: 301, location: abs('/en/about/'), hops: 1, finalCode: 200 }],
	['Sin prefijo / WPML', '/blog/', null],
	['Sin prefijo / WPML', '/sessions/', { code: 301, location: abs('/en/sessions/'), hops: 1, finalCode: 200 }],
	['Sin prefijo / WPML', '/courses/', { code: 301, location: abs('/en/courses/'), hops: 1, finalCode: 200 }],
	['Sin prefijo / WPML', '/es/servicios/', null],
	['Sin prefijo / WPML', '/en/services/', null],
	['Sin prefijo / WPML', '/es/', { code: 200 }],
	['Sin prefijo / WPML', '/en/', { code: 200 }],
	['404 por idioma', '/no-existe-prueba/', { code: 404 }],
	['404 por idioma', '/es/no-existe-prueba/', { code: 404 }],
	['404 por idioma', '/en/no-existe-prueba/', { code: 404 }],
	['404 por idioma', '/404.html', null],
	['404 por idioma', '/es/404/', null],
	['404 por idioma', '/en/404/', null],
].map(([group, path, expected]) => ({ type: group, path, url: BASE + encUpper(path.split('?')[0]) + (path.includes('?') ? `?${path.split('?')[1]}` : ''), variant: '', expected }));

const ok = (r, e) => {
	if (!e) return null;
	if (e.code && r.code !== e.code) return false;
	if (e.location && r.location !== e.location) return false;
	if (e.hops != null && r.hops !== e.hops) return false;
	if (e.finalCode && r.finalCode !== e.finalCode) return false;
	return true;
};

console.log(`Base: ${BASE} · ${cases.length} variantes de ${old.length - 1} URLs antiguas · ${extra.length} rutas extra`);
const oldRes = await pool(cases, async (c) => { const r = await chain(c.url); return { ...c, ...r, pass: ok(r, c.expected) }; });
const extraRes = await pool(extra, async (c) => { const r = await chain(c.url); return { ...c, ...r, pass: ok(r, c.expected) }; });

// ---------- 3. robots y sitemaps ----------
const getText = async (url) => {
	if (consecutiveErrors >= 3) return { code: 'ABORT', type: null, body: '' };
	await sleep(slowFor(url));
	try {
		const res = await fetch(url, { headers: { 'user-agent': UA }, redirect: 'manual', signal: AbortSignal.timeout(20000) });
		const body = await res.text();
		consecutiveErrors = 0;
		return { code: res.status, type: res.headers.get('content-type'), body };
	} catch (e) {
		consecutiveErrors++;
		return { code: 'ERR', type: null, body: '' };
	}
};
const robots = await getText(`${BASE}/robots.txt`);
const robotsChecks = [
	['robots.txt responde 200', robots.code === 200, String(robots.code)],
	['robots.txt es text/plain', /text\/plain/.test(robots.type ?? ''), robots.type],
	['robots.txt contiene «Allow: /»', /^Allow:\s*\/\s*$/m.test(robots.body), ''],
	['robots.txt no contiene «Disallow: /»', !/^Disallow:\s*\/\s*$/m.test(robots.body), ''],
	['robots.txt declara Sitemap:', /^Sitemap:\s*\S+sitemap-index\.xml/m.test(robots.body), (/^Sitemap:.*$/m.exec(robots.body) ?? [''])[0]],
];
const idx = await getText(`${BASE}/sitemap-index.xml`);
const sitemapFiles = [...idx.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const sitemapChecks = [[`sitemap-index.xml responde 200 (${idx.type})`, idx.code === 200 && /xml/.test(idx.type ?? ''), String(idx.code)]];
const pageUrls = [];
for (const sm of sitemapFiles) {
	const r = await getText(sm.replace(SITE, BASE));
	sitemapChecks.push([`${sm.replace(SITE, '')} responde 200 (${r.type})`, r.code === 200 && /xml/.test(r.type ?? ''), String(r.code)]);
	pageUrls.push(...[...r.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
}
const pageRes = await pool(pageUrls, async (u) => ({ u, ...(await hit(u.replace(SITE, BASE))) }));
const badPages = pageRes.filter((r) => r.code !== 200);
sitemapChecks.push([`Las ${pageUrls.length} URLs del sitemap responden 200 sin redirigir`, badPages.length === 0, badPages.map((r) => `${r.u} → ${r.code} ${r.location ?? ''}`).join('; ')]);

// ---------- 4. Plausible y noindex ----------
const htmlTargets = [...pageUrls.map((u) => u.replace(SITE, BASE)), ...['/nea/', '/es/blog/', '/en/blog/', '/no-existe-prueba/', '/es/no-existe-prueba/', '/en/no-existe-prueba/'].map((p) => BASE + p)];
const htmlRes = await pool(htmlTargets, async (u) => {
	const r = await getText(u);
	return {
		u: u.replace(BASE, ''), code: r.code,
		plausible: r.body.includes(`src="${PLAUSIBLE}"`) && r.body.includes('plausible.init'),
		noindex: /<meta name="robots" content="[^"]*noindex/.test(r.body),
		lang: (/<html[^>]*lang="([^"]+)"/.exec(r.body) ?? [])[1],
	};
});
const noPlausible = htmlRes.filter((r) => !r.plausible);
const unexpectedNoindex = htmlRes.filter((r) => r.noindex && pageUrls.some((u) => u.replace(SITE, '') === r.u));
const plausibleScript = await hit(PLAUSIBLE);
const plausibleChecks = [
	[`El script de Plausible responde 200 (${PLAUSIBLE})`, plausibleScript.code === 200, String(plausibleScript.code)],
	[`Plausible presente en las ${htmlRes.length} páginas probadas (sitemap + blog + 404)`, noPlausible.length === 0, noPlausible.map((r) => r.u).join(', ')],
	['Ninguna URL del sitemap lleva noindex', unexpectedNoindex.length === 0, unexpectedNoindex.map((r) => r.u).join(', ')],
	['El blog «Próximamente» (3 idiomas) lleva noindex', htmlRes.filter((r) => ['/nea/', '/es/blog/', '/en/blog/'].includes(r.u)).every((r) => r.noindex), ''],
	['Las 404 llevan noindex y responden 404', htmlRes.filter((r) => r.u.includes('no-existe')).every((r) => r.noindex && r.code === 404), htmlRes.filter((r) => r.u.includes('no-existe')).map((r) => `${r.u} ${r.code}`).join('; ')],
	['La 404 sale en el idioma de la ruta (lang el / es / en)', htmlRes.filter((r) => r.u.includes('no-existe')).every((r) => r.lang === (r.u.startsWith('/es/') ? 'es' : r.u.startsWith('/en/') ? 'en' : 'el')), htmlRes.filter((r) => r.u.includes('no-existe')).map((r) => `${r.u} ${r.code} lang=${r.lang}`).join('; ')],
];

// ---------- salida ----------
const failed = [...oldRes, ...extraRes].filter((r) => r.pass === false);
const checkFails = [...robotsChecks, ...sitemapChecks, ...plausibleChecks].filter((c) => !c[1]);
const mark = (p) => (p === true ? '✅' : p === false ? '❌' : 'ℹ️');
const short = (u) => (u ? u.replace(SITE, '').replace(`https://www.${HOST}`, 'www:').replace(`http://${HOST}`, 'http:') : '—');
const disp = (u) => { try { return decodeURI(short(u)); } catch { return short(u); } };
const row = (r) => `| ${mark(r.pass)} | ${r.type}${r.id ? ` · wp ${r.id}` : ''} | \`${disp(r.url)}\` ${r.variant ? `<br><small>${r.variant}</small>` : ''} | ${r.code}${r.error ? ` (${r.error})` : ''} | ${r.location ? `\`${disp(r.location)}\`` : '—'} | ${r.hops} | ${r.hops ? `\`${disp(r.final)}\`` : '—'} | ${r.finalCode} |`;

console.log(`URLs antiguas: ${oldRes.filter((r) => r.pass).length}/${oldRes.length} correctas`);
console.log(`Rutas extra: ${extraRes.filter((r) => r.pass).length} correctas, ${extraRes.filter((r) => r.pass === false).length} fallan, ${extraRes.filter((r) => r.pass === null).length} informativas`);
for (const r of failed) console.log(`  ❌ ${disp(r.url)} [${r.variant}] → ${r.code} ${disp(r.location)} (${r.hops} saltos, final ${r.finalCode})`);
for (const c of [...robotsChecks, ...sitemapChecks, ...plausibleChecks]) console.log(`${mark(c[1])} ${c[0]}${c[2] && !c[1] ? ` — ${c[2]}` : ''}`);

if (args.report) {
	const date = new Date().toISOString().slice(0, 10);
	const summary = (rs) => {
		const by = new Map();
		for (const r of rs) by.set(r.path, [...(by.get(r.path) ?? []), r]);
		return [...by.values()].map((g) => ({ ...g[0], allOk: g.every((x) => x.pass), n: g.length, bad: g.filter((x) => !x.pass) }));
	};
	const groups = summary(oldRes);
	const md = `# Verificación de redirecciones en ${IS_PROD ? 'producción' : BASE}

**Generado por** \`node scripts/check-redirects.mjs --report\` el ${date} contra \`${BASE}\`${IS_PROD ? ' (servidor: ver cabecera `server`)' : ''}. No editar a mano: se regenera.

**Fuente de las URLs antiguas:** ${args.csv ? `\`${args.csv}\`` : '`docs/REDIRECCIONES-WORDPRESS.md` (secciones 1 y 2, generadas desde `urls-antiguas-wordpress.csv`; el CSV no está en el repositorio)'}.

## Resumen

| Bloque | Resultado |
|---|---|
| URLs antiguas (${groups.length} × ${origins.length === 3 ? '8 variantes: https cod. minúsc./mayúsc. ± barra, http y www ± barra' : '4 variantes'}) | ${groups.filter((g) => g.allOk).length}/${groups.length} correctas en todas sus variantes (${oldRes.filter((r) => r.pass).length}/${oldRes.length} peticiones) |
| Rutas de WordPress, sitemaps antiguos, sin prefijo, 404 | ${extraRes.filter((r) => r.pass).length} correctas · ${extraRes.filter((r) => r.pass === false).length} fallan · ${extraRes.filter((r) => r.pass === null).length} informativas (sin regla acordada) |
| robots.txt, sitemaps, Plausible, noindex | ${[...robotsChecks, ...sitemapChecks, ...plausibleChecks].length - checkFails.length}/${[...robotsChecks, ...sitemapChecks, ...plausibleChecks].length} correctas |

«Correcta» en una URL antigua = primer salto 301 con \`Location\` absoluta igual al destino acordado, **un solo salto** y destino final 200.

## 1. URLs antiguas del WordPress (una fila por URL; detalle solo de las variantes que fallan)

| | Tipo | URL antigua (decodificada) | Variantes OK | Location (https, cod. minúsc., con /) | Saltos | Código final |
|---|---|---|---|---|---|---|
${groups.map((g) => { const ref = oldRes.find((r) => r.path === g.path && r.variant.startsWith(origins[0][0]) && r.variant.includes('minúsc') && r.variant.includes('con /')); return `| ${mark(g.allOk)} | ${g.type}${g.id ? ` · wp ${g.id}` : ''} | \`${g.path}\` | ${g.n - g.bad.length}/${g.n} | ${ref?.location ? `\`${disp(ref.location)}\`` : ref?.code} | ${ref?.hops} | ${ref?.finalCode} |`; }).join('\n')}

${failed.filter((r) => oldRes.includes(r)).length ? `### Variantes que fallan\n\n| | Tipo | URL | Código | Location | Saltos | Destino final | Código final |\n|---|---|---|---|---|---|---|---|\n${failed.filter((r) => oldRes.includes(r)).map(row).join('\n')}\n` : 'Ninguna variante falla.\n'}
## 2. Rutas de WordPress, sitemaps antiguos, rutas sin prefijo y 404

ℹ️ = sin regla acordada todavía: se documenta lo que responde hoy.

| | Grupo | URL | Código | Location | Saltos | Destino final | Código final |
|---|---|---|---|---|---|---|---|
${extraRes.map(row).join('\n')}

## 3. robots.txt y sitemaps

| | Comprobación | Detalle |
|---|---|---|
${[...robotsChecks, ...sitemapChecks].map((c) => `| ${mark(c[1])} | ${c[0]} | ${c[1] ? '' : c[2]} |`).join('\n')}

## 4. Plausible y noindex

| | Comprobación | Detalle |
|---|---|---|
${plausibleChecks.map((c) => `| ${mark(c[1])} | ${c[0]} | ${c[1] && !c[0].startsWith('Las 404') ? '' : c[2]} |`).join('\n')}

El script de Plausible es el de proyecto (\`pa-….js\`): **no usa \`data-domain\`**; el dominio va asociado al identificador del script en el panel de Plausible. Que el dominio del panel sea \`${HOST}\` hay que comprobarlo en Plausible (no verificable desde aquí).
`;
	writeFileSync(join(ROOT, 'docs/REDIRECCIONES-VERIFICACION.md'), md);
	console.log('→ docs/REDIRECCIONES-VERIFICACION.md');
}

if (consecutiveErrors >= 3) console.error('⛔ Batería interrumpida por errores de conexión: los resultados están incompletos.');
process.exit(failed.length || checkFails.length || consecutiveErrors >= 3 ? 1 : 0);
