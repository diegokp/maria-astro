# Datos pendientes para el SEO

**Actualizado:** 10/11/2026 (cierre de las fases 1–7; ver `docs/SEO-INFORME-FINAL.md`).

**Regla:** ningún dato de esta lista se inventa. Mientras falte, la propiedad correspondiente **se omite** del JSON-LD y de las metas; el build de producción avisa de los obligatorios con `[seo] Datos pendientes…`. La configuración vive en `src/consts.ts` (equivalente al `src/config/site.ts` del prompt original).

## Pendiente de María

| Dato | Para qué | Dónde irá |
|---|---|---|
| Coordenadas de la consulta (lat/long) | `geo` en `ProfessionalService` | `CONTACT.geo` |
| Enlace a Google Maps / ficha de Google Business | `hasMap`, `sameAs` | `CONTACT.mapUrl` |
| Horario de atención (solo si quiere publicarlo) | `openingHours` | `CONTACT.openingHours` |
| Universidades de su formación (grado, dos másteres, doctorado). La web solo dice «dos másteres universitarios» | `alumniOf` de `Person` | `PERSON.alumniOf` |
| Aclarar la **Universidad Nacional y Kapodistríaca de Atenas**: si es una colaboración (imparte los cursos) o formación recibida, y su URL | Colaboraciones (hoy texto literal con `TODO`) y `affiliation` | `about/*.md` + `PERSON.affiliations` |
| Fechas de la próxima edición de cada programa (Teacher Talk®, ABC and Beyond™, Mindful Parenting) | `CourseInstance` (`startDate`, `courseMode`): sin fechas, Google no puede mostrar el curso como resultado enriquecido | campo nuevo `nextEdition` en `services/*.md` |
| **Consentimiento escrito** de cada persona cuyo testimonio se publica (son datos de salud, RGPD) | Publicación de testimonios | `testimonials/*.md` |
| Validación de **todos los textos** (incluidas las metas de 150–160 car.) en su documento de correcciones | Metas, títulos y traducciones | `docs/correcciones-maria.md`, `docs/SEO-METAS-PROPUESTAS.md` |

## Pendiente del abogado

| Dato | Dónde irá |
|---|---|
| Ley nacional aplicable a los servicios de la sociedad de la información, autoridad de control y jurisdicción | `legal/*.md` (comentarios `TODO`) |
| Base jurídica de la analítica sin cookies (Plausible, interés legítimo) y confirmación de que no requiere consentimiento | `privacy.md` (`TODO`) |
| Contratos de encargo del tratamiento y transferencias de Web3Forms, Google, Mailchimp, Plausible y Nicalia | `privacy.md` (`TODO`) |
| Qué normativa y autoridad corresponde cuando la colegiación es del Colegio de Las Palmas y la consulta está en Atenas | `legal.md` |

## Pendiente de Diego (técnico)

| Dato | Para qué |
|---|---|
| Dar de alta `mariadimitropouloulopez.com` en **Plausible** con ese dominio exacto | Las métricas empiezan a contar al publicar el build de producción |
| Confirmar con Nicalia si el SSL se termina en el propio servidor o en un proxy | Una línea del `.htaccess` (la regla HTTPS, comentada en el propio archivo) |
| Servidor de producción definitivo y método de subida (FTP/SFTP o automático) | `docs/DESPLIEGUE.md` |

## Resuelto

| Dato | Cuándo | Cómo |
|---|---|---|
| Modalidad: online + presencial en Chalandri | 10/11/2026 | `MODALITY` en `consts.ts`; dirección en el JSON-LD |
| Colegiación: P02486, Colegio Oficial de Psicólogos de Las Palmas | 10/11/2026 | Aviso legal (3 idiomas) y `hasCredential` en `Person` |
| ΑΦΜ publicado enmascarado (`11****947`) por recomendación legal y de protección de datos | 10/11/2026 | Aviso legal (3 idiomas); el número completo no está en el repositorio |
| Imagen OG por defecto 1200×630 | 10/11/2026 | Retrato de María (`og-default.webp`), servido en JPEG |
| Logo y foto de María para el JSON-LD | 10/11/2026 | `maria-dimitropoulou-logo.webp` y `maria-about.webp` |
| URLs antiguas del WordPress | 10/11/2026 | `urls-antiguas-wordpress.csv` → 57 redirecciones 301 (`docs/REDIRECCIONES-WORDPRESS.md`) |
| Meta descriptions de 150–160 car. | 10/11/2026 | 48 propuestas aplicadas y validadas por `seo-check` |
| Datos de contacto, redes, Project Parenting y TeensNeurolink | — | `consts.ts` y `about/*.md` |
