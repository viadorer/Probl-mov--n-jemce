# Texty webu problemovynajemnik.cz

Vygenerováno skriptem `nastroje/export-textu.py` ze zdrojových souborů,
aby nic nevypadlo. Po každé změně textů na webu ho spusť znovu:

```bash
python3 nastroje/export-textu.py
```

Každý text má v hranaté závorce označení, kde se na webu nachází —
podle něj mi napiš, co přepsat, nebo rovnou přepiš text v tomhle souboru.

- **A) Homepage** — `index.html`
- **B) Prescoring** — `prescoring.html`
- **C) Teprve budu pronajímat** — `budu-pronajimat.html`
- **D) Průvodce diagnostikou** — texty v JavaScriptu, zobrazí se podle odpovědí
- **E) Prescoringový model** — texty v JavaScriptu, zobrazí se podle zadaných údajů

Sekce vypnuté přes `display:none` se sem nedostanou — když nějaký text chybí,
je pravděpodobně na webu skrytý.

---

## A) HOMEPAGE — `index.html`

### A1. NAVIGACE

- **[A1.1]** *odkaz:* Problémový nájemník
- **[A1.2]** *odkaz:* Co za vás převezmeme
- **[A1.3]** *odkaz:* Ceník
- **[A1.4]** *odkaz:* Prodej s nájemníkem
- **[A1.5]** *odkaz:* Prescoring
- **[A1.6]** *odkaz:* Blog
- **[A1.7]** *odkaz:* 603 834 921 Zavolat

### A2. HERO

- **[A2.1]** *text:* Od 1. 1. 2026 platí nová pravidla
- **[A2.2]** *nadpis H1:* Váš byt zpátky. Starosti nechte na nás.
- **[A2.3]** *odstavec:* Převezmeme případ problémového nájemníka od první výzvy až po předání klíčů. Osmnáct starostí, které dnes řešíte vy, přejde na nás.
- **[A2.4]** *odkaz:* Potřebuji vyřešit problém
- **[A2.5]** *odkaz:* Prodat byt i s nájemníkem
- **[A2.6]** *odstavec:* Nechcete proklikávat formulář? Zavolejte: 603 834 921 · Po–Pá 8:00–17:00
- **[A2.7]** *odstavec:* Teprve se chystáte pronajímat? Prověřte si zájemce zdarma .
- **[A2.8]** *text:* 2–5
- **[A2.9]** *text:* měsíců obvykle k rozkazu
- **[A2.10]** *text:* 180
- **[A2.11]** *text:* minut na odpověď v pracovní době
- **[A2.12]** *text:* 30
- **[A2.13]** *text:* let Davida Choce v realitách

### A3. LHŮTY 2026

- **[A3.1]** *nadpis H2:* Od ledna 2026 máte rychlejší cestu ven. Ale jen na pár měsíců.
- **[A3.2]** *odstavec:* Novela občanského soudního řádu zavedla rozkaz k vyklizení: zkrácené řízení bez jednání, obdoba platebního rozkazu. Byt se dá získat zpět v řádu měsíců místo let. Má to ale tři lhůty, které se dají propásnout.
- **[A3.3]** *text:* Jak dlouho to trvá
- **[A3.4]** *text:* Běžná žaloba na vyklizení
- **[A3.5]** *text:* 12–24 měsíců
- **[A3.6]** *odstavec:* Nájemník ve vašem bytě celou tu dobu bydlí a vy platíte hypotéku ze svého.
- **[A3.7]** *text:* Rozkaz k vyklizení od ledna 2026
- **[A3.8]** *text:* 2–5 měsíců
- **[A3.9]** *odstavec:* Zkrácené řízení bez jednání. Ale jen když jsou papíry v pořádku, lhůty se nepropásnou a nájemník nepodá odpor.
- **[A3.10]** *odstavec:* Délka pruhů odpovídá poměru uvedených měsíců. Jde o obvyklou délku obou řízení, ne o zaručenou lhůtu — konkrétní případ může trvat déle podle vytížení soudu i podle toho, jak se nájemník brání. Rozdíl mezi oběma cestami je ale řádově rok života.
- **[A3.11]** *text:* 3 měsíce
- **[A3.12]** *odstavec:* U nájmu na dobu určitou: když do 3 měsíců po skončení nevyzvete nájemníka písemně k vyklizení, nájem se obnovuje a začínáte znovu.
- **[A3.13]** *text:* 14 dní
- **[A3.14]** *odstavec:* Výzva musí být doručena nejméně 14 dní před podáním návrhu k soudu, do bytu nebo do datové schránky.
- **[A3.15]** *text:* 15 dní
- **[A3.16]** *odstavec:* Tolik má nájemník na odpor. Podaný odpor rozkaz ruší, proto musí být návrh neprůstřelný od prvního dne.
- **[A3.17]** *text:* Kalkulačka lhůty
- **[A3.18]** *nadpis H3:* Kolik vám zbývá na výzvu k vyklizení
- **[A3.19]** *odstavec:* Zadejte datum, kdy nájem skončil. Spočítáme, kolik dní zbývá, než se tříměsíční lhůta zavře a nájem se začne obnovovat.
- **[A3.20]** *popisek:* Datum skončení nájmu
- **[A3.21]** *odstavec:* Výpočet je orientační. Rozhoduje den, kdy nájem skutečně skončil, a u výpovědi to nemusí být datum, které máte v hlavě. Přesné datum ověříme v diagnostice.
- **[A3.22]** *text:* Co musí být doložené
- **[A3.23]** *odstavec:* Písemná nájemní smlouva
- **[A3.24]** *odstavec:* Doklad o skončení nájmu, tedy uplynutí doby, dohoda nebo platná výpověď
- **[A3.25]** *odstavec:* Doklad o doručení výzvy k vyklizení
- **[A3.26]** *odstavec:* Doklad o vlastnictví, typicky výpis z katastru nemovitostí
- **[A3.27]** *odstavec:* Chybí vám něco z toho? Právě proto začínáme diagnostikou. Co se dá doplnit, doplníme, a co se doplnit nedá, řekneme vám rovnou.
- **[A3.28]** *zadání pro fotografa (skryté):* Foto Skutečný rozkaz k vyklizení nebo výzva s dodejkou Anonymizovaný dokument na stole, seshora, denní světlo. Jména začerni, ale nech čitelnou hlavičku soudu, datum a razítko. Vedle obálka s dodejkou. Žádná stocková fotka kladívka. Proč to prodává: většina majitelů rozkaz nikdy neviděla a neví, jestli existuje. Fotka reálného dokumentu z konkrétního případu z abstraktního slibu udělá hmatatelnou věc.

### A4. DIAGNOSTIKA

- **[A4.1]** *nadpis H2:* Zjistěte za dvě minuty, co vám běží a co udělat teď
- **[A4.2]** *odstavec:* Šest otázek. Na konci uvidíte svou situaci, lhůty, které vám běží, odhad délky řešení a konkrétní krok, který musíte udělat do 72 hodin.
- **[A4.3]** *zadání pro fotografa (skryté):* Video · 60 až 90 sekund David mluví přímo do kamery Bez střihu a bez hudby. Sedíš u stolu, za tebou kancelář. Zhruba: „Pokud vám nájemník neplatí nebo se odmítá vystěhovat, tady je jediná věc, kterou musíte udělat tenhle týden.“ Pak řekneš tříměsíční lhůtu a skončíš tím, že diagnostika je zdarma. Proč to prodává: člověk v krizi kupuje člověka, ne službu. Je to jediné místo, kde uvidí, komu bude volat.
- **[A4.4]** *text:* Diagnostika případu
- **[A4.5]** *tlačítko:* ← Zpět
- **[A4.6]** *text:* Zdarma a bez závazku

