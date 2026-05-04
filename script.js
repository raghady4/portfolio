// ── Language toggle ──────────────────────────────────────────
const htmlEl = document.documentElement;
let isAr = localStorage.getItem('florabelle-lang') === 'ar';

function applyLang() {
  if (isAr) {
    htmlEl.lang = 'ar';
    htmlEl.dir = 'rtl';
    document.getElementById('lang-label').textContent = 'EN';
  } else {
    htmlEl.lang = 'en';
    htmlEl.dir = 'ltr';
    document.getElementById('lang-label').textContent = 'AR';
  }

  document.querySelectorAll('[data-en]').forEach(el => {
    const val = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    if (!val) return;
    if (el.tagName === 'SPAN' && (el.parentElement?.tagName === 'H1' || el.parentElement?.tagName === 'H2')) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });
}

document.getElementById('lang-toggle').addEventListener('click', () => {
  isAr = !isAr;
  localStorage.setItem('florabelle-lang', isAr ? 'ar' : 'en');
  applyLang();
});

applyLang();

// ── Nav scroll shadow ────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('main-nav').classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── Hamburger menu ───────────────────────────────────────────
document.getElementById('ham-btn').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('open');
});

function closeMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
}

// ── Scroll reveal ────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ── Reel mute toggle ─────────────────────────────────────────
function toggleMute(btn) {
  const video = btn.parentElement.querySelector('video');
  video.muted = !video.muted;
  const muteX = btn.querySelector('.mute-x');
  if (muteX) muteX.style.display = video.muted ? 'block' : 'none';
}