#!/usr/bin/env python3
"""
Vygeneruje TEXTY.md ze zdrojových souborů, aby se texty daly číst a přepisovat
na jednom místě bez hrabání v HTML.

Spuštění z kořene projektu:   python3 nastroje/export-textu.py

Sekce na webu se poznají podle komentářů tvaru <!-- ── NÁZEV ── -->.
Když přidáš novou sekci, dej jí takový komentář a objeví se tu sama.
"""

import html
import io
import re
from html.parser import HTMLParser

# elementy, jejichž text nás zajímá, a jak se má v exportu pojmenovat
TYP = {
    'h1': 'nadpis H1', 'h2': 'nadpis H2', 'h3': 'nadpis H3', 'h4': 'nadpis',
    'p': 'odstavec', 'a': 'odkaz', 'button': 'tlačítko', 'li': 'odrážka',
    'label': 'popisek', 'option': 'volba', 'span': 'text', 'div': 'text',
    'strong': 'text', 'cite': 'text', 'summary': 'text',
}
PRAZDNE = {'br', 'img', 'input', 'hr', 'meta', 'link', 'source'}
IGNOROVAT = {'script', 'style', 'template', 'svg', 'path'}


class Uzel:
    def __init__(self, tag, atts=None):
        self.tag, self.atts, self.deti = tag, dict(atts or []), []

    def text(self):
        out = []
        for d in self.deti:
            out.append(d if isinstance(d, str) else d.text())
        return re.sub(r'\s+', ' ', ' '.join(out)).strip()

    def skryty(self):
        return 'display:none' in self.atts.get('style', '').replace(' ', '')

    def placeholder(self):
        return 'ph' in self.atts.get('class', '').split()


