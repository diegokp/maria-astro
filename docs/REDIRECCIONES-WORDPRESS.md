# Redirecciones 301 desde el antiguo WordPress

**Estado:** **aprobada y aplicada** el 10/11/2026 en `public/.htaccess` (bloque 0): opción **A** para los posts (301 → `/nea/`) y el resto de la tabla tal como se propuso. `/mindfulness/` → Apoyo psicoterapéutico (propuesta por defecto; cambiar la línea si se prefiere Mindful Parenting). Probado con Apache 2.4 en local: las 57 URLs, con y sin barra final, devuelven un único 301 a su destino; `wp-admin`/`wp-login.php` → 410.

**Fuente:** `urls-antiguas-wordpress.csv` (exportación del WordPress clonado). Contiene 9 páginas y 49 posts publicados, 5 categorías y 44 etiquetas. Los borradores (`draft`) nunca fueron públicos y no se redirigen.

**Por qué hace falta:** el WordPress estuvo publicado en este dominio. Sus URLs pueden seguir en el índice de Google y en enlaces de redes sociales o de otras webs. Sin redirección, al lanzar darían 404; con un 301, la visita llega a la página equivalente y Google traslada la autoridad de la URL antigua.

## 1. Páginas (9) → página equivalente

| URL antigua | Destino propuesto | Nota |
|---|---|---|
| `/` | `/` | Sin cambio (la home griega sigue en la raíz) |
| `/mindful-parenting/` | `/programmata/mindful-parenting/` | |
| `/mindfulparentingcourse/` | `/programmata/mindful-parenting/` | |
| `/servicios/` | `/es/sesiones/` | Era la página de servicios en español |
| `/υπηρεσίες/` | `/synedries/` | Servicios en griego |
| `/συμβουλευτική-γονέων/` | `/synedries/goneiki-oikogeneiaki-therapeia/` | Asesoramiento parental |
| `/eπιμόρφωση-επαγγελματιών/` | `/programmata/` | Formación de profesionales → Cursos |
| `/mindfulness/` | `/synedries/psychotherapeftiki-ypostirixi/` | ⚠️ **A confirmar:** la página antigua trataba de Mindfulness. Encaja con el apoyo psicoterapéutico a adultos (Mindfulness), pero también podría ir a Mindful Parenting |
| `/τελευταία-νέα/` | `/nea/` | Últimas noticias → Blog |

## 2. Posts publicados (49) → decisión pendiente

Todos están en griego (2020–2022) y **ninguno se ha republicado todavía**: su destino definitivo no existe. Opciones:

| Opción | Qué pasa | Pros / contras |
|---|---|---|
| **A. 301 → `/nea/` (blog griego) ahora**, y a cada post nuevo cuando María lo republique | El lector llega al blog en vez de a un error | Mejor para quien llega desde un enlace antiguo. Google trata las redirecciones masivas a un índice como «soft 404»: no transfiere autoridad, pero tampoco penaliza |
| **B. Dejarlos en 404** (con la página 404 útil) hasta republicarlos, y entonces 301 uno a uno | La URL da 404 con enlaces a las secciones | Señal honesta para Google; peor experiencia para quien llega desde un enlace |
| **C. 410 Gone** para los que no se van a republicar | Google los retira antes del índice | Solo tiene sentido para posts descartados (p. ej. anuncios de eventos pasados) |

**Recomendación:** opción **A** ahora y, a medida que María republique, sustituir la línea del post por un 301 a su nueva URL. Los anuncios de eventos y directos ya pasados (Facebook Live, ομιλία, Free live…) son candidatos a la opción C si María no los va a republicar.

Lista de los 49 posts (ruta decodificada · id de WordPress):

