// ===================================================================
// EDUORBIT — MARKETING ENGINE (Optimized & Accessible)
// ===================================================================

(function () {
  'use strict';

  const PHONE   = '+919546201805';
  const WA_BASE = `https://wa.me/${PHONE.replace('+','')}`;

  function el(id) { return document.getElementById(id); }

  // ─── Throttle scroll events (prevent lag) ─────────────────────────
  function throttle(fn, wait) {
    let last = 0;
    return function(...args) {
      const now = Date.now();
      if (now - last >= wait) { last = now; fn.apply(this, args); }
    };
  }

  // ─── 1. ANNOUNCEMENT BAR ─────────────────────────────────────────
  function initAnnouncementBar() {
    if (sessionStorage.getItem('ann_closed')) return;
    const messages = [
      '🔥 2026 Admissions OPEN — Limited Seats! <a href="#contact">Apply Free →</a>',
      '💰 Bihar DRCC Loan ₹4 Lakh — Free Guidance! <a href="#loans">Learn More →</a>',
      '🎓 Direct B.Tech — No Donation! <a href="#eligibility">Check Eligibility →</a>',
      '📞 Free Counselling — Call Now! <a href="tel:+919546201805">+91 9546201805 →</a>',
    ];
    let idx = 0;
    const bar = document.createElement('div');
    bar.id = 'announcementBar';
    bar.innerHTML = `<div id="annMsg">${messages[0]}</div><button id="annClose" aria-label="Close announcement bar">✕</button>`;
    document.body.prepend(bar);

    setInterval(() => {
      idx = (idx + 1) % messages.length;
      const m = el('annMsg');
      if (m) { m.style.opacity = '0'; setTimeout(() => { m.innerHTML = messages[idx]; m.style.opacity = '1'; }, 250); }
    }, 5000);

    el('annClose').onclick = () => { bar.style.display = 'none'; sessionStorage.setItem('ann_closed', '1'); };
  }

  // ─── 2. SCROLL CTA BAR (Throttled) ───────────────────────────────
  function initScrollCTA() {
    const bar = document.createElement('div');
    bar.id = 'scrollCTA';
    bar.innerHTML = `
      <div id="scrollCTALeft">
        <strong>📞 Free Counselling Available Now!</strong>
        <span>Expert will call you within 2 hours</span>
      </div>
      <div id="scrollCTABtns">
        <a href="tel:+919546201805" id="scrollCall">📞 Call</a>
        <a href="${WA_BASE}?text=${encodeURIComponent('Hi EduOrbit! I want free admission counselling.')}" target="_blank" id="scrollWA">💬 WhatsApp</a>
      </div>
      <button id="scrollCTAClose" aria-label="Close counselling bar">✕</button>
    `;
    document.body.appendChild(bar);
    el('scrollCTAClose').onclick = () => bar.style.display = 'none';

    let shown = false;
    const checkScroll = throttle(() => {
      if (!shown && window.scrollY > 400) { bar.classList.add('visible'); shown = true; }
    }, 200);
    window.addEventListener('scroll', checkScroll, { passive: true });
  }

  // ─── 3. EXIT INTENT POPUP ─────────────────────────────────────────
  function initExitIntent() {
    if (sessionStorage.getItem('exit_shown')) return;
    let overlay = null;

    function buildExit() {
      if (overlay) return;
      overlay = document.createElement('div');
      overlay.id = 'exitOverlay';
      overlay.innerHTML = `
        <div id="exitBox">
          <button id="exitClose" aria-label="Close exit offer">✕</button>
          <div id="exitIcon">🎓</div>
          <h2>Wait! Don't leave yet!</h2>
          <p>Get a <strong>FREE personalized college list</strong> on WhatsApp — based on your marks & budget!</p>
          <div id="exitForm">
            <input type="tel" id="exitPhone" placeholder="WhatsApp Number" maxlength="10" aria-label="WhatsApp Number">
            <button id="exitSubmit">Get FREE List on WhatsApp →</button>
          </div>
          <a id="exitSkip" href="#">No thanks</a>
        </div>
      `;
      document.body.appendChild(overlay);
      const hide = () => overlay.classList.remove('active');
      el('exitClose').onclick = hide;
      el('exitSkip').onclick = (e) => { e.preventDefault(); hide(); };
      overlay.onclick = (e) => { if (e.target === overlay) hide(); };
      el('exitSubmit').onclick = () => {
        const phone = el('exitPhone').value.trim();
        if (phone.length !== 10) return;
        if (typeof gtag_report_conversion === 'function') {
          gtag_report_conversion();
        }
        window.open(`${WA_BASE}?text=${encodeURIComponent(`Hi EduOrbit! I need FREE college list. My number: ${phone}`)}`, '_blank');
        hide();
      };
    }

    document.addEventListener('mouseleave', (e) => {
      if (e.clientY < 20 && !sessionStorage.getItem('exit_shown')) {
        buildExit();
        if (overlay) { overlay.classList.add('active'); sessionStorage.setItem('exit_shown', '1'); }
      }
    });
  }

  // ─── 4. DEEP SCROLL LEAD FORM (Throttled) ────────────────────────
  function initDeepScrollLead() {
    if (sessionStorage.getItem('dsp_shown')) return;
    let triggered = false;

    const check = throttle(() => {
      if (triggered) return;
      const ratio = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (ratio > 0.75) {
        triggered = true;
        sessionStorage.setItem('dsp_shown', '1');
        buildDeepPopup();
      }
    }, 300);
    window.addEventListener('scroll', check, { passive: true });
  }

  function buildDeepPopup() {
    const p = document.createElement('div');
    p.id = 'deepScrollPopup';
    p.innerHTML = `
      <div id="dspBox">
        <button id="dspClose" aria-label="Close shortlist popup">✕</button>
        <span id="dspBadge">🎯 You're Almost There!</span>
        <h3>Get FREE College Shortlist on WhatsApp</h3>
        <p>Our expert will WhatsApp you the top 5 matching colleges within 2 hours — 100% Free.</p>
        <div id="dspForm">
          <input id="dspName" type="text" placeholder="Your Name *" aria-label="Your Name">
          <input id="dspPhone" type="tel" placeholder="WhatsApp Number *" maxlength="10" aria-label="WhatsApp Number">
          <select id="dspCourse" aria-label="Select Course">
            <option value="">Select Course</option>
            <option>B.Tech / Engineering</option>
            <option>MBA / Management</option>
            <option>BBA / BCA</option>
            <option>BSc Nursing</option>
            <option>B.Pharm</option>
            <option>Diploma</option>
            <option>Other</option>
          </select>
          <button id="dspSubmit">📲 Send Me FREE College List</button>
        </div>
        <p id="dspNote">✅ Free. No spam. Expert replies in 2 hours.</p>
      </div>
    `;
    document.body.appendChild(p);
    setTimeout(() => p.classList.add('active'), 50);
    const hide = () => p.classList.remove('active');
    el('dspClose').onclick = hide;
    p.onclick = (e) => { if (e.target === p) hide(); };
    el('dspSubmit').onclick = () => {
      const name = el('dspName').value.trim(), phone = el('dspPhone').value.trim(), course = el('dspCourse').value;
      if (!name || phone.length < 10) { el('dspPhone').style.border = '2px solid red'; return; }
      try {
        const leads = JSON.parse(localStorage.getItem('eo_leads') || '[]');
        leads.push({ name, phone, course, message: 'Deep Scroll', date: new Date().toISOString() });
        localStorage.setItem('eo_leads', JSON.stringify(leads));
      } catch(e) {}
      if (typeof gtag_report_conversion === 'function') {
        gtag_report_conversion();
      }
      window.open(`${WA_BASE}?text=${encodeURIComponent(`Hi EduOrbit! I'm ${name}, want FREE college shortlist. Course: ${course || 'undecided'}`)}`, '_blank');
      hide();
    };
  }

  // ─── 5. UTM TRACKING (lightweight) ───────────────────────────────
  function initUTMTracking() {
    try {
      const p = new URLSearchParams(window.location.search);
      const src = p.get('utm_source') || document.referrer || 'direct';
      const data = JSON.parse(localStorage.getItem('eo_traffic') || '[]');
      data.push({ source: src, time: new Date().toISOString() });
      if (data.length > 50) data.shift();
      localStorage.setItem('eo_traffic', JSON.stringify(data));
    } catch(e) {}
  }

  // ─── 6. SMART WHATSAPP (Passive IntersectionObserver) ────────────
  function initSmartWhatsApp() {
    const waBtn = document.querySelector('.wa-float');
    if (!waBtn) return;
    const msgs = {
      loans: 'Hi EduOrbit! I want to know about DRCC / Guruji education loan.',
      fees: 'Hi EduOrbit! I want to know the fee structure for top colleges.',
      eligibility: 'Hi EduOrbit! I want to check my eligibility for college admission.',
      contact: 'Hi EduOrbit! I want FREE counselling for college admission 2026.',
    };
    Object.keys(msgs).forEach(id => {
      const sec = document.getElementById(id);
      if (!sec) return;
      new IntersectionObserver(([e]) => {
        if (e.isIntersecting) waBtn.href = `${WA_BASE}?text=${encodeURIComponent(msgs[id])}`;
      }, { threshold: 0.4 }).observe(sec);
    });
  }

  // ─── INIT (deferred so page loads fast first) ────────────────────
  window.addEventListener('load', () => {
    initUTMTracking();
    initAnnouncementBar();
    // Delay non-critical features
    setTimeout(() => {
      initScrollCTA();
      initSmartWhatsApp();
    }, 1000);
    setTimeout(() => {
      initExitIntent();
      initDeepScrollLead();
    }, 3000);
  });

})();
