import { resolveCity } from './cities';

/**
 * Shared real-estate demo. City sentences are applied in
 * `buildInmobiliariaDemo`. Listings, services, zones and the commercial
 * CTA are data in this file so a real agency can replace them.
 * Testimonials stay off until there are real, authorised quotes.
 *
 * Stock sources (Unsplash, free licence; not a listing and not a client home):
 * - hero: photo-1600585154340-be6161a56a0c
 * - villa: photo-1600596542815-ffad4c1539a9
 * - casa: photo-1613490493576-7fde63acd811
 * - piso: photo-1560448204-e02f11c3d0e2
 * - atico: photo-1600607687939-ce8a6c25118c
 * - estudio: photo-1493809842364-78817add7ffb
 * - cocina: photo-1600566753190-17f0baa2a6c3
 */
const img = '/img/sector-demos/inmobiliaria';

const stock = 'Fotografía de stock. No es una vivienda en venta ni el hogar de un cliente.';

const DEMO_ID = 'inmobiliaria';
const CONTACT_BASE = 'https://36web.es/diseno-web/';

export interface InmobiliariaProperty {
	title: string;
	/** `venta` or `alquiler`. Used by the example filters. */
	operation: 'venta' | 'alquiler';
	operationLabel: string;
	/** `piso` or `casa`. Used by the example filters. */
	kind: 'piso' | 'casa';
	kindLabel: string;
	specs: string;
	priceLabel: string;
	image: string;
	imageAlt: string;
	note: string;
}

export interface InmobiliariaService {
	title: string;
	description: string;
}

export interface InmobiliariaTestimonial {
	quote: string;
	name: string;
	detail: string;
}

export interface InmobiliariaLink {
	text: string;
	href: string;
}

export interface InmobiliariaDemo {
	brand: string;
	seo: { title: string; description: string; image: string; imageAlt: string };
	notice: { text: string; ctaLabel: string; ctaHref: string };
	nav: InmobiliariaLink[];
	headerCta: InmobiliariaLink;
	hero: {
		eyebrow: string;
		title: string;
		description: string;
		image: string;
		imageAlt: string;
		primary: InmobiliariaLink;
		secondary: InmobiliariaLink;
	};
	properties: {
		id: string;
		eyebrow: string;
		title: string;
		description: string;
		items: InmobiliariaProperty[];
	};
	owners: {
		id: string;
		eyebrow: string;
		title: string;
		description: string;
		items: InmobiliariaService[];
		cta: InmobiliariaLink;
	};
	buyers: {
		id: string;
		eyebrow: string;
		title: string;
		description: string;
		image: string;
		imageAlt: string;
		items: InmobiliariaService[];
	};
	zones: {
		id: string;
		eyebrow: string;
		title: string;
		description: string;
		places: { title: string; description: string }[];
	};
	reasons: {
		id: string;
		eyebrow: string;
		title: string;
		description: string;
		items: InmobiliariaService[];
	};
	process: {
		id: string;
		eyebrow: string;
		title: string;
		description: string;
		items: InmobiliariaService[];
	};
	/** Off until a real agency adds authorised quotes. */
	testimonials: {
		enabled: boolean;
		id: string;
		eyebrow: string;
		title: string;
		items: InmobiliariaTestimonial[];
	};
	faq: {
		id: string;
		eyebrow: string;
		title: string;
		description: string;
		items: { question: string; answer: string }[];
	};
	offer: {
		id: string;
		eyebrow: string;
		title: string;
		description: string;
		primary: InmobiliariaLink;
		secondary: InmobiliariaLink;
	};
	contact: {
		id: string;
		eyebrow: string;
		heading: string;
		description: string;
		cardTitle: string;
		submitText: string;
	};
	identity: {
		email: string;
		phone: string;
		location: string;
		address: string;
		mapAddress: string;
		mapTitle: string;
		hours: { days: string; hours: string }[];
	};
	footer: { copyright: string };
}

export function inmobiliariaContactHref(citySlug?: string): string {
	const params = new URLSearchParams();
	params.set('demo', DEMO_ID);
	if (citySlug) params.set('ciudad', citySlug);
	return `${CONTACT_BASE}?${params.toString()}#contacto`;
}