- `/εκπαιδευτικοί-σε-καραντίνα-live-facebook-qa/` · 1502
- `/διαδικτυακή-συνάντηση-με-τους-γονείς/` · 1563
- `/επιστροφή-στις-νέες-τάξεις-facebook-live-qa/` · 1558
- `/αγαπημένε-μου-αη-βασίλη-για-φέτος-θέλω/` · 1588
- `/άρθρο-στο-project-parenting/` · 1617
- `/νέα-συνεργασία-project-parenting/` · 1622
- `/συνκηδεμονία-σε-καιρούς-covid-19-πώς-μπορώ-ν/` · 1608
- `/1603/` · 1603
- `/γονείς-σε-καραντίνα/` · 1635
- `/η-ζωή-τον-καιρό-του-covid-19-μέσα-από-τα-μάτια-τ/` · 1663
- `/άρθρο-στο-project-parenting-πώς-να-είμαι-οκ-γονιός-σε/` · 1722
- `/νέα-συνεργασία-με-το-project-parenting/` · 1720
- `/νέο-άρθρο-στο-project-parenting-συνκηδεμονία-σε-καιρ/` · 1723
- `/είναι-το-γονεϊκό-στρες-μια-έκφραση-της/` · 2182
- `/μαθήματα-από-τη-μογγολία-δεν-αποφασίζ/` · 2178
- `/1ος-κορον-αναστοχασμός-θα-περάσει-και-α/` · 2184
- `/μια-άσκηση-για-να-αντέχω-τα-δύσκολα-συν/` · 2189
- `/νέο-άρθρο-στο-project-parenting-δεν-φταις-γιατί-οι-γο/` · 2205
- `/πρόγραμμα-διαχείρισης-γονεϊκού-στρε/` · 3011
- `/απλοί-τρόποι-για-να-είμαστε-πιο-mindful-στην/` · 2223
- `/3242/` · 3242
- `/γονεϊκότητα-σε-κοινή-θέα-πώς-να-μην-μ/` · 2543
- `/δεν-φταις-γιατί-οι-γονείς-δεν-είναι-υπε/` · 2548
- `/πώς-να-μιλάω-στο-παιδί-μου-όσο-μαθαίνει/` · 2538
- `/7-τρόποι-για-να-βοηθήσω-το-παιδί-μου-να-μ/` · 2519
- `/nέα-σειρά-βίντεο-γονιός-χωρίς-στρες-γ/` · 2517
- `/2995/` · 2995
- `/5-προτάσεις-για-να-ενισχύσεις-τη-γλωσσι/` · 2983
- `/γιατί-μας-τρομάζει-τόσο-πολύ-να-μην-αρέ/` · 3027
- `/ενσυνείδητη-γονεϊκότητα-μindful-parenting-με-μια/` · 3004
- `/νέος-κύκλος-πρόγραμμα-διαχείρισης-γο/` · 3017
- `/3022/` · 3022
- `/3030/` · 3030
- `/προκλήσεις-και-λύσεις-για-μπαμπάδες-μ/` · 3251
- `/5-τρόποι-για-να-ενισχύσεις-την-γλωσσική/` · 3254
- `/live-για-μέλη-project-parenting-χτίσε-και-διατήρησε-ευτυ/` · 3338
- `/γιατί-να-συμμετάσχεις-ενεργά-στις-θερ/` · 3284
- `/3403/` · 3403
- `/live-για-μέλη-project-parenting-πώς-να-απελευθερωθώ-από/` · 3302
- `/facebook-live-για-μέλη-project-parenting/` · 3307
- `/βίντεο-σειρά-project-parenting-πώς-να-υποστηρίξω-την/` · 3375
- `/ποιά-μορφή-μπορούν-να-πάρουν-οι-φοβίες/` · 3320
- `/πώς-να-αφήνω-τις-δύσκολες-σκέψεις-να-φ/` · 3355
- `/πώς-να-μιλήσω-στο-παιδί-μου-για-τον-πόλε/` · 3367
- `/3343/` · 3343
- `/facebook-live/` · 3380
- `/free-live-yπέροχες-γυναίκες/` · 3313
- `/nέα-σειρά-βίντεο-project-parenting/` · 3391
- `/ομιλία-μείωσε-το-άγχος-σου-ως-γονιός-κα/` · 4152

Algunas rutas mezclan alfabetos: `nέα`, `yπέροχες` y `μindful` llevan letras latinas sueltas, como en el WordPress original. Hay que redirigirlas tal cual.

## 3. Archivo, etiquetas y rutas de WordPress

