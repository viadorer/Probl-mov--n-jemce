/**
 * Diagnostika případu problémového nájemníka.
 *
 * Rozhodovací strom vychází ze stavu k 1. 1. 2026, kdy novela občanského
 * soudního řádu (99/1963 Sb.) zavedla rozkaz k vyklizení.
 *
 * PŘED SPUŠTĚNÍM nechat odsouhlasit spolupracující advokátní kanceláří.
 * Výstupy jsou orientační a nenahrazují právní poradenství.
 */

const TRIAGE_STEPS = [
  {
    id: 'stage',
    question: 'Co se právě děje?',
    hint: 'Vyberte, co sedí nejvíc. Podrobnosti doladíme na hovoru.',
    options: [
      { value: 'nonpayment', label: 'Nájem trvá a nájemník neplatí', note: 'Dluží nájemné nebo zálohy na služby' },
      { value: 'ended_stays', label: 'Nájem skončil a nájemník se nevystěhoval', note: 'Uplynula doba určitá nebo skončila výpovědní doba' },
      { value: 'damage', label: 'Ničí byt nebo obtěžuje sousedy', note: 'Škody, hluk, stížnosti ostatních' },
      { value: 'unreachable', label: 'Nekomunikuje a nepřebírá poštu', note: 'Nezvedá telefon, zásilky se vracejí' },
      { value: 'subletting', label: 'Bydlí tam někdo jiný, než kdo podepsal', note: 'Podnájem bez souhlasu' },
    ],
  },
  {
    id: 'contract',
    question: 'Máte písemnou nájemní smlouvu?',
    hint: 'Tohle rozhoduje o tom, jestli je pro vás dostupná rychlá cesta.',
    options: [
      { value: 'yes', label: 'Ano, mám ji podepsanou' },
      { value: 'unsure', label: 'Něco mám, ale nevím, jestli je to v pořádku' },
      { value: 'no', label: 'Ne, domluvili jsme se ústně' },
    ],
  },
  {
    id: 'term',
    question: 'Na jakou dobu je nájem sjednaný?',
    options: [
      { value: 'fixed_ended', label: 'Doba určitá, která už uplynula' },
      { value: 'fixed_running', label: 'Doba určitá, která ještě běží' },
      { value: 'indefinite', label: 'Doba neurčitá' },
      { value: 'unknown', label: 'Nevím' },
    ],
  },
  {
    id: 'debt',
    question: 'Kolik měsíčních nájmů zhruba dluží?',
    hint: 'Dluh ve výši tří nájmů otevírá nejsilnější nástroj, jaký pronajímatel má.',
    options: [
      { value: 'none', label: 'Nedluží, problém je jiný' },
      { value: 'one', label: 'Zhruba jeden' },
      { value: 'two', label: 'Dva' },
      { value: 'three_plus', label: 'Tři a víc' },
    ],
  },
  {
    id: 'duration',
    question: 'Jak dlouho už to trvá?',
    options: [
      { value: 'lt1', label: 'Necelý měsíc' },
      { value: 'm1_3', label: 'Jeden až tři měsíce' },
      { value: 'm3_6', label: 'Tři až šest měsíců' },
      { value: 'gt6', label: 'Víc než půl roku' },
    ],
  },
  {
    id: 'notice',
    question: 'Poslal jste už něco písemně?',
    hint: 'SMS ani telefonát se za doručenou výzvu obvykle nepovažují.',
    options: [
      { value: 'none', label: 'Zatím nic, jen jsme spolu mluvili' },
      { value: 'reminder', label: 'Poslal jsem upomínku k zaplacení' },
      { value: 'demand', label: 'Poslal jsem výzvu k vyklizení' },
      { value: 'termination', label: 'Dal jsem výpověď' },
      { value: 'unsure', label: 'Nejsem si jistý, co přesně jsem poslal' },
    ],
  },
];

const LOSS_LOW = '40 000 – 120 000 Kč';
const LOSS_MID = '120 000 – 300 000 Kč';
const LOSS_HIGH = '300 000 – 800 000 Kč';

const COST_FAST = '15 000 – 35 000 Kč';
const COST_STANDARD = '20 000 – 45 000 Kč';
const COST_HARD = '40 000 – 90 000 Kč';