function listInSpanish(items: readonly string[]): string {
	if (items.length <= 1) return items[0] ?? '';
	return `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`;
}

function properties(ciudad: string): InmobiliariaProperty[] {
	const note = `Ficha de ejemplo en ${ciudad}. No es un anuncio ni una operación real.`;
	return [
		{
			title: 'Piso luminoso',
			operation: 'venta',
			operationLabel: 'Venta',
			kind: 'piso',
			kindLabel: 'Piso',
			specs: '3 hab. · 2 baños · 92 m²',
			priceLabel: 'Precio de ejemplo',
			image: `${img}/piso.webp`,
			imageAlt: `Salón con luz de día y sofás. ${stock}`,
			note,
		},
		{
			title: 'Casa con jardín',
			operation: 'venta',
			operationLabel: 'Venta',
			kind: 'casa',
			kindLabel: 'Casa',
			specs: '4 hab. · 3 baños · 180 m²',
			priceLabel: 'Precio de ejemplo',
			image: `${img}/salon.webp`,
			imageAlt: `Casa moderna con jardín al anochecer. ${stock}`,
			note,
		},
		{
			title: 'Piso para entrar a vivir',
			operation: 'alquiler',
			operationLabel: 'Alquiler',
			kind: 'piso',
			kindLabel: 'Piso',
			specs: '2 hab. · 1 baño · 68 m²',
			priceLabel: 'Renta de ejemplo',
			image: `${img}/estudio.webp`,
			imageAlt: `Estancia pequeña con cama y ventana. ${stock}`,
			note,
		},
		{
			title: 'Chalet de ejemplo',
			operation: 'venta',
			operationLabel: 'Venta',
			kind: 'casa',
			kindLabel: 'Casa',
			specs: '5 hab. · 3 baños · 240 m²',
			priceLabel: 'Precio de ejemplo',
			image: `${img}/casa.webp`,
			imageAlt: `Villa blanca con piscina. ${stock}`,
			note,
		},
		{
			title: 'Ático con terraza',
			operation: 'venta',
			operationLabel: 'Venta',
			kind: 'piso',
			kindLabel: 'Piso',
			specs: '3 hab. · 2 baños · 110 m²',
			priceLabel: 'Precio de ejemplo',
			image: `${img}/atico.webp`,
			imageAlt: `Vivienda de líneas actuales y grandes ventanales. ${stock}`,
			note,
		},
		{
			title: 'Casa adosada',
			operation: 'alquiler',
			operationLabel: 'Alquiler',
			kind: 'casa',
			kindLabel: 'Casa',
			specs: '3 hab. · 2 baños · 140 m²',
			priceLabel: 'Renta de ejemplo',
			image: `${img}/hero.webp`,
			imageAlt: `Casa contemporánea con piscina. ${stock}`,
			note,
		},
	];
}

/**
 * Builds the real-estate demo for any URL slug.
 * `/inmobiliaria/getafe` names Getafe even when that municipality is not listed.
 * A listed slug keeps its accents, area and nearby towns.
 */
