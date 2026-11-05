/* ============================================================
   CODE BLOODED — script.js
   Mobile nav toggle, footer year, scroll reveal
   ============================================================ */

(function () {
  'use strict';

  /* ---------- 1. Mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- 2. Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 3. Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.section-inner, .about-card, .service-card, .project-card, .team-card, .contact-card'
  );

  if ('IntersectionObserver' in window && revealTargets.length) {
    revealTargets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach((el) => observer.observe(el));
  }

  /* ---------- 4. Navbar shrink on scroll ---------- */
  const navWrap = document.querySelector('.nav-wrap');
  if (navWrap) {
    let lastY = 0;
    window.addEventListener(
      'scroll',
      () => {
        const y = window.scrollY;
        if (y > 20) {
          navWrap.style.boxShadow = '0 4px 24px rgba(0,0,0,0.35)';
        } else {
          navWrap.style.boxShadow = 'none';
        }
        lastY = y;
      },
      { passive: true }
    );
  }
})();