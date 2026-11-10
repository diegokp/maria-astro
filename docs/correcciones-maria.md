# Correcciones de textos de María (documento Word)

**Estado:** recibida la revisión de los textos **en griego** (10/11/2026) y aplicada; pendientes los de español e inglés. Actualizado el 10/11/2026.

María entregará **un documento Word con todas las correcciones de los textos** de la web. Hasta recibirlo, lo que hay publicado en el draft de Vercel (rama `draft/revision-maria`) son borradores de construcción. **Esta versión de la web no se publica en producción hasta aplicar ese documento.**

## Cómo se aplicará

1. María entrega el Word con los textos corregidos, en los tres idiomas (el, es, en).
2. Se vuelcan en el código, página por página, **sin reescribirlos**: el texto de María se publica tal cual y solo se corrigen erratas de tecleo evidentes (regla de CLAUDE.md, sección `services`).
3. Se quitan los marcadores `TODO: revisar traducción` de los textos que ella haya validado. Los que sigan pendientes se mantienen.
4. `npx astro check` y `npm run build`, revisión visual y push a `draft/revision-maria` para que María lo vea en Vercel.
5. Cuando María dé el visto bueno, se pasa a la fase 5 (SEO, `llms.txt`, 404, subida a Nicalia).

## Dónde están los textos

| Texto | Dónde |
|---|---|
| Interfaz (menú, botones, títulos de sección, llamadas a la acción, newsletter, Contacto) | `src/i18n/ui.ts` |
| Servicios (cabecera con `**…**` y cuerpo con `<span class="highlight">`) | `src/content/services/{el,es,en}/<serviceKey>.md` |
| Sobre mí y Colaboraciones | `src/content/about/{el,es,en}/about.md` |
| Testimonios | `src/content/testimonials/{el,es,en}/<clave>.md` |
| Legales (Aviso legal, Privacidad, Cookies) | `src/content/legal/{el,es,en}/<clave>.md` (actualizar `updatedDate` al editarlos) |

Los destacados en negrita se conservan tal como vengan marcados en su documento (ver `src/utils/highlight.ts`).

## A comprobar cuando llegue el documento

Dudas abiertas de esta revisión que su documento debería resolver:

- **Universidad Nacional Kapodiastriaca de Atenas** (Sobre mí → Colaboraciones): el texto está literal, con su ortografía original, porque no está claro si es una colaboración (ella imparte los cursos) o formación recibida.
- **Teacher Talk:** 3 módulos × 7 h = 21 horas (en su Excel decía 22).
- **ABC and Beyond:** 15 horas (antes «entre 15 y 18»).
- **«Psicopedagoga»** en griego e inglés (ψυχοπαιδαγωγός / *psychopedagogue*).
- **Título de la sección «María»** (antes «Sobre mí»): confirmar si queda así, y el título SEO de esa página.
- **Testimonios:** consentimiento escrito de cada persona y traducciones al español y al inglés.
- **Slugs en griego** de las URLs.
- **Textos legales:** ΑΦΜ, colegiación, ley nacional aplicable y jurisdicción (revisión por abogado/a).
- **Matrescencia, Mindful Parenting y Terapia parental** en griego e inglés: alineados con el español, pendientes de su validación.
- **Teacher Talk en griego:** enlace de inscripción a `elearningekpa.gr` y su texto.

## Revisión de los textos en griego (recibida el 10/11/2026)

Fuente: «Revision textos Griego Web 2.docx» de María (resumen en `2026-11-10-revision-textos-griego.md`). Se aplicó **solo al griego**; español e inglés quedan sin tocar, como se acordó.

**Aplicado (59 cambios, todos los originales coincidían con el proyecto):** página principal (hero, presentación, frase destacada, título de servicios, CTA final), Sesiones (título, tarjetas, CTA, botones «Κλείσε ραντεβού» / «Γράψε μου»), Matrescencia, Terapia parental/familiar (ahora «συμβουλευτική»), María (todos los bloques), Contacto, y los programas Teacher Talk®, ABC and Beyond™ y Mindful Parenting. Regla general aplicada: tutear, «Σε τι δουλεύουμε;» → «Κεντρικοί άξονες».

