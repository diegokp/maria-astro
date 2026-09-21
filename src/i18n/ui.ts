// Diccionario de strings de interfaz. El griego (idioma por defecto) es la
// fuente de verdad de las claves: si `es` o `en` no implementan una clave
// que existe en `el`, TypeScript falla en `astro check`.
const el = {
	'a11y.skipToContent': 'Ir al contenido',
	'nav.ariaLabel': 'Navegación principal',
	'nav.services': 'Υπηρεσίες',
	'nav.about': 'Σχετικά',
	'nav.blog': 'Νέα',
	'nav.contact': 'Επικοινωνία',
	'nav.mobileMenu.open': 'Άνοιγμα μενού',
	'nav.mobileMenu.close': 'Κλείσιμο μενού',
	'langSwitcher.ariaLabel': 'Επιλογή γλώσσας',
	'langSwitcher.el': 'Ελληνικά',
	'langSwitcher.es': 'Español',
	'langSwitcher.en': 'English',

	'home.seo.title': 'Μαρία Δημητροπούλου Λόπεζ — Ψυχολόγος',
	'home.seo.description':
		'Ψυχολογική υποστήριξη, συμβουλευτική γονέων, mindfulness και επαγγελματική κατάρτιση. Chalandri, Αθήνα και online.',
	'home.hero.title': 'Μαρία Δημητροπούλου Λόπεζ',
	'home.hero.subtitle':
		'Ψυχολογική υποστήριξη, συμβουλευτική γονέων, mindfulness και επαγγελματική κατάρτιση.',
	'home.hero.cta': 'Κλείστε ραντεβού',
	'home.services.heading': 'Υπηρεσίες',
	'home.contact.heading': 'Επικοινωνία',
	'home.contact.intro':
		'Ατομική συνεδρία στο Chalandri (Αθήνα) ή online.',
	'home.contact.cta': 'Στείλτε μήνυμα',

	'service.psychological.title': 'Ψυχολογική υποστήριξη',
	'service.psychological.blurb': 'TODO: περιγραφή εκκρεμεί',
	'service.parental.title': 'Συμβουλευτική γονέων',
	'service.parental.blurb': 'TODO: περιγραφή εκκρεμεί',
	'service.mindfulness.title': 'Mindfulness',
	'service.mindfulness.blurb': 'TODO: περιγραφή εκκρεμεί',
	'service.training.title': 'Επαγγελματική κατάρτιση',
	'service.training.blurb': 'TODO: περιγραφή εκκρεμεί',

	'person.jobTitle': 'Ψυχολόγος',

	'footer.contactHeading': 'Επικοινωνία',
	'footer.followHeading': 'Ακολουθήστε',
	'footer.legalHeading': 'Νομικά',
	'footer.privacy': 'Απόρρητο',
	'footer.cookies': 'Cookies',
	'footer.addressTodo': 'TODO: διεύθυνση εκκρεμεί',
	'footer.phoneTodo': 'TODO: τηλέφωνο εκκρεμεί',
	'footer.rights': 'Με επιφύλαξη κάθε δικαιώματος.',
} as const;

export type UIKey = keyof typeof el;

const es: Record<UIKey, string> = {
	'a11y.skipToContent': 'Ir al contenido',
	'nav.ariaLabel': 'Navegación principal',
	'nav.services': 'Servicios',
	'nav.about': 'Sobre mí',
	'nav.blog': 'Blog',
	'nav.contact': 'Contacto',
	'nav.mobileMenu.open': 'Abrir menú',
	'nav.mobileMenu.close': 'Cerrar menú',
	'langSwitcher.ariaLabel': 'Selector de idioma',
	'langSwitcher.el': 'Ελληνικά',
	'langSwitcher.es': 'Español',
	'langSwitcher.en': 'English',

	'home.seo.title': 'María Dimitropoulou López — Psicóloga',
	'home.seo.description':
		'Apoyo psicológico, asesoramiento parental, mindfulness y formación profesional. Chalandri, Atenas y online.',
	'home.hero.title': 'María Dimitropoulou López',
	'home.hero.subtitle':
		'Apoyo psicológico, asesoramiento parental, mindfulness y formación profesional.',
	'home.hero.cta': 'Pide cita',
	'home.services.heading': 'Servicios',
	'home.contact.heading': 'Contacto',
	'home.contact.intro':
		'Consulta individual en Chalandri (Atenas) u online.',
	'home.contact.cta': 'Envía un mensaje',

	'service.psychological.title': 'Apoyo psicológico',
	'service.psychological.blurb': 'TODO: descripción pendiente',
	'service.parental.title': 'Asesoramiento parental',
	'service.parental.blurb': 'TODO: descripción pendiente',
	'service.mindfulness.title': 'Mindfulness',
	'service.mindfulness.blurb': 'TODO: descripción pendiente',
	'service.training.title': 'Formación profesional',
	'service.training.blurb': 'TODO: descripción pendiente',

	'person.jobTitle': 'Psicóloga',

	'footer.contactHeading': 'Contacto',
	'footer.followHeading': 'Sígueme',
	'footer.legalHeading': 'Legal',
	'footer.privacy': 'Privacidad',
	'footer.cookies': 'Cookies',
	'footer.addressTodo': 'TODO: dirección pendiente',
	'footer.phoneTodo': 'TODO: teléfono pendiente',
	'footer.rights': 'Todos los derechos reservados.',
};

const en: Record<UIKey, string> = {
	'a11y.skipToContent': 'Skip to content',
	'nav.ariaLabel': 'Main navigation',
	'nav.services': 'Services',
	'nav.about': 'About',
	'nav.blog': 'Blog',
	'nav.contact': 'Contact',
	'nav.mobileMenu.open': 'Open menu',
	'nav.mobileMenu.close': 'Close menu',
	'langSwitcher.ariaLabel': 'Language selector',
	'langSwitcher.el': 'Ελληνικά',
	'langSwitcher.es': 'Español',
	'langSwitcher.en': 'English',

	'home.seo.title': 'María Dimitropoulou López — Psychologist',
	'home.seo.description':
		'Psychological support, parental guidance, mindfulness and professional training. Chalandri, Athens and online.',
	'home.hero.title': 'María Dimitropoulou López',
	'home.hero.subtitle':
		'Psychological support, parental guidance, mindfulness and professional training.',
	'home.hero.cta': 'Book a session',
	'home.services.heading': 'Services',
	'home.contact.heading': 'Contact',
	'home.contact.intro':
		'Individual sessions in Chalandri (Athens) or online.',
	'home.contact.cta': 'Send a message',

	'service.psychological.title': 'Psychological support',
	'service.psychological.blurb': 'TODO: description pending',
	'service.parental.title': 'Parental guidance',
	'service.parental.blurb': 'TODO: description pending',
	'service.mindfulness.title': 'Mindfulness',
	'service.mindfulness.blurb': 'TODO: description pending',
	'service.training.title': 'Professional training',
	'service.training.blurb': 'TODO: description pending',

	'person.jobTitle': 'Psychologist',

	'footer.contactHeading': 'Contact',
	'footer.followHeading': 'Follow',
	'footer.legalHeading': 'Legal',
	'footer.privacy': 'Privacy',
	'footer.cookies': 'Cookies',
	'footer.addressTodo': 'TODO: address pending',
	'footer.phoneTodo': 'TODO: phone pending',
	'footer.rights': 'All rights reserved.',
};

export const ui = { el, es, en };
