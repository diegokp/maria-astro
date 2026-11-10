// Datos estructurados (JSON-LD) de todas las páginas: un único bloque con
// `@graph` por página. Reglas (CLAUDE.md, «SEO», y docs/SEO-AUDITORIA.md):
// - `@id` estables y neutros al idioma para las entidades que son las mismas en
//   los tres idiomas (#website, #person, #practice, #service-…, #course-…); el
//   nombre y la descripción se localizan en cada página.
// - Solo datos que la página respalda. Lo pendiente (null en consts.ts) se
//   omite: `clean()` elimina null, undefined, '' y arrays vacíos.
// - Nada de Review/AggregateRating ni afirmaciones clínicas.
import { CONTACT, MODALITY, PERSON, SITE, SITE_NAME, SOCIAL } from '../consts';
import type { Lang, ServiceKey } from '../i18n/routes';

export const LD_ID = {
	website: `${SITE}/#website`,
	person: `${SITE}/#person`,
	practice: `${SITE}/#practice`,
	service: (key: ServiceKey) => `${SITE}/#service-${key}`,
	course: (key: ServiceKey) => `${SITE}/#course-${key}`,
};

/** Qué representa la página; lo decide cada ruta y lo pasa a SEO.astro. */
export type PageSchema =
	| { type: 'home' }
	| { type: 'profile' }
	| { type: 'contact' }
	| { type: 'webpage' }
	| { type: 'collection'; items: { name: string; url: string }[] }
	| { type: 'service'; key: ServiceKey; name: string; description: string }
	| { type: 'course'; key: ServiceKey; name: string; description: string };

export interface PageContext {
	lang: Lang;
	url: string; // canonical absoluta
	title: string;
	description: string;
	jobTitle: string;
	personDescription: string;
	aboutUrl: string;
	contactUrl: string;
	personImage: string; // URL absoluta (JPEG generado en el build)
	logo: string; // URL absoluta
	breadcrumbs?: { name: string; url: string }[];
	schema: PageSchema;
}

type Json = string | number | boolean | null | undefined | Json[] | { [k: string]: Json };

/** Quita null, undefined, cadenas vacías y arrays/objetos vacíos (recursivo). */
function clean<T extends Json>(value: T): T {
	if (Array.isArray(value)) {
		return value.map(clean).filter((v) => !isEmpty(v)) as T;
	}
	if (value && typeof value === 'object') {
		const out: Record<string, Json> = {};
		for (const [k, v] of Object.entries(value)) {
			const c = clean(v as Json);
			if (!isEmpty(c)) out[k] = c;
		}
		return out as T;
	}
	return value;
}
const isEmpty = (v: Json) =>
	v === null ||
	v === undefined ||
	v === '' ||
	(Array.isArray(v) && v.length === 0) ||
	(typeof v === 'object' && !Array.isArray(v) && Object.keys(v as object).length === 0);

const ref = (id: string) => ({ '@id': id });

/** Elimina las marcas `**…**` de los textos con destacados (src/utils/highlight.ts). */
export const plainText = (text: string) => text.replace(/\*\*(.+?)\*\*/g, '$1');

