/* ==========================================================
   SEYRE — SCRIPT.JS
   Módulos: Braille, LSA, Quiz, Traductor, Modo Accesible
========================================================== */

// ===== DATOS: BRAILLE =====
// Cada letra: array de 6 bits (posiciones 1-6, col izq, col der)
// Layout celda: [p1, p4, p2, p5, p3, p6] para grid 2×3

const BRAILLE = {
  a: [1,0, 0,0, 0,0],
  b: [1,0, 1,0, 0,0],
  c: [1,1, 0,0, 0,0],
  d: [1,1, 0,1, 0,0],
  e: [1,0, 0,1, 0,0],
  f: [1,1, 1,0, 0,0],
  g: [1,1, 1,1, 0,0],
  h: [1,0, 1,1, 0,0],
  i: [0,1, 1,0, 0,0],
  j: [0,1, 1,1, 0,0],
  k: [1,0, 0,0, 1,0],
  l: [1,0, 1,0, 1,0],
  m: [1,1, 0,0, 1,0],
  n: [1,1, 0,1, 1,0],
  o: [1,0, 0,1, 1,0],
  p: [1,1, 1,0, 1,0],
  q: [1,1, 1,1, 1,0],
  r: [1,0, 1,1, 1,0],
  s: [0,1, 1,0, 1,0],
  t: [0,1, 1,1, 1,0],
  u: [1,0, 0,0, 1,1],
  v: [1,0, 1,0, 1,1],
  w: [0,1, 1,1, 0,1],
  x: [1,1, 0,0, 1,1],
  y: [1,1, 0,1, 1,1],
  z: [1,0, 0,1, 1,1],
};

// Nombres descriptivos de los signos Braille
const BRAILLE_DESC = {
  a:'Punto 1', b:'Puntos 1-2', c:'Puntos 1-4', d:'Puntos 1-4-5',
  e:'Puntos 1-5', f:'Puntos 1-2-4', g:'Puntos 1-2-4-5', h:'Puntos 1-2-5',
  i:'Puntos 2-4', j:'Puntos 2-4-5', k:'Puntos 1-3', l:'Puntos 1-2-3',
  m:'Puntos 1-3-4', n:'Puntos 1-3-4-5', o:'Puntos 1-3-5', p:'Puntos 1-2-3-4',
  q:'Puntos 1-2-3-4-5', r:'Puntos 1-2-3-5', s:'Puntos 2-3-4', t:'Puntos 2-3-4-5',
  u:'Puntos 1-3-6', v:'Puntos 1-2-3-6', w:'Puntos 2-4-5-6', x:'Puntos 1-3-4-6',
  y:'Puntos 1-3-4-5-6', z:'Puntos 1-3-5-6',
};

