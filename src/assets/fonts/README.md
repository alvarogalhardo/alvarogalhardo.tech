# Fontes para geração de OG image

O `satori` não lê fontes variáveis — a Newsreader variável do Google Fonts
quebra com `Cannot read properties of undefined (reading '256')`. E o repositório
do Google Fonts não publica uma versão estática dela.

`Newsreader-Regular.ttf` foi gerada instanciando a variável em `wght=400` e
`opsz=16` com `fontTools.varLib.instancer`. Para regenerar:

```bash
curl -sfL -o /tmp/nr.ttf "https://github.com/google/fonts/raw/main/ofl/newsreader/Newsreader%5Bopsz%2Cwght%5D.ttf"
python -c "
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
f = TTFont('/tmp/nr.ttf')
instancer.instantiateVariableFont(f, {'wght': 400, 'opsz': 16}, inplace=False).save('src/assets/fonts/Newsreader-Regular.ttf')
"
```

Estes arquivos servem só ao gerador de OG image em build. O site em si usa
`@fontsource-variable`, que é servido ao browser.