export function buildInmobiliariaDemo(citySlug: string): { demo: InmobiliariaDemo; pagePath: string } {
	const city = resolveCity(citySlug);
	const slug = city?.slug ?? citySlug.trim().toLowerCase();
	const contactHref = inmobiliariaContactHref(slug || undefined);
	const pagePath = `/inmobiliaria/${slug}`;
	const ciudad = city?.ciudad;

	const heroTitle = ciudad ? `Inmobiliaria en ${ciudad}` : 'Inmobiliaria';
	const heroDescription = ciudad
		? `Compra, vende o alquila tu vivienda en ${ciudad} con atención cercana y un proceso claro.`
		: 'Compra, vende o alquila tu vivienda con atención cercana y un proceso claro. Esta versión no está asociada a una ciudad concreta.';
	const ownerTitle = ciudad
		? `¿Quieres vender o alquilar tu vivienda en ${ciudad}?`
		: '¿Quieres vender o alquilar tu vivienda?';
	const offerTitle = ciudad
		? `¿Quieres una web como esta para tu inmobiliaria en ${ciudad}?`
		: '¿Quieres una web como esta para tu inmobiliaria?';

	const zonePlaces = city
		? [
				{
					title: city.ciudad,
					description: 'Municipio de esta versión. No hay una oficina abierta ni viviendas captadas aquí.',
				},
				...city.zonas.map((zona) => ({
					title: zona,
					description: 'Municipio cercano, solo para mostrar el área. No implica inmuebles ni clientes en esta localidad.',
				})),
			]
		: [{ title: 'Sin municipio', description: 'Esta dirección no trae un nombre de ciudad.' }];

	const zoneDescription = city
		? city.area && city.zonas.length > 0
			? `En ${city.ciudad} esta web muestra cómo se presentaría una inmobiliaria de compraventa y alquiler. El ejemplo también nombra ${listInSpanish(city.zonas)}, en el ${city.area}. Es una zona ilustrativa: no hay propietarios ni compradores en esas localidades.`
			: `En ${city.ciudad} esta web muestra cómo se presentaría una inmobiliaria de compraventa y alquiler. No hay propietarios ni compradores asociados a ${city.ciudad}.`
		: 'Esta dirección no trae un nombre de ciudad. No se da por hecha una zona de trabajo.';

	const demo: InmobiliariaDemo = {
		brand: 'Casa Lumen',
		seo: {
			title: heroTitle,
			description: ciudad
				? `Ejemplo comercial de 36web: web de una inmobiliaria ficticia en ${ciudad}, con compraventa y alquiler.`
				: 'Ejemplo comercial de 36web: web de una inmobiliaria ficticia, sin ciudad asignada.',
			image: `${img}/salon.webp`,
			imageAlt: `Casa moderna iluminada al anochecer. ${stock}`,
		},
		notice: {
			text: ciudad
				? `Ejemplo comercial de 36web. La inmobiliaria, las viviendas y los datos son ficticios: no es un proyecto realizado para una agencia de ${ciudad}.`
				: 'Ejemplo comercial de 36web. La inmobiliaria, las viviendas y los datos son ficticios. Esta dirección no trae un nombre de ciudad.',
			ctaLabel: offerTitle,
			ctaHref: contactHref,
		},
		nav: [
			{ text: 'Propiedades', href: '#propiedades' },
			{ text: 'Propietarios', href: '#propietarios' },
			{ text: 'Compradores', href: '#compradores' },
			{ text: 'Zonas', href: '#zonas' },
			{ text: 'Proceso', href: '#proceso' },
			{ text: 'Contacto', href: '#contacto' },
		],
		headerCta: { text: 'Contacto', href: '#contacto' },
		hero: {
			eyebrow: city?.area ? `${ciudad} · ${city.area}` : ciudad ?? 'Consulta de ejemplo',
			title: heroTitle,
			description: heroDescription,
			image: `${img}/salon.webp`,
			imageAlt: `Casa de dos plantas con jardín y luz de interior. ${stock}`,
			primary: { text: 'Ver viviendas de ejemplo', href: '#propiedades' },
			secondary: { text: 'Hablar de mi vivienda', href: '#propietarios' },
		},
		properties: {
			id: 'propiedades',
			eyebrow: 'Propiedades destacadas',
			title: ciudad ? `Viviendas de ejemplo en ${ciudad}` : 'Viviendas de ejemplo',
			description: ciudad
				? `Fichas preparadas para sustituir por inmuebles reales de ${ciudad}. Los metros, las estancias y el precio son datos de demostración.`
				: 'Fichas preparadas para sustituir por inmuebles reales. Los metros, las estancias y el precio son datos de demostración.',
			items: properties(ciudad ?? 'esta versión'),
		},
		owners: {
			id: 'propietarios',
			eyebrow: 'Para propietarios',
			title: ownerTitle,
			description:
				'Así se presentaría la captación. No hay una valoración, un plazo de venta ni una renta prometida: el precio y los tiempos los marcaría la inmobiliaria real.',
			items: [
				{
					title: 'Una primera visita',
					description: 'Se ve la vivienda y se escucha qué quieres hacer con ella. Esta página no calcula un precio.',
				},
				{
					title: 'El anuncio, cuando toque',
					description: 'Fotos y texto sustituibles por los de tu casa. Las imágenes de esta demo son de stock.',
				},
				{
					title: 'Visitas con cita',
					description: 'Se organizarían con quien llama. Aquí no hay un calendario ni una agenda real.',
				},
				{
					title: 'Hasta la firma',
					description: 'El acompañamiento del papeleo se completaría con la agencia. La demo no cierra ninguna operación.',
				},
			],
			cta: { text: 'Quiero valorar mi vivienda', href: '#contacto' },
		},
		buyers: {
			id: 'compradores',
			eyebrow: 'Para quien busca',
			title: ciudad ? `Comprar o alquilar en ${ciudad}` : 'Comprar o alquilar',
			description: 'Un recorrido de ejemplo para quien busca casa. No hay una cartera real ni alertas activas.',
			image: `${img}/cocina.webp`,
			imageAlt: `Cocina amplia con isla. ${stock}`,
			items: [
				{
					title: 'Qué necesitas',
					description: 'Zona, presupuesto y si buscas compra o alquiler. El presupuesto de esta web no es una oferta.',
				},
				{
					title: 'Fichas claras',
					description: 'Metros, estancias y barrio, sustituibles por los datos del inmueble real.',
				},
				{
					title: 'Visitas',
					description: 'Se concertarían con la inmobiliaria. Esta demo no enseña viviendas de verdad.',
				},
				{
					title: 'Reserva y firma',
					description: 'El proceso se explica antes de decidir. No hay un plazo ni un resultado asegurado.',
				},
			],
		},
		zones: {
			id: 'zonas',
			eyebrow: 'Dónde trabaja',
			title: ciudad ? `Zona de trabajo en ${ciudad}` : 'Zona de trabajo',
			description: zoneDescription,
			places: zonePlaces,
		},
		reasons: {
			id: 'por-que',
			eyebrow: 'Por qué esta inmobiliaria',
			title: 'Cercana, visual y con el proceso a la vista',
			description: 'Razones de ejemplo. No hay años de trayectoria, premios ni operaciones cerradas.',
			items: [
				{
					title: 'Atención en la ciudad',
					description: ciudad
						? `La oficina de ejemplo se sitúa en ${ciudad}. La calle está por completar.`
						: 'La oficina se situaría en el municipio de la URL. La calle está por completar.',
				},
				{
					title: 'Compra y alquiler',
					description: 'Las dos operaciones conviven en la misma web, con fichas distintas.',
				},
				{
					title: 'Proceso claro',
					description: 'De la primera llamada a la firma, el recorrido se cuenta sin letra pequeña inventada.',
				},
				{
					title: 'Sin cifras de adorno',
					description: 'No hay viviendas vendidas, plazos medios ni testimonios. Esos datos se añaden cuando son reales.',
				},
			],
		},
		process: {
			id: 'proceso',
			eyebrow: 'Proceso',
			title: 'Cuatro pasos, sin atajos prometidos',
			description: 'Un esquema de ejemplo. Los tiempos reales los marcaría la inmobiliaria.',
			items: [
				{
					title: 'Escribes',
					description: 'Si quieres vender, alquilar o buscar. El teléfono de esta página es de ejemplo.',
				},
				{
					title: 'Vemos el caso',
					description: 'La vivienda, o lo que buscas. No hace falta llegar con los papeles ordenados.',
				},
				{
					title: 'Propuesta',
					description: 'Un precio orientativo o una selección de fichas. Esta demo no los fija.',
				},
				{
					title: 'Acompañamos',
					description: 'Visitas y, si encaja, el camino hasta la firma. Se puede parar en cualquier momento.',
				},
			],
		},
		testimonials: {
			enabled: false,
			id: 'opiniones',
			eyebrow: 'Opiniones',
			title: 'Lo que contarían los clientes',
			items: [],
		},
		faq: {
			id: 'preguntas',
			eyebrow: 'Preguntas',
			title: 'Antes de escribir',
			description: ciudad ? `Respuestas de ejemplo para una inmobiliaria en ${ciudad}.` : 'Respuestas de ejemplo para una inmobiliaria.',
			items: [
				{
					question: '¿Las viviendas de esta página están en venta o en alquiler?',
					answer:
						'No. Son fichas de demostración, con fotos de stock y datos sustituibles. No hay una operación, un propietario ni un comprador detrás.',
				},
				{
					question: '¿La inmobiliaria cobra una comisión concreta?',
					answer: 'Esta demo no publica honorarios. En una agencia real, ese dato iría aquí, por escrito y antes de encargar nada.',
				},
				{
					question: ciudad ? `¿Dónde estaría la oficina en ${ciudad}?` : '¿Dónde estaría la oficina?',
					answer: ciudad
						? `La dirección está por completar. Esta URL usa ${ciudad} como ciudad de ejemplo y no inventa una calle.`
						: 'La dirección está por completar. Esta URL no trae un municipio.',
				},
				{
					question: '¿Trabajáis compraventa y alquiler?',
					answer: 'Sí, como servicios de ejemplo. La web no asegura encontrar comprador, inquilino o vivienda.',
				},
				...(city
					? [
							{
								question: `¿Por qué esta página habla de ${city.ciudad}?`,
								answer: city.area && city.zonas.length > 0
									? `Porque la URL es /inmobiliaria/${slug}. El nombre sale de esa dirección y el ejemplo también nombra ${listInSpanish(city.zonas)}, en el ${city.area}. No hay clientes ni inmuebles asociados a ${city.ciudad}.`
									: `Porque la URL es /inmobiliaria/${slug}. El nombre de la ciudad sale de esa dirección. No hay clientes ni inmuebles asociados a ${city.ciudad}.`,
							},
						]
					: []),
			],
		},
		offer: {
			id: 'quieres-una-web',
			eyebrow: '36web',
			title: offerTitle,
			description:
				'Puedes encargar un diseño completamente personalizado. También puedes llevarte esta web lista para adaptar: cambiamos la marca, los colores, las fichas, las zonas y los datos por los de tu inmobiliaria. Es un diseño preparado para personalizar y una opción más económica que un diseño desde cero.',
			primary: { text: 'Quiero esta web adaptada a mi inmobiliaria', href: contactHref },
			secondary: { text: 'Quiero un diseño a medida', href: contactHref },
		},
		contact: {
			id: 'contacto',
			eyebrow: 'Contacto',
			heading: ciudad ? `Escríbenos desde ${ciudad}` : 'Escríbenos',
			description: ciudad
				? `El formulario, el correo, el teléfono y el horario son datos de demostración, también en la versión de ${ciudad}. No hay una inmobiliaria real detrás ni un número local al que llamar.`
				: 'El formulario, el correo, el teléfono y el horario son datos de demostración. No hay una inmobiliaria real detrás ni un número al que llamar.',
			cardTitle: 'Datos de ejemplo',
			submitText: 'Enviar mensaje de ejemplo',
		},
		identity: {
			email: 'contacto@ejemplo.invalid',
			phone: 'Teléfono de ejemplo',
			location: ciudad ?? 'Sin municipio asignado',
			address: 'Calle y número (por completar)',
			mapAddress: ciudad ? `${ciudad}, España` : '',
			mapTitle: ciudad ? `Mapa de ejemplo centrado en ${ciudad}` : 'Mapa no disponible en la versión genérica',
			hours: [
				{ days: 'Lunes a viernes', hours: '10:00 – 14:00 y 16:00 – 20:00' },
				{ days: 'Sábados', hours: 'Horario por completar' },
			],
		},
		footer: {
			copyright: ciudad
				? `Ejemplo comercial de 36web. Inmobiliaria ficticia: no es la web de una agencia de ${ciudad}.`
				: 'Ejemplo comercial de 36web. Inmobiliaria ficticia, sin ciudad asignada.',
		},
	};

	return { demo, pagePath };
}
