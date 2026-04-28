// ===== EduOrbit - Main Application =====
(function () {
  'use strict';

  // --- Loader ---
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('hidden');
      document.body.style.overflow = '';
      initReveal();
      animateCounters();
    }, 1200);
  });
  document.body.style.overflow = 'hidden';

  // --- Custom Cursor ---
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    }
  });

  function animateCursor() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    if (follower) {
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('[data-hover], a, button, input, select, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => follower && follower.classList.add('hover'));
    el.addEventListener('mouseleave', () => follower && follower.classList.remove('hover'));
  });

  // --- Nav Scroll ---
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // --- Mobile Menu ---
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // --- Smooth Scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Reveal on Scroll ---
  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
  }

  // --- Counter Animation ---
  function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      const duration = 2000;
      const start = performance.now();
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      }, { threshold: 0.5 });
      observer.observe(el);
    });
  }

  // --- Populate Colleges ---
  let currentCollegeGroup = 'all';

  function renderColleges() {
    const grid = document.getElementById('collegesGrid');
    if (!grid) return;

    const filteredColleges = COLLEGES.filter(c => 
      currentCollegeGroup === 'all' || c.group === currentCollegeGroup
    );

    grid.innerHTML = filteredColleges.map(c => `
      <div class="college-card">
        <img src="${c.img}" alt="${c.name} Campus" class="college-card-img" onerror="this.src='https://via.placeholder.com/600x400?text=Campus'">
        <span class="college-card-abbr">${c.abbr}</span>
        <div class="college-card-name">${c.name}</div>
        <div class="college-card-meta">
          <span class="college-tag college-tag--naac">NAAC '${c.naac}' Grade</span>
          <span class="college-tag college-tag--est">Est. ${c.est}</span>
        </div>
        <div class="college-card-location">📍 ${c.location}</div>
      </div>
    `).join('');
  }
  renderColleges();

  // College Group filter
  const groupFilter = document.getElementById('collegeGroupFilter');
  if (groupFilter) {
    groupFilter.addEventListener('click', (e) => {
      if (e.target.classList.contains('pill')) {
        document.querySelectorAll('#collegeGroupFilter .pill').forEach(p => p.classList.remove('pill--active'));
        e.target.classList.add('pill--active');
        currentCollegeGroup = e.target.dataset.group;
        renderColleges();
      }
    });
  }

  // --- Fee Structure ---
  let currentCategory = 'all';
  let currentCollege = 'all';
  let currentSearch = '';
  let currentMarks = 0;

  function formatCurrency(n) {
    return '₹ ' + n.toLocaleString('en-IN');
  }

  function filterCourses() {
    return COURSES.filter(c => {
      const catMatch = currentCategory === 'all' || c.category === currentCategory;
      const colMatch = currentCollege === 'all' || c.colleges.includes(currentCollege);
      const searchMatch = !currentSearch || c.name.toLowerCase().includes(currentSearch.toLowerCase()) || c.type.toLowerCase().includes(currentSearch.toLowerCase());
      const marksMatch = currentMarks === 0 || (c.minMarks12 && currentMarks >= c.minMarks12);
      return catMatch && colMatch && searchMatch && marksMatch;
    });
  }

  function renderFeeTable() {
    const tbody = document.getElementById('feeTableBody');
    const countEl = document.getElementById('feeCount');
    if (!tbody) return;

    const filtered = filterCourses();
    countEl.textContent = `Showing ${filtered.length} of ${COURSES.length} courses`;

    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" class="no-results">No courses found matching your filters.</td></tr>';
      return;
    }

    tbody.innerHTML = filtered.map((c, i) => `
      <tr>
        <td class="fee-name">${c.name}</td>
        <td class="fee-type">${c.type}</td>
        <td>
          <div class="fee-colleges">${c.colleges.map(col => `<span class="fee-college-tag">${col}</span>`).join('')}</div>
        </td>
        <td>${c.duration} yrs</td>
        <td class="fee-amount">${formatCurrency(c.totalFee)}</td>
        <td class="fee-amount">${formatCurrency(c.hostelBoys)}</td>
        <td class="fee-amount">${formatCurrency(c.hostelGirls)}</td>
        <td><button class="fee-detail-btn" data-index="${i}" onclick="showDetail(${COURSES.indexOf(c)})">Details</button></td>
      </tr>
    `).join('');
  }
  renderFeeTable();

  // Category filter
  document.getElementById('categoryFilter').addEventListener('click', (e) => {
    if (e.target.classList.contains('pill')) {
      document.querySelectorAll('#categoryFilter .pill').forEach(p => p.classList.remove('pill--active'));
      e.target.classList.add('pill--active');
      currentCategory = e.target.dataset.category;
      renderFeeTable();
    }
  });

  // College filter
  document.getElementById('collegeFilter').addEventListener('change', (e) => {
    currentCollege = e.target.value;
    renderFeeTable();
  });

  // Search filter
  document.getElementById('searchFilter').addEventListener('input', (e) => {
    currentSearch = e.target.value;
    renderFeeTable();
  });

  // Marks filter
  const marksFilterInput = document.getElementById('marksFilter');
  if (marksFilterInput) {
    marksFilterInput.addEventListener('input', (e) => {
      currentMarks = parseInt(e.target.value) || 0;
      renderFeeTable();
    });
  }

  // Footer course links filter
  document.querySelectorAll('[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
      const cat = link.dataset.filter;
      currentCategory = cat;
      document.querySelectorAll('#categoryFilter .pill').forEach(p => {
        p.classList.toggle('pill--active', p.dataset.category === cat);
      });
      renderFeeTable();
    });
  });

  // --- Detail Modal ---
  const modalOverlay = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');

  window.showDetail = function (index) {
    const c = COURSES[index];
    if (!c) return;

    let yearHeaders = '';
    let tuitionRow = '';
    let boysRow = '';
    let girlsRow = '';
    for (let i = 0; i < c.duration; i++) {
      const yr = i + 1;
      const suffix = yr === 1 ? 'st' : yr === 2 ? 'nd' : yr === 3 ? 'rd' : 'th';
      yearHeaders += `<th>${yr}${suffix} Year</th>`;
      tuitionRow += `<td>${formatCurrency(c.yearWise[i])}</td>`;
      boysRow += `<td>${formatCurrency(c.hostelBoysYW[i])}</td>`;
      girlsRow += `<td>${formatCurrency(c.hostelGirlsYW[i])}</td>`;
    }

    modalContent.innerHTML = `
      <h3 class="modal-title">${c.name}</h3>
      <p class="modal-subtitle">${c.type} · ${c.colleges.join(', ')} · ${c.duration} Year Program</p>

      <div class="modal-section">
        <h4>Tuition Fee (Year-wise Breakdown)</h4>
        <table class="modal-table">
          <thead><tr>${yearHeaders}<th>Total</th></tr></thead>
          <tbody><tr>${tuitionRow}<td><strong>${formatCurrency(c.totalFee)}</strong></td></tr></tbody>
        </table>
      </div>

      <div class="modal-section">
        <h4>With Hostel — Boys (Year-wise)</h4>
        <table class="modal-table">
          <thead><tr>${yearHeaders}<th>Total</th></tr></thead>
          <tbody><tr>${boysRow}<td><strong>${formatCurrency(c.hostelBoys)}</strong></td></tr></tbody>
        </table>
      </div>

      <div class="modal-section">
        <h4>With Hostel — Girls (Year-wise)</h4>
        <table class="modal-table">
          <thead><tr>${yearHeaders}<th>Total</th></tr></thead>
          <tbody><tr>${girlsRow}<td><strong>${formatCurrency(c.hostelGirls)}</strong></td></tr></tbody>
        </table>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // --- Contact Form ---
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName').value;
    showToast(`Thank you ${name}! We'll contact you shortly.`);
    e.target.reset();
  });

  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3500);
  }

})();
