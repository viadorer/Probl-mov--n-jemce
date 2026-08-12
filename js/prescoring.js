/**
 * Prescoring nájemníka — posouzení bonity.
 *
 * Bodový model je převzatý 1:1 z kalkulačky bonity na vzornynajemce.cz
 * (bonita_najemnika.html), aby oba nástroje dávaly stejný výsledek.
 * Změna vah tady se musí promítnout i tam a naopak.
 *
 * scoreTenant(input) je čistá funkce bez DOM, aby se dala testovat
 * a později volat i na serveru.
 */

const EMPTY = (v) => v === '' || v === null || v === undefined;
const NUM = (v) => parseFloat(v) || 0;

function scoreTenant(i) {
  const monthlyRent = NUM(i.monthlyRent);
  const mainIncome = NUM(i.mainIncome);
  const additionalIncome = NUM(i.additionalIncome);
  const partnerIncome = NUM(i.partnerIncome);
  const socialBenefits = NUM(i.socialBenefits);
  const otherResidentsIncome = NUM(i.otherResidentsIncome);

  const loanPayments = NUM(i.loanPayments);
  const creditCards = NUM(i.creditCards);
  const alimony = NUM(i.alimony);
  const insurance = NUM(i.insurance);
  const otherRents = NUM(i.otherRents);
  const livingExpenses = NUM(i.livingExpenses);
  const financialReserve = NUM(i.financialReserve);

  const employmentType = i.employmentType || '';
  const employmentLength = NUM(i.employmentLength);
  const incomeStability = i.incomeStability || '';
  const incomeProof = i.incomeProof || '';
  const debtHistory = i.debtHistory || '';
  const creditRegistry = i.creditRegistry || '';
  const previousRental = i.previousRental || '';

  const hasExecution = !!i.hasExecution;
  const hasGuarantor = !!i.hasGuarantor;
  const allResidentsSigned = !!i.allResidentsSigned;
  const seasonalWork = !!i.seasonalWork;
  const probationPeriod = !!i.probationPeriod;

  const guarantorIncome = NUM(i.guarantorIncome);
  const guarantorEmployment = i.guarantorEmployment || '';
  const guarantorDebt = i.guarantorDebt || '';
  const guarantorRelation = i.guarantorRelation || '';

  const totalIncome = mainIncome + additionalIncome + partnerIncome + socialBenefits + otherResidentsIncome;
  const totalExpenses = loanPayments + creditCards + alimony + insurance + otherRents + livingExpenses;
  const disposableIncome = totalIncome - totalExpenses;
  const rentToIncomeRatio = totalIncome > 0 ? (monthlyRent / totalIncome) * 100 : 0;
  const reserveMonths = monthlyRent > 0 ? financialReserve / monthlyRent : 0;

  let score = 100;
  const riskFactors = [];
  const recommendations = [];

  // Poměr nájem / příjem
  if (rentToIncomeRatio > 40) {
    score -= 30;
    riskFactors.push('Nájemné překračuje 40 % příjmu, vysoké riziko');
    recommendations.push('Zvážit ručitele a vyšší jistotu (až trojnásobek nájemného)');
  } else if (rentToIncomeRatio > 30) {
    score -= 15;
    riskFactors.push('Nájemné překračuje 30 % příjmu, střední riziko');
    recommendations.push('Zvážit požadavek na ručitele nebo vyšší jistotu (dvoj- až trojnásobek)');
  } else if (rentToIncomeRatio > 0 && rentToIncomeRatio < 25) {
    score += 5;
    recommendations.push('Nízký poměr nájmu k příjmu, pozitivní faktor');
  }

  // Typ zaměstnání
  switch (employmentType) {
    case 'selfemployed':
      score -= 15;
      riskFactors.push('OSVČ, vyšší riziko nestabilních příjmů');
      recommendations.push('Vyžádat daňová přiznání za dva roky a výpisy z účtu za šest měsíců');
      break;
    case 'contract':
      score -= 10;
      riskFactors.push('Práce na DPP nebo DPČ, nižší jistota zaměstnání');
      break;
    case 'student':
      score -= 20;
      riskFactors.push('Student, nestabilní příjmy');
      recommendations.push('Požadovat ručitele a vyšší jistotu');
      break;
    case 'unemployed':
      score -= 40;
      riskFactors.push('Nezaměstnaný, žádný pravidelný příjem');
      recommendations.push('Požadovat solventního ručitele');
      break;
    case 'pensioner':
      if (totalIncome < 20000) {
        score -= 10;
        riskFactors.push('Nízký důchod, omezená platební schopnost');
      }
      break;
  }

  // Délka zaměstnání
  if (!EMPTY(i.employmentLength) && employmentLength < 6) {
    score -= 15;
    riskFactors.push('Krátká doba zaměstnání, méně než šest měsíců');
    recommendations.push('Požadovat ručitele nebo vyšší jistotu');
  } else if (!EMPTY(i.employmentLength) && employmentLength < 12) {
    score -= 8;
    riskFactors.push('Relativně krátká doba zaměstnání');
  }

  // Stabilita příjmů
  switch (incomeStability) {
    case 'declining': score -= 20; riskFactors.push('Klesající trend příjmů'); break;
    case 'variable':  score -= 10; riskFactors.push('Proměnlivé příjmy'); break;
    case 'growing':   score += 5; break;
  }

  // Doložení příjmů
  switch (incomeProof) {
    case 'unconfirmed':
      score -= 25;
      riskFactors.push('Nedoložené příjmy');
      recommendations.push('Vyžádat oficiální potvrzení o příjmech');
      break;
    case 'bank_statements':
      score -= 10;
      riskFactors.push('Příjmy doloženy pouze výpisy z účtu');
      break;
  }

  // Historie dluhů
  switch (debtHistory) {
    case 'bankruptcy':
      score -= 40;
      riskFactors.push('Historie insolvence nebo exekuce');
      recommendations.push('Důkladně zvážit riziko a požadovat maximální zajištění');
      break;
    case 'major': score -= 25; riskFactors.push('Vážné problémy s dluhy v minulosti'); break;
    case 'minor': score -= 10; riskFactors.push('Drobné problémy s platbami v minulosti'); break;
  }

  // Rejstříky ISIR / CEE
  switch (creditRegistry) {
    case 'not_checked':
      score -= 5;
      riskFactors.push('Rejstříky neprověřeny');
      recommendations.push('Prověřit insolvenční rejstřík a centrální evidenci exekucí');
      break;
    case 'isir_clean':
      score += 3;
      recommendations.push('Insolvenční rejstřík bez záznamu, pozitivní faktor');
      break;
    case 'insolvency':
      score -= 50;
      riskFactors.push('Zjištěna insolvence, kritické riziko');
      recommendations.push('Kritické riziko, doporučujeme maximální zajištění a individuální posouzení');
      break;
    case 'execution_found':
      score -= 30;
      riskFactors.push('Zjištěna exekuce');
      recommendations.push('Zvážit ručitele a vyšší jistotu, rozhodnutí ponechat na individuálním posouzení');
      break;
    case 'execution_not_found':
      score += 2;
      recommendations.push('Evidence exekucí bez záznamu, pozitivní faktor');
      break;
  }

  // Zkušenost s pronájmem
  switch (previousRental) {
    case 'negative': score -= 20; riskFactors.push('Negativní zkušenosti s pronájmem'); break;
    case 'positive': score += 5; break;
    case 'none':     score += 5; break;
  }

  // Rizikové příznaky
  if (hasExecution) {
    score -= 30;
    riskFactors.push('Aktivní exekuce');
    recommendations.push('Požadovat ručitele a vyšší jistotu, případně individuální posouzení');
  }
  if (seasonalWork) {
    score -= 10;
    riskFactors.push('Sezónní práce, nestabilní příjmy během roku');
    recommendations.push('Vyžádat příjmy za celý rok a počítat s nejnižším měsíčním příjmem');
  }
  if (probationPeriod) {
    score -= 15;
    riskFactors.push('Zkušební doba, nejistota pokračování zaměstnání');
    recommendations.push('Počkat na ukončení zkušební doby nebo požadovat ručitele');
  }

  // Ručitel
  if (hasGuarantor) {
    let bonus = 15;
    if (guarantorIncome >= totalIncome * 2) {
      bonus += 10;
      recommendations.push('Ručitel s vysokými příjmy, výborná záruka');
    } else if (guarantorIncome > 0 && guarantorIncome < totalIncome) {
      bonus -= 5;
      riskFactors.push('Ručitel má nižší příjmy než nájemník');
    }
    switch (guarantorEmployment) {
      case 'stable': bonus += 5; break;
      case 'property_owner':
        bonus += 10;
        recommendations.push('Ručitel vlastní nemovitost, výborná záruka');
        break;
      case 'selfemployed': bonus -= 3; break;
    }
    switch (guarantorDebt) {
      case 'high': bonus -= 8; riskFactors.push('Ručitel má vysoké zadlužení'); break;
      case 'medium': bonus -= 3; break;
    }
    if (guarantorRelation === 'family') bonus += 3;
    score += bonus;
    recommendations.push('Ručitel přináší ' + bonus + ' bodů, ověřte i jeho bonitu');
  }

  // Finanční rezerva
  if (monthlyRent > 0) {
    if (reserveMonths >= 6) {
      score += 15;
      recommendations.push('Výborná finanční rezerva, nízké riziko');
    } else if (reserveMonths >= 3) {
      score += 10;
    } else if (reserveMonths < 1) {
      score -= 15;
      riskFactors.push('Nedostatečná finanční rezerva');
      recommendations.push('Zvážit vyšší jistotu kvůli nízké finanční rezervě');
    }
  }

  // Kombinace rizik
  const highRiskCombination =
    (employmentType === 'selfemployed' && employmentLength < 24) ||
    (employmentType === 'contract' && reserveMonths < 2) ||
    (rentToIncomeRatio > 35 && incomeStability === 'variable');
  if (highRiskCombination) {
    riskFactors.push('Kombinace rizikových faktorů, zvýšené riziko');
    recommendations.push('Doporučujeme důkladnou kontrolu všech dokumentů a vyšší jistotu');
  }

  // Věk
  const age = NUM(i.age);
  if (!EMPTY(i.age) && age < 25 && !EMPTY(i.employmentLength) && employmentLength < 12) {
    riskFactors.push('Mladý věk s krátkou pracovní historií');
    recommendations.push('Zvážit ručitele nebo rodiče jako spolupodepsané');
  }
  if (!EMPTY(i.age) && age > 65 && employmentType === 'pensioner' && totalIncome < 18000) {
    riskFactors.push('Senior s nízkým důchodem');
    recommendations.push('Ověřit stabilitu důchodu a případné příjmy z investic');
  }

  // Disponibilní příjem nestačí na nájem
  if (monthlyRent > 0 && totalIncome > 0 && disposableIncome < monthlyRent) {
    riskFactors.push('Kritické: disponibilní příjem je nižší než nájemné');
    recommendations.push('Kritické: nedostatečné prostředky na nájem, doporučujeme silné zajištění a individuální posouzení');
    score = Math.min(score, 20);
  }

  // Solidarita spolubydlících
  if (otherResidentsIncome > 0 && !allResidentsSigned) {
    riskFactors.push('Příjmy od spolubydlících, kteří nepodepíší smlouvu');
    recommendations.push('Všichni příjmově aktivní spolubydlící musí podepsat smlouvu jako solidární dlužníci');
    score -= 10;
  } else if (otherResidentsIncome > 0 && allResidentsSigned) {
    score += 5;
    recommendations.push('Všichni spolubydlící podepíší jako solidární dlužníci, snížené riziko');
  }

  const incomeSourcesCount = [mainIncome, additionalIncome, partnerIncome, socialBenefits, otherResidentsIncome].filter((x) => x > 0).length;
  if (incomeSourcesCount === 1 && mainIncome > 0 && mainIncome < 30000) {
    riskFactors.push('Závislost na jediném zdroji příjmu');
    recommendations.push('Zvážit ručitele');
  }

  // Zadlužení
  const debtToIncomeRatio = totalIncome > 0 ? ((loanPayments + creditCards + alimony) / totalIncome) * 100 : 0;
  if (debtToIncomeRatio > 50) {
    score -= 20;
    riskFactors.push('Vysoké zadlužení, více než 50 % příjmu');
    recommendations.push('Požadovat snížení dluhů před podpisem smlouvy');
  } else if (debtToIncomeRatio > 30) {
    score -= 10;
    riskFactors.push('Střední zadlužení, 30 až 50 % příjmu');
  }

  // Velikost domácnosti
  const familyMembers = NUM(i.familyMembers) || 1;
  const incomePerPerson = totalIncome / familyMembers;
  if (incomePerPerson < 15000 && familyMembers > 2) {
    riskFactors.push('Nízký příjem na osobu ve větší domácnosti');
    recommendations.push('Ověřit sociální dávky a podporu pro rodiny s dětmi');
  }

  score = Math.max(0, Math.min(100, score));

  // Doporučení podle výsledného skóre
  if (score >= 70) {
    recommendations.push('Nízké riziko, standardní podmínky a jistota ve výši jednoho až dvou nájmů');
  } else if (score >= 50) {
    recommendations.push('Střední riziko, zvážit zvýšenou jistotu a důkladnější kontrolu');
  } else if (score >= 30) {
    recommendations.push('Vysoké riziko, zvážit ručitele a jistotu na zákonném maximu');
  } else {
    recommendations.push('Kritické riziko, doporučujeme maximální zajištění a pečlivé individuální posouzení');
  }

  if (employmentType === 'selfemployed') {
    recommendations.push('OSVČ: vyžádat potvrzení o bezdlužnosti vůči ČSSZ a finančnímu úřadu');
  }
  const currentMonth = new Date().getMonth() + 1;
  if (seasonalWork && (currentMonth >= 11 || currentMonth <= 2)) {
    recommendations.push('Sezónní práce v zimním období, zvýšené riziko snížených příjmů');
  }

  // Smluvní pojistky, které platí vždy
  recommendations.push('Smlouvu uzavřít na dobu určitou a s ujednáním o doručování, aby splňovala podmínky pro rozkaz k vyklizení');

  /**
   * Pojistka proti falešnému klidu: dokud nejsou ověřené rejstříky, doložený
   * příjem a reference, nesmí výsledek vyznít jako "nízké riziko". Skóre
   * zůstává, mění se jen pásmo — jinak by nástroj doporučoval podepsat
   * smlouvu s někým, o kom se ve skutečnosti nic neví.
   */
  const unverified = [];
  if (!creditRegistry || creditRegistry === 'not_checked') unverified.push('rejstříky (insolvence, exekuce)');
  if (!incomeProof || incomeProof === 'unconfirmed') unverified.push('doložení příjmu');
  if (!previousRental) unverified.push('reference z předchozího nájmu');

  let band, bandLabel, bandNote;
  if (score >= 70 && unverified.length) {
    return {
      score: Math.round(score),
      band: 'medium',
      bandLabel: 'Nelze potvrdit',
      bandNote:
        'Body vycházejí z toho, co jste zadal, ale klíčové údaje nejsou ověřené: ' +
        unverified.join(', ') +
        '. Dokud to nedoložíte, je tohle jen odhad na základě tvrzení zájemce.',
      unverified,
      riskFactors: riskFactors.concat(['Klíčové údaje nejsou ověřené: ' + unverified.join(', ')]),
      recommendations,
      metrics: {
        totalIncome, totalExpenses, disposableIncome,
        rentToIncomeRatio: Math.round(rentToIncomeRatio * 10) / 10,
        reserveMonths: Math.round(reserveMonths * 10) / 10,
        debtToIncomeRatio: Math.round(debtToIncomeRatio * 10) / 10,
      },
    };
  }

  if (score >= 70) {
    band = 'low';
    bandLabel = 'Nízké riziko';
    bandNote = 'Nájemník odpovídá profilu, se kterým bývá pronájem bez problémů. Pojistky ve smlouvě si přesto nastavte.';
  } else if (score >= 50) {
    band = 'medium';
    bandLabel = 'Zvýšené riziko';
    bandNote = 'Pronajmout se dá, ale ne za standardních podmínek. Rozdíl udělá to, co si ošetříte ve smlouvě.';
  } else if (score >= 30) {
    band = 'high';
    bandLabel = 'Vysoké riziko';
    bandNote = 'Bez zásadního zajištění bychom do toho nešli. Rozhodnutí je na vás, ale jděte do něj s otevřenýma očima.';
  } else {
    band = 'critical';
    bandLabel = 'Kritické riziko';
    bandNote = 'Tohle je profil, který v našich případech končí neplacením nejčastěji. Doporučujeme nepodepisovat.';
  }

  return {
    score: Math.round(score),
    band,
    bandLabel,
    bandNote,
    unverified,
    riskFactors,
    recommendations,
    metrics: {
      totalIncome,
      totalExpenses,
      disposableIncome,
      rentToIncomeRatio: Math.round(rentToIncomeRatio * 10) / 10,
      reserveMonths: Math.round(reserveMonths * 10) / 10,
      debtToIncomeRatio: Math.round(debtToIncomeRatio * 10) / 10,
    },
  };
}

