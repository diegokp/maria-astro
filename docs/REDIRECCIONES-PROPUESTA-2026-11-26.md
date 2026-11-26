# Propuesta de correcciones tras el lanzamiento (fase 2), **sin aplicar**

**Fecha:** 26/11/2026 · **Estado:** ✅ **aprobadas y aplicadas R1–R4 y la opción D de R5** (26/11/2026) en `public/.htaccess`, `public/es/.htaccess` y `public/en/.htaccess`. R1 con 301 (no 410). En R3, `/blog/` sigue sin regla. R5 opción C con los 14 candidatos firmes; los «dudosos» siguen yendo a `/nea/` hasta que María decida. **R6 no aprobada** (no aplicada). `routes.ts` y los slugs no cambian.

**Base:** la batería contra producción (`docs/REDIRECCIONES-VERIFICACION.md`, `scripts/check-redirects.mjs`) y el XML del WordPress (vault AsData, `web-maria/referencias/`). Las **57 redirecciones existentes funcionan** (un solo 301, destino 200, en todas las variantes), así que lo que sigue son huecos, no reglas rotas.

**Sin verificar:** qué 18 URLs tiene Search Console como 404 y cuáles son las 6 `noindex`. Falta la exportación por URL (`docs/gsc/`). Las reglas R1–R3 cubren las causas probables; la clasificación (a)/(b)/(c)/(d) se hará con la exportación.

Todas las reglas nuevas siguen el formato acordado:
- van en el **bloque 0** (antes de HTTPS y barra final), con destino absoluto `https://mariadimitropouloulopez.com/…`;
- **un solo 301** por URL antigua;
- griego en UTF-8;
- los posts se identifican con `# wp <id>`.

---

## R1. Sitemaps antiguos → `/sitemap-index.xml` (prioridad alta)

**Motivo:** el WordPress usaba **Rank Math** (casi 1.000 metadatos `rank_math_*` en el XML), cuyos sitemaps son `sitemap_index.xml`, `post-sitemap.xml`, `page-sitemap.xml`, `category-sitemap.xml` y `post_tag-sitemap.xml`. WordPress publica además `wp-sitemap.xml` por defecto. Todos dan 404 hoy, igual que `/sitemap.xml`, que aparece en Plausible. Si alguno sigue enviado en Search Console o lo piden bots, cada visita es un 404.

**Posición:** bloque 0, dentro de «Archivo y rutas de WordPress», **antes** de la regla `^(wp-admin|wp-content|wp-includes)/`.

```apache
	# Sitemaps antiguos (Rank Math y WordPress) → sitemap nuevo
	RewriteRule ^(sitemap|sitemap_index|wp-sitemap[a-z0-9-]*|(post|page|category|post_tag|attachment|author|local)-sitemap[0-9]*)\.xml$ https://mariadimitropouloulopez.com/sitemap-index.xml [L,R=301]
```

No captura los sitemaps nuevos (`sitemap-index.xml` y `sitemap-0.xml` llevan guion, no coinciden). Alternativa: `[G]` (410) si prefieres que Google los olvide en lugar de seguirlos.

## R2. URLs cortas por id (`?page_id=`, `?p=`, `?attachment_id=`) (prioridad media)

**Motivo:** hoy responden **200 con la home** (la home ignora la query). Comprobado con `?page_id=1681`, `?p=2178` y `?attachment_id=6`. Para Google son duplicados de la home (el canonical apunta a `/`, así que el daño es pequeño), y quien llega con un enlace corto no ve lo que buscaba. Los ids salen del XML.

**Posición:** bloque 0, justo después de «Páginas». `RewriteRule` no ve la query, así que se usa `RewriteCond %{QUERY_STRING}`. El `?` final del destino quita la query original; funciona igual en Apache y en LiteSpeed, sin depender de `QSD`.

