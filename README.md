# mariadimitropouloulopez.com

Sitio web de la Dra. María Dimitropoulou López, psicóloga (apoyo psicológico, asesoramiento parental, mindfulness y formación profesional). Consulta presencial en Chalandri (Atenas) y online. Astro 7 estático, Tailwind v4, tres idiomas: griego (por defecto, en la raíz), español (`/es/`) e inglés (`/en/`).

> **Empieza por [CLAUDE.md](./CLAUDE.md)** (es un enlace a `AGENTS.md`): brief, stack, sistema de diseño, colecciones de contenido, convenciones y la lista de «cosas que NO hacer». Este README es el mapa rápido; CLAUDE.md manda.

## Estado (10/11/2026)

- **Fase 3 (páginas) casi cerrada** y **SEO técnico completo** (auditoría, metas, JSON-LD, sitemap, 404, `.htaccess`, redirecciones del antiguo WordPress, `llms.txt`, verificación automática).
- El **blog** es una página temporal «Próximamente» (`noindex`); la plantilla de posts es la fase 4 del proyecto.
- Hay un **draft completo en Vercel** (rama `draft/revision-maria`) para revisión de María. **Producción** (Nicalia) sigue con la página «en construcción» hasta el lanzamiento.
- Pendiente antes de lanzar: documento Word de correcciones de María (ver `docs/correcciones-maria.md`), textos legales (abogado), datos de la consulta y consentimiento de los testimonios (ver `docs/SEO-DATOS-PENDIENTES.md`).

## Comandos

```bash
npm run dev          # servidor de desarrollo (astro dev --background en Claude Code)
npm run build        # build de PREVIEW: noindex + robots.txt «Disallow: /». Es lo que ejecuta Vercel
npm run build:prod   # build de PRODUCCIÓN (SITE_ENV=production): indexable. Lo único que se sube a Nicalia
npm run seo:check    # build:prod + verificación SEO de dist/ + informe docs/SEO-VERIFICACION.md
npm run preview      # previsualizar el build
npx astro check      # tipos y diagnósticos (antes de cada commit)
npm run images:webp -- --delete   # convierte PNG/JPG nuevos a WebP y borra los originales
```

Al terminar cualquier tarea: `npx astro check` y `npm run build`, y corregir lo que falle. Requiere Node ≥ 22.12.

### ⚠️ `build` vs `build:prod`

Son dos builds distintos a propósito. **Subir a Nicalia el resultado de `npm run build` deja la web sin indexar** (`noindex` y `robots.txt` bloqueando todo). Para producción: `npm run build:prod` (o `npm run seo:check`) y comprobar después que `/robots.txt` dice `Allow: /`. Procedimiento completo en [`docs/DESPLIEGUE.md`](docs/DESPLIEGUE.md).

`scripts/seo-check.mjs` se ejecuta solo tras cada build (`postbuild`, también en Vercel) y **hace fallar el build** si algo se rompe: título > 60 o duplicado, description fuera de 150–160 o duplicada, `hreflang` roto, canonical incorrecto, JSON-LD inválido, imagen sin `alt`, enlace roto, un preview sin `noindex`… El mensaje indica página y motivo.

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Textos de interfaz (3 idiomas, tipados) | `src/i18n/ui.ts`. **Ningún texto visible va hardcodeado en componentes.** |
| Rutas traducidas (fuente única) | `src/i18n/routes.ts`; enlaces siempre con `localizedPath(routeKey, lang)` |
| Contenido | `src/content/{services,about,testimonials,legal,blog}/{el,es,en}/` (esquemas en `src/content.config.ts`) |
| Constantes y datos de contacto, entorno, modalidad, Plausible | `src/consts.ts` |
| SEO por página | `src/components/seo/SEO.astro` + `src/utils/jsonld.ts` (cada página declara su `schema`) |
| Destacados en negrita de María | `<span class="highlight">` en el cuerpo, `**…**` en `description` (`src/utils/highlight.ts`) |
| Tokens de diseño | `src/styles/global.css` (`@theme`). Colores y fuentes **no se cambian** sin acordarlo |
| `robots.txt`, `llms.txt`, 404 | Generados: `src/pages/robots.txt.ts`, `src/pages/[name].txt.ts`, `src/pages/404.astro` y `[...notFoundPath].astro` |
| Servidor (Apache/Nicalia) | `public/.htaccess`: HTTPS, host sin `www`, barra final, 404 por idioma, **57 redirecciones 301 del WordPress antiguo** |

