// Diccionario de strings de interfaz. El griego (idioma por defecto) es la
// fuente de verdad de las claves: si `es` o `en` no implementan una clave
// que existe en `el`, TypeScript falla en `astro check`.
const el = {
	'a11y.skipToContent': 'Ir al contenido',
	'nav.ariaLabel': 'Navegación principal',
	'nav.home': 'Αρχική',
	// TODO: revisar traducción — «Συνεδρίες»/«Προγράμματα» son una propuesta.
	'nav.sessions': 'Συνεδρίες',
	'nav.courses': 'Προγράμματα',
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
		'Ψυχοθεραπευτική υποστήριξη, γονεϊκή και οικογενειακή θεραπεία, μετάβαση στη μητρότητα, Mindful Parenting και κατάρτιση επαγγελματιών. Χαλάνδρι και online.',
	'home.hero.title': 'Μαρία Δημητροπούλου Λόπεζ',
	'home.hero.subtitle':
		'Ψυχολογική υποστήριξη για την απελευθέρωση του άγχους όλης της οικογένειας και την εύρεση ροής και εσωτερικής γαλήνης στην καθημερινότητα.',
	'home.hero.cta': 'Επικοινωνήστε μαζί μου',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'home.intro.text':
		'Είμαι η Μαρία, ψυχολόγος και ψυχοπαιδαγωγός, ειδικευμένη στο **Mindfulness** και τη **Συνειδητή Γονεϊκότητα**.',
	'home.intro.quote':
		'Η πραγματική αλλαγή ξεκινά όταν κοιτάμε προς τα μέσα με συμπόνια. Η εύρεση ισορροπίας δεν είναι πάντα εύκολη· οι απαιτήσεις της καθημερινότητας, το στρες της ανατροφής και οι οικογενειακές δυναμικές συχνά μας απομακρύνουν από ό,τι πραγματικά μετράει: να είμαστε παρόντες στη δική μας ζωή.',
	'home.intro.quoteGoal':
		'**Αν θέλεις να βάλεις έναν προσωπικό στόχο, βάλε να είσαι πιο καλός/ή με τον εαυτό σου.**',
	'home.intro.cta': 'Γνώρισέ με καλύτερα',
	'home.intro.imageAlt': 'Η Μαρία Δημητροπούλου Λόπεζ χαμογελά με σταυρωμένα τα χέρια, φορώντας ριγέ πουκάμισο.',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'sessions.heading':
		'Συνεδρίες ψυχολογικής υποστήριξης για παιδιά, ενήλικες και οικογένειες',
	'sessions.cta': 'Όλες οι συνεδρίες μου',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'home.services.heading': 'Ένας χώρος για να φροντίσετε τον εαυτό σας και να μάθετε',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'courses.heading':
		'Εκπαιδευτικά προγράμματα για γονείς και επαγγελματίες',
	'courses.cta': 'Όλα τα προγράμματά μου',
	'cta.heading': 'Να κάνουμε μαζί το πρώτο βήμα;',
	'cta.text':
		'Πείτε μου τι χρειάζεστε εσείς ή η οικογένειά σας. Θα σας απαντήσω προσωπικά για να βρούμε μαζί τη συνοδεία, τη θεραπεία ή το πρόγραμμα που σας ταιριάζει.',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'testimonials.heading': 'Εμπειρίες που μοιράστηκαν μαζί μου',
	'cta.button': 'Γράψτε μου',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'cta.sessions.heading': 'Ένας χώρος για να σταματήσετε, να αναπνεύσετε και να φροντίσετε τον εαυτό σας',
	'cta.sessions.text':
		'Αν νιώθετε ότι είναι η στιγμή να σταματήσετε και να κοιτάξετε τον εαυτό σας με περισσότερη συμπόνια, γράψτε μου. Θα σας συνοδεύσω στον δικό σας ρυθμό και χωρίς κρίσεις, είτε για εσάς, είτε για τα παιδιά σας, είτε για ολόκληρη την οικογένεια.',
	'cta.courses.heading': 'Να μάθουμε για να συνοδεύουμε καλύτερα',
	'cta.courses.text':
		'Είτε συνοδεύετε την ανατροφή των παιδιών σας είτε εργάζεστε με παιδιά, πείτε μου τι χρειάζεστε και θα σας βοηθήσω να βρείτε το πρόγραμμα που σας ταιριάζει, για εσάς, το εκπαιδευτικό σας κέντρο ή την ομάδα σας.',

	// TODO: revisar traducción — texto fuente en español (es), traducido sin
	// revisión de María. «psicopedagoga» se ha vertido como «ψυχοπαιδαγωγός».
	'about.seo.title': 'Σχετικά με εμένα — Μαρία Δημητροπούλου Λόπεζ',
	'about.seo.description':
		'Ψυχολόγος, ψυχοπαιδαγωγός και Διδάκτωρ Γνωστικής Ψυχολογίας. Η πορεία και η προσέγγισή μου για παιδιά, οικογένειες και επαγγελματίες.',
	'about.title': 'Σχετικά με εμένα',
	'about.photoAlt': 'Πορτρέτο της Μαρίας Δημητροπούλου Λόπεζ',
	'about.cta': 'Επικοινωνήστε μαζί μου',
	'about.linkedinCta': 'Δείτε το πλήρες βιογραφικό μου εδώ',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'about.collaborationCta': 'Εκπροσωπείτε έναν φορέα ή ένα έργο; Γράψτε μου για να εξετάσουμε μια συνεργασία.',

	// Página temporal del blog hasta que haya publicaciones.
	'blog.seo.title': 'Νέα — Μαρία Δημητροπούλου Λόπεζ',
	'blog.seo.description': 'Τα νέα και τα άρθρα θα είναι διαθέσιμα σύντομα.',
	'blog.comingSoon': 'Σύντομα',
	'newsletter.title': 'Εγγραφείτε στο newsletter μου',
	'newsletter.name': 'Όνομα',
	'newsletter.email': 'Email',
	'newsletter.submit': 'Εγγραφή',
	'newsletter.consent': 'Θέλω να λαμβάνω το newsletter μέσω email και έχω διαβάσει την',
	'legal.updated': 'Τελευταία ενημέρωση',

	'contact.seo.title': 'Επικοινωνία — Μαρία Δημητροπούλου Λόπεζ',
	'contact.seo.description':
		'Κλείστε το ραντεβού σας ή ρωτήστε για τα σεμινάρια και τις υπηρεσίες της Μαρίας Δημητροπούλου Λόπεζ. Χαλάνδρι και online.',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'contact.title': 'Είμαι εδώ',
	'contact.intro': 'Γράψτε μου με τα δικά σας λόγια, χωρίς βιασύνη και χωρίς να χρειάζεται να τα έχετε όλα ξεκάθαρα. Διαβάζω κάθε μήνυμα και σας απαντώ προσωπικά, για να δούμε μαζί πώς μπορώ να σας συνοδεύσω, online ή στο γραφείο μου.',
	'contact.form.name': 'Όνομα',
	'contact.form.lastName': 'Επώνυμο',
	'contact.form.email': 'Email',
	'contact.form.message': 'Πείτε μου τι χρειάζεστε',
	'contact.form.required': 'Αυτό το πεδίο είναι υποχρεωτικό.',
	'contact.form.invalidEmail': 'Εισαγάγετε ένα έγκυρο email.',
	'contact.form.privacyBefore': 'Έχω διαβάσει και αποδέχομαι την',
	'contact.form.privacyLink': 'πολιτική απορρήτου',
	'contact.form.privacyRequired': 'Πρέπει να αποδεχτείτε την πολιτική απορρήτου.',
	'contact.form.submit': 'Αποστολή μηνύματος',
	'contact.form.sending': 'Αποστολή…',
	'contact.form.success': 'Ευχαριστώ που μου γράψατε. Έλαβα το μήνυμά σας και θα σας απαντήσω προσωπικά μόλις μπορέσω.',
	'contact.form.error': 'Το μήνυμα δεν στάλθηκε. Δοκιμάστε ξανά ή γράψτε μου στο email.',

	'sessions.seo.title': 'Συνεδρίες — Μαρία Δημητροπούλου Λόπεζ',
	'sessions.seo.description':
		'Ψυχοθεραπευτική υποστήριξη, γονεϊκή και οικογενειακή θεραπεία και μετάβαση στη μητρότητα για παιδιά, ενήλικες και οικογένειες.',
	'courses.seo.title': 'Προγράμματα — Μαρία Δημητροπούλου Λόπεζ',
	'courses.seo.description':
		'Εκπαιδευτικά προγράμματα Teacher Talk, ABC and Beyond (Hanen) και Mindful Parenting για γονείς και επαγγελματίες της παιδικής ηλικίας.',


	'person.jobTitle': 'Ψυχολόγος',

	'footer.contactHeading': 'Επικοινωνία',
	'footer.followHeading': 'Ακολουθήστε',
	'footer.legalHeading': 'Νομικά',
	'footer.legalNotice': 'Νομικό σημείωμα',
	'footer.privacy': 'Απόρρητο',
	'footer.cookies': 'Cookies',
	'footer.address': 'Λέσβου 8, Χαλάνδρι, 152 31 Αθήνα, Ελλάδα',
	'footer.phoneLabel': 'Τηλ.',
	'footer.rights': 'Με επιφύλαξη κάθε δικαιώματος.',
} as const;

