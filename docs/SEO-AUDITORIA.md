# Auditoría SEO — Fase 1 (solo informe)

> **Informe histórico de la fase 1.** Los problemas que recoge se resolvieron en las fases 2 a 7; el estado final, las decisiones aplicadas, los riesgos abiertos y las comprobaciones manuales están en [`SEO-INFORME-FINAL.md`](SEO-INFORME-FINAL.md).

**Fecha:** 10/11/2026 · **Rama:** `draft/revision-maria` (commit `df7e139`) · **Fuente:** build de producción (`npm run build` → `dist/`), 45 páginas.

**Alcance:** el prompt de «Revisión y cierre completo del SEO», **adaptado a la arquitectura actual** (decisión del 10/11/2026). No se ha tocado código. Las referencias del prompt se traducen así:

| Prompt | Proyecto |
|---|---|
| `src/config/site.ts` | `src/consts.ts` (`SITE`, `SITE_LAUNCHED`, `CONTACT`, `SOCIAL`…) |
| `slug` + `translationKey` en frontmatter | mapa de rutas `src/i18n/routes.ts` por `routeKey`; `getAlternates(routeKey)` en `src/i18n/utils.ts` |
| `status: 'listo'` | no existe: todo lo que está en la colección se publica (salvo `talks`, sin grupo); testimonios con `approved`, blog con `draft` |
| Colecciones `servicios`/`programas`/`colaboraciones`/`temas`/`metodos` | `services` (sesiones y cursos), `testimonials`, `about` (incluye Colaboraciones), `legal`, `blog` (vacío) |
| `docs/CONTENT-ARCHITECTURE.md` | no existe; fuente de verdad: `CLAUDE.md` |

---

## Resumen ejecutivo

La base multiidioma es **sólida**: las 45 páginas (15 por idioma, sin huecos) tienen `<html lang>` correcto, un único `<h1>`, `canonical` absoluto y autorreferente, y un `hreflang` completo, recíproco y con `x-default`. No hay enlaces internos rotos, páginas huérfanas, referencias a `devenlopment.asdata.es`/`localhost`/`vercel.app` ni JSON-LD inválido.

Lo que falta para lanzar es casi todo **infraestructura de indexación y marcado**:

1. **No hay sitemap** (ni la integración instalada) y `robots.txt` no lo referencia.
2. **No hay 404**, ni `.htaccess` (HTTPS, host único, `ErrorDocument`), ni plan de redirecciones desde WordPress.
3. **Guard de entorno frágil:** `SITE_LAUNCHED` es un booleano en el código; el día que pase a `true`, **los previews de Vercel también serán indexables**.
4. **Open Graph incompleto en las 45 páginas:** sin `og:image`, sin `og:locale`, Twitter `summary`; y un comentario `<!-- TODO: og:image… -->` llega al HTML publicado.
5. **JSON-LD mínimo:** solo `Person` + `ProfessionalService` (Inicio y María) y `BreadcrumbList`; sin `@id`, sin `WebSite`/`WebPage`/`Service`/`Course`.
6. **Meta descriptions cortas:** 43 de 45 fuera de 150–160 caracteres (24 por debajo de 120).

**Quick wins:** sitemap + `robots.txt`, `og:image` por defecto, quitar el comentario TODO del HTML, `theme-color`, `loading="eager"` en la imagen LCP de Contacto e índices.

---

## Resultados por bloque

### A. Metadatos básicos

| Comprobación | Estado | Detalle |
|---|---|---|
| `<html lang>` | ✅ 45/45 | `el`, `es`, `en` según la ruta. `dir` no procede (LTR). |
| `<title>` único | ⚠️ | 1 duplicado: «Blog — María Dimitropoulou López» en `/es/blog/` y `/en/blog/`. |
| `<title>` ≤ 60 car. | ⚠️ 37/45 | 8 entre 61 y 71 (Mindful Parenting ×3, Matrescencia ×3, ABC el, Terapia parental el). La marca «— María Dimitropoulou López» ocupa 28 car.; en griego, 31. |
| Meta description 150–160 | ❌ 2/45 | Rango real 37–159. Las más cortas: Blog (37–56), legales (74–98), Mindful Parenting en (81). **Incoherencia:** el esquema Zod de `services.metaDescription` y `legal.description` limita a `max(160)` sin mínimo; el resto de descripciones vive en `ui.ts` sin validación. |
| Meta description única | ✅ | Sin duplicados entre páginas ni idiomas. |
| Un `<h1>` | ✅ 45/45 | |
| Jerarquía de encabezados | ⚠️ 6 páginas | Contacto y Blog (×3 idiomas) saltan `h1 → h3`: los títulos del pie son `h3` y esas páginas no tienen `h2`. |
| `alt` | ✅ / ⚠️ | 0 imágenes sin `alt`. 126 con `alt=""` (ilustraciones decorativas de tarjetas, cabeceras, separador y pie, conforme a CLAUDE.md); los retratos tienen `alt` descriptivo. Revisar si alguna ilustración debería describirse. |
| `<meta name="robots">` | ⚠️ intencionado | `noindex, nofollow` en las 45 (`SITE_LAUNCHED = false`). Correcto para el preview; ver F. |
| Favicon / viewport / `theme-color` | ✅ / ✅ / ❌ | `favicon.ico` + `icon.webp`; falta `theme-color`. |

