import type { BusinessHours } from '../business';
import type { NavItem } from '../navigation';

export interface SectorDemoTheme {
	primary: string;
	secondary: string;
	surface: string;
	text: string;
	border: string;
	background?: string;
}

export interface SectorDemoField {
	label: string;
	value: string;
}

export type SectorDemoSection =
	| 'services'
	| 'zones'
	| 'projects'
	| 'advantages'
	| 'about'
	| 'modalities'
	| 'process'
	| 'faq'
	| 'offer'
	| 'contact';

export interface SectorDemoImageCard {
	title: string;
	description: string;
	image: string;
	imageAlt: string;
	tag?: string;
	href?: string;
	ctaText?: string;
}

export interface SectorDemoIconCard {
	title: string;
	description: string;
	icon?: string;
	href?: string;
}

export interface SectorDemoFaqItem {
	question: string;
	answer: string;
}

export interface SectorDemoLink {
	text: string;
	href: string;
}

/**
 * Everything a sector demo needs, apart from the shared page shell.
 * City-specific sentences for the repairs demo are applied in
 * `src/config/localDemos/reparaciones.ts` from `cities.ts`.
 */
export interface SectorDemoConfig {
	slug: string;
	/** Short label for the examples index. */
	label: string;
	/** One line on the examples index. */
	summary: string;
	seo: {
		title: string;
		description: string;
		image: string;
		imageAlt: string;
	};
	theme: SectorDemoTheme;
	/** Fictional identity shown inside the demo. Not the agency, and not a real client. */
	identity: {
		name: string;
		tagline: string;
		email: string;
		phone: string;
		location: string;
		address: string;
		mapAddress: string;
		mapTitle: string;
		hours: BusinessHours[];
	};
	notice: {
		text: string;
		ctaLabel: string;
		ctaHref: string;
	};
	nav: NavItem[];
	headerCta: SectorDemoLink;
	hero: {
		eyebrow: string;
		title: string;
		description: string;
		image: string;
		imageAlt: string;
		primaryCta: SectorDemoLink;
		secondaryCta: SectorDemoLink;
	};
	services: {
		id: string;
		eyebrow: string;
		title: string;
		description: string;
		items: SectorDemoImageCard[];
	};
	zones: {
		id: string;
		eyebrow: string;
		title: string;
		description: string;
		items: SectorDemoIconCard[];
	};
	projects?: {
		id: string;
		eyebrow: string;
		title: string;
		description: string;
		items: SectorDemoImageCard[];
	};
	/** Portrait-free introduction. Credentials stay as editable placeholders. */
	about?: {
		id: string;
		eyebrow: string;
		title: string;
		description: string;
		image: string;
		imageAlt: string;
		fields: SectorDemoField[];
	};
	modalities?: {
		id: string;
		eyebrow: string;
		title: string;
		description: string;
		items: SectorDemoIconCard[];
	};
	/** When set, replaces the repairs demo section order. */
	sectionOrder?: SectorDemoSection[];
	advantages: {
		id: string;
		eyebrow: string;
		title: string;
		description: string;
		items: SectorDemoIconCard[];
	};
	process: {
		id: string;
		eyebrow: string;
		title: string;
		description: string;
		items: SectorDemoIconCard[];
	};
	faq: {
		id: string;
		eyebrow: string;
		title: string;
		description: string;
		items: SectorDemoFaqItem[];
	};
	/** Commercial block for 36web, separate from the fictional business. */
	offer: {
		id: string;
		eyebrow: string;
		title: string;
		description: string;
		primary: SectorDemoLink;
		secondary: SectorDemoLink;
	};
	contact: {
		id: string;
		eyebrow: string;
		heading: string;
		description: string;
		cardTitle: string;
		submitText: string;
	};
	footer: {
		copyright: string;
		links: NavItem[];
	};
}
