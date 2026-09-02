import { describe, it, expect } from 'vitest';
import { getLangFromUrl, useTranslations, localizePath, alternatePath } from '../../src/i18n/utils';
import { ui } from '../../src/i18n/ui';

describe('getLangFromUrl', () => {
  it('retorna en na raiz', () => {
    expect(getLangFromUrl(new URL('https://x.dev/'))).toBe('en');
  });
  it('retorna pt sob /pt', () => {
    expect(getLangFromUrl(new URL('https://x.dev/pt'))).toBe('pt');
  });
  it('retorna pt em rota aninhada sob /pt', () => {
    expect(getLangFromUrl(new URL('https://x.dev/pt/writing/algo'))).toBe('pt');
  });
  it('retorna en para prefixo desconhecido', () => {
    expect(getLangFromUrl(new URL('https://x.dev/writing/algo'))).toBe('en');
  });
});

describe('useTranslations', () => {
  it('resolve chave no idioma pedido', () => {
    expect(useTranslations('pt')('nav.writing')).toBe('Escritos');
  });
  it('resolve a mesma chave em en', () => {
    expect(useTranslations('en')('nav.writing')).toBe('Writing');
  });
  it('cai para en quando a chave falta em pt', () => {
    expect(useTranslations('pt')('nav.experience')).toBeTruthy();
  });
});

describe('dicionário', () => {
  it('en e pt têm exatamente as mesmas chaves', () => {
    expect(Object.keys(ui.pt).sort()).toEqual(Object.keys(ui.en).sort());
  });
  it('nenhuma string está vazia', () => {
    const empty = Object.entries(ui).flatMap(([lang, dict]) =>
      Object.entries(dict).filter(([, v]) => !v.trim()).map(([k]) => `${lang}.${k}`)
    );
    expect(empty).toEqual([]);
  });
});

describe('localizePath', () => {
  it('mantém o caminho sem prefixo em en', () => {
    expect(localizePath('/writing', 'en')).toBe('/writing/');
  });
  it('prefixa com /pt em pt', () => {
    expect(localizePath('/writing', 'pt')).toBe('/pt/writing/');
  });
  it('trata a raiz em pt', () => {
    expect(localizePath('/', 'pt')).toBe('/pt/');
  });
});

describe('alternatePath', () => {
  it('mapeia rota en para a equivalente em pt', () => {
    expect(alternatePath(new URL('https://x.dev/writing'), 'pt')).toBe('/pt/writing/');
  });
  it('mapeia rota pt para a equivalente em en', () => {
    expect(alternatePath(new URL('https://x.dev/pt/writing'), 'en')).toBe('/writing/');
  });
  it('mapeia a home em pt de volta para a raiz', () => {
    expect(alternatePath(new URL('https://x.dev/pt'), 'en')).toBe('/');
  });
  it('mapeia a raiz para /pt', () => {
    expect(alternatePath(new URL('https://x.dev/'), 'pt')).toBe('/pt/');
  });
});

describe('barra final consistente com o build directory', () => {
  it('preserva a âncora ao normalizar', () => {
    expect(localizePath('/#work', 'pt')).toBe('/pt/#work');
    expect(localizePath('/#work', 'en')).toBe('/#work');
  });
  it('não duplica barra em caminho que já termina com uma', () => {
    expect(localizePath('/writing/', 'pt')).toBe('/pt/writing/');
  });
  it('a raiz em en continua sendo apenas /', () => {
    expect(localizePath('/', 'en')).toBe('/');
  });
});

describe('caminhos de arquivo não recebem barra final', () => {
  it('o feed rss mantém o caminho exato', () => {
    expect(localizePath('/rss.xml', 'en')).toBe('/rss.xml');
    expect(localizePath('/rss.xml', 'pt')).toBe('/pt/rss.xml');
  });
  it('outros arquivos também', () => {
    expect(localizePath('/cv.pdf', 'en')).toBe('/cv.pdf');
    expect(localizePath('/og/home.png', 'en')).toBe('/og/home.png');
  });
  it('mas diretórios continuam recebendo', () => {
    expect(localizePath('/writing', 'en')).toBe('/writing/');
  });
});
