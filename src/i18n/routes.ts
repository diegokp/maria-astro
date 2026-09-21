export const LOCALES = ['el', 'es', 'en'] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Lang = 'el';

// Fuente única de rutas traducidas. Los slugs griegos son una propuesta;
// María debe validarlos antes del lanzamiento (ver CLAUDE.md).
export const routes = {
	home: { el: '/', es: '/es/', en: '/en/' },
	services: {
		el: '/ypiresies/',
		es: '/es/servicios/',
		en: '/en/services/',
	},
	'service.psychological': {
		el: '/ypiresies/psychologiki-ypostirixi/',
		es: '/es/servicios/apoyo-psicologico/',
		en: '/en/services/psychological-support/',
	},
	'service.parental': {
		el: '/ypiresies/symvouleftiki-goneon/',
		es: '/es/servicios/asesoramiento-parental/',
		en: '/en/services/parental-guidance/',
	},
	'service.mindfulness': {
		el: '/ypiresies/mindfulness/',
		es: '/es/servicios/mindfulness/',
		en: '/en/services/mindfulness/',
	},
	'service.training': {
		el: '/ypiresies/epaggelmatiki-katartisi/',
		es: '/es/servicios/formacion-profesional/',
		en: '/en/services/professional-training/',
	},
	about: { el: '/sxetika/', es: '/es/sobre-mi/', en: '/en/about/' },
	blog: { el: '/nea/', es: '/es/blog/', en: '/en/blog/' },
	contact: {
		el: '/epikoinonia/',
		es: '/es/contacto/',
		en: '/en/contact/',
	},
	privacy: {
		el: '/aporrito/',
		es: '/es/privacidad/',
		en: '/en/privacy/',
	},
	cookies: { el: '/cookies/', es: '/es/cookies/', en: '/en/cookies/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;
