import type { SectorDemoConfig, SectorDemoFaqItem, SectorDemoIconCard, SectorDemoImageCard } from '../sectorDemos/types';
import { getCityConfig, type CityConfig } from './cities';

/**
 * Shared repairs demo. City-specific sentences are applied in
 * `buildReparacionesDemo`. Photos stay here: they are stock, not local jobs.
 *
 * Stock sources (free licences; not client work):
 * - hero, mantenimiento: Pexels 6474471, 1249611
 * - cuadro: Pexels 257736
 * - albanileria: Pexels 5691622
 * - fontaneria: Unsplash photo-1585704032915-c3400ca199e7
 * - electricidad: Unsplash photo-1621905251189-08b45d6a269e
 * - pintura: Unsplash photo-1562259949-e8e7689d7828
 * - reforma: Unsplash photo-1584622650111-993a426fbf0a
 * - bano: Unsplash photo-1620626011761-996317b8d101
 * - cocina: Unsplash photo-1556911220-bff31c812dba
 */
const img = '/img/sector-demos/reparaciones';

const stock = 'Fotografía de stock usada como ejemplo ilustrativo, no es un trabajo encargado por un cliente.';

const DEMO_ID = 'reparaciones';
const SECTOR_ID = 'reparaciones';
const CONTACT_BASE = 'https://36web.es/diseno-web/';

export function reparacionesContactHref(citySlug?: string): string {
	const params = new URLSearchParams();
	params.set('demo', DEMO_ID);
	if (citySlug) params.set('ciudad', citySlug);
	params.set('sector', SECTOR_ID);
	return `${CONTACT_BASE}?${params.toString()}#contacto`;
}

function listInSpanish(items: readonly string[]): string {
	if (items.length <= 1) return items[0] ?? '';
	return `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`;
}

function serviceItems(ciudad: string | undefined): SectorDemoImageCard[] {
	const place = ciudad ? ` en ${ciudad}` : '';
	return [
		{
			title: 'Fontanería',
			description: 'Grifos, cisternas, atascos y pequeñas fugas en baño y cocina.',
			image: `${img}/fontaneria.webp`,
			imageAlt: `Grifería de bañera. ${stock}`,
			ctaText: 'Consultar',
			href: '#contacto',
		},
		{
			title: 'Electricidad',
			description: 'Puntos de luz, enchufes y revisión de la instalación de una vivienda o un local.',
			image: `${img}/electricidad.webp`,
			imageAlt: `Electricista revisando una caja de conexiones. ${stock}`,
			ctaText: 'Consultar',
			href: '#contacto',
		},
		{
			title: 'Pintura',
			description: 'Paredes y techos de habitaciones, portales y locales, con preparación previa de la superficie.',
			image: `${img}/pintura.webp`,
			imageAlt: `Rodillo aplicando pintura en una pared. ${stock}`,
			ctaText: 'Consultar',
			href: '#contacto',
		},
		{
			title: 'Albañilería',
			description: 'Rozas, alicatados sueltos, enfoscados y arreglo de desperfectos en paredes.',
			image: `${img}/albanileria.webp`,
			imageAlt: `Mano enguantada alisando una pared con una llana. ${stock}`,
			ctaText: 'Consultar',
			href: '#contacto',
		},
		{
			title: 'Reformas de baño y cocina',
			description: 'Renovación de estancias completas: sanitarios, mobiliario, alicatado e instalaciones.',
			image: `${img}/reforma.webp`,
			imageAlt: `Baño reformado con ducha y lavabo. ${stock}`,
			ctaText: 'Consultar',
			href: '#contacto',
		},
		{
			title: 'Mantenimiento',
			description: `Arreglos sueltos de casa o local${place}: puertas, suelos, persianas y repasos periódicos.`,
			image: `${img}/mantenimiento.webp`,
			imageAlt: `Colocación de un suelo de madera con un taladro. ${stock}`,
			ctaText: 'Consultar',
			href: '#contacto',
		},
	];
}

function zoneItems(city: CityConfig | undefined): SectorDemoIconCard[] {
	if (!city) {
		return [
			{
				title: 'Cobertura de ejemplo',
				description: 'Sin un municipio configurado, la demo no nombra localidades ni promete desplazamientos.',
				icon: '01',
			},
		];
	}

	return [
		{
			title: city.ciudad,
			description: 'Municipio de esta versión de la demo. No hay un local ni clientes asociados a esta localidad.',
			icon: '01',
		},
		...city.zonas.map((zona, index) => ({
			title: zona,
			description: 'Municipio cercano, incluido solo para mostrar el área. No implica encargos ni clientes aquí.',
			icon: String(index + 2).padStart(2, '0'),
		})),
	];
}

