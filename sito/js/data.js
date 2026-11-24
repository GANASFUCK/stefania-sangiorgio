/* ------------------------------------------------------------------
   Contenuti del portfolio.
   I testi sono quelli di Stefania (Behance, documento testi Marvis,
   board Lavazza, pagina ufficiale Collistar): non riscritti.
   Dove un dato manca c'è `todo`, mai un dato inventato.
------------------------------------------------------------------- */
const A = 'assets/';

const SITE = {
  name: 'Stefania Sangiorgio',
  role: 'Creative Director, Copywriter',
  place: 'Milan',
  linkedin: 'https://linkedin.com/in/stefania-sangiorgio-b4084137/',
  instagram: 'https://instagram.com/gwenstefania',
  behance: 'https://www.behance.net/stefaniasangiorgio',
};

const PROJECTS = [

  /* ---------------------------------------------------------------- MARVIS */
  {
    slug: 'missing-marvis', mh: '34px',
    brand: 'Marvis', title: 'Missing Marvis', year: '2026',
    logo: A + 'logos/marvis.png', lw: '30vw', lh: '15vh', bh: '26px',
    cover: { video: A + 'marvis/cover.mp4', poster: A + 'marvis/frame-01.jpg', tint: .06 },
    meta: [['Client', 'Marvis'], ['Agency', 'LePub'], ['Role', 'Creative Director'], ['Year', '2026']],
    intro: [
      'Marvis fans were sharing their love for the brand on social media long before it joined the conversation. As its popularity grew, demand outgrew supply, leaving everyone asking: Where is Marvis?',
      'Instead of hiding the problem, we made the wait marvellous. We created seven illustrated social films revealing what our missing tubes were busy doing: whitening the moon, brushing a Kraken’s teeth, turning bears white, bringing snow where there was none, and much more. Through these marvellous stories, we turned Marvis’ absence into another reason for fans to love the brand.',
    ],
    blocks: [
      { t: 'laptop', src: A + 'marvis/case.mp4', poster: A + 'marvis/case-poster.jpg', sound: true },
      { t: 'label', text: 'All the stories', n: '07 films' },
      { t: 'text', html: '<p>We know, finding Marvis hasn’t been easy lately. But good news: they are all coming back soon, they just hit a little bump in the road. #ComingBackSoon</p>' },
      { t: 'phones', items: [
        { src: A + 'marvis/story-01.mp4', poster: A + 'marvis/poster-01.jpg', name: 'Aquatic Mint', n: '01' },
        { src: A + 'marvis/story-02.mp4', poster: A + 'marvis/poster-02.jpg', name: 'Strong Mint', n: '02' },
        { src: A + 'marvis/story-03.mp4', poster: A + 'marvis/poster-03.jpg', name: 'Smokers', n: '03' },
        { src: A + 'marvis/story-04.mp4', poster: A + 'marvis/poster-04.jpg', name: 'Jasmin Mint', n: '04' },
        { src: A + 'marvis/story-05.mp4', poster: A + 'marvis/poster-05.jpg', name: 'All Flavors', n: '05' },
        { src: A + 'marvis/story-06.mp4', poster: A + 'marvis/poster-06.jpg', name: 'All Flavors', n: '06' },
        { src: A + 'marvis/story-07.mp4', poster: A + 'marvis/poster-07.jpg', name: 'Whitening Mint', n: '07' },
      ] },
      { t: 'full', src: A + 'marvis/frame-07.jpg', ar: '16/9' },
      { t: 'grid', cols: 3, items: [
        { src: A + 'marvis/frame-02.jpg' }, { src: A + 'marvis/frame-03.jpg' }, { src: A + 'marvis/frame-04.jpg' },
        { src: A + 'marvis/frame-05.jpg' }, { src: A + 'marvis/frame-06.jpg' }, { src: A + 'marvis/frame-01.jpg' },
      ] },
      { t: 'label', text: 'Crafting', n: 'Sketch to screen' },
      { t: 'film', src: A + 'marvis/craft-film.mp4', poster: A + 'marvis/craft-poster.jpg', ar: '16/9' },
      { t: 'grid', cols: 4, ar: '9/16', items: [
        { video: A + 'marvis/craft-23_craft-GIF_animatic-to-final_Aquatic-Mint_720x1280.mp4' },
        { video: A + 'marvis/craft-24_craft-GIF_animatic-to-final_Whitening-Mint_720x1280.mp4' },
        { video: A + 'marvis/craft-25_craft-GIF_animatic-to-final_Jasmin-Mint_720x1280.mp4' },
        { video: A + 'marvis/craft-26_craft-GIF_animatic-to-final_All-Flavors-train_720x1280.mp4' },
      ] },
      { t: 'grid', cols: 3, items: [
        { src: A + 'marvis/g-17_craft_Kraken-design.jpg' },
        { src: A + 'marvis/g-19_craft_Loch-Ness-sketch-to-colour.jpg' },
        { src: A + 'marvis/g-22_craft_astronaut-character-design.jpg' },
        { src: A + 'marvis/g-18_craft_boat-tube-design.jpg' },
        { src: A + 'marvis/g-20_craft_yeti-sketch.jpg' },
        { src: A + 'marvis/g-21_craft_bear-design.jpg' },
      ] },
      { t: 'label', text: 'The book box', n: 'Aquatic · Whitening' },
      { t: 'full', src: A + 'marvis/g-07_book-photo_Aquatic-open-standing.jpg', ar: '16/9' },
      { t: 'grid', cols: 2, items: [
        { src: A + 'marvis/g-05_book-photo_Aquatic-box-closed.jpg' },
        { src: A + 'marvis/g-11_book-photo_Whitening-box-closed.jpg' },
        { src: A + 'marvis/g-09_book-photo_Aquatic-Kraken-ship.jpg' },
        { src: A + 'marvis/g-14_book-photo_Whitening-astronauts-moon.jpg' },
        { src: A + 'marvis/g-08_book-photo_Aquatic-Kraken-toothbrush.jpg' },
        { src: A + 'marvis/g-15_book-photo_Whitening-moon-brushing.jpg' },
      ] },
      { t: 'grid', cols: 2, items: [
        { src: A + 'marvis/g-10_book-photo_Aquatic-cavity-coming-back-soon.jpg' },
        { src: A + 'marvis/g-16_book-photo_Whitening-cavity-coming-back-soon.jpg' },
      ] },
      { t: 'credits', title: 'The marvelous team', groups: [
        ['Creatives', [
          ['Global CEO LePub, CCO LePub Worldwide', 'Bruno Bertelli'],
          ['Global Chief Creative Officer', 'Cristiana Boccassini'],
          ['Chief Creative Officer', 'Cinzia Crociani'],
          ['Creative Director', 'Valentino Borghesi'],
          ['Creative Director', 'Stefania Sangiorgio'],
          ['Senior Art Director', 'Gianluca Sebastiani'],
        ]],
        ['Account & Production', [
          ['Head of Client Services', 'Giada Salerno'],
          ['Account Supervisor', 'Antonella De Rosa'],
          ['Account Manager', 'Sara Stefano'],
          ['Strategy Director', 'Lavinia Garulli'],
          ['Head of Content', 'Manuela Rossi'],
          ['Senior Social Media Manager', 'Saraluna Goodloe'],
          ['Content Manager', 'Daniele Benvenuti'],
          ['Chief Production Officer', 'Francesca Zazzera'],
          ['Head of Production', 'Federico Fornasari'],
          ['Producer', 'Arianna Pellegrini'],
          ['Art Buyer', 'Caterina Collesano'],
          ['Motion Designer', 'Dario Lipani'],
        ]],
        ['Illustrations — Racoon Studio', [
          ['CEO, Founder, Executive Creative Producer', 'Riccardo Galimberti'],
          ['Founder, Executive Creative Director', 'Pietro Polentes'],
          ['Administration Manager', 'Raffaella Galimberti'],
          ['Production Director, Creative Supervisor, Illustrator, Animator', 'Rachele Santini'],
          ['Illustrator, Animator', 'Chiara Loiacono'],
          ['Animator', 'Alessandro Rizzato'],
          ['Animator', 'Elisa Pellicone'],
          ['Animator', 'Fabrizio Paludetto'],
          ['Animator', 'Carmine Longobucco'],
        ]],
      ] },
    ],
  },

  /* ---------------------------------------------------------------- NETFLIX */
  {
    slug: 'the-leopard', mh: '20px',
    brand: 'Netflix', title: 'The Leopard', sub: 'A great story is timeless', year: '2025',
    logo: A + 'logos/netflix.svg', lw: '22vw', lh: '9vh', bh: '20px',
    cover: { video: A + 'leopard/cover.mp4', poster: A + 'leopard/cover.jpg', tint: .04 },
    meta: [['Client', 'Netflix'], ['Year', '2025']],
    intro: [
      'To launch the new Netflix series, the biggest Italian Netflix production yet, we highlighted its connection to the present, proving its timeless relevance.',
    ],
    blocks: [
      { t: 'full', video: A + 'leopard/02.mp4', ar: '16/9' },
      { t: 'quote', note: 'In a world where the new generation often feels lost, we find the words of The Leopard strikingly timeless:', quote: '“I belong to a doomed generation.”' },
      { t: 'wide', src: A + 'leopard/ooh-04.jpg', ar: '1400/788' },
      { t: 'quote', note: 'These words echo the eternal struggle of identity — the fear and beauty of being bound to oneself.', quote: '“Can you imagine how hard it is to escape from who you are?”' },
      { t: 'wide', src: A + 'leopard/ooh-06.jpg', ar: '1400/788' },
      { t: 'quote', note: 'A paradox as relevant today as ever, speaking to the unsettling reality of modern politics and social evolution.', quote: '“If we want everything to stay the way it is, everything must change.”' },
      { t: 'wide', src: A + 'leopard/ooh-08.jpg', ar: '1400/788' },
      { t: 'quote', note: 'A declaration that mirrors the timeless fight — especially for women — to claim freedom over their own lives.', quote: '“No one can force me to do something I don’t want to do.”' },
      { t: 'wide', src: A + 'leopard/ooh-10.jpg', ar: '1400/788' },
      { t: 'label', text: 'Sanremo', n: '01' },
      { t: 'text', html: '<p>We hacked the most famous festival in Italy: Sanremo, drawing a striking parallel between The Leopard’s shifting world and Sanremo’s own transformation.</p>' },
      { t: 'film', src: A + 'leopard/film.mp4', poster: A + 'leopard/film-poster.jpg', ar: '16/9' },
      { t: 'label', text: 'Milan Fashion Week', n: '02' },
      { t: 'text', html: '<p>We took over Milan Fashion Week.</p>' },
      { t: 'wide', video: A + 'leopard/14.mp4', ar: '1400/788' },
      { t: 'label', text: 'The premiere', n: '03' },
      { t: 'text', html: '<p>During the series premiere, Rome saw history come to life with the March of the Thousand.</p>' },
      { t: 'full', src: A + 'leopard/ph-2.jpg', ar: '2048/1366' },
      { t: 'grid', cols: 2, ar: '3/2', items: [ { src: A + 'leopard/ph-1.jpg' }, { src: A + 'leopard/ph-3.jpg' } ] },
      { t: 'wide', video: A + 'leopard/16.mp4', ar: '1400/788' },
      { t: 'quote', quote: 'Because a great story is timeless.' },
    ],
  },

  /* ---------------------------------------------------------------- LAVAZZA */
  {
    slug: 'tabli-coffee-factory', mh: '32px',
    brand: 'Lavazza', title: 'Tablì Coffee Factory', year: '2025',
    logo: A + 'logos/lavazza.svg', lw: '24vw', lh: '11vh', bh: '24px',
    cover: { video: A + 'lavazza/cover.mp4', poster: A + 'lavazza/cover.jpg', tint: .08 },
    meta: [['Client', 'Lavazza'], ['Agency', 'LePub'], ['Year', '2025']],
    todo: 'Ruolo di Stefania e crediti: da inserire.',
    intro: [
      'Lavazza launched Tablì, its latest coffee innovation: a coffee capsule made entirely of coffee. An innovation so advanced, it feels like it comes from the future.',
      'But when we imagine the food of the future, we usually imagine something highly technological, functional and efficient. Not necessarily something capable of giving us real pleasure.',
    ],
    blocks: [
      { t: 'film', src: A + 'lavazza/film.mp4', poster: A + 'lavazza/film-poster.jpg', ar: '16/9', full: true },
      { t: 'text', html: '<p>We imagined a future where nature and technology live in harmony, and innovation enhances pleasure. Curious about Tablì, Luig-I scans it and is transported into a sensorial coffee world.</p><p>As a robot, he can observe and imagine pleasure, but never truly experience it. Only at the end do we realise this journey was his dream of what coffee pleasure must feel like, something technology can imagine, but only humans can taste.</p>' },
      { t: 'grid', cols: 2, items: [
        { src: A + 'lavazza/frame-01.jpg' }, { src: A + 'lavazza/frame-03.jpg' },
        { src: A + 'lavazza/frame-04.jpg' }, { src: A + 'lavazza/frame-05.jpg' },
      ] },
      { t: 'full', src: A + 'lavazza/frame-02.jpg', ar: '16/9' },
      { t: 'label', text: 'Luig-I', n: 'Character design' },
      { t: 'grid', cols: 3, ar: '1/1', items: [
        { src: A + 'lavazza/luigi-00.jpg' }, { video: A + 'lavazza/turntable.mp4' }, { src: A + 'lavazza/luigi-03.jpg' },
      ] },
      { t: 'label', text: 'From sketch to screen', n: 'Storyboard · Previs · Lighting' },
      { t: 'wide', video: A + 'lavazza/bd-Luigi-Sketch_Brkdn_111125.mp4', ar: '16/9' },
      { t: 'grid', cols: 2, items: [
        { video: A + 'lavazza/bd-Luigi-Dream_Brkdn_v1_111125.mp4' },
        { video: A + 'lavazza/bd-Luigi-Cialde_Brkdn_121125.mp4' },
        { video: A + 'lavazza/bd-Luigi-Rainbow_Brkdn_Notes_121125.mp4' },
        { video: A + 'lavazza/bd-Luigi-Acting_v1-A_111125.mp4' },
      ] },
      { t: 'full', src: A + 'lavazza/frame-06.jpg', ar: '16/9' },
    ],
  },

  /* ---------------------------------------------------------------- COLLISTAR */
  {
    slug: 'unleash-your-beauty', mh: '26px',
    brand: 'Collistar', title: 'Unleash Your Beauty', sub: 'Libera la tua bellezza', year: '2025',
    logo: A + 'collistar/collistar-logo.svg', lw: '30vw', lh: '8vh', bh: '17px',
    cover: { video: A + 'collistar/cover.mp4', poster: A + 'collistar/cover.jpg', tint: .1 },
    meta: [['Client', 'Collistar'], ['Year', '2025']],
    todo: 'Ruolo di Stefania e crediti: da inserire (la stampa accredita «LeBlend powered by Publicis Groupe», senza nomi).',
    intro: [
      'In a world where beauty seems increasingly tied to unattainable standards, Collistar launches a bold reflection: “Do we really have to do more and more to like ourselves more?”',
      'A powerful question that challenges imposed routines and media-driven dictates, inviting every woman to rediscover her unique beauty through just a few simple gestures.',
    ],
    blocks: [
      { t: 'film', src: A + 'collistar/film.mp4', poster: A + 'collistar/film-poster.jpg', ar: '16/9', full: true },
      { t: 'quote', quote: 'Do we really have to do more and more to like ourselves more?' },
      { t: 'text', html: '<p>In a world where feeling beautiful seems increasingly out of reach, Collistar believes that women don’t need to “add more” to bring out their innate charisma and shine with their own unique radiance.</p><p>The awareness that, with just a few gestures and products, one can truly unleash and embrace their beauty every day.</p><p>Collistar. Unleash Your Beauty.</p>' },
      { t: 'grid', cols: 3, items: [
        { src: A + 'collistar/f-22.3.jpg' }, { src: A + 'collistar/f-24.3.jpg' }, { src: A + 'collistar/f-32.3.jpg' },
      ] },
      { t: 'text', html: '<p>The film opens with a question: How much do we do every day to feel more beautiful? We follow the routines of different women, immersed in repetitive, almost obsessive gestures, feeding the doubt that the more we do, the less confident we feel. Then comes the moment of realization that changes everything. From here, everything takes a new breath.</p>' },
      { t: 'grid', cols: 3, items: [
        { src: A + 'collistar/f-38.2.jpg' }, { src: A + 'collistar/f-44.2.jpg' }, { src: A + 'collistar/f-50.2.jpg' },
      ] },
      { t: 'narrow', src: A + 'collistar/collistar-01.jpg', ar: '3/4', w: '560px' },
    ],
  },

  /* ---------------------------------------------------------------- PARAMOUNT+ */
  {
    slug: 'signorine-buonasera', mh: '46px',
    brand: 'Paramount+', title: 'Signorine Buonasera', year: '2023',
    logo: A + 'logos/paramount.svg', lw: '15vw', lh: '17vh', bh: '34px',
    cover: { video: A + 'signorine/cover.mp4', poster: A + 'signorine/cover.jpg', tint: .1 },
    meta: [['Client', 'Paramount+'], ['Year', '2023']],
    todo: 'Agenzia, ruolo e crediti: da inserire.',
    intro: [
      'Come far parlare di Paramount+ mentre tutti stanno parlando di Sanremo?',
      'Durante la settimana più importante della TV italiana abbiamo ridato vita a un’icona del passato: le Signorine Buonasera, per annunciare lo streaming di Paramount+ come un moderno palinsesto, che non si ferma, anche quando tutto si ferma.',
    ],
    blocks: [
      { t: 'full', src: A + 'signorine/kv.jpg', ar: '2400/1449' },
      { t: 'film', src: A + 'signorine/film.mp4', poster: A + 'signorine/film-poster.jpg', ar: '16/9' },
      { t: 'stats', cols: 3, items: [
        ['75%', 'Audience share'], ['20.5 milioni', 'Persone raggiunte ogni notte'], ['+61%', 'Ricerche Paramount+ su Google'],
        ['80%', 'Reach'], ['30M', 'Impression'],
      ] },
      { t: 'wide', src: A + 'signorine/results.jpg', ar: '16/9' },
    ],
  },

  /* ---------------------------------------------------------------- CARRERA */
  {
    slug: 'drive-your-story', mh: '24px',
    brand: 'Carrera', title: 'Drive Your Story', sub: 'Spring Summer 2023', year: '2023',
    logo: A + 'logos/carrera-a.svg', lw: '30vw', lh: '9vh', bh: '18px',
    cover: { video: A + 'carrera/cover.mp4', poster: A + 'carrera/cover.jpg', tint: .1 },
    meta: [['Client', 'Carrera'], ['Role', 'Creative Director, Copywriter'], ['Year', '2023']],
    intro: [
      'Carrera always invites people to follow their passions to drive their own stories. For that reason, we engaged five real people with five real passions and we transformed them in our SS 23 campaign.',
    ],
    blocks: [
      { t: 'film', src: A + 'carrera/film.mp4', poster: A + 'carrera/film-poster.jpg', ar: '1280/698', full: true },
      { t: 'label', text: 'Five people', n: 'Real American influencers' },
      { t: 'full', src: A + 'carrera/c-five.jpg', ar: '2700/1040', contain: true, dark: true },
      { t: 'text', html: '<p>Around each character, we’ve built Carrera’s imagery, starting right from their style: 5 worlds and 5 passions that come together to create a campaign that is both real and aspirational.</p>' },
      { t: 'full', src: A + 'carrera/c-car.jpg', ar: '2700/1150' },
      { t: 'grid', cols: 2, ar: '1290/960', items: [ { src: A + 'carrera/c-blonde.jpg' }, { src: A + 'carrera/c-gloves.jpg' } ] },
      { t: 'full', src: A + 'carrera/c-studio.jpg', ar: '2700/1115' },
      { t: 'wide', src: A + 'carrera/c-strip.jpg', ar: '2680/1000' },
      { t: 'credits', title: 'Credits', groups: [
        ['', [
          ['Executive Creative Director', 'Vincenzo Gasbarro'],
          ['Creative Director Copywriter', 'Stefania Sangiorgio'],
          ['Art Director', 'Gianluca Sebastiani'],
          ['Photographer & Director', 'Riccardo Vimercati'],
          ['Account Director', 'Roberta Cerutti'],
          ['Account', 'Martina Villa Luraschi'],
        ]],
      ] },
    ],
  },

  /* ---------------------------------------------------------------- GEOX */
  {
    slug: 'la-pioggia-ci-scivola-addosso', mh: '15px',
    brand: 'Geox', title: 'La pioggia ci scivola addosso', sub: 'Amphibiox', year: '2021',
    logo: A + 'logos/geox.svg', lw: '22vw', lh: '9vh', bh: '18px',
    cover: { poster: A + 'geox/cover.jpg', tint: .06, nologo: true },
    meta: [['Client', 'Geox'], ['Role', 'Senior Copywriter'], ['Year', '2021']],
    intro: [
      '“La pioggia ci scivola addosso” è il fil rouge concettuale e visivo al centro di questo film che riconduce Geox a una sinergia tra benefit e tecnologia dando luce a un vero e proprio design del benessere: Amphibiox è la continuazione di un racconto di brand che mette al centro il bisogno di sentirsi a proprio agio.',
      'L’esperienza Geox è quella di una scarpa che viene incontro alle persone, trasformando ciò che le circonda nella situazione di consumo ideale.',
    ],
    blocks: [
      { t: 'embed', src: 'https://player.vimeo.com/video/638691145?h=0d995d971f&autoplay=1&title=0&byline=0&portrait=0', poster: A + 'geox/cover-vimeo.jpg', ar: '16/9', full: true },
      { t: 'label', text: 'Stampa', n: '03 soggetti' },
      { t: 'wide', src: A + 'geox/print.jpg', ar: '1400/665', dark: true },
      { t: 'credits', title: 'Credits', groups: [
        ['', [
          ['Executive Creative Director and Partner', 'Luca Scotto di Carlo, Vincenzo Gasbarro'],
          ['Senior Copywriter', 'Stefania Sangiorgio'],
          ['Senior Art Director', 'Luca Fulciniti'],
          ['Account Director', 'Filippo D’Andrea'],
          ['Account Manager', 'Eleonora Guidolin'],
          ['Cdp', 'Akita Film'],
          ['Director', 'Xavier Mairesse'],
        ]],
      ] },
    ],
  },

  /* ---------------------------------------------------------------- OVS */
  {
    slug: 'abbiamo-la-stoffa', mh: '24px',
    brand: 'OVS', title: 'Abbiamo la stoffa per migliorare il pianeta', sub: '#Sostenibilità', year: '2021',
    logo: A + 'logos/ovs.svg', lw: '15vw', lh: '11vh', bh: '24px',
    cover: { poster: A + 'ovs/cover.jpg', tint: .08 },
    meta: [['Client', 'OVS'], ['Year', '2021']],
    todo: 'Agenzia, ruolo e crediti: da inserire.',
    intro: [
      'Tutto quello che facciamo ha un impatto sull’ambiente e sulle persone. Anche produrre e indossare vestiti.',
      'Per questo, OVS lavora per fare la sua parte nel ridurre l’impatto della moda sugli ecosistemi del pianeta, rendendo i suoi abiti più sostenibili.',
    ],
    blocks: [
      { t: 'full', src: A + 'ovs/v-01.jpg', ar: '2/1' },
      { t: 'grid', cols: 2, ar: '2/1', items: [ { src: A + 'ovs/v-02.jpg' }, { src: A + 'ovs/v-03.jpg' } ] },
      { t: 'full', src: A + 'ovs/v-04.jpg', ar: '2/1' },
      { t: 'grid', cols: 2, ar: '2/1', items: [ { src: A + 'ovs/v-05.jpg' }, { src: A + 'ovs/v-06.jpg' } ] },
      { t: 'full', src: A + 'ovs/v-07.jpg', ar: '2/1' },
      { t: 'grid', cols: 2, ar: '2/1', items: [ { src: A + 'ovs/v-08.jpg' }, { src: A + 'ovs/v-09.jpg' } ] },
      { t: 'label', text: 'In store', n: 'Take care' },
      { t: 'wide', src: A + 'ovs/v-10.jpg', ar: '1400/909' },
    ],
  },

  /* ---------------------------------------------------------------- SKY */
  {
    slug: 'kardictionary', mh: '26px',
    brand: 'Sky', title: 'Kardictionary', year: '2019',
    logo: A + 'logos/sky-2025.svg', lw: '13vw', lh: '9vh', bh: '20px',
    cover: { poster: A + 'kardictionary/02.jpg', tint: .0, dark: true },
    meta: [['Client', 'Sky'], ['Year', '2019']],
    todo: 'Agenzia, ruolo e crediti: da inserire.',
    intro: [
      'Il reality di culto che è diventato un fenomeno di costume negli Stati Uniti, dando vita a innumerevoli spin-off, arriva anche in Italia, su Sky: “Le Kardashian”, lo show che segue la vita di una delle famiglie più high-profile di Hollywood.',
      'Le cinque sorelle sono diventate delle vere e proprie trendsetter e hanno persino coniato nuovi modi di dire che sono diventati virali in tutto il mondo: da “doll”, che usano al posto del più comune “darling”, a “Momager” per definire la mamma che è anche la loro manager.',
    ],
    blocks: [
      { t: 'full', src: A + 'kardictionary/02.jpg', ar: '1400/799' },
      { t: 'label', text: 'Idea', n: 'The Kardictionary' },
      { t: 'text', html: '<p>Così, per celebrare il loro arrivo su Sky Uno, abbiamo creato un vero e proprio dizionario contente i 50 vocaboli più usati dalle sorelle.</p><p>Ma non solo, all’interno del vocabolario, sono inserite delle parole speciali che lo rendono unico nel suo genere. Un vero e proprio dizionario di bellezza da esplorare pagina dopo pagina per rimanere aggiornati sui termini più glamour, e nello stesso tempo divertenti, del momento.</p>' },
      { t: 'grid', cols: 2, ar: '1400/760', items: [
        { src: A + 'kardictionary/04.jpg' }, { src: A + 'kardictionary/05.jpg' },
        { src: A + 'kardictionary/06.jpg' }, { src: A + 'kardictionary/07.jpg' },
      ] },
      { t: 'label', text: 'Execution', n: '38 influencer' },
      { t: 'text', html: '<p>Abbiamo inviato il Kardictionary a 38 influencer che hanno condiviso in modo organico l’inaspettato e gradito regalo. Contemporaneamente, sulle properties social di Sky Uno, abbiamo creato una campagna a supporto invitando gli utenti ad “arricchire” il loro vocabolario inglese con le sorelle più cool di sempre.</p>' },
      { t: 'wide', src: A + 'kardictionary/social.jpg', ar: '1400/583' },
      { t: 'stats', cols: 3, items: [ ['980K', 'Reach'], ['39,5K', 'Interactions'], ['863', 'Mentions'] ] },
    ],
  },
];