### A5. CENA ČEKÁNÍ

- **[A5.1]** *nadpis H2:* Každý měsíc čekání platíte vy
- **[A5.2]** *odstavec:* Orientační průběh případu, který se neřeší. Počítáno pro byt s nájemným 18 000 Kč měsíčně.
- **[A5.3]** *text:* 54 000
- **[A5.4]** *text:* Kč po třech měsících. Tady vzniká nárok na výpověď bez výpovědní doby, o kterém většina majitelů neví.
- **[A5.5]** *text:* 266 000
- **[A5.6]** *text:* Kč po roce, včetně nákladů řízení. Nájemník ve vašem bytě dál bydlí zdarma.
- **[A5.7]** *text:* 800 000
- **[A5.8]** *text:* Kč je horní hranice, kam se případ dostane po roce a půl i s opravami a prostojem.
- **[A5.9]** *zadání pro fotografa (skryté):* Foto · dvojice před a po Byt po nájemníkovi, který přestal platit Dvě fotky vedle sebe ze stejného úhlu: stav při předání a stav při vyklizení. Nepotřebuješ zdemolovaný byt, naopak. Nejsilnější je běžný neuklizený byt s plesnivým rohem a hromadou věcí, protože v tom se majitel pozná. Proč to prodává: čísla nad tím jsou abstrakce. Fotka je moment, kdy si člověk představí svůj byt a spočítá, že rekonstrukce bude dražší než cokoli, co mu nabídneš.
- **[A5.10]** *odstavec:* A to jsou pořád jenom peníze. Nejhorší často není dluh. Je to, že do vlastního bytu nemůžete, bojíte se zvednout telefon a doma to probíráte každý večer.
- **[A5.11]** *odstavec:* Proti tomu poměřujte cenu jakéhokoli řešení. Nejdražší varianta je vždycky ta, kde se čeká.

### A6. OSMNÁCT STAROSTÍ

- **[A6.1]** *nadpis H2:* Osmnáct starostí, které přestanou být vaše
- **[A6.2]** *odstavec:* Vlevo je váš dnešek, vpravo den po podpisu. Projděte si to a spočítejte, kolik z levé strany jste dělali za poslední měsíc.
- **[A6.3]** *text:* 01 · Komunikace a klid
- **[A6.4]** *text:* Skládáte mu zprávy tak, aby to neznělo měkce, ale ani abyste si tím neuškodili
- **[A6.5]** *text:* Nepíšete mu vůbec. Komunikaci vedeme my a nereagujeme v afektu
- **[A6.6]** *text:* Patnáctého otevíráte bankovnictví a koukáte, jestli přišla platba
- **[A6.7]** *text:* Platby hlídáme my a víme, co se má stát ten den, kdy nepřijdou
- **[A6.8]** *text:* Jezdíte k bytu a přemýšlíte, koho potkáte na chodbě
- **[A6.9]** *text:* Na místo jezdíme my. Do bytu jen po dohodě s nájemníkem, jinak až při vyklizení
- **[A6.10]** *text:* Odpovídáte sousedům a výboru na stížnosti, které nemůžete ovlivnit
- **[A6.11]** *text:* Stížnosti přebíráme a rovnou z nich děláme doklady do spisu
- **[A6.12]** *text:* Tlačí na vás po telefonu, ať mu dáte ještě měsíc, a vy nevíte, jestli povolit
- **[A6.13]** *text:* Sliby i nátlak jdou na nás a vyhodnotíme je podle spisu, ne podle nálady
- **[A6.14]** *text:* 02 · Papíry, lhůty a právo
- **[A6.15]** *text:* Večer čtete diskuze o tom, co je rozkaz k vyklizení a jestli se vás týká
- **[A6.16]** *text:* Nemusíte to vědět. My víme, která ze tří lhůt vám běží a kdy vyprší
- **[A6.17]** *text:* Chodíte na poštu, hlídáte dodejky a řešíte, že si zásilku nepřevzal
- **[A6.18]** *text:* Doručujeme sami, na správné adresy a s dokladem, který obstojí u soudu
- **[A6.19]** *text:* Obvoláváte advokáty, porovnáváte sazby a máte složit zálohu bez záruky
- **[A6.20]** *text:* Advokátku máme. Rozpočet znáte předem a naše odměna je až po předání klíčů
- **[A6.21]** *text:* Nevíte, jestli jste už něco nepokazili tou SMS nebo přijatou částkou
- **[A6.22]** *text:* S advokátkou projdeme, co jste zatím udělali. Co se dá napravit, napravíme
- **[A6.23]** *text:* Skládáte dohromady výpisy, zprávy a fotky a nevíte, co z toho je důkaz
- **[A6.24]** *text:* Spis sestavíme za vás a víme, co soud u rozkazu vyžaduje
- **[A6.25]** *text:* 03 · Soud a vyklizení
- **[A6.26]** *text:* Berete si volno v práci na jednání, o kterých nevíte, kolik jich bude
- **[A6.27]** *text:* Rozkaz k vyklizení se vydává bez jednání a zastupuje vás advokátka. Když nájemník podá odpor, jednání bude, ale nepůjdete na něj sami
- **[A6.28]** *text:* Sháníte exekutora a domlouváte termín vyklizení
- **[A6.29]** *text:* Vyklizení domluvíme, zkoordinujeme a jsme u něj
- **[A6.30]** *text:* Nevíte, kam s jeho věcmi. Vyhodit se nesmí, ale skladovat je nemáte kde
- **[A6.31]** *text:* Při vyklizení jsme s exekutorem a hlídáme soupis i úschovu věcí, aby vám z toho nevznikla další žaloba
- **[A6.32]** *text:* Musíte být u předání a odhadovat, co je ještě běžné opotřebení
- **[A6.33]** *text:* Zámky, odečty, protokol a fotodokumentace jsou na nás
- **[A6.34]** *text:* 04 · A co bude potom
- **[A6.35]** *text:* Sháníte řemeslníky a čekáte na nabídky, byt zatím stojí prázdný
- **[A6.36]** *text:* Soupis oprav, nabídka a koordinace řemeslníků, ať nestojí déle, než musí
- **[A6.37]** *text:* Řešíte přepisy energií a vyúčtování, které nemáte z čeho pokrýt
- **[A6.38]** *text:* Odečty, přepisy i dluh na službách vyčíslíme a uplatníme
- **[A6.39]** *text:* Musíte hned shánět dalšího nájemníka a doufat, že tenhle bude lepší
- **[A6.40]** *text:* Nemusíte. A až budete chtít, byt vám pronajmeme s prověřeným nájemníkem, případně ho budeme i spravovat
- **[A6.41]** *text:* Mluvíte o tom doma každý večer a nemůžete kvůli tomu spát
- **[A6.42]** *text:* Přestanete. Případ vedeme my, vy se dozvíte, co je nového
- **[A6.43]** *nadpis H3:* A co zůstane na vás
- **[A6.44]** *odstavec:* Nebudeme tvrdit, že nic. Jsou tři věci, které za vás udělat nemůžeme. Jinou práci od vás nechceme.
- **[A6.45]** *text:* Dodat, co máte
- **[A6.46]** *odstavec:* Smlouvu, výpisy plateb a komunikaci s nájemníkem. Jednou, na začátku.
- **[A6.47]** *text:* Podepsat plnou moc
- **[A6.48]** *odstavec:* Bez ní za vás nemůžeme jednat. Připravíme ji a vysvětlíme, co přesně pokrývá.
- **[A6.49]** *text:* Rozhodnout dvakrát
- **[A6.50]** *odstavec:* Jestli přijmout případnou dohodu a jestli si byt necháte, nebo ho prodáte.

