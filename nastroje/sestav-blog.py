#!/usr/bin/env python3
"""Sestaví statický blog z blog/posts.json a blog/posts/<slug>.html.

Výstup: blog.html (seznam) a blog/<slug>.html (článek) s plným obsahem v HTML,
takže je vidí vyhledávače i AI bez JavaScriptu. Navigaci a patičku bere
z index.html, aby web vypadal všude stejně.

Spuštění z kořene repa:  python3 nastroje/sestav-blog.py
Nový článek: přidat záznam do blog/posts.json, obsah do blog/posts/<slug>.html,
obrázek do images/blog/<slug>.webp (+ .jpg pro sdílení), pak spustit tento skript.
"""
import html
import json
import re
from pathlib import Path

KOREN = Path(__file__).resolve().parent.parent
WEB = 'https://www.problemovynajemnik.cz'
KATEGORIE = {'tips': 'Tipy', 'legal': 'Právo', 'market': 'Trh a finance'}

index = (KOREN / 'index.html').read_text(encoding='utf-8')


def absolutni(fragment: str) -> str:
    """Relativní odkazy z úvodu přepíše na absolutní (/...), kotvy na /#..."""
    fragment = re.sub(r'(href|src)="#([^"]+)"', r'\1="/#\2"', fragment)
    fragment = re.sub(r'(href|src)="(?!/|https?:|tel:|mailto:|#)([^"]+)"', r'\1="/\2"', fragment)
    return fragment


nav = absolutni(re.search(r'<nav .*?</nav>', index, re.S).group(0))
paticka = absolutni(re.search(r'<footer .*?</footer>', index, re.S).group(0))
paticka = paticka.replace('href="/#" onclick', 'href="#" onclick')

STYL = """
<style>
  body{font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased}
  .clanek{font-size:1.0625rem;line-height:1.75;color:#374151}
  .clanek h2{font-size:1.5rem;line-height:1.3;font-weight:800;color:#111827;margin:2.5rem 0 .75rem}
  .clanek h3{font-size:1.2rem;line-height:1.35;font-weight:700;color:#111827;margin:2rem 0 .5rem}
  .clanek p{margin:0 0 1.1rem}
  .clanek ul,.clanek ol{margin:0 0 1.1rem;padding-left:1.4rem}
  .clanek ul{list-style:disc}.clanek ol{list-style:decimal}
  .clanek li{margin:.3rem 0}
  .clanek a{color:#111827;text-decoration:underline;text-underline-offset:3px}
  .clanek strong{color:#111827}
  .clanek table{width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:.95rem}
  .clanek th,.clanek td{border-top:1px solid #E5E7EB;padding:.6rem .5rem;text-align:left;vertical-align:top}
  .clanek .lead{font-size:1.2rem;color:#1F2937}
  .clanek > div[class*="bg-"]{border-radius:1rem}
  .clanek a[class*="rounded-full"]{text-decoration:none;color:#fff}
</style>"""


def hlava(titulek, popis, url, obrazek, typ, extra=''):
    return f"""<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{html.escape(titulek)}</title>
<meta name="description" content="{html.escape(popis)}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="{typ}">
<meta property="og:title" content="{html.escape(titulek)}">
<meta property="og:description" content="{html.escape(popis)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{obrazek}">
<meta property="og:locale" content="cs_CZ">
<link rel="icon" href="/images/logo.png">
<script src="https://cdn.tailwindcss.com"></script>
<script src="/js/souhlas.js"></script>
{extra}{STYL}
</head>
<body class="bg-white text-gray-900">
<!-- Vygenerováno skriptem nastroje/sestav-blog.py, needitovat ručně. -->
{nav}
"""


def obrazek(p, trida, priorita=False):
    sl = p['slug']
    nacitani = 'fetchpriority="high"' if priorita else 'loading="lazy"'
    return (f'<picture><source type="image/webp" srcset="/images/blog/{sl}.webp">'
            f'<img src="/images/blog/{sl}.jpg" alt="{html.escape(p.get("imageAlt") or p["title"])}" '
            f'width="1200" height="600" {nacitani} class="{trida}"></picture>')


VYZVA = """
<section class="max-w-3xl mx-auto px-6 pb-16">
  <div class="rounded-3xl bg-gray-900 text-white p-8 sm:p-10">
    <h2 class="text-2xl font-extrabold mb-3">Máte s nájemníkem problém právě teď?</h2>
    <p class="text-white/70 mb-6">Za dvě minuty zjistíte, jaké lhůty vám běží a co udělat jako první. Zdarma a bez závazku.</p>
    <div class="flex flex-col sm:flex-row gap-3">
      <a href="/#diagnostika" class="text-center px-6 py-3.5 rounded-full bg-white text-gray-900 font-semibold">Spustit diagnostiku</a>
      <a href="tel:+420603834921" class="text-center px-6 py-3.5 rounded-full border-2 border-white/30 font-semibold">Zavolat 603 834 921</a>
    </div>
  </div>
</section>"""


