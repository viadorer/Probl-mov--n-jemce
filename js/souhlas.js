/**
 * Souhlas s cookies a Google Analytics.
 *
 * GA se načte až po výslovném souhlasu (zákon o elektronických komunikacích
 * § 89 odst. 3, opt-in). Bez souhlasu neodchází žádný požadavek na Google.
 * Volba se pamatuje v localStorage na 12 měsíců; jde ji změnit odkazem
 * „Nastavení cookies“ v patičce (window.nastaveniCookies()).
 */
(function () {
  var GA_ID = 'G-6YFF3XYT5Z';
  var KLIC = 'pn_souhlas_cookies';
  var PLATNOST_MS = 365 * 24 * 60 * 60 * 1000;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });

  function nactiVolbu() {
    try {
      var v = JSON.parse(localStorage.getItem(KLIC) || 'null');
      if (v && (v.mereni === true || v.mereni === false) && Date.now() - v.kdy < PLATNOST_MS) return v.mereni;
    } catch (e) { /* úložiště nemusí být dostupné */ }
    return null;
  }

  function ulozVolbu(mereni) {
    try { localStorage.setItem(KLIC, JSON.stringify({ mereni: mereni, kdy: Date.now() })); } catch (e) { /* nic */ }
  }

  var gaNacteno = false;
  function spustMereni() {
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    if (gaNacteno) return;
    gaNacteno = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  function smazGaCookies() {
    document.cookie.split(';').forEach(function (c) {
      var jmeno = c.split('=')[0].trim();
      if (/^_ga/.test(jmeno)) {
        var dom = location.hostname.replace(/^www\./, '');
        ['', '; domain=.' + dom, '; domain=' + location.hostname].forEach(function (d) {
          document.cookie = jmeno + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + d;
        });
      }
    });
  }

  function lista() {
    if (document.getElementById('pn-souhlas')) return;
    var el = document.createElement('div');
    el.id = 'pn-souhlas';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Souhlas s cookies');
    el.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;margin:0 auto;'
      + 'background:#111827;color:#fff;border-radius:20px;padding:20px;box-shadow:0 10px 40px rgba(0,0,0,.25);'
      + 'font:15px/1.5 Inter,system-ui,-apple-system,sans-serif';
    el.innerHTML = ''
      + '<p style="margin:0 0 14px">Rádi bychom měřili návštěvnost přes Google Analytics, abychom věděli, co na webu funguje. '
      + 'Bez vašeho souhlasu nic neměříme. <a href="/cookies.html" style="color:#fff;text-decoration:underline">Podrobnosti</a></p>'
      + '<div style="display:flex;gap:10px;flex-wrap:wrap">'
      + '<button type="button" data-volba="ne" style="flex:1;min-width:140px;min-height:48px;border-radius:999px;border:2px solid rgba(255,255,255,.3);background:transparent;color:#fff;font-weight:700;cursor:pointer">Odmítnout</button>'
      + '<button type="button" data-volba="ano" style="flex:1;min-width:140px;min-height:48px;border-radius:999px;border:0;background:#fff;color:#111827;font-weight:700;cursor:pointer">Povolit měření</button>'
      + '</div>';
    el.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-volba]');
      if (!b) return;
      var ano = b.getAttribute('data-volba') === 'ano';
      ulozVolbu(ano);
      if (ano) spustMereni();
      else {
        window.gtag('consent', 'update', { analytics_storage: 'denied' });
        smazGaCookies();
      }
      el.remove();
    });
    document.body.appendChild(el);
  }

  window.nastaveniCookies = function () {
    var v = nactiVolbu();
    if (v === true) {
      // Odvolání souhlasu musí být stejně snadné jako jeho udělení.
      try { localStorage.removeItem(KLIC); } catch (e) { /* nic */ }
    }
    var stara = document.getElementById('pn-souhlas');
    if (stara) stara.remove();
    lista();
  };

  var volba = nactiVolbu();
  if (volba === true) spustMereni();
  else if (volba === null) {
    if (document.body) lista();
    else document.addEventListener('DOMContentLoaded', lista);
  }
})();