export function buildGraph(ctx: PageContext) {
	const { lang, schema } = ctx;
	const inPerson = MODALITY.inPerson;

	const website = {
		'@type': 'WebSite',
		'@id': LD_ID.website,
		// Entidades globales: misma URL en los tres idiomas (la raíz, x-default),
		// para que un mismo @id no tenga datos contradictorios entre páginas.
		url: `${SITE}/`,
		name: SITE_NAME,
		inLanguage: ['el', 'es', 'en'],
		publisher: ref(LD_ID.practice),
	};

	const person = {
		'@type': 'Person',
		'@id': LD_ID.person,
		name: PERSON.name,
		alternateName: PERSON.nameGreek,
		jobTitle: ctx.jobTitle,
		description: ctx.personDescription,
		image: ctx.personImage,
		url: ctx.aboutUrl,
		email: CONTACT.email,
		telephone: CONTACT.phone,
		knowsAbout: PERSON.knowsAbout[lang],
		alumniOf: PERSON.alumniOf?.map((name) => ({ '@type': 'CollegeOrUniversity', name })),
		affiliation: PERSON.affiliations.map((org) => ({ '@type': 'Organization', ...org })),
		worksFor: ref(LD_ID.practice),
		sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.linkedin],
	};

	// Consulta: ProfessionalService (subtipo de LocalBusiness) es el tipo más
	// específico válido para una psicóloga; no se usan tipos médicos
	// (Physician, MedicalClinic) porque no corresponden a la profesión.
	const practice = {
		'@type': 'ProfessionalService',
		'@id': LD_ID.practice,
		name: SITE_NAME,
		url: `${SITE}/`,
		image: ctx.personImage,
		logo: ctx.logo,
		email: CONTACT.email,
		telephone: CONTACT.phone,
		founder: ref(LD_ID.person),
		address: inPerson ? { '@type': 'PostalAddress', ...addressOf() } : null,
		geo: inPerson && CONTACT.geo ? { '@type': 'GeoCoordinates', ...CONTACT.geo } : null,
		hasMap: inPerson ? CONTACT.mapUrl : null,
		openingHours: inPerson ? CONTACT.openingHours : null,
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'customer service',
			email: CONTACT.email,
			telephone: CONTACT.phone,
			availableLanguage: ['el', 'es', 'en'],
		},
		sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.linkedin],
	};

	const breadcrumb =
		ctx.breadcrumbs && ctx.breadcrumbs.length > 0
			? {
					'@type': 'BreadcrumbList',
					'@id': `${ctx.url}#breadcrumb`,
					itemListElement: ctx.breadcrumbs.map((crumb, i) => ({
						'@type': 'ListItem',
						position: i + 1,
						name: crumb.name,
						item: crumb.url,
					})),
				}
			: null;

	const pageTypes: Record<PageSchema['type'], string> = {
		home: 'WebPage',
		profile: 'ProfilePage',
		contact: 'ContactPage',
		webpage: 'WebPage',
		collection: 'CollectionPage',
		service: 'WebPage',
		course: 'WebPage',
	};

	const extra: Record<string, Json>[] = [];
	let mainEntity: Json = null;
	let about: Json = null;

	switch (schema.type) {
		case 'home':
			about = ref(LD_ID.person);
			mainEntity = ref(LD_ID.practice);
			break;
		case 'profile':
			mainEntity = ref(LD_ID.person);
			break;
		case 'contact':
			mainEntity = ref(LD_ID.practice);
			break;
		case 'collection':
			mainEntity = { '@id': `${ctx.url}#list` };
			extra.push({
				'@type': 'ItemList',
				'@id': `${ctx.url}#list`,
				itemListElement: schema.items.map((item, i) => ({
					'@type': 'ListItem',
					position: i + 1,
					url: item.url,
					name: item.name,
				})),
			});
			break;
		case 'service':
			mainEntity = ref(LD_ID.service(schema.key));
			extra.push({
				'@type': 'Service',
				'@id': LD_ID.service(schema.key),
				name: schema.name,
				serviceType: schema.name,
				description: plainText(schema.description),
				provider: ref(LD_ID.practice),
				// Las páginas de sesiones anuncian sesiones online; la consulta
				// presencial está en la entidad #practice.
				availableChannel: {
					'@type': 'ServiceChannel',
					name: 'Online',
					serviceUrl: ctx.contactUrl,
					availableLanguage: ['el', 'es', 'en'],
				},
				url: ctx.url,
			});
			break;
		case 'course':
			// Sin fechas de edición en el contenido: solo Course, sin CourseInstance.
			mainEntity = ref(LD_ID.course(schema.key));
			extra.push({
				'@type': 'Course',
				'@id': LD_ID.course(schema.key),
				name: schema.name,
				description: plainText(schema.description),
				provider: ref(LD_ID.practice),
				// Sin inLanguage: sería el idioma en que se imparte el curso, y ese
				// dato no consta en el contenido (no es el idioma de la página).
				url: ctx.url,
			});
			break;
	}

	const webPage = {
		'@type': pageTypes[schema.type],
		'@id': ctx.url,
		url: ctx.url,
		name: ctx.title,
		description: ctx.description,
		inLanguage: lang,
		isPartOf: ref(LD_ID.website),
		about,
		mainEntity,
		breadcrumb: breadcrumb ? ref(breadcrumb['@id']) : null,
	};

	return clean({
		'@context': 'https://schema.org',
		'@graph': [webPage, website, practice, person, breadcrumb, ...extra] as Json[],
	} as Json);
}

function addressOf() {
	const { streetAddress, addressLocality, addressRegion, postalCode, addressCountry } = CONTACT.address;
	return { streetAddress, addressLocality, addressRegion, postalCode, addressCountry };
}
