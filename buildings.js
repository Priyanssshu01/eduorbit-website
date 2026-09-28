/* ===================================================================
   EDUORBIT — ANIMATED BUILDINGS & FLOATING QUERY
   buildings.js  |  v1.0
   =================================================================== */
(function () {
  'use strict';

  const COLLEGES_DATA = window.COLLEGES || [];
  const COURSES_DATA  = window.COURSES  || [];

  /* ------------------------------------------------------------------
     BUILDING HEIGHT & WINDOW CONFIGURATION PER COLLEGE
     ------------------------------------------------------------------ */
  const BUILDING_CONFIG = {
    // [height_px, window_cols, window_rows, primary_color, window_color, naac_bg]
    jisce:    [240, 3, 6, '#1B4D8E', '#FEF08A', '#16A34A'],
    nit:      [210, 3, 5, '#2563EB', '#BAE6FD', '#16A34A'],
    gnit:     [255, 3, 7, '#059669', '#D1FAE5', '#15803D'],
    surtech:  [200, 3, 5, '#7C3AED', '#EDE9FE', '#16A34A'],
    aec:      [185, 3, 5, '#D97706', '#FEF3C7', '#16A34A'],
    bwu:      [175, 3, 4, '#DB2777', '#FCE7F3', '#6B7280'],
    adamas:   [245, 3, 6, '#0891B2', '#E0F2FE', '#16A34A'],
    ies:      [165, 2, 4, '#1B4D8E', '#DBEAFE', '#6B7280'],
    svu:      [155, 2, 4, '#D97706', '#FEF9C3', '#6B7280'],
    nshm_dgp: [180, 3, 4, '#059669', '#D1FAE5', '#15803D'],
    iem:      [265, 3, 7, '#7C3AED', '#EDE9FE', '#15803D'],
    hit:      [220, 3, 5, '#DC2626', '#FEE2E2', '#16A34A'],
    tiu:      [215, 3, 5, '#0891B2', '#E0F2FE', '#6B7280'],
    haldia:   [190, 3, 5, '#D97706', '#FEF3C7', '#16A34A'],
    nsec:     [195, 3, 5, '#1B4D8E', '#DBEAFE', '#16A34A'],
    msit:     [185, 3, 5, '#059669', '#D1FAE5', '#16A34A'],
  };

  /* ------------------------------------------------------------------
     GENERATE BUILDING HTML
     ------------------------------------------------------------------ */
  function generateBuilding(college) {
    const cfg = BUILDING_CONFIG[college.id] || [190, 3, 5, '#1B4D8E', '#BAE6FD', '#16A34A'];
    const [height, cols, rows, color, winColor, naacBg] = cfg;
    const windowCount = cols * rows;

    const windows = Array.from({ length: windowCount }, (_, i) => {
      const dur  = (3 + Math.random() * 4).toFixed(1) + 's';
      const del  = (Math.random() * 5).toFixed(1) + 's';
      const lit  = Math.random() > 0.25; // 75% windows lit
      return `<div class="building-win" style="
        background:${lit ? winColor : 'rgba(255,255,255,0.06)'};
        --flicker-dur:${dur};
        --flicker-delay:${del};
        ${lit ? `box-shadow:0 0 4px ${winColor}80;` : ''}
      "></div>`;
    }).join('');

    const naacLabel = college.naac !== 'UGC' && college.naac !== 'WBCER'
      ? `NAAC ${college.naac}`
      : college.naac;

    return `
    <div class="building-card" data-college-id="${college.id}" title="${college.name}" role="button" tabindex="0" aria-label="View ${college.name} details">
      <div class="building-svg-wrap">
        <div class="building-antenna"></div>
        <div class="building-rooftop" style="background:${color};opacity:0.8;"></div>
        <div class="building-body" style="height:${height}px;background:linear-gradient(180deg,${color}dd 0%,${color}99 100%);">
          <div class="building-windows" style="grid-template-columns:repeat(${cols},1fr);grid-template-rows:repeat(${rows},1fr);">
            ${windows}
          </div>
          <div class="building-name-banner">
            <span class="building-abbr">${college.abbr}</span>
            <span class="building-naac-badge" style="background:${naacBg};color:#fff;">${naacLabel}</span>
          </div>
        </div>
      </div>
      <div class="building-label">
        <span class="building-label-name">${college.name.length > 22 ? college.name.substring(0,22)+'…' : college.name}</span>
        <span class="building-label-loc">${(college.location||'').split(',')[0]}</span>
      </div>
    </div>`;
  }

  /* ------------------------------------------------------------------
     RENDER CITYSCAPE
     ------------------------------------------------------------------ */
  function renderCityscape() {
    const wrap = document.getElementById('buildingsCityscape');
    if (!wrap || !COLLEGES_DATA.length) return;

    wrap.innerHTML = COLLEGES_DATA.map(c => generateBuilding(c)).join('');

    // Wire click events
    wrap.querySelectorAll('.building-card').forEach(card => {
      const id = card.dataset.collegeId;
      const clickFn = () => openBuildingModal(id);
      card.addEventListener('click', clickFn);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') clickFn(); });
    });
  }

  /* ------------------------------------------------------------------
     COLLEGE DETAIL POPUP MODAL
     ------------------------------------------------------------------ */
  function openBuildingModal(collegeId) {
    const college = COLLEGES_DATA.find(c => c.id === collegeId);
    if (!college) return;

    const courses = COURSES_DATA.filter(c => c.colleges.includes(college.abbr) || c.colleges.includes(collegeId));
    const cfg     = BUILDING_CONFIG[collegeId] || [190, 3, 5, '#1B4D8E', '#BAE6FD', '#16A34A'];
    const color   = cfg[3];

    const hostelInfo = courses.some(c => c.hostelBoys && c.hostelBoys !== 'N/A')
      ? '✅ Available'
      : '❌ Not Available / On Request';

    const courseRows = courses.length
      ? courses.slice(0, 8).map(c => `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;border-radius:8px;background:rgba(255,255,255,0.04);margin-bottom:6px;">
            <div>
              <div style="font-size:0.82rem;font-weight:600;color:#F1F5F9;">${c.name}</div>
              <div style="font-size:0.68rem;color:#94A3B8;">${c.type} · ${c.duration} years</div>
            </div>
            <div style="text-align:right;flex-shrink:0;margin-left:10px;">
              <div style="font-size:0.78rem;font-weight:700;color:#38BDF8;">₹${(c.totalFee/100000).toFixed(1)}L</div>
              <div style="font-size:0.6rem;color:#64748B;">total</div>
            </div>
          </div>`).join('')
      : `<p style="color:#64748B;font-size:0.82rem;">Course fee details available on enquiry.</p>`;

    const companiesHTML = (college.placement?.companies || [])
      .map(c => `<span style="background:rgba(56,189,248,0.12);color:#38BDF8;padding:3px 10px;border-radius:20px;font-size:0.68rem;font-weight:600;border:1px solid rgba(56,189,248,0.2);">${c}</span>`)
      .join('');

    const highlightsHTML = (college.highlights || [])
      .map(h => `<span style="display:flex;align-items:center;gap:6px;font-size:0.78rem;color:#CBD5E1;padding:4px 0;"><span style="color:#4ADE80;font-size:0.7rem;">✓</span>${h}</span>`)
      .join('');

    const modal = document.getElementById('buildingModalOverlay');
    document.getElementById('bm-color-bar').style.background = `linear-gradient(135deg, #0F172A, ${color})`;
    document.getElementById('bm-icon').textContent = college.img || '🏛️';
    document.getElementById('bm-abbr').textContent = college.abbr;
    document.getElementById('bm-name').textContent = college.name;
    document.getElementById('bm-location').textContent = college.location || '';
    document.getElementById('bm-affil').textContent   = college.affiliation || 'MAKAUT';
    document.getElementById('bm-bio').textContent     = college.bio || '';
    document.getElementById('bm-highlights').innerHTML = highlightsHTML;
    document.getElementById('bm-courses').innerHTML   = courseRows;
    document.getElementById('bm-hostel').textContent  = hostelInfo;
    document.getElementById('bm-avg-pkg').textContent = college.placement?.avg    || 'N/A';
    document.getElementById('bm-high-pkg').textContent= college.placement?.highest|| 'N/A';
    document.getElementById('bm-companies').innerHTML = companiesHTML;

    const instaLink = document.getElementById('bm-insta-link');
    instaLink.href        = college.instaUrl || '#';
    instaLink.textContent = college.insta    || 'Instagram';
    if (!college.instaUrl) instaLink.removeAttribute('href');

    const webLink = document.getElementById('bm-web-link');
    webLink.href = college.website || '#';

    // WhatsApp enquiry pre-fill
    document.getElementById('bm-enquiry-btn').onclick = () => {
      const msg = encodeURIComponent(`Hi EduOrbit! I want details about ${college.name}.\nCourse interest: \nContact: `);
      window.open(`https://wa.me/919546201805?text=${msg}`, '_blank');
    };

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeBuildingModal() {
    const modal = document.getElementById('buildingModalOverlay');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  /* ------------------------------------------------------------------
     QUERY POPUP (Lightbulb)
     ------------------------------------------------------------------ */
  function openQueryPopup() {
    document.getElementById('queryPopupOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeQueryPopup() {
    document.getElementById('queryPopupOverlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  function handleQuerySubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name    = form.querySelector('#qpName').value.trim();
    const phone   = form.querySelector('#qpPhone').value.trim();
    const college = form.querySelector('#qpCollege').value;
    const msg     = form.querySelector('#qpMsg').value.trim();

    if (!name || !phone) return;

    // Send to FormSubmit
    fetch('https://formsubmit.co/ajax/eduorbit.admissions@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `Quick Query — ${name} — ${college || 'General'}`,
        Name: name, Phone: phone,
        College_Interest: college,
        Message: msg || 'Quick enquiry from website'
      })
    }).catch(() => {});

    // Save to Supabase if available
    if (window.supabaseClient) {
      window.supabaseClient.from('leads').insert([{
        name, phone,
        course: college || 'General Enquiry',
        message: msg || 'Quick query from bulb button',
        date: new Date().toISOString()
      }]).then(() => {}).catch(() => {});
    }

    // Show success
    form.style.display = 'none';
    document.getElementById('qpSuccessMsg').classList.add('show');
    setTimeout(() => {
      closeQueryPopup();
      form.style.display = '';
      document.getElementById('qpSuccessMsg').classList.remove('show');
      form.reset();
    }, 2500);
  }

  /* ------------------------------------------------------------------
     INIT
     ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    renderCityscape();

    // Modal close buttons
    const bmClose = document.getElementById('bmClose');
    const bmOverlay = document.getElementById('buildingModalOverlay');
    if (bmClose)   bmClose.addEventListener('click', closeBuildingModal);
    if (bmOverlay) bmOverlay.addEventListener('click', e => { if (e.target === bmOverlay) closeBuildingModal(); });

    // Bulb button
    const bulbBtn = document.getElementById('queryBulbBtn');
    if (bulbBtn) bulbBtn.addEventListener('click', openQueryPopup);

    // Query popup close
    const qpClose = document.getElementById('qpClose');
    const qpOverlay = document.getElementById('queryPopupOverlay');
    if (qpClose)   qpClose.addEventListener('click', closeQueryPopup);
    if (qpOverlay) qpOverlay.addEventListener('click', e => { if (e.target === qpOverlay) closeQueryPopup(); });

    // Query form submit
    const qpForm = document.getElementById('queryPopupForm');
    if (qpForm) qpForm.addEventListener('submit', handleQuerySubmit);

    // Keyboard escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { closeBuildingModal(); closeQueryPopup(); }
    });
  });

})();
