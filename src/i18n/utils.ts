import { ui, defaultLang, type Lang, type UIKey } from './ui';

export function withTrailingSlash(path: string): string {
  if (path === '/') return '/';
  const [base, hash] = path.split('#');
  const last = base.split('/').pop() ?? '';
  const isFile = /\.[a-z0-9]+$/i.test(last);
  const normalized = isFile || base.endsWith('/') ? base : `${base}/`;
  return hash ? `${normalized}#${hash}` : normalized;
}

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first in ui ? (first as Lang) : defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return (ui[lang] as Record<string, string>)[key] ?? ui[defaultLang][key];
  };
}

export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return withTrailingSlash(clean);
  return withTrailingSlash(clean === '/' ? '/pt' : `/pt${clean}`);
}

export function alternatePath(url: URL, lang: Lang): string {
  const current = getLangFromUrl(url);
  const bare = current === defaultLang ? url.pathname : url.pathname.replace(/^\/pt/, '') || '/';
  return localizePath(bare, lang);
}