def karta(p):
    return f"""
  <a href="/blog/{p['slug']}.html" class="block group">
    {obrazek(p, 'w-full aspect-[2/1] object-cover rounded-2xl bg-gray-100')}
    <div class="mt-4 text-sm text-gray-500">{KATEGORIE.get(p.get('category'), '')} · {p.get('readTime', 5)} min čtení</div>
    <h2 class="mt-1 text-xl font-bold leading-snug group-hover:underline">{html.escape(p['title'])}</h2>
    <p class="mt-2 text-gray-600 leading-relaxed">{html.escape(p.get('excerpt', ''))}</p>
  </a>"""


data = json.loads((KOREN / 'blog/posts.json').read_text(encoding='utf-8'))
clanky = sorted(data['posts'], key=lambda p: p['date'], reverse=True)

for p in clanky:
    sl = p['slug']
    obsah = (KOREN / f'blog/posts/{sl}.html').read_text(encoding='utf-8')
    obsah = re.sub(r'^\s*<div class="prose[^"]*">', '', obsah).strip()
    obsah = re.sub(r'</div>\s*$', '', obsah)
    url = f'{WEB}/blog/{sl}.html'
    ld = {
        '@context': 'https://schema.org', '@type': 'BlogPosting',
        'headline': p['title'], 'description': p.get('seoDescription') or p.get('excerpt'),
        'image': f'{WEB}/images/blog/{sl}.jpg', 'datePublished': p['date'],
        'inLanguage': 'cs', 'mainEntityOfPage': url,
        'publisher': {'@type': 'Organization', 'name': 'PTF reality, s.r.o.', 'url': WEB},
    }
    extra = f'<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>\n'
    podobne = [x for x in clanky if x['slug'] != sl and x.get('category') == p.get('category')][:2]
    if len(podobne) < 2:
        podobne += [x for x in clanky if x['slug'] != sl and x not in podobne][:2 - len(podobne)]
    stranka = hlava(f"{p.get('seoTitle') or p['title']} | Problémový nájemník",
                    p.get('seoDescription') or p.get('excerpt', ''), url,
                    f'{WEB}/images/blog/{sl}.jpg', 'article', extra)
    stranka += f"""
<main>
<article class="max-w-3xl mx-auto px-6 pt-10 pb-12">
  <a href="/blog.html" class="inline-flex items-center min-h-[44px] text-sm font-medium text-gray-500 hover:text-gray-900">&larr; Všechny články</a>
  <div class="mt-4 text-sm text-gray-500">{KATEGORIE.get(p.get('category'), '')} · <time datetime="{p['date']}">{p.get('dateFormatted', p['date'])}</time> · {p.get('readTime', 5)} min čtení</div>
  <h1 class="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">{html.escape(p['title'])}</h1>
  <div class="mt-8">{obrazek(p, 'w-full aspect-[2/1] object-cover rounded-2xl bg-gray-100', True)}</div>
  <div class="clanek mt-10">
{obsah}
  </div>
</article>
{VYZVA}
<section class="max-w-3xl mx-auto px-6 pb-20">
  <h2 class="text-xl font-extrabold mb-6">Další články</h2>
  <div class="grid sm:grid-cols-2 gap-10">{''.join(karta(x) for x in podobne)}
  </div>
</section>
</main>
{paticka}
</body>
</html>
"""
    (KOREN / f'blog/{sl}.html').write_text(stranka, encoding='utf-8')

seznam = hlava('Blog pro pronajímatele | Problémový nájemník',
               'Praktické články pro majitele bytů: výběr nájemníka, nájemní smlouva, daně, pojištění a cena nájmu.',
               f'{WEB}/blog.html', f'{WEB}/images/blog/{clanky[0]["slug"]}.jpg', 'website')
seznam += f"""
<main class="max-w-5xl mx-auto px-6 pt-12 pb-20">
  <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">Blog pro pronajímatele</h1>
  <p class="mt-3 text-lg text-gray-600 max-w-2xl">Praktické články pro majitele bytů: výběr nájemníka, smlouva, daně, pojištění a cena nájmu.</p>
  <div class="mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-14">{''.join(karta(p) for p in clanky)}
  </div>
</main>
{VYZVA}
{paticka}
</body>
</html>
"""
(KOREN / 'blog.html').write_text(seznam, encoding='utf-8')
print(f'Hotovo: blog.html a {len(clanky)} článků.')
