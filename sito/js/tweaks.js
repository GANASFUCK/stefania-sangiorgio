/* ------------------------------------------------------------------
   Barra dei ritocchi — solo per la bozza.
   Si apre e si chiude col tasto R o col pulsantino in basso a destra.
   Ogni controllo cambia una variabile del :root di style.css e manda
   l'evento «ritocchi», così app.js rimisura e ridisegna.
   I valori restano dopo il ricaricamento (localStorage).
   «Copia i valori» mette negli appunti il blocco :root da fissare
   in style.css. Il sito non dipende da questo file.
   Online la barra resta spenta da sola: si accende solo in locale,
   oppure aggiungendo ?ritocchi all'indirizzo (per far provare un
   controllo a qualcuno).
------------------------------------------------------------------- */
(() => {
  if (!/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) && !/[?&]ritocchi\b/.test(location.search)) return;
  const KEY = 'stefania-portfolio-ritocchi';
  const root = document.documentElement;
  const css = getComputedStyle(root);
  const MESI = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
  const num = (v, d) => { const n = parseFloat(v); return Number.isFinite(n) ? n : d; };
  const pct = v => `${Math.round(v * 100)}%`;
  const per = v => `${v}%`;

  /* durate delle comparse: una manopola le scala tutte insieme */
  const DUR = ['--t-fade', '--t-rise', '--t-line'];
  const durBase = Object.fromEntries(DUR.map(k => [k, num(css.getPropertyValue(k), 1.2)]));

  const CONTROLS = [
    { g: 'Spazi', k: '--air', label: 'Aria: tutti gli spazi verticali del sito (non la distanza fra le cover)', min: 0.4, max: 1.8, step: 0.05, fmt: pct },
    { g: 'Home, le cover', k: '--cover-gap', label: 'Distanza fra le cover, in multipli del margine laterale', min: 0, max: 6, step: 0.25,
      fmt: v => (v == 0 ? 'attaccate' : `${String(v).replace('.', ',')} × margine`) },
    { g: 'Home, le cover', k: '--cover-m', label: 'Margine ai lati delle cover (0 = a filo dello schermo)', min: 0, max: 3, step: 0.25,
      fmt: v => (v == 0 ? 'a filo' : `${String(v).replace('.', ',')} × margine`) },
    { g: 'Home, le cover', k: '--cover-h', label: 'Altezza delle cover, in % dello schermo', min: 40, max: 100, step: 1, fmt: per },
    { g: 'Home, le cover', k: '--logo-k', label: 'Grandezza del logo', min: 0.5, max: 1.8, step: 0.05, fmt: pct },
    { g: 'Home, le cover', k: '--sw-alterna', type: 'toggle', label: 'Impaginazione alternata: una cover intera, poi due affiancate' },
    { g: 'Video', k: '--video-hover', type: 'choice', label: 'I video delle cover e dello slider partono',
      options: [[1, 'al passaggio del mouse'], [0, 'da soli quando si vedono']] },
    { g: 'Movimento', k: '--drift', label: 'Scarto dell’immagine dentro la cornice', min: 0, max: 16, step: 0.5,
      fmt: v => (v == 0 ? 'nessuno' : `${String(v).replace('.', ',')}%`) },
    { g: 'Movimento', k: '--dur-k', label: 'Durata delle comparse', min: 0.4, max: 2, step: 0.05, def: 1,
      fmt: v => `${pct(v)} · ${(durBase['--t-rise'] * v).toFixed(2).replace('.', ',')} secondi` },
    { g: 'Slider dei progetti', k: '--slide-w', label: 'Larghezza della scheda protagonista, in % dello schermo', min: 30, max: 90, step: 1, fmt: per },
    { g: 'Chicche', k: '--sw-indice', type: 'toggle', label: 'Indice delle cover nella testata' },
    { g: 'Chicche', k: '--sw-lettura', type: 'toggle', label: 'Linea di lettura nei progetti' },
    { g: 'Chicche', k: '--sw-frecce', type: 'toggle', label: 'Frecce sinistra e destra fra i progetti' },
    { g: 'Chicche', k: '--sw-testata', type: 'toggle', label: 'Testata che si ritira scendendo' },
    { g: 'Chicche', k: '--sw-precarico', type: 'toggle', label: 'Precarico del progetto successivo' },
  ];

  /* il valore di partenza è quello scritto in style.css */
  CONTROLS.forEach(c => { c.def = c.def ?? num(css.getPropertyValue(c.k), c.type === 'toggle' ? 1 : c.type === 'choice' ? c.options[0][0] : c.min); });
  const note = (c, v) => c.type === 'toggle' ? (v > 0 ? 'accesa' : 'spenta')
    : c.type === 'choice' ? (c.options.find(o => o[0] === +v) || c.options[0])[1] : c.fmt(+v);

  /* ------------------------------------------------ memoria */
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; } };
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* senza memoria la barra funziona lo stesso */ } };
  const state = load();
  /* 24 Novembre 2026: la distanza fra le cover è passata da «% dello schermo» a
     «multipli del margine» e il movimento del logo non c'è più. I valori salvati
     prima non valgono più: si buttano, gli altri restano. */
  if (!(state.__v >= 2)) { delete state['--cover-gap']; delete state['--logo-move']; state.__v = 2; save(); }
  const val = c => (c.k in state ? state[c.k] : c.def);

  function apply(c, v) {
    if (c.k === '--dur-k') DUR.forEach(k => root.style.setProperty(k, `${+(durBase[k] * v).toFixed(3)}s`));
    else root.style.setProperty(c.k, String(v));
  }
  const notify = () => dispatchEvent(new Event('ritocchi'));

  /* i valori salvati entrano subito, prima che il sito si disegni */
  CONTROLS.forEach(c => { if (c.k in state) apply(c, state[c.k]); });

  /* ------------------------------------------------ pannello */
  function build() {
    const wrap = document.createElement('div');
    wrap.className = 'tw';
    const groups = [...new Set(CONTROLS.map(c => c.g))];
    wrap.innerHTML = `
      <button class="tw-pill" type="button" aria-expanded="false" aria-controls="tw-panel" title="Ritocchi (tasto R)">Ritocchi</button>
      <section class="tw-panel" id="tw-panel" aria-label="Ritocchi" hidden>
        <header class="tw-top">
          <b>Ritocchi</b><span>tasto R</span>
          <button type="button" class="tw-x" data-close>Chiudi</button>
        </header>
        <div class="tw-body">
          ${groups.map(g => `
          <fieldset class="tw-g">
            <legend>${g}</legend>
            ${CONTROLS.filter(c => c.g === g).map(c => c.type === 'toggle' ? `
            <label class="tw-row tw-sw">
              <span class="tw-l">${c.label}</span>
              <input type="checkbox" data-k="${c.k}"><i aria-hidden="true"></i>
            </label>` : c.type === 'choice' ? `
            <div class="tw-row tw-ch" role="radiogroup" aria-label="${c.label}">
              <span class="tw-l">${c.label}</span>
              <span class="tw-seg">${c.options.map(([v, t]) => `
                <label><input type="radio" name="tw${c.k}" value="${v}" data-k="${c.k}"><span>${t}</span></label>`).join('')}
              </span>
            </div>` : `
            <label class="tw-row">
              <span class="tw-l">${c.label}</span>
              <output data-o="${c.k}"></output>
              <input type="range" data-k="${c.k}" min="${c.min}" max="${c.max}" step="${c.step}">
            </label>`).join('')}
          </fieldset>`).join('')}
        </div>
        <footer class="tw-foot">
          <button type="button" class="tw-b tw-main" data-copy>Copia i valori</button>
          <button type="button" class="tw-b" data-reset>Ripristina</button>
        </footer>
        <textarea class="tw-out" readonly hidden aria-label="Valori da copiare"></textarea>
      </section>`;
    document.body.appendChild(wrap);

    const pill = wrap.querySelector('.tw-pill'), panel = wrap.querySelector('.tw-panel');
    const out = wrap.querySelector('.tw-out'), copyBtn = wrap.querySelector('[data-copy]');
    const byK = k => CONTROLS.find(c => c.k === k);

    const show = c => {
      const v = val(c);
      const input = wrap.querySelector(`[data-k="${c.k}"]`);
      if (c.type === 'toggle') input.checked = v > 0;
      else if (c.type === 'choice') wrap.querySelectorAll(`[data-k="${c.k}"]`).forEach(r => { r.checked = +r.value === +v; });
      else { input.value = v; wrap.querySelector(`[data-o="${c.k}"]`).textContent = c.fmt(+v); }
    };
    CONTROLS.forEach(show);

    wrap.querySelectorAll('[data-k]').forEach(input => {
      const c = byK(input.dataset.k);
      const set = () => {
        const v = c.type === 'toggle' ? (input.checked ? 1 : 0) : +input.value;
        if (v === c.def) delete state[c.k]; else state[c.k] = v;
        apply(c, v); save(); show(c); notify();
      };
      input.addEventListener(c.type === 'toggle' || c.type === 'choice' ? 'change' : 'input', set);
    });

    const open = on => {
      panel.hidden = !on; pill.setAttribute('aria-expanded', String(on));
      wrap.classList.toggle('open', on);
      try { localStorage.setItem(KEY + '-aperta', on ? '1' : '0'); } catch (e) { /* niente */ }
    };
    pill.addEventListener('click', () => open(panel.hidden));
    wrap.querySelector('[data-close]').addEventListener('click', () => open(false));
    addEventListener('keydown', e => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target;
      if (t && t.closest && t.closest('textarea, [contenteditable="true"], input[type="text"], input[type="search"], input[type="email"]')) return;
      if (e.key === 'r' || e.key === 'R') { e.preventDefault(); open(panel.hidden); }
      else if (e.key === 'Escape' && !panel.hidden) open(false);
    });
    let aperta = false;
    try { aperta = localStorage.getItem(KEY + '-aperta') === '1'; } catch (e) { /* niente */ }
    open(aperta);

    /* testo da fissare nel :root di style.css */
    const text = () => {
      const d = new Date();
      const ora = `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
      const lines = CONTROLS.map(c => {
        const v = val(c);
        if (c.k === '--dur-k') return DUR.map(k => `  ${k}:${+(durBase[k] * v).toFixed(3)}s;`).join('\n') + `   /* ${c.label}: ${c.fmt(v)} */`;
        return `  ${c.k}:${v};   /* ${c.label}: ${note(c, v)} */`;
      });
      return `/* Ritocchi di Gianluca · ${d.getDate()} ${MESI[d.getMonth()]} ${d.getFullYear()}, ${ora} */\n:root{\n${lines.join('\n')}\n}\n`;
    };
    const done = msg => { copyBtn.textContent = msg; setTimeout(() => { copyBtn.textContent = 'Copia i valori'; }, 1800); };
    copyBtn.addEventListener('click', async () => {
      const t = text();
      try { await navigator.clipboard.writeText(t); done('Copiato'); out.hidden = true; return; } catch (e) { /* si prova l'altra strada */ }
      out.value = t; out.hidden = false; out.focus(); out.select();
      try { done(document.execCommand('copy') ? 'Copiato' : 'Selezionato: copia a mano'); } catch (e) { done('Selezionato: copia a mano'); }
    });

    wrap.querySelector('[data-reset]').addEventListener('click', () => {
      Object.keys(state).forEach(k => delete state[k]);
      DUR.forEach(k => root.style.removeProperty(k));
      CONTROLS.forEach(c => { root.style.removeProperty(c.k); show(c); });
      save(); notify();
    });
  }

  if (document.body) build(); else addEventListener('DOMContentLoaded', build);
})();
