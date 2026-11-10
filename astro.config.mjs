// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import { routes } from './src/i18n/routes.ts';

const SITE = 'https://mariadimitropouloulopez.com';
// Mismo criterio que src/consts.ts (IS_PRODUCTION): solo el build de
// producción publica sitemap.
const IS_PRODUCTION = process.env.SITE_ENV === 'production';

// Alternativas de idioma por URL desde el mapa de rutas (los slugs están
// traducidos, así que no se pueden deducir del prefijo). Es la misma fuente que
// el hreflang del HTML (getAlternates en src/i18n/utils.ts).
const ALTERNATES = new Map();
for (const paths of Object.values(routes)) {
	const links = [
		...Object.entries(paths).map(([lang, path]) => ({ lang, url: SITE + path })),
		{ lang: 'x-default', url: SITE + paths.el },
	];
	for (const path of Object.values(paths)) ALTERNATES.set(SITE + path, links);
}
// Páginas con noindex: fuera del sitemap (blog «Próximamente»).
const NOINDEX = new Set(Object.values(routes.blog).map((path) => SITE + path));

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',

  // Entorno del build. Solo `SITE_ENV=production` (npm run build:prod, para
  // Nicalia) genera un sitio indexable; cualquier otro build —incluidos los
  // previews de Vercel, que no definen la variable— sale con noindex y un
  // robots.txt que lo bloquea todo. Ver CLAUDE.md, «SEO».
  env: {
      schema: {
          SITE_ENV: envField.enum({
              context: 'server',
              access: 'public',
              values: ['production', 'preview'],
              default: 'preview',
          }),
      },
  },

  i18n: {
      locales: ['el', 'es', 'en'],
      defaultLocale: 'el',
      routing: {
          prefixDefaultLocale: false,
      },
	},

  vite: {
      plugins: [tailwindcss()],
	},

  // Autoalojadas: Astro las descarga en build y las sirve desde el propio
  // dominio (RGPD). El navegador nunca contacta con Google.
  fonts: [
      {
          provider: fontProviders.google(),
          name: 'Roboto',
          // Nombre distinto del token Tailwind `--font-sans` para evitar que
          // @theme se autorreferencie al mapear uno sobre el otro.
          cssVariable: '--font-roboto',
          weights: [300, 400],
          styles: ['normal'],
          subsets: ['latin', 'greek'],
          fallbacks: ['system-ui', 'sans-serif'],
      },
      {
          provider: fontProviders.google(),
          name: 'Roboto Mono',
          cssVariable: '--font-roboto-mono',
          weights: [400],
          styles: ['normal'],
          subsets: ['latin', 'greek'],
          fallbacks: ['ui-monospace', 'monospace'],
      },
      {
          // Titulares (H1/H2 y detalles decorativos). Verificada la cobertura
          // de glifos griegos del archivo (alfabeto + acentos monotónicos
          // completos): no hace falta un fallback de titulares para `el`.
          provider: fontProviders.local(),
          name: 'Mandys Sketch',
          cssVariable: '--font-mandys',
          fallbacks: ['cursive'],
          options: {
              variants: [
                  {
                      weight: 400,
                      style: 'normal',
                      src: ['./src/assets/fonts/MandysSketch.ttf'],
                  },
              ],
          },
      },
	],

  integrations: [
      icon(),
      // Sitemap (sitemap-index.xml + sitemap-0.xml) solo en producción, sin
      // páginas noindex ni 404, con xhtml:link por idioma y x-default.
      ...(IS_PRODUCTION
          ? [
                sitemap({
                    filter: (page) => !NOINDEX.has(page) && !/\/404\/?$/.test(page),
                    serialize(item) {
                        const links = ALTERNATES.get(item.url);
                        if (links) item.links = links;
                        return item;
                    },
                }),
            ]
          : []),
  ],
});