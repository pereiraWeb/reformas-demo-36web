import type { APIRoute } from 'astro';
import { business } from '../config/business';
import { configuredCitySlugs } from '../config/localDemos/cities';

export const prerender = true;

/**
 * Generated from `business.siteUrl` so the sitemap URL is always correct
 * without hand-editing a static file. Disallows the internal API route and
 * the component gallery (`/demos`), the sector demos (`/ejemplos` and the
 * city URLs, which ship with `noindex` and stay out of the sitemap) and the
 * `/thank-you` conversion page (not content worth ranking).
 */
export const GET: APIRoute = () => {
	const cityRules = configuredCitySlugs.map((slug) => `Disallow: /${slug}`).join('\n');
	const body = `User-agent: *
Disallow: /api/
Disallow: /demos
Disallow: /ejemplos
Disallow: /psicologia
Disallow: /thank-you
${cityRules}

Sitemap: ${new URL('/sitemap-index.xml', business.siteUrl).toString()}
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
