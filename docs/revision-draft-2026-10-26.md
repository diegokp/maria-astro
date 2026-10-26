# Revisión del draft para María — 26/10/2026

Revisión completa del proyecto antes de publicar en Vercel (rama `draft/revision-maria`) el primer draft que verá María. El blog queda como página «Próximamente» a propósito.

## Resultado

El draft está listo para enseñarse. No hay errores de tipos, el build es limpio y las 45 páginas (15 por idioma) pasan todas las comprobaciones automáticas.

## Qué se ha comprobado

| Comprobación | Resultado |
|---|---|
| `npx astro check` | 0 errores, 0 avisos, 0 sugerencias |
| `npm run build` | 45 páginas; único aviso: la colección `blog` está vacía (esperado) |
| Enlaces internos e imágenes | Ninguno roto |
| Un solo `<h1>` por página | Correcto en todas |
| `hreflang` (el, es, en + `x-default`), `canonical`, `<html lang>` | Correcto en todas |
| `noindex, nofollow` (sitio sin lanzar) | Presente en todas: Google no indexará el preview |
| Restos visibles (`**`, spans escapados, `undefined`, llaves sin resolver) | Ninguno |
| Claves de `ui.ts` sin usar | Ninguna |
| PNG/JPG versionados (regla «todo en WebP») | Ninguno |
| Desbordamiento horizontal a 360 px (Chrome sin interfaz, todas las páginas) | Ninguno (tras el arreglo de abajo) |
| Revisión visual con capturas (home es/el, móvil, Sesiones, detalle, Sobre mí, Contacto, Blog) | Correcta; ver «Pendiente técnico» sobre el griego |

## Arreglos hechos en esta revisión

- **Tablas legales a 360 px:** el Aviso legal en español y en griego se salía de la pantalla en móvil por correos y palabras largas en las celdas. Ahora parten la línea (`overflow-wrap: anywhere` en `.prose-content td`).
- **`demo.html` fuera del despliegue:** la maqueta de referencia estaba en `public/` y se publicaba en `/demo.html`, cargando Google Fonts por CDN (va contra la regla del RGPD). Se movió a `docs/index.html`, donde CLAUDE.md ya la situaba.
- **«boletín» → «newsletter»:** la casilla de consentimiento en español decía «el boletín» mientras el título dice «mi newsletter». Ahora es coherente con el título y con las versiones en griego e inglés.
- **CLAUDE.md al día:**
  - **Home:** muestra dos tarjetas (Sesiones y Cursos), no los tres primeros servicios.
  - **Documentación nueva:** los destacados (`.highlight` / `**…**`), el componente `Divider` y la excepción de JavaScript del slider de testimonios.
  - **Newsletter:** las etiquetas por idioma ya están configuradas.
  - **Línea de estado:** actualizada la de la fase 3.

## Pendiente de María (contenido)

Nada de esto bloquea el draft, pero conviene repasarlo con ella:

1. **Traducciones al griego y al inglés:** están marcadas como `TODO: revisar traducción`. Afectan a:
   - las páginas de servicios y Sobre mí;
   - los textos de la home: Intro, título de servicios y llamadas a la acción;
   - Contacto;
   - el título «Experiencias compartidas».
2. **Término «psicopedagoga»:** se tradujo como ψυχοπαιδαγωγός / *psychopedagogue*; conviene que lo confirme.
3. **Cifras cambiadas respecto a su Excel:**
   - **Teacher Talk:** se pasó de «22 horas» a **21 horas** (3 módulos × 7 h).
   - **ABC and Beyond:** ahora dice **15 horas** (antes «entre 15 y 18»).
4. **Erratas de tecleo corregidas en sus textos** («Concienca», «Conciente», «sesion», «tambien», «mas», «rutinas diaria»). Ninguna cambia el sentido.
5. **Testimonios:**
   - **Consentimiento:** confirmar el consentimiento escrito de cada persona antes del lanzamiento (son datos de salud, RGPD).
   - **Cursos y Matrescencia:** no tienen testimonios; la sección no aparece hasta que los haya.
6. **Slugs en griego** de las URLs: son una propuesta y debe validarlos.
7. **Textos legales:** son borradores. Faltan el ΑΦΜ, la colegiación profesional, la ley nacional aplicable y la jurisdicción (los rellena un/a abogado/a). En el Aviso legal se ve «TODO: pendiente» en esos campos, a propósito, para que no pasen desapercibidos.
8. **Imágenes de baja resolución:** el logo de ABC and Beyond (516 px), la ilustración de Teacher Talk (376 px) y el arcoíris de la tarjeta de Sesiones (300 px). Se ven bien, pero algo blandas en pantallas retina. Si tiene versiones mayores, se sustituyen.
9. **Enlace al CV:** apunta a LinkedIn, que a veces pide iniciar sesión a quien no tiene cuenta. La alternativa sería un PDF del currículum alojado en la web.
10. **«Seminarios y charlas»:** sigue aparcado, sin página. Hay que decidir dónde va.

## Pendiente técnico

- **Titulares en griego:** la fuente manuscrita (Mandys Sketch) no tiene letras griegas, así que el navegador usa otra fuente para el griego.
  - **Efecto visible:** los títulos griegos no tienen el aire manuscrito del resto.
  - **Títulos mixtos:** en los que mezclan alfabetos, como «Εγγραφείτε στο newsletter μου», se ven dos fuentes distintas en la misma línea.
  - **Decisión pendiente:** elegir una fuente manuscrita con griego como alternativa para `el` (CLAUDE.md ya lo prevé). Es lo más visible si María navega en griego.
- **Imagen para compartir (`og:image`):** no hay. Al compartir el enlace por WhatsApp o redes no saldrá imagen de vista previa. Para la fase 5: la URL debe ser absoluta en el dominio de producción, que hoy aún muestra «en construcción».
- **Fase 5 (antes del lanzamiento):** página 404, sitemap y línea `Sitemap:` en `robots.txt`, método de subida a Nicalia, y `SITE_LAUNCHED = true`.
- **Newsletter:** la página de confirmación y el correo de doble opt-in de Mailchimp salen en el idioma de la audiencia, no en el de quien se suscribe. Es una limitación de Mailchimp, no del código.
- **Accesibilidad del slider:** avanza solo y se pausa con el ratón o el foco. WCAG 2.2.2 pide además un control visible de pausa; hoy no lo tiene, por decisión de diseño.
- **Imágenes sin uso:** `src/assets/images/cloud.webp` y `family.webp` no se usan. No se publican (Astro solo incluye las importadas) y se pueden borrar.
- **`docs/arquitectura-contenido.md`:** CLAUDE.md lo cita, pero no existe en el repo.
- **Dispositivos reales:** la revisión visual se hizo con Chrome sin interfaz. Falta probar en Safari de iPhone y en un Android real.