class Strom(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.koren = Uzel('#root')
        self.stack = [self.koren]

    def handle_starttag(self, tag, atts):
        if tag in PRAZDNE:
            u = Uzel(tag, atts)
            self.stack[-1].deti.append(u)
            if tag == 'input' and u.atts.get('placeholder'):
                u.deti.append(u.atts['placeholder'])
            return
        u = Uzel(tag, atts)
        self.stack[-1].deti.append(u)
        self.stack.append(u)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                return

    def handle_data(self, d):
        if d.strip() and self.stack[-1].tag not in IGNOROVAT:
            self.stack[-1].deti.append(d)


def sebrat(uzel, ven, hloubka=0):
    """Vybere listové nositele textu, ať se stejný text neopakuje dvakrát."""
    if uzel.tag in IGNOROVAT or uzel.skryty():
        return
    if uzel.placeholder():
        t = uzel.text()
        if t:
            ven.append(('zadání pro fotografa (skryté)', t))
        return

    ma_potomka_s_textem = any(
        isinstance(d, Uzel) and d.tag not in IGNOROVAT and d.text()
        for d in uzel.deti
    )
    if uzel.tag in TYP and not ma_potomka_s_textem:
        t = uzel.text()
        if t and len(t) > 1:
            ven.append((TYP[uzel.tag], t))
        return
    if uzel.tag in ('h1', 'h2', 'h3', 'h4', 'p', 'li', 'a', 'button', 'label') and ma_potomka_s_textem:
        t = uzel.text()
        if t and len(t) > 1:
            ven.append((TYP[uzel.tag], t))
        return
    for d in uzel.deti:
        if isinstance(d, Uzel):
            sebrat(d, ven, hloubka + 1)


def sekce_html(cesta):
    """Rozdělí stránku podle komentářů <!-- ── NÁZEV ── --> a vrátí texty."""
    zdroj = io.open(cesta, encoding='utf-8').read()
    hranice = [(m.start(), m.group(1).strip())
               for m in re.finditer(r'<!--\s*──+\s*(.+?)\s*──+\s*-->', zdroj)]
    if not hranice:
        hranice = [(0, 'STRÁNKA')]
    hranice.append((len(zdroj), None))

    vysledek = []
    for i in range(len(hranice) - 1):
        zac, nazev = hranice[i]
        kon = hranice[i + 1][0]
        p = Strom()
        p.feed(zdroj[zac:kon])
        ven = []
        sebrat(p.koren, ven)
        # duplicity za sebou (např. odkaz uvnitř odstavce) pryč
        cist = []
        for typ, t in ven:
            if cist and (t == cist[-1][1] or t in cist[-1][1]):
                continue
            cist.append((typ, t))
        if cist:
            vysledek.append((nazev, cist))
    return vysledek


def sekce_js(cesta, klice):
    """Vytáhne z JS textové řetězce u známých klíčů."""
    zdroj = io.open(cesta, encoding='utf-8').read()
    zdroj = re.sub(r'/\*.*?\*/', '', zdroj, flags=re.S)
    ven = []
    for klic, popis in klice:
        for m in re.finditer(klic + r"\s*:\s*'((?:[^'\\]|\\.)*)'", zdroj):
            ven.append((popis, m.group(1).replace("\\'", "'")))
    return ven


def js_pole(cesta, nazev, popis):
    zdroj = io.open(cesta, encoding='utf-8').read()
    ven = []
    for m in re.finditer(nazev + r"\s*=\s*\[(.*?)\];", zdroj, re.S):
        for s in re.finditer(r"'((?:[^'\\]|\\.)*)'", m.group(1)):
            t = s.group(1).replace("\\'", "'")
            if len(t) > 3:
                ven.append((popis, t))
    return ven


def slug(nazev):
    return re.sub(r'[^A-ZĚŠČŘŽÝÁÍÉŤŇÓÚŮ]', '', nazev.upper())[:4] or 'X'


def main():
    radky = [
        '# Texty webu problemovynajemnik.cz',
        '',
        'Vygenerováno skriptem `nastroje/export-textu.py` ze zdrojových souborů,',
        'aby nic nevypadlo. Po každé změně textů na webu ho spusť znovu:',
        '',
        '```bash',
        'python3 nastroje/export-textu.py',
        '```',
        '',
        'Každý text má v hranaté závorce označení, kde se na webu nachází —',
        'podle něj mi napiš, co přepsat, nebo rovnou přepiš text v tomhle souboru.',
        '',
        '- **A) Homepage** — `index.html`',
        '- **B) Prescoring** — `prescoring.html`',
        '- **C) Teprve budu pronajímat** — `budu-pronajimat.html`',
        '- **D) Průvodce diagnostikou** — texty v JavaScriptu, zobrazí se podle odpovědí',
        '- **E) Prescoringový model** — texty v JavaScriptu, zobrazí se podle zadaných údajů',
        '',
        'Sekce vypnuté přes `display:none` se sem nedostanou — když nějaký text chybí,',
        'je pravděpodobně na webu skrytý.',
        '',
        '---',
    ]

    for pismeno, nadpis, cesta in [
        ('A', 'HOMEPAGE', 'index.html'),
        ('B', 'PRESCORING', 'prescoring.html'),
        ('C', 'TEPRVE BUDU PRONAJÍMAT', 'budu-pronajimat.html'),
    ]:
        radky += ['', f'## {pismeno}) {nadpis} — `{cesta}`', '']
        for n, (nazev, polozky) in enumerate(sekce_html(cesta), 1):
            kod = f'{pismeno}{n}'
            radky += [f'### {kod}. {nazev}', '']
            for i, (typ, t) in enumerate(polozky, 1):
                radky.append(f'- **[{kod}.{i}]** *{typ}:* {t}')
            radky.append('')

    radky += ['', '## D) PRŮVODCE DIAGNOSTIKOU — `js/diagnostika.js`', '']
    d = sekce_js('js/diagnostika.js', [
        ('question', 'otázka'), ('hint', 'nápověda'), ('label', 'možnost'),
        ('note', 'poznámka k možnosti'), ('title', 'nadpis výsledku'),
        ('summary', 'shrnutí výsledku'), ('firstStep', 'první krok'),
        ('text', 'popis lhůty'), ('head', 'nadpis kalkulačky'),
    ])
    for i, (typ, t) in enumerate(d, 1):
        radky.append(f'- **[D.{i}]** *{typ}:* {t}')
    radky.append('')

    radky += ['', '## E) PRESCORINGOVÝ MODEL — `js/prescoring.js`', '']
    e = sekce_js('js/prescoring.js', [
        ('label', 'popisek'), ('title', 'nadpis'), ('question', 'otázka'),
        ('hint', 'nápověda'), ('summary', 'shrnutí'), ('text', 'text'),
    ])
    for i, (typ, t) in enumerate(e, 1):
        radky.append(f'- **[E.{i}]** *{typ}:* {t}')
    radky.append('')

    io.open('TEXTY.md', 'w', encoding='utf-8').write('\n'.join(radky) + '\n')
    print(f'TEXTY.md přepsáno — {len(radky)} řádků')


if __name__ == '__main__':
    main()
