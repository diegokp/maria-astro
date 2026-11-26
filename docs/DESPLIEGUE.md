# Despliegue en producción (Nicalia por FTP; servidor LiteSpeed, compatible con `.htaccess` de Apache)

Cómo sustituir la página estática «en construcción» por el build de Astro sin quedarse sin servicio y sin mezclar contenidos.

## Antes de subir

1. **Build de producción, nunca el normal:**
   ```bash
   npm run build:prod        # SITE_ENV=production
   ```
   `npm run build` genera un sitio con `noindex` y un `robots.txt` que lo bloquea todo: subirlo dejaría la web fuera de Google.
2. **Comprobaciones en `dist/`:**
   - `dist/robots.txt` dice `Allow: /` y `Sitemap: https://mariadimitropouloulopez.com/sitemap-index.xml`.
   - Existen `dist/sitemap-index.xml`, `dist/sitemap-0.xml`, `dist/404.html`, `dist/.htaccess`, `dist/es/.htaccess` y `dist/en/.htaccess`.
   - Ninguna página indexable lleva `<meta name="robots" content="noindex…">`. Solo la llevan el blog «Próximamente» y las 404.
   - Cuando exista, `npm run seo:check` (fase 7) pasa sin errores.
3. **El certificado SSL está activo** en el dominio. El `.htaccess` fuerza HTTPS; sin certificado, la web no cargaría.
4. **Copia de seguridad** de lo que hay ahora en el servidor (el `index.html` de «en construcción» y sus recursos), por si hubiera que volver atrás.

## Orden de subida (FTP/SFTP)

La idea es que la página antigua siga respondiendo hasta el último momento:

**Los `.htaccess` son archivos ocultos:** activa «mostrar archivos ocultos» en el cliente FTP o no se subirán. Son tres: el de la raíz, `es/.htaccess` y `en/.htaccess` (la 404 en español e inglés; LiteSpeed ignora `ErrorDocument` dentro de `<If>`, por eso van por carpeta).

1. **Subir todo `dist/` excepto `index.html` y `.htaccess`.** Son rutas nuevas (`/_astro/`, `/es/`, `/synedries/`…) que nadie visita todavía, y no pisan nada.
2. **Subir `.htaccess`.** A partir de aquí se aplican HTTPS, host sin `www`, barra final y la 404 por idioma.
3. **Subir `index.html` al final**, sobrescribiendo el de «en construcción». En ese instante la web nueva queda publicada.
4. **Borrar los restos** de la página antigua que no existan en `dist/` (sus CSS, imágenes o scripts propios). Hay que conservar lo que el hosting necesite fuera de la web (por ejemplo, `.well-known/` para el certificado) y el `.htaccess` nuevo.

Si algo falla: volver a subir el `index.html` antiguo y quitar el `.htaccess`.

## Comprobaciones justo después (con `curl -I`)

```bash
D=https://mariadimitropouloulopez.com
curl -sI $D/ | head -1                              # 200
curl -sI http://mariadimitropouloulopez.com/ | grep -i location     # → https://mariadimitropouloulopez.com/
curl -sI https://www.mariadimitropouloulopez.com/ | grep -i location # → https://mariadimitropouloulopez.com/
curl -sI $D/es/contacto | grep -i location          # → …/es/contacto/
curl -sI $D/es/index.html | grep -i location        # → …/es/
curl -sI $D/no-existe/ | head -1                    # 404 (página en griego)
curl -s  $D/es/no-existe/ | grep -o '<html[^>]*lang="[a-z]*"'   # 404 con lang="es" (página en español)
curl -sI $D/sitemap.xml | grep -i location         # → …/sitemap-index.xml (sitemap antiguo)
curl -sI "$D/?page_id=1681" | grep -i location     # → …/programmata/mindful-parenting/
curl -sI $D/contact/ | grep -i location            # → …/en/contact/
curl -sI $D/facebook-live/ | head -1               # 410 (anuncio pasado, opción D)
curl -sI $D/sitemap-index.xml | grep -i content-type # application/xml
curl -s  $D/robots.txt                              # Allow: / + Sitemap:
```

**Batería completa** (todas las redirecciones del WordPress y las comprobaciones de servidor): `node scripts/check-redirects.mjs --report` → `docs/REDIRECCIONES-VERIFICACION.md`. Tarda unos 20 minutos a propósito: va de una en una con 1,2 s de pausa, porque el cortafuegos de Nicalia bloqueó la IP el 26/11/2026 con una ráfaga en paralelo. **No bajar `--delay` contra producción.** Contra Apache local (`--base=http://127.0.0.1:8088 --delay=0`) los saltos se resuelven en local.

## Después del lanzamiento

1. **Search Console:**
   - Dar de alta la propiedad `https://mariadimitropouloulopez.com`, exactamente igual que el canonical.
   - Enviar `sitemap-index.xml`.
   - Inspeccionar la home y una URL por idioma y por plantilla.
   - Si el sitemap aparece como «Desconocido», comprobar el `Content-Type` y que la propiedad coincide con la URL enviada.
2. **Primera semana:** vigilar la cobertura de páginas y los errores de `hreflang`.
3. **Entorno de pruebas:** comprobar que `devenlopment.asdata.es` sigue protegido con contraseña y fuera del índice. Los previews de Vercel ya salen con `noindex` y `Disallow: /`.

## Vercel (solo previews)

Vercel ejecuta `npm run build` (sin `SITE_ENV`), así que los previews nunca son indexables. **No hay que definir `SITE_ENV=production` en Vercel.** Vercel ignora el `.htaccess`.
