# Informe final de SEO — fases 1 a 8

**Fecha:** 10/11/2026 · **Rama:** `draft/revision-maria` · **Verificación:** `npm run seo:check` pasa limpio sobre un build de producción: **0 errores y 8 advertencias** (ver `docs/SEO-VERIFICACION.md`).

El prompt original se adaptó a la arquitectura real del proyecto (decisión del 10/11/2026): no se refactorizó a `prefixDefaultLocale: true`, ni se crearon las colecciones `servicios`/`programas`/`metodos`/`temas`, ni el campo `status`. Equivalencias en `docs/SEO-AUDITORIA.md`.

## 1. Resultado en cifras

| Antes (auditoría, fase 1) | Ahora |
|---|---|
| Sin sitemap, 404, `.htaccess`, redirecciones ni `llms.txt` | Todo creado y probado |
| Guard de entorno: un booleano en el código (los previews de Vercel habrían sido indexables al lanzar) | `SITE_ENV` + `npm run build:prod`; cualquier otro build sale `noindex` |
| `og:image` en 0 de 45 páginas | 48/48, con `og:locale` y `summary_large_image` |
| 43 de 45 meta descriptions fuera de 150–160 car.; 8 títulos > 60 | 0 fuera de rango; 0 títulos > 60 (8 entre 55 y 59, solo aviso) |
| JSON-LD mínimo (`Person` + `BreadcrumbList`) | Un `@graph` por página con `@id` estables: 45/45 válidos |
| Lighthouse móvil: rendimiento 85–88, LCP ≈ 4 s, accesibilidad 94–96, SEO 69* | Rendimiento **94–99**, LCP **2,3–2,8 s**, accesibilidad **100**, SEO **100** |
| Sin verificación automática | `scripts/seo-check.mjs` rompe el build si algo falla |

\* El 69 era solo por el `noindex` del preview.

Matriz de verificación (48 páginas = 45 + 3 de 404, 11 comprobaciones por página): el: 174 ✅ / 2 ⚠️ / 0 ❌ · es: 173 / 3 / 0 · en: 173 / 3 / 0.

## 2. Cambios archivo por archivo

**Base técnica y entorno**
- `astro.config.mjs`: `SITE_ENV` (`astro:env`), `@astrojs/sitemap` solo en producción con alternates de idioma tomados de `routes.ts`, y el WOFF2 de la fuente.
- `package.json`: `build:prod`, `seo:check`, `postbuild` y `postbuild:prod`; dependencia `@astrojs/sitemap`.
- `src/consts.ts`: `IS_PRODUCTION`, `MODALITY`, `AI_CRAWLERS`, `OG_LOCALE`, `THEME_COLOR`, `PLAUSIBLE_SCRIPT`, `PERSON` (conocimientos, afiliaciones, colegiación) y avisos de build por datos pendientes.
- `src/middleware.ts`: quita los comentarios HTML (`<!-- TODO -->`) de las páginas generadas.

**Metadatos, Open Graph y JSON-LD**
- `src/components/seo/SEO.astro`: robots por entorno, `theme-color`, Open Graph y Twitter completos con imagen, props `noindex`, `image` y `notFound`, avisos de build por longitudes y delega el JSON-LD.
- `src/utils/jsonld.ts` (nuevo): `@graph` con `WebSite`, `ProfessionalService`, `Person`, `WebPage`/`ProfilePage`/`CollectionPage`+`ItemList`/`ContactPage`, `Service`, `Course` y `BreadcrumbList`; omite todo valor vacío.
- `src/layouts/BaseLayout.astro`: nuevas props `schema`, `noindex`, `image`, `notFound`, y Plausible solo en producción.
- `src/pages/*Path.astro`: cada ruta declara su tipo de schema; el blog «Próximamente» lleva `noindex`.
- `src/content.config.ts`: `metaDescription` y `description` de `legal` exigen 150–160 car.
- `src/i18n/ui.ts`, `src/content/services/*`, `src/content/legal/*`: 48 meta descriptions, 10 títulos y textos de la 404 y de la colaboración (ver `docs/SEO-METAS-PROPUESTAS.md`).
- `src/assets/images/og-default.webp` (nuevo): retrato 1200×630.