### A7. PROGRAM KLÍČE ZPĚT

- **[A7.1]** *text:* Program Klíče zpět
- **[A7.2]** *nadpis H2:* Případ převezmeme celý. Vy podepisujete.
- **[A7.3]** *odstavec:* Od první výzvy až po předání vyklizeného bytu. Právní úkony dělá advokátka, všechno ostatní my.
- **[A7.4]** *text:* Diagnostika a písemný plán
- **[A7.5]** *odstavec:* Projdeme smlouvu, platby a komunikaci. Časová osa a rozpočet předem, žádné účtování po hodinách.
- **[A7.6]** *text:* Kompletní listinná složka
- **[A7.7]** *odstavec:* Výzvu a výpověď připraví advokátka. My sesbíráme podklady, zajistíme doručení s dokladem, protokoly a fotodokumentaci.
- **[A7.8]** *text:* Komunikaci s nájemníkem přebíráme
- **[A7.9]** *odstavec:* Telefonáty, e-maily i osobní jednání vedeme my. Vy se s ním nemusíte vidět ani slyšet.
- **[A7.10]** *text:* Návrh na rozkaz k vyklizení a koordinace vyklizení
- **[A7.11]** *odstavec:* Návrh podává a u soudu vás zastupuje advokátka na základě vaší smlouvy s ní. My koordinujeme vyklizení: exekutor, stěhování, výměna zámků, převzetí bytu.
- **[A7.12]** *text:* Vyčíslení a vymáhání dluhu
- **[A7.13]** *odstavec:* Dlužné nájemné, škody a náklady sečteme a advokátka je uplatní. Kolik se reálně vymůže, záleží na majetku nájemníka.
- **[A7.14]** *text:* A k tomu, protože nechceme, abyste to řešili znovu
- **[A7.15]** *odstavec:* Tři služby, které jinak prodáváme samostatně. V programu je nedoplácíte.
- **[A7.16]** *text:* Prověření dalšího nájemníka.
- **[A7.17]** *text:* Insolvenční rejstřík, evidence exekucí, ověření příjmu, reference.
- **[A7.18]** *text:* 3 900 Kč
- **[A7.19]** *text:* Nájemní smlouva od advokátky, připravená na rok 2026.
- **[A7.20]** *text:* Splňuje podmínky pro rozkaz k vyklizení včetně doručování do datové schránky.
- **[A7.21]** *text:* 4 900 Kč
- **[A7.22]** *text:* Dvanáct měsíců hlídání plateb.
- **[A7.23]** *text:* Při prvním zpoždění jednáme hned. Právě tam vzniká další průšvih.
- **[A7.24]** *text:* 8 280 Kč
- **[A7.25]** *text:* Hodnota, kterou nedoplácíte
- **[A7.26]** *text:* 17 080 Kč
- **[A7.27]** *zadání pro fotografa (skryté):* Foto Listinná složka jednoho případu, rozložená na stole Seshora rozložené papíry: smlouva, výzva, výpověď, dodejky, protokol, fotodokumentace, návrh k soudu. Klidně dvacet listů přes celý stůl. Anonymizuj jména, ale ať je vidět objem. Proč to prodává: vizuální ospravedlnění ceny. Dokud vidí jen odrážky, cena zní vysoko. Když uvidí, kolik papírů by musel obstarat sám, zní levně.
- **[A7.28]** *text:* Na začátku zaplatíte
- **[A7.29]** *text:* 9 900 Kč
- **[A7.30]** *odstavec:* Aktivační poplatek. Převezmeme případ, založíme spis a připravíme plnou moc. Odečítá se od konečné odměny. Když případ nevezmeme nebo byt nezískáme zpátky, vracíme ho celý.
- **[A7.31]** *text:* Až po předání klíčů
- **[A7.32]** *text:* Odměna za výsledek
- **[A7.33]** *odstavec:* Konkrétní částku uvidíte v písemném plánu dřív, než cokoli podepíšete. Bez výsledku nevzniká.
- **[A7.34]** *text:* Za výsledek platíte, jen když výsledek je
- **[A7.35]** *odrážka:* Nedopadne to, odměnu neplatíte. Aktivační poplatek vracíme. Zůstávají jen poplatky soudu a exekutora a služby advokátky podle smlouvy s ní.
- **[A7.36]** *odrážka:* Beznadějný případ řekneme rovnou. Co nedává smysl, nebereme a neúčtujeme.
- **[A7.37]** *odrážka:* Nechcete čekat? Byt se dá prodat. I s nájemníkem uvnitř, investorovi, který s tím počítá.
- **[A7.38]** *odkaz:* Zjistit, jak by to vypadalo u mě

### A8. ODKUP

- **[A8.1]** *text:* Druhá cesta
- **[A8.2]** *nadpis H2:* Nechcete to řešit vůbec? Byt se dá prodat i s nájemníkem uvnitř.
- **[A8.3]** *odstavec:* Někdo chce klíče zpátky. Někdo už jenom chce mít pokoj. Tohle je pro druhou skupinu. Byt oceníme a nabídneme investorům, kteří kupují obsazené byty a vyklizení si řeší sami. Vy podepíšete kupní smlouvu a končíte. Dluh nájemníka vám zůstává, pokud se s kupcem nedohodnete na jeho postoupení.
- **[A8.4]** *text:* Kdy to dává smysl
- **[A8.5]** *odstavec:* Když nemáte písemnou smlouvu a čeká vás běžná žaloba. Když případ běží přes rok. Nebo když si spočítáte, že rekonstrukce po vyklizení bude dražší než rozdíl v ceně.
- **[A8.6]** *text:* Za kolik
- **[A8.7]** *odstavec:* Cena odpovídá stavu bytu a tomu, že je obsazený. Nebudeme předstírat, že dostanete tržní cenu prázdné nemovitosti. Odhad ceny dostanete předem a prodej je otázka měsíců, ne let soudu.
- **[A8.8]** *text:* Co k tomu potřebujeme
- **[A8.9]** *odstavec:* Adresu a dispozici, v jakém stavu je nájem a jestli je na bytě zástava nebo exekuce. Víc na začátek ne.
- **[A8.10]** *text:* Nezávazně a bez poplatku
- **[A8.11]** *text:* Chci byt prodat i s nájemníkem
- **[A8.12]** *odstavec:* Ozveme se s odhadem ceny. Diagnostiku případu k tomu nepotřebujete — tahle cesta jde mimo ni.
- **[A8.13]** *odkaz:* Zavolat: 603 834 921
- **[A8.14]** *odkaz:* Napsat e-mailem
- **[A8.15]** *odstavec:* V e-mailu máte předvyplněné, co potřebujeme vědět.

