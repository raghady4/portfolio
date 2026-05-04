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
function initScrollReveal() {
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
}

// ── Reel mute toggle ─────────────────────────────────────────
function toggleMute(btn) {
  const video = btn.parentElement.querySelector('video');
  video.muted = !video.muted;
  const muteX = btn.querySelector('.mute-x');
  if (muteX) muteX.style.display = video.muted ? 'block' : 'none';
}

// ── Modal ────────────────────────────────────────────────────
function openModal(card) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("fullImage");
  const clickedImg = card.querySelector('img');
  
  modal.style.display = "block";
  modalImg.src = clickedImg.src;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// ── Dynamic Portfolio Data ───────────────────────────────────
const portfolioData = {
  reels: [
    { src: "website/IMG_0409.MP4" },
    { src: "website/IMG_0410.MP4" },
    { src: "website/IMG_0411.MP4" },
    { src: "website/IMG_0412.MP4" }


    // ← أضف هنا فيديوهات جديدة____________________________________________________________


  ],

  photos: [
    {
      src: "website/photo_2026.jpg",
      altEn: "Software Integration Project",
      wide: false
    },
    {
      src: "website/meating.jpg",
      altEn: "UI/UX Design",
      wide: false
    },
    {
      src: "website/match.jpg",
      altEn: "Smart System Interface",
      wide: false
    },
    {
      src: "website/match2.jpg",
      altEn: "Smart System Interface",
      wide: false
    },













    // ← أضف هنا مشاريع جديدة___________________________________________________________________________________________________________________
  









]
};

// ── Render Functions ─────────────────────────────────────────
function renderReels() {
  const topContainer = document.getElementById('reels-container');
  const bottomContainer = document.getElementById('reels-bottom-container');

  let topHTML = '';
  let bottomHTML = '';

  portfolioData.reels.forEach((reel, index) => {
    const reelHTML = `
      <div class="reel-card">
        <video src="${reel.src}" autoplay muted loop playsinline></video>
        <button class="reel-unmute" aria-label="Toggle sound" onclick="toggleMute(this)">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="mute-icon" d="M11 5L6 9H2v6h4l5 4V5z" fill="#2b2118"/>
            <path class="mute-x" d="M23 9l-6 6M17 9l6 6" stroke="#2b2118" stroke-width="2" stroke-linecap="round" style="display:block"/>
          </svg>
        </button>
      </div>
    `;

    if (index < 2) {
      topHTML += reelHTML;
    } else {
      bottomHTML += reelHTML;
    }
  });

  topContainer.innerHTML = topHTML;
  bottomContainer.innerHTML = bottomHTML;
}

function renderPhotos() {
  const container = document.getElementById('photos-container');
  let html = '';

  portfolioData.photos.forEach(photo => {
    const wideClass = photo.wide ? ' wide' : '';
    html += `
      <div class="photo-card${wideClass}" onclick="openModal(this)">
        <img src="${photo.src}" 
             alt="${isAr ? photo.altAr : photo.altEn}">
      </div>
    `;
  });

  container.innerHTML = html;
}

// ── Initialize Everything ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderReels();
  renderPhotos();
  initScrollReveal();
});

// Close modal on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") closeModal();
});