```apache
	# --- URLs cortas por id (?page_id=, ?p=, ?attachment_id=), ids del XML de WordPress
	RewriteCond %{QUERY_STRING} ^page_id=1659$
	RewriteRule ^$ https://mariadimitropouloulopez.com/? [L,R=301]
	RewriteCond %{QUERY_STRING} ^page_id=(1681|3045)$
	RewriteRule ^$ https://mariadimitropouloulopez.com/programmata/mindful-parenting/? [L,R=301]
	RewriteCond %{QUERY_STRING} ^page_id=2561$
	RewriteRule ^$ https://mariadimitropouloulopez.com/es/sesiones/? [L,R=301]
	RewriteCond %{QUERY_STRING} ^page_id=3700$
	RewriteRule ^$ https://mariadimitropouloulopez.com/synedries/? [L,R=301]
	RewriteCond %{QUERY_STRING} ^page_id=3921$
	RewriteRule ^$ https://mariadimitropouloulopez.com/nea/? [L,R=301]
	RewriteCond %{QUERY_STRING} ^page_id=4000$
	RewriteRule ^$ https://mariadimitropouloulopez.com/synedries/goneiki-oikogeneiaki-therapeia/? [L,R=301]
	RewriteCond %{QUERY_STRING} ^page_id=4011$
	RewriteRule ^$ https://mariadimitropouloulopez.com/synedries/psychotherapeftiki-ypostirixi/? [L,R=301]
	RewriteCond %{QUERY_STRING} ^page_id=4033$
	RewriteRule ^$ https://mariadimitropouloulopez.com/programmata/? [L,R=301]
	# Posts: ?p=<id> al blog griego. Al republicar un post, añadir ENCIMA de esta
	# regla su propia pareja (# wp <id> + RewriteCond ^p=<id>$) hacia la URL nueva.
	RewriteCond %{QUERY_STRING} ^p=[0-9]+$
	RewriteRule ^$ https://mariadimitropouloulopez.com/nea/? [L,R=301]
	# Páginas de adjuntos (624 imágenes del WordPress): sin equivalente → 410
	RewriteCond %{QUERY_STRING} (^|&)attachment_id=[0-9]+
	RewriteRule ^$ - [G]
```

| id | Página antigua | Destino (igual que su URL bonita) |
|---|---|---|
| 1659 | `/` (home) | `/` |
| 1681 | `/mindful-parenting/` | `/programmata/mindful-parenting/` |
| 2561 | `/servicios/` | `/es/sesiones/` |
| 3045 | `/mindfulparentingcourse/` | `/programmata/mindful-parenting/` |
| 3700 | `/υπηρεσίες/` | `/synedries/` |
| 3921 | `/τελευταία-νέα/` | `/nea/` |
| 4000 | `/συμβουλευτική-γονέων/` | `/synedries/goneiki-oikogeneiaki-therapeia/` |
| 4011 | `/mindfulness/` | `/synedries/psychotherapeftiki-ypostirixi/` |
| 4033 | `/eπιμόρφωση-επαγγελματιών/` | `/programmata/` |

- **`?p=`:** uso una regla genérica en vez de 49 líneas, para no duplicar el bloque de posts. Los 21 borradores también caen en ella; nunca fueron públicos, así que no molesta. Cuando un post se republique, se le añade su línea específica `# wp <id>` encima de la genérica.
- **`?attachment_id=`:** propongo 410 porque no hay página nueva equivalente. La alternativa es un 301 a la home, que Google trataría como soft 404.

## R3. Rutas sin prefijo de idioma (prioridad baja)

**Motivo:** `/contact/` aparece en Plausible y da 404. En el XML **no hay URLs en/es de la época WPML** (solo metadatos `wpml_media_*`), así que no son rutas antiguas del WordPress. Es alguien que escribe o enlaza el slug inglés o español sin `/en/` o `/es/`. Ninguno choca con los slugs griegos de la raíz (`synedries`, `programmata`, `sxetika`, `nea`, `epikoinonia`, `nomiko-simeioma`, `aporrito`, `cookies`).

**Posición:** al final del bloque 0, tras los posts.

```apache
	# --- Slugs inglés/español sin prefijo de idioma → su página (no son URLs del WordPress)
	RewriteRule ^(contact|about|sessions|courses|legal-notice|privacy)/?$ https://mariadimitropouloulopez.com/en/$1/ [L,R=301]
	RewriteRule ^(contacto|sobre-mi|sesiones|cursos|aviso-legal|privacidad)/?$ https://mariadimitropouloulopez.com/es/$1/ [L,R=301]
```

