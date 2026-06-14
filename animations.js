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
  // INIT — run after DOM ready, some after loader hides
  // ============================================================
  document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initSplitText();
    initSectionTags();
    initSmoothScroll();
    initCursorSpotlight();

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
