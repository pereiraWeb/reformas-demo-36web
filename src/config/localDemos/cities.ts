import type { SectorDemoFaqItem } from '../sectorDemos/types';

/**
 * Municipalities the repairs demo can name.
 * The route is `/${slug}` (for example `/torrejon-de-ardoz`).
 * Any other single-segment URL still renders the demo, with the generic copy.
 *
 * To add a city: append a key here. No new page, project, or component.
 * `zonas` are nearby municipalities used only as an illustrative service area.
 * Do not put street addresses, phone numbers, reviews, or client names here.
 */
export interface CityConfig {
	ciudad: string;
	area: string;
	zonas: string[];
	/** Extra questions shown only on this city's URL. */
	faq?: SectorDemoFaqItem[];
}

export const CITY_CONFIG: Record<string, CityConfig> = {
	'torrejon-de-ardoz': {
		ciudad: 'Torrejón de Ardoz',
		area: 'Corredor del Henares',
		zonas: ['Alcalá de Henares', 'San Fernando de Henares', 'Coslada'],
		faq: [
			{
				question: '¿Por qué esta página habla de Torrejón de Ardoz?',
				answer:
					'Porque la URL es /torrejon-de-ardoz. El municipio y los alrededores salen de la configuración de la demo. No hay un negocio, un teléfono ni una dirección reales asociados a Torrejón de Ardoz.',
			},
		],
	},
	'alcala-de-henares': {
		ciudad: 'Alcalá de Henares',
		area: 'Corredor del Henares',
		zonas: ['Torrejón de Ardoz', 'San Fernando de Henares', 'Coslada'],
		faq: [
			{
				question: '¿Por qué esta página habla de Alcalá de Henares?',
				answer:
					'Porque la URL es /alcala-de-henares. El municipio y los alrededores salen de la configuración de la demo. No hay un negocio, un teléfono ni una dirección reales asociados a Alcalá de Henares.',
			},
		],
	},
	coslada: {
		ciudad: 'Coslada',
		area: 'Corredor del Henares',
		zonas: ['San Fernando de Henares', 'Torrejón de Ardoz', 'Alcalá de Henares'],
		faq: [
			{
				question: '¿Por qué esta página habla de Coslada?',
				answer:
					'Porque la URL es /coslada. El municipio y los alrededores salen de la configuración de la demo. No hay un negocio, un teléfono ni una dirección reales asociados a Coslada.',
			},
		],
	},
};

export const configuredCitySlugs = Object.keys(CITY_CONFIG);

const SPANISH_PARTICLES = new Set(['de', 'del', 'la', 'las', 'los', 'el', 'y', 'e']);

/** `san-sebastian-de-los-reyes` → `San Sebastian de los Reyes`. */
export function cityNameFromSlug(slug: string): string {
	const words = slug.split('-').filter(Boolean);
	return words
		.map((word, index) => {
			if (index > 0 && SPANISH_PARTICLES.has(word)) return word;
			return word.charAt(0).toLocaleUpperCase('es') + word.slice(1);
		})
		.join(' ');
}

function foldAccents(value: string): string {
	return value.normalize('NFD').replace(/\p{M}/gu, '');
}

/**
 * Turns a URL segment into a city. A slug listed in `CITY_CONFIG` keeps its
 * written name, area and nearby towns. Any other segment is still a city:
 * the visible name is read from the slug itself.
 */
export function resolveCity(raw: string): { slug: string; ciudad: string; area?: string; zonas: string[] } | undefined {
	let slug = raw.trim().toLowerCase();
	try {
		slug = decodeURIComponent(slug);
	} catch {
		/* keep the raw segment */
	}
	slug = slug
		.normalize('NFC')
		.replace(/[\s_]+/g, '-')
		.replace(/[^a-záéíóúüñ0-9-]/gi, '')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');
	if (!slug) return undefined;

	const key = foldAccents(slug);
	const configured = CITY_CONFIG[key] ?? CITY_CONFIG[slug];
	if (configured) {
		return {
			slug: CITY_CONFIG[key] ? key : slug,
			ciudad: configured.ciudad,
			area: configured.area,
			zonas: configured.zonas,
		};
	}

	return { slug, ciudad: cityNameFromSlug(slug), zonas: [] };
}

export function getCityConfig(slug: string): CityConfig | undefined {
	const key = foldAccents(slug.trim().toLowerCase());
	return CITY_CONFIG[key] ?? CITY_CONFIG[slug.trim().toLowerCase()];
}
