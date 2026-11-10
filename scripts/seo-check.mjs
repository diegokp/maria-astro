// Verificación SEO automática de dist/ (fase 7). Sin dependencias.
//
// Uso:
//   npm run seo:check                 # compila para producción, verifica y escribe docs/SEO-VERIFICACION.md
//   node scripts/seo-check.mjs [dist] # solo verifica (por defecto ./dist); --report escribe el informe
//
// Falla (código 1) si hay algún error; las advertencias no hacen fallar. Se
// ejecuta solo tras cada build (postbuild) y adapta las comprobaciones al
// entorno del build:
//   · producción (npm run build:prod): robots.txt permite el rastreo → se
//     verifica todo, incluidos sitemap, llms.txt, .htaccess y Plausible;
//   · preview (npm run build, Vercel): robots.txt bloquea → se verifica que
//     TODO esté noindex y que no haya sitemap, llms.txt ni analítica.
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const args = process.argv.slice(2);
const REPORT = args.includes('--report');
const DIST = resolve(args.find((a) => !a.startsWith('--')) ?? 'dist');
const ROOT = resolve(import.meta.dirname, '..');
const read = (p) => readFileSync(p, 'utf8');

// ---------- configuración leída del proyecto (una sola fuente) ----------
const SITE = /const SITE = '([^']+)'/.exec(read(join(ROOT, 'astro.config.mjs')))[1];
const LOCALES = ['el', 'es', 'en'];
const BLOG_ROUTES = new Set(
	[...(/blog:\s*\{([^}]*)\}/.exec(read(join(ROOT, 'src/i18n/routes.ts')))?.[1] ?? '').matchAll(/'([^']+)'/g)].map((m) => m[1]),
);
const BAD_HOSTS = /(devenlopment\.asdata\.es|localhost|127\.0\.0\.1|\.vercel\.app)/;

// ---------- utilidades ----------
const files = (dir) =>
	readdirSync(dir).flatMap((f) => {
		const p = join(dir, f);
		return statSync(p).isDirectory() ? files(p) : [p];
	});
