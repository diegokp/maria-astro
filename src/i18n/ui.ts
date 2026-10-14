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
	'home.hero.cta': 'Κλείστε ραντεβού',
	'home.intro.text':
		'Είμαι η Μαρία Δημητροπούλου Λόπεζ, ψυχολόγος και διδάκτωρ Γνωστικής Νευροεπιστήμης. Προσφέρω εξειδικευμένη ψυχολογική υποστήριξη και εργαλεία Mindfulness και γονεϊκότητας με σεβασμό, για να σας καθοδηγήσω στον δρόμο της αυτοσυμπόνιας, της συνειδητής γονεϊκότητας και της κοινής γονεϊκής ευθύνης. Έναν συμπονετικό χώρο, απαλλαγμένο από κρίσεις, για να μειώσετε τη νοητική σας επιβάρυνση, να φροντίσετε τη συναισθηματική σας ευεξία και να μεγαλώσετε τα παιδιά σας μέσα από την παρουσία και τον αμοιβαίο σεβασμό.',
	'home.intro.imageAlt': 'Η Μαρία Δημητροπούλου Λόπεζ χαμογελά με σταυρωμένα τα χέρια, φορώντας ριγέ πουκάμισο.',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'sessions.heading':
		'Συνεδρίες ψυχολογικής υποστήριξης για παιδιά, ενήλικες και οικογένειες',
	'sessions.cta': 'Όλες οι συνεδρίες μου',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'courses.heading':
		'Εκπαιδευτικά προγράμματα για γονείς και επαγγελματίες',
	'courses.cta': 'Όλα τα προγράμματά μου',
	'cta.heading': 'Να κάνουμε μαζί το πρώτο βήμα;',
	'cta.text':
		'Πείτε μου τι χρειάζεστε εσείς ή η οικογένειά σας. Θα σας απαντήσω προσωπικά για να βρούμε μαζί τη συνοδεία, τη θεραπεία ή το σεμινάριο που σας ταιριάζει, online ή στο Χαλάνδρι.',
	'cta.button': 'Γράψτε μου',

	// TODO: revisar traducción — texto fuente en español (es), traducido sin
	// revisión de María. «psicopedagoga» se ha vertido como «ψυχοπαιδαγωγός».
	'about.seo.title': 'Σχετικά με εμένα — Μαρία Δημητροπούλου Λόπεζ',
	'about.seo.description':
		'Ψυχολόγος, ψυχοπαιδαγωγός και Διδάκτωρ Γνωστικής Ψυχολογίας. Η πορεία και η προσέγγισή μου για παιδιά, οικογένειες και επαγγελματίες.',
	'about.title': 'Σχετικά με εμένα',
	'about.photoAlt': 'Πορτρέτο της Μαρίας Δημητροπούλου Λόπεζ',
	'about.p1':
		'Είμαι ψυχολόγος, ψυχοπαιδαγωγός και Διδάκτωρ Γνωστικής Ψυχολογίας. Με κινητοποίησε μια έντονη κλήση να στηρίξω τα παιδιά στον δρόμο τους προς την ανακάλυψη και την αποδοχή της αληθινής τους φύσης και, μέσα από την παρατήρηση των δικών μου δυσκολιών ως γυναίκα στους διάφορους ρόλους μου, ξεκίνησα να μελετώ την ανάπτυξη των γνωστικών διεργασιών, τη σύνδεση νου–καρδιάς, τον γονεϊκό ρόλο και τη δυναμική της οικογένειας.',
	'about.p2':
		'Έχω ερευνήσει σε βάθος τις γνωστικές διεργασίες σε πανεπιστήμια και ερευνητικά κέντρα της Ελλάδας, της Αγγλίας, των Ηνωμένων Πολιτειών και της Ισπανίας, έχω ολοκληρώσει δύο μεταπτυχιακά προγράμματα και έχω δημοσιεύσει και παρουσιάσει διεθνώς τα επιστημονικά μου ευρήματα. Από την αρχή των σπουδών μου εργάστηκα με παιδιά και οικογένειες σε διαφορετικά θεραπευτικά και εκπαιδευτικά πλαίσια, αποκτώντας εμπειρία σε διάφορες ψυχοεκπαιδευτικές πρακτικές.',
	'about.p3':
		'Η διαδρομή αυτή με οδήγησε να αναπτύξω μια μοναδική προσέγγιση στον τρόπο που στηρίζω τους ανθρώπους, από την παιδική ηλικία έως την εφηβεία και την ενήλικη ζωή. Η προσέγγιση αυτή συνδυάζει αρχές από διαφορετικούς κλάδους και τεχνικές, όπως το Mindfulness/Πλήρης Επίγνωση, η Συνειδητή Γονεϊκότητα, η Μη Κατευθυντική Παιγνιοθεραπεία με Επίκεντρο το Παιδί και η Πρώιμη Παρέμβαση με Επίκεντρο την Οικογένεια και τις Καθημερινές Ρουτίνες.',
	'about.p4':
		'Σήμερα προσφέρω υπηρεσίες ψυχολογικής υποστήριξης, σεμινάρια και ομιλίες, και διδάσκω σε διάφορα προπτυχιακά και μεταπτυχιακά προγράμματα σπουδών σε πανεπιστήμια της Ελλάδας, της Ισπανίας και της Κύπρου. Προσφέρω επίσης εκπαιδευτικά προγράμματα για γονείς και επαγγελματίες της πρώιμης παιδικής ηλικίας σε όλο τον κόσμο.',
	'about.cta': 'Επικοινωνήστε μαζί μου',

	// Página temporal del blog hasta que haya publicaciones.
	'blog.seo.title': 'Νέα — Μαρία Δημητροπούλου Λόπεζ',
	'blog.seo.description': 'Τα νέα και τα άρθρα θα είναι διαθέσιμα σύντομα.',
	'blog.comingSoon': 'Σύντομα',
	'newsletter.title': 'Εγγραφείτε στο newsletter',
	'newsletter.name': 'Όνομα',
	'newsletter.email': 'Email',
	'newsletter.submit': 'Εγγραφή',
	'newsletter.consent': 'Θέλω να λαμβάνω το newsletter μέσω email και έχω διαβάσει την',
	'legal.updated': 'Τελευταία ενημέρωση',

	'contact.seo.title': 'Επικοινωνία — Μαρία Δημητροπούλου Λόπεζ',
	'contact.seo.description':
		'Κλείστε το ραντεβού σας ή ρωτήστε για τα σεμινάρια και τις υπηρεσίες της Μαρίας Δημητροπούλου Λόπεζ. Χαλάνδρι και online.',
	'contact.title': 'Κλείστε το ραντεβού σας με τη Μαρία',
	'contact.intro':
		'Χρειάζεστε πληροφορίες; Μπορώ να σας βοηθήσω και να λύσω τις απορίες σας για τα σεμινάρια ή τις υπηρεσίες μου.',
	'contact.form.name': 'Όνομα',
	'contact.form.lastName': 'Επώνυμο',
	'contact.form.email': 'Email',
	'contact.form.message': 'Μήνυμα',
	'contact.form.required': 'Αυτό το πεδίο είναι υποχρεωτικό.',
	'contact.form.invalidEmail': 'Εισαγάγετε ένα έγκυρο email.',
	'contact.form.privacyBefore': 'Έχω διαβάσει και αποδέχομαι την',
	'contact.form.privacyLink': 'πολιτική απορρήτου',
	'contact.form.privacyRequired': 'Πρέπει να αποδεχτείτε την πολιτική απορρήτου.',
	'contact.form.submit': 'Αποστολή μηνύματος',
	'contact.form.sending': 'Αποστολή…',
	'contact.form.success': 'Ευχαριστώ! Το μήνυμά σας στάλθηκε. Θα σας απαντήσω σύντομα.',
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
	'home.hero.cta': 'Pide cita',
	'home.intro.text':
		'Soy María Dimitropoulou López, psicóloga y doctora en neurociencia de la cognición. Ofrezco apoyo psicológico especializado y herramientas de Mindfulness y parentalidad respetuosa para guiaros en el camino de la autocompasión, la parentalidad consciente y la corresponsabilidad parental. Un espacio compasivo y libre de juicios para reducir la carga mental, sanar tu bienestar emocional y educar a tus hijos desde la presencia y el respeto mutuo.',
	'home.intro.imageAlt': 'María Dimitropoulou López sonríe con los brazos cruzados, vestida con una camisa de rayas.',
	'sessions.heading':
		'Sesiones de apoyo psicológico para niños, adultos y familias',
	'sessions.cta': 'Todas mis sesiones',
	'courses.heading':
		'Cursos de formación para padres y profesionales',
	'courses.cta': 'Todos mis cursos',
	'cta.heading': '¿Damos juntos el primer paso?',
	'cta.text':
		'Cuéntame qué necesitas tú o tu familia. Te responderé personalmente para encontrar juntos el acompañamiento, la terapia o el curso que mejor encaje contigo, online o en Chalandri.',
	'cta.button': 'Escríbeme',

	// Texto de María (erratas corregidas). «l@s niñ@s» se mantiene tal cual.
	'about.seo.title': 'Sobre mí — María Dimitropoulou López',
	'about.seo.description':
		'Psicóloga, psicopedagoga y doctora en Psicología Cognitiva. Mi trayectoria y mi enfoque con niñ@s, familias y profesionales.',
	'about.title': 'Sobre mí',
	'about.photoAlt': 'Retrato de María Dimitropoulou López',
	'about.p1':
		'Soy psicóloga, psicopedagoga y Doctora en Psicología Cognitiva. Motivada por una intensa llamada a apoyar a l@s niñ@s en su camino hacia el descubrimiento y la aceptación de su verdadera naturaleza, y a través de la observación de mis propias dificultades como mujer en mis diferentes facetas, comencé a estudiar el desarrollo de los procesos cognitivos, la conexión mente-corazón, el rol parental y las dinámicas familiares.',
	'about.p2':
		'He investigado a fondo los procesos cognitivos en universidades y en centros de investigación de Grecia, Inglaterra, Estados Unidos y España, he completado dos Másteres universitarios y publicado y comunicado internacionalmente mis hallazgos científicos. Desde el comienzo de mis estudios trabajé con niñ@s y familias en diferentes contextos terapéuticos y educativos, adquiriendo experiencia en diferentes prácticas psicoeducativas.',
	'about.p3':
		'Este proceso me llevó a desarrollar un enfoque único en la forma en la que presto apoyo a las personas, desde la infancia, a la adolescencia, a la edad adulta. Este enfoque combina los principios de diferentes disciplinas y técnicas, como el Mindfulness/Conciencia Plena, la Parentalidad Consciente, la Terapia de Juego No Dirigida y Centrada en el Niño y la Atención Temprana Centrada en la Familia y en las Rutinas.',
	'about.p4':
		'Actualmente, ofrezco servicios de apoyo psicológico, cursos, charlas y doy clases en diferentes programas de estudios de grado y postgrado en Universidades de Grecia, España y Chipre, y ofrezco cursos de formación para padres y profesionales de primera infancia en todo el mundo.',
	'about.cta': 'Ponte en contacto',

	// Página temporal del blog hasta que haya publicaciones.
	'blog.seo.title': 'Blog — María Dimitropoulou López',
	'blog.seo.description': 'Los artículos del blog estarán disponibles próximamente.',
	'blog.comingSoon': 'Próximamente',
	'newsletter.title': 'Suscríbete al boletín',
	'newsletter.name': 'Nombre',
	'newsletter.email': 'Correo electrónico',
	'newsletter.submit': 'Regístrate',
	'newsletter.consent': 'Quiero recibir el boletín por email y he leído la',
	'legal.updated': 'Última actualización',

	'contact.seo.title': 'Contacto — María Dimitropoulou López',
	'contact.seo.description':
		'Realiza tu consulta o pide información sobre los cursos y servicios de María Dimitropoulou López. Chalandri (Atenas) y online.',
	'contact.title': 'Realiza tu consulta con María',
	'contact.intro':
		'¿Necesitas información? Puedo ayudarte y resolver tus dudas sobre mis cursos o servicios.',
	'contact.form.name': 'Nombre',
	'contact.form.lastName': 'Apellidos',
	'contact.form.email': 'Email',
	'contact.form.message': 'Mensaje',
	'contact.form.required': 'Este campo es obligatorio.',
	'contact.form.invalidEmail': 'Introduce un email válido.',
	'contact.form.privacyBefore': 'He leído y acepto la',
	'contact.form.privacyLink': ' política de privacidad',
	'contact.form.privacyRequired': 'Debes aceptar la política de privacidad.',
	'contact.form.submit': 'Enviar mensaje',
	'contact.form.sending': 'Enviando…',
	'contact.form.success': '¡Gracias! Tu mensaje se ha enviado. Te responderé lo antes posible.',
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
	'home.hero.cta': 'Book a session',
	'home.intro.text':
		"I'm María Dimitropoulou López, psychologist and PhD in Cognitive Neuroscience. I offer specialized psychological support and Mindfulness and respectful-parenting tools to guide you on the path of self-compassion, conscious parenting and shared parental responsibility. A compassionate, judgment-free space to reduce your mental load, tend to your emotional well-being, and raise your children from a place of presence and mutual respect.",
	'home.intro.imageAlt': 'María Dimitropoulou López smiling with her arms crossed, wearing a striped shirt.',
	'sessions.heading':
		'Psychological support sessions for children, adults and families',
	'sessions.cta': 'All my sessions',
	// TODO: revisar traducción (borrador a partir del texto en español).
	'courses.heading':
		'Training courses for parents and professionals',
	'courses.cta': 'All my courses',
	'cta.heading': 'Shall we take the first step together?',
	'cta.text':
		"Tell me what you or your family need. I'll reply personally so we can find the support, therapy or course that suits you best, online or in Chalandri.",
	'cta.button': 'Write to me',

	// TODO: revisar traducción — texto fuente en español (es), traducido sin
	// revisión de María. «psicopedagoga» se ha vertido como «educational
	// psychologist»; confirmar el título equivalente.
	'about.seo.title': 'About me — María Dimitropoulou López',
	'about.seo.description':
		'Psychologist, educational psychologist and PhD in Cognitive Psychology. My background and my approach with children, families and professionals.',
	'about.title': 'About me',
	'about.photoAlt': 'Portrait of María Dimitropoulou López',
	'about.p1':
		'I am a psychologist, educational psychologist and PhD in Cognitive Psychology. Driven by a deep calling to support children on their path to discovering and accepting their true nature, and by observing my own difficulties as a woman in my different roles, I began to study the development of cognitive processes, the mind–heart connection, the parental role and family dynamics.',
	'about.p2':
		'I have researched cognitive processes in depth at universities and research centers in Greece, England, the United States and Spain, completed two university Master’s degrees, and published and presented my scientific findings internationally. From the very beginning of my studies I worked with children and families in a variety of therapeutic and educational settings, gaining experience in different psychoeducational practices.',
	'about.p3':
		'This process led me to develop a unique approach to the way I support people, from childhood through adolescence to adulthood. This approach combines the principles of different disciplines and techniques, such as Mindfulness, Conscious Parenting, Non-Directive Child-Centered Play Therapy, and Family- and Routines-Based Early Intervention.',
	'about.p4':
		'I currently offer psychological support services, courses and talks, and I teach on undergraduate and postgraduate programs at universities in Greece, Spain and Cyprus. I also offer training courses for parents and early childhood professionals worldwide.',
	'about.cta': 'Get in touch',

	// Página temporal del blog hasta que haya publicaciones.
	'blog.seo.title': 'Blog — María Dimitropoulou López',
	'blog.seo.description': 'Blog articles will be available soon.',
	'blog.comingSoon': 'Coming soon',
	'newsletter.title': 'Subscribe to the newsletter',
	'newsletter.name': 'Name',
	'newsletter.email': 'Email',
	'newsletter.submit': 'Sign up',
	'newsletter.consent': 'I want to receive the newsletter by email and have read the',
	'legal.updated': 'Last updated',

	'contact.seo.title': 'Contact — María Dimitropoulou López',
	'contact.seo.description':
		'Book a consultation or ask about the courses and services of María Dimitropoulou López. Chalandri (Athens) and online.',
	'contact.title': 'Book your consultation with María',
	'contact.intro':
		'Need information? I can help you and answer your questions about my courses or services.',
	'contact.form.name': 'First name',
	'contact.form.lastName': 'Last name',
	'contact.form.email': 'Email',
	'contact.form.message': 'Message',
	'contact.form.required': 'This field is required.',
	'contact.form.invalidEmail': 'Please enter a valid email.',
	'contact.form.privacyBefore': 'I have read and accept the',
	'contact.form.privacyLink': ' privacy policy',
	'contact.form.privacyRequired': 'You must accept the privacy policy.',
	'contact.form.submit': 'Send message',
	'contact.form.sending': 'Sending…',
	'contact.form.success': 'Thank you! Your message has been sent. I will reply as soon as possible.',
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
