// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://mariadimitropouloulopez.com',
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

  integrations: [icon()],
});