// ===== DATOS: LSA ABECEDARIO =====
const LSA_DATA = {
  a:   { img: 'img/lsa/a.png',    desc: 'Puño cerrado, pulgar hacia arriba', type: 'vocal' },
  b:   { img: 'img/lsa/b.png',    desc: 'Mano abierta, dedos juntos', type: 'consonant' },
  c:   { img: 'img/lsa/c.png',    desc: 'Mano en C, dedos curvados', type: 'consonant' },
  ch:  { img: 'img/lsa/ch.png',   desc: 'Dígrafo CH, seña compuesta similar a la C', type: 'consonant' },
  d:   { img: 'img/lsa/d.png',    desc: 'Índice arriba, otros curvados', type: 'consonant' },
  e:   { img: 'img/lsa/e.png',    desc: 'Dedos juntos en punta', type: 'vocal' },
  f:   { img: 'img/lsa/f.png',    desc: 'Índice y pulgar en círculo', type: 'consonant' },
  g:   { img: 'img/lsa/g.png',    desc: 'Índice extendido lateral', type: 'consonant' },
  h:   { img: 'img/lsa/h.png',    desc: 'Índice y medio extendidos horizontales', type: 'consonant' },
  i:   { img: 'img/lsa/i.png',    desc: 'Meñique extendido', type: 'vocal' },
  j:   { img: 'img/lsa/j.png',    desc: 'Meñique con movimiento en J', type: 'consonant' },
  k:   { img: 'img/lsa/k.png',    desc: 'Índice y medio con pulgar', type: 'consonant' },
  l:   { img: 'img/lsa/l.png',    desc: 'Índice y pulgar en L', type: 'consonant' },
  ll:  { img: 'img/lsa/ll.png',   desc: 'Dígrafo LL, seña compuesta similar a la L', type: 'consonant' },
  m:   { img: 'img/lsa/m.png',    desc: 'Tres dedos curvados sobre pulgar', type: 'consonant' },
  n:   { img: 'img/lsa/n.png',    desc: 'Dos dedos sobre pulgar', type: 'consonant' },
  ñ:   { img: 'img/lsa/enie.png', desc: 'Seña con movimiento ondulante sobre la N', type: 'consonant' },
  o:   { img: 'img/lsa/o.png',    desc: 'Dedos formando una O', type: 'vocal' },
  p:   { img: 'img/lsa/p.png',    desc: 'Forma de P con índice y pulgar', type: 'consonant' },
  q:   { img: 'img/lsa/q.png',    desc: 'Índice y pulgar hacia abajo', type: 'consonant' },
  r:   { img: 'img/lsa/r.png',    desc: 'Índice y medio cruzados', type: 'consonant' },
  s:   { img: 'img/lsa/s.png',    desc: 'Puño cerrado, pulgar cruzado', type: 'consonant' },
  t:   { img: 'img/lsa/t.png',    desc: 'Pulgar entre índice y medio', type: 'consonant' },
  u:   { img: 'img/lsa/u.png',    desc: 'Índice y medio juntos, arriba', type: 'vocal' },
  v:   { img: 'img/lsa/v.png',    desc: 'Índice y medio separados', type: 'consonant' },
  w:   { img: 'img/lsa/w.png',    desc: 'Tres dedos extendidos separados', type: 'consonant' },
  x:   { img: 'img/lsa/x.png',    desc: 'Índice curvado en gancho', type: 'consonant' },
  y:   { img: 'img/lsa/y.png',    desc: 'Pulgar y meñique extendidos', type: 'consonant' },
  z:   { img: 'img/lsa/z.png',    desc: 'Índice traza Z en el aire', type: 'consonant' },
};

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  initHeroBraille();
  initBrailleGrid();
  initLSAGrid();
  initQuiz();
  initTraductor();
  initAccesiblePanel();
  initNavbar();
  initScrollAnimations();
  initFilterButtons();
});

// ===== HERO BRAILLE VISUAL =====
function initHeroBraille() {
  const grid = document.getElementById('heroBrailleGrid');
  if (!grid) return;

  const letters = Object.keys(BRAILLE);
  letters.forEach(letra => {
    const cell = document.createElement('div');
    cell.className = 'hero-braille-cell';
    cell.setAttribute('aria-hidden', 'true');

    BRAILLE[letra].forEach(active => {
      const dot = document.createElement('div');
      dot.className = 'h-punto' + (active ? ' active' : '');
      cell.appendChild(dot);
    });

    grid.appendChild(cell);
  });

  // Animación ambiental: parpadeo aleatorio
  function randomPulse() {
    const cells = grid.querySelectorAll('.hero-braille-cell');
    const idx = Math.floor(Math.random() * cells.length);
    const dots = cells[idx].querySelectorAll('.h-punto');
    const letter = letters[idx];
    const pattern = BRAILLE[letter];

    // Tempora apagado
    dots.forEach(d => d.classList.remove('active'));
    setTimeout(() => {
      pattern.forEach((v, i) => {
        if (v) dots[i]?.classList.add('active');
      });
    }, 300);
  }

  setInterval(randomPulse, 800);
}

// ===== GRID BRAILLE INTERACTIVO =====
function initBrailleGrid() {
  const grid = document.getElementById('brailleGrid');
  if (!grid) return;

  Object.entries(BRAILLE).forEach(([letra, patron]) => {
    const card = document.createElement('div');
    card.className = 'braille-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Letra ${letra.toUpperCase()} en Braille: ${BRAILLE_DESC[letra]}`);

    // Letra
    const letraEl = document.createElement('div');
    letraEl.className = 'braille-card-letra';
    letraEl.textContent = letra.toUpperCase();

    // Celda braille
    const celda = document.createElement('div');
    celda.className = 'braille-celda';
    celda.setAttribute('aria-hidden', 'true');

    patron.forEach(activo => {
      const punto = document.createElement('div');
      punto.className = 'punto' + (activo ? ' active' : '');
      celda.appendChild(punto);
    });

    // Descripción
    const desc = document.createElement('div');
    desc.className = 'braille-card-nombre';
    desc.textContent = BRAILLE_DESC[letra];

    card.appendChild(letraEl);
    card.appendChild(celda);
    card.appendChild(desc);
    grid.appendChild(card);
  });

  // Hover / focus: iluminar puntos con efecto
  grid.addEventListener('mouseover', handleBrailleHighlight);
  grid.addEventListener('focusin', handleBrailleHighlight);
}

