# CLAUDE.md — mariadimitropouloulopez.com

Sitio web de la Dra. María Dimitropoulou López, psicóloga (apoyo psicológico, asesoramiento parental, mindfulness y formación profesional). Consulta presencial en Chalandri (Atenas) y online.

Lee este archivo al inicio de cada sesión. Si una decisión contradice lo que hay aquí, pregunta antes de cambiarlo, y actualiza este archivo cuando se acuerde un cambio.

---

## Stack

- **Astro 7**, `output: 'static'`, TypeScript en modo `strict`.
- **Tailwind CSS v4** mediante `@tailwindcss/vite` en `vite.plugins`.
- **Content collections** (content layer): `src/content.config.ts`, loaders `glob()`, esquemas con `zod` importado desde `astro/zod`.
- **i18n nativo de Astro** (`i18n` en `astro.config.mjs`) + helpers propios en `src/i18n/`.
- `@astrojs/sitemap` con configuración i18n.
- Opcional: `@astrojs/mdx`, solo si un post necesita componentes.
- Node: la versión que indique `.nvmrc`. Gestor de paquetes: npm.

## Comandos

```bash
npm run build      # build de producción (debe pasar sin errores)
npm run preview    # previsualizar el build
npx astro check    # tipos y diagnósticos; ejecutar antes de cada commit
npm run images:webp              # convierte PNG/JPG nuevos a WebP (conserva originales)
npm run images:webp -- --delete  # convierte y borra los originales
```

Al terminar cualquier tarea, ejecuta `npx astro check` y `npm run build`, y corrige lo que falle antes de dar la tarea por cerrada.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

### Imágenes: todo en WebP

- **Todas las imágenes del repo son `.webp`.** No se versionan PNG ni JPG (las fuentes SVG, como `src/icons/`, quedan fuera de esta regla).
- La conversión se hace con **sharp**, la misma librería que Astro usa para optimizar imágenes en el build. Está declarada en `devDependencies` con la misma versión que trae Astro, para que el script no dependa de una dependencia transitiva.
- Script: `scripts/images-to-webp.mjs` (`npm run images:webp`). Recorre `public/images/` y `src/assets/images/`, convierte cada `.png`/`.jpg`/`.jpeg` a `.webp` (calidad 85, transparencia intacta, orientación EXIF aplicada) y reduce a un máximo de 2400 px por lado sin ampliar las pequeñas. No sobrescribe un `.webp` existente.
- Flujo al añadir una imagen nueva:
  1. Copia el original en `src/assets/images/` (si se muestra con `<Image />`, lo habitual) o en `public/images/` (solo si debe servirse tal cual, p. ej. el logo).
  2. `npm run images:webp -- --delete`.
  3. Referencia el `.webp` en el código.
  4. `npx astro check && npm run build`.
- Las imágenes de `src/assets/` además las reoptimiza Astro en el build (tamaños responsivos vía `widths`/`sizes`); las de `public/` se sirven tal cual, así que deben convertirse antes de añadirse.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Skills

Las skills del proyecto están en `.claude/skills/` y se cargan solas según su descripción. Esta tabla indica **cuándo usar cada una y qué manda en caso de conflicto**.

