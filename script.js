/* ─── CONFIGURATION & STATE ──────────────────────────────── */
const htmlEl = document.documentElement;
let isAr = localStorage.getItem('florabelle-lang') === 'ar';

// بيانات المعرض (للصفحة الرئيسية فقط)
const portfolioData = {
  reels: [{
      src: "website/IMG_0409.MP4"
    },
    {
      src: "website/IMG_0410.MP4"
    },
    {
      src: "website/IMG_0411.MP4"
    },
    {
      src: "website/IMG_0412.MP4"
    }
  ],
  photos: [
    {
      src: "website/photo_2026.jpg",
      altEn: "Software Integration Project",
      altAr: "مشروع تكامل برمجي",
      wide: false
    },
    {
      src: "website/meating.jpg",
      altEn: "UI/UX Design",
      altAr: "تصميم واجهة مستخدم",
      wide: false
    },
    {
      src: "website/match.jpg",
      altEn: "Smart System Interface",
      altAr: "واجهة نظام ذكي",
      wide: false
    },
    {
      src: "website/signup_dark.jpg",
      altEn: "Syria Digital System",
      altAr: "النظام الرقمي السوري",
      wide: true,
      link: "case-study-syria.html"
    },
  ]
};

/* ─── LANGUAGE ENGINE ─────────────────────────────────────── */
function applyLang() {
  // تطبيق الاتجاه واللغة
  htmlEl.lang = isAr ? 'ar' : 'en';
  htmlEl.dir = isAr ? 'rtl' : 'ltr';

  const langLabel = document.getElementById('lang-label');
  if (langLabel) langLabel.textContent = isAr ? 'EN' : 'AR';

  // تحديث النصوص بناءً على data-attributes
  document.querySelectorAll('[data-en]').forEach(el => {
    const val = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    if (!val) return;

    // دعم العناوين التي تحتوي على وسم <em> أو <br>
    const isRichText = el.tagName === 'SPAN' && (el.closest('h1') || el.closest('h2'));

    if (isRichText) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });

  // إعادة رندر الصور إذا كنا في الصفحة الرئيسية لتحديث الـ Alt text
  if (document.getElementById('photos-container')) renderPhotos();
}

/* ─── UI COMPONENTS ──────────────────────────────────────── */

// 1. التنقل (Navigation)
window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
}, {
  passive: true
});

// 2. القائمة الجانبية للموبايل
const hamBtn = document.getElementById('ham-btn');
if (hamBtn) {
  hamBtn.addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('open');
  });
}

function closeMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.remove('open');
}

// 3. تأثير ظهور العناصر عند التمرير (Scroll Reveal)
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, {
    threshold: 0.12
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// 4. التحكم بصوت الفيديو (Reels)
function toggleMute(btn) {
  const video = btn.parentElement.querySelector('video');
  if (!video) return;
  video.muted = !video.muted;
  const muteX = btn.querySelector('.mute-x');
  if (muteX) muteX.style.display = video.muted ? 'block' : 'none';
}

// 5. نافذة عرض الصور (Modal)
function openModal(card) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("fullImage");
  if (!modal || !modalImg) return;

  const clickedImg = card.querySelector('img');
  modal.style.display = "block";
  modalImg.src = clickedImg.src;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

/* ─── RENDERERS (HOME PAGE ONLY) ─────────────────────────── */
function renderReels() {
  const topContainer = document.getElementById('reels-container');
  const bottomContainer = document.getElementById('reels-bottom-container');
  if (!topContainer) return;

  let topHTML = '',
    bottomHTML = '';

  portfolioData.reels.forEach((reel, index) => {
    const html = `
      <div class="reel-card">
        <video src="${reel.src}" autoplay muted loop playsinline></video>
        <button class="reel-unmute" aria-label="Toggle sound" onclick="toggleMute(this)">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="mute-icon" d="M11 5L6 9H2v6h4l5 4V5z" fill="#2b2118"/>
            <path class="mute-x" d="M23 9l-6 6M17 9l6 6" stroke="#2b2118" stroke-width="2" stroke-linecap="round" style="display:block"/>
          </svg>
        </button>
      </div>`;
    index < 2 ? topHTML += html : bottomHTML += html;
  });

  topContainer.innerHTML = topHTML;
  bottomContainer.innerHTML = bottomHTML;
}

function renderPhotos() {
  const container = document.getElementById('photos-container');
  if (!container) return;

  let finalHTML = '';

  portfolioData.photos.forEach(photo => {
    const wideClass = photo.wide ? ' wide' : '';
    const altText = isAr ? photo.altAr : photo.altEn;

    if (photo.link) {
      const labelEn = "UI/UX Case Study";
      const labelAr = "دراسة حالة واجهات المستخدم";
      finalHTML += `
        <div class="special-section-label reveal" data-en="${labelEn}" data-ar="${labelAr}">
          ${isAr ? labelAr : labelEn}
        </div>`;
    }

    
    if (photo.link) {
      finalHTML += `
        <a href="${photo.link}" class="photo-card${wideClass} has-link">
          <img src="${photo.src}" alt="${altText}">
          <div class="photo-overlay">
            <span data-en="View Case Study" data-ar="عرض دراسة الحالة">
              ${isAr ? 'عرض دراسة الحالة' : 'View Case Study'}
            </span>
            <svg class="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </a>`;
    } else {
      finalHTML += `
        <div class="photo-card${wideClass}" onclick="openModal(this)">
          <img src="${photo.src}" alt="${altText}">
        </div>`;
    }
  });

  container.innerHTML = finalHTML;
  

  if (typeof initScrollReveal === 'function') initScrollReveal();
}
/* ─── INITIALIZATION ─────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  
  applyLang();
  initScrollReveal();


  renderReels();
  renderPhotos();

 
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      isAr = !isAr;
      localStorage.setItem('florabelle-lang', isAr ? 'ar' : 'en');
      applyLang();
    });
  }
});


document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") closeModal();
});