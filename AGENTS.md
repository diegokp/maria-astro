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
```

Al terminar cualquier tarea, ejecuta `npx astro check` y `npm run build`, y corrige lo que falle antes de dar la tarea por cerrada.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

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
| `services` | `/ypiresies/` | `/es/servicios/` | `/en/services/` |
| `service.psychological` | `/ypiresies/psychologiki-ypostirixi/` | `/es/servicios/apoyo-psicologico/` | `/en/services/psychological-support/` |
| `service.parental` | `/ypiresies/symvouleftiki-goneon/` | `/es/servicios/asesoramiento-parental/` | `/en/services/parental-guidance/` |
| `service.mindfulness` | `/ypiresies/mindfulness/` | `/es/servicios/mindfulness/` | `/en/services/mindfulness/` |
| `service.training` | `/ypiresies/epaggelmatiki-katartisi/` | `/es/servicios/formacion-profesional/` | `/en/services/professional-training/` |
| `about` | `/sxetika/` | `/es/sobre-mi/` | `/en/about/` |
| `blog` | `/nea/` | `/es/blog/` | `/en/blog/` |
| `contact` | `/epikoinonia/` | `/es/contacto/` | `/en/contact/` |
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
    layout/        Header, Footer, LanguageSwitcher, MobileMenu
    seo/           SEO.astro (title, description, canonical, hreflang, OG)
    ui/            Button, Card, SectionTitle… (piezas reutilizables sin lógica de negocio)
    sections/      Hero, ServicesGrid, Testimonials, LatestPosts, Newsletter…
  content/
    blog/{el,es,en}/*.md
    services/{el,es,en}/*.md
    testimonials/{el,es,en}/*.md
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
  arquitectura-contenido.md   sitemap, brief por página y copy (fuente de verdad del contenido)
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
  serviceKey: 'psychological' | 'parental' | 'mindfulness' | 'training',
  lang: 'el' | 'es' | 'en',
  title: string,              // H1
  metaTitle: string,
  metaDescription: string,
  order: number,              // orden en la home y el índice
  cta: string,
  testimonialKey?: string
}
```

Cuerpo en markdown con las secciones: Qué incluye / Para quién / Cómo trabajamos / Duración y frecuencia. El copy en español está en `docs/arquitectura-contenido.md`.

### `testimonials`

```ts
{ testimonialKey: string, lang, author: string, quote: string, serviceKey?: string, approved: boolean }
```

**Solo se publican testimonios con `approved: true`.** Las citas deben estar confirmadas por María; nunca inventes ni "mejores" un testimonio.

---

## Sistema de diseño

Tomado de la página "en construcción" (`docs/index.html`), que a su vez sigue el sitio original.

### Tokens (`src/styles/global.css`, dentro de `@theme`)

| Token | Valor | Uso |
|---|---|---|
| `--color-canvas` | `#FFFFFF` | fondo por defecto de toda la web |
| `--color-cream` | `#EFEAE4` | fondo de "superficies": footer, tarjetas de servicio |
| `--color-mustard` | `#F8CD7E` | color de marca (logo), botones, iconos sociales |
| `--color-mustard-soft` | `rgba(248, 205, 126, 0.35)` | fondos suaves, resaltados |
| `--color-mint` | `#D2EAEA` | acento secundario: fondo de la sección de servicios |
| `--color-ink` | `#525252` | texto principal |
| `--color-ink-soft` | `rgba(58, 58, 58, 0.66)` | texto secundario |
| `--color-coral` | `#E47869` | hover, foco, enlaces activos |
| `--color-sage` | `#7A8C38` | acento verde |
| `--color-line` | `rgba(58, 58, 58, 0.15)` | bordes y separadores |

- **Capas de fondo** (tokens semánticos en `global.css`): `--color-canvas` (blanco — `body`, header, panel del selector de idioma) · `--color-surface` (crema — footer, tarjetas) · `--color-surface-alt` (menta — sección de servicios). Header y panel del selector van en blanco para diferenciarse del resto de "superficies", que siguen en crema.
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

- Componentes `.astro` por defecto; **cero JavaScript en cliente** salvo lo imprescindible (menú móvil, selector de idioma). Nada de React/Vue sin acordarlo.
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

## Formularios y servicios externos

- Proveedor del formulario de contacto  Web3Forms y del newsletter (**⚠️ Pendiente de decidir:**) .
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
- Consulta: Chalandri, Atenas (dirección exacta: `TODO`). Teléfono: `TODO`.

## Fases del proyecto

1. **Fundaciones:** scaffold, tokens, fuentes, i18n, layout, header/footer, selector de idioma, SEO.
2. **Content collections:** esquemas + contenido de servicios (es) + posts de ejemplo.
3. **Páginas:** Inicio, Servicios (índice + detalle), Sobre mí, Contacto, legales.
4. **Blog:** índice filtrable por categoría, post, RSS por idioma.
5. **Pulido:** sitemap, OG, `llms.txt`, accesibilidad, Lighthouse, deploy.

Estado actual: **Fase 2 — pendiente de empezar.** (Actualizar esta línea al cerrar cada fase.)