### A9. PRESCORING

- **[A9.1]** *text:* Zdarma
- **[A9.2]** *nadpis H2:* Prescoring nájemníka
- **[A9.3]** *odstavec:* Orientační bodový model. Zadáte, co o zájemci víte, a dostanete skóre od 0 do 100, seznam rizikových faktorů a konkrétní pojistky do smlouvy právě u tohohle člověka.
- **[A9.4]** *odstavec:* Spousta problémů se dá zastavit tady. Ne u soudu, ale u stolu před podpisem.
- **[A9.5]** *odkaz:* Spustit prescoring zdarma
- **[A9.6]** *zadání pro fotografa (skryté):* Screenshot Skutečný výstup prescoringu Snímek výsledku s velkým skóre, pásmem a rozpadem rizik. Ideálně případ, který dopadl špatně. Vyfoť to i na mobilu v ruce, většina lidí to otevře v telefonu. Proč to prodává: nikdo neklikne na nástroj, o kterém neví, jak vypadá. Náhled výstupu zvedne prokliky a ukáže, že to není další formulář na sběr e-mailů.

### A10. ZAKÁZANÁ ŘEŠENÍ

- **[A10.1]** *nadpis H2:* Čtyři věci, které vás napadnou. Ani jednu nedělejte.
- **[A10.2]** *odstavec:* Tohle si majitelé hledají nejčastěji, obvykle pozdě večer, když jim dojde trpělivost. Chápeme proč. Problém je, že každá z nich obrátí případ proti vám — a vy jste do té chvíle byli ta strana, která má pravdu.
- **[A10.3]** *text:* Vyměnit zámek
- **[A10.4]** *odstavec:* Dokud nájemník byt fakticky užívá, je chráněný, i když nájem už skončil. Výměnou zámku mu bráníte v přístupu k jeho věcem a do jeho obydlí.
- **[A10.5]** *text:* Co z toho bývá
- **[A10.6]** *odstavec:* Domáhá se obnovení stavu, vy platíte zámečníka podruhé a k tomu jeho náklady. V horším případě je z toho trestní rovina a vy se ze žalobce stanete obviněným.
- **[A10.7]** *text:* Odpojit vodu, elektřinu nebo topení
- **[A10.8]** *odstavec:* Nejčastější rada z diskuzí a nejdražší omyl. Odběr služeb souvisí s bydlením, ne s tím, jestli je někdo platí.
- **[A10.9]** *text:* Co z toho bývá
- **[A10.10]** *odstavec:* Nárok na náhradu škody a silný argument pro nájemníka u soudu. Případ, který byl o jeho dluhu, je najednou o vašem jednání.
- **[A10.11]** *text:* Zavolat policii, ať ho vystěhuje
- **[A10.12]** *odstavec:* Policie spor mezi pronajímatelem a nájemníkem neřeší, je to soukromoprávní věc. Přijede kvůli narušení pořádku, ale nikoho nevystěhuje.
- **[A10.13]** *text:* Jak to je
- **[A10.14]** *odstavec:* Vyklizení nařizuje soud a provádí exekutor nebo soudní vykonavatel. Jiná cesta neexistuje — proto je celý spor o to, jak rychle se k tomu rozhodnutí dostanete.
- **[A10.15]** *text:* Vystěhovat mu věci nebo si je nechat
- **[A10.16]** *odstavec:* Ani po vyklizení nejsou jeho věci vaše. Zadržovací právo má úzké podmínky a svépomocné vyklizení mezi ně nepatří.
- **[A10.17]** *text:* Co z toho bývá
- **[A10.18]** *odstavec:* Odpovědnost za škodu na věcech, jejichž hodnotu si určí on. Proto se u řádného vyklizení dělá soupis a věci jdou do úschovy.
- **[A10.19]** *nadpis H3:* Legální cesta existuje a od ledna 2026 trvá měsíce, ne roky
- **[A10.20]** *odstavec:* Důvod, proč lidé sahají po zkratkách, je ten, že řádná cesta bývala nekonečná. To se změnilo. Rozkaz k vyklizení se vydává bez jednání a rozhodnutí může přijít za dva až pět měsíců — pokud jsou papíry v pořádku, lhůty se nepropásnou a nájemník nepodá odpor.
- **[A10.21]** *odkaz:* Zjistit, jak dlouho by to trvalo u mě
- **[A10.22]** *odkaz:* 603 834 921

### A11. FAQ

- **[A11.1]** *nadpis H2:* Na co se ptají nejčastěji
- **[A11.2]** *odstavec:* Informace na této stránce jsou orientační a nenahrazují právní poradenství. Konkrétní kroky ve vašem případě konzultujeme s advokátem.

### A12. ZÁVĚREČNÉ CTA

- **[A12.1]** *nadpis H2:* Každý měsíc, který uplyne, zaplatíte vy
- **[A12.2]** *odstavec:* Diagnostika trvá dvě minuty a je zdarma. Když z toho nic nebude, aspoň budete vědět, na čem jste.
- **[A12.3]** *odkaz:* Spustit diagnostiku
- **[A12.4]** *odkaz:* 603 834 921

### A13. PATIČKA

- **[A13.1]** *text:* Problémový nájemník
- **[A13.2]** *odstavec:* Vedení případů problémových nájemníků od výzvy po předání klíčů. Právní úkony zajišťuje advokátka Zuzana Schneider Valentová.
- **[A13.3]** *text:* Kontakt
- **[A13.4]** *odrážka:* +420 603 834 921
- **[A13.5]** *odrážka:* info@ptf.cz
- **[A13.6]** *odrážka:* Po–Pá 8:00–17:00
- **[A13.7]** *text:* Další
- **[A13.8]** *odrážka:* Prescoring nájemníka zdarma
- **[A13.9]** *odrážka:* Teprve budu pronajímat
- **[A13.10]** *odrážka:* Blog
- **[A13.11]** *text:* © 2026 PTF reality, s.r.o., IČO 06684394, Dřevěná 99/3, 301 00 Plzeň, zapsaná u Krajského soudu v Plzni, C 35601
- **[A13.12]** *odkaz:* Ochrana osobních údajů
- **[A13.13]** *odkaz:* Cookies
- **[A13.14]** *odkaz:* Obchodní podmínky

### A14. STICKY CTA NA MOBILU

- **[A14.1]** *odkaz:* Zavolat
- **[A14.2]** *odkaz:* Spustit diagnostiku


## B) PRESCORING — `prescoring.html`

### B1. HERO

- **[B1.1]** *text:* Zdarma · bez registrace
- **[B1.2]** *nadpis H1:* Zjistěte, koho si pouštíte do bytu. Než podepíšete.
- **[B1.3]** *odstavec:* Orientační bodový model. Skóre od 0 do 100, seznam rizikových faktorů a konkrétní pojistky, které patří do smlouvy právě u tohoto nájemníka.
- **[B1.4]** *odstavec:* Co o zájemci nevíte, nechte prázdné. Model s tím počítá a chybějící ověření sám vyhodnotí jako riziko.

### B2. PRŮVODCE

