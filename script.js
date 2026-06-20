// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Sticky nav background on scroll =====
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 12);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ===== Mobile menu toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Scroll-reveal animations (progressive enhancement) =====
// Content is visible by default in CSS. We only add the "js-reveal" class
// (which hides .reveal elements pre-animation) once we're sure JS can
// actually bring them back via IntersectionObserver — so a slow script,
// a JS error elsewhere, or an unsupported browser never leaves content
// permanently invisible.
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealEls.length) {
  document.documentElement.classList.add('js-reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));

  // Safety net: if anything goes wrong and an element never intersects
  // (e.g. it's already off-screen above the fold on load in some edge
  // case), force everything visible after a short delay.
  window.setTimeout(() => {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }, 2500);
}