### B. Canonical y multiidioma

| Comprobación | Estado | Detalle |
|---|---|---|
| Canonical absoluto, autorreferente, barra final | ✅ 45/45 | `https://mariadimitropouloulopez.com/…/` coherente con `trailingSlash: 'always'`. |
| `hreflang` autorreferencia + reciprocidad + `x-default` | ✅ 45/45 | Los 4 destinos de cada página existen en `dist/`. `x-default` → griego. |
| Selector de idioma | ✅ | Lleva a la página equivalente (mismo `routeKey`). |
| Estructura de locales | ⚠️ decisión | El griego vive en la raíz sin prefijo (`prefixDefaultLocale: false`); `es` y `en` con prefijo. Es válido para Google, pero ver «Decisiones: raíz `/`». |

### C. Open Graph y redes

| Comprobación | Estado |
|---|---|
| `og:title`, `og:description`, `og:url`, `og:site_name` | ✅ 45/45 |
| `og:type` | ⚠️ siempre `website` (correcto hoy; `article` para posts cuando haya blog) |
| `og:locale` / `og:locale:alternate` | ❌ ausentes |
| `og:image` (1200×630) + `og:image:alt` | ❌ ausente en 45/45; el `TODO` del componente se imprime como comentario en el HTML |
| Twitter Card | ⚠️ `summary`, sin imagen |

### D. Datos estructurados (JSON-LD)

| Plantilla | Hoy | Falta / problemas |
|---|---|---|
| Inicio (×3) | `Person`, `ProfessionalService` (con `PostalAddress`) | Sin `@id`, `WebSite`, `WebPage`. `Person` sin `image`, `knowsAbout`, `alumniOf`. `ProfessionalService` duplica nombre/email/teléfono de `Person` sin enlazarlos (`founder`/`employee`). La dirección se emite aunque la modalidad presencial es una decisión abierta (ver Decisiones). |
| María (×3) | `Person`, `ProfessionalService`, `BreadcrumbList` | Debería ser `ProfilePage` con `mainEntity` → `Person`. |
| Índices Sesiones/Cursos (×3) | `BreadcrumbList` | `CollectionPage` + `ItemList`. |
| Servicios 1:1 (×9) | `BreadcrumbList` | `Service` (`provider`, `serviceType`, `audience`, `availableChannel`, `inLanguage`). |
| Programas (×9) | `BreadcrumbList` | `Course` (sin `CourseInstance`: no hay fechas de edición en el contenido). |
| Contacto (×3) | `BreadcrumbList` | `ContactPage` + `ContactPoint` (`availableLanguage`). |
| Blog (×3) | `BreadcrumbList` | `Blog`/`CollectionPage` cuando haya posts. |
| Legales (×9) | `BreadcrumbList` | `WebPage` mínimo. |

Todos los bloques son JSON válido. Ningún testimonio se marca como `Review` (✅). No hay `AggregateRating` ni afirmaciones clínicas (✅).

### E. Indexación y rastreo

| Comprobación | Estado | Detalle |
|---|---|---|
| Sitemap | ❌ | Ni `@astrojs/sitemap` instalada ni sitemap en `dist/` (CLAUDE.md la da por usada). |
| `robots.txt` | ⚠️ | Estático en `public/`, `Allow: /`, **sin `Sitemap:`**; no distingue entornos. |
| 404 | ❌ | No hay `src/pages/404.astro`. |
| Enlaces internos rotos | ✅ 0 | |
| Páginas huérfanas | ✅ 0 | Todas reciben enlaces (nav, pie, tarjetas). |
| Duplicados (`/x` vs `/x/`, `index.html`) | ⚠️ | Depende del servidor: sin `.htaccess` no hay redirección de `/es/contacto` → `/es/contacto/` ni de `index.html`. |
| Página «Próximamente» del blog | ⚠️ | Indexable con contenido casi vacío (contenido fino) en 3 idiomas. |
| `.htaccess` / redirecciones WordPress | ❌ | No existen; el XML de exportación de WordPress no está en el repo. |