- **[B2.1]** *popisek:* Měsíční nájemné (Kč)
- **[B2.2]** *odstavec:* Včetně záloh na služby, tedy co má reálně platit.
- **[B2.3]** *popisek:* Počet osob v domácnosti
- **[B2.4]** *popisek:* Délka současného zaměstnání (měsíce)
- **[B2.5]** *odstavec:* Pod šest měsíců je to samo o sobě riziko.
- **[B2.6]** *popisek:* Typ zaměstnání
- **[B2.7]** *volba:* Hlavní pracovní poměr
- **[B2.8]** *volba:* DPP nebo DPČ
- **[B2.9]** *volba:* OSVČ
- **[B2.10]** *volba:* Student
- **[B2.11]** *volba:* Důchodce
- **[B2.12]** *volba:* Bez zaměstnání
- **[B2.13]** *popisek:* Zkušenosti s pronájmem
- **[B2.14]** *volba:* Nevím / neptal jsem se
- **[B2.15]** *volba:* Doložené dobré reference
- **[B2.16]** *volba:* První nájem
- **[B2.17]** *volba:* Negativní zkušenost
- **[B2.18]** *odstavec:* Když kontakt na předchozího pronajímatele odmítá dát, je to samo o sobě odpověď.
- **[B2.19]** *popisek:* Hlavní příjem (čistý, Kč)
- **[B2.20]** *popisek:* Příjem partnera (Kč)
- **[B2.21]** *popisek:* Dodatečné příjmy (Kč)
- **[B2.22]** *popisek:* Příjmy spolubydlících (Kč)
- **[B2.23]** *popisek:* Sociální dávky (Kč)
- **[B2.24]** *popisek:* Stabilita příjmů
- **[B2.25]** *volba:* Stabilní
- **[B2.26]** *volba:* Rostoucí
- **[B2.27]** *volba:* Proměnlivé
- **[B2.28]** *volba:* Klesající
- **[B2.29]** *popisek:* Doložení příjmů
- **[B2.30]** *volba:* Potvrzení zaměstnavatele
- **[B2.31]** *volba:* Jen výpisy z účtu
- **[B2.32]** *volba:* Nedoloženo, jen tvrzení
- **[B2.33]** *popisek:* Sezónní práce
- **[B2.34]** *popisek:* Ve zkušební době
- **[B2.35]** *popisek:* Všichni podepíší
- **[B2.36]** *popisek:* Splátky úvěrů (Kč)
- **[B2.37]** *popisek:* Kreditní karty (Kč)
- **[B2.38]** *popisek:* Výživné (Kč)
- **[B2.39]** *popisek:* Pojištění (Kč)
- **[B2.40]** *popisek:* Jiné nájmy (Kč)
- **[B2.41]** *popisek:* Životní náklady (Kč)
- **[B2.42]** *odstavec:* Jídlo, doprava, telefon. Odhad stačí.
- **[B2.43]** *popisek:* Finanční rezerva (Kč)
- **[B2.44]** *odstavec:* Rezerva pod jeden nájem je varovný signál.
- **[B2.45]** *popisek:* Historie dluhů
- **[B2.46]** *volba:* Bez problémů
- **[B2.47]** *volba:* Drobné problémy
- **[B2.48]** *volba:* Vážné problémy
- **[B2.49]** *volba:* Insolvence nebo exekuce
- **[B2.50]** *popisek:* Kontrola v rejstřících
- **[B2.51]** *volba:* Neprověřeno
- **[B2.52]** *volba:* Insolvenční rejstřík čistý
- **[B2.53]** *volba:* Evidence exekucí čistá
- **[B2.54]** *volba:* Nalezena exekuce
- **[B2.55]** *volba:* Nalezena insolvence
- **[B2.56]** *odstavec:* Insolvenční rejstřík i centrální evidenci exekucí si můžete ověřit sami. Prověření zájemce děláme i za vás.
- **[B2.57]** *popisek:* Má aktivní exekuci
- **[B2.58]** *popisek:* Nájemník má ručitele
- **[B2.59]** *popisek:* Měsíční příjem ručitele (Kč)
- **[B2.60]** *popisek:* Zaměstnání ručitele
- **[B2.61]** *volba:* Stabilní zaměstnání
- **[B2.62]** *volba:* Vlastník nemovitosti
- **[B2.63]** *volba:* OSVČ
- **[B2.64]** *volba:* Jiné
- **[B2.65]** *popisek:* Zadlužení ručitele
- **[B2.66]** *volba:* Žádné
- **[B2.67]** *volba:* Střední
- **[B2.68]** *volba:* Vysoké
- **[B2.69]** *popisek:* Vztah k nájemníkovi
- **[B2.70]** *volba:* Rodina
- **[B2.71]** *volba:* Známý
- **[B2.72]** *volba:* Jiný
- **[B2.73]** *tlačítko:* Zpět
- **[B2.74]** *text:* Našli jsme rizikových faktorů a konkrétních doporučení Rozpad ukazuje, co přesně tohle skóre srazilo dolů, a co si u tohohle nájemníka ošetřit ve smlouvě, aby vás to nestálo peníze. Hned ho zobrazíme. Jméno a příjmení vas@email.cz Souhlasím se zpracováním jména a e-mailu, aby mi PTF reality zobrazila rozpad a doporučení. Nepovinné: můžete se mi ozvat s nabídkou prověření nájemníka, pronájmu nebo správy. Údaje o zájemci zadáváte bez jména. Ukládáme jen výsledné skóre a doporučení, ne vyplněné údaje. Co skóre srazilo dolů ✕ Co si u tohohle nájemníka ošetřit ✓ Skóre vám řekne riziko. Nezbaví vás ho. Prověříme zájemce v insolvenčním rejstříku a evidenci exekucí, ověříme příjem, zavoláme předchozímu pronajímateli a připravíme smlouvu, která obstojí u soudu. A pokud už problémového nájemníka v bytě máte, řešíme i to. 603 834 921 Už mám problém Výsledek je orientační pomůcka, nikoli rozhodnutí, a nenahrazuje právní ani finanční poradenství. Při zpracování údajů o zájemcích postupujte v souladu s GDPR a uchovávejte jen to, co potřebujete.
- **[B2.75]** *text:* Průběžné skóre
- **[B2.76]** *text:* Bonita nájemníka
- **[B2.77]** *text:* ze 100
- **[B2.78]** *text:* Nájem k příjmu
- **[B2.79]** *text:* Zbyde po závazcích
- **[B2.80]** *text:* Rezerva v nájmech
- **[B2.81]** *text:* Zadlužení k příjmu
- **[B2.82]** *text:* Spolehlivost výsledku
- **[B2.83]** *odstavec:* Dokud nejsou ověřené rejstříky, doložený příjem a reference, výsledek nemůže vyjít jako nízké riziko. Je to odhad na základě tvrzení zájemce.
- **[B2.84]** *odstavec:* Všechna klíčová ověření jsou hotová. Skóre stojí na doložených údajích.
- **[B2.85]** *tlačítko:* ← Upravit údaje
- **[B2.86]** *odstavec:* Výpočet běží u vás v prohlížeči. Nic se neodesílá, dokud sami nechcete.
- **[B2.87]** *text:* Problémový nájemník
- **[B2.88]** *odstavec:* Vedení případů problémových nájemníků od výzvy po předání klíčů. Právní úkony zajišťuje advokátka Zuzana Schneider Valentová.
- **[B2.89]** *text:* Kontakt
- **[B2.90]** *odrážka:* +420 603 834 921
- **[B2.91]** *odrážka:* info@ptf.cz
- **[B2.92]** *odrážka:* Po–Pá 8:00–17:00
- **[B2.93]** *text:* Další
- **[B2.94]** *odrážka:* Mám problémového nájemníka
- **[B2.95]** *odrážka:* Teprve budu pronajímat
- **[B2.96]** *odrážka:* Blog
- **[B2.97]** *text:* © 2026 problemovynajemnik.cz
- **[B2.98]** *odkaz:* Ochrana osobních údajů
- **[B2.99]** *odkaz:* Cookies
- **[B2.100]** *odkaz:* Obchodní podmínky