function handleBrailleHighlight(e) {
  const card = e.target.closest('.braille-card');
  if (!card) return;
  // El CSS ya maneja el glow, esto es por si queremos efectos adicionales
}

//JUEGO BRAILLE
let primerCartaSeleccionada = null;

const cartas = document.querySelectorAll(".carta");
const estadoJuego = document.getElementById("estado-juego");

cartas.forEach(function(carta) {
  carta.addEventListener("click", function() {
    if (primerCartaSeleccionada === null) {
      primerCartaSeleccionada = carta;
      carta.classList.add("seleccionada");
      carta.setAttribute("aria-pressed", "true");
      estadoJuego.innerText = "Carta " + carta.dataset.letra + " en braille seleccionada. Elegí su pareja.";
    } else {
      const segundaCarta = carta;

      if (
        primerCartaSeleccionada.dataset.letra === segundaCarta.dataset.letra &&
        primerCartaSeleccionada.dataset.tipo !== segundaCarta.dataset.tipo
      ) {
        primerCartaSeleccionada.classList.add("encontrada");
        segundaCarta.classList.add("encontrada");
        estadoJuego.innerText = "¡Correcto! Encontraste el par de la letra " + segundaCarta.dataset.letra + ".";
        primerCartaSeleccionada = null;
      } else {
        primerCartaSeleccionada.classList.remove("seleccionada");
        primerCartaSeleccionada.setAttribute("aria-pressed", "false");
        segundaCarta.classList.remove("seleccionada");
        segundaCarta.setAttribute("aria-pressed", "false");
        estadoJuego.innerText = "No es correcta, intentá de nuevo!";
        primerCartaSeleccionada = null;
      }
    }
  });
});

