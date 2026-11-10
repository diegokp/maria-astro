# llms.txt — informe de generación (fase 5 SEO, 10/11/2026)

**Archivo:** `https://mariadimitropouloulopez.com/llms.txt`, generado en el build por `src/pages/[name].txt.ts`. **Solo existe en el build de producción** (`npm run build:prod`) y solo si `AI_CRAWLERS = 'allow'` en `src/consts.ts`. En preview no se genera.

## Decisiones

- **Un solo archivo en la raíz, no uno por idioma.** El estándar define una única ubicación (`/llms.txt`) y los asistentes solo la consultan allí; un archivo por idioma (`/es/llms.txt`) no lo buscaría nadie. La descripción principal va en inglés y hay una sección por idioma: English, Ελληνικά, Español.
- **Generado, no escrito a mano.** Títulos y descripciones salen de `ui.ts` (`*.seo.title`, `*.seo.description`) y de la colección `services` (`title`, `metaDescription`), y las URLs de `routes.ts`. Si cambia una meta, cambia el `llms.txt`.
- **Páginas incluidas (11 por idioma, 33 en total):** inicio, María, índice de Sesiones y sus 3 servicios, índice de Cursos y sus 3 programas, y Contacto.
- **Excluidas:**
  - **Legales:** sin valor para un asistente.
  - **Blog «Próximamente»:** `noindex` y sin contenido.
  - **404 y Seminarios:** aparcado, sin página.
- **Datos clave:** solo lo verificado en la web: profesión y doctorado, servicios, cursos, enfoque, experiencia investigadora y docente, colaboraciones con enlace, dirección de la consulta, idiomas y contacto. Sin precios, años ni cifras: lo pendiente está en `docs/SEO-DATOS-PENDIENTES.md` y no se declara. Tampoco hay afirmaciones clínicas ni promesas de resultados.

## Validación

- 33 enlaces absolutos, todos existen en `dist/` y están en el sitemap (indexables).
- Cita de 174 caracteres (límite del estándar: 200). El archivo tiene 67 líneas.
- Servido como `text/plain; charset=utf-8` (endpoint y `.htaccess`).

## Pendiente / opcional

- **`llms-full.txt`** con el texto completo de las páginas clave: no se ha creado. Tiene sentido cuando el contenido sea definitivo, es decir, tras las correcciones de María. Se puede generar igual, desde las colecciones.
- **Blog:** cuando haya posts publicados, añadir una sección con los más relevantes.
- **Actualización:** automática en cada build. No requiere mantenimiento manual.

`llms.txt` no es un estándar adoptado oficialmente por los grandes buscadores. Es barato de mantener, pero no sustituye a las metas, al JSON-LD ni al sitemap.