`/blog/` queda fuera porque es ambiguo (existe `/es/blog/` y `/en/blog/`). Tú decides si va a `/en/blog/` o se queda en 404.

## R4. Diagnóstico en Nicalia: lo que no funciona como en Apache

El servidor es **LiteSpeed** (`server: LiteSpeed`), no Apache.

| Punto | Estado en producción | Corrección |
|---|---|---|
| Codificación UTF-8 de las reglas griegas | ✅ Funciona (minúsculas, mayúsculas, con y sin barra) | — |
| Orden (bloque 0 antes de HTTPS y barra final) | ✅ Un solo salto también por `http://` y `www.` | — |
| `RewriteBase`, `[NE]`, `AllowOverride` | ✅ No hacen falta; el `.htaccess` se aplica | — |
| Conflicto con la barra final | ✅ Ninguno | — |
| `<If>` en cabeceras (caché de `/_astro/`) | ✅ Funciona (`max-age=31536000, immutable`) | — |
| **`ErrorDocument` dentro de `<If>`** | ❌ **LiteSpeed lo ignora**: `/es/…` y `/en/…` muestran la 404 en griego (`lang="el"`). El código sí es 404 | Quitar los dos bloques `<If>` del `ErrorDocument` y poner un `.htaccess` mínimo por carpeta: `public/es/.htaccess` con `ErrorDocument 404 /es/404/index.html` y `public/en/.htaccess` con `ErrorDocument 404 /en/404/index.html`. Funciona igual en Apache y en LiteSpeed. ⚠️ Verificarlo en Apache local y en producción tras la subida |
| **Página del 410** | ❌ Se ve la página por defecto de LiteSpeed («410 Gone», sin estilo ni enlaces) en `wp-admin`, `wp-content` y, si se aprueba, en adjuntos y posts con la opción C | Añadir `ErrorDocument 410 /404.html` junto al de 404. El código sigue siendo 410; solo cambia la página que se muestra |
| `/404.html`, `/es/404/`, `/en/404/` responden 200 | ℹ️ Llevan `noindex` y no están en el sitemap. Pueden ser parte de las 6 «Excluida por noindex» | Dejarlo así: forzar un 404 sobre la propia página de error puede crear un bucle con `ErrorDocument` |

## R5. Riesgo 3: los 49 posts redirigen a `/nea/`, que es `noindex`. **Decides tú**

| Opción | Qué implica | Impacto SEO | Trabajo |
|---|---|---|---|
| **A. Mantenerlo** | Nada cambia | Google acaba tratando los 49 301 como soft 404: no traslada autoridad, pero tampoco penaliza al resto. Search Console seguirá mostrando «Página con redirección» para ellas, y es normal. Quien llega desde un enlace antiguo ve el blog «Próximamente» | Ninguno |
| **B. Quitar el `noindex` de `/nea/`** con un contenido mínimo indexable | Hace falta texto propio en los 3 idiomas (María): qué tratará el blog, para quién, 150–250 palabras, enlaces a Sesiones, Cursos y María, y un aviso honesto de que los artículos se están revisando. Además, entrar en el sitemap y en `llms.txt` y quitar `noindex` en `[...blogPath].astro` y en `NOINDEX` de `astro.config.mjs`. **Sin ese texto sería contenido pobre** («Próximamente»), que resta calidad al sitio entero | Las 49 redirecciones apuntarían a una página indexable, aunque un índice genérico como destino de redirecciones masivas sigue contando como soft 404 en buena parte. Ganancia pequeña: las URLs antiguas tenían muy poco tráfico (3–17 impresiones/día en todo el sitio) | Texto de María + 3 líneas de código |
| **C. 410 para los anuncios ya pasados** que María no vaya a republicar | Google los retira del índice antes. Quien llegue desde un enlace viejo de Facebook ve la página de error (útil, con enlaces, si se aplica el `ErrorDocument 410` de R4) | Positivo para la limpieza del índice; ninguna pérdida real, porque un evento pasado no tiene equivalente | Cambiar el destino de cada línea `# wp <id>` por `- [G]` |
| **D. Combinación** | C para los anuncios, A para el resto ahora, y B en cuanto haya el primer post (ya previsto en la fase 4) | Lo mejor de A y C, sin depender del texto de María para B | C + nada |