// ===== GRID LSA =====
function initLSAGrid() {
  const grid = document.getElementById('lsaGrid');
  if (!grid) return;

  Object.entries(LSA_DATA).forEach(([letra, data]) => {
    const card = document.createElement('div');
    card.className = `lsa-card${data.type === 'vocal' ? ' vocal' : ''}`;
    card.setAttribute('role', 'listitem');
    card.setAttribute('data-type', data.type);
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${letra.toUpperCase()} en LSA: ${data.desc}`);
    card.setAttribute('title', data.desc);

    card.innerHTML = `
      <img
        class="lsa-emoji"
        src="${data.img}"
        alt=""
        aria-hidden="true"
        loading="lazy"
        onerror="this.onerror=null; this.style.display='none';"
      />
      <div class="lsa-letra">${letra.toUpperCase()}</div>
      <div class="lsa-desc">${data.desc}</div>
    `;

    grid.appendChild(card);
  });
}

// ===== FILTROS LSA =====
function initFilterButtons() {
  const buttons = document.querySelectorAll('.filter-btn');
  const lsaGrid = document.getElementById('lsaGrid');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;
      const cards = lsaGrid?.querySelectorAll('.lsa-card');

      cards?.forEach(card => {
        if (filter === 'all') {
          card.style.display = '';
        } else if (filter === 'vocals') {
          card.style.display = card.dataset.type === 'vocal' ? '' : 'none';
        } else {
          card.style.display = card.dataset.type === 'consonant' ? '' : 'none';
        }
      });
    });
  });
}

// ===== QUIZ LSA =====
const QUIZ_LETTERS = Object.keys(LSA_DATA);
let quizCurrentLetter = '';
let quizScore = 0;
let quizAnswered = false;

function initQuiz() {
  nextQuizQuestion();
}

function nextQuizQuestion() {
  quizAnswered = false;
  const idx = Math.floor(Math.random() * QUIZ_LETTERS.length);
  quizCurrentLetter = QUIZ_LETTERS[idx];

  const display = document.getElementById('quizLetterDisplay');
  const options = document.getElementById('quizOptions');
  const feedback = document.getElementById('quizFeedback');

  if (!display || !options || !feedback) return;

  // Mostrar la seña (imagen + descripción)
  display.innerHTML = `
    <img
      class="quiz-seña-img"
      src="${LSA_DATA[quizCurrentLetter].img}"
      alt=""
      onerror="this.onerror=null; this.style.display='none';"
    />
    <div style="font-size:calc(0.85rem * var(--text-scale, 1)); color:var(--color-text-muted); margin-top:0.5rem">¿Qué letra es esta seña?</div>
  `;
  display.setAttribute('aria-label', `Seña: ${LSA_DATA[quizCurrentLetter].desc}`);

  feedback.textContent = '';
  feedback.className = 'quiz-feedback';

  // Generar opciones (correcta + 3 distractores)
  const wrong = QUIZ_LETTERS.filter(l => l !== quizCurrentLetter)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const allOptions = [...wrong, quizCurrentLetter].sort(() => Math.random() - 0.5);

  options.innerHTML = '';
  allOptions.forEach(letra => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option-btn';
    btn.textContent = letra.toUpperCase();
    btn.setAttribute('aria-label', `Opción: letra ${letra.toUpperCase()}`);

    btn.addEventListener('click', () => {
      if (quizAnswered) return;
      quizAnswered = true;

      const allBtns = options.querySelectorAll('.quiz-option-btn');
      allBtns.forEach(b => b.disabled = true);

      if (letra === quizCurrentLetter) {
        btn.classList.add('correct');
        feedback.textContent = `¡Correcto! La seña es la letra ${quizCurrentLetter.toUpperCase()} 🎉`;
        feedback.className = 'quiz-feedback';
      } else {
        btn.classList.add('wrong');
        const correctBtn = Array.from(allBtns).find(b =>
          b.textContent === quizCurrentLetter.toUpperCase()
        );
        if (correctBtn) correctBtn.classList.add('correct');
        feedback.textContent = `No era esa. La respuesta correcta era ${quizCurrentLetter.toUpperCase()}`;
        feedback.className = 'quiz-feedback error';
      }

      // Siguiente pregunta auto
      setTimeout(nextQuizQuestion, 2200);
    });

    options.appendChild(btn);
  });
}

// ===== TRADUCTOR BRAILLE =====
function initTraductor() {
  const input = document.getElementById('textoTraducir');
  const output = document.getElementById('traductorOutput');

  if (!input || !output) return;

  input.addEventListener('input', () => {
    const texto = input.value.toLowerCase().replace(/[^a-z]/g, '');
    renderBrailleOutput(texto, output);
  });
}

function renderBrailleOutput(texto, container) {
  if (!texto) {
    container.innerHTML = '<p class="traductor-placeholder">El resultado aparecerá acá</p>';
    return;
  }

  container.innerHTML = '';

  texto.split('').forEach(char => {
    const patron = BRAILLE[char];
    if (!patron) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'resultado-letra';
    wrapper.setAttribute('aria-label', `Letra ${char.toUpperCase()}: ${BRAILLE_DESC[char]}`);

    const celda = document.createElement('div');
    celda.className = 'braille-celda-mini';
    celda.setAttribute('aria-hidden', 'true');

    patron.forEach(activo => {
      const punto = document.createElement('div');
      punto.className = 'punto-mini' + (activo ? ' active' : '');
      celda.appendChild(punto);
    });

    const label = document.createElement('div');
    label.className = 'char-label';
    label.textContent = char;

    wrapper.appendChild(celda);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
}

// ===== PANEL MODO ACCESIBLE =====
function initAccesiblePanel() {
  const panel      = document.getElementById('panelAccesible');
  const overlay    = document.getElementById('panelOverlay');
  const btnNav     = document.getElementById('toggleAccesible');
  const btnFooter  = document.getElementById('toggleAccesibleFooter');
  const btnClose   = document.getElementById('panelClose');

  const toggleContraste    = document.getElementById('toggleAltoContraste');
  const toggleFuente       = document.getElementById('toggleFuenteGrande');
  const toggleAnimaciones  = document.getElementById('toggleSinAnimaciones');
  const toggleEspaciado    = document.getElementById('toggleEspaciado');
  const toggleCursor       = document.getElementById('toggleCursor');

  function openPanel() {
    panel.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    btnClose?.focus();
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    panel.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    btnNav?.focus();
  }

  btnNav?.addEventListener('click', openPanel);
  btnFooter?.addEventListener('click', openPanel);
  btnClose?.addEventListener('click', closePanel);
  overlay?.addEventListener('click', closePanel);

  // ESC para cerrar
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.getAttribute('aria-hidden') === 'false') {
      closePanel();
    }
  });

  // Trap focus en el panel
  panel?.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const focusable = panel.querySelectorAll('button, input, a[href], [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // ---- Opciones ----
  function applyPreference(checkbox, bodyClass) {
    const isChecked = checkbox?.checked;
    document.body.classList.toggle(bodyClass, isChecked);
    checkbox?.setAttribute('aria-checked', isChecked ? 'true' : 'false');

    // Persistir en localStorage
    if (checkbox?.id) {
      try { localStorage.setItem('accesible_' + checkbox.id, isChecked); } catch(e) {}
    }
  }

  toggleContraste?.addEventListener('change', () =>
    applyPreference(toggleContraste, 'high-contrast'));

  toggleFuente?.addEventListener('change', () =>
    applyPreference(toggleFuente, 'large-text'));

  toggleAnimaciones?.addEventListener('change', () =>
    applyPreference(toggleAnimaciones, 'no-animations'));

  toggleEspaciado?.addEventListener('change', () =>
    applyPreference(toggleEspaciado, 'extra-spacing'));

  toggleCursor?.addEventListener('change', () =>
    applyPreference(toggleCursor, 'big-cursor'));

  // Restaurar desde localStorage
  function restorePreferences() {
    const prefs = [
      { el: toggleContraste,   cls: 'high-contrast' },
      { el: toggleFuente,      cls: 'large-text' },
      { el: toggleAnimaciones, cls: 'no-animations' },
      { el: toggleEspaciado,   cls: 'extra-spacing' },
      { el: toggleCursor,      cls: 'big-cursor' },
    ];

    prefs.forEach(({ el, cls }) => {
      if (!el) return;
      try {
        const saved = localStorage.getItem('accesible_' + el.id);
        if (saved === 'true') {
          el.checked = true;
          el.setAttribute('aria-checked', 'true');
          document.body.classList.add(cls);
        }
      } catch(e) {}
    });
  }

  restorePreferences();
}

// ===== NAVBAR MÓVIL =====
function initNavbar() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');

  hamburger?.addEventListener('click', () => {
    const isOpen = navLinks?.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Cerrar al hacer click en link
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
    });
  });

  // Navbar scroll shadow
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ===== ANIMACIONES DE SCROLL =====
function initScrollAnimations() {
  // Marcar elementos para animar
  const targets = document.querySelectorAll(
    '.card-dato, .mito-card, .braille-card, .lsa-card, .frase-card, .recurso-card, .stat'
  );

  targets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Delay escalonado para grupos
        const siblings = Array.from(entry.target.parentElement?.children || []);
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 60, 400);

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(el => observer.observe(el));
}

// ===== UTILIDADES =====

// Anuncio para lectores de pantalla
function announceToScreenReader(message) {
  const announcer = document.getElementById('sr-announcer') || (() => {
    const el = document.createElement('div');
    el.id = 'sr-announcer';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    el.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;';
    document.body.appendChild(el);
    return el;
  })();

  announcer.textContent = '';
  setTimeout(() => { announcer.textContent = message; }, 50);
}

// ===== NAVEGACIÓN POR TECLADO EN LSA CARDS =====
document.addEventListener('keydown', (e) => {
  if (!['Enter', ' '].includes(e.key)) return;
  const card = document.activeElement;
  if (!card?.classList.contains('frase-card')) return;

  e.preventDefault();
  const desc = card.querySelector('.frase-desc')?.textContent;
  const texto = card.querySelector('.frase-texto')?.textContent;
  if (desc && texto) {
    announceToScreenReader(`${texto}: ${desc}`);
  }
});

// ===== ACCESIBILIDAD: BRAILLE CARDS CON TECLADO =====
document.addEventListener('keydown', (e) => {
  if (!['Enter', ' '].includes(e.key)) return;
  const card = document.activeElement;
  if (!card?.classList.contains('braille-card')) return;

  e.preventDefault();
  const letra = card.querySelector('.braille-card-letra')?.textContent;
  const desc  = card.querySelector('.braille-card-nombre')?.textContent;
  if (letra && desc) {
    announceToScreenReader(`Letra ${letra}: ${desc}`);
  }
});

// ===== RECURSOS: DESPLEGABLE "APRENDE LSA" =====
document.addEventListener('DOMContentLoaded', () => {
  const lsaToggle = document.getElementById('lsaResourcesToggle');
  const lsaPanel  = document.getElementById('lsaResourcesPanel');

  if (lsaToggle && lsaPanel) {
    lsaToggle.addEventListener('click', () => {
      const isOpen = lsaPanel.classList.toggle('open');
      lsaToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
});