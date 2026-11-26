# Verificación de redirecciones en producción

**Generado por** `node scripts/check-redirects.mjs --report` el 2026-11-26 contra `https://mariadimitropouloulopez.com` (servidor: ver cabecera `server`). No editar a mano: se regenera.

**Fuente de las URLs antiguas:** `docs/REDIRECCIONES-WORDPRESS.md` (secciones 1 y 2, generadas desde `urls-antiguas-wordpress.csv`; el CSV no está en el repositorio).

## Resumen

| Bloque | Resultado |
|---|---|
| URLs antiguas (57 × 8 variantes: https cod. minúsc./mayúsc. ± barra, http y www ± barra) | 57/57 correctas en todas sus variantes (286/286 peticiones) |
| Rutas de WordPress, sitemaps antiguos, sin prefijo, 404 | 31 correctas · 0 fallan · 9 informativas (sin regla acordada) |
| robots.txt, sitemaps, Plausible, noindex | 14/14 correctas |

«Correcta» en una URL antigua = primer salto 301 con `Location` absoluta igual al destino acordado, **un solo salto** y destino final 200.

## 1. URLs antiguas del WordPress (una fila por URL; detalle solo de las variantes que fallan)

| | Tipo | URL antigua (decodificada) | Variantes OK | Location (https, cod. minúsc., con /) | Saltos | Código final |
|---|---|---|---|---|---|---|
| ✅ | página | `/mindful-parenting/` | 6/6 | `/programmata/mindful-parenting/` | 1 | 200 |
| ✅ | página | `/mindfulparentingcourse/` | 6/6 | `/programmata/mindful-parenting/` | 1 | 200 |
| ✅ | post · wp 1502 | `/εκπαιδευτικοί-σε-καραντίνα-live-facebook-qa/` | 2/2 | 410 | 0 | 410 |
| ✅ | página | `/servicios/` | 6/6 | `/es/sesiones/` | 1 | 200 |
| ✅ | página | `/υπηρεσίες/` | 6/6 | `/synedries/` | 1 | 200 |
| ✅ | página | `/συμβουλευτική-γονέων/` | 6/6 | `/synedries/goneiki-oikogeneiaki-therapeia/` | 1 | 200 |
| ✅ | post · wp 1563 | `/διαδικτυακή-συνάντηση-με-τους-γονείς/` | 2/2 | 410 | 0 | 410 |
| ✅ | página | `/eπιμόρφωση-επαγγελματιών/` | 6/6 | `/programmata/` | 1 | 200 |
| ✅ | página | `/mindfulness/` | 6/6 | `/synedries/psychotherapeftiki-ypostirixi/` | 1 | 200 |
| ✅ | página | `/τελευταία-νέα/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 1558 | `/επιστροφή-στις-νέες-τάξεις-facebook-live-qa/` | 2/2 | 410 | 0 | 410 |
| ✅ | post · wp 1588 | `/αγαπημένε-μου-αη-βασίλη-για-φέτος-θέλω/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 1617 | `/άρθρο-στο-project-parenting/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 1622 | `/νέα-συνεργασία-project-parenting/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 1603 | `/1603/` | 2/2 | 410 | 0 | 410 |
| ✅ | post · wp 1608 | `/συνκηδεμονία-σε-καιρούς-covid-19-πώς-μπορώ-ν/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 1635 | `/γονείς-σε-καραντίνα/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 1663 | `/η-ζωή-τον-καιρό-του-covid-19-μέσα-από-τα-μάτια-τ/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 3011 | `/πρόγραμμα-διαχείρισης-γονεϊκού-στρε/` | 2/2 | 410 | 0 | 410 |
| ✅ | post · wp 1722 | `/άρθρο-στο-project-parenting-πώς-να-είμαι-οκ-γονιός-σε/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 1720 | `/νέα-συνεργασία-με-το-project-parenting/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 1723 | `/νέο-άρθρο-στο-project-parenting-συνκηδεμονία-σε-καιρ/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 3017 | `/νέος-κύκλος-πρόγραμμα-διαχείρισης-γο/` | 2/2 | 410 | 0 | 410 |
| ✅ | post · wp 2182 | `/είναι-το-γονεϊκό-στρες-μια-έκφραση-της/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 2178 | `/μαθήματα-από-τη-μογγολία-δεν-αποφασίζ/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 2184 | `/1ος-κορον-αναστοχασμός-θα-περάσει-και-α/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 3030 | `/3030/` | 2/2 | 410 | 0 | 410 |
| ✅ | post · wp 2189 | `/μια-άσκηση-για-να-αντέχω-τα-δύσκολα-συν/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 2205 | `/νέο-άρθρο-στο-project-parenting-δεν-φταις-γιατί-οι-γο/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 2223 | `/απλοί-τρόποι-για-να-είμαστε-πιο-mindful-στην/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 3338 | `/live-για-μέλη-project-parenting-χτίσε-και-διατήρησε-ευτυ/` | 2/2 | 410 | 0 | 410 |
| ✅ | post · wp 3242 | `/3242/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 2543 | `/γονεϊκότητα-σε-κοινή-θέα-πώς-να-μην-μ/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 2548 | `/δεν-φταις-γιατί-οι-γονείς-δεν-είναι-υπε/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 3403 | `/3403/` | 2/2 | 410 | 0 | 410 |
| ✅ | post · wp 2538 | `/πώς-να-μιλάω-στο-παιδί-μου-όσο-μαθαίνει/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 2519 | `/7-τρόποι-για-να-βοηθήσω-το-παιδί-μου-να-μ/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 2517 | `/nέα-σειρά-βίντεο-γονιός-χωρίς-στρες-γ/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 3302 | `/live-για-μέλη-project-parenting-πώς-να-απελευθερωθώ-από/` | 2/2 | 410 | 0 | 410 |
| ✅ | post · wp 2995 | `/2995/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 2983 | `/5-προτάσεις-για-να-ενισχύσεις-τη-γλωσσι/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 3027 | `/γιατί-μας-τρομάζει-τόσο-πολύ-να-μην-αρέ/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 3307 | `/facebook-live-για-μέλη-project-parenting/` | 2/2 | 410 | 0 | 410 |
| ✅ | post · wp 3004 | `/ενσυνείδητη-γονεϊκότητα-μindful-parenting-με-μια/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 3022 | `/3022/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 3251 | `/προκλήσεις-και-λύσεις-για-μπαμπάδες-μ/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 3380 | `/facebook-live/` | 2/2 | 410 | 0 | 410 |
| ✅ | post · wp 3254 | `/5-τρόποι-για-να-ενισχύσεις-την-γλωσσική/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 3284 | `/γιατί-να-συμμετάσχεις-ενεργά-στις-θερ/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 3375 | `/βίντεο-σειρά-project-parenting-πώς-να-υποστηρίξω-την/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 3313 | `/free-live-yπέροχες-γυναίκες/` | 2/2 | 410 | 0 | 410 |
| ✅ | post · wp 3320 | `/ποιά-μορφή-μπορούν-να-πάρουν-οι-φοβίες/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 3355 | `/πώς-να-αφήνω-τις-δύσκολες-σκέψεις-να-φ/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 3367 | `/πώς-να-μιλήσω-στο-παιδί-μου-για-τον-πόλε/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 4152 | `/ομιλία-μείωσε-το-άγχος-σου-ως-γονιός-κα/` | 2/2 | 410 | 0 | 410 |
| ✅ | post · wp 3343 | `/3343/` | 6/6 | `/nea/` | 1 | 200 |
| ✅ | post · wp 3391 | `/nέα-σειρά-βίντεο-project-parenting/` | 6/6 | `/nea/` | 1 | 200 |

