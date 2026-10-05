// Convierte a WebP todas las imágenes PNG/JPG del proyecto con sharp (la
// misma librería que usa Astro para optimizar imágenes en el build).
//
// Uso:
//   npm run images:webp                 # crea los .webp junto a los originales
//   npm run images:webp -- --delete     # además borra los originales
//
// Las imágenes de más de MAX_SIDE px se reducen (sin ampliar las pequeñas).
// No reescribe un .webp que ya exista. Después hay que actualizar las
// referencias en el código (.png/.jpg → .webp).
import { readdir, stat, unlink } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import sharp from 'sharp';

const DIRS = ['public/images', 'src/assets/images'];
const SOURCE_EXT = new Set(['.png', '.jpg', '.jpeg']);
const MAX_SIDE = 2400;
const QUALITY = 85;

const deleteOriginals = process.argv.includes('--delete');

async function exists(path) {
	try {
		await stat(path);
		return true;
	} catch {
		return false;
	}
}

async function* walk(dir) {
	if (!(await exists(dir))) return;
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) yield* walk(path);
		else if (SOURCE_EXT.has(extname(entry.name).toLowerCase())) yield path;
	}
}

const kb = (bytes) => `${Math.round(bytes / 1024)} kB`;

for (const dir of DIRS) {
	for await (const source of walk(dir)) {
		const target = source.slice(0, -extname(source).length) + '.webp';
		const label = relative(process.cwd(), source);

		if (await exists(target)) {
			console.log(`= ${label}: ya existe ${relative(process.cwd(), target)}, se omite`);
			continue;
		}

		await sharp(source)
			.rotate() // aplica la orientación EXIF antes de descartar los metadatos
			.resize({ width: MAX_SIDE, height: MAX_SIDE, fit: 'inside', withoutEnlargement: true })
			.webp({ quality: QUALITY, alphaQuality: 100, effort: 6 })
			.toFile(target);

		const before = (await stat(source)).size;
		const after = (await stat(target)).size;
		console.log(`✓ ${label} → .webp (${kb(before)} → ${kb(after)})`);

		if (deleteOriginals) await unlink(source);
	}
}