| Skill | Úsala para | Notas |
|---|---|---|
| `frontend-design` (anthropics/skills) | Diseñar secciones y páginas: composición y layout, tratamiento del hero, escala tipográfica, espaciado, ritmo vertical, detalles de textura y microinteracciones. | **La identidad visual ya está decidida.** La skill anima a elegir paleta y tipografías nuevas y a asumir riesgos estéticos: aquí NO se cambian colores ni fuentes (ver "Sistema de diseño"). La distinción debe venir de la composición y del mundo de María (infancia, juego, familia, calma), no de nuevos tokens. El "brief" y el cliente ya están definidos en este archivo y en `docs/`: no hace falta proponerlos ni confirmarlos. Descarta direcciones como brutalista o retro-futurista: el tono es cálido y sereno. Código siempre en `.astro` + Tailwind, no React/Vue. |
| `tailwind-design-system` (wshobson/agents) | Montar y mantener `global.css`: bloque `@theme`, jerarquía de tokens (marca → semánticos → componente), `@utility` propias, variantes de alfa con `color-mix()`, animaciones con `@keyframes`/`@starting-style`, patrones de foco y ARIA. | La skill está orientada a React y a librerías de componentes; aquí se adapta: **(1) Sin CVA ni dependencias JS de variantes**: las variantes de `Button`, `Card`, etc. se resuelven con props tipadas + un objeto de clases + `class:list` en `.astro`. **(2) Sin dark mode**: ignora `@custom-variant dark` y todo lo relacionado. **(3) Los colores de marca se mantienen en hex** exactamente como en "Sistema de diseño"; no los conviertas a OKLCH ni los "ajustes". Sí puedes usar `color-mix()` para derivar transparencias (p. ej. `mustard-soft`). **(4) Tokens semánticos** (`--color-surface`, `--color-text`, `--color-accent`, `--color-focus`…) mapeados a los de marca; los componentes usan los semánticos. |
| `geo-llmstxt` (zubair-trabzada/geo-seo-claude) | Generar `llms.txt` (y opcionalmente `llms-full.txt`) para que los asistentes de IA entiendan y citen bien el sitio. **Solo en la fase 5**, cuando el contenido real ya exista. | **(1) Generado, no escrito a mano:** crea un endpoint estático (`src/pages/llms.txt.ts`) que lea el mapa de rutas y las colecciones, para que nunca se desincronice del sitio. **(2) Multiidioma:** un único `llms.txt` en la raíz, con la descripción principal en inglés y secciones de enlaces por idioma (el / es / en) apuntando a las URLs canónicas. **(3) Solo contenido publicado:** excluye posts `draft` y testimonios no aprobados. **(4) Datos solo de fuentes verificadas** (este archivo y `docs/`): la skill anima a declarar datos clave como precios o ubicación; si un dato es `TODO`, se omite, nunca se inventa. **(5)** Ignora las partes de la skill sobre auditar sitios de terceros: aquí solo se genera el archivo propio. |
| `seo-audit` (coreyhaines31/marketingskills) | **Revisar, no construir.** Auditoría SEO al cerrar la fase 3 (páginas) y antes del lanzamiento (fase 5). | **(1) Contexto:** la skill busca un archivo de contexto de marketing; usa este CLAUDE.md y `docs/arquitectura-contenido.md` en su lugar y no preguntes lo que ya está aquí. **(2) Tipo de sitio: negocio local de salud** (psicóloga en Chalandri, Atenas + online). Prioriza SEO local y E-E-A-T: credenciales visibles, autoría de los posts, datos de contacto coherentes en todo el sitio. **(3) Auditar el build** (`npm run build` → `dist/`) o el preview local, no la web en producción, que sigue siendo la página "en construcción". **(4) Incluir revisión multiidioma:** `hreflang` recíproco, canonical por idioma, `<html lang>`, metas traducidas y no duplicadas. **(5) Entregable:** informe con prioridades en `docs/seo-audit-AAAA-MM-DD.md`; **no apliques cambios** hasta que se aprueben. No toques el copy clínico por motivos de palabras clave sin aprobación de María. |
| `TODO: nombre-skill` | `TODO: tarea` | `TODO` |

Reglas:
- Antes de empezar una tarea, comprueba si alguna skill aplica y léela.
- **Si una skill contradice este archivo, manda CLAUDE.md.** Por ejemplo, los tokens, las fuentes, la estructura de i18n y la lista de "Cosas que NO hacer" tienen prioridad sobre las recomendaciones genéricas de una skill de diseño o de Astro.
- Si detectas un conflicto, síguelo según CLAUDE.md y avísalo al terminar la tarea.

---

## Idiomas y rutas