const urlToFile = (url) => {
	let path = url.replace(SITE, '').split('#')[0].split('?')[0];
	try { path = decodeURI(path); } catch { /* ruta ya decodificada */ }
	return join(DIST, path.endsWith('/') ? `${path}index.html` : path);
};
const langOf = (route) => (route.startsWith('/es/') ? 'es' : route.startsWith('/en/') ? 'en' : 'el');
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const meta = (html, attr, name) =>
	decode((new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`).exec(html) ?? [])[1] ?? '');

// ---------- estado ----------
const errors = [];
const warnings = [];
const matrix = []; // { route, lang, cells: {check: '✅'|'⚠️'|'❌'} }
const fail = (where, msg, cell) => { errors.push(`${where}: ${msg}`); if (cell) cell.status = '❌'; };
const warn = (where, msg, cell) => { warnings.push(`${where}: ${msg}`); if (cell && cell.status !== '❌') cell.status = '⚠️'; };
const makeCells = (names) => Object.fromEntries(names.map((n) => [n, { status: '✅' }]));
const CHECKS = ['lang', 'title', 'description', 'h1', 'canonical', 'hreflang', 'og', 'json-ld', 'robots', 'imágenes', 'enlaces'];

// ---------- entorno del build ----------
if (!existsSync(DIST)) { console.error(`✗ No existe ${DIST}. Ejecuta antes npm run build:prod.`); process.exit(1); }
const robotsTxt = existsSync(join(DIST, 'robots.txt')) ? read(join(DIST, 'robots.txt')) : '';
const PROD = /^User-agent: \*\s*\nAllow: \//m.test(robotsTxt);
if (!robotsTxt) fail('robots.txt', 'no existe');
if (PROD && !/^Sitemap: https:\/\/\S+\/sitemap-index\.xml$/m.test(robotsTxt)) fail('robots.txt', 'no referencia el sitemap con URL absoluta');

// ---------- páginas ----------
const htmlFiles = files(DIST).filter((f) => f.endsWith('.html')).sort();
const pages = new Map(); // route → datos
for (const f of htmlFiles) {
	const rel = '/' + f.slice(DIST.length + 1).replace(/\\/g, '/');
	const route = rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel;
	pages.set(route, { file: f, html: read(f) });
}
const is404 = (route) => route === '/404.html' || route.endsWith('/404/');
const expectNoindex = (route) => is404(route) || BLOG_ROUTES.has(route);

// primera pasada: datos por página (para unicidad y reciprocidad)
for (const [route, p] of pages) {
	const h = p.html;
	p.lang = (/<html[^>]*\blang="([^"]+)"/.exec(h) ?? [])[1];
	p.title = decode((/<title>([\s\S]*?)<\/title>/.exec(h) ?? [])[1] ?? '').trim();
	p.desc = meta(h, 'name', 'description');
	p.canonical = (/<link rel="canonical" href="([^"]+)"/.exec(h) ?? [])[1];
	p.hreflang = Object.fromEntries([...h.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]));
	p.robots = meta(h, 'name', 'robots');
}
const countBy = (key) => {
	const c = new Map();
	for (const [route, p] of pages) if (!is404(route) && p[key]) c.set(p[key], (c.get(p[key]) ?? 0) + 1);
	return c;
};
const titleCount = countBy('title');
const descCount = countBy('desc');

// ---------- comprobaciones por página ----------
for (const [route, p] of pages) {
	const where = route;
	const cells = makeCells(CHECKS);
	const notFound = is404(route);
	const noindex = expectNoindex(route);
	const h = p.html;
	const expectedLang = langOf(route);

	// 1. lang
	if (p.lang !== expectedLang) fail(where, `<html lang="${p.lang}" ≠ "${expectedLang}"`, cells.lang);

	// 2. title
	const tl = [...p.title].length;
	if (!p.title) fail(where, 'sin <title>', cells.title);
	else {
		if (tl > 60) fail(where, `título de ${tl} car. (> 60)`, cells.title);
		else if (tl >= 55) warn(where, `título de ${tl} car. (cerca del límite de 60)`, cells.title);
		if (titleCount.get(p.title) > 1) fail(where, `título duplicado: «${p.title}»`, cells.title);
	}

	// 3. description
	const dl = [...p.desc].length;
	if (!p.desc) fail(where, 'sin meta description', cells.description);
	else {
		if (descCount.get(p.desc) > 1) fail(where, 'meta description duplicada', cells.description);
		if (!notFound && (dl < 150 || dl > 160)) warn(where, `description de ${dl} car. (objetivo 150–160)`, cells.description);
	}

	// 4. h1
	const h1s = (h.match(/<h1[\s>]/g) ?? []).length;
	if (h1s !== 1) fail(where, `${h1s} <h1> (debe haber 1)`, cells.h1);
	const levels = [...h.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
	levels.forEach((l, i) => { if (i && l > levels[i - 1] + 1) warn(where, `salto de encabezados h${levels[i - 1]} → h${l}`, cells.h1); });

	// 5. canonical (las 404 no llevan)
	const expectedCanon = SITE + route;
	if (notFound) {
		if (p.canonical) fail(where, '404 con canonical', cells.canonical);
	} else if (!p.canonical) fail(where, 'sin canonical', cells.canonical);
	else {
		if (!p.canonical.startsWith('https://')) fail(where, 'canonical no absoluto', cells.canonical);
		if (p.canonical !== expectedCanon) fail(where, `canonical ${p.canonical} ≠ ${expectedCanon}`, cells.canonical);
		if (!existsSync(urlToFile(p.canonical))) fail(where, 'el canonical no resuelve a un archivo del build', cells.canonical);
	}

	// 6. hreflang (las 404 no llevan)
	const hl = p.hreflang;
	if (notFound) {
		if (Object.keys(hl).length) fail(where, '404 con hreflang', cells.hreflang);
	} else {
		if (hl[p.lang] !== expectedCanon) fail(where, `hreflang sin autorreferencia (${p.lang})`, cells.hreflang);
		if (!hl['x-default']) fail(where, 'hreflang sin x-default', cells.hreflang);
		for (const [lang, url] of Object.entries(hl)) {
			if (lang !== 'x-default' && !LOCALES.includes(lang)) fail(where, `código hreflang no válido: ${lang}`, cells.hreflang);
			const target = pages.get(url.replace(SITE, ''));
			if (!target) { fail(where, `hreflang ${lang} → ${url} no existe en el build`, cells.hreflang); continue; }
			if (lang !== 'x-default' && !Object.values(target.hreflang).includes(expectedCanon)) fail(where, `hreflang ${lang} no es recíproco (${url} no apunta de vuelta)`, cells.hreflang);
		}
		const missing = LOCALES.filter((l) => !hl[l]);
		if (missing.length) warn(where, `sin traducción: ${missing.join(', ')}`, cells.hreflang);
	}

	// 7. Open Graph y Twitter
	for (const [attr, name] of [['property', 'og:title'], ['property', 'og:description'], ['property', 'og:type'], ['property', 'og:site_name'], ['property', 'og:locale'], ['property', 'og:image'], ['property', 'og:image:alt'], ['name', 'twitter:card'], ['name', 'twitter:image']]) {
		if (!meta(h, attr, name)) fail(where, `falta ${name}`, cells.og);
	}
	if (!notFound && meta(h, 'property', 'og:url') !== expectedCanon) fail(where, 'og:url ≠ canonical', cells.og);
	const ogImage = meta(h, 'property', 'og:image');
	if (ogImage) {
		if (!ogImage.startsWith('https://')) fail(where, 'og:image no absoluta', cells.og);
		else if (!existsSync(urlToFile(ogImage))) fail(where, `og:image no existe en el build: ${ogImage}`, cells.og);
	}
	if (meta(h, 'name', 'twitter:card') !== 'summary_large_image') warn(where, 'twitter:card distinta de summary_large_image', cells.og);

	// 8. JSON-LD (las 404 no llevan)
	const blocks = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
	if (notFound) {
		if (blocks.length) fail(where, '404 con JSON-LD', cells['json-ld']);
	} else if (blocks.length !== 1) fail(where, `${blocks.length} bloques JSON-LD (debe haber 1)`, cells['json-ld']);
	else {
		let data;
		try { data = JSON.parse(blocks[0]); } catch (e) { fail(where, `JSON-LD no es JSON válido: ${e.message}`, cells['json-ld']); }
		if (data) {
			if (data['@context'] !== 'https://schema.org') fail(where, 'JSON-LD sin @context schema.org', cells['json-ld']);
			const graph = data['@graph'] ?? [];
			const ids = new Map();
			for (const n of graph) {
				if (!n['@type']) fail(where, 'nodo JSON-LD sin @type', cells['json-ld']);
				if (n['@id']) ids.set(n['@id'], (ids.get(n['@id']) ?? 0) + 1);
			}
			for (const [id, n] of ids) if (n > 1) fail(where, `@id duplicado: ${id}`, cells['json-ld']);
			const pageNode = graph.find((n) => n['@id'] === expectedCanon);
			if (!pageNode) fail(where, 'JSON-LD sin el nodo de la propia página (@id = canonical)', cells['json-ld']);
			else if (pageNode.inLanguage !== p.lang) fail(where, `inLanguage ${pageNode.inLanguage} ≠ ${p.lang}`, cells['json-ld']);
			const walk = (node, path) => {
				if (typeof node === 'string') {
					if (node === '') fail(where, `JSON-LD con cadena vacía en ${path}`, cells['json-ld']);
					if (/\.(url|item|image|logo|serviceUrl|hasMap)$/.test(path) && !node.startsWith('https://')) fail(where, `URL no absoluta en ${path}: ${node}`, cells['json-ld']);
					if (BAD_HOSTS.test(node)) fail(where, `JSON-LD con host de pruebas en ${path}`, cells['json-ld']);
				} else if (Array.isArray(node)) node.forEach((v, i) => walk(v, `${path}[${i}]`));
				else if (node && typeof node === 'object') {
					const keys = Object.keys(node);
					if (keys.length === 1 && keys[0] === '@id' && !ids.has(node['@id'])) fail(where, `@id sin resolver: ${node['@id']}`, cells['json-ld']);
					if (['Review', 'AggregateRating'].includes(node['@type'])) fail(where, `tipo de schema prohibido: ${node['@type']}`, cells['json-ld']);
					for (const k of keys) walk(node[k], `${path}.${k}`);
				}
			};
			walk(data, '$');
			if (p.lang !== 'el') for (const n of graph) for (const k of ['name', 'description', 'jobTitle']) {
				if (typeof n[k] === 'string' && /[Ͱ-Ͽ]/.test(n[k]) && n['@type'] !== 'Person' && n['@type'] !== 'ProfessionalService') warn(where, `texto griego en ${n['@type']}.${k} de una página ${p.lang}`, cells['json-ld']);
			}
		}
	}

	// 9. robots por página
	const hasNoindex = /noindex/.test(p.robots);
	if (!PROD) {
		if (!/noindex/.test(p.robots) || !/nofollow/.test(p.robots)) fail(where, 'build de preview sin «noindex, nofollow»', cells.robots);
	} else if (noindex && !hasNoindex) fail(where, 'página que debe ser noindex y no lo es', cells.robots);
	else if (!noindex && hasNoindex) fail(where, `página indexable con robots «${p.robots}»`, cells.robots);

	// 10. imágenes
	for (const img of h.match(/<img\b[^>]*>/g) ?? []) {
		if (!/\salt(=|\s|>)/.test(img)) fail(where, `<img> sin atributo alt: ${img.slice(0, 80)}`, cells['imágenes']);
		const src = /\ssrc="([^"]+)"/.exec(img)?.[1];
		if (src && src.startsWith('/') && !existsSync(join(DIST, decodeURI(src.split('?')[0])))) fail(where, `imagen inexistente: ${src}`, cells['imágenes']);
	}

	// 11. enlaces internos y hosts de pruebas
	for (const m of h.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
		const href = decode(m[1]);
		if (/^(mailto:|tel:|#|https?:\/\/(?!mariadimitropouloulopez\.com))/.test(href)) continue;
		if (!existsSync(urlToFile(href.startsWith('/') ? SITE + href : href))) fail(where, `enlace roto: ${href}`, cells.enlaces);
	}
	const stripped = h.replace(/<script[\s\S]*?<\/script>/g, '');
	const bad = BAD_HOSTS.exec(stripped);
	if (bad) fail(where, `referencia a un entorno de pruebas: ${bad[1]}`, cells.enlaces);
	if (/\bTODO\b/.test(stripped.replace(/<[^>]+>/g, ' '))) warn(where, 'texto «TODO» visible en la página', cells.enlaces);

	matrix.push({ route, lang: p.lang, cells });
}

// ---------- comprobaciones del sitio entero ----------
const site = []; // { check, status, detail }
const siteCheck = (check, ok, detail, level = 'error') => {
	const status = ok ? '✅' : level === 'warn' ? '⚠️' : '❌';
	site.push({ check, status, detail });
	if (!ok) (level === 'warn' ? warnings : errors).push(`sitio: ${check} — ${detail}`);
};

siteCheck('robots.txt coherente con el entorno', PROD ? /Allow: \//.test(robotsTxt) : /Disallow: \//.test(robotsTxt), PROD ? 'producción: permite el rastreo' : 'preview: bloquea el rastreo (Disallow: /)');
siteCheck('404 por idioma', ['/404.html', '/es/404/', '/en/404/'].every((r) => pages.has(r)), '/404.html, /es/404/ y /en/404/');
const plausible = [...pages.values()].filter((p) => p.html.includes('plausible.io')).length;
siteCheck('Plausible solo en producción', PROD ? plausible === pages.size : plausible === 0, PROD ? `presente en ${plausible}/${pages.size} páginas` : `ausente (${plausible} páginas lo cargan)`);

const sitemapIndex = join(DIST, 'sitemap-index.xml');
if (PROD) {
	siteCheck('.htaccess en el build', existsSync(join(DIST, '.htaccess')) && /ErrorDocument 404/.test(read(join(DIST, '.htaccess'))), 'con ErrorDocument 404');
	siteCheck('sitemap-index.xml', existsSync(sitemapIndex), 'existe');
	const sitemapUrls = [];
	if (existsSync(sitemapIndex)) {
		for (const m of read(sitemapIndex).matchAll(/<loc>([^<]+)<\/loc>/g)) {
			const f = urlToFile(m[1]);
			if (!existsSync(f)) { siteCheck('archivo del sitemap-index', false, `${m[1]} no existe`); continue; }
			for (const u of read(f).matchAll(/<url>([\s\S]*?)<\/url>/g)) {
				sitemapUrls.push({ loc: /<loc>([^<]+)<\/loc>/.exec(u[1])[1], alts: [...u[1].matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map((a) => a[2]) });
			}
		}
	}
	const inSitemap = new Set(sitemapUrls.map((u) => u.loc));
	const bad = [];
	for (const { loc, alts } of sitemapUrls) {
		const route = loc.replace(SITE, '');
		const page = pages.get(route);
		if (!page) bad.push(`${loc} no existe`);
		else {
			if (page.canonical !== loc) bad.push(`${loc} no es canónica`);
			if (expectNoindex(route) || /noindex/.test(page.robots)) bad.push(`${loc} es noindex`);
		}
		for (const a of alts) if (!pages.has(a.replace(SITE, ''))) bad.push(`alternativa ${a} no existe`);
	}
	siteCheck('URLs del sitemap: existen, canónicas e indexables', bad.length === 0, bad.length ? bad.slice(0, 3).join('; ') : `${sitemapUrls.length} URLs`);
	const missing = [...pages].filter(([r]) => !expectNoindex(r) && !inSitemap.has(SITE + r)).map(([r]) => r);
	siteCheck('toda página indexable está en el sitemap', missing.length === 0, missing.length ? missing.join(', ') : 'completo');

	const llms = join(DIST, 'llms.txt');
	if (!existsSync(llms)) siteCheck('llms.txt', false, 'no existe');
	else {
		const t = read(llms);
		const links = [...t.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map((m) => m[1]);
		const bads = links.filter((u) => !pages.has(u.replace(SITE, '')) || expectNoindex(u.replace(SITE, '')));
		siteCheck('llms.txt: enlaces válidos e indexables', bads.length === 0 && links.length > 0, bads.length ? bads.slice(0, 3).join('; ') : `${links.length} enlaces`);
		siteCheck('llms.txt: formato', /^# .+\n\n> .{1,200}\n/.test(t), 'título, cita (≤ 200 car.) y secciones');
	}
} else {
	siteCheck('sin sitemap, llms.txt ni .htaccess de producción', !existsSync(sitemapIndex) && !existsSync(join(DIST, 'llms.txt')), 'el build de preview no los genera');
}

// cobertura de idioma
const coverage = [];
for (const [route, p] of pages) {
	if (is404(route) || p.lang !== 'el') continue;
	const miss = LOCALES.filter((l) => !p.hreflang[l]);
	if (miss.length) coverage.push(`${route} → falta ${miss.join(', ')}`);
}
siteCheck('cobertura de idioma', coverage.length === 0, coverage.length ? coverage.join('; ') : `${[...pages].filter(([r, p]) => p.lang === 'el' && !is404(r)).length} páginas × 3 idiomas`, 'warn');

// ---------- resultado ----------
const nErr = errors.length, nWarn = warnings.length;
console.log(`\nSEO check · ${PROD ? 'PRODUCCIÓN' : 'preview'} · ${pages.size} páginas · ${nErr} errores · ${nWarn} advertencias`);
for (const e of errors.slice(0, 40)) console.log(`  ✗ ${e}`);
if (errors.length > 40) console.log(`  … y ${errors.length - 40} errores más`);
for (const w of warnings.slice(0, 15)) console.log(`  ! ${w}`);
if (warnings.length > 15) console.log(`  … y ${warnings.length - 15} advertencias más`);

if (REPORT) {
	const lines = [];
	const icon = (c) => c.status;
	const countCells = (lang, st) => matrix.filter((m) => m.lang === lang).reduce((n, m) => n + Object.values(m.cells).filter((c) => c.status === st).length, 0);
	lines.push('# Verificación SEO automática', '',
		`**Fecha:** ${new Date().toISOString().slice(0, 10)} · **Entorno del build:** ${PROD ? 'producción (`npm run build:prod`)' : 'preview (`npm run build`)'} · **Páginas:** ${pages.size}`,
		`**Resultado:** ${nErr === 0 ? '✅ sin errores' : `❌ ${nErr} errores`} · ${nWarn} advertencias`, '',
		'Generado por `scripts/seo-check.mjs` (`npm run seo:check`). Falla el build con código ≠ 0 si hay algún error.', '',
		'## Recuento por idioma', '', '| Idioma | ✅ | ⚠️ | ❌ |', '|---|---|---|---|',
		...LOCALES.map((l) => `| ${l} | ${countCells(l, '✅')} | ${countCells(l, '⚠️')} | ${countCells(l, '❌')} |`), '',
		'## Comprobaciones del sitio', '', '| Comprobación | Estado | Detalle |', '|---|---|---|', ...site.map((s) => `| ${s.check} | ${s.status} | ${s.detail} |`), '');
	if (warnings.length) lines.push('## Advertencias', '', ...warnings.map((w) => `- ${w}`), '');
	if (errors.length) lines.push('## Errores', '', ...errors.map((e) => `- ${e}`), '');
	lines.push('## Matriz página × idioma × comprobación', '', `| Página | ${CHECKS.join(' | ')} |`, `|---|${CHECKS.map(() => '---').join('|')}|`);
	for (const lang of LOCALES) for (const m of matrix.filter((x) => x.lang === lang).sort((a, b) => a.route.localeCompare(b.route))) {
		lines.push(`| \`${m.route}\` (${lang}) | ${CHECKS.map((c) => icon(m.cells[c])).join(' | ')} |`);
	}
	lines.push('', '**Leyenda:** ✅ correcto · ⚠️ advertencia · ❌ error. Las 404 y el blog «Próximamente» son `noindex` por diseño: no llevan canonical, `hreflang` ni JSON-LD (404) y se excluyen del sitemap.', '',
		'**Comprobaciones por página:** `lang` correcto según la ruta · `title` único y ≤ 60 · `description` única de 150–160 · un solo `h1` · `canonical` absoluto y autorreferente · `hreflang` autorreferente, recíproco, con `x-default` y destinos existentes · Open Graph y Twitter completos con imagen existente · JSON-LD válido, con `@id` resueltos y sin cadenas vacías · `robots` coherente con el entorno · `alt` en todas las imágenes · enlaces internos sin romper y sin referencias a entornos de pruebas.', '');
	writeFileSync(join(ROOT, 'docs/SEO-VERIFICACION.md'), lines.join('\n'));
	console.log('  → docs/SEO-VERIFICACION.md');
}
process.exit(nErr ? 1 : 0);