| URL antigua | Destino | Regla |
|---|---|---|
| `/category/*` (Εκδηλώσεις, Blog, Νέα, Πόροι, Uncategorized) | `/nea/` | Patrón |
| `/tag/*` (44 etiquetas) | `/nea/` | Patrón |
| `/feed/`, `/comments/feed/` | `/nea/` | Patrón |
| `/?p=<id>` y `/?page_id=<id>` (enlaces cortos) | Igual que la página/post de ese id | Opcional |
| `/wp-admin/`, `/wp-login.php`, `/xmlrpc.php` | 410 Gone | Patrón (también corta bots) |
| `/wp-content/uploads/…` (imágenes enlazadas desde fuera) | 410 Gone | Patrón |

## 4. Bloque `.htaccess` (Apache / Nicalia) — resumen (el aplicado está en `public/.htaccess`)

Apache compara las rutas ya **decodificadas** (UTF-8), así que las reglas pueden escribirse con las letras griegas. El archivo debe guardarse en UTF-8.

```apache
# --- Páginas
RewriteRule ^mindful-parenting/?$ /programmata/mindful-parenting/ [L,R=301]
RewriteRule ^mindfulparentingcourse/?$ /programmata/mindful-parenting/ [L,R=301]
RewriteRule ^servicios/?$ /es/sesiones/ [L,R=301]
RewriteRule ^υπηρεσίες/?$ /synedries/ [L,R=301]
RewriteRule ^συμβουλευτική-γονέων/?$ /synedries/goneiki-oikogeneiaki-therapeia/ [L,R=301]
RewriteRule ^eπιμόρφωση-επαγγελματιών/?$ /programmata/ [L,R=301]
RewriteRule ^mindfulness/?$ /synedries/psychotherapeftiki-ypostirixi/ [L,R=301]
RewriteRule ^τελευταία-νέα/?$ /nea/ [L,R=301]

# --- Archivo y rutas de WordPress
RewriteRule ^(category|tag)/ /nea/ [L,R=301]
RewriteRule ^(comments/)?feed/?$ /nea/ [L,R=301]
RewriteRule ^(wp-admin|wp-content|wp-includes)/ - [G]
RewriteRule ^(wp-login\.php|xmlrpc\.php)$ - [G]

# --- Posts (opción A: al blog griego hasta su republicación)
RewriteRule ^(εκπαιδευτικοί-σε-καραντίνα-live-facebook-qa|διαδικτυακή-συνάντηση-με-τους-γονείς|…)/?$ /nea/ [L,R=301]
# (se genera con las 49 rutas de la sección 2; al republicar un post, su
#  línea pasa a: RewriteRule ^<ruta-antigua>/?$ /nea/<nuevo-slug>/ [L,R=301])
```

En `public/.htaccess` estas reglas van **antes** de las de HTTPS y barra final, con destino absoluto (`https://mariadimitropouloulopez.com/…`), para que cada URL antigua haga **un solo** 301 aunque llegue por `http`, con `www` o sin barra. **Al republicar un post**, cambiar el destino de su línea (identificada con `# wp <id>`) por la URL nueva.

## 5. Equivalente en Vercel / Netlify (si el hosting cambia)

```jsonc
// vercel.json
{
  "redirects": [
    { "source": "/mindful-parenting/", "destination": "/programmata/mindful-parenting/", "permanent": true },
    { "source": "/category/:path*", "destination": "/nea/", "permanent": true },
    { "source": "/tag/:path*", "destination": "/nea/", "permanent": true }
  ]
}
```

```text
# Netlify: public/_redirects
/mindful-parenting/        /programmata/mindful-parenting/   301
/category/*                /nea/                             301
/tag/*                     /nea/                             301
/wp-admin/*                /                                 410
```

En Vercel y Netlify las rutas griegas se escriben **codificadas** (`/%CF%85%CF%80…/`), tal como aparecen en la columna `ruta_antigua` del CSV. Ninguna de las dos usa `.htaccess`.

## 6. Enlaces internos a `devenlopment.asdata.es`

No hay ninguno en el proyecto Astro: lo comprobé en el build. Cuando María republique posts del WordPress clonado, hay que revisar que su contenido no arrastre enlaces a ese dominio (el futuro `npm run seo:check` lo detectará).
