import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { LEGAL_KEYS, LOCALES, SERVICE_KEYS } from './i18n/routes';

// Un archivo por servicio e idioma: src/content/services/<lang>/<serviceKey>.md
// La URL no sale del nombre del archivo sino de `routes.ts` (`service.<serviceKey>`).
const services = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
	schema: ({ image }) =>
		z.object({
			serviceKey: z.enum(SERVICE_KEYS),
			lang: z.enum(LOCALES),
			title: z.string(), // H1 y título de la tarjeta
			description: z.string(), // entradilla bajo el H1
			metaTitle: z.string(),
			metaDescription: z.string().max(160),
			order: z.number().int().positive(), // orden en la home (3 primeros) y en el índice
			cta: z.string(),
			image: image(), // ilustración decorativa (alt vacío)
			testimonialKey: z.string().optional(),
		}),
});

// Fase 4: el esquema queda definido; aún no hay posts.
const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: ({ image }) =>
		z
			.object({
				title: z.string(),
				description: z.string().max(160),
				pubDate: z.coerce.date(),
				updatedDate: z.coerce.date().optional(),
				// Provisional: confirmar la lista con María (CLAUDE.md).
				category: z.enum(['ansiedad', 'crianza', 'mindfulness', 'infancia', 'formacion']),
				image: image().optional(),
				imageAlt: z.string().optional(),
				lang: z.enum(LOCALES),
				translationKey: z.string(),
				draft: z.boolean().default(false),
			})
			.refine((post) => !post.image || post.imageAlt, {
				message: 'Si el post tiene imagen, `imageAlt` es obligatorio.',
				path: ['imageAlt'],
			}),
});

// Aviso legal, privacidad y cookies: src/content/legal/<lang>/<legalKey>.md
// La URL sale de routes.ts (la clave legal es el routeKey).
const legal = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
	schema: z.object({
		legalKey: z.enum(LEGAL_KEYS),
		lang: z.enum(LOCALES),
		title: z.string(),
		description: z.string().max(160),
		updatedDate: z.coerce.date(),
	}),
});

export const collections = { services, blog, legal };