### F. Seguridad de entorno

| Comprobación | Estado | Detalle |
|---|---|---|
| Mecanismo de no indexación | ⚠️ | `SITE_LAUNCHED` (booleano en `consts.ts`) → `noindex, nofollow`. No depende del entorno: al lanzar, Vercel también quedaría indexable. Tampoco cambia `robots.txt` ni suprimiría sitemap/`llms.txt`. |
| URLs absolutas a entornos de prueba | ✅ | Ninguna a `devenlopment.asdata.es`, `localhost` ni `*.vercel.app`. |

### G. YMYL / E-E-A-T

| Comprobación | Estado | Detalle |
|---|---|---|
| Autoría y credenciales visibles | ✅ | Página «María»: doctorado, formación, investigación, docencia, colaboraciones con enlaces reales (Project Parenting, TeensNeurolink, LinkedIn). |
| Contacto, privacidad, cookies, aviso legal en 3 idiomas, enlazados desde el pie | ✅ | |
| Datos legales | ⚠️ | El Aviso legal muestra «TODO: pendiente» (ΑΦΜ, colegiación) en los 3 idiomas. |
| Colaboraciones como entidades verificables | ⚠️ | Project Parenting y TeensNeurolink enlazados; la Universidad Nacional y Kapodistríaca de Atenas sin enlace (y su texto está pendiente de aclarar con María). |

### H. Rendimiento (Lighthouse móvil, preview local, 6 plantillas en `es` + 1 en `el`)

| Página | Perf. | Acces. | Buenas pr. | SEO* | LCP | CLS | TBT | Peso |
|---|---|---|---|---|---|---|---|---|
| `/es/` | 85 | 96 | 96 | 69 | 4,4 s | 0 | 10 ms | 675 KiB |
| `/es/sesiones/` | 87 | 96 | 100 | 69 | 4,1 s | 0 | 0 ms | 621 KiB |
| `/es/sesiones/matrescencia/` | 88 | 95 | 100 | 69 | 4,0 s | 0 | 0 ms | 543 KiB |
| `/programmata/teacher-talk/` | 87 | 95 | 100 | 69 | 4,1 s | 0 | 0 ms | 555 KiB |
| `/es/sobre-mi/` | 88 | 96 | 100 | 69 | 3,9 s | 0 | 0 ms | 528 KiB |
| `/es/contacto/` | 88 | 94 | 100 | 69 | 3,9 s | 0 | 0 ms | 554 KiB |

\* El SEO de 69 se debe **solo** a `is-crawlable` (el `noindex` del preview); el resto de auditorías SEO de Lighthouse pasan.

- **LCP ≈ 4 s** (objetivo < 2,5 s) en simulación móvil. Causas: CSS que bloquea el render (`BaseLayout.css`), imágenes LCP sin preload y, en Contacto e índice de Sesiones, **la imagen LCP tiene `loading="lazy"`**.
- **Contraste:** falla en textos con `text-text-soft` (`rgba(58,58,58,.66)`), sobre todo sobre crema (pie: email y teléfono) y en entradillas grandes. Cambiarlo toca un token de marca (CLAUDE.md): decisión de diseño.
- **CLS 0 y TBT ≈ 0:** imágenes con `width`/`height`, fuentes autoalojadas con precarga. ✅
- No hay iframe de reservas (SimplyBook.me) en el proyecto.

---

## Lista priorizada de problemas

### Crítico (bloquea el lanzamiento)
1. **Sin sitemap** y `robots.txt` sin `Sitemap:`.
2. **Guard de entorno**: al lanzar, los previews de Vercel quedarían indexables; `robots.txt` no cambia por entorno.
3. **Sin `.htaccess`**: HTTPS, host único (sin `www`, como el canonical), barra final, `index.html`, `ErrorDocument 404`, `Content-Type` de `.xml`/`.txt`.
4. **Sin página 404.**
5. **Redirecciones 301 desde WordPress**: sin mapa (falta el XML de exportación en el repo).

