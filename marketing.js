// ===================================================================
// EDUORBIT — PASSIVE MARKETING ENGINE (Lightweight & Clean)
// ===================================================================
// Keeps only high-value silent utilities: UTM source attribution
// and smart passive WhatsApp redirection based on visible section.
// Intrusive banners, exit intents, and extra popup forms have been removed.

(function () {
  'use strict';

  const PHONE   = '+919546201805';
  const WA_BASE = `https://wa.me/${PHONE.replace('+','')}`;

  // ─── 1. UTM SOURCE ATTRIBUTION (Silent localStorage tracking) ─────
  function initUTMTracking() {
    try {
      const params = new URLSearchParams(window.location.search);
      const source = params.get('utm_source') || document.referrer || 'direct';
      const trafficLog = JSON.parse(localStorage.getItem('eo_traffic') || '[]');
      
      trafficLog.push({ source: source, time: new Date().toISOString() });
      if (trafficLog.length > 50) trafficLog.shift(); // Cap history to 50
      localStorage.setItem('eo_traffic', JSON.stringify(trafficLog));
    } catch(e) {
      console.warn('[UTM Tracker] Storage error:', e);
    }
  }

  // ─── 2. SMART PASSIVE WHATSAPP ROUTING ────────────────────────────
  // Passively adjusts the floating WhatsApp icon's pre-filled message
  // based on the section the user is currently reading.
  function initSmartWhatsApp() {
    const waBtn = document.querySelector('.wa-float');
    if (!waBtn) return;

    const messages = {
      loans: 'Hi EduOrbit! I want to know about DRCC / Guruji education loan.',
      fees: 'Hi EduOrbit! I want to know the fee structure for top colleges.',
      eligibility: 'Hi EduOrbit! I want to check my eligibility for college admission.',
      contact: 'Hi EduOrbit! I want FREE counselling for college admission 2026.',
    };

    if ('IntersectionObserver' in window) {
      Object.keys(messages).forEach(id => {
        const section = document.getElementById(id);
        if (!section) return;

        new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            waBtn.href = `${WA_BASE}?text=${encodeURIComponent(messages[id])}`;
          }
        }, { threshold: 0.3 }).observe(section);
      });
    }
  }

  // ─── INIT: Load deferred for maximal load speeds ──────────────────
  window.addEventListener('load', () => {
    initUTMTracking();
    setTimeout(initSmartWhatsApp, 1000);
  });

})();
