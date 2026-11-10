# Datos pendientes para el SEO

**Actualizado:** 10/11/2026 (Fase 1 de la auditoría SEO, `docs/SEO-AUDITORIA.md`).

**Regla:** ningún dato de esta lista se inventa. Mientras falte, la propiedad correspondiente **se omite** del JSON-LD y de las metas; el build avisará de los obligatorios. La configuración vive en `src/consts.ts` (el equivalente al `src/config/site.ts` del prompt).

## Datos de María

| Dato | Para qué | Quién lo tiene | Dónde irá |
|---|---|---|---|
| **Modalidad confirmada** (solo online / online + presencial) | Tipo de entidad, `address`, `areaServed`, `availableChannel`, metas con «Chalandri» | María / tú | `consts.ts` → `MODALITY` (nuevo) |
| Coordenadas de la consulta (lat/long) | `geo` (solo si es presencial) | María | `CONTACT.geo` (nuevo) |
| Horario de atención | `openingHoursSpecification` (solo si es presencial y si quiere publicarlo) | María | `CONTACT.openingHours` (nuevo) |
| Enlace a Google Maps / ficha de Google Business | `hasMap`, `sameAs` | María | `CONTACT.mapUrl`, `SOCIAL` |
| Universidades de su formación (grado, dos másteres, doctorado) | `alumniOf` de `Person` (hoy la web solo dice «dos másteres universitarios», sin nombres) | María | `PERSON.alumniOf` (nuevo) |
| ~~Número de colegiación profesional y colegio~~ | `hasCredential`, Aviso legal | ✅ P02486, Colegio Oficial de Psicólogos de Las Palmas (10/11/2026) | `PERSON.credential` + `legal/*.md` |
| ~~ΑΦΜ (NIF griego)~~ | Aviso legal | ✅ Publicado enmascarado (`11****947`) el 10/11/2026, por recomendación legal y de protección de datos | `legal/*.md` |
| URL de la Universidad / curso UNKA (y si es colaboración o formación recibida) | `affiliation`/`memberOf` solo si es colaboración real; enlace en Colaboraciones | María | `about/*.md` + `PERSON.affiliation` |
| Consentimiento escrito de cada testimonio | Publicación de testimonios (RGPD, datos de salud) | María | `testimonials/*.md` (hoy `approved: true`) |
| Fechas de la próxima edición de cada programa (Teacher Talk®, ABC and Beyond™, Mindful Parenting) | `CourseInstance` (`startDate`, `courseMode`); sin fecha solo se emite `Course` | María | `services/*.md` → `nextEdition` (nuevo, opcional) |
| Visto bueno a las meta descriptions de 150–160 car. | Metas (43 páginas por debajo del rango) | María (copy) | `ui.ts` (`*.seo.description`) y `metaDescription` de `services/*.md` |

## Recursos gráficos

| Dato | Para qué | Estado |
|---|---|---|
| Imagen OG por defecto 1200×630 | `og:image`, `twitter:image` | Se puede componer con material existente (retrato `maria-about.webp` o ilustraciones); falta decidir cuál (decisión 7) |
| Logo para JSON-LD | `logo` de la organización | Existe: `public/images/maria-dimitropoulou-logo.webp` (478×479). Google recomienda ≥112×112 ✅ |
| Foto de María para `Person.image` | Entidad principal | Existe: `src/assets/images/maria-about.webp` ✅ |

## Migración desde WordPress

| Dato | Para qué | Quién lo tiene |
|---|---|---|
| XML de exportación de WordPress (`wp:post_id`, slugs, categorías) o listado de URLs publicadas | Mapa de redirecciones 301 de los 49 posts, categorías y páginas | Tú (en `devenlopment.asdata.es`) |
| Host canónico del WordPress actual (`www` o no) y si sirve HTTPS | Reglas de `.htaccess` | Tú |
| Servidor de producción definitivo (Nicalia/Apache u otro) | Formato de redirecciones y cabeceras | Tú |

## Ya disponibles (sin acción)

Nombre de María (griego y latín), email, teléfono, dirección (Λέσβου 8, Χαλάνδρι), Facebook, Instagram, LinkedIn, Project Parenting (`projectparenting.gr`), TeensNeurolink (`teensneurolink.com`), dominio canónico.
