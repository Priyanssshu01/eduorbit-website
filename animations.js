/* ===================================================================
   EDUORBIT — ANIMATION ENGINE v2.0
   Handles: scroll reveals, split text, magnetic buttons, counters,
            scroll progress, ripple, card tilt, CTA particles
   =================================================================== */

(function () {
  'use strict';

  // ============================================================
  // 1. SCROLL PROGRESS BAR
  // ============================================================
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.id = 'scroll-progress';
    document.body.prepend(bar);
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = ((scrolled / total) * 100).toFixed(1) + '%';
    }, { passive: true });
  }

  // ============================================================
  // 2. CORE IntersectionObserver — data-anim and sections
  // ============================================================
  function initScrollReveal() {
    const opts = { threshold: 0.12, rootMargin: '0px 0px -60px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, opts);

    // Observe every element with data-anim
    document.querySelectorAll('[data-anim]').forEach(el => observer.observe(el));

    // Observe every section for section-level reveals
    document.querySelectorAll('section').forEach(el => {
      const line = document.createElement('div');
      line.className = 'section-reveal-line';
      el.prepend(line);
      observer.observe(el);
    });
  }

  // ============================================================
  // 3. STAGGER GRIDS — data-stagger on containers
  // ============================================================
  function initStagger() {
    const opts = { threshold: 0.08, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, opts);

    document.querySelectorAll('[data-stagger]').forEach(el => observer.observe(el));
  }

  // ============================================================
  // 4. SPLIT TEXT CHARACTER ANIMATION
  // ============================================================
  function initSplitText() {
    document.querySelectorAll('.split-chars').forEach(el => {
      const text = el.textContent;
      el.innerHTML = text.split('').map(ch =>
        ch === ' '
          ? '<span style="display:inline-block;width:0.3em"> </span>'
          : `<span data-char>${ch}</span>`
      ).join('');
      el.classList.add('split-text');

      const obs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add('chars-in');
          obs.unobserve(el);
        }
      }, { threshold: 0.3 });
      obs.observe(el);
    });
  }

  // ============================================================
  // 5. COUNTER ANIMATION (enhanced with pop effect)
  // ============================================================
  function initCounters() {
    const opts = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.count;
        const duration = 1800;
        const start = performance.now();
        const isFloat = target % 1 !== 0;

        function step(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 4); // quartic ease-out
          const current = eased * target;
          el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
          if (p < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = target;
            el.classList.add('counting');
            setTimeout(() => el.classList.remove('counting'), 400);
          }
        }
        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    }, opts);

    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
  }

  // ============================================================
  // 6. MAGNETIC BUTTONS + RIPPLE
  // ============================================================
  function initMagnetic() {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.classList.add('btn-magnetic');

      // Ripple on click
      btn.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `
          width: ${size}px; height: ${size}px;
          left: ${e.clientX - rect.left - size / 2}px;
          top: ${e.clientY - rect.top - size / 2}px;
        `;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });

      // Magnetic tilt
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        btn.style.transform = `translate(${x * 8}px, ${y * 6}px) scale(1.03)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ============================================================
  // 7. CARD 3D TILT
  // ============================================================
  function initCardTilt() {
    document.querySelectorAll('.college-card, .service-card, .elig-card').forEach(card => {
      card.classList.add('card-tilt');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const tiltX = y * -10;
        const tiltY = x * 10;
        card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px) scale(1.02)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      });
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease';
      });
    });
  }

  // ============================================================
  // 8. CTA SECTION PARTICLES
  // ============================================================
  function initParticles() {
    const cta = document.querySelector('.section--cta');
    if (!cta) return;

    const colors = ['rgba(245,197,24,0.5)', 'rgba(255,255,255,0.2)', 'rgba(37,99,235,0.3)'];
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'cta-particle';
      const size = Math.random() * 10 + 4;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        --float-dur: ${Math.random() * 8 + 5}s;
        --float-delay: ${Math.random() * -8}s;
        filter: blur(${Math.random() > 0.5 ? 2 : 0}px);
      `;
      cta.appendChild(p);
    }
  }

  // ============================================================
  // 9. HERO TITLE — character-level entrance
  // ============================================================
  function initHeroTitle() {
    // Ensure hero badge and buttons animate on load
    const loader = document.getElementById('loader');
    if (!loader) return;

    const origHidden = loader.classList.contains.bind(loader, 'hidden');
    const observer = new MutationObserver(() => {
      if (loader.classList.contains('hidden')) {
        // trigger hero elements
        document.querySelectorAll('.hero-content .reveal-up').forEach(el => {
          el.classList.add('visible');
        });
        observer.disconnect();
      }
    });
    observer.observe(loader, { attributes: true, attributeFilter: ['class'] });
  }

  // ============================================================
  // 10. HERO SCROLL PARALLAX (subtle, 60fps)
  // ============================================================
  function initHeroParallax() {
    const orbs = document.querySelectorAll('.orb');
    const heroText = document.querySelector('.hero-bg-text');
    if (!orbs.length) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          const factor = y * 0.3;
          orbs.forEach((orb, i) => {
            const dir = i % 2 === 0 ? 1 : -1;
            orb.style.transform = `translateY(${factor * dir * 0.15}px)`;
          });
          if (heroText) {
            heroText.style.transform = `translate(-50%, calc(-50% + ${y * 0.2}px))`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ============================================================
  // 11. NAV ACTIVE LINK — highlight on scroll
  // ============================================================
  function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('nav-link--active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
  }

  // Add nav-link--active style
  (function addNavActiveStyle() {
    const style = document.createElement('style');
    style.textContent = `.nav-link--active { color: var(--blue) !important; font-weight: 600; }
    .nav-link--active::after { width: 100% !important; background: var(--blue) !important; }`;
    document.head.appendChild(style);
  })();

  // ============================================================
  // 12. MARQUEE — pause on hover already in CSS
  // ============================================================

  // ============================================================
  // 13. SMOOTH SCROLL with easing override
  // ============================================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // ============================================================
  // 14. SECTION TAG dots — already in CSS, needs class
  // ============================================================
  function initSectionTags() {
    document.querySelectorAll('.section-tag').forEach(tag => {
      // Remove leading emoji/icon if any, CSS will add the animated dot
      const text = tag.textContent.trim();
      tag.textContent = text;
    });
  }

  // ============================================================
  // 15. CURSOR SPOTLIGHT
  // ============================================================
  function initCursorSpotlight() {
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    document.body.appendChild(glow);

    let cx = 0, cy = 0;
    let raf = false;

    document.addEventListener('mousemove', (e) => {
      cx = e.clientX;
      cy = e.clientY;
      if (!raf) {
        raf = true;
        requestAnimationFrame(() => {
          glow.style.left = cx + 'px';
          glow.style.top  = cy + 'px';
          raf = false;
        });
      }
    });
  }

  // ============================================================
  // 16. BACKGROUND FLOATING ICONS (Engineering & Medico theme)
  // ============================================================
  function initFloatingBackground() {
    const container = document.createElement('div');
    container.className = 'bg-floating-icons';
    document.body.appendChild(container);

    const iconTemplates = [
      // Graduation Cap
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>`,
      // Gear
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
      // Stethoscope
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2.5 3.19-2.5 5.5"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-9h-3V8c0-.55-.45-1-1-1s-1 .45-1 1v3H8c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1z"/></svg>`,
      // DNA Helix
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 10.5C3.67 10.5 3 11.17 3 12s.67 1.5 1.5 1.5c1.1 0 2-.9 2-2s-.9-2-2-2zm0 5c-1.1 0-2 .9-2 2s.9 2 2 2c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5zM21 12c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3zm-6-4.5c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-6 9c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>`,
      // Atom
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(45 12 12)"/><ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(-45 12 12)"/><circle cx="12" cy="12" r="1.5"/></svg>`,
      // Heartbeat pulse
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
      // Code Brackets
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 18l6-6-6-6M8 6L2 12l6 6"/></svg>`,
      // Microscope
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8M3 22h14M12 6a4 4 0 0 0-4 4v4m8-8a8 8 0 0 0-8 8M9 3h3"/></svg>`
    ];

    const numIcons = 16;
    for (let i = 0; i < numIcons; i++) {
      const el = document.createElement('div');
      el.className = 'floating-icon';
      el.innerHTML = iconTemplates[i % iconTemplates.length];
      
      const size = Math.random() * 40 + 35; // Size between 35px and 75px
      const posX = Math.random() * 90 + 5;  // X position
      const posY = Math.random() * 90 + 5;  // Y position
      const floatX = (Math.random() * 60 + 30) * (Math.random() > 0.5 ? 1 : -1);
      const floatY = (Math.random() * 60 + 30) * (Math.random() > 0.5 ? 1 : -1);
      const dur = Math.random() * 15 + 15;  // Duration between 15s and 30s
      const delay = Math.random() * -30;    // Delay up to -30s

      el.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${posX}%;
        top: ${posY}%;
        --float-x: ${floatX}px;
        --float-y: ${floatY}px;
        --float-dur: ${dur}s;
        --float-delay: ${delay}s;
      `;
      container.appendChild(el);
    }
  }

  // ============================================================
  // INIT — run after DOM ready, some after loader hides
  // ============================================================
  document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initSplitText();
    initSectionTags();
    initSmoothScroll();
    initCursorSpotlight();
    initFloatingBackground();

    window.addEventListener('load', () => {
      setTimeout(() => {
        initScrollReveal();
        initStagger();
        initCounters();
        initMagnetic();
        initCardTilt();
        initParticles();
        initHeroParallax();
        initNavHighlight();
        initHeroTitle();
      }, 400); // small buffer after loader hides
    });
  });

})();
