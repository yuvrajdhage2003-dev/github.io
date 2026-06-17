// =========================================================
// Respect reduced-motion preference
// =========================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// =========================================================
// Typewriter effect for hero role line
// =========================================================
const roles = ['Data Analyst', 'IoT Developer', 'AI Enthusiast', 'Problem Solver'];
const typewriterEl = document.getElementById('typewriter');

function startTypewriter(){
  if (!typewriterEl) return;

  if (prefersReducedMotion) {
    typewriterEl.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 65;
  const DELETE_SPEED = 35;
  const HOLD_TIME = 1600;

  function tick(){
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      typewriterEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, HOLD_TIME);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      typewriterEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
}

// =========================================================
// Scroll reveal via IntersectionObserver
// =========================================================
function initScrollReveal(){
  const targets = document.querySelectorAll('.fade-up');

  if (prefersReducedMotion) {
    targets.forEach(el => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

// =========================================================
// Mobile nav toggle
// =========================================================
function initMobileNav(){
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// =========================================================
// Active nav link highlighting on scroll
// =========================================================
function initActiveNav(){
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('[data-nav]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-30% 0px -50% 0px' });

  sections.forEach(section => observer.observe(section));
}

// =========================================================
// Nav background intensifies on scroll (subtle)
// =========================================================
function initNavScrollState(){
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 8 ? '0 8px 24px -16px rgba(0,0,0,0.5)' : 'none';
  }, { passive: true });
}

// =========================================================
// Init
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  startTypewriter();
  initScrollReveal();
  initMobileNav();
  initActiveNav();
  initNavScrollState();
});