**Candidatos a 410 (opción C)**, sacados de `listado-publicaciones-blog-wordpress.md`. **Que María lo confirme:**

| wp id | Fecha | Qué era |
|---|---|---|
| 1502 | 2020-04-20 | Facebook Live Q&A «Εκπαιδευτικοί σε καραντίνα» |
| 1558 | 2020-11-07 | Facebook Live Q&A «Επιστροφή στις νέες τάξεις» |
| 1563 | 2020-11-07 | Encuentro online «Η ανεξαρτησία…» |
| 1603 | 2020-12-23 | Seminario online «Διαχείριση των συγκρούσεων στο σπίτι 2» |
| 3011 | 2021-04-19 | Anuncio del programa de gestión del estrés parental (edición 2021) |
| 3017 | 2021-09-19 | «Νέος κύκλος!» del mismo programa |
| 3030 | 2021-09-20 | Código de descuento Project Parenting |
| 3338 | 2021-12-01 | Live para miembros de Project Parenting (pareja) |
| 3302 | 2021-12-28 | Live para miembros de Project Parenting (hábitos) |
| 3307 | 2022-02-08 | Live para miembros de Project Parenting (dinámica familiar) |
| 3313 | 2022-03-05 | Free live «Yπέροχες γυναίκες» |
| 3380 | 2022-03-05 | Facebook live «Τα μοτίβα γονεϊκότητας…» |
| 3403 | 2021-12-24 | ReVision Life (programa de 6 meses) |
| 4152 | 2022-10-19 | Ομιλία «Μείωσε το άγχος σου ως γονιός…» |

**Dudosos, decide María:**
- anuncios de colaboración: 1622 y 1720 (duplicados entre sí);
- anuncios de series de vídeo: 2517, 3375 y 3391;
- de cada pareja duplicada (1608/1723, 1617/1722, 1622/1720), la que no se republique.

## R6. Opcional: evento `404` en Plausible

**Qué:** en la página 404 (`NotFound.astro`), solo en producción, enviar un evento personalizado con la ruta:

```html
<script is:inline>window.plausible('404', { props: { path: location.pathname } })</script>
```

- Usa la cola que ya define `BaseLayout` (`window.plausible = window.plausible || …`), así que funciona aunque el script de Plausible no haya cargado.
- Solo envía `location.pathname`, sin la query: nada personal, sin cookies. Es coherente con la Privacidad actual («estadísticas de visitas sin datos personales»), sin cambiar textos legales.
- En Plausible: crear el objetivo (*goal*) `404` y la propiedad `path`. Así se ve el listado de rutas rotas.
- ⚠️ **No verificado:** si el script nuevo (`pa-….js` + `plausible.init`) permite además **no contar** la vista de página normal en la 404. Si no lo permite, la 404 seguirá apareciendo como página vista, pero filtrable por el objetivo.
- Requiere añadir «evento 404 de Plausible» a la lista de JS permitido en CLAUDE.md.

---

## Resumen de lo que hay que aprobar

| # | Cambio | Archivos |
|---|---|---|
| R1 | Sitemaps antiguos → `/sitemap-index.xml` (o 410) | `public/.htaccess` |
| R2 | `?page_id=` por id, `?p=` → `/nea/`, `?attachment_id=` → 410 | `public/.htaccess` |
| R3 | Slugs en/es sin prefijo → su página (y decidir `/blog/`) | `public/.htaccess` |
| R4 | 404 por idioma con `.htaccess` por carpeta + `ErrorDocument 410` | `public/.htaccess`, `public/es/.htaccess`, `public/en/.htaccess` (nuevos) |
| R5 | A / B / C / D, con la lista de C confirmada por María | `public/.htaccess` (C), páginas del blog (B) |
| R6 | Evento 404 en Plausible | `src/components/sections/NotFound.astro`, CLAUDE.md |