function evaluateTriage(a) {
  const stage = a.stage;
  const hasContract = a.contract === 'yes';
  const noContract = a.contract === 'no';
  const unsureContract = a.contract === 'unsure';

  const leverage = [];
  const blockers = [];
  const deadlines = [];

  if (hasContract) {
    leverage.push('Máte písemnou smlouvu, což je základní podmínka pro rozkaz k vyklizení.');
  }
  if (a.term === 'fixed_ended') {
    leverage.push('Nájem na dobu určitou už uplynul, konec nájmu je doložitelný bez výpovědi.');
  }
  if (a.debt === 'three_plus') {
    leverage.push('Dluh ve výši tří nájmů zakládá zvlášť závažné porušení povinností, tedy výpověď bez výpovědní doby.');
  }
  if (a.notice === 'demand' || a.notice === 'termination') {
    leverage.push('Něco už jste poslal písemně, takže lhůty vám pravděpodobně běží. Ověříme doručení.');
  }

  if (noContract) {
    blockers.push('Bez písemné smlouvy nelze listinně doložit nájem, takže rychlý rozkaz k vyklizení je nedostupný.');
  }
  if (unsureContract) {
    blockers.push('Smlouvu je potřeba posoudit. Na jejím znění stojí, jestli je rychlá cesta dostupná.');
  }
  if (a.term === 'indefinite') {
    blockers.push('U doby neurčité se konec nájmu musí nejdřív vytvořit platnou výpovědí.');
  }
  if (a.term === 'fixed_running') {
    blockers.push('Doba určitá ještě běží, konec nájmu musí založit výpověď z konkrétního důvodu.');
  }
  if (a.notice === 'none' || a.notice === 'unsure') {
    blockers.push('Zatím chybí doložitelná písemná výzva, bez které soud návrh nepřijme.');
  }
  if (a.duration === 'gt6') {
    blockers.push('Případ běží přes půl roku, ztráta už je značná a každý měsíc ji zvyšuje.');
  }

  if (stage === 'ended_stays' || a.term === 'fixed_ended') {
    deadlines.push({
      label: '3 měsíce od skončení nájmu',
      text: 'Do této lhůty musí odejít písemná výzva k vyklizení. Jinak se nájem obnovuje a rychlá cesta padá.',
    });
  }
  deadlines.push({
    label: '14 dní před podáním návrhu',
    text: 'Výzva musí být doručena do bytu nebo do datové schránky nejméně 14 dní předem.',
  });

  let severity = 'high';
  let title = '';
  let summary = '';
  let estMonths = '';
  let estLoss = LOSS_MID;
  let estCost = COST_STANDARD;
  let route = [];
  let firstStep = '';

  if (noContract) {
    severity = 'critical';
    title = 'Nájem bez písemné smlouvy';
    summary = 'Nejdražší varianta, jaká existuje. Rychlý rozkaz k vyklizení vyžaduje listinné doložení nájmu, takže vaše cesta vede přes běžnou žalobu. Rozhoduje se to teď, protože důkazy o existenci nájmu s časem mizí.';
    estMonths = '12 – 24 měsíců';
    estLoss = LOSS_HIGH;
    estCost = COST_HARD;
    route = [
      'Zajistit důkazy o existenci nájmu: výpisy plateb, SMS, e-maily, svědectví sousedů, předání klíčů.',
      'Písemně vyzvat k úhradě a k vyklizení, s doložitelným doručením.',
      'Ukončit nájem způsobem, který jde doložit i bez písemné smlouvy.',
      'Podat žalobu na vyklizení a souběžně uplatnit dlužné nájemné.',
      'Po pravomocném rozhodnutí koordinovat exekuční vyklizení.',
      'Zvážit odkup nemovitosti, protože u téhle varianty bývá prodej rychlejší cesta ven než soud.',
    ];
    firstStep = 'Ještě dnes vytiskněte a uložte všechnu komunikaci s nájemníkem a výpisy plateb za celou dobu nájmu. Tohle je váš jediný důkazní materiál.';
  } else if (stage === 'ended_stays') {
    severity = 'critical';
    title = 'Nájem skončil, nájemník zůstal v bytě';
    summary = 'Situace, na kterou je rozkaz k vyklizení od ledna 2026 přímo dělaný. Máte nejrychlejší cestu ven ze všech. Zároveň je to případ, kde se nejčastěji propásne tříměsíční lhůta na výzvu, a pak se nájem obnoví.';
    estMonths = '2 – 5 měsíců';
    estLoss = LOSS_LOW;
    estCost = COST_FAST;
    route = [
      'Ověřit, že skončení nájmu je doložitelné listinou, tedy uplynutím doby určité nebo platnou výpovědí.',
      'Odeslat písemnou výzvu k vyklizení do bytu nebo do datové schránky a uschovat doklad o doručení.',
      'Vyčkat zákonných 14 dní od doručení výzvy.',
      'Podat návrh na rozkaz k vyklizení s kompletní listinnou složkou.',
      'Připravit reakci na případný odpor, na který má nájemník 15 dní.',
      'Po nabytí vykonatelnosti koordinovat předání nebo exekuční vyklizení.',
    ];
    firstStep = 'Zjistěte přesné datum, kdy nájem skončil, a spočítejte, kolik dní zbývá do konce tříměsíční lhůty pro výzvu. Pokud výzva ještě neodešla, je to nejdůležitější věc tohoto týdne.';
  } else if (stage === 'nonpayment' && a.debt === 'three_plus') {
    severity = 'critical';
    title = 'Dluh přesáhl tři nájmy';
    summary = 'Máte v ruce nejsilnější nástroj, jaký pronajímatel má: dluh ve výši tří měsíčních nájmů se považuje za zvlášť závažné porušení povinností a nájem se dá ukončit bez výpovědní doby. Většina majitelů o tom neví a čeká dál.';
    estMonths = '4 – 8 měsíců';
    estLoss = LOSS_MID;
    estCost = COST_STANDARD;
    route = [
      'Písemně vyzvat k úhradě dluhu v přiměřené lhůtě a doložitelně doručit.',
      'Po marném uplynutí lhůty ukončit nájem bez výpovědní doby pro zvlášť závažné porušení.',
      'Vyzvat k vyklizení bytu a doručit výzvu do bytu nebo do datové schránky.',
      'Po 14 dnech podat návrh na rozkaz k vyklizení.',
      'Souběžně uplatnit dlužné nájemné a započíst jistotu.',
      'Zdokumentovat stav bytu a po vyklizení vyčíslit škody.',
    ];
    firstStep = 'Nepřijímejte částečnou platbu bez písemného ujednání o tom, na co se započítává. Jedna přijatá splátka bez dokumentu dokáže shodit argument o zvlášť závažném porušení.';
  } else if (stage === 'nonpayment') {
    severity = 'high';
    title = 'Nájemník přestal platit';
    summary = 'Jste ve fázi, kde se rozhoduje, jestli z toho bude tříměsíční nepříjemnost, nebo dvouletý spor. Rozdíl nedělá nájemník, ale to, jestli od téhle chvíle jde všechno písemně a s doložitelným doručením.';
    estMonths = '5 – 10 měsíců';
    estLoss = LOSS_MID;
    estCost = COST_STANDARD;
    route = [
      'Písemně vyzvat k úhradě s konkrétní lhůtou a doložitelně doručit.',
      'Vyčíslit dluh včetně záloh na služby a vést evidenci každé platby.',
      'Podle vývoje připravit výpověď, buď bez výpovědní doby při dluhu tří nájmů, nebo s výpovědní dobou.',
      'Po skončení nájmu odeslat výzvu k vyklizení a hlídat tříměsíční lhůtu.',
      'Podat návrh na rozkaz k vyklizení s kompletní listinnou složkou.',
      'Uplatnit dluh a započíst jistotu, která je ze zákona nejvýš trojnásobek nájemného.',
    ];
    firstStep = 'Odešlete písemnou výzvu k úhradě s konkrétní lhůtou, doporučeně na adresu bytu, a doklad uschovejte. Telefonát ani SMS pro soudní řízení neexistují.';
  } else if (stage === 'damage') {
    severity = 'high';
    title = 'Poškozování bytu nebo obtěžování okolí';
    summary = 'Tenhle typ případu stojí a padá s dokumentací. Škoda, kterou nedoložíte ke dni jejího vzniku, se u soudu prakticky nedá uplatnit. Totéž platí pro stížnosti sousedů.';
    estMonths = '5 – 10 měsíců';
    estLoss = LOSS_MID;
    estCost = COST_STANDARD;
    route = [
      'Zdokumentovat stav bytu fotografiemi s datem a porovnat s předávacím protokolem.',
      'Vyžádat si písemná vyjádření sousedů nebo výboru společenství vlastníků.',
      'Písemně vyzvat k odstranění závadného stavu v přiměřené lhůtě.',
      'Při pokračování dát výpověď pro hrubé nebo zvlášť závažné porušení povinností.',
      'Po skončení nájmu odeslat výzvu k vyklizení a podat návrh na rozkaz.',
      'Vyčíslit škodu odborným odhadem a uplatnit ji společně s dluhem.',
    ];
    firstStep = 'Nafoťte současný stav bytu, ideálně za přítomnosti svědka, a písemně si vyžádejte vyjádření sousedů nebo výboru. Za tři měsíce už nedokážete, kdy škoda vznikla.';
  } else if (stage === 'unreachable') {
    severity = 'high';
    title = 'Nájemník nekomunikuje a nepřebírá poštu';
    summary = 'Nepřebírání zásilek je nejčastější obstrukce a nejčastější důvod, proč se případ vleče. Dobrá zpráva je, že u rozkazu k vyklizení se doručuje přímo do bytu, takže tahle taktika ztrácí sílu.';
    estMonths = '4 – 8 měsíců';
    estLoss = LOSS_MID;
    estCost = COST_STANDARD;
    route = [
      'Ověřit doručovací adresu, existenci datové schránky a znění ujednání o doručování ve smlouvě.',
      'Doručovat do bytu a paralelně na všechny známé adresy, vždy s dokladem.',
      'Zdokumentovat pokusy o kontakt, ideálně za účasti svědka.',
      'Ukončit nájem z doložitelného důvodu a odeslat výzvu k vyklizení.',
      'Podat návrh na rozkaz k vyklizení s doklady o doručování.',
      'Ověřit, zda nájemník byt vůbec užívá, což mění další postup.',
    ];
    firstStep = 'Zjistěte, jestli má nájemník datovou schránku, a od této chvíle doručujte všechno do bytu doporučeně. Nevyzvednutá zásilka na správné adrese má jinou váhu než nedoručený telefonát.';
  } else {
    severity = 'high';
    title = 'V bytě bydlí někdo jiný, než kdo podepsal smlouvu';
    summary = 'Přenechání bytu bez vašeho souhlasu je porušení povinností nájemce a zakládá důvod k ukončení nájmu. Komplikace je v tom, že vyklizení se musí týkat i osob, které v bytě reálně bydlí bez právního titulu.';
    estMonths = '5 – 10 měsíců';
    estLoss = LOSS_MID;
    estCost = COST_STANDARD;
    route = [
      'Zdokumentovat, kdo byt skutečně užívá a od kdy.',
      'Písemně vyzvat nájemce k nápravě a k odstranění protiprávního stavu.',
      'Ukončit nájem výpovědí pro porušení povinností.',
      'Odeslat výzvu k vyklizení nájemci i osobám, které byt užívají.',
      'Podat návrh na rozkaz k vyklizení proti všem osobám v bytě.',
      'Vyčíslit bezdůvodné obohacení za dobu neoprávněného užívání.',
    ];
    firstStep = 'Písemně vyzvěte nájemce k nápravě a zdokumentujte, kdo byt skutečně užívá. Bez toho může vyklizení uváznout na osobách, které v návrhu nebudou uvedené.';
  }

  if (a.duration === 'gt6' && severity !== 'critical') {
    severity = 'critical';
    estLoss = LOSS_HIGH;
  }
  if (unsureContract && estCost === COST_FAST) {
    estCost = COST_STANDARD;
  }

  return { severity, title, summary, estMonths, estLoss, estCost, deadlines, leverage, blockers, route, firstStep };
}

