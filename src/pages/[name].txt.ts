// llms.txt (https://llmstxt.org): resumen del sitio para asistentes de IA.
// Generado en el build desde el mapa de rutas, ui.ts y la colección `services`
// para que nunca se desincronice del sitio (CLAUDE.md, skill geo-llmstxt).
// - Solo en producción (en preview no se genera) y solo si la política de
//   crawlers de IA es «permitir» (AI_CRAWLERS en consts.ts).
// - Un único archivo en la raíz: descripción en inglés y una sección de
//   enlaces por idioma, a las URLs canónicas; las descripciones son las meta
//   descriptions de cada página.
// - Fuera: legales, blog «Próximamente» (noindex) y 404. Solo datos
//   verificados: nada de lo pendiente en docs/SEO-DATOS-PENDIENTES.md.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { AI_CRAWLERS, CONTACT, IS_PRODUCTION, PERSON, SITE, SITE_NAME, SOCIAL } from '../consts';
import { absoluteUrl, localizedPath, t } from '../i18n/utils';
import {
	SERVICE_GROUPS,
	serviceRouteKey,
	type Lang,
	type ServiceGroup,
	type ServiceKey,
} from '../i18n/routes';

export const getStaticPaths: GetStaticPaths = () =>
	IS_PRODUCTION && AI_CRAWLERS === 'allow' ? [{ params: { name: 'llms' } }] : [];

// Orden de las secciones: inglés primero (descripción principal en inglés).
const SECTIONS: { lang: Lang; heading: string }[] = [
	{ lang: 'en', heading: 'English' },
	{ lang: 'el', heading: 'Ελληνικά (Greek, default language)' },
	{ lang: 'es', heading: 'Español (Spanish)' },
];

/** Título de una página sin la marca («Sesiones — María…» → «Sesiones»). */
const short = (title: string) => title.split(' — ')[0];

export const GET: APIRoute = async () => {
	const services = await getCollection('services');
	const byKey = (key: ServiceKey, lang: Lang) =>
		services.find((s) => s.data.serviceKey === key && s.data.lang === lang)!.data;

	const entry = (name: string, url: string, description: string) =>
		`- [${name}](${url}): ${description}`;

	const groupEntries = (group: ServiceGroup, lang: Lang) => [
		entry(
			short(t(lang, `${group}.seo.title`)),
			absoluteUrl(localizedPath(group, lang)),
			t(lang, `${group}.seo.description`),
		),
		...SERVICE_GROUPS[group].map((key) => {
			const data = byKey(key, lang);
			return entry(
				data.title,
				absoluteUrl(localizedPath(serviceRouteKey(key), lang)),
				data.metaDescription,
			);
		}),
	];

	const sections = SECTIONS.flatMap(({ lang, heading }) => [
		`## ${heading}`,
		'',
		entry(SITE_NAME, absoluteUrl(localizedPath('home', lang)), t(lang, 'home.seo.description')),
		entry(short(t(lang, 'about.seo.title')), absoluteUrl(localizedPath('about', lang)), t(lang, 'about.seo.description')),
		...groupEntries('sessions', lang),
		...groupEntries('courses', lang),
		entry(short(t(lang, 'contact.seo.title')), absoluteUrl(localizedPath('contact', lang)), t(lang, 'contact.seo.description')),
		'',
	]);

	const { streetAddress, postalCode } = CONTACT.address;
	const body = [
		`# ${SITE_NAME}`,
		'',
		'> Psychologist and psychopedagogue (PhD in Cognitive Psychology) in Chalandri, Athens, and online: psychological support for families and courses for parents and professionals.',
		'',
		'This file summarises the website of María Dimitropoulou López for AI systems. Every page exists in Greek (default, at the root), Spanish (/es/) and English (/en/).',
		'',
		...sections,
		'## Key facts',
		'',
		`- Name: ${PERSON.name} (Greek: ${PERSON.nameGreek})`,
		'- Profession: psychologist and psychopedagogue, PhD in Cognitive Psychology',
		'- Services: one-to-one psychological support sessions for children (play therapy), adolescents and adults (Mindfulness); parental and family therapy; support through the transition to motherhood (matrescence)',
		'- Courses: Hanen Teacher Talk® and ABC and Beyond™ certifications for early childhood professionals; Mindful Parenting school for parents',
		'- Approach: Mindfulness, mindful and respectful parenting, play therapy and family-centred early intervention',
		'- Experience: research on cognitive processes at universities and centres in Greece, England, the United States and Spain; university teaching in Greece, Spain and Cyprus',
		'- Collaborations: Project Parenting (https://www.projectparenting.gr), TeensNeurolink (https://teensneurolink.com/)',
		`- Practice: ${streetAddress}, Chalandri (Χαλάνδρι), ${postalCode} Athens, Greece; sessions also online`,
		'- Languages: Greek, Spanish and English',
		'',
		'## Contact',
		'',
		`- Website: ${SITE}/`,
		`- Email: ${CONTACT.email}`,
		`- Phone: ${CONTACT.phoneDisplay}`,
		`- Contact page: ${absoluteUrl(localizedPath('contact', 'en'))}`,
		`- LinkedIn: ${SOCIAL.linkedin}`,
		'',
	].join('\n');

	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
