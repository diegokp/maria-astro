# Despliegue en producción (Nicalia, Apache por FTP)

Cómo sustituir la página estática «en construcción» por el build de Astro sin quedarse sin servicio y sin mezclar contenidos.

## Antes de subir

1. **Build de producción, nunca el normal:**
   ```bash
   npm run build:prod        # SITE_ENV=production
   ```
   `npm run build` genera un sitio con `noindex` y un `robots.txt` que lo bloquea todo: subirlo dejaría la web fuera de Google.
2. **Comprobaciones en `dist/`:**
   - `dist/robots.txt` dice `Allow: /` y `Sitemap: https://mariadimitropouloulopez.com/sitemap-index.xml`.
   - Existen `dist/sitemap-index.xml`, `dist/sitemap-0.xml`, `dist/404.html` y `dist/.htaccess`.
   - Ninguna página indexable lleva `<meta name="robots" content="noindex…">`. Solo la llevan el blog «Próximamente» y las 404.
   - Cuando exista, `npm run seo:check` (fase 7) pasa sin errores.
3. **El certificado SSL está activo** en el dominio. El `.htaccess` fuerza HTTPS; sin certificado, la web no cargaría.
4. **Copia de seguridad** de lo que hay ahora en el servidor (el `index.html` de «en construcción» y sus recursos), por si hubiera que volver atrás.

## Orden de subida (FTP/SFTP)

La idea es que la página antigua siga respondiendo hasta el último momento:

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
curl -sI $D/es/no-existe/ | head -1                 # 404 (página en español)
curl -sI $D/sitemap-index.xml | grep -i content-type # application/xml
curl -s  $D/robots.txt                              # Allow: / + Sitemap:
```

Cuando se apliquen las redirecciones del WordPress (`docs/REDIRECCIONES-WORDPRESS.md`), hay que probar también una muestra con `curl -I` (una página, dos posts, una categoría y una etiqueta) y comprobar que devuelven **un solo** 301 hacia el destino, sin cadenas.

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