/**
 * Kroky průvodce. Formulář se neukazuje jako zeď políček, ale po čtyřech
 * krocích, a skóre se přepočítává živě při každé změně.
 */
const PRESCORING_STEPS = [
  { key: 'zaklad',  title: 'Nemovitost a nájemník', note: 'Bez nájemného a příjmu nejde spočítat nic. Zbytek můžete nechat prázdný.' },
  { key: 'prijmy',  title: 'Příjmy domácnosti',     note: 'Zajímá nás, z čeho se nájem platí a jak je ten zdroj jistý.' },
  { key: 'zavazky', title: 'Závazky a rezerva',     note: 'Co z příjmu odchází dřív, než dojde na nájem.' },
  { key: 'zajisteni', title: 'Zajištění a prověření', note: 'Tady se skóre nejčastěji láme. Neověřený zájemce nemůže vyjít jako nízké riziko.' },
];

/** Alpine komponenta. Skóre a pásmo zdarma, rozpad a doporučení za e-mail. */
function prescoring() {
  return {
    steps: PRESCORING_STEPS,
    stepIndex: 0,
    screen: 'form', // form | preview | full
    sending: false,
    error: '',
    email: '',
    consent: false,
    result: null,
    live: null,
    form: {
      monthlyRent: '', age: '', familyMembers: '', employmentType: 'permanent',
      employmentLength: '', previousRental: '',
      mainIncome: '', additionalIncome: '', partnerIncome: '', otherResidentsIncome: '',
      socialBenefits: '', incomeStability: 'stable', incomeProof: 'employer',
      seasonalWork: false, probationPeriod: false,
      loanPayments: '', creditCards: '', alimony: '', insurance: '', otherRents: '',
      livingExpenses: '', financialReserve: '', debtHistory: 'clean',
      creditRegistry: 'not_checked', hasExecution: false,
      allResidentsSigned: false, hasGuarantor: false,
      guarantorIncome: '', guarantorEmployment: 'stable', guarantorDebt: 'none',
      guarantorRelation: 'family',
    },

    get ready() {
      return NUM(this.form.monthlyRent) > 0 && NUM(this.form.mainIncome) > 0;
    },
    get step() {
      return this.steps[this.stepIndex];
    },
    get progress() {
      return Math.round(((this.stepIndex + 1) / this.steps.length) * 100);
    },
    get isLast() {
      return this.stepIndex === this.steps.length - 1;
    },

    /** Kolik z klíčových ověření je hotových. Řídí ukazatel spolehlivosti. */
    get coverage() {
      const f = this.form;
      let done = 0;
      if (f.creditRegistry && f.creditRegistry !== 'not_checked') done++;
      if (f.incomeProof && f.incomeProof !== 'unconfirmed') done++;
      if (f.previousRental) done++;
      return { done, total: 3 };
    },

    /** Přepočet skóre při každé změně, aby ukazatel žil. */
    recalc() {
      this.live = this.ready ? scoreTenant(this.form) : null;
    },

    next() {
      if (this.stepIndex === 0 && !this.ready) {
        this.error = 'Vyplňte alespoň měsíční nájemné a hlavní příjem nájemníka.';
        return;
      }
      this.error = '';
      if (this.isLast) return this.calculate();
      this.stepIndex++;
      this.toTop();
    },

    prev() {
      if (this.stepIndex > 0) { this.stepIndex--; this.toTop(); }
    },

    goTo(i) {
      if (i <= this.stepIndex || this.ready) { this.stepIndex = i; this.toTop(); }
    },

    toTop() {
      const el = document.getElementById('pruvodce');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    calculate() {
      if (!this.ready) {
        this.error = 'Vyplňte alespoň měsíční nájemné a hlavní příjem nájemníka.';
        return;
      }
      this.error = '';
      this.result = scoreTenant(this.form);
      this.screen = 'preview';
      this.$nextTick(() => this.toTop());
    },

    async unlock() {
      if (!this.email.trim() || !this.consent) {
        this.error = 'Vyplňte e-mail a potvrďte souhlas.';
        return;
      }
      this.sending = true;
      this.error = '';

      const payload = {
        email: this.email,
        consent: this.consent,
        form: this.form,
        result: this.result,
        source: 'problemovynajemnik.cz/prescoring',
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
          console.warn('LEAD_ENDPOINT není nastavený, výsledek se neodeslal.', payload);
        }
        this.screen = 'full';
      } catch (e) {
        this.error = 'Odeslání se nepodařilo. Zkuste to prosím znovu.';
      } finally {
        this.sending = false;
      }
    },

    reset() {
      this.screen = 'form';
      this.stepIndex = 0;
      this.result = null;
      this.error = '';
      this.toTop();
    },
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { scoreTenant };
}
