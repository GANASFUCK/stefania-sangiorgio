/* ------------------------------------------------------------------
   Stefania Sangiorgio — portfolio · motore
   Una pagina sola con tre viste: home, progetto, about.
   Comparse con IntersectionObserver; le cose legate allo scroll
   (media dentro le cover, indice, MacBook, fila di iPhone, slider
   dei progetti) leggono la posizione una volta per fotogramma
   dentro tick() e toccano solo transform e opacity.
   I valori regolabili (misure delle cover, aria, scarto, video,
   chicche) stanno come variabili nel :root di style.css: la barra
   dei ritocchi li cambia e manda l'evento «ritocchi».
------------------------------------------------------------------- */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const app = $('#app'), curtain = $('#curtain');
  const head = $('#head'), ix = $('#ix'), readline = $('#readline'), readbar = readline && readline.firstElementChild;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  /* due fotogrammi; se la scheda è in secondo piano i fotogrammi si fermano,
     e la tendina non deve restare chiusa: dopo 150 ms si va avanti lo stesso */
  const frame = () => new Promise(r => {
    let done = false; const on = () => { if (!done) { done = true; r(); } };
    requestAnimationFrame(() => requestAnimationFrame(on)); setTimeout(on, 150);
  });
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)');   /* c'è un mouse */
  const pad2 = n => String(n).padStart(2, '0');
  const N = PROJECTS.length;

  /* ---------------------------------------------------------- pezzi */
  const mediaTag = (it, lazy = true) => it.video
    ? `<video data-auto muted loop playsinline preload="metadata"${it.poster ? ` poster="${it.poster}"` : ''} src="${it.video}"></video>`
    : `<img src="${it.src}" alt="${it.alt || ''}"${lazy ? ' loading="lazy"' : ''} decoding="async">`;

  /* cover e schede dello slider: il poster fermo sta sopra il video
     e si dissolve solo quando il video gira davvero, così non si vede
     lo scatto fra poster e primo fotogramma */
  const loopMedia = (c, preload, attr = '') => c.video
    ? `<video data-loop muted loop playsinline preload="${preload}" src="${c.video}" aria-hidden="true"></video><img class="pv" src="${c.poster}" alt="" decoding="async"${attr}>`
    : `<img src="${c.poster}" alt="" decoding="async"${attr}>`;

  const logoTag = (p, deco) => p.logo
    ? `<img src="${p.logo}" alt="${deco ? '' : p.brand}">`
    : `<span class="wordmark">${p.brand}</span>`;

  /* didascalia di cover e schede: brand — titolo, e a destra numero o anno */
  const caption = (p, right) => `
    <span class="cap-l"><b>${p.brand}</b><span class="sep" aria-hidden="true">—</span><span class="t cap-t">${p.title}</span></span>
    ${right}`;

  /* colonna che scorre di una riga per volta: indice e contatori */
  const roll = items => `<i>${items.map(t => `<span>${t}</span>`).join('')}</i>`;
  const setRoll = (el, i, instant) => {
    if (!el) return;
    const col = el.firstElementChild;
    if (instant) col.style.transition = 'none';
    col.style.transform = `translate3d(0,${(-i / col.children.length * 100).toFixed(4)}%,0)`;
    if (instant) { void col.offsetHeight; col.style.transition = ''; }
  };

  const arrow = d => `<svg viewBox="0 0 16 10" aria-hidden="true" data-dir="${d}"><path d="${d < 0 ? 'M15.5 5H1M5 1 1 5l4 4' : 'M.5 5H15M11 1l4 4-4 4'}" fill="none" stroke="currentColor" stroke-width="1"/></svg>`;

  /* slider degli altri progetti: in fondo a ogni progetto e in About */
  const slider = (title, list) => `
    <section class="more" data-slider data-rgroup>
      <div class="more-head" data-r>
        <h2>${title}</h2>
        <div class="more-ctrl">
          <button type="button" data-step="-1" aria-label="Previous">${arrow(-1)}</button>
          <span class="more-n" aria-hidden="true"><span class="roll" data-roll>${roll(list.map((_, i) => pad2(i + 1)))}</span><span>/ ${pad2(list.length)}</span></span>
          <button type="button" data-step="1" aria-label="Next">${arrow(1)}</button>
        </div>
      </div>
      <div class="more-track" tabindex="0" role="group" aria-label="${title}">
        ${list.map(p => `
        <a class="slide" href="#/work/${p.slug}" draggable="false" data-slug="${p.slug}" style="--pos:${p.cover.pos || '50% 50%'};--tint:${p.cover.tint ?? .12};--slw:${parseFloat(p.lw) || 24};--slh:${parseFloat(p.lh) || 12}">
          <div class="slide-media"><div class="m">
            <div class="slide-in">${loopMedia(p.cover, 'none', ' draggable="false"')}</div>
            <div class="slide-shade"></div>
            ${p.cover.nologo ? '' : `<div class="slide-logo" aria-hidden="true">${logoTag(p, true)}</div>`}
          </div></div>
          <div class="slide-cap">${caption(p, `<span class="y">${p.year || ''}</span>`)}</div>
        </a>`).join('')}
        <i class="more-end" aria-hidden="true"></i>
      </div>
    </section>`;

  const footer = () => `
    <footer class="foot">
      <span>© ${new Date().getFullYear()} ${SITE.name}</span>
      <ul>
        <li><a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li>
        <li><a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a></li>
        <li><a href="${SITE.behance}" target="_blank" rel="noopener">Behance</a></li>
      </ul>
    </footer>`;

  /* ----------------------------------------------------------- HOME */
  function viewHome() {
    document.title = `${SITE.name} — ${SITE.role}`;
    return `
    <section class="intro">
      <h1 class="intro-line" tabindex="-1">
        <span class="ln" style="--d:80ms"><span>Stefania Sangiorgio is a creative director</span></span>
        <span class="ln" style="--d:170ms"><span>and <em>copywriter</em> at LePub, Milan.</span></span>
      </h1>
      <div class="intro-meta" data-r style="--d:420ms">
        <span>Selected work</span>
        <span>2019 — 2026</span>
        <span aria-hidden="true">Scroll <i></i></span>
      </div>
    </section>

    <section class="covers${cfg.alterna ? ' alt' : ''}" id="covers" aria-label="Selected work">
      ${PROJECTS.map((p, i) => `
      <a class="cover" href="#/work/${p.slug}" style="--tint:${p.cover.tint ?? .12};--pos:${p.cover.pos || '50% 50%'};--lw:${p.lw || '24vw'};--lh:${p.lh || '12vh'}">
        <div class="cover-frame">
          <div class="m">
            <div class="cover-media">${loopMedia(p.cover, 'metadata')}</div>
            <div class="cover-shade"></div>
            ${p.cover.nologo ? '' : `<div class="cover-logo" aria-hidden="true">${logoTag(p, true)}</div>`}
          </div>
          <div class="cover-cap">${caption(p, `<span class="n" aria-hidden="true">${pad2(i + 1)} / ${pad2(N)}</span>`)}</div>
        </div>
      </a>`).join('')}
    </section>

    <section class="outro">
      <p class="outro-line" data-r><a href="#/about">About Stefania</a></p>
    </section>
    ${footer()}`;
  }

  /* ----------------------------------------------------------- CASE */
  const playLabel = `<span><svg viewBox="0 0 9 11" aria-hidden="true"><path d="M0 0l9 5.5L0 11z" fill="currentColor"/></svg>Play</span>`;
  const B = {
    full: b => `
      <figure class="b b-full"${b.contain ? '' : ' data-par'}>
        <div class="media${b.dark ? ' dark' : ''}${b.contain ? ' contain' : ''}" style="--ar:${b.ar || '16/9'}"><div class="m">${mediaTag(b)}</div></div>
      </figure>`,
    wide: b => `
      <figure class="b b-wide">
        <div class="media${b.dark ? ' dark' : ''}" style="--ar:${b.ar || '16/9'}"><div class="m">${mediaTag(b)}</div></div>
      </figure>`,
    narrow: b => `
      <figure class="b b-narrow" style="width:min(${b.w || '520px'},calc(100vw - var(--pad)*2))">
        <div class="media" style="--ar:${b.ar || '3/4'}"><div class="m">${mediaTag(b)}</div></div>
      </figure>`,
    film: b => `
      <figure class="b ${b.full ? 'b-full' : 'b-wide'}">
        <div class="media dark film" style="--ar:${b.ar || '16/9'}" data-film>
          <div class="m"><video playsinline preload="none" poster="${b.poster}" src="${b.src}"></video></div>
          <button class="play" type="button" aria-label="Play film">${playLabel}</button>
        </div>
      </figure>`,
    embed: b => `
      <figure class="b ${b.full ? 'b-full' : 'b-wide'}">
        <div class="media dark film" style="--ar:${b.ar || '16/9'}" data-embed="${b.src}">
          <div class="m"><img src="${b.poster}" alt="" loading="lazy" decoding="async"></div>
          <button class="play" type="button" aria-label="Play film">${playLabel}</button>
        </div>
      </figure>`,
    text: b => `<div class="b b-text" data-r>${b.html}</div>`,
    label: b => `<div class="b b-label" data-r><h2>${b.text}</h2><span>${b.n || ''}</span></div>`,
    quote: b => `
      <div class="b b-quote" data-r>
        ${b.note ? `<p class="note">${b.note}</p>` : ''}
        <blockquote>${b.quote}</blockquote>
      </div>`,
    grid: b => `
      <div class="b grid" style="--cols:${b.cols || 2}${b.ar ? `;--ar:${b.ar}` : ''}">
        ${b.items.map(it => `<div class="media"><div class="m">${mediaTag(it)}</div></div>`).join('')}
      </div>`,
    /* numeri: tutti su una riga, in grassetto; il corpo lo regola fitStats() */
    stats: b => `
      <div class="b stats" data-stats>
        ${b.items.map((s, i) => `<div class="stat" data-r style="--d:${i * 90}ms"><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}
      </div>`,
    credits: b => `
      <section class="b credits" data-r>
        <h2>${b.title || 'Credits'}</h2>
        <ul>
          ${b.groups.map(g => `${g[0] ? `<li class="grp">${g[0]}</li>` : ''}${g[1].map(c => `<li><span>${c[0]}</span>${c[1]}</li>`).join('')}`).join('')}
        </ul>
      </section>`,
    laptop: b => `
      <div class="b mac" data-mac>
        <div class="mac-stage">
          <div class="mac-lid"><div class="mac-screen"><video muted loop playsinline preload="metadata" poster="${b.poster}" src="${b.src}"></video></div></div>
          <div class="mac-base"></div>
          <div class="mac-shadow"></div>
        </div>
        ${b.sound ? `<div class="mac-cap" data-r><button type="button" class="sound" data-sound>Play with sound</button></div>` : ''}
      </div>`,
    phones: b => `
      <section class="b phones" data-phones>
        <div class="phones-sticky">
          <div class="phones-track">
            ${b.items.map(it => `
            <figure class="phone" tabindex="0" role="button" aria-pressed="false" aria-label="${it.name || 'Story'}, sound">
              <div class="phone-body"><div class="phone-screen"><video data-auto muted loop playsinline preload="none" poster="${it.poster}" src="${it.src}"></video></div></div>
              <figcaption><b>${it.name || ''}</b><span><span class="ph-snd">Sound</span>${it.n || ''}</span></figcaption>
            </figure>`).join('')}
          </div>
          <div class="phones-bar"><i></i></div>
        </div>
      </section>`,
  };

  function viewCase(p) {
    const i = PROJECTS.indexOf(p);
    const others = Array.from({ length: N - 1 }, (_, k) => PROJECTS[(i + 1 + k) % N]);
    document.title = `${p.brand} — ${p.title} · ${SITE.name}`;
    return `
    <article class="case">
      <header class="case-head">
        <div class="case-brand" data-r style="--d:60ms;--bh:${p.bh || '22px'}">${logoTag(p)}</div>
        <h1 class="case-title" tabindex="-1"><span class="ln" style="--d:140ms"><span>${p.title}</span></span></h1>
        ${p.sub ? `<p class="case-sub" data-r style="--d:330ms">${p.sub}</p>` : ''}
        <div class="case-intro" data-r style="--d:430ms">${p.intro.map(t => `<p>${t}</p>`).join('')}</div>
        <dl class="case-meta" data-r style="--d:540ms">
          ${p.meta.map(m => `<div><dt>${m[0]}</dt><dd>${m[1]}</dd></div>`).join('')}
        </dl>
        ${p.todo ? `<p class="todo" data-r style="--d:620ms">Bozza · ${p.todo}</p>` : ''}
      </header>
      <div class="blocks">
        ${p.blocks.map(b => (B[b.t] || (() => ''))(b)).join('')}
      </div>
      ${slider('Next project', others)}
      ${footer()}
    </article>`;
  }

  /* ---------------------------------------------------------- ABOUT */
  function viewAbout() {
    document.title = `About · ${SITE.name}`;
    const logos = PROJECTS.filter(p => p.logo).map(p => `<img src="${p.logo}" alt="" style="--h:${p.mh || '24px'}">`).join('');
    return `
    <section class="about">
      <div class="about-top">
        <div class="about-photo"><div class="m ph">Bozza · ritratto di Stefania da inserire</div></div>
        <h1 class="about-bio" tabindex="-1">
          <span class="ln" style="--d:120ms"><span>Hi, I’m Stefania Sangiorgio,</span></span>
          <span class="ln" style="--d:200ms"><span>Creative Director and <em>copywriter</em></span></span>
          <span class="ln" style="--d:280ms"><span>at LePub, Milan.</span></span>
        </h1>
      </div>

      <div class="about-cols">
        <div data-r>
          <h2>Experience</h2>
          <ul>
            <li>LePub <span>— Creative Director</span></li>
            <li>M&amp;C Saatchi <span>— Creative Director</span></li>
            <li>M&amp;C Saatchi <span>— Senior Creative Copywriter</span></li>
          </ul>
          <p class="todo">Bozza · anni e altre agenzie da inserire</p>
        </div>
        <div data-r style="--d:90ms">
          <h2>Select clients</h2>
          <ul>${['Netflix', 'Marvis', 'Lavazza', 'Collistar', 'Paramount+', 'Carrera', 'Geox', 'OVS', 'Sky'].map(c => `<li>${c}</li>`).join('')}</ul>
        </div>
        <div data-r style="--d:180ms">
          <h2>Awards</h2>
          <p class="todo">Bozza · premi da inserire (festival, categoria, metallo)</p>
        </div>
        <div data-r style="--d:270ms">
          <h2>Contact</h2>
          <ul>
            <li><a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="${SITE.behance}" target="_blank" rel="noopener">Behance</a></li>
          </ul>
          <p class="todo">Bozza · mail da inserire</p>
        </div>
      </div>
    </section>

    <div class="marquee" aria-hidden="true">
      <div class="marquee-track">${logos}${logos}${logos}${logos}</div>
    </div>

    <div class="about-more">${slider('Selected work', PROJECTS)}</div>
    ${footer()}`;
  }

  /* --------------------------------------------------------- router */
  let first = true, homeScroll = 0, route = null, busy = false;

  function parse() {
    const h = location.hash.replace(/^#\/?/, '');
    if (h.startsWith('work/')) {
      const p = PROJECTS.find(x => x.slug === h.slice(5));
      if (p) return { name: 'case', p };
    }
    if (h === 'about') return { name: 'about' };
    return { name: 'home' };
  }

  async function go() {
    if (busy) return; busy = true;
    const next = parse();
    if (route && route.name === 'home') homeScroll = scrollY;
    if (!first && ix) { ixState.on = false; ix.classList.remove('on'); }   /* l'indice sfuma mentre sale la tendina */
    if (!first && !still) { curtain.className = 'curtain up'; await wait(540); }
    unmount();
    app.innerHTML = next.name === 'case' ? viewCase(next.p) : next.name === 'about' ? viewAbout() : viewHome();
    $$('.head-nav a').forEach(a => {
      const on = a.dataset.nav === (next.name === 'about' ? 'about' : 'work');
      a.classList.toggle('on', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    scrollTo(0, next.name === 'home' && !first ? homeScroll : 0);
    route = next;
    mount();
    /* il fuoco va al titolo della pagina nuova: chi usa la tastiera o un lettore di schermo riparte da lì */
    if (!first) { const h = $('h1', app); if (h) h.focus({ preventScroll: true }); }
    if (!first && !still) {
      await frame();
      curtain.className = 'curtain off';
      enter(200);
      await wait(640);
      curtain.className = 'curtain';
    } else enter(120);
    first = false; busy = false;
    if (parse().name !== route.name || parse().p !== route.p) go();
  }

  /* la testata entra subito, senza aspettare lo scroll */
  function enter(delay) {
    setTimeout(() => {
      $$('.intro .ln, .intro [data-r], .case-head .ln, .case-head [data-r], .about-top .ln, .about-top [data-r]').forEach(el => el.classList.add('in'));
    }, delay);
  }

  /* ---------------------------------------------------------- mount */
  let ioReveal, ioVideo, ioPre, covers = [], macs = [], phones = [], pars = [], sliders = [], loops = [];

  function mount() {
    /* comparse; un gruppo (lo slider) compare tutto insieme */
    ioReveal = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      if (e.target.hasAttribute('data-rgroup')) $$('[data-r]', e.target).forEach(el => el.classList.add('in'));
      ioReveal.unobserve(e.target);
    }), { rootMargin: '0px 0px -6% 0px', threshold: 0 });
    $$('[data-r]').forEach(el => { if (!el.closest('.intro, .case-head, .about-top, [data-rgroup]')) ioReveal.observe(el); });
    $$('[data-rgroup]').forEach(el => ioReveal.observe(el));

    /* video: i loop dei progetti partono quando si vedono e si fermano fuori schermo;
       quelli delle cover e dello slider seguono loopSync() */
    loops = $$('video[data-loop]').map(v => {
      const host = v.closest('.cover, .slide');
      const o = { v, box: v.parentElement, hov: false, vis: false, t: 0 };
      const hover = on => { o.hov = on; loopSync(o); };
      host.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') hover(true); });
      host.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') hover(false); });
      host.addEventListener('focus', () => hover(true));
      host.addEventListener('blur', () => hover(false));
      v.addEventListener('playing', () => { if (wants(o)) o.box.classList.add('live'); });
      return o;
    });
    ioVideo = new IntersectionObserver(es => es.forEach(e => {
      const v = e.target;
      if (v.hasAttribute('data-loop')) {
        const o = loops.find(l => l.v === v); if (!o) return;
        o.vis = e.isIntersecting;
        if (o.vis && v.preload !== 'auto' && (hoverPlay() || autoPlay())) v.preload = 'auto';   /* pronto prima del mouse */
        loopSync(o);
        return;
      }
      if (e.isIntersecting) { const pr = v.play(); if (pr) pr.catch(() => {}); }
      else v.pause();
    }), { threshold: 0.12 });
    $$('video[data-auto]').forEach(v => {
      /* con il movimento ridotto i loop non partono da soli: si guardano coi comandi */
      if (still) { if (!v.closest('.phone')) v.controls = true; }
      else ioVideo.observe(v);
    });
    loops.forEach(o => ioVideo.observe(o.v));

    covers = $$('.cover').map(el => ({ el, frame: $('.cover-frame', el), media: $('.cover-media', el), top: 0, h: 1 }));
    macs = $$('[data-mac]').map(el => ({ el, video: $('video', el), open: false }));
    phones = $$('[data-phones]').map(el => ({ el, track: $('.phones-track', el), bar: $('.phones-bar', el), over: 0 }));
    pars = $$('[data-par]').map(el => ({ el, m: $('.m > *', el) }));

    /* slider: scroll nativo; trascinamento col mouse; un clic a fine trascinamento non apre */
    sliders = $$('[data-slider]').map(el => {
      const track = $('.more-track', el);
      const s = {
        el, track, roll: $('[data-roll]', el), prev: $('[data-step="-1"]', el), next: $('[data-step="1"]', el),
        slides: $$('.slide', el).map(a => ({ a, inner: $('.slide-in', a), left: 0 })),
        active: -1, target: 0, settle: null, tm: 0, dragged: false, hover: false,
        top: 0, h: 1, padL: 0, step: 1, max: 0, drift: 0,
      };
      track.addEventListener('scroll', () => { dirty = true; }, { passive: true });
      track.addEventListener('pointerdown', e => dragStart(s, e));
      track.addEventListener('click', e => { if (s.dragged) { e.preventDefault(); e.stopPropagation(); } s.dragged = false; }, true);
      track.addEventListener('dragstart', e => e.preventDefault());
      track.addEventListener('mouseenter', () => { s.hover = true; });
      track.addEventListener('mouseleave', () => { s.hover = false; });
      [s.prev, s.next].forEach(b => b.addEventListener('click', () => slideTo(s, (s.settle !== null ? s.target : s.active) + +b.dataset.step)));
      s.slides.forEach(sl => sl.a.addEventListener('pointerenter', () => preload(sl.a.dataset.slug)));
      return s;
    });

    /* chicca: quando lo slider si avvicina, il progetto successivo si scarica prima del clic */
    ioPre = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      ioPre.unobserve(e.target);
      const a = $('.slide', e.target); if (a) preload(a.dataset.slug);
    }), { rootMargin: '0px 0px 120% 0px' });
    sliders.forEach(s => ioPre.observe(s.el));

    /* film con audio */
    $$('[data-film]').forEach(box => {
      const v = $('video', box), btn = $('.play', box);
      btn.addEventListener('click', () => {
        $$('video').forEach(o => { if (o !== v && !o.muted) o.pause(); });
        v.controls = true; box.classList.add('playing');
        const pr = v.play(); if (pr) pr.catch(() => {});
        v.focus({ preventScroll: true });
      });
    });
    $$('[data-embed]').forEach(box => {
      $('.play', box).addEventListener('click', () => {
        $('.m', box).innerHTML = `<iframe src="${box.dataset.embed}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Film"></iframe>`;
        box.classList.add('playing');
      });
    });

    /* MacBook: anteprima muta, con audio su richiesta */
    $$('[data-sound]').forEach(btn => {
      const v = $('video', btn.closest('[data-mac]'));
      btn.addEventListener('click', () => {
        if (v.muted) { v.muted = false; v.loop = false; v.currentTime = 0; v.controls = true; v.play().catch(() => {}); btn.textContent = 'Mute'; }
        else { v.muted = true; v.controls = false; v.loop = true; btn.textContent = 'Play with sound'; }
      });
    });

    /* iPhone: un tocco (o Invio) accende l'audio di quella storia, un altro lo spegne */
    const phoneSound = ph => {
      const v = $('video', ph); if (!v) return;
      const on = v.muted;
      $$('.phone').forEach(o => {
        const ov = $('video', o); if (ov) ov.muted = true;
        o.classList.remove('loud'); o.setAttribute('aria-pressed', 'false');
        const l = $('.ph-snd', o); if (l) l.textContent = 'Sound';
      });
      if (on) {
        v.muted = false; v.currentTime = 0; v.play().catch(() => {});
        ph.classList.add('loud'); ph.setAttribute('aria-pressed', 'true');
        const l = $('.ph-snd', ph); if (l) l.textContent = 'Sound on';
      }
    };
    $$('.phone').forEach(ph => {
      ph.addEventListener('click', () => phoneSound(ph));
      ph.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); phoneSound(ph); } });
    });

    measure(); tick(true);
  }

  function unmount() {
    if (ioReveal) ioReveal.disconnect();
    if (ioVideo) ioVideo.disconnect();
    if (ioPre) ioPre.disconnect();
    loops.forEach(o => clearTimeout(o.t));
    $$('video', app).forEach(v => { v.pause(); v.removeAttribute('src'); v.load(); });
    sliders.forEach(release);
    covers = []; macs = []; phones = []; pars = []; sliders = []; loops = []; drag = null;
    headAway = false; acc = 0; lastY = -1; head.classList.remove('away');
    ixState.on = false; if (ix) ix.classList.remove('on');
  }

  /* ------------------------------------------------- valori regolabili
     Stanno nel :root di style.css; la barra dei ritocchi li cambia. */
  const root = document.documentElement;
  let cfg = {};
  function readCfg() {
    const cs = getComputedStyle(root);
    const n = (k, d) => { const v = parseFloat(cs.getPropertyValue(k)); return Number.isFinite(v) ? v : d; };
    cfg = {
      drift: Math.max(0, n('--drift', 7)) / 100,
      hover: n('--video-hover', 1) > 0,
      alterna: n('--sw-alterna', 0) > 0,
      indice: n('--sw-indice', 1) > 0,
      lettura: n('--sw-lettura', 1) > 0,
      frecce: n('--sw-frecce', 1) > 0,
      testata: n('--sw-testata', 1) > 0,
      precarico: n('--sw-precarico', 1) > 0,
    };
  }
  readCfg();

  /* ------------------------------------------ video delle cover e dello slider
     Con il mouse: al passaggio (valore di partenza) oppure da soli quando si
     vedono, secondo la barra dei ritocchi. Senza mouse (telefono): quando si
     vedono. Con il movimento ridotto: solo al passaggio del mouse. */
  const hoverPlay = () => fine.matches && (cfg.hover || still);
  const autoPlay = () => !still && !hoverPlay();
  const wants = o => (hoverPlay() ? o.hov : autoPlay() && o.vis);

  function loopSync(o) {
    clearTimeout(o.t);
    if (wants(o)) {
      if (o.v.paused) { const pr = o.v.play(); if (pr) pr.catch(() => {}); }
      else o.box.classList.add('live');
    } else if (o.box.classList.contains('live') && hoverPlay()) {
      /* torna il poster, poi il video si ferma sotto di lui: niente scatto */
      o.box.classList.remove('live');
      o.t = setTimeout(() => { if (!wants(o)) o.v.pause(); }, 720);
    } else if (!o.v.paused) {
      o.v.pause();                       /* fuori schermo: si ferma e basta */
      if (!autoPlay()) o.box.classList.remove('live');
    }
  }
  const resyncLoops = () => loops.forEach(loopSync);
  if (fine.addEventListener) fine.addEventListener('change', resyncLoops);

  /* numeri: tutti su una riga sola. Il corpo parte dal massimo scritto nel CSS
     e scende finché la riga entra nella colonna; se dovesse scendere sotto i
     30 px (telefono, molti dati) i dati vanno uno sotto l'altro, ognuno sulla
     sua riga. 0.62 è la distanza minima fra i dati, in em: la stessa del CSS. */
  function fitStats() {
    $$('[data-stats]').forEach(el => {
      el.classList.remove('stack'); el.style.removeProperty('--fs');
      const nums = $$('.stat > b', el); if (!nums.length) return;
      const max = parseFloat(getComputedStyle(nums[0]).fontSize) || 1;
      const em = nums.reduce((t, b) => t + b.getBoundingClientRect().width, 0) / max + (nums.length - 1) * 0.62;
      const fs = Math.min(max, Math.floor(el.clientWidth / em * 10) / 10);
      if (fs < 30) el.classList.add('stack');
      else if (fs < max) el.style.setProperty('--fs', `${fs}px`);
    });
  }

  /* -------------------------------------------------------- misure */
  let vh = innerHeight, vw = innerWidth, desk = true, docH = 0, caseHeadEnd = 0;
  function measure() {
    vh = innerHeight; vw = innerWidth; desk = vw > 860;
    readCfg();
    fitStats();
    const cv = $('#covers'); if (cv) cv.classList.toggle('alt', cfg.alterna);
    phones.forEach(p => {
      p.over = Math.max(0, p.track.scrollWidth - vw);
      p.el.style.height = desk && p.over > 0 ? `${vh + p.over}px` : '';
      if (!desk || !p.over) p.track.style.transform = '';
      if (desk && !p.over) p.track.style.margin = '0 auto';
    });
    const sy = scrollY;
    covers.forEach(c => {
      const r = c.frame.getBoundingClientRect();
      c.top = r.top + sy; c.h = r.height || 1;
    });
    sliders.forEach(s => {
      const r = s.el.getBoundingClientRect();
      s.top = r.top + sy; s.h = r.height || 1;
      s.padL = parseFloat(getComputedStyle(s.track).paddingLeft) || 0;
      s.slides.forEach(sl => { sl.left = sl.a.offsetLeft; });
      const w = s.slides[0] ? s.slides[0].a.offsetWidth : 1;
      s.step = s.slides[1] ? (s.slides[1].left - s.slides[0].left) || w : w;
      s.max = Math.max(0, s.track.scrollWidth - s.track.clientWidth);
      s.drift = w * cfg.drift;
    });
    const ch = $('.case-head');
    caseHeadEnd = ch ? ch.getBoundingClientRect().bottom + sy - vh * 0.25 : 0;
    docH = root.scrollHeight;
    dirty = true;
  }
  addEventListener('resize', () => { measure(); tick(true); });
  addEventListener('ritocchi', () => { measure(); tick(true); resyncLoops(); });
  /* l'altezza della pagina cambia (font caricati, ritocchi): si rimisura al fotogramma dopo */
  if ('ResizeObserver' in window) {
    let q = 0;
    new ResizeObserver(() => { cancelAnimationFrame(q); q = requestAnimationFrame(() => { measure(); tick(true); }); }).observe(app);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measure(); tick(true); });

  /* ---------------------------------------------- un giro a fotogramma */
  let lastY = -1, dirty = true, acc = 0, headAway = false, readOn = false;
  const ixState = { i: -1, on: false };

  function tick(force) {
    const y = scrollY;
    if (!force && !dirty && y === lastY) return;
    const dy = lastY < 0 ? 0 : y - lastY;
    lastY = y; dirty = false;

    /* letture: la posizione orizzontale degli slider in vista, una volta */
    const xs = sliders.map(s => (s.top - y < vh && s.top + s.h - y > 0) ? s.track.scrollLeft : null);

    chrome(y, dy);
    sliders.forEach((s, k) => { if (xs[k] !== null) slide(s, xs[k]); });

    if (still) return;

    /* cover: la cornice è ferma, il media ci scivola dentro piano; il logo sta fermo */
    covers.forEach(c => {
      const top = c.top - y, H = c.h;
      if (top > vh + 60 || top + H < -60) return;
      const k = clamp(((top + H / 2) - vh / 2) / ((vh + H) / 2), -1, 1);
      c.media.style.transform = `translate3d(0,${(-k * H * cfg.drift).toFixed(1)}px,0)`;
    });

    /* MacBook: lo schermo si alza mentre entra */
    macs.forEach(m => {
      const r = m.el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const k = clamp((vh * 0.98 - r.top) / (vh * 0.8)); const p = k * k * (3 - 2 * k);
      m.el.style.setProperty('--p', p.toFixed(4));
      const open = p > 0.7;
      if (open !== m.open) {
        m.open = open;
        if (open) { const pr = m.video.play(); if (pr) pr.catch(() => {}); }
        else if (m.video.muted) m.video.pause();
      }
    });

    /* iPhone: lo scroll verticale li fa scorrere di lato */
    phones.forEach(p => {
      if (!desk || !p.over) return;
      const r = p.el.getBoundingClientRect();
      const k = clamp(-r.top / p.over);
      p.track.style.transform = `translate3d(${(-k * p.over).toFixed(1)}px,0,0)`;
      p.bar.style.setProperty('--p', k.toFixed(4));
    });

    /* leggero scarto delle immagini a tutta larghezza */
    pars.forEach(p => {
      const r = p.el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh || !p.m) return;
      const k = ((r.top + r.height / 2) - vh / 2) / vh;
      p.m.style.transform = `translate3d(0,${(k * -4.2).toFixed(3)}%,0) scale(1.1)`;
    });
  }

  /* ------------------------------------- testata: indice, lettura, ritiro */
  if (ix) ix.innerHTML = `<span class="roll" data-ixn>${roll(PROJECTS.map((_, i) => pad2(i + 1)))}</span><span class="of">/ ${pad2(N)}</span><span class="roll br" data-ixb>${roll(PROJECTS.map(p => p.brand))}</span>`;
  const ixNum = ix && $('[data-ixn]', ix), ixBrand = ix && $('[data-ixb]', ix);

  function chrome(y, dy) {
    const name = route ? route.name : 'home';

    /* indice: nella home dice a che cover sei; in un progetto, quale progetto è,
       quando il titolo grande è già passato */
    let on = false, i = ixState.i;
    if (cfg.indice && ix) {
      if (name === 'home' && covers.length) {
        const c = y + vh * 0.4; i = -1;
        /* due cover affiancate hanno la stessa altezza: vale la prima */
        covers.forEach((cv, k) => { if (cv.top <= c && (i < 0 || cv.top > covers[i].top + 1)) i = k; });
        const last = covers[covers.length - 1];
        on = i >= 0 && c < last.top + last.h + vh * 0.12;
      } else if (name === 'case') {
        i = PROJECTS.indexOf(route.p); on = y > caseHeadEnd;
      }
    }
    /* mentre è nascosto l'indice salta al numero giusto senza rotolare */
    if (i >= 0 && i !== ixState.i) { ixState.i = i; setRoll(ixNum, i, !ixState.on); setRoll(ixBrand, i, !ixState.on); }
    if (ix && on !== ixState.on) { ixState.on = on; ix.classList.toggle('on', on); }

    /* chicca: linea di lettura nelle pagine progetto */
    if (readline) {
      const rl = cfg.lettura && name === 'case';
      if (rl !== readOn) { readOn = rl; readline.classList.toggle('on', rl); }
      if (rl) readbar.style.transform = `scaleX(${clamp(y / Math.max(1, docH - vh)).toFixed(4)})`;
    }

    /* chicca: la testata si ritira scendendo e torna risalendo
       (non nella home, dove porta l'indice) */
    let away = false;
    if (cfg.testata && !still && name !== 'home' && y > vh * 0.3) {
      if (dy !== 0 && (dy > 0) !== (acc > 0)) acc = 0;
      acc += dy;
      away = acc > 24 ? true : acc < -24 ? false : headAway;
    } else acc = 0;
    if (away && head.contains(document.activeElement)) away = false;   /* mai nascosta col fuoco dentro */
    if (away !== headAway) { headAway = away; head.classList.toggle('away', away); }
  }

  /* ---------------------------------------------------------- slider */
  function nearest(s, x) {
    let b = 0, d = Infinity;
    s.slides.forEach((sl, i) => { const v = Math.abs(Math.min(s.max, sl.left - s.padL) - x); if (v < d) { d = v; b = i; } });
    return b;
  }

  function slide(s, x) {
    if (s.settle !== null && Math.abs(x - s.settle) < 1.5) release(s);
    const a = nearest(s, x);
    if (a !== s.active) {
      s.active = a; setRoll(s.roll, a);
      s.prev.disabled = a <= 0; s.next.disabled = a >= s.slides.length - 1;
    }
    if (still) return;
    /* come nella home: l'immagine scivola piano dentro la sua scheda */
    s.slides.forEach(sl => {
      const pos = (sl.left - s.padL - x) / s.step;
      if (pos < -2 || pos > 3) return;
      sl.inner.style.transform = `translate3d(${(-clamp(pos, -1, 1) * s.drift).toFixed(1)}px,0,0)`;
    });
  }

  /* lo snap si spegne mentre la scheda viaggia e si riaccende quando arriva:
     è la strada che non scatta su Safari */
  function slideTo(s, i) {
    i = clamp(i, 0, s.slides.length - 1);
    const left = Math.max(0, Math.min(s.max, s.slides[i].left - s.padL));
    s.target = i; s.settle = left;
    s.track.classList.add('drag');
    clearTimeout(s.tm); s.tm = setTimeout(() => release(s), 1500);
    if (Math.abs(s.track.scrollLeft - left) < 1) { release(s); return; }
    s.track.scrollTo({ left, behavior: still ? 'auto' : 'smooth' });
  }
  function release(s) { s.settle = null; clearTimeout(s.tm); s.track.classList.remove('drag'); }

  let drag = null;
  function dragStart(s, e) {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    release(s);
    s.dragged = false;
    drag = { s, id: e.pointerId, x0: e.clientX, l0: s.track.scrollLeft, i0: nearest(s, s.track.scrollLeft), lx: e.clientX, lt: performance.now(), v: 0, moved: 0, cap: false };
    s.track.classList.add('drag', 'grabbing');
  }
  addEventListener('pointermove', e => {
    if (!drag) return;
    const now = performance.now(), dt = Math.max(1, now - drag.lt);
    drag.v = drag.v * 0.5 + ((e.clientX - drag.lx) / dt) * 0.5;
    drag.lx = e.clientX; drag.lt = now;
    const dx = e.clientX - drag.x0;
    drag.moved = Math.max(drag.moved, Math.abs(dx));
    if (drag.moved > 3) {
      /* la cattura arriva solo quando è davvero un trascinamento: un clic semplice resta un clic sul link */
      if (!drag.cap) { try { drag.s.track.setPointerCapture(drag.id); } catch (err) { /* niente */ } drag.cap = true; }
      drag.s.track.scrollLeft = drag.l0 - dx;
    }
  }, { passive: true });
  const dragEnd = () => {
    if (!drag) return;
    const { s, moved, lt, l0, i0 } = drag;
    const v = performance.now() - lt > 90 ? 0 : drag.v;     /* fermo prima di lasciare: niente lancio */
    drag = null;
    s.track.classList.remove('grabbing');
    if (moved > 6) s.dragged = true;
    /* dove si ferma: la scheda più vicina, più al massimo una per lo slancio;
       un trascinamento breve ma deciso porta comunque alla scheda accanto */
    const x = s.track.scrollLeft, went = x - l0;
    let i = nearest(s, x + clamp(-v * 220, -s.step * 0.9, s.step * 0.9));
    if (i === i0 && Math.abs(went) > s.step * 0.12) i = i0 + Math.sign(went);
    slideTo(s, i);
  };
  addEventListener('pointerup', dragEnd);
  addEventListener('pointercancel', dragEnd);
  addEventListener('blur', dragEnd);

  /* frecce: muovono lo slider quando è lui al centro dell'attenzione
     (sotto il mouse, col fuoco o per metà in vista); altrimenti, se la
     chicca è accesa, passano al progetto prima o dopo */
  const shown = (s, y) => (Math.min(s.top + s.h, y + vh) - Math.max(s.top, y)) / Math.max(1, Math.min(s.h, vh));
  addEventListener('keydown', e => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    if (busy || e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
    const t = e.target;
    if (t && t.closest && t.closest('input, textarea, select, video, [contenteditable="true"], .tw')) return;
    const dir = e.key === 'ArrowRight' ? 1 : -1, y = scrollY;
    const s = sliders.find(s => s.hover || s.el.contains(document.activeElement) || shown(s, y) > 0.5);
    if (s) { e.preventDefault(); slideTo(s, (s.settle !== null ? s.target : s.active) + dir); return; }
    if (cfg.frecce && route && route.name === 'case') {
      e.preventDefault();
      const i = PROJECTS.indexOf(route.p);
      location.hash = `#/work/${PROJECTS[(i + dir + N) % N].slug}`;
    }
  });

  /* chicca: precarico del progetto successivo (logo, poster, prime immagini) */
  const preloaded = new Set();
  function preload(slug) {
    if (!cfg.precarico || preloaded.has(slug)) return;
    const p = PROJECTS.find(x => x.slug === slug); if (!p) return;
    preloaded.add(slug);
    const pics = [];
    const add = u => { if (u && /\.(jpe?g|png|webp|svg|gif)$/i.test(u) && !pics.includes(u)) pics.push(u); };
    add(p.logo); add(p.cover.poster);
    p.blocks.forEach(b => { add(b.poster); add(b.src); (b.items || []).slice(0, 2).forEach(it => { add(it.poster); add(it.src); }); });
    pics.slice(0, 6).forEach(u => { const im = new Image(); im.decoding = 'async'; im.src = u; });
  }

  /* salta al contenuto: il link nascosto in cima porta il fuoco al titolo, senza toccare l'indirizzo */
  const skip = $('.skip');
  if (skip) skip.addEventListener('click', e => { e.preventDefault(); const h = $('h1', app); if (h) h.focus(); });

  addEventListener('hashchange', go);
  addEventListener('load', () => { measure(); tick(true); });
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  go();
  (function loop() { tick(false); requestAnimationFrame(loop); })();
})();