- Locales: `el` (griego, **por defecto**), `es` (español), `en` (inglés).
- Griego en la raíz sin prefijo (`prefixDefaultLocale: false`), con español en `/es/` e inglés en `/en/
- Los slugs se traducen por idioma. El griego se translitera a caracteres latinos en minúsculas con guiones. **Nunca uses alfabeto griego en URLs.**
- Barra final en todas las URLs (`trailingSlash: 'always'`).

### Mapa de rutas (fuente única: `src/i18n/routes.ts`)

| Clave (`routeKey`) | el | es | en |
|---|---|---|---|
| `home` | `/` | `/es/` | `/en/` |
| `sessions` | `/synedries/` | `/es/sesiones/` | `/en/sessions/` |
| `service.psychotherapy` | `/synedries/psychotherapeftiki-ypostirixi/` | `/es/sesiones/apoyo-psicoterapeutico/` | `/en/sessions/psychotherapeutic-support/` |
| `service.parental` | `/synedries/goneiki-oikogeneiaki-therapeia/` | `/es/sesiones/terapia-parental-familiar/` | `/en/sessions/parental-family-therapy/` |
| `service.matrescence` | `/synedries/metavasi-sti-mitrotita/` | `/es/sesiones/matrescencia/` | `/en/sessions/matrescence/` |
| `courses` | `/programmata/` | `/es/cursos/` | `/en/courses/` |
| `service.teacher-talk` | `/programmata/teacher-talk/` | `/es/cursos/teacher-talk/` | `/en/courses/teacher-talk/` |
| `service.abc-beyond` | `/programmata/abc-and-beyond/` | `/es/cursos/abc-and-beyond/` | `/en/courses/abc-and-beyond/` |
| `service.mindful-parenting` | `/programmata/mindful-parenting/` | `/es/cursos/mindful-parenting/` | `/en/courses/mindful-parenting/` |
| `service.talks` (aparcado: sin página) | `/ypiresies/seminaria-kai-omilies/` | `/es/servicios/seminarios-y-charlas/` | `/en/services/seminars-and-talks/` |

- **Sesiones y Cursos:** `SERVICE_GROUPS` en `routes.ts` reparte los servicios en dos índices: `sessions` (`psychotherapy`, `parental`, `matrescence`) y `courses` (`teacher-talk`, `abc-beyond`, `mindful-parenting`). El grupo se deriva de `serviceKey`, no del frontmatter.
- **`talks` (Seminarios y charlas) está aparcado:** sigue en `SERVICE_KEYS` y en la colección, pero sin grupo no se genera su página ni aparece en listados ni en la nav. Su ruta es provisional hasta decidir dónde se reubica (otra página o la home). En el índice de cada grupo, las tarjetas muestran la `description` del servicio.
- Cabecera: con 6 ítems en la nav, el menú de escritorio aparece desde `lg` (1024 px); por debajo, menú móvil.
| `about` | `/sxetika/` | `/es/sobre-mi/` | `/en/about/` |
| `blog` | `/nea/` | `/es/blog/` | `/en/blog/` |
| `contact` | `/epikoinonia/` | `/es/contacto/` | `/en/contact/` |
| `legal` | `/nomiko-simeioma/` | `/es/aviso-legal/` | `/en/legal-notice/` |
| `privacy` | `/aporrito/` | `/es/privacidad/` | `/en/privacy/` |
| `cookies` | `/cookies/` | `/es/cookies/` | `/en/cookies/` |

Los slugs griegos son una propuesta; María debe validarlos antes del lanzamiento.

### Reglas de i18n

- **Ningún texto visible hardcodeado en componentes.** Los strings de interfaz (navegación, botones, etiquetas, avisos) viven en `src/i18n/ui.ts`, tipados, con las tres traducciones. Si falta una clave en un idioma, TypeScript debe fallar.
- Los enlaces internos se generan siempre con el helper `localizedPath(routeKey, lang)`. **Nunca escribas rutas a mano en un `href`.**
- El selector de idioma lleva a la **página equivalente** en el otro idioma, no a la home. Para posts del blog usa `translationKey`. Si no existe traducción, lleva al índice del blog de ese idioma.
- Cada página emite `hreflang` para los tres idiomas + `x-default` (apunta a `el`).
- `<html lang>` correcto por página (`el`, `es`, `en`).

---

## Estructura de carpetas

```
src/
  components/
    forms/         ContactForm (Web3Forms, textos desde ui.ts, validación accesible)
    layout/        Header, Footer, LanguageSwitcher, MobileMenu
    seo/           SEO.astro (title, description, canonical, hreflang, OG)
    ui/            Button, Card, Divider… (piezas reutilizables sin lógica de negocio)
    sections/      Hero, ServicesGrid, Newsletter, CallToAction (reutilizable: home, servicios, posts), Testimonials, LatestPosts…
  content/
    blog/{el,es,en}/*.md
    services/{el,es,en}/*.md
    testimonials/{el,es,en}/*.md
    about/{el,es,en}/about.md
  i18n/
    ui.ts          diccionario de strings de interfaz
    routes.ts      mapa de rutas traducidas
    utils.ts       getLangFromUrl, t(), localizedPath(), getAlternates()
  layouts/
    BaseLayout.astro
    PostLayout.astro
  pages/           rutas por idioma (el en la raíz, es/ y en/ como subcarpetas)
  styles/
    global.css     @import "tailwindcss" + @theme con los tokens
  content.config.ts
public/
  fonts/           MandysSketch (si no la gestiona la Fonts API)
  images/
docs/
  arquitectura-contenido.md   sitemap, brief por página y copy (⚠️ aún no existe en el repo)
  index.html                  página "en construcción" publicada (referencia visual)
```

Para evitar triplicar páginas, usa rutas dinámicas con `getStaticPaths()` que generen las tres versiones desde el mapa de rutas y las colecciones, en lugar de copiar el mismo `.astro` en tres carpetas.

---

## Content collections

### `blog`

```ts
{
  title: string,
  description: string,        // extracto, máx. ~160 caracteres
  pubDate: Date,
  updatedDate?: Date,
  category: 'ansiedad' | 'crianza' | 'mindfulness' | 'infancia' | 'formacion', // provisional, confirmar lista
  image?: image(),            // con alt obligatorio si hay imagen
  imageAlt?: string,
  lang: 'el' | 'es' | 'en',
  translationKey: string,     // mismo valor en todas las traducciones de un post
  draft: boolean              // default false; los draft no se publican en build
}
```

- Las categorías se guardan como clave neutra y se traducen en `ui.ts`.
- Un post puede existir en un solo idioma. No generes traducciones automáticas de contenido sin que se pida.
- RSS por idioma.

### `services`

```ts
{
  serviceKey: 'psychotherapy' | 'parental' | 'matrescence' | 'teacher-talk'
            | 'abc-beyond' | 'mindful-parenting' | 'talks',   // SERVICE_KEYS en routes.ts
  lang: 'el' | 'es' | 'en',
  title: string,              // H1 y título de la tarjeta
  description: string,        // entradilla bajo el H1 («Descripción» de María)
  metaTitle: string,
  metaDescription: string,    // máx. 160
  order: number,              // orden en el índice de su grupo (Sesiones o Cursos)
  cta: string,                // texto del botón a Contacto
  image: image(),             // ilustración decorativa de la tarjeta y la cabecera
  testimonialKey?: string
}
```

- Archivos: `src/content/services/{el,es,en}/<serviceKey>.md`. La URL **no** sale del nombre del archivo sino de `routes.ts` (`service.<serviceKey>`); una sola ruta dinámica, `src/pages/[...servicePath].astro`, genera todas las páginas de detalle (omite los servicios sin grupo). Los índices «Sesiones» y «Cursos» los genera `src/pages/[...servicesPath].astro` (grupo × idioma). `ServicesGrid` en los índices lee de la colección, filtrada por grupo; en la home muestra solo dos tarjetas (Sesiones y Cursos) con su botón al índice.
- Cuerpo en markdown con las secciones de María: **¿Para quién es?** / **Duración y frecuencia** / **¿Qué se trabaja?** (en el/en: «Σε ποιους απευθύνεται; / Διάρκεια και συχνότητα / Σε τι δουλεύουμε;» y «Who is it for? / Duration and frequency / What do we work on?»). Si falta una sección, se omite con un comentario `<!-- TODO -->`.
- Valores de texto del frontmatter **siempre entre comillas** (un `: ` dentro de un valor sin comillas rompe el YAML).
- **Textos:** el español es de María y se publica tal cual (incluido su lenguaje inclusivo: «niñes», «Adult@s», «l@s niñ@s»); solo se corrigen erratas de tecleo evidentes. Durante la construcción, el/en son borradores con `# TODO: revisar traducción` en el frontmatter; María los revisa antes del lanzamiento y, una vez publicado el sitio, entregará siempre los textos ya corregidos en los tres idiomas.
- Prosa del markdown: clase `.prose-content` en `global.css` (se reutilizará en el blog).
- **Destacados** (negritas del Excel de María): en el cuerpo, `<span class="highlight">…</span>`; en `description` (frontmatter, texto plano), `**…**`, que `src/utils/highlight.ts` convierte en el mismo span (y elimina en las tarjetas). Estilo `.highlight` en `global.css`: Roboto 400 en color de títulos.

### `legal`

```ts
{ legalKey: 'legal' | 'privacy' | 'cookies', lang, title: string, description: string, updatedDate: Date }
```

- Archivos: `src/content/legal/{el,es,en}/<legalKey>.md`; la clave legal es directamente su `routeKey`. Ruta única: `src/pages/[...legalPath].astro`.
- **Marco legal: solo RGPD** (y Directiva 2002/58/CE para cookies). La ley nacional aplicable, la autoridad de control, la jurisdicción, el ΑΦΜ y la colegiación profesional son `TODO` para revisión por un/a abogado/a; no se inventan.
- Los textos deben describir la web real: hoy **no usa cookies** (fuentes autoalojadas, sin analítica ni embeds) y el formulario pasa por **Web3Forms** → Gmail. Si cambia algo de esto (analítica, mapa, newsletter, hosting), actualiza Privacidad y Cookies en los tres idiomas.
- Al editar un texto legal, actualiza `updatedDate`.

### `about`

```ts
{ lang: 'el' | 'es' | 'en' }
```

- Cuerpo de «Sobre mí» en markdown: `src/content/about/{el,es,en}/about.md`, renderizado por `AboutBio.astro` con `.prose-content`. Secciones como `##`; los datos clave en negrita (`**…**`).
- El español es de María y se publica tal cual (solo erratas de tecleo evidentes); el/en son borradores con `# TODO: revisar traducción` en el frontmatter.

### `testimonials`

```ts
{ testimonialKey: string, lang, author: string, quote: string, serviceKey?: ServiceKey, order: number, approved: boolean }
```

- Archivos: `src/content/testimonials/{el,es,en}/<testimonialKey>.md` (solo frontmatter). Componente: `sections/Testimonials.astro`.
- `serviceKey` es la etiqueta: en el índice de un grupo (Sesiones/Cursos) salen los testimonios de sus servicios; en la página de un servicio, solo los suyos. Si no hay ninguno aprobado, la sección no se renderiza (hoy Cursos y Matrescencia no tienen).
- Los originales están en griego; las traducciones es/en están validadas por María. Todos con `approved: true`. ⚠️ `TODO`: confirmar el consentimiento escrito de cada persona antes del lanzamiento (datos de salud, RGPD).

**Solo se publican testimonios con `approved: true`.** Las citas deben estar confirmadas por María; nunca inventes ni "mejores" un testimonio.

---

## Sistema de diseño

Tomado de la página "en construcción" (`docs/index.html`), que a su vez sigue el sitio original.

### Tokens (`src/styles/global.css`, dentro de `@theme`)

| Token | Valor | Uso |
|---|---|---|
| `--color-canvas` | `#FFFFFF` | fondo por defecto de toda la web |
| `--color-cream` | `#EFEAE4` | fondo de "superficies": footer |
| `--color-mustard` | `#F8CD7E` | color de marca (logo), botones, iconos sociales |
| `--color-mustard-soft` | `rgba(248, 205, 126, 0.35)` | fondos suaves, resaltados |
| `--color-mint` | `#E9F6F3` | acento secundario: fondo de hover y enlace activo |
| `--color-ink` | `#525252` | texto principal |
| `--color-ink-soft` | `rgba(58, 58, 58, 0.66)` | texto secundario |
| `--color-heading` | `#606060` | color de los títulos (`h1`/`h2`/`h3`), distinto del texto principal |
| `--color-coral` | `#E47869` | solo foco (**nunca hover ni enlace activo**) |
| `--color-sage` | `#7A8C38` | acento verde |
| `--color-line` | `rgba(58, 58, 58, 0.15)` | bordes y separadores |

- **Capas de fondo** (tokens semánticos en `global.css`): `--color-canvas` (blanco — `body`, header, panel del selector de idioma) · `--color-surface` (crema — footer, newsletter y testimonios: secciones a todo el ancho que se separan del blanco) · `--color-surface-alt` (menta — reservado; ninguna sección lo usa ahora). Header, panel del selector y sección de servicios van en blanco; las tarjetas de servicio son transparentes (solo ilustración + texto).
- **Títulos:** todo `h1`/`h2`/`h3` real usa el token semántico `--color-text-heading` (→ `--color-heading`, `#606060`), no `--color-text`. Enlaces de navegación y botones que comparten tono con el texto principal siguen en `--color-text` — el cambio de color afecta solo a los encabezados, no a la interacción.
- **Hover y enlace activo** (`aria-current="page"`): el resaltado es menta, nunca coral/rojo. Se aplica como **fondo** con el token semántico `--color-hover` (→ `--color-mint`, `hover:bg-hover`) y el texto se queda en `ink`; nunca como color de texto (menta sobre blanco no tiene contraste).
- **Contraste:** el texto blanco sobre mostaza no llega a AA. En botones mostaza usa texto `ink`. Comprueba cualquier combinación nueva.
- Radio de borde característico: `12px` (como los iconos sociales).

### Tipografía

- **Titulares:** "Mandys Sketch" (manuscrita, peso 400). Solo para H1/H2 y detalles decorativos, nunca para párrafos ni texto pequeño. Verificar que tiene los glifos griegos; si no, definir un fallback de titulares para `el`.
- **Cuerpo:** Roboto 300 y 400.
- **Monoespaciada:** Roboto Mono (datos de contacto, pie, detalles).
- **Todas las fuentes autoalojadas** (Fonts API de Astro o archivos locales). Nada de Google Fonts por CDN: el sitio debe cumplir el RGPD.

### Tono visual

Cálido, sereno, cercano; mucho aire; nada corporativo ni clínico. Formas suaves, sin sombras duras. Animaciones mínimas y respetando `prefers-reduced-motion`. **Sin dark mode.**

---

## Convenciones de código

- Componentes `.astro` por defecto; **cero JavaScript en cliente** salvo lo imprescindible (menú móvil, selector de idioma, envío del formulario de contacto y avance automático del slider de testimonios, que se pausa con hover/foco y no actúa con `prefers-reduced-motion`). Nada de React/Vue sin acordarlo.
- Props tipadas con `interface Props` en cada componente.
- Utilidades de Tailwind en el marcado; `@apply` solo en `global.css` para estilos de prosa del blog o casos muy repetidos.
- Imágenes siempre con `<Image />` / `<Picture />` de `astro:assets`, con `alt` descriptivo en el idioma de la página (vacío solo si es decorativa).
- Nombres de archivo de componentes en PascalCase; rutas y slugs en kebab-case.
- HTML semántico: un solo `<h1>` por página, jerarquía de encabezados correcta, `<nav>` con `aria-label`, landmarks.
- Foco visible en todos los elementos interactivos (outline coral de 2px, como en `index.html`).
- Mobile first. Probar a 360px de ancho sin scroll horizontal.

## SEO

- Cada página pasa `title`, `description` y `routeKey` (o alternates) al componente `SEO.astro`.
- Canonical absoluto con el dominio `https://mariadimitropouloulopez.com`.
- Open Graph y Twitter card con imagen por defecto si la página no tiene una propia.
- Sitemap con alternates i18n. `robots.txt` en `public/`.
- **Datos estructurados (JSON-LD)**, generados en el componente SEO y renderizados en el HTML estático (nada inyectado por JS en cliente):
  · Inicio y Sobre mí: `Person` (María: credenciales, `sameAs` a sus redes) + `ProfessionalService` (área, idiomas, consulta en Chalandri y online).
  · Posts: `BlogPosting` con `author` → `Person`, fechas e `inLanguage`.
  · Todas las páginas internas: `BreadcrumbList`.
  · Sin datos inventados: dirección, teléfono u horarios en `TODO` se omiten del JSON-LD hasta confirmarlos.
- **Mientras el sitio no esté lanzado, los despliegues de preview llevan `noindex`.** La página "en construcción" sigue en producción hasta el lanzamiento.

## Despliegue

- **Producción: servidor de Nicalia** (hosting compartido). Se sube el contenido de `dist/` tras `npm run build`; el sitio es 100 % estático (`output: 'static'`), sin funciones de servidor.
- **Vercel solo para vistas previas** de revisión con María (rama `draft/revision-maria` y similares). No añadir el dominio real en Vercel ni usar APIs específicas de Vercel (funciones, `@astrojs/vercel`, middleware en edge).
- Pendiente para la fase 5: página `404` (y `ErrorDocument` en `.htaccess` si el servidor es Apache), `robots.txt`, método de subida a Nicalia (FTP/SFTP o despliegue automático) y poner `SITE_LAUNCHED = true` al lanzar.
- Nicalia figura como encargado del tratamiento en Privacidad y como proveedor de alojamiento en el Aviso legal (tres idiomas).

## Formularios y servicios externos

- Formulario de contacto: **Web3Forms** (`src/components/forms/ContactForm.astro`). Newsletter: **Mailchimp** (`src/components/forms/MailchimpForm.astro`, sección `sections/Newsletter.astro` en la home tras los servicios): formulario de inserción adaptado, sin JS ni recursos de Mailchimp/Intuit (se quitó la insignia), validación nativa y confirmación en pestaña nueva. No modificar el `action` ni el campo honeypot `b_…`, que identifican la lista. **Segmentación por idioma:** cada suscriptor recibe la etiqueta de Mailchimp de su idioma (`el`/`es`/`en`) mediante un campo oculto `tags`; los IDs numéricos de las etiquetas se configuran en `NEWSLETTER_TAG_IDS` (`src/consts.ts`) (configurados: el `24268402`, es `24268403`, en `24268404`). Las etiquetas deben seguir existiendo en Audience → Tags; el formulario embebido de Mailchimp no se usa. Limitación conocida: la página de confirmación y el correo de doble opt-in de Mailchimp salen en el idioma de la audiencia, no en el de quien se suscribe.
- Todo formulario lleva casilla de aceptación de la política de privacidad (enlace a `privacy` en el idioma actual) y protección antispam (honeypot).
- No cargar scripts de terceros (analítica, mapas, vídeos embebidos) sin consentimiento de cookies. El mapa de Contacto es opcional: si se incluye, que sea una imagen estática enlazada a Google Maps, no un iframe.

---

## Cosas que NO hacer

- ❌ Instalar `@astrojs/tailwind` (deprecado) o crear `tailwind.config.js` (Tailwind v4 se configura en CSS).
- ❌ Usar APIs antiguas de content collections: `getEntryBySlug`, `entry.slug`, `entry.render()`, `type: 'content'`, `src/content/config.ts`. Usa `getCollection`/`getEntry`, `entry.id` y `render(entry)`.
- ❌ Usar `Astro.glob`.
- ❌ Hardcodear textos visibles o rutas internas.
- ❌ Instalar un tema o plantilla de terceros, o librerías de componentes UI.
- ❌ Cargar fuentes desde Google Fonts CDN.
- ❌ Inventar contenido: credenciales, testimonios, precios, direcciones o datos de María. Si falta un dato, deja un marcador `TODO:` visible en el código y avísalo.
- ❌ Traducir contenido clínico o legal automáticamente sin indicarlo; márcalo como `draft: true` o `TODO: revisar traducción`.
- ❌ Añadir dark mode.

## Datos de referencia

- Email: dimitropoulou.mar@gmail.com
- Facebook: https://www.facebook.com/MariaDimitropoulouPhD/
- Instagram: https://www.instagram.com/mariadimitropouloulopez/
- LinkedIn: https://www.linkedin.com/in/maria-dimitropoulou-lopez-53268375/
- Teléfono: +30 694 027 0745 (`+306940270745`)
- Consulta: Λέσβου 8, Χαλάνδρι, 152 31 Αθήνα, Ελλάδα (es/en: Lesvou 8, Chalandri, 152 31 Atenas/Athens). Fuente única en código: `CONTACT` en `src/consts.ts` (JSON-LD y enlace `tel:`); texto visible traducido en `ui.ts` (`footer.address`).

## Fases del proyecto

1. **Fundaciones:** scaffold, tokens, fuentes, i18n, layout, header/footer, selector de idioma, SEO.
2. **Content collections:** esquemas + contenido de servicios (es) + posts de ejemplo.
3. **Páginas:** Inicio, Servicios (índice + detalle), Sobre mí, Contacto, legales.
4. **Blog:** índice filtrable por categoría, post, RSS por idioma.
5. **Pulido:** sitemap, OG, `llms.txt`, accesibilidad, Lighthouse, deploy.

Estado actual: **Fase 2 completada** (colección `services` con 7 servicios × 3 idiomas; esquema `blog` definido, sin posts hasta la fase 4 — el build avisa de que la colección está vacía). **Fase 3 casi cerrada:** hechas Inicio, Sesiones y Cursos (índices + 3 detalles cada uno; «Seminarios y charlas» aparcado), Sobre mí (colección `about`), Contacto (Web3Forms), testimonios (colección `testimonials`, solo Sesiones por ahora), newsletter con etiquetas por idioma, legales como borradores y una página temporal «Próximamente» en Blog. Primer draft completo en Vercel para revisión de María (ver `docs/revision-draft-2026-10-26.md`). Pendiente para cerrar la fase: validaciones de María, auditoría SEO (skill `seo-audit`) y revisión legal. (Actualizar esta línea al cerrar cada fase.)