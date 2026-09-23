import type { SectorDemoConfig, SectorDemoFaqItem, SectorDemoIconCard } from '../sectorDemos/types';
import { resolveCity } from './cities';

/**
 * Shared psychology-practice demo. City sentences are applied in
 * `buildPsicologiaDemo`. Photos are stock interiors, not a real practice
 * and not a portrait of a professional.
 *
 * Stock sources (Unsplash, free licence; not a client space):
 * - hero: photo-1618221195710-dd6b41faaea6
 * - sobre, ánimo: photo-1616046229478-9901c5536a45
 * - ansiedad: photo-1494438639946-1ebd1d20bf85
 * - relaciones: photo-1600210492486-724fe5c67fb0
 * - cambios: photo-1449247709967-d4461a6a6103
 */
const img = '/img/sector-demos/psicologia';

const stock = 'Fotografía de stock de un interior. No es la consulta de una profesional ni el espacio de un paciente.';

const DEMO_ID = 'psicologia';
const CONTACT_BASE = 'https://36web.es/diseno-web/';

export function psicologiaContactHref(citySlug?: string): string {
	const params = new URLSearchParams();
	params.set('demo', DEMO_ID);
	if (citySlug) params.set('ciudad', citySlug);
	return `${CONTACT_BASE}?${params.toString()}#contacto`;
}

function listInSpanish(items: readonly string[]): string {
	if (items.length <= 1) return items[0] ?? '';
	return `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`;
}

const editableFields = [
	{ label: 'Nombre', value: 'Nombre de la profesional' },
	{ label: 'Colegiación', value: 'Número de colegiación (por completar)' },
	{ label: 'Formación', value: 'Titulación (por completar)' },
	{ label: 'Trayectoria', value: 'Experiencia (por completar)' },
	{ label: 'Dirección', value: 'Calle y número (por completar)' },
];

type ResolvedCity = NonNullable<ReturnType<typeof resolveCity>>;

function zoneItems(city: ResolvedCity | undefined): SectorDemoIconCard[] {
	if (!city) {
		return [
			{
				title: 'Sin municipio',
				description: 'Esta URL no trae un nombre de ciudad. No se lista una consulta concreta.',
				icon: '01',
			},
		];
	}

	return [
		{
			title: city.ciudad,
			description: 'Municipio de esta versión. No hay una consulta abierta ni pacientes aquí.',
			icon: '01',
		},
		...city.zonas.map((zona, index) => ({
			title: zona,
			description: 'Municipio cercano, solo para mostrar el área. No implica sesiones ni pacientes en esta localidad.',
			icon: String(index + 2).padStart(2, '0'),
		})),
	];
}

function locationSentence(city: ResolvedCity): string {
	const base = `En ${city.ciudad} esta web muestra cómo se presentaría una consulta para adultos, con sesión presencial u online.`;
	if (city.area && city.zonas.length > 0) {
		return `${base} El ejemplo también nombra ${listInSpanish(city.zonas)}, en el ${city.area}. Es una zona ilustrativa: no hay pacientes ni una consulta abierta en esas localidades.`;
	}
	return `${base} No hay pacientes ni una consulta abierta en ${city.ciudad}.`;
}

function faqItems(city: ResolvedCity | undefined, slug: string): SectorDemoFaqItem[] {
	const where = city
		? city.area && city.zonas.length > 0
			? `Esta URL usa ${city.ciudad} como ciudad de ejemplo, dentro del ${city.area}. También nombra ${listInSpanish(city.zonas)}. No hay una consulta real en ninguno de esos municipios.`
			: `Esta URL usa ${city.ciudad} como ciudad de ejemplo. El nombre sale de la dirección /psicologia/${slug}. No hay una consulta real ni una dirección en ${city.ciudad}.`
		: 'Esta dirección no trae un nombre de ciudad. La demo no inventa un municipio.';

	const common: SectorDemoFaqItem[] = [
		{
			question: '¿A quién se dirige esta consulta de ejemplo?',
			answer:
				'A personas adultas que quieren un espacio para hablar de lo que les preocupa: ansiedad, ánimo, relaciones o un cambio. No representa un servicio de urgencias ni atención a menores.',
		},
		{
			question: '¿Dónde está la consulta?',
			answer: where,
		},
		{
			question: '¿La primera sesión obliga a seguir?',
			answer:
				'No. En el ejemplo, la primera sesión sirve para contar el motivo y ver si encaja seguir. La demo no fija un número de sesiones ni un resultado.',
		},
		{
			question: '¿Hay sesiones online?',
			answer: city
				? `Sí, como modalidad de ejemplo, además de la presencial en ${city.ciudad}. La herramienta de videollamada y el horario se completarían en una consulta real.`
				: 'Sí, como modalidad de ejemplo, además de la presencial. La herramienta de videollamada y el horario se completarían en una consulta real.',
		},
		{
			question: '¿Los datos de colegiación y experiencia son reales?',
			answer:
				'No. El nombre, el número de colegiación, la titulación, la trayectoria y la dirección son campos vacíos para completar. Esta demo no inventa una profesional.',
		},
		{
			question: city ? `¿Esta página es la consulta de una psicóloga de ${city.ciudad}?` : '¿Esta página es la consulta de una psicóloga?',
			answer:
				'No. Es un ejemplo comercial de 36web para enseñar cómo puede quedar la web de una consulta privada. No es un proyecto realizado para una profesional.',
		},
	];

	if (!city) return common;

	return [
		...common,
		{
			question: `¿Por qué esta página habla de ${city.ciudad}?`,
			answer: `Porque la URL es /psicologia/${slug}. El nombre de la ciudad sale de esa dirección. No hay pacientes, reseñas ni una dirección asociados a ${city.ciudad}.`,
		},
	];
}

