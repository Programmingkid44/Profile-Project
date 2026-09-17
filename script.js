/* =========================================================
   Mihir Prakash — portfolio scripts
   Theme toggle + scroll reveal. No personal data lives here.
   ========================================================= */

/* ---------- THEME TOGGLE ---------- */
(function initTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch { /* storage may be blocked */ }

  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  root.setAttribute('data-theme', saved || (prefersLight ? 'light' : 'dark'));

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    toggle.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    try { localStorage.setItem('theme', next); } catch { /* ignore */ }
  });
})();

/* ---------- SCROLL REVEAL ---------- */
(function initReveal() {
  const items = document.querySelectorAll('.fade-in');
  if (!items.length) return;

  // Users who prefer reduced motion get everything visible immediately.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      obs.unobserve(entry.target); // reveal once, then stop watching
    });
  }, { threshold: 0.12 });

  items.forEach((el) => {
    observer.observe(el);
    // Anything already in view on load shouldn't wait for a scroll event.
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('visible');
  });
})();

/* ---------- FOOTER YEAR ---------- */
(function initYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
