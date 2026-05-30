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
  function renderColleges() {
    const grid = document.getElementById('collegesGrid');
    if (!grid) return;
    grid.innerHTML = COLLEGES.map(c => `
      <div class="college-card">
        <span class="college-card-abbr">${c.abbr}</span>
        <div class="college-card-emoji">${c.img}</div>
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

  // --- Fee Structure ---
  let currentCategory = 'all';
  let currentCollege = 'all';
  let currentSearch = '';

  function formatCurrency(n) {
    if (n === 'N/A' || n === null || n === undefined) return 'N/A';
    return '₹ ' + n.toLocaleString('en-IN');
  }

  function filterCourses() {
    return COURSES.filter(c => {
      let catMatch = false;
      if (currentCategory === 'all') catMatch = true;
      else if (currentCategory === 'engineering') catMatch = ['btech', 'btech-lateral', 'engineering'].includes(c.category);
      else if (currentCategory === 'management') catMatch = ['mba', 'bba', 'management'].includes(c.category);
      else if (currentCategory === 'computer_applications') catMatch = ['mca', 'bca', 'computer_applications'].includes(c.category);
      else if (currentCategory === 'diploma') catMatch = ['diploma'].includes(c.category);
      else catMatch = c.category === currentCategory;
      
      const colMatch = currentCollege === 'all' || c.colleges.includes(currentCollege);
      const searchMatch = !currentSearch || c.name.toLowerCase().includes(currentSearch.toLowerCase()) || c.type.toLowerCase().includes(currentSearch.toLowerCase());
      return catMatch && colMatch && searchMatch;
    });
  }

  let visibleCount = 20;

  function renderFeeTable() {
    const tbody = document.getElementById('feeTableBody');
    const countEl = document.getElementById('feeCount');
    const loadMoreDiv = document.getElementById('feeLoadMore');
    const moreBtn = document.getElementById('feeMoreBtn');
    if (!tbody) return;

    const filtered = filterCourses();
    const showing = Math.min(visibleCount, filtered.length);
    countEl.textContent = `Showing ${showing} of ${filtered.length} courses`;

    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" class="no-results">No courses found matching your filters.</td></tr>';
      loadMoreDiv.style.display = 'none';
      return;
    }

    const visible = filtered.slice(0, visibleCount);

    tbody.innerHTML = visible.map((c, i) => `
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

    // Show/hide load more button
    if (visibleCount < filtered.length) {
      loadMoreDiv.style.display = 'flex';
      const remaining = filtered.length - visibleCount;
      if (visibleCount <= 20) {
        moreBtn.textContent = `Show More Courses (${remaining} remaining) ↓`;
      } else {
        moreBtn.textContent = `Show All Courses (${remaining} remaining) ↓`;
      }
    } else {
      loadMoreDiv.style.display = 'none';
    }
  }
  renderFeeTable();

  // Load More button
  document.getElementById('feeMoreBtn').addEventListener('click', () => {
    if (visibleCount <= 20) visibleCount = 40;
    else visibleCount = 9999;
    renderFeeTable();
  });

  // Category filter
  document.getElementById('categoryFilterSelect').addEventListener('change', (e) => {
    currentCategory = e.target.value;
    visibleCount = 20;
    renderFeeTable();
  });

  // College filter
  document.getElementById('collegeFilter').addEventListener('change', (e) => {
    currentCollege = e.target.value;
    visibleCount = 20;
    renderFeeTable();
  });

  // Search filter
  document.getElementById('searchFilter').addEventListener('input', (e) => {
    currentSearch = e.target.value;
    visibleCount = 20;
    renderFeeTable();
  });

  // Footer course links filter
  document.querySelectorAll('[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
      const cat = link.dataset.filter;
      currentCategory = cat;
      const select = document.getElementById('categoryFilterSelect');
      if (select) select.value = cat;
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

    let eligibilityHtml = '';
    if (c.eligibility) {
      eligibilityHtml = `
        <div class="modal-section" style="background: rgba(243,156,18,0.08); padding: 16px; border-radius: 8px; border-left: 4px solid var(--orange); margin-bottom: 24px;">
          <h4 style="color: var(--orange-dark); margin-bottom: 8px;">Admission Eligibility Criteria</h4>
          <p style="font-size: 0.85rem; color: var(--gray); line-height: 1.5; margin: 0;">${c.eligibility}</p>
        </div>
      `;
    }

    modalContent.innerHTML = `
      <h3 class="modal-title">${c.name}</h3>
      <p class="modal-subtitle">${c.type} · ${c.colleges.join(', ')} · ${c.duration} Year Program</p>
      
      ${eligibilityHtml}

      ${c.donationCharge ? `
      <div class="modal-section" style="background: linear-gradient(135deg, rgba(220,38,38,0.08), rgba(245,197,24,0.08)); padding: 18px 20px; border-radius: 12px; border-left: 5px solid #dc2626; margin-bottom: 24px;">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
          <span style="font-size:1.4rem;">⚠️</span>
          <h4 style="color:#dc2626; margin:0; font-size:1rem;">Donation / Direct Admission Charge</h4>
        </div>
        <p style="font-size:0.82rem; color:#6b7280; margin:0 0 10px 0;">This is a one-time charge payable at the time of admission (separate from tuition fee).</p>
        <div style="display:flex; align-items:center; justify-content:space-between; background:#fff; border-radius:8px; padding:12px 16px; border:1.5px solid #fca5a5;">
          <span style="font-size:0.9rem; font-weight:600; color:#374151;">Direct Admission Charge:</span>
          <span style="font-size:1.3rem; font-weight:800; color:#dc2626;">${formatCurrency(c.donationCharge)}</span>
        </div>
        <p style="font-size:0.75rem; color:#9ca3af; margin:8px 0 0 0;">💡 This includes our service charge of ₹1,00,000. Payable directly to the college.</p>
      </div>
      ` : ''}

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

  // --- Loans & Scholarships Tabs ---
  const loanTabs = document.querySelectorAll('.loan-tab');
  const loanPanes = document.querySelectorAll('.loan-pane');

  loanTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      loanTabs.forEach(t => t.classList.remove('active'));
      loanPanes.forEach(p => p.classList.remove('active'));
      
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });

  // --- Eligibility Checker ---
  document.getElementById('eligCheckBtn').addEventListener('click', () => {
    const level = document.getElementById('eligLevel').value;
    const percent = parseFloat(document.getElementById('eligPercent').value);
    const stream = document.getElementById('eligStream').value;
    const exam = document.getElementById('eligExam').value;

    if (!percent || percent < 0 || percent > 100) {
      showToast('Please enter a valid percentage (0-100).');
      return;
    }

    const results = COURSES.filter(c => {
      if (!c.eligibility) return false;
      const elig = c.eligibility.toLowerCase();

      // --- Level matching ---
      if (level === '10th') {
        if (!elig.includes('10th') && !elig.includes('class 10')) return false;
      } else if (level === 'diploma') {
        if (!elig.includes('diploma') && !elig.includes('lateral')) return false;
      } else if (level === 'ug') {
        const isPG = elig.includes('graduation') || elig.includes('graduate') || elig.includes('ug') ||
                     elig.includes('b.tech') || elig.includes('b.e') || elig.includes('b.pharm') ||
                     elig.includes('b.sc nursing') || elig.includes('b.ed') || elig.includes('gnm') ||
                     elig.includes('llb') || elig.includes('bca') || elig.includes('bachelor');
        if (!isPG) return false;
      } else {
        // 12th level - exclude PG-only courses
        const isPGonly = (elig.includes('graduation pass') || elig.includes('graduate and') ||
                          elig.includes('b.tech') || elig.includes('b.e pass') ||
                          elig.includes('b.pharm') || elig.includes('b.sc nursing') ||
                          elig.includes('b.ed pass') || elig.includes('gnm pass') ||
                          elig.includes('llb') || elig.includes('diploma in engineering pass') ||
                          elig.includes('undergraduate degree')) && !elig.includes('10+2');
        if (isPGonly) return false;
      }

      // --- Percentage matching ---
      const percMatch = elig.match(/(\d{2,3})%/);
      if (percMatch) {
        const reqPerc = parseInt(percMatch[1]);
        if (percent < reqPerc) return false;
      }

      // --- Stream matching ---
      if (stream !== 'any') {
        if (stream === 'pcm') {
          if (elig.includes('pcb') && !elig.includes('pcm')) return false;
        } else if (stream === 'pcb') {
          if (elig.includes('pcm') && !elig.includes('pcb') && !elig.includes('bio')) return false;
        } else if (stream === 'commerce') {
          if (elig.includes('pcm') || elig.includes('pcb') || elig.includes('physics')) {
            if (!elig.includes('any stream') && !elig.includes('any recognized')) return false;
          }
        } else if (stream === 'arts') {
          if (elig.includes('pcm') || elig.includes('pcb') || elig.includes('physics') || elig.includes('maths')) {
            if (!elig.includes('any stream') && !elig.includes('any recognized')) return false;
          }
        }
      }

      // --- Entrance exam boost (include courses requiring that exam) ---
      if (exam !== 'none') {
        const examMap = {
          jee: ['jee'],
          neet: ['neet'],
          clat: ['clat'],
          cat: ['cat', 'mat', 'xat'],
          gate: ['gate'],
          cuet: ['cuet'],
          auat: ['auat'],
          wbjee: ['wbjee'],
          state: ['state']
        };
        const examKeywords = examMap[exam] || [];
        const requiresExam = examKeywords.some(k => elig.includes(k));
        // If course requires an exam and student hasn't taken it, skip
        if (!requiresExam && examKeywords.length) {
          const coursNeedsExam = ['clat','gate','cat','mat','xat','auat'].some(k => elig.includes(k));
          if (coursNeedsExam) return false;
        }
      } else {
        // Student has no exam - skip courses that strictly require one
        const strictExams = ['clat', 'gate'];
        const needsStrictExam = strictExams.some(k => elig.includes(k)) && !elig.includes('or');
        if (needsStrictExam) return false;
      }

      return true;
    });

    const resultsDiv = document.getElementById('eligResults');
    const titleEl = document.getElementById('eligResultsTitle');
    const subEl = document.getElementById('eligResultsSub');
    const cardsEl = document.getElementById('eligCards');

    resultsDiv.style.display = 'block';

    if (results.length === 0) {
      titleEl.textContent = 'No Matching Courses Found';
      subEl.textContent = 'Try adjusting your percentage or stream to see more options.';
      cardsEl.innerHTML = `
        <div class="elig-no-results">
          <h3>😔 No courses match your criteria</h3>
          <p>Don't worry! Contact our counsellors for personalized guidance.</p>
        </div>
      `;
    } else {
      titleEl.textContent = `✅ ${results.length} Course${results.length > 1 ? 's' : ''} Found!`;
      subEl.textContent = `Based on your ${percent}% marks — here are the courses you may be eligible for:`;

      cardsEl.innerHTML = results.map(c => {
        const collegeNames = c.colleges.map(abbr => {
          const col = COLLEGES.find(cl => cl.abbr === abbr);
          return col ? col.name : abbr;
        }).join(', ');
        
        return `
          <div class="elig-card">
            <div class="elig-card-name">${c.name}</div>
            <div class="elig-card-type">${c.type}</div>
            <div class="elig-card-meta">
              <span>${c.duration} Year${c.duration > 1 ? 's' : ''}</span>
              <span>${c.category.replace('_', ' ')}</span>
            </div>
            <div class="elig-card-colleges"><strong>College:</strong> ${collegeNames}</div>
            <div class="elig-card-fee">Total Fee: ${formatCurrency(c.totalFee)}</div>
            <div class="elig-card-eligibility">📋 ${c.eligibility}</div>
          </div>
        `;
      }).join('');
    }

    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // --- Contact Form ---
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName').value.trim();
    const phone = document.getElementById('formPhone').value.trim();
    const course = document.getElementById('formCourse').value;
    const message = document.getElementById('formMessage').value.trim();

    // Save lead to localStorage for admin panel
    const leads = JSON.parse(localStorage.getItem('eo_leads') || '[]');
    leads.push({ name, phone, course, message, date: new Date().toISOString() });
    localStorage.setItem('eo_leads', JSON.stringify(leads));

    // Report Conversion to Google Ads
    if (typeof gtag_report_conversion === 'function') {
      gtag_report_conversion();
    }

    showToast(`✅ Thank you ${name}! We'll contact you shortly.`);
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

  // --- Receipt Printer Modal ---
  window.openReceiptModal = function() {
    const colSelect = document.getElementById('rCollege');
    colSelect.innerHTML = '<option value="">Select College *</option>' + 
      COLLEGES.map(c => `<option value="${c.abbr}">${c.name}</option>`).join('');
    
    document.getElementById('receiptFormView').style.display = 'block';
    document.getElementById('receiptPrintView').style.display = 'none';
    document.getElementById('printedTicket').classList.remove('printing');
    document.getElementById('receiptForm').reset();
    document.getElementById('receiptOverlay').classList.add('show');
  };

  window.closeReceiptModal = function() {
    document.getElementById('receiptOverlay').classList.remove('show');
  };

  window.updateReceiptCourses = function() {
    const col = document.getElementById('rCollege').value;
    const courseSelect = document.getElementById('rCourse');
    if (!col) {
      courseSelect.innerHTML = '<option value="">Select Course *</option>';
      return;
    }
    const available = COURSES.filter(c => c.colleges.includes(col));
    courseSelect.innerHTML = '<option value="">Select Course *</option>' + 
      available.map(c => `<option value="${c.name}">${c.name} (${c.type})</option>`).join('');
  };

  window.generateReceipt = function(e) {
    e.preventDefault();
    const name = document.getElementById('rName').value.trim();
    const phone = document.getElementById('rPhone').value.trim();
    const colAbbr = document.getElementById('rCollege').value;
    const courseName = document.getElementById('rCourse').value;

    const college = COLLEGES.find(c => c.abbr === colAbbr);
    const course = COURSES.find(c => c.name === courseName && c.colleges.includes(colAbbr));

    if (!college || !course) {
      showToast('⚠️ Please select a valid college and course combination.');
      return;
    }

    // Save lead
    const leads = JSON.parse(localStorage.getItem('eo_leads') || '[]');
    leads.push({ name, phone, course: courseName, message: `Fee Receipt generated for ${colAbbr}`, date: new Date().toISOString(), stage: 'new' });
    localStorage.setItem('eo_leads', JSON.stringify(leads));

    // Populate Receipt
    document.getElementById('tName').textContent = name;
    document.getElementById('tCollege').textContent = college.abbr;
    document.getElementById('tCourse').textContent = course.type;
    
    let yearHtml = '';
    for(let i=0; i<course.duration; i++) {
      yearHtml += `<div class="t-row"><span>Year ${i+1}:</span><strong>${formatCurrency(course.yearWise[i])}</strong></div>`;
    }
    document.getElementById('tYears').innerHTML = yearHtml;
    document.getElementById('tTotal').textContent = formatCurrency(course.totalFee);

    // Animate
    document.getElementById('receiptFormView').style.display = 'none';
    document.getElementById('receiptPrintView').style.display = 'block';
    
    // Trigger CSS animation by adding class after a tiny delay
    setTimeout(() => {
      document.getElementById('printedTicket').classList.add('printing');
    }, 50);
  };
  let popupShown = false;
  function showLeadPopup() {
    if (popupShown || sessionStorage.getItem('eo_popup_shown')) return;
    popupShown = true;
    sessionStorage.setItem('eo_popup_shown', '1');
    document.getElementById('leadPopupOverlay').classList.add('show');
  }
  function closeLeadPopup() {
    document.getElementById('leadPopupOverlay').classList.remove('show');
  }
  window.closeLeadPopup = closeLeadPopup;

  // Show popup after 20 seconds
  setTimeout(showLeadPopup, 20000);

  // Exit intent (mouse leaves viewport top)
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 10) showLeadPopup();
  });

  // Close on overlay click
  document.getElementById('leadPopupOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('leadPopupOverlay')) closeLeadPopup();
  });

  window.submitLeadPopup = function(e) {
    e.preventDefault();
    const name = document.getElementById('popupName').value.trim();
    const phone = document.getElementById('popupPhone').value.trim();
    const course = document.getElementById('popupCourse').value;

    // Save to localStorage for admin panel
    const leads = JSON.parse(localStorage.getItem('eo_leads') || '[]');
    leads.push({ name, phone, course, message: 'Via Popup Lead Form', date: new Date().toISOString() });
    localStorage.setItem('eo_leads', JSON.stringify(leads));

    // Report Conversion to Google Ads
    if (typeof gtag_report_conversion === 'function') {
      gtag_report_conversion();
    }

    // Show success
    document.getElementById('leadPopupForm').closest('.lead-popup').innerHTML = `
      <div class="lead-popup-success">
        <div class="success-icon">🎉</div>
        <h3>Thank You, ${name}!</h3>
        <p>Our counsellor will call you on <strong>${phone}</strong> within 2 hours.<br><br>
        Meanwhile, you can also WhatsApp us directly:</p>
        <a href="https://wa.me/919546201805?text=Hi!%20I%20am%20${encodeURIComponent(name)}%20and%20I%20want%20guidance%20for%20${encodeURIComponent(course||'college admissions')}."
          target="_blank" style="display:inline-block;margin-top:16px;padding:12px 28px;background:#25D366;color:#fff;border-radius:10px;font-weight:700;font-size:.9rem;text-decoration:none">
          💬 WhatsApp Now
        </a>
      </div>`;
    setTimeout(closeLeadPopup, 8000);
  };

  // --- Live Social Proof Popup Logic ---
  function initSocialProof() {
    const spPopup = document.getElementById('socialProof');
    if (!spPopup) return;

    const names = ['Rahul', 'Aman', 'Priya', 'Neha', 'Rohan', 'Sneha', 'Aditya', 'Vikash', 'Anjali', 'Kunal'];
    const locations = ['Patna', 'Ranchi', 'Kolkata', 'Dhanbad', 'Gaya', 'Muzaffarpur', 'Asansol', 'Siliguri', 'Purnia'];
    const actions = ['just booked a seat in B.Tech', 'is checking fee for MBA', 'applied for Bihar DRCC admission', 'downloaded fee structure', 'just got free counselling'];

    function showRandomProof() {
      const name = names[Math.floor(Math.random() * names.length)];
      const loc = locations[Math.floor(Math.random() * locations.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const time = Math.floor(Math.random() * 10) + 1; // 1 to 10 mins ago

      document.getElementById('spName').textContent = `${name} from ${loc}`;
      document.getElementById('spAction').textContent = action;
      document.getElementById('spTime').textContent = `${time} min${time > 1 ? 's' : ''} ago`;

      spPopup.classList.add('show');

      // Hide after 5 seconds
      setTimeout(() => {
        spPopup.classList.remove('show');
      }, 5000);
    }

    // Initial delay before showing first popup (10 seconds)
    setTimeout(() => {
      showRandomProof();
      // Then show a new one every 20-35 seconds
      setInterval(() => {
        // Only show if not currently showing
        if (!spPopup.classList.contains('show')) {
          showRandomProof();
        }
      }, Math.floor(Math.random() * 15000) + 20000);
    }, 10000);
  }

  // Initialize social proof
  initSocialProof();

})();