export type UIKey = keyof typeof el;

const es: Record<UIKey, string> = {
	'a11y.skipToContent': 'Ir al contenido',
	'nav.ariaLabel': 'Navegación principal',
	'nav.home': 'Inicio',
	'nav.sessions': 'Sesiones',
	'nav.courses': 'Cursos',
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
		'Apoyo psicoterapéutico, terapia parental y familiar, matrescencia, Mindful Parenting y formación para profesionales. Chalandri, Atenas y online.',
	'home.hero.title': 'María Dimitropoulou López',
	'home.hero.subtitle':
		'Apoyo psicológico para liberar el estrés de toda la familia y encontrar la fluidez y la paz interior en el día a día.',
	'home.hero.cta': 'Contáctame',
	'home.intro.text':
		'Soy María psicóloga y psicopedagoga especialista en **Mindfulness** y **Parentalidad Consciente**.',
	'home.intro.quote':
		'El verdadero cambio comienza cuando miramos hacia adentro con compasión. Encontrar el equilibrio no siempre es fácil; las exigencias del día a día, el estrés de la crianza y las dinámicas familiares a menudo nos alejan de lo que verdaderamente importa: estar presentes en nuestra propia vida.',
	'home.intro.quoteGoal':
		'**Si vas a proponerte un objetivo personal, proponte ser más buen@ contigo mism@**',
	'home.intro.cta': 'Conóceme mejor',
	'home.intro.imageAlt': 'María Dimitropoulou López sonríe con los brazos cruzados, vestida con una camisa de rayas.',
	'sessions.heading':
		'Sesiones de apoyo psicológico para niños, adultos y familias',
	'sessions.cta': 'Todas mis sesiones',
	'home.services.heading': 'Un espacio para cuidarte y aprender',
	'courses.heading':
		'Cursos de formación para padres y profesionales',
	'courses.cta': 'Todos mis cursos',
	'cta.heading': '¿Damos juntos el primer paso?',
	'cta.text':
		'Cuéntame qué necesitas tú o tu familia. Te responderé personalmente para encontrar juntos el acompañamiento, la terapia o el curso que mejor encaje contigo.',
	'testimonials.heading': 'Experiencias compartidas',
	'cta.button': 'Escríbeme',
	'cta.sessions.heading': 'Un espacio para parar, respirar y cuidarte',
	'cta.sessions.text':
		'Si sientes que es el momento de parar y mirarte con más compasión, escríbeme. Te acompaño a tu ritmo y sin juicios, ya sea para ti, para tus hijos o para toda la familia.',
	'cta.courses.heading': 'Aprender para acompañar mejor',
	'cta.courses.text':
		'Tanto si acompañas la crianza de tus hijos como si trabajas con la infancia, cuéntame qué necesitas y te ayudaré a encontrar el curso que mejor encaje contigo, para ti, tu centro educativo o tu equipo.',

	// Texto de María (erratas corregidas). «l@s niñ@s» se mantiene tal cual.
	'about.seo.title': 'Sobre mí — María Dimitropoulou López',
	'about.seo.description':
		'Psicóloga, psicopedagoga y doctora en Psicología Cognitiva. Mi trayectoria y mi enfoque con niñ@s, familias y profesionales.',
	'about.title': 'Sobre mí',
	'about.photoAlt': 'Retrato de María Dimitropoulou López',
	'about.cta': 'Ponte en contacto',
	'about.linkedinCta': 'Accede a mi currículum completo aquí',
	'about.collaborationCta': '¿Representas una institución o un proyecto? Escríbeme para explorar una colaboración.',

	// Página temporal del blog hasta que haya publicaciones.
	'blog.seo.title': 'Blog — María Dimitropoulou López',
	'blog.seo.description': 'Los artículos del blog estarán disponibles próximamente.',
	'blog.comingSoon': 'Próximamente',
	'newsletter.title': 'Suscríbete a mi newsletter',
	'newsletter.name': 'Nombre',
	'newsletter.email': 'Correo electrónico',
	'newsletter.submit': 'Regístrate',
	'newsletter.consent': 'Quiero recibir la newsletter por email y he leído la',
	'legal.updated': 'Última actualización',

	'contact.seo.title': 'Contacto — María Dimitropoulou López',
	'contact.seo.description':
		'Realiza tu consulta o pide información sobre los cursos y servicios de María Dimitropoulou López. Chalandri (Atenas) y online.',
	'contact.title': 'Estoy aquí',
	'contact.intro': 'Escríbeme con tus propias palabras, sin prisa y sin necesidad de tenerlo todo claro. Leo cada mensaje y te respondo personalmente para ver juntos cómo puedo acompañarte, online o en mi consulta.',
	'contact.form.name': 'Nombre',
	'contact.form.lastName': 'Apellidos',
	'contact.form.email': 'Email',
	'contact.form.message': 'Cuéntame qué necesitas',
	'contact.form.required': 'Este campo es obligatorio.',
	'contact.form.invalidEmail': 'Introduce un email válido.',
	'contact.form.privacyBefore': 'He leído y acepto la',
	'contact.form.privacyLink': ' política de privacidad',
	'contact.form.privacyRequired': 'Debes aceptar la política de privacidad.',
	'contact.form.submit': 'Enviar mensaje',
	'contact.form.sending': 'Enviando…',
	'contact.form.success': 'Gracias por escribirme. He recibido tu mensaje y te responderé personalmente en cuanto pueda.',
	'contact.form.error': 'No se ha podido enviar el mensaje. Inténtalo de nuevo o escríbeme por email.',

	'sessions.seo.title': 'Sesiones — María Dimitropoulou López',
	'sessions.seo.description':
		'Apoyo psicoterapéutico, terapia parental y familiar y matrescencia para niños, adultos y familias.',
	'courses.seo.title': 'Cursos — María Dimitropoulou López',
	'courses.seo.description':
		'Cursos Teacher Talk, ABC and Beyond (Hanen) y Mindful Parenting para padres y profesionales de primera infancia.',


	'person.jobTitle': 'Psicóloga',

	'footer.contactHeading': 'Contacto',
	'footer.followHeading': 'Sígueme',
	'footer.legalHeading': 'Legal',
	'footer.legalNotice': 'Aviso legal',
	'footer.privacy': 'Privacidad',
	'footer.cookies': 'Cookies',
	'footer.address': 'Lesvou 8, Chalandri, 152 31 Atenas, Grecia',
	'footer.phoneLabel': 'Tel.',
	'footer.rights': 'Todos los derechos reservados.',
};

