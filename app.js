// ===== EduOrbit - Premium Application Logic =====
(function () {
  'use strict';

  // --- Initialize Lucide ---
  function updateIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Colleges are now hardcoded in index.html for maximum visual control and performance.

  // --- Fee Structure Logic ---
  let currentCategory = 'all';
  let currentCollege = 'all';
  let currentSearch = '';
  let visibleCount = 20;

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

  function renderFeeTable() {
    const tbody = document.getElementById('feeTableBody');
    const countEl = document.getElementById('feeCount');
    const loadMoreDiv = document.getElementById('feeLoadMore');
    const moreBtn = document.getElementById('feeMoreBtn');
    if (!tbody) return;

    const filtered = filterCourses();
    const showing = Math.min(visibleCount, filtered.length);
    countEl.textContent = `Displaying ${showing} of ${filtered.length} curated programs`;

    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="p-20 text-center text-gray-400 font-bold italic">No programs found matching your filters.</td></tr>';
      loadMoreDiv.style.display = 'none';
      return;
    }

    const visible = filtered.slice(0, visibleCount);

    tbody.innerHTML = visible.map((c, i) => `
      <tr class="hover:bg-gray-50/50 transition-colors group">
        <td class="p-8">
            <div class="font-bold text-lg text-brand-dark group-hover:text-brand-blue transition-colors">${c.name}</div>
            <div class="flex gap-2 mt-2">
                ${c.colleges.map(col => `<span class="text-[10px] font-black uppercase text-gray-400 tracking-tighter">${col}</span>`).join('<span class="text-gray-200">|</span>')}
            </div>
        </td>
        <td class="p-8">
            <span class="px-3 py-1 bg-white border border-gray-100 rounded-lg text-xs font-bold text-gray-500 shadow-sm">${c.type}</span>
        </td>
        <td class="p-8 text-sm font-bold text-gray-400">${c.duration} Years</td>
        <td class="p-8">
            <div class="text-xl font-black text-brand-orange">${formatCurrency(c.totalFee)}</div>
            <div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Full Course Fee</div>
        </td>
        <td class="p-8">
            <button onclick="showDetail(${COURSES.indexOf(c)})" class="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all shadow-sm">
                <i data-lucide="arrow-right" class="w-5 h-5"></i>
            </button>
        </td>
      </tr>
    `).join('');

    // Load more logic
    if (visibleCount < filtered.length) {
      loadMoreDiv.style.display = 'flex';
      const remaining = filtered.length - visibleCount;
      moreBtn.textContent = visibleCount <= 20 ? `View More (${remaining} remaining) ↓` : `View All Programs ↓`;
    } else {
      loadMoreDiv.style.display = 'none';
    }
    updateIcons();
  }
  renderFeeTable();

  // Event Listeners for Filters
  document.getElementById('feeMoreBtn').addEventListener('click', () => {
    visibleCount = visibleCount <= 20 ? 40 : 9999;
    renderFeeTable();
  });

  document.getElementById('categoryFilterSelect').addEventListener('change', (e) => {
    currentCategory = e.target.value;
    visibleCount = 20;
    renderFeeTable();
  });

  document.getElementById('collegeFilter').addEventListener('change', (e) => {
    currentCollege = e.target.value;
    visibleCount = 20;
    renderFeeTable();
  });

  document.getElementById('searchFilter').addEventListener('input', (e) => {
    currentSearch = e.target.value;
    visibleCount = 20;
    renderFeeTable();
  });

  // --- Detail Modal Logic ---
  const modalOverlay = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');

  window.showDetail = function (index) {
    const c = COURSES[index];
    if (!c) return;

    let yearHeaders = '';
    let tuitionRow = '';
    for (let i = 0; i < c.duration; i++) {
      yearHeaders += `<th class="p-4 text-xs font-bold text-gray-400 uppercase">${i + 1}yr</th>`;
      tuitionRow += `<td class="p-4 font-bold text-brand-dark">${formatCurrency(c.yearWise[i])}</td>`;
    }

    modalContent.innerHTML = `
      <div class="mb-10">
          <div class="text-xs font-black text-brand-blue uppercase tracking-[0.3em] mb-3">Program Details</div>
          <h2 class="text-4xl font-extrabold text-brand-dark leading-tight">${c.name}</h2>
          <p class="text-gray-400 mt-2 font-bold uppercase text-xs tracking-widest">${c.type} · ${c.colleges.join(' & ')} · ${c.duration} Year Program</p>
      </div>
      
      ${c.eligibility ? `
        <div class="bg-brand-orange/5 p-8 rounded-3xl border-2 border-brand-orange/10 mb-10">
            <div class="flex items-center gap-3 mb-4 text-brand-orange">
                <i data-lucide="info" class="w-5 h-5"></i>
                <span class="font-black uppercase tracking-widest text-xs">Eligibility Prerequisites</span>
            </div>
            <p class="text-gray-600 font-medium leading-relaxed">${c.eligibility}</p>
        </div>
      ` : ''}

      <div class="grid md:grid-cols-2 gap-10">
          <div class="space-y-6">
              <div class="font-bold text-gray-400 text-xs uppercase tracking-widest flex items-center gap-2">
                  <i data-lucide="calendar" class="w-4 h-4"></i> Year-wise Fee Breakdown
              </div>
              <div class="overflow-hidden rounded-2xl border border-gray-100">
                  <table class="w-full text-left">
                      <thead class="bg-gray-50 border-b border-gray-100"><tr>${yearHeaders}</tr></thead>
                      <tbody><tr class="bg-white">${tuitionRow}</tr></tbody>
                  </table>
              </div>
          </div>
          <div class="space-y-6">
              <div class="font-bold text-gray-400 text-xs uppercase tracking-widest flex items-center gap-2">
                  <i data-lucide="wallet" class="w-4 h-4"></i> Financial Summary
              </div>
              <div class="p-8 bg-brand-dark rounded-3xl text-white">
                  <div class="text-xs opacity-50 uppercase font-bold tracking-widest mb-2">Total Course Fee</div>
                  <div class="text-4xl font-black text-brand-orange mb-6">${formatCurrency(c.totalFee)}</div>
                  <div class="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                      <div>
                          <div class="text-[10px] opacity-40 uppercase font-bold mb-1">Hostel (B)</div>
                          <div class="font-bold">${formatCurrency(c.hostelBoys)}</div>
                      </div>
                      <div>
                          <div class="text-[10px] opacity-40 uppercase font-bold mb-1">Hostel (G)</div>
                          <div class="font-bold">${formatCurrency(c.hostelGirls)}</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      
      <div class="mt-12 flex justify-center">
          <a href="tel:+919546201805" class="px-10 py-5 bg-brand-blue text-white rounded-2xl font-bold flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all">
              <i data-lucide="phone-call"></i> Speak to Admission Expert
          </a>
      </div>
    `;

    modalOverlay.classList.remove('invisible', 'opacity-0');
    modalOverlay.classList.add('visible', 'opacity-100');
    updateIcons();
  };

  const closeModal = () => {
    modalOverlay.classList.add('invisible', 'opacity-0');
    modalOverlay.classList.remove('visible', 'opacity-100');
  };

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => e.target === modalOverlay && closeModal());

  // --- Eligibility Checker Logic ---
  document.getElementById('eligCheckBtn').addEventListener('click', () => {
    const level = document.getElementById('eligLevel').value;
    const percent = parseFloat(document.getElementById('eligPercent').value);
    const stream = document.getElementById('eligStream').value;
    const exam = document.getElementById('eligExam').value;

    if (!percent || percent < 0 || percent > 100) {
      alert('Please enter a valid percentage (0-100).');
      return;
    }

    const results = COURSES.filter(c => {
      if (!c.eligibility) return false;
      const elig = c.eligibility.toLowerCase();

      // Basic level filtering logic... (simplified for brevity but keep the logic from before)
      if (level === '10th' && !elig.includes('10th')) return false;
      if (level === 'diploma' && !elig.includes('diploma') && !elig.includes('lateral')) return false;
      
      const percMatch = elig.match(/(\d{2,3})%/);
      if (percMatch && percent < parseInt(percMatch[1])) return false;

      return true;
    });

    const resultsDiv = document.getElementById('eligResults');
    const titleEl = document.getElementById('eligResultsTitle');
    const subEl = document.getElementById('eligResultsSub');
    const cardsEl = document.getElementById('eligCards');

    resultsDiv.classList.remove('hidden');
    titleEl.textContent = results.length > 0 ? `✅ ${results.length} Matching Programs Found!` : '😔 No Matching Programs Found';
    subEl.textContent = `Based on your ${percent}% scores, here are the universities you can apply for.`;

    cardsEl.innerHTML = results.map(c => `
      <div class="glass p-8 rounded-[2rem] border-white/50 hover:shadow-2xl transition-all">
          <div class="text-[10px] font-black text-brand-blue uppercase tracking-widest mb-2">${c.type}</div>
          <h4 class="text-xl font-bold mb-4">${c.name}</h4>
          <div class="space-y-3 mb-6">
              <div class="flex items-center gap-2 text-xs font-bold text-gray-400">
                  <i data-lucide="building" class="w-3 h-3"></i> ${c.colleges.join(', ')}
              </div>
              <div class="flex items-center gap-2 text-xs font-bold text-brand-orange">
                  <i data-lucide="circle-dollar-sign" class="w-3 h-3"></i> ${formatCurrency(c.totalFee)}
              </div>
          </div>
          <div class="bg-gray-50 p-4 rounded-xl text-[10px] font-medium text-gray-500 leading-relaxed italic">
              📋 ${c.eligibility}
          </div>
      </div>
    `).join('');
    
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
    updateIcons();
  });

  // --- Loan Tabs ---
  document.querySelectorAll('.loan-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.loan-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.loan-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.target).classList.add('active');
    });
  });

  // --- Contact Form ---
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Our admission expert will contact you within 2 hours.');
    e.target.reset();
  });

})();
