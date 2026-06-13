/* ============================================
   BROTHER KICK MUAY THAI — MAIN.JS
   1. Navbar scroll + burger
   2. Active nav link on scroll
   3. Scroll reveal animations
   4. Gallery lightbox
============================================ */

// ── 1. NAVBAR ──
const navbar    = document.getElementById('navbar');
const burgerBtn = document.getElementById('burgerBtn');
const navMenu   = document.getElementById('navMenu');

// Scroll → classe scrolled
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Burger toggle
burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('active');
  navMenu.classList.toggle('open');
});

// Fermer menu mobile au clic sur un lien
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burgerBtn.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

// ── 2. ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar__menu a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, {
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0
});

sections.forEach(section => sectionObserver.observe(section));

// ── 3. SCROLL REVEAL ──
const revealElements = document.querySelectorAll(
  '.class__card, .contact__item, .pricing__cta-card, .value__item, .schedule__card, .history__card, .fighter__card'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  revealObserver.observe(el);
});

// ── 4. GALLERY LIGHTBOX ──
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

// Collecte toutes les images de la galerie (pas les fighters)
const galleryItems = document.querySelectorAll('.gallery__item img');
let currentIndex   = 0;

// Construit un tableau { src, alt }
const images = Array.from(galleryItems).map(img => ({
  src: img.src,
  alt: img.alt
}));

function openLightbox(index) {
  currentIndex       = index;
  lightboxImg.src    = images[index].src;
  lightboxImg.alt    = images[index].alt;
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  // Vide l'image après transition pour éviter le flash
  setTimeout(() => { lightboxImg.src = ''; }, 300);
}

// Clic sur image galerie
galleryItems.forEach((img, index) => {
  img.parentElement.addEventListener('click', () => openLightbox(index));
});

// Boutons nav
lightboxClose.addEventListener('click', closeLightbox);

lightboxPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  openLightbox(currentIndex);
});

lightboxNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  openLightbox(currentIndex);
});

// Clic sur le fond sombre
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

// Clavier
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  { currentIndex = (currentIndex - 1 + images.length) % images.length; openLightbox(currentIndex); }
  if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % images.length; openLightbox(currentIndex); }
});
