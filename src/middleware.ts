import { defineMiddleware } from 'astro:middleware';

// Quita los comentarios HTML de las páginas generadas. Los Markdown llevan
// notas internas `<!-- TODO … -->` (pendientes de María o del abogado) que no
// deben publicarse; así se eliminan sin tocar los textos. En este sitio
// estático el middleware solo se ejecuta durante el build (no en el servidor).
export const onRequest = defineMiddleware(async (_context, next) => {
	const response = await next();
	if (!response.headers.get('content-type')?.includes('text/html')) return response;
	const html = await response.text();
	return new Response(html.replace(/<!--[\s\S]*?-->/g, ''), response);
});