/** Alpine komponenta. */
function diagnostika() {
  return {
    steps: TRIAGE_STEPS,
    screen: 'quiz', // quiz | preview | result
    index: 0,
    answers: {},
    result: null,
    contact: { name: '', phone: '', email: '' },
    consent: false,
    sending: false,
    error: '',

    get step() {
      return this.steps[this.index];
    },
    get progress() {
      return Math.round(((this.index + 1) / this.steps.length) * 100);
    },

    pick(value) {
      this.answers[this.step.id] = value;
      if (this.index < this.steps.length - 1) {
        this.index++;
      } else {
        this.result = evaluateTriage(this.answers);
        this.screen = 'preview';
        this.$nextTick(() => this.scrollToTop());
      }
    },

    back() {
      if (this.screen === 'preview') {
        this.screen = 'quiz';
        this.index = this.steps.length - 1;
        return;
      }
      if (this.index > 0) this.index--;
    },

    restart() {
      this.screen = 'quiz';
      this.index = 0;
      this.answers = {};
      this.result = null;
      this.error = '';
    },

    scrollToTop() {
      const el = document.getElementById('diagnostika');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    async submit() {
      if (!this.contact.name.trim() || !this.contact.phone.trim() || !this.consent) {
        this.error = 'Vyplňte prosím jméno, telefon a potvrďte souhlas.';
        return;
      }
      this.sending = true;
      this.error = '';

      const payload = {
        ...this.contact,
        consent: this.consent,
        answers: this.answers,
        result: {
          title: this.result.title,
          severity: this.result.severity,
          estMonths: this.result.estMonths,
          estLoss: this.result.estLoss,
        },
        source: 'problemovynajemnik.cz/diagnostika',
        url: window.location.href,
      };

      try {
        if (window.LEAD_ENDPOINT) {
          await fetch(window.LEAD_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
        } else {
          console.warn('LEAD_ENDPOINT není nastavený, lead se neodeslal.', payload);
        }
        this.screen = 'result';
        this.$nextTick(() => this.scrollToTop());
      } catch (e) {
        this.error = 'Odeslání se nepodařilo. Zavolejte nám prosím napřímo.';
      } finally {
        this.sending = false;
      }
    },
  };
}
