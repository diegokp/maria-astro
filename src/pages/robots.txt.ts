import type { APIRoute } from 'astro';
import { AI_CRAWLERS, IS_PRODUCTION } from '../consts';

// Crawlers de IA que se bloquearían si AI_CRAWLERS = 'block' (consts.ts).
const AI_BOTS = [
	'GPTBot',
	'ChatGPT-User',
	'ClaudeBot',
	'anthropic-ai',
	'PerplexityBot',
	'Google-Extended',
	'Applebot-Extended',
	'CCBot',
];

// robots.txt generado en el build según el entorno (CLAUDE.md, «SEO»):
// - preview/dev: bloquea todo, para que ningún entorno de pruebas se indexe;
// - producción: permite el rastreo (incluidos los crawlers de IA, decisión del
//   10/11/2026). La línea `Sitemap:` se añade en la fase 4, con el sitemap.
export const GET: APIRoute = () => {
	const lines = IS_PRODUCTION
		? [
				'User-agent: *',
				'Allow: /',
				...(AI_CRAWLERS === 'block'
					? AI_BOTS.flatMap((bot) => ['', `User-agent: ${bot}`, 'Disallow: /'])
					: []),
			]
		: ['# Entorno de pruebas: no indexar.', 'User-agent: *', 'Disallow: /'];

	return new Response(`${lines.join('\n')}\n`, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
