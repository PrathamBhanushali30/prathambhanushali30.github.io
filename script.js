// ============================================================
// Mobile nav toggle
// ============================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', false);
    })
  );
}

// ============================================================
// Terminal boot sequence
// ============================================================
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const bootLines = [
  { text: '$ whoami --role', delay: 20 },
  { text: 'Offensive Security, Defensive Security, AI Security Engineer & GRC Analyst', result: true, delay: 8 },
  { text: '$ scan --target career.log --recon', delay: 20 },
  { text: 'VAPT · AppSec · SOC · NOC · OT/ICS Defense · GRC · Adversarial ML', result: true, delay: 8 },
  { text: '$ status', delay: 20 },
  { text: 'open to opportunities: true', result: true, delay: 8 },
];

async function typeLine(container, text, speed) {
  const line = document.createElement('div');
  line.className = 'terminal__line';
  container.appendChild(line);
  for (let i = 0; i <= text.length; i++) {
    line.textContent = text.slice(0, i);
    if (!reduceMotion) await sleep(speed);
  }
  return line;
}

function sleep(ms) { return new Promise(res => setTimeout(res, ms)); }

async function runBoot() {
  const body = document.getElementById('terminalBody');
  if (!body) return;
  body.innerHTML = '';

  if (reduceMotion) {
    bootLines.forEach(l => {
      const line = document.createElement('div');
      line.className = 'terminal__line' + (l.result ? ' is-result' : '');
      line.textContent = l.text;
      body.appendChild(line);
    });
    return;
  }

  for (const l of bootLines) {
    const line = await typeLine(body, l.text, l.delay);
    if (l.result) line.classList.add('is-result');
    await sleep(180);
  }
  const cursor = document.createElement('span');
  cursor.className = 'terminal__cursor';
  body.lastElementChild.appendChild(document.createTextNode(' '));
  body.lastElementChild.appendChild(cursor);
}

// Kick off boot sequence once, when hero is in view
const terminalEl = document.getElementById('terminal');
if (terminalEl) {
  const bootObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runBoot();
        bootObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  bootObserver.observe(terminalEl);
}

// ============================================================
// Scroll reveal
// ============================================================
const revealTargets = document.querySelectorAll(
  '.section__head, .about__grid, .focus-card, .stack__group, .project, .chain, .edu__item, .cert, .contact__card'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => revealObserver.observe(el));

// ============================================================
// Nav background on scroll (slightly stronger blur once scrolled)
// ============================================================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.style.background = 'rgba(10,14,20,0.92)';
  } else {
    nav.style.background = 'rgba(10,14,20,0.72)';
  }
}, { passive: true });
