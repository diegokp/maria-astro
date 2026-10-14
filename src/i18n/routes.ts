export const LOCALES = ['el', 'es', 'en'] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Lang = 'el';

// Claves de servicio: las usan el mapa de rutas (`service.<clave>`) y el
// esquema de la colección `services` (src/content.config.ts).
export const SERVICE_KEYS = [
	'psychotherapy',
	'parental',
	'matrescence',
	'teacher-talk',
	'abc-beyond',
	'mindful-parenting',
	'talks',
] as const;
export type ServiceKey = (typeof SERVICE_KEYS)[number];

// Cada servicio pertenece a una página índice: «Sesiones» o «Cursos».
// `talks` (seminarios y charlas) queda fuera a propósito: su ubicación está
// por decidir, así que no se genera su página ni aparece en ningún listado.
export const SERVICE_GROUPS = {
	sessions: ['psychotherapy', 'parental', 'matrescence'],
	courses: ['teacher-talk', 'abc-beyond', 'mindful-parenting'],
} as const satisfies Record<string, readonly ServiceKey[]>;
export type ServiceGroup = keyof typeof SERVICE_GROUPS;

export function serviceGroupOf(key: ServiceKey): ServiceGroup | undefined {
	return (Object.keys(SERVICE_GROUPS) as ServiceGroup[]).find((group) =>
		(SERVICE_GROUPS[group] as readonly ServiceKey[]).includes(key),
	);
}

// Fuente única de rutas traducidas. Los slugs griegos son una propuesta;
// María debe validarlos antes del lanzamiento (ver CLAUDE.md).
export const routes = {
	home: { el: '/', es: '/es/', en: '/en/' },
	sessions: {
		el: '/synedries/',
		es: '/es/sesiones/',
		en: '/en/sessions/',
	},
	'service.psychotherapy': {
		el: '/synedries/psychotherapeftiki-ypostirixi/',
		es: '/es/sesiones/apoyo-psicoterapeutico/',
		en: '/en/sessions/psychotherapeutic-support/',
	},
	'service.parental': {
		el: '/synedries/goneiki-oikogeneiaki-therapeia/',
		es: '/es/sesiones/terapia-parental-familiar/',
		en: '/en/sessions/parental-family-therapy/',
	},
	'service.matrescence': {
		el: '/synedries/metavasi-sti-mitrotita/',
		es: '/es/sesiones/matrescencia/',
		en: '/en/sessions/matrescence/',
	},
	courses: {
		el: '/programmata/',
		es: '/es/cursos/',
		en: '/en/courses/',
	},
	'service.teacher-talk': {
		el: '/programmata/teacher-talk/',
		es: '/es/cursos/teacher-talk/',
		en: '/en/courses/teacher-talk/',
	},
	'service.abc-beyond': {
		el: '/programmata/abc-and-beyond/',
		es: '/es/cursos/abc-and-beyond/',
		en: '/en/courses/abc-and-beyond/',
	},
	'service.mindful-parenting': {
		el: '/programmata/mindful-parenting/',
		es: '/es/cursos/mindful-parenting/',
		en: '/en/courses/mindful-parenting/',
	},
	// Aparcado: sin grupo no se genera la página (ver SERVICE_GROUPS). La ruta
	// es provisional hasta decidir dónde se reubica.
	'service.talks': {
		el: '/ypiresies/seminaria-kai-omilies/',
		es: '/es/servicios/seminarios-y-charlas/',
		en: '/en/services/seminars-and-talks/',
	},
	about: { el: '/sxetika/', es: '/es/sobre-mi/', en: '/en/about/' },
	blog: { el: '/nea/', es: '/es/blog/', en: '/en/blog/' },
	contact: {
		el: '/epikoinonia/',
		es: '/es/contacto/',
		en: '/en/contact/',
	},
	legal: {
		el: '/nomiko-simeioma/',
		es: '/es/aviso-legal/',
		en: '/en/legal-notice/',
	},
	privacy: {
		el: '/aporrito/',
		es: '/es/privacidad/',
		en: '/en/privacy/',
	},
	cookies: { el: '/cookies/', es: '/es/cookies/', en: '/en/cookies/' },
} as const satisfies Record<string, Record<Lang, string>> &
	Record<`service.${ServiceKey}`, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

// Páginas legales: su clave es directamente su routeKey.
export const LEGAL_KEYS = ['legal', 'privacy', 'cookies'] as const satisfies readonly RouteKey[];
export type LegalKey = (typeof LEGAL_KEYS)[number];

export function serviceRouteKey(key: ServiceKey): `service.${ServiceKey}` {
	return `service.${key}`;
}