## Reglas que más se rompen

- **Textos de María:** el español es suyo y se publica tal cual (solo erratas de tecleo evidentes). El griego y el inglés son borradores con `TODO: revisar traducción` hasta que ella los valide. No se inventa contenido, credenciales, testimonios ni datos.
- **Imágenes:** todo en `.webp` (`npm run images:webp -- --delete`); siempre con `<Image />` y `alt` en el idioma de la página.
- **Cero JavaScript en cliente** salvo lo documentado en CLAUDE.md (menú móvil, selector de idioma, formulario, slider de testimonios, Plausible solo en producción).
- **Analítica:** solo Plausible (sin cookies). Cualquier otro script de terceros requeriría consentimiento y actualizar Privacidad y Cookies en los tres idiomas.
- **Al editar un texto legal**, actualizar `updatedDate`. **Al republicar un post del WordPress antiguo**, cambiar su línea en `public/.htaccess` (`# wp <id>`) por la URL nueva.
- **Commits** con el pie de co-autoría de la sesión; `git push` solo cuando se pida. Vercel es solo para vistas previas (no añadir el dominio real ni APIs específicas de Vercel).

## Documentación en `docs/`

| Archivo | Para qué |
|---|---|
| [`SEO-INFORME-FINAL.md`](docs/SEO-INFORME-FINAL.md) | **Empieza aquí para SEO:** cambios, decisiones, comprobaciones manuales y riesgos abiertos |
| [`SEO-VERIFICACION.md`](docs/SEO-VERIFICACION.md) | Matriz página × idioma × comprobación (la regenera `seo:check`) |
| [`SEO-DATOS-PENDIENTES.md`](docs/SEO-DATOS-PENDIENTES.md) | Datos que faltan, por responsable (María, abogado, técnico) |
| [`SEO-AUDITORIA.md`](docs/SEO-AUDITORIA.md), [`SEO-METAS-PROPUESTAS.md`](docs/SEO-METAS-PROPUESTAS.md) | Auditoría inicial y las 48 meta descriptions propuestas |
| [`DESPLIEGUE.md`](docs/DESPLIEGUE.md) | Orden de subida a Nicalia, vuelta atrás y `curl` de verificación |
| [`REDIRECCIONES-WORDPRESS.md`](docs/REDIRECCIONES-WORDPRESS.md) | Mapa de redirecciones 301 (aplicado) |
| [`LLMS-TXT.md`](docs/LLMS-TXT.md) | Decisiones del `llms.txt` |
| [`correcciones-maria.md`](docs/correcciones-maria.md) | Estado de las correcciones de textos de María y lista de verificación |
| `revision-draft-2026-10-26.md` | Revisión previa al primer draft (histórico) |
| `index.html` | Página «en construcción» (referencia visual) |

## Próximos pasos

1. Aplicar el documento Word de correcciones de María (español e inglés; el griego ya está aplicado).
2. Resolver los datos pendientes (`docs/SEO-DATOS-PENDIENTES.md`) y la revisión legal.
3. Fase 4 del proyecto: plantilla del blog (`BlogPosting`, RSS por idioma, sitemap) y quitar el `noindex` de `/nea/` con el primer post.
4. Lanzamiento: `npm run seo:check`, subida a Nicalia según `docs/DESPLIEGUE.md`, Search Console y Plausible.
