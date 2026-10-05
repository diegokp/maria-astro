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

// Fuente única de rutas traducidas. Los slugs griegos son una propuesta;
// María debe validarlos antes del lanzamiento (ver CLAUDE.md).
export const routes = {
	home: { el: '/', es: '/es/', en: '/en/' },
	services: {
		el: '/ypiresies/',
		es: '/es/servicios/',
		en: '/en/services/',
	},
	'service.psychotherapy': {
		el: '/ypiresies/psychotherapeftiki-ypostirixi/',
		es: '/es/servicios/apoyo-psicoterapeutico/',
		en: '/en/services/psychotherapeutic-support/',
	},
	'service.parental': {
		el: '/ypiresies/goneiki-oikogeneiaki-therapeia/',
		es: '/es/servicios/terapia-parental-familiar/',
		en: '/en/services/parental-family-therapy/',
	},
	'service.matrescence': {
		el: '/ypiresies/metavasi-sti-mitrotita/',
		es: '/es/servicios/matrescencia/',
		en: '/en/services/matrescence/',
	},
	'service.teacher-talk': {
		el: '/ypiresies/teacher-talk/',
		es: '/es/servicios/teacher-talk/',
		en: '/en/services/teacher-talk/',
	},
	'service.abc-beyond': {
		el: '/ypiresies/abc-and-beyond/',
		es: '/es/servicios/abc-and-beyond/',
		en: '/en/services/abc-and-beyond/',
	},
	'service.mindful-parenting': {
		el: '/ypiresies/mindful-parenting/',
		es: '/es/servicios/mindful-parenting/',
		en: '/en/services/mindful-parenting/',
	},
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
