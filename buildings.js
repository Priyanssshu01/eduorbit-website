/* ===================================================================
   EDUORBIT — ROUND COLLEGE CARDS + DRAGGABLE CAROUSEL
   buildings.js  |  v2.0
   =================================================================== */
(function () {
  'use strict';

  const COLLEGES_DATA = window.COLLEGES || [];
  const COURSES_DATA  = window.COURSES  || [];

  /* ------------------------------------------------------------------
     COLLEGE COLOR MAP
     ------------------------------------------------------------------ */
  const COLLEGE_COLORS = {
    jisce:    'linear-gradient(135deg, #1B4D8E, #2563EB)',
    nit:      'linear-gradient(135deg, #2563EB, #3B82F6)',
    gnit:     'linear-gradient(135deg, #059669, #10B981)',
    surtech:  'linear-gradient(135deg, #7C3AED, #A855F7)',
    aec:      'linear-gradient(135deg, #D97706, #F59E0B)',
    bwu:      'linear-gradient(135deg, #DB2777, #EC4899)',
    adamas:   'linear-gradient(135deg, #0891B2, #06B6D4)',
    ies:      'linear-gradient(135deg, #1B4D8E, #3B82F6)',
    svu:      'linear-gradient(135deg, #B45309, #D97706)',
    nshm_dgp: 'linear-gradient(135deg, #059669, #34D399)',
    iem:      'linear-gradient(135deg, #6D28D9, #7C3AED)',
    hit:      'linear-gradient(135deg, #DC2626, #EF4444)',
    tiu:      'linear-gradient(135deg, #0284C7, #0EA5E9)',
    haldia:   'linear-gradient(135deg, #C2410C, #EA580C)',
    nsec:     'linear-gradient(135deg, #1D4ED8, #2563EB)',
    msit:     'linear-gradient(135deg, #047857, #059669)',
  };

  /* ------------------------------------------------------------------
     GENERATE ROUND CARD HTML
     ------------------------------------------------------------------ */
  function generateRoundCard(college) {
    const gradient = COLLEGE_COLORS[college.id] || 'linear-gradient(135deg, #1B4D8E, #2563EB)';
    const naacBadge = college.naac ? `NAAC ${college.naac}` : 'UGC';
    const shortLoc  = (college.location || '').split(',')[0];
    const emoji     = college.img || '🏛️';

    return `
    <div class="round-college-card" data-college-id="${college.id}" role="button" tabindex="0" aria-label="View ${college.name}">
      <div class="round-card-circle" style="background:${gradient};">
        <span class="round-card-emoji">${emoji}</span>
        <span class="round-card-abbr">${college.abbr}</span>
        <span class="round-card-naac">${naacBadge}</span>
      </div>
      <div class="round-card-label">
        <span class="round-card-name">${college.name.length > 24 ? college.name.substring(0,24)+'…' : college.name}</span>
        <span class="round-card-loc">📍 ${shortLoc}</span>
      </div>
    </div>`;
  }

  /* ------------------------------------------------------------------
     RENDER CAROUSEL
     ------------------------------------------------------------------ */
  function renderCarousel() {
    const track = document.getElementById('collegesCarouselTrack');
    if (!track || !COLLEGES_DATA.length) return;
    track.innerHTML = COLLEGES_DATA.map(c => generateRoundCard(c)).join('');

    // Wire click events
    track.querySelectorAll('.round-college-card').forEach(card => {
      const id = card.dataset.collegeId;
      card.addEventListener('click', () => { if (!isDragging) openCollegeModal(id); });
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCollegeModal(id); }
      });
    });
  }

  /* ------------------------------------------------------------------
     DRAGGABLE CAROUSEL
     ------------------------------------------------------------------ */
  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;
  let dragDistance = 0;

  function initCarouselDrag() {
    const wrap  = document.getElementById('collegesCarouselWrap');
    const track = document.getElementById('collegesCarouselTrack');
    if (!wrap || !track) return;

    // Mouse drag
    wrap.addEventListener('mousedown', e => {
      isDragging = true;
      dragDistance = 0;
      startX = e.clientX;
      scrollStart = wrap.scrollLeft;
      track.style.transition = 'none';
      wrap.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const dx = startX - e.clientX;
      dragDistance = Math.abs(dx);
      wrap.scrollLeft = scrollStart + dx;
    });

    document.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      wrap.style.cursor = 'grab';
      // Small delay before allowing click
      setTimeout(() => { isDragging = false; }, 50);
    });

    // Touch drag
    wrap.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      scrollStart = wrap.scrollLeft;
      dragDistance = 0;
    }, { passive: true });

    wrap.addEventListener('touchmove', e => {
      const dx = startX - e.touches[0].clientX;
      dragDistance = Math.abs(dx);
      wrap.scrollLeft = scrollStart + dx;
    }, { passive: true });

    // Arrow nav
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const scrollAmt = 300;

    if (prevBtn) prevBtn.addEventListener('click', () => {
      wrap.scrollBy({ left: -scrollAmt, behavior: 'smooth' });
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      wrap.scrollBy({ left: scrollAmt, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------
     COLLEGE DETAIL MODAL
     ------------------------------------------------------------------ */
  function openCollegeModal(collegeId) {
    const college = COLLEGES_DATA.find(c => c.id === collegeId);
    if (!college) return;

    const courses  = COURSES_DATA.filter(c =>
      c.colleges.includes(college.abbr) || c.colleges.includes(collegeId)
    );
    const gradient = COLLEGE_COLORS[collegeId] || 'linear-gradient(135deg,#1B4D8E,#2563EB)';
    const hasHostel= courses.some(c => c.hostelBoys && c.hostelBoys !== 'N/A');

    // Banner
    document.getElementById('bm-color-bar').style.background = gradient;
    document.getElementById('bm-icon').textContent = college.img || '🏛️';
    document.getElementById('bm-abbr').textContent = college.abbr;
    document.getElementById('bm-name').textContent = college.name;
    document.getElementById('bm-location').textContent = college.location || '';
    document.getElementById('bm-affil').textContent   = college.affiliation || 'MAKAUT';

    // Bio
    document.getElementById('bm-bio').textContent = college.bio || '';

    // Highlights
    const hlEl = document.getElementById('bm-highlights');
    hlEl.innerHTML = (college.highlights || []).map(h =>
      `<div class="bm-highlight-item">
        <span class="bm-highlight-check">✓</span>
        <span>${h}</span>
      </div>`
    ).join('');

    // Courses
    const courseEl = document.getElementById('bm-courses');
    if (courses.length) {
      courseEl.innerHTML = courses.slice(0, 9).map(c =>
        `<div class="bm-course-row">
          <div>
            <div class="bm-course-name">${c.name}</div>
            <div class="bm-course-type">${c.type} · ${c.duration} year${c.duration > 1 ? 's' : ''}</div>
          </div>
          <div class="bm-course-fee">
            ₹${(c.totalFee / 100000).toFixed(1)}L
            <span class="bm-course-fee-sub">total tuition</span>
          </div>
        </div>`
      ).join('');
    } else {
      courseEl.innerHTML = '<p style="color:#6B4F3A;font-size:0.84rem;padding:8px 0;">Course fee details available on enquiry — please WhatsApp us.</p>';
    }

    // Hostel
    document.getElementById('bm-hostel-value').textContent = hasHostel
      ? '✅ Available (Boys & Girls)'
      : '❌ Not Available / On Request';

    // Placement
    const pkg = college.placement || {};
    document.getElementById('bm-avg-pkg').textContent  = pkg.avg     || 'N/A';
    document.getElementById('bm-high-pkg').textContent = pkg.highest || 'N/A';

    const companyEl = document.getElementById('bm-companies');
    companyEl.innerHTML = (pkg.companies || []).map(c =>
      `<span class="bm-company-chip">${c}</span>`
    ).join('');

    // Links
    const instaLink = document.getElementById('bm-insta-link');
    instaLink.href = college.instaUrl || '#';
    instaLink.textContent = college.insta || '📸 Instagram';

    const webLink = document.getElementById('bm-web-link');
    webLink.href = college.website || '#';

    // WhatsApp
    document.getElementById('bm-enquiry-btn').onclick = () => {
      const msg = encodeURIComponent(`Hi EduOrbit! I want admission details for ${college.name}.\nInterested course: \nMy name: \nContact: `);
      window.open(`https://wa.me/919546201805?text=${msg}`, '_blank');
    };

    // Open modal
    document.getElementById('buildingModalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeBuildingModal() {
    const m = document.getElementById('buildingModalOverlay');
    if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
  }

  /* ------------------------------------------------------------------
     QUERY POPUP
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
    const f    = e.target;
    const name    = f.querySelector('#qpName').value.trim();
    const phone   = f.querySelector('#qpPhone').value.trim();
    const college = f.querySelector('#qpCollege').value;
    const msg     = f.querySelector('#qpMsg').value.trim();
    if (!name || !phone) return;

    // Email via FormSubmit
    fetch('https://formsubmit.co/ajax/eduorbit.admissions@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `Quick Query — ${name} — ${college || 'General'}`,
        Name: name, Phone: phone, College_Interest: college, Message: msg || 'Quick enquiry'
      })
    }).catch(() => {});

    // Supabase
    if (window.supabaseClient) {
      window.supabaseClient.from('leads').insert([{
        name, phone, course: college || 'General Enquiry',
        message: msg || 'Quick query from bulb button',
        date: new Date().toISOString()
      }]).then(() => {}).catch(() => {});
    }

    // Success
    f.style.display = 'none';
    document.getElementById('qpSuccessMsg').classList.add('show');
    setTimeout(() => {
      closeQueryPopup();
      f.style.display = '';
      document.getElementById('qpSuccessMsg').classList.remove('show');
      f.reset();
    }, 2500);
  }

  /* ------------------------------------------------------------------
     INIT
     ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    renderCarousel();
    initCarouselDrag();

    // College modal close
    const bmClose   = document.getElementById('bmClose');
    const bmOverlay = document.getElementById('buildingModalOverlay');
    if (bmClose)   bmClose.addEventListener('click', closeBuildingModal);
    if (bmOverlay) bmOverlay.addEventListener('click', e => {
      if (e.target === bmOverlay) closeBuildingModal();
    });

    // Query popup
    const bulbBtn = document.getElementById('queryBulbBtn');
    if (bulbBtn) bulbBtn.addEventListener('click', openQueryPopup);

    const qpClose   = document.getElementById('qpClose');
    const qpOverlay = document.getElementById('queryPopupOverlay');
    if (qpClose)   qpClose.addEventListener('click', closeQueryPopup);
    if (qpOverlay) qpOverlay.addEventListener('click', e => {
      if (e.target === qpOverlay) closeQueryPopup();
    });

    const qpForm = document.getElementById('queryPopupForm');
    if (qpForm) qpForm.addEventListener('submit', handleQuerySubmit);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { closeBuildingModal(); closeQueryPopup(); }
    });
  });

})();