## C) TEPRVE BUDU PRONAJÍMAT — `budu-pronajimat.html`

### C1. STRÁNKA

- **[C1.1]** *text:* Pro začínající pronajímatele
- **[C1.2]** *nadpis H1:* Začněte s pronájmem bez starostí a rizik
- **[C1.3]** *odstavec:* Profesionální přístup k pronájmu vám ušetří čas, peníze i nervy. Připravíme vás na bezproblémový pronájem.
- **[C1.4]** *odstavec:* Tato stránka je určena výhradně pro majitele nemovitostí, kteří se chystají poprvé pronajímat.
- **[C1.5]** *odkaz:* Nechci udělat chybu při pronájmu
- **[C1.6]** *nadpis H2:* Proč je profesionální přístup klíčový už od začátku
- **[C1.7]** *text:* Začátek rozhoduje
- **[C1.8]** *odstavec:* Řadě problémů s nájemníky jde předejít prověřením zájemce, dobrou smlouvou a kaucí.
- **[C1.9]** *odstavec:* Pronájem nemovitosti není jen o podpisu smlouvy a vybírání nájemného. První kroky rozhodují o tom, zda váš pronájem bude bezproblémový nebo se promění v noční můru.
- **[C1.10]** *nadpis H3:* Co riskujete při amatérském přístupu:
- **[C1.11]** *odrážka:* Problémové nájemníky, které bude těžké vystěhovat
- **[C1.12]** *odrážka:* Neplacení nájemného a složité vymáhání
- **[C1.13]** *odrážka:* Poškození vašeho majetku bez možnosti kompenzace
- **[C1.14]** *odrážka:* Právní komplikace a nákladné soudní spory
- **[C1.15]** *odrážka:* Ztrátu času i peněz řešením problémů
- **[C1.16]** *nadpis H2:* 5 klíčových kroků, které vám zajistí bezproblémový pronájem
- **[C1.17]** *nadpis H3:* Profesionální příprava nemovitosti
- **[C1.18]** *odstavec:* Správně připravená nemovitost přiláká kvalitní nájemníky a minimalizuje budoucí spory.
- **[C1.19]** *nadpis:* Proč je to důležité:
- **[C1.20]** *odrážka:* Přehledná dokumentace výchozího stavu nemovitosti
- **[C1.21]** *odrážka:* Profesionální fotografie a prezentace přilákají solidnější nájemníky
- **[C1.22]** *odrážka:* Preventivní řešení technických nedostatků zabrání budoucím problémům
- **[C1.23]** *odstavec:* Náš tip: "Detailní fotodokumentace každé místnosti před pronájmem je nenahraditelná při pozdějších sporech o stavu nemovitosti."
- **[C1.24]** *nadpis H3:* Důkladné prověření nájemníka
- **[C1.25]** *odstavec:* Důsledné prověření je vaší nejlepší ochranou před budoucími problémy.
- **[C1.26]** *nadpis:* Na co se zaměřit:
- **[C1.27]** *odrážka:* Ověření bonity a platební historie
- **[C1.28]** *odrážka:* Kontrola v registrech dlužníků
- **[C1.29]** *odrážka:* Reference od předchozích pronajímatelů
- **[C1.30]** *odrážka:* Osobní setkání a komunikace
- **[C1.31]** *odrážka:* Pracovní smlouva a potvrzení o příjmu
- **[C1.32]** *odstavec:* Náš tip: "Nestačí jen kontrola registrů. Osobní setkání a důkladný rozhovor o očekáváních obou stran často odhalí potenciální problémy."
- **[C1.33]** *nadpis H3:* Profesionální nájemní smlouva
- **[C1.34]** *odstavec:* Správně sestavená smlouva je vaší pojistkou proti většině problémů.
- **[C1.35]** *nadpis:* Klíčové prvky smlouvy:
- **[C1.36]** *odrážka:* Jasné vymezení práv a povinností
- **[C1.37]** *odrážka:* Přesné určení výše a splatnosti nájemného
- **[C1.38]** *odrážka:* Úrok z prodlení a jasný postup při pozdní platbě
- **[C1.39]** *odrážka:* Pravidla pro ukončení nájmu
- **[C1.40]** *odrážka:* Notářský zápis s doložkou přímé vykonatelnosti
- **[C1.41]** *odstavec:* Náš tip: "Investice do právně ošetřené nájemní smlouvy je zlomkem částky, kterou byste zaplatili za řešení problémů s nevhodným nájemníkem."
- **[C1.42]** *nadpis H3:* Detailní předávací protokol
- **[C1.43]** *odstavec:* Precizní dokumentace stavu při předání nemovitosti je zásadní pro předcházení sporům.
- **[C1.44]** *nadpis:* Co musí obsahovat:
- **[C1.45]** *odrážka:* Detailní popis stavu všech prostor a vybavení
- **[C1.46]** *odrážka:* Fotodokumentaci všech místností a případných vad
- **[C1.47]** *odrážka:* Stavy měřičů energií a médií
- **[C1.48]** *odrážka:* Soupis předaných klíčů a dálkových ovladačů
- **[C1.49]** *odrážka:* Podpisy obou stran na každé straně protokolu
- **[C1.50]** *odstavec:* Náš tip: "Nespěchejte při předávání nemovitosti. Věnujte protokolu dostatek času a projděte s nájemníkem každý detail. Ušetříte si budoucí spory."
- **[C1.51]** *nadpis H3:* Pravidelná kontrola a komunikace
- **[C1.52]** *odstavec:* Aktivní správa a kontrola nemovitosti vám pomůže rychle odhalit potenciální problémy.
- **[C1.53]** *nadpis:* Osvědčené postupy:
- **[C1.54]** *odrážka:* Pravidelné, předem domluvené kontroly stavu nemovitosti
- **[C1.55]** *odrážka:* Rychlá reakce na problémy nahlášené nájemníkem
- **[C1.56]** *odrážka:* Evidence plateb a okamžité řešení prodlení
- **[C1.57]** *odrážka:* Jasná a profesionální komunikace
- **[C1.58]** *odrážka:* Dokumentace všech interakcí s nájemníkem
- **[C1.59]** *odstavec:* Náš tip: "Nastavte si systém upozornění na datum platby nájmu a kontaktujte nájemníka hned první den po prodlení. Čím dříve problém řešíte, tím lépe."
- **[C1.60]** *nadpis H2:* Časté chyby, které dělají noví pronajímatelé
- **[C1.61]** *odstavec:* Vyvarujte se těchto problémů a ušetřete si bolesti hlavy, čas i peníze
- **[C1.62]** *nadpis H3:* Nedostatečné prověření nájemníka
- **[C1.63]** *odstavec:* Mnoho majitelů nemovitostí vybírá nájemníky pouze podle prvního dojmu a neprovádí důkladné prověření.
- **[C1.64]** *odstavec:* Důsledky: Dluhy a exekuce zájemce jsou veřejně dohledatelné. Kdo je nezkontroluje, zjistí je až od exekutora.
- **[C1.65]** *nadpis H3:* Nekvalitní nájemní smlouva
- **[C1.66]** *odstavec:* Používání šablon z internetu nebo nevhodných formulářových smluv bez konzultace s právníkem.
- **[C1.67]** *odstavec:* Důsledky: Nespecifické nebo neúplné smlouvy vedou k právním sporům a prodloužení procesu vystěhování problémového nájemníka o 3-8 měsíců.
- **[C1.68]** *nadpis H3:* Tolerování opožděných plateb
- **[C1.69]** *odstavec:* Přehlížení pozdních plateb nájmu v počátcích nastavuje špatný precedens.
- **[C1.70]** *odstavec:* Důsledky: Neplacení často začíná drobnými opožděními. Kdo je přehlíží, přijde o čas na výzvu a výpověď.
- **[C1.71]** *nadpis H3:* Špatně stanovené nájemné
- **[C1.72]** *odstavec:* Stanovení nájemného bez analýzy trhu nebo naopak přecenění nemovitosti.
- **[C1.73]** *odstavec:* Důsledky: Příliš nízké nájemné snižuje příjmy a přitahuje méně solventní nájemníky. Příliš vysoké vede k dlouhým obdobím bez nájemníka.
- **[C1.74]** *nadpis H3:* Nevedení řádné dokumentace
- **[C1.75]** *odstavec:* Nedostatečná evidence komunikace, kontrol a stavu nemovitosti.
- **[C1.76]** *odstavec:* Důsledky: Bez protokolu a fotek výchozího stavu se škoda u soudu těžko dokazuje.
- **[C1.77]** *nadpis H3:* Podcenění pojištění
- **[C1.78]** *odstavec:* Ignorování pojištění nebo nedostatečné pokrytí specifických rizik spojených s pronájmem.
- **[C1.79]** *odstavec:* Důsledky: Škodu nad výši kauce pak platíte ze svého.
- **[C1.80]** *nadpis H2:* Ochrana a jistota pro vaše nemovitosti
- **[C1.81]** *odstavec:* Zajistíme vám bezproblémový pronájem bez rizika, se smluvní ochranou a prověřenými nájemníky
- **[C1.82]** *nadpis H3:* Komplexní právní ochrana
- **[C1.83]** *odstavec:* Získáte profesionálně sestavenou nájemní smlouvu, předávací protokol a všechny dokumenty potřebné k bezpečnému pronájmu. Vše připraveno právníky specializovanými na nájemní právo.
- **[C1.84]** *nadpis H3:* Důkladné prověření nájemníků
- **[C1.85]** *odstavec:* Využíváme speciální metodiku pro výběr spolehlivosti plateb a historií nájemníků. Prověříme rejstříky, předchozí nájmy a platební morálku.
- **[C1.86]** *nadpis H3:* Optimální nastavení nájmu
- **[C1.87]** *odstavec:* Pomoc při stanovení tržního nájemného, kauce a dalších podmínek. Díky našim datovým analýzám víme, jaké parametry jsou optimální pro různé typy nemovitostí a lokalit.
- **[C1.88]** *nadpis H3:* Systém včasného varování
- **[C1.89]** *odstavec:* Získáte přístup k systému, který vás upozorní na blížící se termíny plateb a pomůže vám okamžitě reagovat na známky potenciálních problémů.
- **[C1.90]** *odkaz:* Chci začít spolu s vámi
- **[C1.91]** *nadpis H2:* Nejčastější otázky o ochraně před problémovými nájemníky
- **[C1.92]** *odstavec:* Odpovídáme na dotazy, které pronajímatelé řeší při zajišťování bezpečného pronájmu
- **[C1.93]** *tlačítko:* Jak poznám potenciálně problémového nájemníka ještě před podpisem smlouvy?
- **[C1.94]** *odstavec:* Problémového nájemníka lze často odhalit už při prvních interakcích. Varovné signály jsou: vyhýbavé odpovědi na otázky o zaměstnání nebo předchozích nájmech, neochota doložit příjmy, tlak na rychlé uzavření smlouvy bez důkladného prověření, nabízení hotovostních záloh místo standardních převodů, nebo nevysvětlené změny v požadavcích. Prověření v insolvenčním rejstříku, evidenci exekucí a u předchozího pronajímatele riziko výrazně sníží, úplně vyloučit ho nedokáže nikdo.
- **[C1.95]** *tlačítko:* Jaké právní nástroje nejvíce ochrání mou nemovitost při pronájmu?
- **[C1.96]** *odstavec:* Klíčovým nástrojem je profesionálně sestavená nájemní smlouva, která jasně definuje všechna práva a povinnosti stran, postup při prodlení a při ukončení nájmu. Důležité jsou také podrobný předávací protokol s fotodokumentací stavu nemovitosti, notářský zápis s doložkou přímé vykonatelnosti pro rychlejší vymáhání a kauce ve správné výši. Smlouvu připravuje advokátka, se kterou spolupracujeme.
- **[C1.97]** *tlačítko:* Jak správně nastavit výši kauce a jakou má právní ochranu?
- **[C1.98]** *odstavec:* Kauce může být nejvýš trojnásobek měsíčního nájemného a je úročená. Doporučujeme ji vést na samostatném účtu a ve smlouvě popsat, kdy a jak se čerpá a vrací.
- **[C1.99]** *tlačítko:* Jak postupovat, když nájemník přestane platit nájemné?
- **[C1.100]** *odstavec:* Rychle. Hned nájemníka písemně upomeňte a vyzvěte k zaplacení. Když dluh dosáhne nájemného a služeb aspoň za tři měsíce, můžete dát výpověď bez výpovědní doby (§ 2291 OZ), předtím ale musíte nájemníka vyzvat k nápravě. Od nájmu bytu odstoupit nejde. Postup a znění výpovědi doporučujeme konzultovat s advokátem.
- **[C1.101]** *tlačítko:* Jaké jsou nejčastější typy poškození nemovitosti a jak se před nimi chránit?
- **[C1.102]** *odstavec:* Nejčastější jsou drobná mechanická poškození (díry ve zdech, poškrábané podlahy), poškozené vybavení z důvodu nesprávného používání, znečištění vyžadujícím nákladnou sanaci (kvůli domácím mazlíčkům, kouření) a poškozené instalace z důvodu zanedbání údržby. Pro ochranu je klíčový podrobný předávací protokol s fotodokumentací, adekvátní kauce, správné pojištění nemovitosti pro pronájem a jasné definování povinností nájemníků ohledně údržby ve smlouvě.
- **[C1.103]** *tlačítko:* Co dělat, když nájemník odmitá opustit nemovitost po ukončení nájmu?
- **[C1.104]** *odstavec:* Písemně ho vyzvěte k vyklizení s konkrétním termínem, nejméně 14 dní před podáním návrhu k soudu. Od roku 2026 lze u skončeného nájmu podat návrh na rozkaz k vyklizení, jinak žalobu na vyklizení. Vyklizení pak provede exekutor. Výměna zámku nebo vynesení věcí je protiprávní. Případ za vás můžeme vést, právní úkony dělá advokátka.
- **[C1.105]** *nadpis H2:* Chcete byt pronajmout s námi?
- **[C1.106]** *odstavec:* Pronájem s prověřeným nájemníkem, smlouvou od advokátky a předávacím protokolem. Na přání i správa. Plzeň a Praha.
- **[C1.107]** *nadpis H3:* Napište nám o svém bytě
- **[C1.108]** *odstavec:* Stačí pár údajů. Ozveme se, probereme výši nájmu a domluvíme další postup.
- **[C1.109]** *volba:* Typ nemovitosti k pronájmu
- **[C1.110]** *volba:* Byt
- **[C1.111]** *volba:* Rodinný dům
- **[C1.112]** *volba:* Komerční prostor
- **[C1.113]** *volba:* Jiné
- **[C1.114]** *popisek:* Souhlasím se zpracováním osobních údajů za účelem vyřízení poptávky.
- **[C1.115]** *text:* Máme to. Ozveme se do 24 hodin v pracovní dny.
- **[C1.116]** *odstavec:* Nechcete čekat? Zavolejte rovnou na 603 834 921 .
- **[C1.117]** *odstavec:* Odpovíme vám do 24 hodin v pracovní dny. Nejrychleji se domluvíme na 603 834 921.
- **[C1.118]** *text:* Bez závazků
- **[C1.119]** *text:* Plzeň a Praha
- **[C1.120]** *text:* Odborná podpora


