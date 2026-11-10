# Verificación SEO automática

**Fecha:** 2026-11-10 · **Entorno del build:** producción (`npm run build:prod`) · **Páginas:** 48
**Resultado:** ✅ sin errores · 8 advertencias

Generado por `scripts/seo-check.mjs` (`npm run seo:check`). Falla el build con código ≠ 0 si hay algún error.

## Recuento por idioma

| Idioma | ✅ | ⚠️ | ❌ |
|---|---|---|---|
| el | 174 | 2 | 0 |
| es | 173 | 3 | 0 |
| en | 173 | 3 | 0 |

## Comprobaciones del sitio

| Comprobación | Estado | Detalle |
|---|---|---|
| robots.txt coherente con el entorno | ✅ | producción: permite el rastreo |
| 404 por idioma | ✅ | /404.html, /es/404/ y /en/404/ |
| Plausible solo en producción | ✅ | presente en 48/48 páginas |
| .htaccess en el build | ✅ | con ErrorDocument 404 |
| sitemap-index.xml | ✅ | existe |
| URLs del sitemap: existen, canónicas e indexables | ✅ | 42 URLs |
| toda página indexable está en el sitemap | ✅ | completo |
| llms.txt: enlaces válidos e indexables | ✅ | 33 enlaces |
| llms.txt: formato | ✅ | título, cita (≤ 200 car.) y secciones |
| cobertura de idioma | ✅ | 15 páginas × 3 idiomas |

## Advertencias

- /en/courses/abc-and-beyond/: título de 58 car. (cerca del límite de 60)
- /en/courses/mindful-parenting/: título de 57 car. (cerca del límite de 60)
- /en/courses/teacher-talk/: título de 56 car. (cerca del límite de 60)
- /es/cursos/abc-and-beyond/: título de 57 car. (cerca del límite de 60)
- /es/cursos/mindful-parenting/: título de 57 car. (cerca del límite de 60)
- /es/cursos/teacher-talk/: título de 55 car. (cerca del límite de 60)
- /programmata/mindful-parenting/: título de 59 car. (cerca del límite de 60)
- /programmata/teacher-talk/: título de 59 car. (cerca del límite de 60)

## Matriz página × idioma × comprobación

| Página | lang | title | description | h1 | canonical | hreflang | og | json-ld | robots | imágenes | enlaces |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` (el) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/404.html` (el) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/aporrito/` (el) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/cookies/` (el) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/epikoinonia/` (el) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/nea/` (el) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/nomiko-simeioma/` (el) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/programmata/` (el) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/programmata/abc-and-beyond/` (el) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/programmata/mindful-parenting/` (el) | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/programmata/teacher-talk/` (el) | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/sxetika/` (el) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/synedries/` (el) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/synedries/goneiki-oikogeneiaki-therapeia/` (el) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/synedries/metavasi-sti-mitrotita/` (el) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/synedries/psychotherapeftiki-ypostirixi/` (el) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/es/` (es) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/es/404/` (es) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/es/aviso-legal/` (es) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/es/blog/` (es) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/es/contacto/` (es) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/es/cookies/` (es) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/es/cursos/` (es) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/es/cursos/abc-and-beyond/` (es) | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/es/cursos/mindful-parenting/` (es) | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/es/cursos/teacher-talk/` (es) | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/es/privacidad/` (es) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/es/sesiones/` (es) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/es/sesiones/apoyo-psicoterapeutico/` (es) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/es/sesiones/matrescencia/` (es) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/es/sesiones/terapia-parental-familiar/` (es) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/es/sobre-mi/` (es) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/en/` (en) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/en/404/` (en) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/en/about/` (en) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/en/blog/` (en) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/en/contact/` (en) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/en/cookies/` (en) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/en/courses/` (en) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/en/courses/abc-and-beyond/` (en) | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/en/courses/mindful-parenting/` (en) | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/en/courses/teacher-talk/` (en) | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/en/legal-notice/` (en) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/en/privacy/` (en) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/en/sessions/` (en) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/en/sessions/matrescence/` (en) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/en/sessions/parental-family-therapy/` (en) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/en/sessions/psychotherapeutic-support/` (en) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Leyenda:** ✅ correcto · ⚠️ advertencia · ❌ error. Las 404 y el blog «Próximamente» son `noindex` por diseño: no llevan canonical, `hreflang` ni JSON-LD (404) y se excluyen del sitemap.

**Comprobaciones por página:** `lang` correcto según la ruta · `title` único y ≤ 60 · `description` única de 150–160 · un solo `h1` · `canonical` absoluto y autorreferente · `hreflang` autorreferente, recíproco, con `x-default` y destinos existentes · Open Graph y Twitter completos con imagen existente · JSON-LD válido, con `@id` resueltos y sin cadenas vacías · `robots` coherente con el entorno · `alt` en todas las imágenes · enlaces internos sin romper y sin referencias a entornos de pruebas.
