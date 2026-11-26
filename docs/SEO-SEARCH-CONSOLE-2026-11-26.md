# Search Console tras el lanzamiento: clasificación de las URLs (26/11/2026)

**Origen:** cobertura de Indexación de páginas del 16/11/2026, exportada el 25/11 (`docs/gsc/`). El lanzamiento fue el 10/11/2026.
**Cómo se clasificó:** cada URL se pidió a producción el 26/11/2026, con 2 s de pausa entre peticiones.

## Resumen de la cobertura (16/11/2026)

| Motivo | Páginas | Estado |
|---|---|---|
| Indexadas | 19 | — |
| No se ha encontrado (404) | 18 | ✅ Clasificadas: ya tienen respuesta definitiva (sección 1). Falta «Validar corrección» |
| Excluida por `noindex` | 6 | ✅ Clasificadas: ninguna es un error nuevo (sección 2) |
| Página con redirección | 3 | ⏳ Sin exportar. Esperado: son URLs antiguas que ahora redirigen |
| Descubierta: actualmente sin indexar | 31 | ⏳ Sin exportar. Decisión de Google sobre un sitio nuevo, no un error técnico |
| Rastreada: actualmente sin indexar | 3 | ⏳ Sin exportar. Igual |

## 1. Las 18 «No se ha encontrado (404)»

Todas se rastrearon entre el 28/08 y el 08/11, **antes del lanzamiento**, cuando el servidor devolvía 404 para ellas. Google no las ha vuelto a rastrear, y por eso Search Console las sigue mostrando.

| Grupo | URLs | Respuesta hoy |
|---|---|---|
| (b) URL antigua con redirección correcta | 7 posts: `/μαθήματα-από-τη-μογγολία…` (wp 2178), `/γιατί-να-συμμετάσχεις…` (wp 3284), `/βίντεο-σειρά…` (wp 3375), `/5-τρόποι…` (wp 3254), `/ενσυνείδητη-γονεϊκότητα…` (wp 3004), `/άρθρο-στο-project-parenting/` (wp 1617), `/η-ζωή-τον-καιρό…` (wp 1663) | 301 → `/nea/` |
| | 4 páginas: `/υπηρεσίες/`, `/συμβουλευτική-γονέων/`, `/mindfulness/`, `/eπιμόρφωση-επαγγελματιών/` | 301 → su equivalente |
| | 3 de archivo: `/category/blog/page/2/`, `/category/poroi/`, `/tag/mongolia/` | 301 → `/nea/` (patrón) |
| (a) 410 intencionado | `/facebook-live/` (wp 3380), `/νέος-κύκλος-πρόγραμμα-διαχείρισης-γο/` (wp 3017) | 410 |
| (b) Debería redirigir y no lo hacía | `/author/maria/` (archivo de autora del WordPress; el CSV de URLs antiguas no lo incluía) | 301 → `/sxetika/` desde el 26/11 |
| (c) Origen desconocido | `/el/` (no sale en el XML ni se enlaza desde la web nueva) | 301 → `/` desde el 26/11 |
| (d) Ruta nueva rota | — | Ninguna |

**Qué hacer:** pulsar «Validar corrección» en «No se ha encontrado (404)». Google tardará unos días en rastrearlas de nuevo y debería pasarlas a «Página con redirección» o a «No se ha encontrado (410)».

## 2. Las 6 «Excluida por una etiqueta noindex»

| URL | Causa | Estado |
|---|---|---|
| `/nea/` | Blog «Próximamente», `noindex, follow` a propósito | ✅ Esperado |
| `/απλοί-τρόποι-για-να-είμαστε-πιο-mindful-στην/` (wp 2223) | 301 → `/nea/`, que es `noindex`; Google atribuye el `noindex` del destino a la URL antigua | ⚠️ Riesgo 3 |
| `/μια-άσκηση-για-να-αντέχω-τα-δύσκολα-συν/` (wp 2189) | Igual | ⚠️ Riesgo 3 |
| `/τελευταία-νέα/` | La página «Últimas noticias» redirige por diseño a `/nea/` | ⚠️ Riesgo 3 |
| `http://www.mariadimitropouloulopez.com/` (rastreada el 08/11) | Era la página «en construcción», que llevaba `noindex, nofollow` (`docs/index.html`). Hoy da 301 → `/` | ✅ Obsoleto |
| `https://www.mariadimitropouloulopez.com/` (rastreada el 29/10) | Igual | ✅ Obsoleto |

- **No verificado:** que las 3 del riesgo 3 estén ahí por la redirección a `/nea/`. Es la explicación que encaja (las rastreó el 10/11, el día del lanzamiento), pero Search Console no da el motivo exacto por URL.
- **No aparecen** `/es/blog/`, `/en/blog/` ni las páginas 404: Google aún no las ha incluido en esta lista.
- **Conclusión:** ninguna página indexable lleva `noindex` por error. El único arreglo es el ya previsto: al republicar contenido, quitar el `noindex` de `/nea/` (`[...blogPath].astro` y `NOINDEX` de `astro.config.mjs`) y cambiar las líneas `# wp <id>` por la URL nueva.

## 3. Decisiones y pendientes

- **Opción D** (26/11/2026): 14 anuncios pasados → 410, el resto → `/nea/`. Ver `docs/REDIRECCIONES-PROPUESTA-2026-11-26.md`.
- **`/blog/`:** sigue en 404. Se decidirá cuando se republique el contenido del blog.
- **5 posts dudosos del 410** (1622, 1720, 2517, 3375, 3391): siguen yendo a `/nea/` hasta que María decida.
- **Pendiente de exportar:** «Página con redirección» (3), «Descubierta: sin indexar» (31) y «Rastreada: sin indexar» (3). Solo hace falta si se quiere revisarlas.
