/* ============================================
   BROTHER KICK MUAY THAI — MAIN JS
   1. Navbar scroll effect
   2. Mobile burger menu
   3. Smooth scroll + active link
   4. Scroll reveal animations
============================================ */

// ── 1. NAVBAR SCROLL EFFECT ──
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ── 2. MOBILE BURGER MENU ──
const burgerBtn = document.getElementById("burgerBtn");
const navMenu = document.getElementById("navMenu");

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("active");
  navMenu.classList.toggle("open");
});

// Close menu when a link is clicked
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    burgerBtn.classList.remove("active");
    navMenu.classList.remove("open");
  });
});

// ── 3. ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar__menu a");

const observerOptions = {
  root: null,
  rootMargin: "-40% 0px -55% 0px",
  threshold: 0,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.style.color = "";
        if (link.getAttribute("href") === `#${entry.target.id}`) {
          link.style.color = "var(--color-gold)";
        }
      });
    }
  });
}, observerOptions);

sections.forEach((section) => sectionObserver.observe(section));

// ── 4. SCROLL REVEAL ANIMATIONS ──
const revealElements = document.querySelectorAll(
  ".class__card, .contact__item, .pricing__cta-card, .value__item, .schedule__card",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
);

revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  revealObserver.observe(el);
});

// ── CONSOLE CREDIT ──
console.log(
  "%c🥊 Brother Kick Muay Thai — Discipline • Respect • Stronger Together",
  "color: #C9922A; font-size: 14px; font-weight: bold;",
);
// ── GALLERY LIGHTBOX ──
const galleryItems = document.querySelectorAll('.gallery__item');
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentIndex = 0;
const images = [];

// Collect all gallery images
galleryItems.forEach((item, i) => {
  const img = item.querySelector('img');
  images.push({ src: img.src, alt: img.alt });

  item.addEventListener('click', () => {
    currentIndex = i;
    openLightbox(currentIndex);
  });
});

function openLightbox(index) {
  lightboxImg.src = images[index].src;
  lightboxImg.alt = images[index].alt;
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

lightboxPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  openLightbox(currentIndex);
});

lightboxNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  openLightbox(currentIndex);
});

// Close on backdrop click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   { currentIndex = (currentIndex - 1 + images.length) % images.length; openLightbox(currentIndex); }
  if (e.key === 'ArrowRight')  { currentIndex = (currentIndex + 1) % images.length; openLightbox(currentIndex); }
});

// ── NAVBAR: add new links ──
// Ajoute dans ton HTML navbar les liens :
// <a href="#fighters">Fighters</a>
// <a href="#gallery">Gallery</a>