**Indexación y rastreo**
- `src/pages/robots.txt.ts` (sustituye a `public/robots.txt`): generado por entorno; en producción permite el rastreo (incluidos los crawlers de IA) y referencia el sitemap.
- `src/pages/404.astro`, `src/pages/[...notFoundPath].astro`, `src/components/sections/NotFound.astro`: 404 en griego, español e inglés, con `noindex`.
- `public/.htaccess` (nuevo): HTTPS y host sin `www`, `index.html`, barra final, `ErrorDocument` por idioma, MIME, gzip, caché y las 57 redirecciones 301 del antiguo WordPress.
- `src/pages/[name].txt.ts` (nuevo): `llms.txt` generado.

**Plantilla y rendimiento**
- `src/components/layout/Footer.astro`: títulos `h3` → `h2`.
- `src/components/ui/Card.astro`, `ServicesGrid.astro`, `[...contactPath].astro`: imagen LCP con `eager` + `fetchpriority="high"`.
- `src/assets/fonts/MandysSketch.woff2`: 59 KB (el TTF original eran 378 KB).
- `src/styles/global.css`: `--color-ink-soft` de 0,66 a 0,75 (contraste AA).

**Legal y analítica**
- `legal/*.md` (3 idiomas): ΑΦΜ enmascarado, colegiación, Plausible en Privacidad y Cookies.

**Verificación y documentación**
- `scripts/seo-check.mjs` (nuevo), `docs/SEO-VERIFICACION.md` (generado), `docs/SEO-AUDITORIA.md`, `docs/SEO-DATOS-PENDIENTES.md`, `docs/SEO-METAS-PROPUESTAS.md`, `docs/LLMS-TXT.md`, `docs/DESPLIEGUE.md`, `docs/REDIRECCIONES-WORDPRESS.md` y este informe. `AGENTS.md` (= CLAUDE.md) refleja todo.

## 3. Decisiones

| Decisión | Aplicada | Estado |
|---|---|---|
| Modalidad | Online + presencial en Chalandri | ✅ en `MODALITY` y en el JSON-LD |
| Raíz del griego | Se mantiene sin prefijo (`/`) | ✅ |
| Crawlers de IA | Permitidos | ✅ `AI_CRAWLERS = 'allow'`; cambiar a `'block'` los bloquea en `robots.txt` y deja de generar `llms.txt` |
| Legales | Indexables | ✅ |
| Longitud de description | Objetivo 150–160; fuera de rango = advertencia | ✅ validado en Zod y en `seo-check` |
| `og:locale` del inglés | `en_GB` | ✅ |
| Imagen al compartir | Retrato de María | ✅ |
| Texto que acompaña la imagen al compartir (home, 3 idiomas) | `og:description` y `twitter:description` = presentación de María (clave `home.ogDescription` de `ui.ts`), distinta de la meta description de Google; el resto de páginas usan su meta description | ✅ prop `ogDescription` de `SEO.astro`; español e inglés son traducciones mías pendientes de validar |
| Blog «Próximamente» | `noindex` hasta el primer post | ✅ **ver riesgo 3** |
| Redirecciones de los 49 posts antiguos | 301 a `/nea/` (opción A) | ✅ |
| Analítica | Plausible, solo en producción | ✅ falta revisión legal de la base jurídica |

## 4. Comprobaciones que tienes que hacer tú, fuera del repositorio

Las URLs de producción no responden hasta que se publique el build. Antes de eso, puedes pasar el HTML por las herramientas en modo «código» o usar el preview de Vercel (que lleva `noindex`, pero las herramientas lo leen igual).

### Datos estructurados (una URL por plantilla e idioma)