/**
 * Builds the psychology demo for any URL slug.
 * `/psicologia/getafe` names Getafe even when that municipality is not listed
 * in `CITY_CONFIG`. A listed slug keeps its accents, area and nearby towns.
 */
export function buildPsicologiaDemo(citySlug: string): { demo: SectorDemoConfig; pagePath: string } {
	const city = resolveCity(citySlug);
	const slug = city?.slug ?? citySlug.trim().toLowerCase();
	const contactHref = psicologiaContactHref(slug || undefined);
	const pagePath = `/psicologia/${slug}`;

	const heroTitle = city ? `Psicóloga en ${city.ciudad}` : 'Psicóloga';
	const heroDescription = city
		? `Acompañamiento psicológico para adultos en ${city.ciudad}, con sesiones presenciales y online.`
		: 'Acompañamiento psicológico para adultos, con sesiones presenciales y online. Esta versión no está asociada a una ciudad concreta.';
	const offerTitle = city
		? `¿Quieres una web como esta para tu consulta en ${city.ciudad}?`
		: '¿Quieres una web como esta para tu consulta?';

	const demo: SectorDemoConfig = {
		slug: DEMO_ID,
		label: city ? `Psicología en ${city.ciudad}` : 'Psicología',
		summary: city
			? `Ejemplo comercial para una consulta de psicología en ${city.ciudad}.`
			: 'Ejemplo comercial de una consulta de psicología, sin municipio asignado.',
		seo: {
			title: heroTitle,
			description: city
				? `Ejemplo comercial de 36web: web de una consulta de psicología ficticia en ${city.ciudad}, con sesiones presenciales y online.`
				: 'Ejemplo comercial de 36web: web de una consulta de psicología ficticia, sin ciudad asignada.',
			image: `${img}/hero.webp`,
			imageAlt: `Sala amplia con luz natural y asientos. ${stock}`,
		},
		theme: {
			primary: '#1e2926',
			secondary: '#7a3f2c',
			surface: '#f7f3ec',
			text: '#1c1915',
			border: '#ddd4c6',
			background: '#efeae1',
		},
		identity: {
			name: 'Estudio Calma',
			tagline: heroTitle,
			email: 'contacto@ejemplo.invalid',
			phone: 'Teléfono de ejemplo',
			location: city ? city.ciudad : 'Sin municipio asignado',
			address: city ? city.ciudad : 'Sin municipio asignado',
			mapAddress: city ? `${city.ciudad}, España` : '',
			mapTitle: city ? `Mapa de ejemplo centrado en ${city.ciudad}` : 'Mapa no disponible en la versión genérica',
			hours: [
				{ days: 'Lunes a viernes', hours: '10:00 – 14:00 y 16:00 – 20:00' },
				{ days: 'Sábados', hours: 'Horario por completar' },
			],
		},
		notice: {
			text: city
				? `Ejemplo comercial de 36web. La consulta, la profesional y los datos son ficticios: no es un proyecto realizado para una psicóloga de ${city.ciudad}.`
				: 'Ejemplo comercial de 36web. La consulta, la profesional y los datos son ficticios. Esta dirección no trae un nombre de ciudad.',
			ctaLabel: offerTitle,
			ctaHref: contactHref,
		},
		nav: [
			{ label: 'Especialidades', href: '#especialidades' },
			{ label: 'Acompañamiento', href: '#acompanamiento' },
			{ label: 'La profesional', href: '#profesional' },
			{ label: 'Modalidad', href: '#modalidad' },
			{ label: 'Consulta', href: '#consulta' },
			{ label: 'Primera sesión', href: '#sesion' },
			{ label: 'Preguntas', href: '#preguntas' },
			{ label: 'Contacto', href: '#contacto' },
		],
		headerCta: { text: 'Pedir cita', href: '#contacto' },
		hero: {
			eyebrow: city ? (city.area ? `${city.ciudad} · ${city.area}` : city.ciudad) : 'Consulta de ejemplo',
			title: heroTitle,
			description: heroDescription,
			image: `${img}/hero.webp`,
			imageAlt: `Sala amplia con sofá, luz de tarde y plantas. ${stock}`,
			primaryCta: { text: 'Pedir una cita de ejemplo', href: '#contacto' },
			secondaryCta: { text: 'Ver especialidades', href: '#especialidades' },
		},
		services: {
			id: 'especialidades',
			eyebrow: 'Especialidades',
			title: 'De qué se puede hablar aquí',
			description: city
				? `Motivos habituales en una consulta para adultos en ${city.ciudad}. Son temas de ejemplo, no casos de pacientes ni resultados de un tratamiento.`
				: 'Motivos habituales en una consulta para adultos. Son temas de ejemplo, no casos de pacientes ni resultados de un tratamiento.',
			items: [
				{
					title: 'Ansiedad y preocupación',
					description: 'Cuando la cabeza no para, cuesta dormir o el cuerpo va por delante. Un espacio para bajar el ritmo y ponerle nombre a lo que pasa.',
					image: `${img}/ansiedad.webp`,
					imageAlt: `Lámpara junto a una pared en calma. ${stock}`,
					ctaText: 'Pedir cita',
					href: '#contacto',
				},
				{
					title: 'Estado de ánimo',
					description: 'Épocas de tristeza, apatía o irritabilidad. La web no promete un plazo ni un desenlace: acompaña el proceso que cada persona trae.',
					image: `${img}/sobre.webp`,
					imageAlt: `Estancia con pared verde, butaca y plantas. ${stock}`,
					ctaText: 'Pedir cita',
					href: '#contacto',
				},
				{
					title: 'Relaciones',
					description: 'Pareja, familia o vínculos que pesan. Se habla de lo que ocurre, sin convertir la sesión en un consejo cerrado.',
					image: `${img}/relaciones.webp`,
					imageAlt: `Dos sillones enfrentados en una sala luminosa. ${stock}`,
					ctaText: 'Pedir cita',
					href: '#contacto',
				},
				{
					title: 'Cambios y pérdidas',
					description: 'Una mudanza, un duelo, un trabajo que termina o una etapa que ya no encaja. La demo no describe casos reales.',
					image: `${img}/cambios.webp`,
					imageAlt: `Mesa blanca y silla vacía junto a una pared clara. ${stock}`,
					ctaText: 'Pedir cita',
					href: '#contacto',
				},
			],
		},
		advantages: {
			id: 'acompanamiento',
			eyebrow: 'Cómo puede ayudar',
			title: 'Un acompañamiento cercano, sin prisa',
			description: 'Así se presentaría la forma de trabajar. No hay cifras de mejoría ni testimonios.',
			items: [
				{
					title: 'Un lugar para ordenar',
					description: 'Poner en palabras lo que se mezcla en el día a día, con tiempo y sin interrupciones.',
					icon: '01',
				},
				{
					title: 'Ritmo acordado',
					description: 'La frecuencia de las sesiones se decide en la consulta. Esta página no la fija.',
					icon: '02',
				},
				{
					title: 'Sin resultado prometido',
					description: 'El proceso depende de cada persona. La web no asegura un cambio ni un plazo.',
					icon: '03',
				},
				{
					title: 'Confidencialidad',
					description: 'Lo hablado en sesión se queda ahí. El detalle legal iría en la política de privacidad de la consulta real.',
					icon: '04',
				},
			],
		},
		about: {
			id: 'profesional',
			eyebrow: 'Sobre la profesional',
			title: 'Una presentación para completar',
			description:
				'Aquí iría una presentación breve, con la voz de quien atiende. En esta demo no hay un nombre real, una colegiación ni una trayectoria: los campos de al lado están vacíos a propósito.',
			image: `${img}/sobre.webp`,
			imageAlt: `Rincón con butaca, plantas y pared verde. ${stock}`,
			fields: editableFields,
		},
		modalities: {
			id: 'modalidad',
			eyebrow: 'Modalidad',
			title: 'Presencial y online',
			description: city
				? `Las dos opciones forman parte del ejemplo en ${city.ciudad}. La dirección de la consulta no está inventada.`
				: 'Las dos opciones forman parte del ejemplo. La dirección de la consulta no está inventada.',
			items: [
				{
					title: 'Presencial',
					description: city
						? `Sesiones en la consulta de ${city.ciudad}. La calle se añade cuando hay un local real; aquí solo figura el municipio.`
						: 'Sesiones en la consulta. La calle se añade cuando hay un local real; esta versión no tiene municipio.',
					icon: '01',
				},
				{
					title: 'Online',
					description: city
						? `Videollamada para quien prefiere no desplazarse o vive fuera de ${city.ciudad}. La plataforma se elige con la consulta real.`
						: 'Videollamada para quien prefiere no desplazarse. La plataforma se elige con la consulta real.',
					icon: '02',
				},
			],
		},
		zones: {
			id: 'consulta',
			eyebrow: 'Ubicación',
			title: city ? `Consulta de psicología en ${city.ciudad}` : 'Consulta de psicología',
			description: city
				? locationSentence(city)
				: 'Esta dirección no trae un nombre de ciudad. No se da por hecho un municipio ni una zona de desplazamiento.',
			items: zoneItems(city),
		},
		process: {
			id: 'sesion',
			eyebrow: 'Primera sesión',
			title: 'Cómo empieza',
			description: 'Un recorrido de ejemplo. Los tiempos reales los marcaría la consulta.',
			items: [
				{
					title: 'Escribes',
					description: 'Un mensaje breve con el motivo y si prefieres presencial u online. El teléfono de esta página es de ejemplo.',
					icon: '1',
				},
				{
					title: 'Primera sesión',
					description: 'Se escucha qué te trae y qué esperas. No hace falta llegar con un relato ordenado.',
					icon: '2',
				},
				{
					title: 'Ver si encaja',
					description: 'Al terminar se puede decidir seguir, pensarlo o no continuar. No hay un plan cerrado de antemano.',
					icon: '3',
				},
				{
					title: 'El ritmo',
					description: 'Si se sigue, se acuerda cada cuánto. Esta demo no fija una periodicidad ni una duración.',
					icon: '4',
				},
			],
		},
		faq: {
			id: 'preguntas',
			eyebrow: 'Preguntas frecuentes',
			title: 'Antes de pedir cita',
			description: city
				? `Respuestas de ejemplo para una consulta en ${city.ciudad}.`
				: 'Respuestas de ejemplo para una consulta de psicología.',
			items: faqItems(city, slug),
		},
		offer: {
			id: 'quieres-una-web',
			eyebrow: '36web',
			title: offerTitle,
			description:
				'Puedes encargar un diseño completamente personalizado. También puedes llevarte esta web lista para adaptar: cambiamos la marca, los colores, los textos, las especialidades y los datos por los de tu consulta. Es un diseño preparado para personalizar y una opción más económica que un diseño desde cero.',
			primary: {
				text: 'Quiero esta web adaptada a mi consulta',
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
			heading: city ? `Pide una cita de ejemplo en ${city.ciudad}` : 'Pide una cita de ejemplo',
			description: city
				? `El formulario, el correo, el teléfono y el horario son datos de demostración, también en la versión de ${city.ciudad}. No hay una consulta real detrás ni un número local al que llamar.`
				: 'El formulario, el correo, el teléfono y el horario son datos de demostración. No hay una consulta real detrás ni un número al que llamar.',
			cardTitle: 'Datos de ejemplo',
			submitText: 'Enviar mensaje de ejemplo',
		},
		footer: {
			copyright: city
				? `Ejemplo comercial de 36web. Consulta ficticia: no es la web de una psicóloga de ${city.ciudad}.`
				: 'Ejemplo comercial de 36web. Consulta ficticia, sin ciudad asignada.',
			links: [
				{ label: 'Especialidades', href: '#especialidades' },
				{ label: 'Acompañamiento', href: '#acompanamiento' },
				{ label: 'La profesional', href: '#profesional' },
				{ label: 'Modalidad', href: '#modalidad' },
				{ label: 'Consulta', href: '#consulta' },
				{ label: 'Preguntas', href: '#preguntas' },
				{ label: 'Contacto', href: '#contacto' },
				{ label: 'Web para tu consulta', href: contactHref },
			],
		},
		sectionOrder: [
			'services',
			'advantages',
			'about',
			'modalities',
			'zones',
			'process',
			'faq',
			'offer',
			'contact',
		],
	};

	return { demo, pagePath };
}
