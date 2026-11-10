import { SITE_ENV } from 'astro:env/server';
import type { Lang } from './i18n/routes';

export const SITE = 'https://mariadimitropouloulopez.com';
export const SITE_NAME = 'María Dimitropoulou López';

// Guard de entorno (astro.config.mjs → env.schema.SITE_ENV). Solo el build de
// producción (`npm run build:prod`) es indexable: emite robots `index`, un
// robots.txt que permite el rastreo, sitemap y llms.txt. Cualquier otro build
// (dev, previews de Vercel) sale con `noindex, nofollow` y `Disallow: /`.
export const IS_PRODUCTION = SITE_ENV === 'production';

// Modalidad (decidido el 10/11/2026): sesiones online y presenciales en la
// consulta de Chalandri. Controla dirección y canales en el JSON-LD.
export const MODALITY = { online: true, inPerson: true } as const;

// Política hacia los crawlers de IA (GPTBot, ClaudeBot, PerplexityBot,
// Google-Extended…) en robots.txt. Decidido: permitir. Ver docs/SEO-AUDITORIA.md.
export const AI_CRAWLERS: 'allow' | 'block' = 'allow';

// Open Graph: locale por idioma (inglés británico, decidido el 10/11/2026).
export const OG_LOCALE: Record<Lang, string> = { el: 'el_GR', es: 'es_ES', en: 'en_GB' };

// Analítica de visitas: Plausible (sin cookies ni datos personales). Solo se
// carga en el build de producción, para no contar las visitas de los previews
// ni del desarrollo. Script propio del sitio en plausible.io.
export const PLAUSIBLE_SCRIPT = 'https://plausible.io/js/pa-jvU60SWxCNlw1G1qi3v2-.js';

// Color de la interfaz del navegador en móvil (cabecera blanca).
export const THEME_COLOR = '#ffffff';

export const CONTACT = {
	email: 'dimitropoulou.mar@gmail.com',
	// Formato E.164 para enlaces tel: y JSON-LD; `phoneDisplay` para mostrar.
	phone: "+306940270745",
	phoneDisplay: "+30 694 027 0745",
	// Dirección postal oficial (en griego) de la consulta. El texto visible y
	// traducido de la dirección está en ui.ts (`footer.address`).
	address: {
		streetAddress: "Λέσβου 8",
		addressLocality: "Χαλάνδρι",
		addressRegion: "Αττική",
		postalCode: "152 31",
		addressCountry: "GR",
	},
	// Pendientes (docs/SEO-DATOS-PENDIENTES.md). Mientras sean null, la
	// propiedad se omite del JSON-LD; nunca se inventan.
	geo: null as { latitude: number; longitude: number } | null,
	mapUrl: null as string | null,
	openingHours: null as string[] | null,
};

// Entidad principal (María) para los datos estructurados. Solo datos que la
// web muestra; los pendientes van a null y se omiten.
export const PERSON = {
	name: SITE_NAME,
	nameGreek: 'Μαρία Δημητροπούλου Λόπεζ',
	// Universidades de grado, másteres y doctorado: pendiente (María).
	alumniOf: null as string[] | null,
	// Colegiación profesional (publicada en el Aviso legal).
	credential: {
		number: 'P02486',
		body: 'Colegio Oficial de Psicólogos de Las Palmas',
	} as { number: string; body: string } | null,
	// Áreas de conocimiento: las disciplinas que la página «María» muestra
	// («Un enfoque multidisciplinar» y su doctorado).
	knowsAbout: {
		el: ['Ενσυνειδητότητα (Mindfulness)', 'Ενσυνείδητη Γονεϊκότητα', 'Παιγνιοθεραπεία', 'Έγκαιρη Παρέμβαση', 'Γνωστική Ψυχολογία'],
		es: ['Mindfulness', 'Parentalidad Consciente', 'Terapia de Juego', 'Atención Temprana', 'Psicología Cognitiva'],
		en: ['Mindfulness', 'Mindful Parenting', 'Play Therapy', 'Early Intervention', 'Cognitive Psychology'],
	} satisfies Record<Lang, string[]>,
	// Colaboraciones reales con enlace (página «María» → Colaboraciones). La
	// universidad queda fuera hasta aclarar con María si es una colaboración.
	affiliations: [
		{ name: 'Project Parenting', url: 'https://www.projectparenting.gr' },
		{ name: 'TeensNeurolink', url: 'https://teensneurolink.com/' },
	],
};

// Avisos de build: datos obligatorios para el SEO que aún faltan. Solo en el
// build de producción, para no ensuciar los previews.
if (IS_PRODUCTION) {
	const missing = [
		MODALITY.inPerson && !CONTACT.geo && 'CONTACT.geo (coordenadas de la consulta)',
		MODALITY.inPerson && !CONTACT.mapUrl && 'CONTACT.mapUrl (Google Maps / Business)',
		!PERSON.alumniOf && 'PERSON.alumniOf (universidades)',
		!PERSON.credential && 'PERSON.credential (colegiación)',
	].filter(Boolean);
	if (missing.length) {
		console.warn(`[seo] Datos pendientes (se omiten del JSON-LD): ${missing.join(', ')}. Ver docs/SEO-DATOS-PENDIENTES.md.`);
	}
}

export const SOCIAL = {
	facebook: 'https://www.facebook.com/MariaDimitropoulouPhD/',
	instagram: 'https://www.instagram.com/mariadimitropouloulopez/',
	linkedin:
		'https://www.linkedin.com/in/maria-dimitropoulou-lopez-53268375/',
};

// Newsletter (Mailchimp): una etiqueta por idioma para segmentar los envíos.
// Mailchimp necesita el ID numérico de cada etiqueta, no su nombre. Para
// obtenerlo: Audience → Tags → crear «el», «es» y «en»; luego Audience →
// Signup forms → Embedded forms → añadir la etiqueta y copiar el `value` del
// <input type="hidden" name="tags" value="…"> que genera.
export const NEWSLETTER_TAG_IDS: Record<Lang, string | null> = {
	el: '24268402',
	es: '24268403',
	en: '24268404',
};
