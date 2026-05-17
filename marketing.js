// ===================================================================
// EDUORBIT — ADVANCED MARKETING ENGINE
// Strategies: Exit Intent, Scarcity, Announcement Bar, 
//             Scroll CTA, Return Visitor, Smart WhatsApp, Push Notif
// ===================================================================

(function () {
  'use strict';

  // ─── CONFIG ───────────────────────────────────────────────────────
  const PHONE   = '+919546201805';
  const WA_BASE = `https://wa.me/${PHONE.replace('+','')}`;
  const SITE    = 'eduorbitaddmision.online';

  // ─── HELPERS ──────────────────────────────────────────────────────
  function el(id) { return document.getElementById(id); }
  function qs(sel) { return document.querySelector(sel); }
  function isMobile() { return window.innerWidth <= 768; }

  // ─── 1. ANNOUNCEMENT TOP BAR ─────────────────────────────────────
  // Rotating urgency messages at top of page
  function initAnnouncementBar() {
    const messages = [
      '🔥 2026 Admission Season OPEN — Limited Seats! <a href="#contact">Apply Free →</a>',
      '💰 Bihar DRCC Loan upto ₹4 Lakh — 100% Free Guidance! <a href="#loans">Learn More →</a>',
      '🎓 Direct B.Tech Admission — No Donation, No Hassle! <a href="#eligibility">Check Eligibility →</a>',
      '⚡ Jharkhand Guruji Loan upto ₹15 Lakh — Apply Now! <a href="#loans">Know More →</a>',
      '📞 Free Counselling Call — Today Only! <a href="tel:+919546201805">Call Now →</a>',
    ];
    let idx = 0;
    const bar = document.createElement('div');
    bar.id = 'announcementBar';
    bar.innerHTML = `
      <div id="annMsg">${messages[0]}</div>
      <button id="annClose" aria-label="Close">✕</button>
    `;
    document.body.prepend(bar);

    // Auto-rotate
    setInterval(() => {
      idx = (idx + 1) % messages.length;
      const msgEl = el('annMsg');
      msgEl.style.opacity = '0';
      setTimeout(() => {
        msgEl.innerHTML = messages[idx];
        msgEl.style.opacity = '1';
      }, 300);
    }, 4000);

    el('annClose').addEventListener('click', () => {
      bar.style.display = 'none';
      sessionStorage.setItem('ann_closed', '1');
    });

    if (sessionStorage.getItem('ann_closed')) bar.style.display = 'none';
  }

  // ─── 2. SCARCITY SEAT COUNTER ─────────────────────────────────────
  // Shows "Only X seats left" — refreshes on scroll near fees/colleges
  function initSeatScarcity() {
    const seats = {
      'B.Tech AI & ML': 4,
      'B.Tech CSE': 6,
      'BBA': 8,
      'BSc Nursing': 3,
      'B.Pharm': 5,
      'MBA': 7,
    };

    const badge = document.createElement('div');
    badge.id = 'seatBadge';
    badge.style.display = 'none';
    document.body.appendChild(badge);

    const courses = Object.keys(seats);
    let courseIdx = 0;

    function rotateSeat() {
      const course = courses[courseIdx % courses.length];
      badge.innerHTML = `🔴 Only <strong>${seats[course]}</strong> seats left — ${course}!`;
      badge.classList.add('show');
      setTimeout(() => badge.classList.remove('show'), 3000);
      courseIdx++;
    }

    // Trigger when user scrolls to fees or colleges section
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          badge.style.display = 'block';
          rotateSeat();
          setInterval(rotateSeat, 6000);
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    const feesSection = document.getElementById('fees');
    if (feesSection) observer.observe(feesSection);
  }

  // ─── 3. EXIT INTENT POPUP ─────────────────────────────────────────
  // Desktop: mouse leaves viewport top. Mobile: back button detected.
  function initExitIntent() {
    if (sessionStorage.getItem('exit_shown')) return;

    const overlay = document.createElement('div');
    overlay.id = 'exitOverlay';
    overlay.innerHTML = `
      <div id="exitBox">
        <button id="exitClose">✕</button>
        <div id="exitIcon">🎓</div>
        <h2>Wait! Don't leave empty-handed!</h2>
        <p>Get a <strong>FREE personalized college list</strong> based on your marks & budget — sent directly on WhatsApp!</p>
        <div id="exitForm">
          <input type="tel" id="exitPhone" placeholder="Enter WhatsApp Number" maxlength="10" pattern="[0-9]{10}">
          <button id="exitSubmit">Get FREE College List on WhatsApp →</button>
        </div>
        <p id="exitNote">✅ 100% Free. No spam. Response in 2 hours.</p>
        <a id="exitSkip" href="#">No thanks, I'll figure it out myself</a>
      </div>
    `;
    document.body.appendChild(overlay);

    function showExit() {
      if (sessionStorage.getItem('exit_shown')) return;
      overlay.classList.add('active');
      sessionStorage.setItem('exit_shown', '1');
      gtag && gtag('event', 'exit_intent_shown');
    }

    function hideExit() { overlay.classList.remove('active'); }

    // Desktop: mouse near top
    document.addEventListener('mouseleave', e => {
      if (e.clientY < 20) showExit();
    });

    // Mobile: show after 60s of inactivity
    if (isMobile()) {
      let timer = setTimeout(showExit, 60000);
      document.addEventListener('touchstart', () => {
        clearTimeout(timer);
        timer = setTimeout(showExit, 60000);
      });
    }

    el('exitClose').addEventListener('click', hideExit);
    el('exitSkip').addEventListener('click', e => { e.preventDefault(); hideExit(); });
    overlay.addEventListener('click', e => { if (e.target === overlay) hideExit(); });

    el('exitSubmit').addEventListener('click', () => {
      const phone = el('exitPhone').value.trim();
      if (phone.length !== 10) {
        el('exitPhone').style.border = '2px solid #ef4444';
        return;
      }
      const msg = encodeURIComponent(`Hi EduOrbit! Maine abhi aapki website visit ki. Mujhe meri marks ke hisab se FREE college list chahiye. Mera number: ${phone}`);
      window.open(`${WA_BASE}?text=${msg}`, '_blank');
      hideExit();
      gtag && gtag('event', 'exit_intent_converted', { phone });
    });
  }

  // ─── 4. SCROLL-TRIGGERED STICKY CTA BAR ───────────────────────────
  // Appears after user scrolls 40% of page
  function initScrollCTA() {
    const bar = document.createElement('div');
    bar.id = 'scrollCTA';
    bar.innerHTML = `
      <div id="scrollCTALeft">
        <span id="scrollCTATimer">⏰ <strong id="scrollCountdown">09:47</strong> offer expires</span>
        <span>Free Counselling Available Now!</span>
      </div>
      <div id="scrollCTABtns">
        <a href="tel:+919546201805" id="scrollCall">📞 Call Now</a>
        <a href="${WA_BASE}?text=${encodeURIComponent('Hi EduOrbit! I want free admission counselling.')}" target="_blank" id="scrollWA">💬 WhatsApp</a>
      </div>
      <button id="scrollCTAClose">✕</button>
    `;
    document.body.appendChild(bar);

    // Countdown timer
    let seconds = 587; // ~9:47
    const countdown = el('scrollCountdown');
    setInterval(() => {
      if (seconds <= 0) seconds = 599;
      seconds--;
      const m = Math.floor(seconds / 60).toString().padStart(2, '0');
      const s = (seconds % 60).toString().padStart(2, '0');
      if (countdown) countdown.textContent = `${m}:${s}`;
    }, 1000);

    el('scrollCTAClose').addEventListener('click', () => {
      bar.style.display = 'none';
    });

    let shown = false;
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled > 0.4 && !shown) {
        bar.classList.add('visible');
        shown = true;
      }
    });
  }

  // ─── 5. RETURNING VISITOR DETECTION ───────────────────────────────
  // Show different message to people who've visited before
  function initReturnVisitor() {
    const visits = parseInt(localStorage.getItem('eo_visits') || '0') + 1;
    localStorage.setItem('eo_visits', visits);
    localStorage.setItem('eo_lastVisit', new Date().toISOString());

    if (visits >= 2) {
      // Returning visitor — show a personalized toast
      setTimeout(() => {
        showReturnToast();
      }, 3000);
    }
  }

  function showReturnToast() {
    const toast = document.createElement('div');
    toast.id = 'returnToast';
    toast.innerHTML = `
      <div id="rtIcon">👋</div>
      <div id="rtText">
        <strong>Welcome back!</strong>
        <span>Still looking for the right college? Let us help — it's FREE!</span>
      </div>
      <a href="${WA_BASE}?text=${encodeURIComponent('Hi! I visited EduOrbit again. Need help finding the right college.')}" target="_blank" id="rtBtn">Chat Now →</a>
      <button id="rtClose">✕</button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    el('rtClose').addEventListener('click', () => toast.classList.remove('show'));
    setTimeout(() => toast.classList.remove('show'), 12000);
  }

  // ─── 6. SMART WHATSAPP (Context-Aware) ────────────────────────────
  // WhatsApp message changes based on what section user is viewing
  function initSmartWhatsApp() {
    const waBtn = document.querySelector('.wa-float');
    if (!waBtn) return;

    const sectionMsgs = {
      loans: 'Hi EduOrbit! I want to know about Bihar DRCC / Jharkhand Guruji education loan. Please guide me.',
      fees: 'Hi EduOrbit! I want to know the complete fee structure for admission in top colleges.',
      eligibility: 'Hi EduOrbit! I want to check my eligibility for college admissions based on my marks.',
      colleges: 'Hi EduOrbit! I want to know which colleges are best for me and how to get admission.',
      contact: 'Hi EduOrbit! I want FREE counselling for college admission 2026.',
    };

    const defaultMsg = 'Hi EduOrbit! I want to know more about direct admissions.';
    let currentMsg = defaultMsg;

    const sections = Object.keys(sectionMsgs);
    const observers = sections.map(id => {
      const sec = document.getElementById(id);
      if (!sec) return null;
      return new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            currentMsg = sectionMsgs[id];
            waBtn.href = `${WA_BASE}?text=${encodeURIComponent(currentMsg)}`;
          }
        });
      }, { threshold: 0.4 });
    });

    observers.forEach((obs, i) => {
      if (obs) obs.observe(document.getElementById(sections[i]));
    });
  }

  // ─── 7. PUSH NOTIFICATION PERMISSION ─────────────────────────────
  function initPushNotification() {
    if (!('Notification' in window)) return;
    if (Notification.permission !== 'default') return;
    if (sessionStorage.getItem('push_asked')) return;

    setTimeout(() => {
      const nudge = document.createElement('div');
      nudge.id = 'pushNudge';
      nudge.innerHTML = `
        <div id="pushIcon">🔔</div>
        <div id="pushText">
          <strong>Get Admission Alerts!</strong>
          <span>Be first to know about seat availability & loan updates.</span>
        </div>
        <div id="pushBtns">
          <button id="pushAllow">Allow</button>
          <button id="pushDeny">No Thanks</button>
        </div>
      `;
      document.body.appendChild(nudge);
      setTimeout(() => nudge.classList.add('show'), 100);
      sessionStorage.setItem('push_asked', '1');

      el('pushAllow').addEventListener('click', () => {
        Notification.requestPermission().then(perm => {
          if (perm === 'granted') {
            new Notification('EduOrbit', {
              body: '🎓 Thanks! We\'ll notify you about admission updates.',
              icon: 'https://cdn-icons-png.flaticon.com/512/3358/3358913.png'
            });
            gtag && gtag('event', 'push_notification_allowed');
          }
        });
        nudge.remove();
      });
      el('pushDeny').addEventListener('click', () => nudge.remove());
    }, 25000);
  }

  // ─── 8. LEAD CAPTURE AFTER SCROLL 75% ────────────────────────────
  function initDeepScrollLead() {
    if (sessionStorage.getItem('deep_scroll_shown')) return;
    let triggered = false;

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled > 0.75 && !triggered) {
        triggered = true;
        sessionStorage.setItem('deep_scroll_shown', '1');
        showDeepScrollPopup();
      }
    });
  }

  function showDeepScrollPopup() {
    const popup = document.createElement('div');
    popup.id = 'deepScrollPopup';
    popup.innerHTML = `
      <div id="dspBox">
        <button id="dspClose">✕</button>
        <span id="dspBadge">🎯 You're Almost There!</span>
        <h3>Get Your FREE Personalized College Shortlist</h3>
        <p>Based on your marks, budget & city — our expert will WhatsApp you the top 5 colleges within 2 hours.</p>
        <div id="dspForm">
          <input id="dspName" type="text" placeholder="Your Name *">
          <input id="dspPhone" type="tel" placeholder="WhatsApp Number *" maxlength="10">
          <select id="dspCourse">
            <option value="">Interested Course</option>
            <option>B.Tech / Engineering</option>
            <option>MBA / Management</option>
            <option>BBA / BCA</option>
            <option>BSc Nursing</option>
            <option>B.Pharm</option>
            <option>Diploma</option>
            <option>Other</option>
          </select>
          <button id="dspSubmit">📲 Send Me FREE College List on WhatsApp</button>
        </div>
        <p id="dspNote">✅ 100% free. No spam. Expert replies in 2 hours.</p>
      </div>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.classList.add('active'), 100);

    el('dspClose').addEventListener('click', () => popup.classList.remove('active'));
    popup.addEventListener('click', e => { if (e.target === popup) popup.classList.remove('active'); });

    el('dspSubmit').addEventListener('click', () => {
      const name   = el('dspName').value.trim();
      const phone  = el('dspPhone').value.trim();
      const course = el('dspCourse').value;
      if (!name || phone.length < 10) {
        el('dspPhone').style.border = '2px solid red';
        return;
      }
      const msg = encodeURIComponent(`Hi EduOrbit! My name is ${name}. I want a FREE personalized college shortlist.\nCourse: ${course || 'Not decided'}\nPhone: ${phone}`);
      window.open(`${WA_BASE}?text=${msg}`, '_blank');

      // Also save as lead
      try {
        const leads = JSON.parse(localStorage.getItem('eo_leads') || '[]');
        leads.push({ name, phone, course, message: 'Deep Scroll Lead', date: new Date().toISOString() });
        localStorage.setItem('eo_leads', JSON.stringify(leads));
      } catch(e) {}

      gtag && gtag('event', 'deep_scroll_lead_captured', { name, course });
      popup.classList.remove('active');
    });
  }

  // ─── 9. TIME-SENSITIVE OFFER BADGE ────────────────────────────────
  // Shows "Early Bird Offer" badge that resets daily
  function initTimeSensitiveOffer() {
    const now = new Date();
    const hour = now.getHours();
    // Only show between 9 AM and 9 PM
    if (hour < 9 || hour >= 21) return;

    const badge = document.createElement('div');
    badge.id = 'timeBadge';
    badge.innerHTML = `
      🌅 <strong>Today's Free Offer:</strong> First 3 callers get priority seat booking!
      <a href="tel:+919546201805">Call: +91 9546201805</a>
      <button id="timeBadgeClose">✕</button>
    `;
    document.body.appendChild(badge);

    el('timeBadgeClose').addEventListener('click', () => badge.remove());
    setTimeout(() => badge.classList.add('show'), 5000);
  }

  // ─── 10. UTM SOURCE TRACKING ──────────────────────────────────────
  // Capture where visitors come from and store for analytics
  function initUTMTracking() {
    const params = new URLSearchParams(window.location.search);
    const utmData = {
      source  : params.get('utm_source')   || 'direct',
      medium  : params.get('utm_medium')   || 'none',
      campaign: params.get('utm_campaign') || 'none',
      ref     : document.referrer || 'direct',
      page    : window.location.href,
      time    : new Date().toISOString(),
    };

    // Store in localStorage for admin panel visibility
    const history = JSON.parse(localStorage.getItem('eo_traffic') || '[]');
    history.push(utmData);
    if (history.length > 100) history.shift();
    localStorage.setItem('eo_traffic', JSON.stringify(history));

    // Fire GA4 event with UTM data
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view_with_source', utmData);
    }
  }

  // ─── INIT ALL ─────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initAnnouncementBar();
    initReturnVisitor();
    initUTMTracking();
    initTimeSensitiveOffer();

    // Slight delay for non-critical modules
    setTimeout(() => {
      initExitIntent();
      initScrollCTA();
      initSeatScarcity();
      initSmartWhatsApp();
      initDeepScrollLead();
      initPushNotification();
    }, 1500);
  });

})();
