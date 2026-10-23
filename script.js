/* ==========================================================================
   Script de l'invitation.
   Vous n'avez normalement pas besoin de modifier ce fichier :
   tous les textes se changent dans config.js
   ========================================================================== */
(function () {
  'use strict';

  var C = window.INVITATION || {};
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text != null) { n.textContent = text; }
    return n;
  }

  /* ---------- 1. Valeurs calculées (noms, initiales, dates) ---------- */
  function firstLetter(s) {
    var m = String(s || '').match(/[A-Za-zÀ-ÖØ-öø-ÿ]/);
    return m ? m[0].toUpperCase() : '';
  }
  function formatDate(d, opts) {
    try { return d.toLocaleDateString('fr-FR', opts); } catch (e) { return d.toDateString(); }
  }

  var lieu = C.lieu || {};
  var presence = C.presence || {};
  var weddingDate = new Date(C.dateMariage);
  var hasDate = !isNaN(weddingDate.getTime());
  var deadline = new Date(String(presence.dateLimite || '') + 'T12:00:00');
  var hasDeadline = !isNaN(deadline.getTime());

  var D = {};
  Object.keys(C).forEach(function (k) { D[k] = C[k]; });
  D.noms = C.prenom1 + ' & ' + C.prenom2;
  D.initiales = firstLetter(C.prenom1) + '&' + firstLetter(C.prenom2);
  D.monogramme = firstLetter(C.prenom1) + ' & ' + firstLetter(C.prenom2);
  D.dateLongue = hasDate ? formatDate(weddingDate, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '';
  D.dateLimiteLongue = hasDeadline ? formatDate(deadline, { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  D.lieuLigne = [lieu.nom, lieu.ville].filter(Boolean).join(' · ');

  function get(path) {
    return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, D);
  }

  /* ---------- 2. Remplissage des textes ---------- */
  $$('[data-bind]').forEach(function (node) {
    var v = get(node.getAttribute('data-bind'));
    if (v == null || v === '') { node.hidden = true; return; }
    node.textContent = v;
  });

  document.title = D.noms + ' — Invitation de mariage';

  // Frise : étapes de l'histoire
  var stepsEl = $('#steps');
  ((C.histoire && C.histoire.etapes) || []).forEach(function (e) {
    var li = el('li', 'step reveal');
    li.appendChild(el('span', 'step__dot'));
    li.appendChild(el('p', 'step__date', e.date));
    li.appendChild(el('h3', 'step__title', e.titre));
    li.appendChild(el('p', 'step__text', e.texte));
    stepsEl.appendChild(li);
  });

  // Galerie
  var galleryEl = $('#gallery');
  ((C.galerie && C.galerie.photos) || []).slice(0, 6).forEach(function (p) {
    var fig = el('figure', 'shot reveal');
    var frame = el('div', 'shot__frame');
    var img = document.createElement('img');
    img.alt = p.alt || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.src = p.src;
    frame.appendChild(img);
    fig.appendChild(frame);
    galleryEl.appendChild(fig);
  });

  // Programme
  var agendaEl = $('#agenda');
  ((C.programme && C.programme.moments) || []).forEach(function (m) {
    var li = el('li', 'moment reveal');
    li.appendChild(el('span', 'moment__time', m.heure));
    var box = el('div', 'moment__body');
    box.appendChild(el('h3', 'moment__title', m.titre));
    if (m.texte) { box.appendChild(el('p', 'moment__text', m.texte)); }
    li.appendChild(box);
    agendaEl.appendChild(li);
  });

  // Pastilles de couleur
  var swatchesEl = $('#swatches');
  ((C.tenue && C.tenue.couleurs) || []).slice(0, 3).forEach(function (c) {
    var li = el('li', 'swatch');
    var dot = el('span', 'swatch__dot');
    dot.style.setProperty('--c', c.couleur);
    li.appendChild(dot);
    li.appendChild(el('span', 'swatch__name', c.nom));
    swatchesEl.appendChild(li);
  });

  // Carte et itinéraire
  var query = lieu.rechercheCarte || [lieu.nom, lieu.adresse, lieu.ville].filter(Boolean).join(', ');
  var q = encodeURIComponent(query);
  $('#mapFrame').src = 'https://maps.google.com/maps?q=' + q + '&hl=fr&z=15&output=embed';
  $('#routeBtn').href = 'https://www.google.com/maps/dir/?api=1&destination=' + q;

  // Formulaire de réponse
  $('#rsvpBtn').href = presence.lienFormulaire || '#';

  /* ---------- 3. Titres révélés mot par mot ---------- */
  function splitWords(node, words) {
    node.setAttribute('aria-label', words.join(' '));
    node.textContent = '';
    words.forEach(function (w, i) {
      var outer = el('span', 'w');
      outer.setAttribute('aria-hidden', 'true');
      var inner = el('span', 'wi', w);
      inner.style.setProperty('--i', i);
      outer.appendChild(inner);
      node.appendChild(outer);
      if (i < words.length - 1) { node.appendChild(document.createTextNode(' ')); }
    });
  }
  splitWords($('#heroNames'), [C.prenom1, '&', C.prenom2]);
  $$('.title.split').forEach(function (t) {
    splitWords(t, t.textContent.trim().split(/\s+/));
  });

  // Délais d'apparition échelonnés
  $$('[data-seq]').forEach(function (n) { n.style.setProperty('--d', n.getAttribute('data-seq') + 's'); });
  $$('[data-stagger]').forEach(function (g) {
    Array.prototype.forEach.call(g.children, function (c, i) {
      c.style.setProperty('--d', (i * 0.14).toFixed(2) + 's');
    });
  });

  /* ---------- 4. Compte à rebours ---------- */
  var countdown = $('#countdown');
  var cd = { d: $('[data-unit="d"]'), h: $('[data-unit="h"]'), m: $('[data-unit="m"]'), s: $('[data-unit="s"]') };
  var cdTimer = null;
  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function tick() {
    var diff = Math.floor((weddingDate.getTime() - Date.now()) / 1000);
    if (diff <= 0) {
      countdown.textContent = (C.compteur && C.compteur.jourJ) || '';
      countdown.classList.add('is-done');
      countdown.removeAttribute('role');
      if (cdTimer) { clearInterval(cdTimer); }
      return;
    }
    cd.d.textContent = Math.floor(diff / 86400);
    cd.h.textContent = pad(Math.floor((diff % 86400) / 3600));
    cd.m.textContent = pad(Math.floor((diff % 3600) / 60));
    cd.s.textContent = pad(diff % 60);
  }
  if (hasDate) {
    tick();
    cdTimer = setInterval(tick, 1000);
  } else {
    countdown.hidden = true;
  }

  /* ---------- 5. Apparition au défilement ---------- */
  var revealsStarted = false;
  function startReveals() {
    if (revealsStarted) { return; }
    revealsStarted = true;
    var targets = $$('.reveal, .split, .swatch');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (t) { t.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---------- 6. Frise, profondeur de la galerie, photo d'accueil ---------- */
  var timeline = $('#timeline');
  var stepEls = $$('.step');
  var shots = $$('.shot');
  var heroMedia = $('.hero__media');

  function update() {
    var vh = window.innerHeight;

    // La frise se dessine au fil du défilement
    var line = vh * 0.66;
    var r = timeline.getBoundingClientRect();
    timeline.style.setProperty('--p', clamp((line - r.height * 0 - r.top) / r.height, 0, 1).toFixed(4));
    stepEls.forEach(function (s) {
      s.classList.toggle('is-lit', s.getBoundingClientRect().top < line);
    });

    if (reduceMotion) { return; }

    // Effet de profondeur dans la galerie
    shots.forEach(function (s, i) {
      var box = s.getBoundingClientRect();
      if (box.bottom < -120 || box.top > vh + 120) { return; }
      var n = clamp((box.top + box.height / 2 - vh / 2) / (vh / 2 + box.height / 2), -1, 1);
      var frame = s.firstElementChild;
      var img = frame.firstElementChild;
      frame.style.transform = 'translate3d(0,' + (n * (i % 2 ? -14 : 14)).toFixed(1) + 'px,0)';
      img.style.transform = 'translate3d(0,' + (-n * box.height * 0.085).toFixed(1) + 'px,0)';
    });

    // La photo d'accueil défile un peu plus lentement que la page
    var y = Math.max(0, window.pageYOffset || 0);
    if (y < vh * 1.3) {
      heroMedia.style.transform = 'translate3d(0,' + (y * 0.22).toFixed(1) + 'px,0)';
    }
  }

  var ticking = false;
  function onScroll() {
    if (ticking) { return; }
    ticking = true;
    window.requestAnimationFrame(function () { update(); ticking = false; });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* ---------- 7. L'enveloppe ---------- */
  var intro = $('#intro');
  var site = $('#site');
  var envelope = $('#envelope');
  var openBtn = $('#openBtn');
  var opened = false;

  function enterSite(instant) {
    document.body.classList.remove('is-locked');
    site.classList.add('is-visible');
    window.scrollTo(0, 0);
    startReveals();
    update();
    try { site.focus({ preventScroll: true }); } catch (e) { /* ancien navigateur */ }
    if (instant) {
      intro.parentNode.removeChild(intro);
    } else {
      window.setTimeout(function () {
        if (intro.parentNode) { intro.parentNode.removeChild(intro); }
      }, 2600);
    }
  }

  function openInvitation() {
    if (opened) { return; }
    opened = true;
    openBtn.disabled = true;

    if (reduceMotion) { enterSite(true); return; }

    intro.classList.add('is-open');                 // le cachet se brise, le rabat s'ouvre, la carte sort
    window.setTimeout(function () {
      intro.classList.add('is-leaving');            // l'enveloppe s'efface en douceur…
      enterSite(false);                             // …et le site apparaît en fondu
    }, 3500);
  }

  openBtn.addEventListener('click', openInvitation);
  envelope.addEventListener('click', openInvitation);

  // On attend les polices (ou 1,8 s au maximum) pour afficher l'enveloppe sans clignotement
  function showIntro() { intro.classList.add('is-ready'); }
  if (document.fonts && document.fonts.load) {
    Promise.race([
      Promise.all([
        document.fonts.load('1em "Pinyon Script"'),
        document.fonts.load('500 1em Cinzel'),
        document.fonts.load('400 1em Jost')
      ]),
      new Promise(function (resolve) { setTimeout(resolve, 1800); })
    ]).then(showIntro, showIntro);
  } else {
    showIntro();
  }

  update();
})();
