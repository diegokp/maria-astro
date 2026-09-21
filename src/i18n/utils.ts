import { SITE } from '../consts';
import { DEFAULT_LOCALE, LOCALES, routes, type Lang, type RouteKey } from './routes';
import { ui, type UIKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
	const [, maybeLocale] = url.pathname.split('/');
	if (LOCALES.includes(maybeLocale as Lang)) {
		return maybeLocale as Lang;
	}
	return DEFAULT_LOCALE;
}

export function t(lang: Lang, key: UIKey): string {
	return ui[lang][key];
}

export function localizedPath(routeKey: RouteKey, lang: Lang): string {
	return routes[routeKey][lang];
}

export function absoluteUrl(path: string): string {
	return new URL(path, SITE).toString();
}

export interface Alternate {
	lang: Lang | 'x-default';
	url: string;
}

// Los tres idiomas + x-default apuntando al griego (idioma por defecto).
export function getAlternates(routeKey: RouteKey): Alternate[] {
	const alternates: Alternate[] = LOCALES.map((lang) => ({
		lang,
		url: absoluteUrl(localizedPath(routeKey, lang)),
	}));
	alternates.push({
		lang: 'x-default',
		url: absoluteUrl(localizedPath(routeKey, DEFAULT_LOCALE)),
	});
	return alternates;
}
