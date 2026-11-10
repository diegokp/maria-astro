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
	'nav.about': 'Μαρία',
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
		'Μαρία Δημητροπούλου Λόπεζ, ψυχολόγος και ψυχοπαιδαγωγός: διαχείριση του άγχους με Ενσυνειδητότητα και Ενσυνείδητη Γονεϊκότητα. Online και στο Χαλάνδρι.',
	'home.hero.title': 'Μαρία Δημητροπούλου Λόπεζ',
	'home.hero.subtitle':
		'Ψυχολογική υποστήριξη για την διαχείριση του άγχους και την εύρεση ροής και εσωτερικής γαλήνης στην καθημερινότητα όλης της οικογένειας.',
	'home.hero.cta': 'Επικοινωνήστε μαζί μου',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'home.intro.text':
		'Είμαι η Μαρία, ψυχολόγος και ψυχοπαιδαγωγός, ειδικευμένη στην διαχείριση του άγχους μέσω των εφαρμογών της **Ενσυνειδητότητας (Mindfulness)** και στη **Ενσυνείδητη Γονεϊκότητα (Mindful Parenting)**.',
	'home.intro.quote':
		'Η πραγματική αλλαγή ξεκινά όταν κοιτάμε προς τα μέσα με συμπόνια. Η εύρεση ισορροπίας δεν είναι πάντα εύκολη· οι απαιτήσεις της καθημερινότητας, το στρες της ανατροφής και οι οικογενειακές δυναμικές συχνά μας απομακρύνουν από ό,τι πραγματικά μετράει: να είμαστε παρόντες στη δική μας ζωή.',
	'home.intro.quoteGoal':
		'**Αν θέλεις να θέσεις έναν προσωπικό στόχο, στόχευσε στο να είσαι πιο καλός/ή με τον εαυτό σου.**',
	'home.intro.cta': 'Γνώρισέ με καλύτερα',
	'home.ogDescription':
		'Είμαι η Μαρία, ψυχολόγος και ψυχοπαιδαγωγός, ειδικευμένη στην διαχείριση του άγχους και στη συμβουλευτική γονέων.',
	'home.intro.imageAlt': 'Η Μαρία Δημητροπούλου Λόπεζ χαμογελά με σταυρωμένα τα χέρια, φορώντας ριγέ πουκάμισο.',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'sessions.heading':
		'Συνεδρίες ψυχολογικής υποστήριξης για παιδιά, εφήβους, ενήλικες και οικογένειες',
	'sessions.cta': 'Όλες οι συνεδρίες μου',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'home.services.heading': 'Τι θα βρεις εδώ;',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'courses.heading':
		'Εκπαιδευτικά προγράμματα για γονείς και επαγγελματίες',
	'courses.cta': 'Όλα τα προγράμματά μου',
	'cta.heading': 'Κάνουμε μαζί το πρώτο βήμα;',
	'cta.text':
		'Πες μου τι χρειάζεσαι εσύ ή η οικογένειά σου και μαζί θα βρούμε τη συνεδρία, τη θεραπεία ή το πρόγραμμα που σας ταιριάζει.',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'testimonials.heading': 'Εμπειρίες που μοιράστηκαν μαζί μου',
	'cta.button': 'Γράψε μου',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'cta.sessions.heading': 'Ένας χώρος για να σταματήσεις, να αναπνεύσεις και να φροντίσεις τον εαυτό σου',
	'cta.sessions.text':
		'Αν νιώθεις ότι είναι η στιγμή να κοιτάξεις τον εαυτό σας με περισσότερη συμπόνια, ειλικρίνεια και αγάπη γράψε μου. Θα συνοδεύσω εσένα, το παιδί σου ή την οικογένειά σου στον ρυθμό σας, χωρίς κριτική.',
	'cta.courses.heading': 'Ας μάθουμε να υποστηρίζουμε τα παιδιά με βάση τις πραγματικές τους ανάγκες',
	'cta.courses.text':
		'Είτε μεγαλώνεις τα παιδιά σου είτε εργάζεσαι με παιδιά, επικοινώνησε μαζί μου για να βρούμε το πρόγραμμα που ταιριάζει σε εσένα, στην οικογένειά σου, στο εκπαιδευτικό σου κέντρο ή στην ομάδα σου.',

	// TODO: revisar traducción — texto fuente en español (es), traducido sin
	// revisión de María. «psicopedagoga» se ha vertido como «ψυχοπαιδαγωγός».
	'about.seo.title': 'Σχετικά με εμένα — Μαρία Δημητροπούλου Λόπεζ',
	'about.seo.description':
		'Μαρία Δημητροπούλου Λόπεζ, ψυχολόγος, ψυχοπαιδαγωγός και διδάκτωρ Γνωστικής Ψυχολογίας: η ερευνητική και διδακτική πορεία, η προσέγγιση και οι συνεργασίες.',
	'about.title': 'Μαρία',
	'about.photoAlt': 'Πορτρέτο της Μαρίας Δημητροπούλου Λόπεζ',
	'contact.photoAlt': 'Η Μαρία Δημητροπούλου Λόπεζ χαμογελά, με τζιν πουκάμισο, στο γραφείο της.',
	'about.cta': 'Επικοινωνήστε μαζί μου',
	'about.linkedinCta': 'Δες το πλήρες βιογραφικό μου εδώ',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'about.collaborationCta': 'Εκπροσωπείς έναν φορέα ή ένα έργο; Γράψε μου για να εξετάσουμε μια συνεργασία.',

	// Página temporal del blog hasta que haya publicaciones.
	'blog.seo.title': 'Νέα — Μαρία Δημητροπούλου Λόπεζ',
	'blog.seo.description':
		'Σύντομα το ιστολόγιο της ψυχολόγου Μαρίας Δημητροπούλου Λόπεζ, με άρθρα για την ενσυνείδητη γονεϊκότητα, το mindfulness, την παιδική ηλικία και την οικογένεια.',
	'blog.comingSoon': 'Σύντομα',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'notFound.seo.title': 'Η σελίδα δεν βρέθηκε — Μαρία Δημητροπούλου Λόπεζ',
	'notFound.seo.description': 'Η σελίδα που αναζητάς δεν υπάρχει ή άλλαξε διεύθυνση.',
	'notFound.title': 'Η σελίδα δεν βρέθηκε',
	'notFound.text': 'Ίσως άλλαξε διεύθυνση με τη νέα ιστοσελίδα. Από εδώ μπορείς να συνεχίσεις:',
	'newsletter.title': 'Εγγραφείτε στο newsletter μου',
	'newsletter.name': 'Όνομα',
	'newsletter.email': 'Email',
	'newsletter.submit': 'Εγγραφή',
	'newsletter.consent': 'Θέλω να λαμβάνω το newsletter μέσω email και έχω διαβάσει την',
	'legal.updated': 'Τελευταία ενημέρωση',

	'contact.seo.title': 'Επικοινωνία — Μαρία Δημητροπούλου Λόπεζ',
	'contact.seo.description':
		'Γράψε στη Μαρία Δημητροπούλου Λόπεζ για ραντεβού ή πληροφορίες για συνεδρίες και προγράμματα. Απαντά σε κάθε μήνυμα, online ή στο γραφείο της στο Χαλάνδρι.',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'contact.title': 'Είμαι εδώ',
	'contact.intro': 'Γράψε μου αυτό που σε απασχολεί, όπως το νιώθεις και ας μην είναι ξεκάθαρο. Διαβάζω κάθε μήνυμα και απαντώ, για να δούμε μαζί πώς μπορώ να σε υποστηρίξω, online ή στο γραφείο μου.',
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
		'Συνεδρίες ψυχολογικής υποστήριξης για παιδιά, εφήβους, ενήλικες και οικογένειες: ψυχοθεραπευτική υποστήριξη, γονεϊκή συμβουλευτική και μετάβαση στη μητρότητα.',
	'courses.seo.title': 'Προγράμματα — Μαρία Δημητροπούλου Λόπεζ',
	'courses.seo.description':
		'Εκπαιδευτικά προγράμματα για γονείς και επαγγελματίες: διεθνείς πιστοποιήσεις Hanen Teacher Talk® και ABC and Beyond™ και σχολή γονέων Mindful Parenting.',


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
	'nav.about': 'María',
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
		'María Dimitropoulou López, psicóloga y psicopedagoga experta en Mindfulness y Parentalidad Consciente. Sesiones y cursos online y en Chalandri, Atenas.',
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
	'home.ogDescription':
		'Soy María psicóloga y psicopedagoga especialista en Mindfulness y Parentalidad Consciente.',
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
		'María Dimitropoulou López, psicóloga, psicopedagoga y doctora en Psicología Cognitiva: trayectoria investigadora y docente, su enfoque y colaboraciones.',
	'about.title': 'María',
	'about.photoAlt': 'Retrato de María Dimitropoulou López',
	'contact.photoAlt': 'María Dimitropoulou López sonríe, con camisa vaquera, en su consulta.',
	'about.cta': 'Ponte en contacto',
	'about.linkedinCta': 'Accede a mi currículum completo aquí',
	'about.collaborationCta': '¿Representas una institución o un proyecto? Escríbeme para explorar una colaboración.',

	// Página temporal del blog hasta que haya publicaciones.
	'blog.seo.title':
		'Blog — María Dimitropoulou López, psicóloga',
	'blog.seo.description':
		'Próximamente, el blog de María Dimitropoulou López, psicóloga: artículos sobre crianza consciente, mindfulness, infancia y bienestar emocional de la familia.',
	'blog.comingSoon': 'Próximamente',
	'notFound.seo.title': 'Página no encontrada — María Dimitropoulou López',
	'notFound.seo.description': 'La página que buscas no existe o ha cambiado de dirección.',
	'notFound.title': 'Página no encontrada',
	'notFound.text': 'Puede que haya cambiado de dirección con la nueva web. Desde aquí puedes seguir:',
	'newsletter.title': 'Suscríbete a mi newsletter',
	'newsletter.name': 'Nombre',
	'newsletter.email': 'Correo electrónico',
	'newsletter.submit': 'Regístrate',
	'newsletter.consent': 'Quiero recibir la newsletter por email y he leído la',
	'legal.updated': 'Última actualización',

	'contact.seo.title': 'Contacto — María Dimitropoulou López',
	'contact.seo.description':
		'Escribe a María Dimitropoulou López para pedir cita o información sobre sesiones y cursos. Responde a cada mensaje, online o en su consulta de Chalandri.',
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
		'Sesiones de apoyo psicológico para niños, adolescentes, adultos y familias: psicoterapia, terapia parental/familiar y matrescencia, online y en Atenas.',
	'courses.seo.title': 'Cursos — María Dimitropoulou López',
	'courses.seo.description':
		'Cursos de formación para padres y profesionales de la infancia: certificaciones Hanen Teacher Talk® y ABC and Beyond™ y escuela de padres Mindful Parenting.',


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
	'nav.about': 'María',
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
		'María Dimitropoulou López, psychologist and psychopedagogue specialising in Mindfulness and Mindful Parenting. Sessions and courses online and in Chalandri.',
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
	'home.ogDescription':
		"I'm María, a psychologist and psychopedagogue specialising in Mindfulness and Mindful Parenting.",
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
		'María Dimitropoulou López, psychologist, psychopedagogue and PhD in Cognitive Psychology: her research and teaching career, approach and collaborations.',
	'about.title': 'María',
	'about.photoAlt': 'Portrait of María Dimitropoulou López',
	'contact.photoAlt': 'María Dimitropoulou López smiling, wearing a denim shirt, in her practice.',
	'about.cta': 'Get in touch',
	'about.linkedinCta': 'See my full CV here',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'about.collaborationCta': 'Do you represent an organisation or a project? Write to me to explore a collaboration.',

	// Página temporal del blog hasta que haya publicaciones.
	'blog.seo.title':
		'Blog — María Dimitropoulou López, psychologist',
	'blog.seo.description':
		'Coming soon: the blog of María Dimitropoulou López, psychologist, with articles on mindful parenting, mindfulness, childhood and family emotional wellbeing.',
	'blog.comingSoon': 'Coming soon',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'notFound.seo.title': 'Page not found — María Dimitropoulou López',
	'notFound.seo.description': 'The page you are looking for does not exist or has moved.',
	'notFound.title': 'Page not found',
	'notFound.text': 'It may have moved with the new website. You can continue from here:',
	'newsletter.title': 'Subscribe to my newsletter',
	'newsletter.name': 'Name',
	'newsletter.email': 'Email',
	'newsletter.submit': 'Sign up',
	'newsletter.consent': 'I want to receive the newsletter by email and have read the',
	'legal.updated': 'Last updated',

	'contact.seo.title': 'Contact — María Dimitropoulou López',
	'contact.seo.description':
		'Write to María Dimitropoulou López to book a session or ask about her courses. She replies to every message, online or at her practice in Chalandri, Athens.',
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
		'Psychological support sessions for children, adolescents, adults and families: psychotherapy, parental and family therapy and matrescence, online and in Athens.',
	'courses.seo.title': 'Courses — María Dimitropoulou López',
	'courses.seo.description':
		'Training courses for parents and childhood professionals: Hanen Teacher Talk® and ABC and Beyond™ certifications and the Mindful Parenting school for parents.',


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