## D) PRŮVODCE DIAGNOSTIKOU — `js/diagnostika.js`

- **[D.1]** *otázka:* Co se právě děje?
- **[D.2]** *otázka:* Máte písemnou nájemní smlouvu?
- **[D.3]** *otázka:* Na jakou dobu je nájem sjednaný?
- **[D.4]** *otázka:* Kolik měsíčních nájmů zhruba dluží?
- **[D.5]** *otázka:* Jak dlouho už to trvá?
- **[D.6]** *otázka:* Poslali jste už něco písemně?
- **[D.7]** *nápověda:* Vyberte, co sedí nejvíc. Podrobnosti doladíme na hovoru.
- **[D.8]** *nápověda:* Tohle rozhoduje o tom, jestli je pro vás dostupná rychlá cesta.
- **[D.9]** *nápověda:* Dluh ve výši tří nájmů otevírá nejsilnější nástroj, jaký pronajímatel má.
- **[D.10]** *nápověda:* SMS ani telefonát se za doručenou výzvu obvykle nepovažují.
- **[D.11]** *možnost:* Nájem trvá a nájemník neplatí
- **[D.12]** *možnost:* Nájem skončil a nájemník se nevystěhoval
- **[D.13]** *možnost:* Ničí byt nebo obtěžuje sousedy
- **[D.14]** *možnost:* Nekomunikuje a nepřebírá poštu
- **[D.15]** *možnost:* Bydlí tam někdo jiný, než kdo podepsal
- **[D.16]** *možnost:* Zatím platí, ale pozdě, nebo mi něco nesedí
- **[D.17]** *možnost:* Ano, mám ji podepsanou
- **[D.18]** *možnost:* Něco mám, ale nevím, jestli je to v pořádku
- **[D.19]** *možnost:* Ne, domluvili jsme se ústně
- **[D.20]** *možnost:* Doba určitá, která už uplynula
- **[D.21]** *možnost:* Doba určitá, která ještě běží
- **[D.22]** *možnost:* Doba neurčitá
- **[D.23]** *možnost:* Nevím
- **[D.24]** *možnost:* Nedluží, problém je jiný
- **[D.25]** *možnost:* Zhruba jeden
- **[D.26]** *možnost:* Dva
- **[D.27]** *možnost:* Tři a víc
- **[D.28]** *možnost:* Necelý měsíc
- **[D.29]** *možnost:* Jeden až tři měsíce
- **[D.30]** *možnost:* Tři až šest měsíců
- **[D.31]** *možnost:* Víc než půl roku
- **[D.32]** *možnost:* Zatím nic, jen jsme spolu mluvili
- **[D.33]** *možnost:* Poslal jsem upomínku k zaplacení
- **[D.34]** *možnost:* Poslal jsem výzvu k vyklizení
- **[D.35]** *možnost:* Dal jsem výpověď
- **[D.36]** *možnost:* Nejsem si jistý, co přesně jsem poslal
- **[D.37]** *možnost:* Dluh ve výši tří nájmů
- **[D.38]** *možnost:* Jistota kryje nejvýš tři nájmy
- **[D.39]** *možnost:* 3 měsíce od skončení nájmu
- **[D.40]** *možnost:* 14 dní před podáním návrhu
- **[D.41]** *poznámka k možnosti:* Dluží nájemné nebo zálohy na služby
- **[D.42]** *poznámka k možnosti:* Uplynula doba určitá nebo skončila výpovědní doba
- **[D.43]** *poznámka k možnosti:* Škody, hluk, stížnosti ostatních
- **[D.44]** *poznámka k možnosti:* Nezvedá telefon, zásilky se vracejí
- **[D.45]** *poznámka k možnosti:* Podnájem bez souhlasu
- **[D.46]** *poznámka k možnosti:* Opakované zpoždění, vyhýbá se kontaktu, drobné dluhy na službách
- **[D.47]** *popis lhůty:* Za touhle hranicí vzniká nárok na výpověď bez výpovědní doby. Pod ní máte nástrojů podstatně míň, proto se rozhoduje teď.
- **[D.48]** *popis lhůty:* Zákonné maximum je trojnásobek nájemného. Jakmile ho dluh přeroste, jde ztráta plně z vaší kapsy.
- **[D.49]** *popis lhůty:* U nájmu na dobu určitou musí do této lhůty odejít písemná výzva k vyklizení. Jinak se nájem obnovuje a rychlá cesta padá.
- **[D.50]** *popis lhůty:* Výzva musí být doručena do bytu nebo do datové schránky nejméně 14 dní předem.
- **[D.51]** *popis lhůty:* Lhůta začne běžet až dnem skončení nájmu. Připravte si výzvu dopředu, ať odejde hned první den — tím si necháte celé tři měsíce jako rezervu, ne jako termín.
- **[D.52]** *popis lhůty:* Tolik zbývá do 
- **[D.53]** *popis lhůty:* Lhůta se zavírá 
- **[D.54]** *popis lhůty:* Tříměsíční lhůta skončila 
- **[D.55]** *nadpis kalkulačky:* Nájem ještě neskončil
- **[D.56]** *nadpis kalkulačky:* Lhůta uplynula


## E) PRESCORINGOVÝ MODEL — `js/prescoring.js`

- **[E.1]** *nadpis:* Nemovitost a nájemník
- **[E.2]** *nadpis:* Příjmy domácnosti
- **[E.3]** *nadpis:* Závazky a rezerva
- **[E.4]** *nadpis:* Zajištění a prověření