function faqItems(city: CityConfig | undefined): SectorDemoFaqItem[] {
	const where = city
		? `En este ejemplo, por ${city.ciudad} y alrededores del ${city.area}: ${listInSpanish(city.zonas)}. Es una zona ilustrativa, no una cartera de clientes.`
		: 'Esta URL no está asociada a un municipio. La demo no nombra una ciudad ni un área de desplazamiento.';

	const localBusinessQuestion = city
		? `¿Esta página es la web de una empresa de ${city.ciudad}?`
		: '¿Esta página es la web de una empresa local?';

	const common: SectorDemoFaqItem[] = [
		{
			question: '¿Qué trabajos entran en este ejemplo?',
			answer:
				'Reparaciones y mantenimiento de vivienda y local: fontanería, electricidad, pintura, albañilería menor y reformas de baño o cocina. No representa obra nueva ni rehabilitación de edificios enteros.',
		},
		{
			question: '¿Dónde se desplazaría este negocio?',
			answer: where,
		},
		{
			question: '¿La visita y el presupuesto tienen un coste en esta demo?',
			answer:
				'La página no fija un precio. En un negocio real, ese dato iría aquí. En el ejemplo, la visita sirve para ver el trabajo y el presupuesto se entrega por escrito antes de empezar.',
		},
		{
			question: '¿Los trabajos y las fotos son de clientes?',
			answer:
				'No. Las fotos son de stock y los textos describen encargos ilustrativos. Esta demo no incluye reseñas, nombres de clientes ni casos reales.',
		},
		{
			question: localBusinessQuestion,
			answer:
				'No. Es un ejemplo comercial de 36web para enseñar cómo puede quedar la web de un negocio de reparaciones. No es un proyecto realizado para un cliente.',
		},
	];

	return city?.faq ? [...common, ...city.faq] : common;
}

/**
 * Builds the repairs demo for a URL slug.
 * A slug missing from `CITY_CONFIG` returns the same page with generic copy.
 */