const en: Record<UIKey, string> = {
	'a11y.skipToContent': 'Skip to content',
	'nav.ariaLabel': 'Main navigation',
	'nav.home': 'Home',
	'nav.sessions': 'Sessions',
	'nav.courses': 'Courses',
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
		'Psychotherapeutic support, parental and family therapy, matrescence, Mindful Parenting and professional training. Chalandri, Athens and online.',
	'home.hero.title': 'María Dimitropoulou López',
	'home.hero.subtitle':
		'Psychological support to release stress for the whole family and find flow and inner peace in everyday life.',
	'home.hero.cta': 'Contact me',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'home.intro.text':
		"I'm María, a psychologist and psychopedagogue specialising in **Mindfulness** and **Mindful Parenting**.",
	'home.intro.quote':
		"Real change begins when we look inward with compassion. Finding balance isn't always easy; the demands of everyday life, the stress of parenting and family dynamics often pull us away from what truly matters: being present in our own lives.",
	'home.intro.quoteGoal':
		"**If you're going to set yourself a personal goal, let it be to be kinder to yourself.**",
	'home.intro.cta': 'Get to know me',
	'home.intro.imageAlt': 'María Dimitropoulou López smiling with her arms crossed, wearing a striped shirt.',
	'sessions.heading':
		'Psychological support sessions for children, adults and families',
	'sessions.cta': 'All my sessions',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'home.services.heading': 'A space to care for yourself and to learn',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'courses.heading':
		'Training courses for parents and professionals',
	'courses.cta': 'All my courses',
	'cta.heading': 'Shall we take the first step together?',
	'cta.text':
		"Tell me what you or your family need. I'll reply personally so we can find the support, therapy or course that suits you best.",
	// TODO: revisar traducción (borrador a partir del texto en español).
	'testimonials.heading': 'Shared experiences',
	'cta.button': 'Write to me',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'cta.sessions.heading': 'A space to pause, breathe and take care of yourself',
	'cta.sessions.text':
		"If you feel it's time to pause and look at yourself with more compassion, write to me. I'll walk alongside you at your own pace and without judgment, whether for you, for your children or for the whole family.",
	'cta.courses.heading': 'Learning to support better',
	'cta.courses.text':
		"Whether you support your own children's upbringing or work with children, tell me what you need and I'll help you find the course that suits you best, for you, your educational centre or your team.",

	// TODO: revisar traducción — texto fuente en español (es), traducido sin
	// revisión de María. «psicopedagoga» se ha vertido como «educational
	// psychologist»; confirmar el título equivalente.
	'about.seo.title': 'About me — María Dimitropoulou López',
	'about.seo.description':
		'Psychologist, educational psychologist and PhD in Cognitive Psychology. My background and my approach with children, families and professionals.',
	'about.title': 'About me',
	'about.photoAlt': 'Portrait of María Dimitropoulou López',
	'about.cta': 'Get in touch',
	'about.linkedinCta': 'See my full CV here',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'about.collaborationCta': 'Do you represent an organisation or a project? Write to me to explore a collaboration.',

	// Página temporal del blog hasta que haya publicaciones.
	'blog.seo.title': 'Blog — María Dimitropoulou López',
	'blog.seo.description': 'Blog articles will be available soon.',
	'blog.comingSoon': 'Coming soon',
	'newsletter.title': 'Subscribe to my newsletter',
	'newsletter.name': 'Name',
	'newsletter.email': 'Email',
	'newsletter.submit': 'Sign up',
	'newsletter.consent': 'I want to receive the newsletter by email and have read the',
	'legal.updated': 'Last updated',

	'contact.seo.title': 'Contact — María Dimitropoulou López',
	'contact.seo.description':
		'Book a consultation or ask about the courses and services of María Dimitropoulou López. Chalandri (Athens) and online.',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'contact.title': "I'm here",
	'contact.intro': 'Write to me in your own words, with no rush and no need to have everything figured out. I read every message and reply personally, so we can see together how I can support you, online or at my practice.',
	'contact.form.name': 'First name',
	'contact.form.lastName': 'Last name',
	'contact.form.email': 'Email',
	'contact.form.message': 'Tell me what you need',
	'contact.form.required': 'This field is required.',
	'contact.form.invalidEmail': 'Please enter a valid email.',
	'contact.form.privacyBefore': 'I have read and accept the',
	'contact.form.privacyLink': ' privacy policy',
	'contact.form.privacyRequired': 'You must accept the privacy policy.',
	'contact.form.submit': 'Send message',
	'contact.form.sending': 'Sending…',
	'contact.form.success': 'Thank you for writing to me. I have received your message and will reply personally as soon as I can.',
	'contact.form.error': 'Your message could not be sent. Please try again or email me.',

	'sessions.seo.title': 'Sessions — María Dimitropoulou López',
	'sessions.seo.description':
		'Psychotherapeutic support, parental and family therapy and matrescence for children, adults and families.',
	'courses.seo.title': 'Courses — María Dimitropoulou López',
	'courses.seo.description':
		'Teacher Talk, ABC and Beyond (Hanen) and Mindful Parenting courses for parents and early childhood professionals.',


	'person.jobTitle': 'Psychologist',

	'footer.contactHeading': 'Contact',
	'footer.followHeading': 'Follow',
	'footer.legalHeading': 'Legal',
	'footer.legalNotice': 'Legal notice',
	'footer.privacy': 'Privacy',
	'footer.cookies': 'Cookies',
	'footer.address': 'Lesvou 8, Chalandri, 152 31 Athens, Greece',
	'footer.phoneLabel': 'Tel.',
	'footer.rights': 'All rights reserved.',
};

export const ui = { el, es, en };
