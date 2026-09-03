"""
Auditoria de SEO sobre o build em dist/.

Verifica o que o Lighthouse nao cobre e que quebra silenciosamente num site
bilingue: coerencia entre canonical e hreflang, reciprocidade entre os pares
de idioma, e unicidade de title e description.

Uso: npm run build && python scripts/check-seo.py
"""

import io
import os
import re
import sys
from collections import Counter

DIST = 'dist'
SITE = 'https://alvarogalhardo.dev'


def paginas():
    for root, _, files in os.walk(DIST):
        for f in files:
            if f != 'index.html':
                continue
            p = os.path.join(root, f).replace(os.sep, '/')
            html = io.open(p, encoding='utf-8').read()
            yield p, html


def main():
    erros = []
    dados = []

    for p, html in paginas():
        canon = re.search(r'rel="canonical" href="([^"]+)"', html)
        title = re.search(r'<title>([^<]*)</title>', html)
        desc = re.search(r'<meta name="description" content="([^"]*)"', html)
        alts = dict(re.findall(r'hreflang="([^"]+)" href="([^"]+)"', html))

        h1s = len(re.findall(r'<h1[\s>]', html))
        if h1s != 1:
            erros.append(f'{p}: {h1s} <h1> na pagina (esperado exatamente 1)')

        if not canon:
            erros.append(f'{p}: sem canonical')
            continue
        dados.append({
            'arquivo': p,
            'canonical': canon.group(1),
            'title': title.group(1) if title else None,
            'desc': desc.group(1) if desc else None,
            'alts': alts,
        })

    por_canonical = {d['canonical']: d for d in dados}

    print(f'{"rota":<34} {"hreflang":<16} status')
    print('-' * 68)

    for d in sorted(dados, key=lambda x: x['canonical']):
        rota = d['canonical'].replace(SITE, '') or '/'
        lang = 'pt' if rota.startswith('/pt') else 'en'
        alts = d['alts']

        if not alts:
            print(f'{rota:<34} {"nenhum":<16} ok (pagina sem traducao)')
            continue

        if alts.get(lang) != d['canonical']:
            erros.append(f'{rota}: hreflang="{lang}" nao bate com o canonical')
            print(f'{rota:<34} {"self != canon":<16} ERRO')
            continue

        other = 'en' if lang == 'pt' else 'pt'
        alvo = alts.get(other)
        if not alvo:
            erros.append(f'{rota}: declara hreflang mas nao aponta para {other}')
            print(f'{rota:<34} {"incompleto":<16} ERRO')
        elif alvo not in por_canonical:
            erros.append(f'{rota}: hreflang="{other}" aponta para {alvo}, que nao existe no build')
            print(f'{rota:<34} {"alvo 404":<16} ERRO')
        elif por_canonical[alvo]['alts'].get(lang) != d['canonical']:
            erros.append(f'{rota}: {alvo} nao aponta de volta')
            print(f'{rota:<34} {"nao reciproco":<16} ERRO')
        else:
            print(f'{rota:<34} {"reciproco":<16} ok')

    for campo, rotulo in (('title', 'title'), ('desc', 'description')):
        vals = [d[campo] for d in dados if d[campo]]
        for val, n in Counter(vals).items():
            if n > 1:
                erros.append(f'{rotulo} repetido em {n} paginas: {val[:60]}')

    faltando = [d['canonical'] for d in dados if not d['title'] or not d['desc']]
    for f in faltando:
        erros.append(f'{f}: sem title ou description')

    print()
    if erros:
        print(f'{len(erros)} problema(s):')
        for e in erros:
            print('  -', e)
        return 1

    print(f'ok: {len(dados)} paginas, hreflang coerente, titles e descriptions unicos')
    return 0


if __name__ == '__main__':
    sys.exit(main())