### Alto
6. `og:image` (1200×630) por defecto + `og:locale`/`og:locale:alternate` + `summary_large_image`; quitar el comentario TODO del HTML.
7. JSON-LD por plantilla con `@id` estables (`WebSite`, `WebPage`/`ProfilePage`/`CollectionPage`/`ContactPage`, `Service`, `Course`, `ItemList`).
8. LCP: `loading="eager"` + `fetchpriority="high"` en la imagen LCP de Contacto e índices.

### Medio
9. Meta descriptions a 150–160 car. (43 páginas). Es copy: lo redacto yo como propuesta y María lo valida, o lo escribe ella.
10. Títulos > 60 car. (8 páginas): acortar la parte variable o la marca.
11. Título duplicado del blog (es/en).
12. Salto `h1 → h3` en Contacto y Blog (pie con `h3`).
13. `llms.txt` (Fase 5).
14. Página «Próximamente» del blog: `noindex` hasta que haya posts (decisión).

### Bajo
15. `theme-color`.
16. Contraste de `text-soft` (decisión de diseño).
17. Revisar `alt=""` de ilustraciones que aporten información.

---

## Decisiones que necesito de ti

| # | Decisión | Opciones | Impacto | Mi recomendación |
|---|---|---|---|---|
| 1 | **Modalidad** | a) Solo online · b) Online + presencial en Chalandri (lo que dice hoy CLAUDE.md, la web y el JSON-LD) | (a) `ProfessionalService` sin dirección; quitar «Chalandri» de metas. (b) `address`, `geo`, `hasMap` y horarios **solo si se confirman** | Confirmar (b), que es lo publicado; si no, hay que cambiar también textos visibles |
| 2 | **Raíz `/`** | a) Mantener el griego en la raíz (actual) · b) `/el/` con prefijo + `/` como página de entrada con `x-default` · c) `/` redirige a `/el/` | (a) Sin cambios de URL; Google lo admite. (b)/(c) Cambian todas las URL griegas (regla 4), más redirecciones. Nunca redirigir por `Accept-Language` | (a) |
| 3 | **Crawlers de IA** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) | Permitir · bloquear | Permitir: la web puede citarse en respuestas de IA (y `llms.txt` tiene sentido). Bloquear: no se usa para entrenar/citar; no afecta a Google Search | Permitir (por defecto, como pide el prompt) |
| 4 | **`noindex` en legales** | Indexables · `noindex` (y fuera del sitemap) | Son páginas sin valor de búsqueda, pero de confianza (E-E-A-T) | Indexables, fuera de prioridad |
| 5 | **Longitud de meta description** | Forzar 150–160 (con validación Zod `min(150).max(160)`) · aviso fuera de 120–160 | Forzar obliga a reescribir 43 textos ahora | Aviso 120–160, objetivo 150–160 |
| 6 | **`og:locale` de inglés** | `en_GB` · `en_US` | Cosmético | `en_GB` (público europeo) |
| 7 | **Imagen OG por defecto** | Componer 1200×630 con el logo + ilustración existente · retrato de María | Lo que se ve al compartir por WhatsApp/redes | Retrato + nombre, ya que María quiere que se conozca su imagen |
| 8 | **Blog «Próximamente»** | Indexable · `noindex` hasta el primer post | Contenido fino en 3 idiomas | `noindex` |

Lista de datos que faltan: [`docs/SEO-DATOS-PENDIENTES.md`](SEO-DATOS-PENDIENTES.md).

## Observaciones de contenido (no corregidas; regla 6)

- **Metas en griego desfasadas** tras la revisión de María:
  - Las descripciones SEO de Inicio y de Sesiones dicen «γονεϊκή και οικογενειακή θεραπεία», pero ahora es «συμβουλευτική».
  - La de Sesiones no menciona «εφήβους».
  - La `metaDescription` de Matrescencia dice «συνοδεία» y «κατανοήσετε».
  - La de Terapia parental dice «γονεϊκότητας με σεβασμό», pero ahora es «θετική γονεϊκότητα».
- **Erratas pendientes de María** en el griego: ver `docs/correcciones-maria.md`.
- **Universidad Nacional y Kapodistríaca de Atenas:** texto literal pendiente de aclarar.

---

## Detalle por plantilla, página e idioma

Leyenda: ✅ correcto · ⚠️ mejorable · ❌ falla. Título y description en caracteres (en griego, caracteres, no bytes). «Robots»: `noindex` del preview, intencionado hasta el lanzamiento.

### Inicio

