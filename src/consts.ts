import type { Lang } from './i18n/routes';

export const SITE = 'https://mariadimitropouloulopez.com';
export const SITE_NAME = 'María Dimitropoulou López';

// Mientras esté en false, SEO.astro emite `noindex, nofollow` en todas las
// páginas. Cambiar a true solo al lanzar el sitio (ver CLAUDE.md, fase 5).
export const SITE_LAUNCHED = false;

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
};

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