[Rich Results Test](https://search.google.com/test/rich-results) y [Schema Markup Validator](https://validator.schema.org/):

| Plantilla | Griego | Español | Inglés |
|---|---|---|---|
| Inicio | `https://mariadimitropouloulopez.com/` | `…/es/` | `…/en/` |
| María | `…/sxetika/` | `…/es/sobre-mi/` | `…/en/about/` |
| Índice de Sesiones | `…/synedries/` | `…/es/sesiones/` | `…/en/sessions/` |
| Índice de Cursos | `…/programmata/` | `…/es/cursos/` | `…/en/courses/` |
| Sesión (`Service`) | `…/synedries/metavasi-sti-mitrotita/` | `…/es/sesiones/apoyo-psicoterapeutico/` | `…/en/sessions/parental-family-therapy/` |
| Curso (`Course`) | `…/programmata/teacher-talk/` | `…/es/cursos/abc-and-beyond/` | `…/en/courses/mindful-parenting/` |
| Contacto | `…/epikoinonia/` | `…/es/contacto/` | `…/en/contact/` |
| Legal | `…/nomiko-simeioma/` | `…/es/privacidad/` | `…/en/cookies/` |

Resultado esperado: sin errores. Google no mostrará resultado enriquecido de «Curso» mientras no haya fechas de edición (`nextEdition`).

### Rendimiento
- [PageSpeed Insights](https://pagespeed.web.dev/) en móvil sobre la home, una sesión, un curso, María y Contacto, ya en producción (en local fue 94–99 y LCP 2,3–2,8 s; los datos de campo del hosting real pueden variar).

### Antes del lanzamiento: muestra de las redirecciones (`curl -I`)
Con el `.htaccess` ya subido a Nicalia, cada URL debe dar **un solo** `301` hacia su destino:
```bash
D=https://mariadimitropouloulopez.com
curl -sI "$D/mindful-parenting/"        | grep -iE "^HTTP|^location"  # → /programmata/mindful-parenting/
curl -sI "$D/servicios/"                | grep -iE "^HTTP|^location"  # → /es/sesiones/
curl -sI "$D/category/nea/"             | grep -iE "^HTTP|^location"  # → /nea/
curl -sI "$D/%ce%b3%ce%bf%ce%bd%ce%b5%ce%af%cf%82-%cf%83%ce%b5-%ce%ba%ce%b1%cf%81%ce%b1%ce%bd%cf%84%ce%af%ce%bd%ce%b1/" | grep -iE "^HTTP|^location"
curl -sI "http://www.mariadimitropouloulopez.com/servicios" | grep -iE "^HTTP|^location"  # un solo salto a https sin www
curl -sI "$D/wp-login.php"              | head -1                      # 410
curl -sI "$D/no-existe/"                | head -1                      # 404
```
La batería completa de comprobaciones post-subida está en `docs/DESPLIEGUE.md`.

### Tras el lanzamiento
1. **Search Console:** alta de la propiedad `https://mariadimitropouloulopez.com` (exactamente igual que el canonical), envío de `sitemap-index.xml`, inspección de la home y de una URL por idioma y plantilla, y vigilancia de cobertura y errores de `hreflang` durante la primera semana. Si el sitemap sale como «Desconocido», comprobar el `Content-Type` y que la propiedad coincide con la URL enviada.
2. **Vista previa al compartir:** pegar la home en el [depurador de Facebook](https://developers.facebook.com/tools/debug/) y en el [Post Inspector de LinkedIn](https://www.linkedin.com/post-inspector/), y enviarla por WhatsApp: debe salir el retrato de María con el título y la descripción. Si ya se compartió antes, esas plataformas guardan la vista previa antigua en caché.
3. **Plausible:** comprobar que llegan visitas (el dominio debe estar dado de alta como `mariadimitropouloulopez.com`).
4. **Entorno de pruebas:** confirmar que `devenlopment.asdata.es` sigue protegido con contraseña y fuera del índice. Los previews de Vercel ya llevan `noindex` y `Disallow: /`.
5. **Bing Webmaster Tools** (opcional): importar la propiedad desde Search Console.

## 5. Riesgos abiertos

| # | Riesgo | Qué haría falta |
|---|---|---|
| 1 | **Subir el build equivocado.** Si se sube a Nicalia `npm run build` en vez de `build:prod`, la web queda `noindex` y con `robots.txt` `Disallow: /`. `seo:check` lo detectaría, pero no impide subirlo | Seguir `docs/DESPLIEGUE.md`; comprobar `curl $D/robots.txt` (debe poner `Allow: /`) tras cada subida |
| 2 | **Regla HTTPS del `.htaccess` sin probar en el servidor real.** Se probó con Apache 2.4 en local sin SSL. Si Nicalia termina el SSL en un proxy, la regla puede entrar en bucle | Hacer los `curl -I` de arriba tras subir; si hubiera bucle, usar la variante con `X-Forwarded-Proto` que ya está comentada en el archivo |
| 3 | **Las redirecciones de los 49 posts apuntan a `/nea/`, que hoy es `noindex`.** Google no transfiere autoridad a una página `noindex`, y puede tratarlas como «soft 404» | Quitar el `noindex` del blog en cuanto haya el primer post, o republicar los posts y cambiar su línea del `.htaccess` (`# wp <id>`) por la URL nueva |
| 4 | **Blog aún sin hacer (fase 4 del proyecto).** Falta `BlogPosting`, `workTranslation`, un RSS por idioma, `og:type="article"` y la inclusión de cada post en el sitemap y `llms.txt`. El helper `jsonld.ts` y `SEO.astro` ya admiten las props, pero no hay plantilla de post | Construir la plantilla de post del blog cuando María republique el primero |
| 5 | **Textos aún no validados por María**, sobre todo las traducciones y las 48 metas. Si cambian, `seo:check` avisará de las que salgan de 150–160 | Aplicar su documento de correcciones y repasar `docs/SEO-METAS-PROPUESTAS.md` |
| 6 | **Textos legales sin cerrar** (ley nacional, autoridad de control, jurisdicción, base jurídica de Plausible, y la colegiación de Las Palmas frente a una consulta en Atenas) | Revisión de un abogado; los `TODO` están marcados |
| 7 | **`CourseInstance` sin fechas:** Google no muestra los cursos como resultado enriquecido | Que María dé las fechas de la próxima edición |
| 8 | **Entidad local incompleta:** faltan `geo`, `hasMap`, horario y `alumniOf` | Datos de María (ver `docs/SEO-DATOS-PENDIENTES.md`) |
| 9 | **Sin `lastmod` en el sitemap.** Las páginas son estáticas y Astro no lo calcula | Opcional: añadir `lastmod` real si María quiere señalar actualizaciones |
| 10 | **`seo:check` rompe el build de Vercel si falla.** Es intencionado, pero un cambio de texto de María puede hacerlo fallar (p. ej. título > 60) | Leer el log del deploy; el mensaje dice página y motivo |
| 11 | **`llms.txt` no es un estándar adoptado oficialmente** por los grandes buscadores | No dedicarle más esfuerzo que a las metas y al JSON-LD; `llms-full.txt` queda opcional |
| 12 | **126 imágenes con `alt=""`** (ilustraciones decorativas por diseño) | Revisar si alguna ilustración aporta información y merece descripción |

## 6. Advertencias que quedan (8)

Todas son el mismo aviso: títulos de 55 a 59 caracteres, **dentro del límite de 60**, que `seo:check` marca por quedar cerca (Teacher Talk, ABC and Beyond y Mindful Parenting en los tres idiomas). No requieren acción.

## 7. Cómo mantenerlo

- Antes de subir: `npm run seo:check` (compila para producción, verifica y regenera `docs/SEO-VERIFICACION.md`).
- Subir **solo** el contenido de `dist/` de `npm run build:prod`.
- Al republicar un post: nueva URL y cambio de su línea en `public/.htaccess`.
- Al añadir una página: su ruta en `routes.ts`, un `schema` en la página y una meta de 150–160 caracteres; `seo:check` avisa si falta algo.