Ninguna variante falla.

## 2. Rutas de WordPress, sitemaps antiguos, rutas sin prefijo y 404

ℹ️ = sin regla acordada todavía: se documenta lo que responde hoy.

| | Grupo | URL | Código | Location | Saltos | Destino final | Código final |
|---|---|---|---|---|---|---|---|
| ✅ | WordPress | `/category/blog/`  | 301 | `/nea/` | 1 | `/nea/` | 200 |
| ✅ | WordPress | `/category/εκδηλώσεις/`  | 301 | `/nea/` | 1 | `/nea/` | 200 |
| ✅ | WordPress | `/tag/mindfulness/`  | 301 | `/nea/` | 1 | `/nea/` | 200 |
| ✅ | WordPress | `/feed/`  | 301 | `/nea/` | 1 | `/nea/` | 200 |
| ✅ | WordPress | `/comments/feed/`  | 301 | `/nea/` | 1 | `/nea/` | 200 |
| ✅ | WordPress | `/?p=2178`  | 301 | `/nea/` | 1 | `/nea/` | 200 |
| ✅ | WordPress | `/?page_id=1681`  | 301 | `/programmata/mindful-parenting/` | 1 | `/programmata/mindful-parenting/` | 200 |
| ✅ | WordPress | `/?page_id=4000`  | 301 | `/synedries/goneiki-oikogeneiaki-therapeia/` | 1 | `/synedries/goneiki-oikogeneiaki-therapeia/` | 200 |
| ✅ | WordPress | `/?attachment_id=6`  | 410 | — | 0 | — | 410 |
| ✅ | WordPress | `/wp-admin/`  | 410 | — | 0 | — | 410 |
| ✅ | WordPress | `/wp-content/uploads/2021/01/ejemplo.jpg`  | 410 | — | 0 | — | 410 |
| ℹ️ | WordPress | `/wp-json/`  | 404 | — | 0 | — | 404 |
| ℹ️ | WordPress | `/author/admin/`  | 404 | — | 0 | — | 404 |
| ℹ️ | WordPress | `/page/2/`  | 404 | — | 0 | — | 404 |
| ✅ | Sitemap antiguo | `/sitemap.xml`  | 301 | `/sitemap-index.xml` | 1 | `/sitemap-index.xml` | 200 |
| ✅ | Sitemap antiguo | `/sitemap_index.xml`  | 301 | `/sitemap-index.xml` | 1 | `/sitemap-index.xml` | 200 |
| ✅ | Sitemap antiguo | `/post-sitemap.xml`  | 301 | `/sitemap-index.xml` | 1 | `/sitemap-index.xml` | 200 |
| ✅ | Sitemap antiguo | `/page-sitemap.xml`  | 301 | `/sitemap-index.xml` | 1 | `/sitemap-index.xml` | 200 |
| ✅ | Sitemap antiguo | `/category-sitemap.xml`  | 301 | `/sitemap-index.xml` | 1 | `/sitemap-index.xml` | 200 |
| ✅ | Sitemap antiguo | `/post_tag-sitemap.xml`  | 301 | `/sitemap-index.xml` | 1 | `/sitemap-index.xml` | 200 |
| ✅ | Sitemap antiguo | `/wp-sitemap.xml`  | 301 | `/sitemap-index.xml` | 1 | `/sitemap-index.xml` | 200 |
| ✅ | Sitemap antiguo | `/wp-sitemap-posts-post-1.xml`  | 301 | `/sitemap-index.xml` | 1 | `/sitemap-index.xml` | 200 |
| ✅ | Sin prefijo / WPML | `/contact/`  | 301 | `/en/contact/` | 1 | `/en/contact/` | 200 |
| ✅ | Sin prefijo / WPML | `/contact`  | 301 | `/en/contact/` | 1 | `/en/contact/` | 200 |
| ✅ | Sin prefijo / WPML | `/contacto/`  | 301 | `/es/contacto/` | 1 | `/es/contacto/` | 200 |
| ✅ | Sin prefijo / WPML | `/sobre-mi/`  | 301 | `/es/sobre-mi/` | 1 | `/es/sobre-mi/` | 200 |
| ✅ | Sin prefijo / WPML | `/about/`  | 301 | `/en/about/` | 1 | `/en/about/` | 200 |
| ℹ️ | Sin prefijo / WPML | `/blog/`  | 404 | — | 0 | — | 404 |
| ✅ | Sin prefijo / WPML | `/sessions/`  | 301 | `/en/sessions/` | 1 | `/en/sessions/` | 200 |
| ✅ | Sin prefijo / WPML | `/courses/`  | 301 | `/en/courses/` | 1 | `/en/courses/` | 200 |
| ℹ️ | Sin prefijo / WPML | `/es/servicios/`  | 404 | — | 0 | — | 404 |
| ℹ️ | Sin prefijo / WPML | `/en/services/`  | 404 | — | 0 | — | 404 |
| ✅ | Sin prefijo / WPML | `/es/`  | 200 | — | 0 | — | 200 |
| ✅ | Sin prefijo / WPML | `/en/`  | 200 | — | 0 | — | 200 |
| ✅ | 404 por idioma | `/no-existe-prueba/`  | 404 | — | 0 | — | 404 |
| ✅ | 404 por idioma | `/es/no-existe-prueba/`  | 404 | — | 0 | — | 404 |
| ✅ | 404 por idioma | `/en/no-existe-prueba/`  | 404 | — | 0 | — | 404 |
| ℹ️ | 404 por idioma | `/404.html`  | 200 | — | 0 | — | 200 |
| ℹ️ | 404 por idioma | `/es/404/`  | 200 | — | 0 | — | 200 |
| ℹ️ | 404 por idioma | `/en/404/`  | 200 | — | 0 | — | 200 |