export function buildReparacionesDemo(citySlug: string): { demo: SectorDemoConfig; pagePath: string } {
	const slug = citySlug.trim().toLowerCase();
	const city = getCityConfig(slug);
	const contactHref = reparacionesContactHref(city ? slug : undefined);
	const pagePath = `/${slug}`;

	const heroTitle = city ? `Reparaciones y mantenimiento en ${city.ciudad}` : 'Reparaciones y mantenimiento';
	const heroDescription = city
		? `Servicio de reparaciones para viviendas y negocios de ${city.ciudad} y ${city.area}.`
		: 'Servicio de reparaciones para viviendas y negocios. Esta versión no está asociada a una ciudad concreta.';
	const offerTitle = city
		? `¿Quieres una web como esta para tu negocio en ${city.ciudad}?`
		: '¿Quieres una web como esta para tu negocio?';

	const demo: SectorDemoConfig = {
		slug: DEMO_ID,
		label: city ? `Reparaciones en ${city.ciudad}` : 'Reparaciones',
		summary: city
			? `Ejemplo comercial para un negocio de reparaciones en ${city.ciudad} y ${city.area}.`
			: 'Ejemplo comercial de reparaciones, sin municipio asignado.',
		seo: {
			title: heroTitle,
			description: city
				? `Ejemplo comercial de 36web: web de un negocio ficticio de reparaciones y mantenimiento en ${city.ciudad} y ${city.area}.`
				: 'Ejemplo comercial de 36web: web de un negocio ficticio de reparaciones y mantenimiento, sin ciudad asignada.',
			image: `${img}/hero.webp`,
			imageAlt: `Persona pintando una estancia en obras. ${stock}`,
		},
		theme: {
			primary: '#9a3412',
			secondary: '#57534e',
			surface: '#faf6f1',
			text: '#1c1917',
			border: '#e7e5e4',
		},
		identity: {
			name: 'Oficios del Henares',
			tagline: heroTitle,
			email: 'contacto@ejemplo.invalid',
			phone: 'Teléfono de ejemplo',
			location: city ? city.ciudad : 'Sin municipio asignado',
			address: city ? city.ciudad : 'Sin municipio asignado',
			mapAddress: city ? `${city.ciudad}, España` : '',
			mapTitle: city ? `Mapa de ejemplo centrado en ${city.ciudad}` : 'Mapa no disponible en la versión genérica',
			hours: [
				{ days: 'Lunes a viernes', hours: '8:00 – 18:00' },
				{ days: 'Sábados', hours: '9:00 – 14:00' },
			],
		},
		notice: {
			text: city
				? `Ejemplo comercial de 36web. El negocio, los datos y los trabajos son ficticios: no es un proyecto realizado para un cliente de ${city.ciudad}.`
				: 'Ejemplo comercial de 36web. El negocio, los datos y los trabajos son ficticios. Esta URL no corresponde a una ciudad configurada.',
			ctaLabel: offerTitle,
			ctaHref: contactHref,
		},
		nav: [
			{ label: 'Servicios', href: '#servicios' },
			{ label: 'Zonas', href: '#zonas' },
			{ label: 'Trabajos', href: '#trabajos' },
			{ label: 'Preguntas', href: '#preguntas' },
			{ label: 'Contacto', href: '#contacto' },
		],
		headerCta: { text: 'Pedir visita', href: '#contacto' },
		hero: {
			eyebrow: city ? `${city.ciudad} · ${city.area}` : 'Ejemplo comercial',
			title: heroTitle,
			description: heroDescription,
			image: `${img}/hero.webp`,
			imageAlt: `Persona pintando una pared en una estancia en obras. ${stock}`,
			primaryCta: { text: 'Pedir una visita', href: '#contacto' },
			secondaryCta: { text: 'Ver servicios', href: '#servicios' },
		},
		services: {
			id: 'servicios',
			eyebrow: 'Servicios',
			title: 'Oficios de vivienda y local',
			description: city
				? `Trabajos habituales de reparación y mantenimiento en ${city.ciudad}. Las fichas describen el tipo de encargo, sin nombres de clientes ni obras reales.`
				: 'Trabajos habituales de reparación y mantenimiento. Las fichas describen el tipo de encargo, sin nombres de clientes ni obras reales.',
			items: serviceItems(city?.ciudad),
		},
		zones: {
			id: 'zonas',
			eyebrow: 'Zona de trabajo',
			title: city ? `Trabajamos en ${city.ciudad} y alrededores` : 'Zona de trabajo',
			description: city
				? `Además de ${city.ciudad}, el ejemplo contempla ${listInSpanish(city.zonas)}, en el ${city.area}. Es una zona ilustrativa: no implica encargos ni clientes en esas localidades.`
				: 'Esta URL no corresponde a una ciudad configurada. No se listan municipios ni se da por hecho un área de desplazamiento.',
			items: zoneItems(city),
		},
		projects: {
			id: 'trabajos',
			eyebrow: 'Trabajos de ejemplo',
			title: 'Así se vería una selección de encargos',
			description: 'Fotografías de stock y textos neutros. No son obras hechas para un cliente ni reseñas de trabajos reales.',
			items: [
				{
					title: 'Pintura de una estancia',
					description: 'Ejemplo ilustrativo de pintura en una habitación todavía en obras, con protección de suelos y ventanas.',
					image: `${img}/hero.webp`,
					imageAlt: `Estancia en obras mientras se pinta una pared. ${stock}`,
					tag: 'Ejemplo ilustrativo',
				},
				{
					title: 'Reforma de baño',
					description: city
						? `Ejemplo ilustrativo de un baño terminado. La foto no corresponde a una vivienda de ${city.ciudad}.`
						: 'Ejemplo ilustrativo de un baño terminado. La foto no corresponde a una vivienda concreta.',
					image: `${img}/bano.webp`,
					imageAlt: `Baño con bañera exenta y lavabo. ${stock}`,
					tag: 'Ejemplo ilustrativo',
				},
				{
					title: 'Cocina de vivienda',
					description: 'Ejemplo ilustrativo de una cocina amueblada, para mostrar el tipo de resultado, no un encargo concreto.',
					image: `${img}/cocina.webp`,
					imageAlt: `Cocina blanca con isla y electrodomésticos. ${stock}`,
					tag: 'Ejemplo ilustrativo',
				},
				{
					title: 'Revisión de cuadro eléctrico',
					description: 'Ejemplo ilustrativo de una revisión en el cuadro de una vivienda. No identifica ninguna instalación real.',
					image: `${img}/cuadro.webp`,
					imageAlt: `Cuadro eléctrico con magnetotérmicos y cableado. ${stock}`,
					tag: 'Ejemplo ilustrativo',
				},
			],
		},
		advantages: {
			id: 'ventajas',
			eyebrow: 'Manera de trabajar',
			title: 'Lo que esta web dejaría claro antes de la visita',
			description: 'Ventajas de ejemplo, redactadas en neutro. No hay cifras, años de oficio ni valoraciones de clientes.',
			items: [
				{
					title: 'Presupuesto por escrito',
					description: 'El alcance y el precio se dejan por escrito antes de empezar el trabajo.',
					icon: '1',
				},
				{
					title: 'Visita previa',
					description: 'El oficio ve el espacio y pregunta por el uso, en lugar de presupuestar solo por una foto.',
					icon: '2',
				},
				{
					title: 'Casa y local',
					description: 'El ejemplo se centra en vivienda y pequeño comercio, no en promociones ni obra civil.',
					icon: '3',
				},
				{
					title: 'Zona acotada',
					description: city
						? `El desplazamiento de ejemplo se limita a ${city.ciudad} y ${city.area}, para no prometer salidas irreales.`
						: 'Esta versión no fija un municipio ni un área de desplazamiento.',
					icon: '4',
				},
			],
		},
		process: {
			id: 'proceso',
			eyebrow: 'Proceso',
			title: 'De la consulta al repaso final',
			description: 'Recorrido de ejemplo. Los plazos reales dependerían de cada encargo.',
			items: [
				{
					title: 'Cuentas el trabajo',
					description: 'Tipo de arreglo, municipio y una foto si ya la tienes. Con eso se ve si encaja en los oficios de la web.',
					icon: '1',
				},
				{
					title: 'Visita',
					description: 'Se mira el estado de la estancia, los accesos y lo que hay que proteger.',
					icon: '2',
				},
				{
					title: 'Presupuesto',
					description: 'Partidas, materiales previstos y una fecha orientativa, por escrito.',
					icon: '3',
				},
				{
					title: 'Ejecución y repaso',
					description: 'Se hace el trabajo y se revisa contigo antes de darlo por cerrado.',
					icon: '4',
				},
			],
		},
		faq: {
			id: 'preguntas',
			eyebrow: 'Preguntas frecuentes',
			title: 'Antes de pedir visita',
			description: city
				? `Respuestas de ejemplo para una web de este sector en ${city.ciudad}.`
				: 'Respuestas de ejemplo para una web de este sector.',
			items: faqItems(city),
		},
		offer: {
			id: 'quieres-una-web',
			eyebrow: '36web',
			title: offerTitle,
			description:
				'Puedes encargar un diseño completamente personalizado. También puedes llevarte esta web lista para adaptar: cambiamos la marca, los colores, los textos, los servicios y los datos por los de tu negocio. Es un diseño preparado para personalizar y una opción más económica que un diseño desde cero.',
			primary: {
				text: 'Quiero esta web adaptada a mi negocio',
				href: contactHref,
			},
			secondary: {
				text: 'Quiero un diseño a medida',
				href: contactHref,
			},
		},
		contact: {
			id: 'contacto',
			eyebrow: 'Contacto',
			heading: city ? `Pide una visita de ejemplo en ${city.ciudad}` : 'Pide una visita de ejemplo',
			description: city
				? `El formulario, el correo, el teléfono y el horario son datos de demostración, también en la versión de ${city.ciudad}. No hay un negocio real detrás ni un número local al que llamar.`
				: 'El formulario, el correo, el teléfono y el horario son datos de demostración. No hay un negocio real detrás ni un número al que llamar.',
			cardTitle: 'Datos de ejemplo',
			submitText: 'Enviar mensaje de ejemplo',
		},
		footer: {
			copyright: city
				? `Ejemplo comercial de 36web. Negocio ficticio: no es la web de un cliente de ${city.ciudad}.`
				: 'Ejemplo comercial de 36web. Negocio ficticio, sin ciudad asignada.',
			links: [
				{ label: 'Servicios', href: '#servicios' },
				{ label: 'Zonas', href: '#zonas' },
				{ label: 'Trabajos', href: '#trabajos' },
				{ label: 'Preguntas', href: '#preguntas' },
				{ label: 'Contacto', href: '#contacto' },
				{ label: 'Web para tu negocio', href: contactHref },
			],
		},
	};

	return { demo, pagePath };
}