### Para verificar con María

**1. Posibles erratas en su texto (aplicado tal cual lo escribió, sin tocar):**

| Dónde | Texto actual | Posible forma correcta |
|---|---|---|
| Presentación (home) | «και στη Ενσυνείδητη Γονεϊκότητα» | «στην Ενσυνείδητη» |
| Matrescencia, «Para quién» | «Σε ποιές απευθύνεται;» | «ποιες» (monotónico) |
| Parentalidad, duración | «καθώς τα εγκαθιδρύεται νέα δυναμική» | «καθώς εγκαθιδρύεται (μια) νέα δυναμική» |
| María, trayectoria | «Τα επιστημονικά μου ευρήματά δημοσιευθεί» | «ευρήματα έχουν δημοσιευθεί» |
| CTA de Sesiones (texto) | «να κοιτάξεις τον εαυτό σας» y «στον ρυθμό σας» | «σου» (el resto va en singular); además falta una coma antes de «γράψε μου» |
| Teacher Talk, destinatarios | «χρήσιμη για να δουλεύετε με:» (plural) | decidir si los programas para profesionales también se tutean |

**2. Corregido por mí (erratas de teclado, invisibles):** «Kάνουμε» tenía una K latina y «Μindful Parenting» una Μ griega; se publican con Κ griega y M latina. En «Κεντρικοί άξονες;» de Parentalidad se quitó el «;» sobrante (en las demás páginas no lo lleva).

**3. Cambios de contenido que conviene que confirme:**
- Presentación de «María»: desaparece «ιδρύτρια αυτού του χώρου» (fundadora) y el español y el inglés aún la mencionan.
- Trayectoria: las 3 viñetas pasan a 2 (desaparece la de «Επιστημονικές δημοσιεύσεις» como viñeta propia) y el español y el inglés conservan las 3.
- Nueva afirmación «για περισσότερο από δύο δεκαετίες» (más de dos décadas de trabajo con familias) y «Πτυχιούχος ψυχολόγος και ψυχοπαιδαγωγός»: son datos de su currículum.
- «Σε ποιές» (Matrescencia): ahora el título de «Para quién» es solo femenino.
- Ya no se dice «Συνοδεία» en el título de Matrescencia, pero sí en el punto «Ανασυγκρότηση της ταυτότητας: Συνοδεία στο πένθος…» (ella no lo cambió).

**4. Sus comentarios que afectan a español e inglés (no tocados):**
- Título de la home «Τι θα βρεις εδώ;»: pide cambiarlo **en las tres versiones** («¿Qué encontrarás aquí?»).
- Sesiones: faltan los adolescentes en el título; revisar si también faltan en español e inglés.

**5. Textos en griego que su documento no cubre y siguen en trato formal (usted):** conviene que diga si también se tutean.
- Botones: «Επικοινωνήστε μαζί μου» (hero y María), «Ζητήστε πληροφορίες» (ABC and Beyond, Mindful Parenting y Seminarios).
- Formulario de contacto: «Πείτε μου τι χρειάζεστε», «Εισαγάγετε ένα έγκυρο email», «Πρέπει να αποδεχτείτε…», mensajes de éxito y de error, y el pie «Ακολουθήστε».
- Metadatos (SEO): la descripción de Contacto («Κλείστε το ραντεβού σας…»), las de la home y de Sesiones (siguen con «γονεϊκή και οικογενειακή θεραπεία» y sin «εφήβους»), la de Matrescencia («συνοδεία», «κατανοήσετε») y la de Terapia parental («γονεϊκότητας με σεβασμό», ahora «θετική γονεϊκότητα» en el texto).
- La página de Apoyo psicoterapéutico no estaba en su documento (solo se cambió el botón y «Κεντρικοί άξονες»).

**6. Negritas:** ella indicó que no cambió el formato. Donde el texto cambió, se mantuvieron las negritas en la frase equivalente (presentación de la home, descripciones de Matrescencia y Terapia parental, destinatarios de Teacher Talk, títulos de la trayectoria y de «Σε τι μπορώ να σε βοηθήσω;»). Si alguna debe ir distinta, que lo indique.