| Página | lang | Título (car.) | Description (car.) | H1 | Encabezados | Imágenes / alt | Canonical | hreflang | Robots | OG / Twitter | JSON-LD |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | el | ✅ 37 | ✅ 154 | ✅ 1 | ✅ ok | ✅ 9 (7 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ Person, ProfessionalService |
| `/en/` | en | ✅ 40 | ⚠️ 143 | ✅ 1 | ✅ ok | ✅ 9 (7 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ Person, ProfessionalService |
| `/es/` | es | ✅ 37 | ⚠️ 144 | ✅ 1 | ✅ ok | ✅ 9 (7 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ Person, ProfessionalService |

### Índice Sesiones

| Página | lang | Título (car.) | Description (car.) | H1 | Encabezados | Imágenes / alt | Canonical | hreflang | Robots | OG / Twitter | JSON-LD |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/synedries/` | el | ✅ 37 | ⚠️ 126 | ✅ 1 | ✅ ok | ✅ 6 (5 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/en/sessions/` | en | ✅ 36 | ⚠️ 105 | ✅ 1 | ✅ ok | ✅ 6 (5 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/es/sesiones/` | es | ✅ 36 | ⚠️ 98 | ✅ 1 | ✅ ok | ✅ 6 (5 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |

### Índice Cursos

| Página | lang | Título (car.) | Description (car.) | H1 | Encabezados | Imágenes / alt | Canonical | hreflang | Robots | OG / Twitter | JSON-LD |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/programmata/` | el | ✅ 39 | ⚠️ 134 | ✅ 1 | ✅ ok | ✅ 6 (5 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/en/courses/` | en | ✅ 35 | ⚠️ 113 | ✅ 1 | ✅ ok | ✅ 6 (5 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/es/cursos/` | es | ✅ 34 | ⚠️ 112 | ✅ 1 | ✅ ok | ✅ 6 (5 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |

### Servicio (sesión 1:1)

| Página | lang | Título (car.) | Description (car.) | H1 | Encabezados | Imágenes / alt | Canonical | hreflang | Robots | OG / Twitter | JSON-LD |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/synedries/goneiki-oikogeneiaki-therapeia/` | el | ⚠️ 62 | ⚠️ 148 | ✅ 1 | ✅ ok | ✅ 4 (3 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/synedries/metavasi-sti-mitrotita/` | el | ⚠️ 64 | ⚠️ 119 | ✅ 1 | ✅ ok | ✅ 4 (3 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/synedries/psychotherapeftiki-ypostirixi/` | el | ✅ 54 | ⚠️ 115 | ✅ 1 | ✅ ok | ✅ 4 (3 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/en/sessions/matrescence/` | en | ⚠️ 69 | ⚠️ 143 | ✅ 1 | ✅ ok | ✅ 4 (3 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/en/sessions/parental-family-therapy/` | en | ✅ 51 | ⚠️ 137 | ✅ 1 | ✅ ok | ✅ 4 (3 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/en/sessions/psychotherapeutic-support/` | en | ✅ 53 | ⚠️ 108 | ✅ 1 | ✅ ok | ✅ 4 (3 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/es/sesiones/apoyo-psicoterapeutico/` | es | ✅ 50 | ⚠️ 126 | ✅ 1 | ✅ ok | ✅ 4 (3 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/es/sesiones/matrescencia/` | es | ⚠️ 68 | ⚠️ 145 | ✅ 1 | ✅ ok | ✅ 4 (3 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/es/sesiones/terapia-parental-familiar/` | es | ✅ 53 | ⚠️ 147 | ✅ 1 | ✅ ok | ✅ 4 (3 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |

### Programa (curso)

| Página | lang | Título (car.) | Description (car.) | H1 | Encabezados | Imágenes / alt | Canonical | hreflang | Robots | OG / Twitter | JSON-LD |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/programmata/abc-and-beyond/` | el | ⚠️ 61 | ⚠️ 119 | ✅ 1 | ✅ ok | ✅ 4 (3 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/programmata/mindful-parenting/` | el | ⚠️ 66 | ⚠️ 114 | ✅ 1 | ✅ ok | ✅ 4 (3 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/programmata/teacher-talk/` | el | ✅ 59 | ⚠️ 135 | ✅ 1 | ✅ ok | ✅ 4 (3 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/en/courses/abc-and-beyond/` | en | ✅ 58 | ⚠️ 126 | ✅ 1 | ✅ ok | ✅ 4 (3 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/en/courses/mindful-parenting/` | en | ⚠️ 70 | ⚠️ 81 | ✅ 1 | ✅ ok | ✅ 4 (3 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/en/courses/teacher-talk/` | en | ✅ 56 | ⚠️ 135 | ✅ 1 | ✅ ok | ✅ 4 (3 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/es/cursos/abc-and-beyond/` | es | ✅ 57 | ⚠️ 139 | ✅ 1 | ✅ ok | ✅ 4 (3 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/es/cursos/mindful-parenting/` | es | ❌ 71 | ⚠️ 116 | ✅ 1 | ✅ ok | ✅ 4 (3 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/es/cursos/teacher-talk/` | es | ✅ 55 | ✅ 159 | ✅ 1 | ✅ ok | ✅ 4 (3 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |

### María (sobre mí)

| Página | lang | Título (car.) | Description (car.) | H1 | Encabezados | Imágenes / alt | Canonical | hreflang | Robots | OG / Twitter | JSON-LD |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/sxetika/` | el | ✅ 44 | ⚠️ 133 | ✅ 1 | ✅ ok | ✅ 3 (1 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList, Person, ProfessionalService |
| `/en/about/` | en | ✅ 36 | ⚠️ 144 | ✅ 1 | ✅ ok | ✅ 3 (1 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList, Person, ProfessionalService |
| `/es/sobre-mi/` | es | ✅ 36 | ⚠️ 124 | ✅ 1 | ✅ ok | ✅ 3 (1 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList, Person, ProfessionalService |

### Contacto

| Página | lang | Título (car.) | Description (car.) | H1 | Encabezados | Imágenes / alt | Canonical | hreflang | Robots | OG / Twitter | JSON-LD |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/epikoinonia/` | el | ✅ 39 | ⚠️ 121 | ✅ 1 | ⚠️ h1→h3 | ✅ 3 (1 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/en/contact/` | en | ✅ 35 | ⚠️ 118 | ✅ 1 | ⚠️ h1→h3 | ✅ 3 (1 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/es/contacto/` | es | ✅ 36 | ⚠️ 126 | ✅ 1 | ⚠️ h1→h3 | ✅ 3 (1 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |

### Blog (próximamente)

| Página | lang | Título (car.) | Description (car.) | H1 | Encabezados | Imágenes / alt | Canonical | hreflang | Robots | OG / Twitter | JSON-LD |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/nea/` | el | ✅ 31 | ❌ 47 | ✅ 1 | ⚠️ h1→h3 | ✅ 3 (2 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/en/blog/` | en | ⚠️ 32 dup | ❌ 37 | ✅ 1 | ⚠️ h1→h3 | ✅ 3 (2 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/es/blog/` | es | ⚠️ 32 dup | ❌ 56 | ✅ 1 | ⚠️ h1→h3 | ✅ 3 (2 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |

### Legal

| Página | lang | Título (car.) | Description (car.) | H1 | Encabezados | Imágenes / alt | Canonical | hreflang | Robots | OG / Twitter | JSON-LD |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/aporrito/` | el | ✅ 46 | ⚠️ 98 | ✅ 1 | ✅ ok | ✅ 2 (1 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/cookies/` | el | ✅ 44 | ⚠️ 78 | ✅ 1 | ✅ ok | ✅ 2 (1 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/nomiko-simeioma/` | el | ✅ 43 | ⚠️ 81 | ✅ 1 | ✅ ok | ✅ 2 (1 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/en/cookies/` | en | ✅ 41 | ⚠️ 76 | ✅ 1 | ✅ ok | ✅ 2 (1 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/en/legal-notice/` | en | ✅ 40 | ⚠️ 74 | ✅ 1 | ✅ ok | ✅ 2 (1 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/en/privacy/` | en | ✅ 42 | ⚠️ 89 | ✅ 1 | ✅ ok | ✅ 2 (1 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/es/aviso-legal/` | es | ✅ 39 | ⚠️ 82 | ✅ 1 | ✅ ok | ✅ 2 (1 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/es/cookies/` | es | ✅ 47 | ⚠️ 81 | ✅ 1 | ✅ ok | ✅ 2 (1 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |
| `/es/privacidad/` | es | ✅ 50 | ⚠️ 98 | ✅ 1 | ✅ ok | ✅ 2 (1 alt vacío) | ✅ | ✅ ok | ⚠️ noindex (preview) | ❌ sin og:image, sin og:locale, card summary | ✅ BreadcrumbList |