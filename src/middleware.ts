import { defineMiddleware } from 'astro:middleware';

/**
 * The starter homepage and the demo index are internal. On the published
 * site they answer 404. `astro dev` still renders them so the catalog can
 * be checked locally. City demos stay public.
 *
 * These two routes are on-demand (`prerender = false`) so this runs on each
 * request. A prerendered file would be served as a normal page and this
 * check would never see the visitor.
 */
const BLOCKED_PATHS = new Set(['/', '/ejemplos']);

export const onRequest = defineMiddleware((context, next) => {
	if (!import.meta.env.PROD) return next();

	const path = context.url.pathname.replace(/\/+$/, '') || '/';
	if (!BLOCKED_PATHS.has(path)) return next();

	return new Response(
		'<!doctype html><html lang="es"><meta charset="utf-8"><title>No encontrado</title><body><p>Esta página no está disponible.</p></body></html>',
		{
			status: 404,
			headers: {
				'content-type': 'text/html; charset=utf-8',
				'x-robots-tag': 'noindex, nofollow',
			},
		},
	);
});
