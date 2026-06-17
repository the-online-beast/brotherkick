/* =============================================
   BROTHER KICK MUAY THAI - MAIN JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ---------------------------------------------
    // 1. NAVBAR SCROLL EFFECT
    // ---------------------------------------------
    const navbar = document.querySelector('.nav');
    const scrollThreshold = 80;

    function handleNavScroll() {
        const scrollY = window.scrollY;

        if (scrollY > scrollThreshold) {
            navbar.classList.remove('nav--transparent');
            navbar.classList.add('nav--solid');
        } else {
            navbar.classList.remove('nav--solid');
            navbar.classList.add('nav--transparent');
        }
    }

    // Initial state
    handleNavScroll();

    // Listen to scroll events with passive flag for performance
    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ---------------------------------------------
    // 2. MOBILE HAMBURGER MENU TOGGLE
    // ---------------------------------------------
    const hamburger = document.querySelector('.nav__hamburger');
    const mobileMenu = document.querySelector('.nav__mobile');
    const mobileLinks = document.querySelectorAll('.nav__mobile-link');

    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // ---------------------------------------------
    // 3. SMOOTH SCROLL FOR ANCHOR LINKS
    // ---------------------------------------------
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#" or empty
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = targetPosition - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---------------------------------------------
    // 4. SCROLL-TRIGGERED FADE-IN ANIMATIONS
    // ---------------------------------------------
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: unobserve after animation
                    // animationObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        });

        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    } else {
        // Fallback for older browsers - show all elements immediately
        animatedElements.forEach(element => {
            element.classList.add('visible');
        });
    }

    // ---------------------------------------------
    // 5. ACTIVE NAV LINK HIGHLIGHT
    // ---------------------------------------------
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveNav() {
        const scrollY = window.scrollY;
        const navHeight = navbar.offsetHeight;

        // Find the current section
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });

        // Update active class on nav links
        navLinks.forEach(link => {
            link.classList.remove('active');

            const linkHref = link.getAttribute('href');
            if (linkHref === '#' + currentSection) {
                link.classList.add('active');
            }
        });

        // Update active class on mobile nav links
        mobileLinks.forEach(link => {
            link.classList.remove('active');

            const linkHref = link.getAttribute('href');
            if (linkHref === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Debounce function for performance
    function debounce(func, wait = 10) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    window.addEventListener('scroll', debounce(highlightActiveNav, 10), { passive: true });

    // Initial call
    highlightActiveNav();

    // ---------------------------------------------
    // 6. GALLERY IMAGE CLICK (Optional Lightbox)
    // ---------------------------------------------
    const galleryItems = document.querySelectorAll('.gallery__item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                // Open image in new tab (simple approach)
                window.open(img.src, '_blank');
            }
        });
    });

    // ---------------------------------------------
    // 7. BUTTON RIPPLE EFFECT (Visual Polish)
    // ---------------------------------------------
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('btn__ripple');

            // Get button dimensions
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            // Set ripple position
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

            // Add ripple to button
            this.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ---------------------------------------------
    // 8. SCROLL TO TOP BUTTON (Show/Hide)
    // ---------------------------------------------
    // Create scroll to top button if it doesn't exist
    let scrollTopBtn = document.querySelector('.scroll-top-btn');

    if (!scrollTopBtn) {
        scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-top-btn';
        scrollTopBtn.innerHTML = '↑';
        scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollTopBtn);

        // Add styles dynamically
        const scrollTopStyles = document.createElement('style');
        scrollTopStyles.textContent = `
            .scroll-top-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background-color: var(--accent-red);
                color: var(--text-primary);
                border: none;
                border-radius: 50%;
                font-size: 24px;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
                z-index: 999;
                box-shadow: var(--shadow-lg);
            }
            .scroll-top-btn.visible {
                opacity: 1;
                visibility: visible;
            }
            .scroll-top-btn:hover {
                background-color: var(--accent-gold);
                transform: translateY(-3px);
            }
        `;
        document.head.appendChild(scrollTopStyles);

        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    function handleScrollTopVisibility() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', debounce(handleScrollTopVisibility, 10), { passive: true });

    // ---------------------------------------------
    // 9. LAZY LOAD IMAGES
    // ---------------------------------------------
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ---------------------------------------------
    // 10. PREVENT SCROLL ON MOBILE MENU OPEN
    // ---------------------------------------------
    // Already handled in hamburger toggle (body overflow)

    // ---------------------------------------------
    // 11. KEYBOARD NAVIGATION ACCESSIBILITY
    // ---------------------------------------------
    hamburger.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMobileMenu();
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ---------------------------------------------
    // 12. CONSOLE LOG FOR DEBUG (Remove in production)
    // ---------------------------------------------
    console.log('%c🥊 Brother Kick Muay Thai', 'font-size: 24px; font-weight: bold; color: #c8102e;');
    console.log('%cTrain Hard. Fight Smart. Build Brotherhood.', 'font-size: 14px; color: #d4a017;');

});
