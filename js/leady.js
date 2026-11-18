/**
 * Odesílání leadů do sdíleného backendu PTF (projekt ptf-reality).
 *
 * Kontrakt okopírovaný z frontend/src/lib/utils/leads.ts a components/forms/
 * Honeypot.tsx, aby se leady z téhle statické stránky chovaly stejně jako
 * z Nextu na ptf.cz a padaly do stejné fronty.
 *
 * Co backend (POST /api/leads) vyžaduje a co se stane, když to nedodržíš:
 *
 *  - first_name, last_name, email, gdpr_consent  → jinak 400
 *  - website (honeypot) musí být prázdné         → jinak TICHÉ zahození
 *  - _formElapsedMs >= 3000                      → jinak TICHÉ zahození
 *
 * Tiché zahození vrací 201 se success:true, takže se tváří jako úspěch.
 * Poznáš ho podle toho, že id je doslova 'ok' — skutečný lead má UUID.
 * Kvůli tomu tady odlišujeme "uloženo" od "server přijal".
 *
 * source: enum na straně DB je malý a uzavřený. Neznámou hodnotu backend
 * sám přepíše na 'web_formular' a původní uloží do metadata.form, takže
 * si můžeme posílat vlastní slug bez migrace.
 */

window.LEAD_API = {
  url: 'https://ptf-production.up.railway.app/api/leads',
  tenant: 'ptf-reality',
};

/**
 * Návnada pro roboty a časová pojistka. Vytvoř jednu instanci na formulář
 * při jeho vzniku — od té chvíle se měří čas.
 */
function honeypot() {
  const nacteno = Date.now();
  return {
    website: '',
    payload() {
      return { website: this.website, _formElapsedMs: Date.now() - nacteno };
    },
  };
}

/** Atribuce návštěvy. Jen to, co je potřeba k přiřazení leadu ke kampani. */
function navstevnik() {
  const q = new URLSearchParams(window.location.search);
  const sirka = window.innerWidth || 0;
  return {
    utmSource: q.get('utm_source') || undefined,
    utmMedium: q.get('utm_medium') || undefined,
    utmCampaign: q.get('utm_campaign') || undefined,
    utmTerm: q.get('utm_term') || undefined,
    utmContent: q.get('utm_content') || undefined,
    landingUrl: window.location.href,
    referrer: document.referrer || undefined,
    deviceType: sirka < 768 ? 'mobile' : (sirka < 1024 ? 'tablet' : 'desktop'),
  };
}

/** Slug stránky, ze které formulář odešel. */
function slugStranky() {
  const cesta = window.location.pathname.replace(/^\/+|\/+$/g, '').replace(/\.html$/, '');
  if (!cesta) return 'home';
  return cesta.toLowerCase().replace(/[^a-z0-9/_-]/g, '').slice(0, 60);
}

/**
 * Odešle lead. Vrací { ulozeno, prijato, id, chyba }.
 *
 *  ulozeno === true   lead je v databázi, můžeme slíbit, že se ozveme
 *  prijato === true   server odpověděl 2xx, ale lead zahodil jako robota
 *  ulozeno === false  ani jedno — ukaž telefon, ne potvrzení
 */
async function odeslatLead(data) {
  const jmeno = (data.name || '').trim();
  if (!jmeno || !data.gdpr_consent) {
    return { ulozeno: false, prijato: false, chyba: 'Vyplňte jméno a potvrďte souhlas se zpracováním údajů.' };
  }

  const casti = jmeno.split(/\s+/);
  const first_name = casti[0] || '';
  const last_name = casti.slice(1).join(' ') || casti[0] || '';

  const telefon = (data.phone || '').trim();
  // Backend e-mail vyžaduje, ale u nás je nepovinný. Stejnou náhradu
  // používá TriageWizard na ptf.cz, ať jsou leady porovnatelné.
  const email = (data.email || '').trim() || (telefon
    ? telefon.replace(/\s/g, '') + '@bez-emailu.local'
    : '');

  if (!email) {
    return { ulozeno: false, prijato: false, chyba: 'Vyplňte telefon nebo e-mail, ať se vám máme jak ozvat.' };
  }

  const telo = {
    first_name,
    last_name,
    email,
    phone: telefon || undefined,
    message: data.message || undefined,
    source: data.source,
    gdpr_consent: true,
    marketing_consent: data.marketing_consent || false,
    website: data.website || '',
    _formElapsedMs: data._formElapsedMs,
    // form = konkrétní formulář (zdroj), podle něj backend určí typ případu
    // a přiřazení. Stránka zvlášť, ať jde poznat, kde formulář byl.
    metadata: { ...(data.metadata || {}), form: (data.metadata && data.metadata.form) || data.source || slugStranky(), stranka: slugStranky() },
    visitor_data: navstevnik(),
  };

  try {
    const res = await fetch(window.LEAD_API.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Tenant-Slug': window.LEAD_API.tenant,
      },
      body: JSON.stringify(telo),
    });

    if (!res.ok) {
      let chyba = 'Odeslání se nepodařilo.';
      if (res.status === 429) {
        chyba = 'Odesláno příliš mnoho požadavků. Zkuste to prosím za chvíli, nebo rovnou zavolejte.';
      } else {
        try { chyba = (await res.json()).error || chyba; } catch (e) { /* tělo nemusí být JSON */ }
      }
      return { ulozeno: false, prijato: false, chyba };
    }

    const vysledek = await res.json();
    // 'ok' místo UUID znamená, že to backend vyhodnotil jako robota.
    const ulozeno = !!vysledek.id && vysledek.id !== 'ok';
    // Konverze do GA, jen když lead opravdu vznikl.
    if (ulozeno && typeof window.gtag === 'function') {
      try { window.gtag('event', 'generate_lead', { form: telo.metadata.form }); } catch (e) { /* měření nesmí shodit formulář */ }
    }
    return { ulozeno, prijato: true, id: vysledek.id, chyba: '' };
  } catch (e) {
    return { ulozeno: false, prijato: false, chyba: 'Spojení se nepodařilo navázat.' };
  }
}