## 3. robots.txt y sitemaps

| | Comprobación | Detalle |
|---|---|---|
| ✅ | robots.txt responde 200 |  |
| ✅ | robots.txt es text/plain |  |
| ✅ | robots.txt contiene «Allow: /» |  |
| ✅ | robots.txt no contiene «Disallow: /» |  |
| ✅ | robots.txt declara Sitemap: |  |
| ✅ | sitemap-index.xml responde 200 (application/xml) |  |
| ✅ | /sitemap-0.xml responde 200 (application/xml) |  |
| ✅ | Las 42 URLs del sitemap responden 200 sin redirigir |  |

## 4. Plausible y noindex

| | Comprobación | Detalle |
|---|---|---|
| ✅ | El script de Plausible responde 200 (https://plausible.io/js/pa-jvU60SWxCNlw1G1qi3v2-.js) |  |
| ✅ | Plausible presente en las 48 páginas probadas (sitemap + blog + 404) |  |
| ✅ | Ninguna URL del sitemap lleva noindex |  |
| ✅ | El blog «Próximamente» (3 idiomas) lleva noindex |  |
| ✅ | Las 404 llevan noindex y responden 404 | /no-existe-prueba/ 404; /es/no-existe-prueba/ 404; /en/no-existe-prueba/ 404 |
| ✅ | La 404 sale en el idioma de la ruta (lang el / es / en) |  |

El script de Plausible es el de proyecto (`pa-….js`): **no usa `data-domain`**; el dominio va asociado al identificador del script en el panel de Plausible. Que el dominio del panel sea `mariadimitropouloulopez.com` hay que comprobarlo en Plausible (no verificable desde aquí).
