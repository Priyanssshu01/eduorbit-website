/* ===================================================================
   COLLEGE PROFILE MODAL + BRANCH COMPARISON ENGINE
   EduOrbit — colleges.js
   =================================================================== */
(function () {
  'use strict';

  let COLLEGES = window.COLLEGES;
  let COURSES = window.COURSES;

  if (typeof localStorage !== 'undefined') {
    const localColleges = localStorage.getItem('eo_colleges');
    if (localColleges) {
      try { COLLEGES = JSON.parse(localColleges); } catch (e) {}
    }
    const localCourses = localStorage.getItem('eo_courses');
    if (localCourses) {
      try { COURSES = JSON.parse(localCourses); } catch (e) {}
    }
  }

  // ============================================================
  // COLLEGE PROFILE MODAL
  // ============================================================
  const overlay = document.getElementById('cpOverlay');
  const closeBtn = document.getElementById('cpClose');
  const tabs = document.querySelectorAll('.cp-tab');
  const panes = document.querySelectorAll('.cp-tab-pane');

  // Open modal
  window.openCollegeProfile = function (collegeId) {
    const college = COLLEGES.find(c => c.id === collegeId);
    if (!college) return;

    // Banner
    document.getElementById('cpIcon').textContent = college.img;
    document.getElementById('cpAbbr').textContent = college.abbr;
    document.getElementById('cpName').textContent = college.name;
    document.getElementById('cpNaac').textContent = `NAAC ${college.naac}`;
    document.getElementById('cpEst').textContent = `Est. ${college.est}`;

    // Set banner color
    const banner = document.getElementById('cpBanner');
    banner.style.background = `linear-gradient(135deg, #0F172A 0%, ${college.color || '#1B4D8E'} 100%)`;

    // Stats
    const years = new Date().getFullYear() - college.est;
    const pkg = college.placement;
    document.getElementById('cpAvgPkg').textContent = pkg ? pkg.avg : 'N/A';
    document.getElementById('cpHighPkg').textContent = pkg ? pkg.highest : 'N/A';
    document.getElementById('cpYear').textContent = years + ' yrs';

    // Bio
    document.getElementById('cpBio').textContent = college.bio || '';

    // Highlights
    const hEl = document.getElementById('cpHighlights');
    hEl.innerHTML = (college.highlights || []).map(h =>
      `<span class="cp-highlight-chip">${h}</span>`
    ).join('');

    // Links
    const instaLink = document.getElementById('cpInstaLink');
    instaLink.href = college.instaUrl || '#';
    instaLink.querySelector('svg').nextSibling.textContent = ` ${college.insta || 'Instagram'}`;
    if (!college.instaUrl) instaLink.removeAttribute('href');

    document.getElementById('cpWebLink').href = college.website || '#';
    document.getElementById('cpAffil').textContent = college.affiliation || 'MAKAUT';
    document.getElementById('cpLoc').textContent = college.location || '';

    // Branches Tab
    const branches = COURSES.filter(c => c.colleges.includes(college.abbr));
    const branchList = document.getElementById('cpBranchList');
    if (branches.length) {
      branchList.innerHTML = branches.map(b => `
        <div class="cp-branch-item">
          <div>
            <div class="cp-branch-name">${b.name}</div>
            <div class="cp-branch-type">${b.type} · ${b.duration} yr${b.duration > 1 ? 's' : ''}</div>
          </div>
          <div class="cp-branch-fee">₹${(b.totalFee / 100000).toFixed(1)}L total</div>
        </div>
      `).join('');
    } else {
      branchList.innerHTML = '<p style="color:var(--gray-light);font-size:.85rem;padding:12px 0">Course data for this college is being updated.</p>';
    }

    // Placement Tab
    document.getElementById('cpAvgPkg2').textContent = pkg ? pkg.avg : 'N/A';
    document.getElementById('cpHighPkg2').textContent = pkg ? pkg.highest : 'N/A';
    const companies = document.getElementById('cpCompanies');
    companies.innerHTML = (pkg && pkg.companies || []).map(c =>
      `<span class="cp-company-chip">${c}</span>`
    ).join('');

    // Reset tabs
    tabs.forEach(t => t.classList.remove('active'));
    panes.forEach(p => p.classList.remove('active'));
    tabs[0].classList.add('active');
    document.getElementById('cp-overview').classList.add('active');

    // Open overlay
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('cp-' + tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  // Wire college cards to open modal
  function wireCollegeCards() {
    document.querySelectorAll('.college-card').forEach(card => {
      const id = card.dataset.id;
      if (!id) return;
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => openCollegeProfile(id));
    });
  }

  // Re-wire after colleges are rendered
  const origRender = window.renderCollegesCallback;
  // Use MutationObserver to catch when collegesGrid is filled
  const grid = document.getElementById('collegesGrid');
  if (grid) {
    const obs = new MutationObserver(() => {
      wireCollegeCards();
    });
    obs.observe(grid, { childList: true });
  }
  // Also try immediately (in case already rendered)
  wireCollegeCards();

  // ============================================================
  // COMPARISON ENGINE
  // ============================================================
  const TOP4_IDS = ['jisce', 'gnit', 'iem', 'adamas']; // Default top 4
  let selectedColleges = new Set(TOP4_IDS);

  function renderPickerChips() {
    const container = document.getElementById('cmpPickerChips');
    if (!container) return;
    container.innerHTML = COLLEGES.map(c => `
      <button class="cmp-chip ${selectedColleges.has(c.id) ? 'selected' : ''}"
              data-id="${c.id}"
              onclick="toggleCompareCollege('${c.id}', this)"
              aria-pressed="${selectedColleges.has(c.id)}">
        <span class="cmp-chip-dot"></span>${c.abbr}
      </button>
    `).join('');
  }

  window.toggleCompareCollege = function (id, btn) {
    if (selectedColleges.has(id)) {
      if (selectedColleges.size <= 2) return; // Minimum 2
      selectedColleges.delete(id);
      btn.classList.remove('selected');
      btn.setAttribute('aria-pressed', 'false');
    } else {
      if (selectedColleges.size >= 4) {
        // Remove first selected
        const first = [...selectedColleges][0];
        selectedColleges.delete(first);
        const firstBtn = document.querySelector(`.cmp-chip[data-id="${first}"]`);
        if (firstBtn) { firstBtn.classList.remove('selected'); firstBtn.setAttribute('aria-pressed', 'false'); }
      }
      selectedColleges.add(id);
      btn.classList.add('selected');
      btn.setAttribute('aria-pressed', 'true');
    }
  };

  window.buildCompareTable = function () {
    const ids = [...selectedColleges];
    if (ids.length < 2) return;

    const colleges = ids.map(id => COLLEGES.find(c => c.id === id)).filter(Boolean);
    const wrap = document.getElementById('cmpTableWrap');
    const table = document.getElementById('cmpTable');

    // Gather branch categories present across selected colleges
    const abbrs = colleges.map(c => c.abbr);
    const relevantCourses = COURSES.filter(c => c.colleges.some(coll => abbrs.includes(coll)));

    // Group by category
    const categories = {};
    relevantCourses.forEach(c => {
      const cat = c.category || 'other';
      if (!categories[cat]) categories[cat] = {};
      // Group by normalized name
      const key = c.name.split('(')[0].trim();
      if (!categories[cat][key]) categories[cat][key] = {};
      c.colleges.forEach(coll => {
        if (abbrs.includes(coll)) {
          categories[cat][key][coll] = c;
        }
      });
    });

    const catLabels = {
      btech: '🔧 B.Tech (1st Year)',
      'btech-lateral': '🔩 B.Tech (Lateral)',
      diploma: '📐 Diploma',
      mba: '💼 MBA / MHA',
      mca: '💻 MCA',
      bca: '🖥️ BCA',
      bba: '📊 BBA',
      engineering: '⚙️ Engineering',
      management: '🏢 Management',
      computer_applications: '💻 Computer Apps',
      science: '🔬 Sciences',
      law: '⚖️ Law',
      pharmacy_health: '💊 Pharmacy & Health',
      agriculture: '🌾 Agriculture',
      education: '📚 Education',
    };

    // Build header
    let html = '<thead><tr>';
    html += '<th>Branch / Course</th>';
    colleges.forEach(c => {
      html += `<th class="cmp-th-college">
        <span class="cmp-th-abbr">${c.abbr}</span>
        ${c.name.split(' ').slice(0,3).join(' ')}
        <span class="cmp-th-naac">NAAC ${c.naac}</span>
      </th>`;
    });
    html += '</tr></thead><tbody>';

    // Info rows
    const infoRows = [
      { label: '📍 Location', fn: c => c.location },
      { label: '📅 Established', fn: c => c.est },
      { label: '🏅 NAAC Grade', fn: c => `NAAC ${c.naac}` },
      { label: '📈 Avg Package', fn: c => c.placement ? c.placement.avg : 'N/A' },
      { label: '🏆 Highest Package', fn: c => c.placement ? c.placement.highest : 'N/A' },
      { label: '🏛️ Affiliation', fn: c => c.affiliation },
    ];

    html += '<tr class="cmp-row-section"><td colspan="' + (colleges.length + 1) + '">ℹ️ College Overview</td></tr>';
    infoRows.forEach(row => {
      const vals = colleges.map(c => row.fn(c));
      // Highlight best package
      let bestIdx = -1;
      if (row.label.includes('Avg') || row.label.includes('Highest')) {
        let best = 0;
        vals.forEach((v, i) => {
          const num = parseFloat((v || '').toString()) || 0;
          if (num > best) { best = num; bestIdx = i; }
        });
      }
      html += `<tr><td>${row.label}</td>`;
      vals.forEach((v, i) => {
        const isBest = i === bestIdx;
        html += `<td style="text-align:center">${isBest ? `<span class="cmp-best">${v}</span>` : (v || '<span class="cmp-na">N/A</span>')}</td>`;
      });
      html += '</tr>';
    });

    // Branch/fee rows by category
    Object.entries(categories).forEach(([cat, branches]) => {
      const label = catLabels[cat] || cat;
      const branchKeys = Object.keys(branches);
      if (!branchKeys.length) return;

      html += `<tr class="cmp-row-section"><td colspan="${colleges.length + 1}">${label}</td></tr>`;

      branchKeys.forEach(branchName => {
        const bData = branches[branchName];
        html += `<tr><td>${branchName}</td>`;
        colleges.forEach(college => {
          const entry = bData[college.abbr];
          if (entry) {
            const fee = entry.totalFee;
            const feeStr = fee && fee !== 'N/A'
              ? `<span class="cmp-fee">₹${(fee / 100000).toFixed(1)}L</span><br><small style="color:var(--gray-light);font-size:0.7rem">${entry.duration}yr</small>`
              : '<span class="cmp-na">N/A</span>';
            html += `<td style="text-align:center">${feeStr}</td>`;
          } else {
            html += `<td style="text-align:center"><span class="cmp-na">—</span></td>`;
          }
        });
        html += '</tr>';
      });
    });

    // Instagram / Social row
    html += `<tr class="cmp-row-section"><td colspan="${colleges.length + 1}">📱 Social & Web</td></tr>`;
    html += `<tr><td>📸 Instagram</td>`;
    colleges.forEach(c => {
      const insta = c.insta || '—';
      const url = c.instaUrl;
      html += `<td style="text-align:center">${url ? `<a href="${url}" target="_blank" rel="noopener" style="color:var(--blue);font-weight:600;font-size:.78rem">${insta}</a>` : `<span class="cmp-na">${insta}</span>`}</td>`;
    });
    html += '</tr>';
    html += `<tr><td>🌐 Website</td>`;
    colleges.forEach(c => {
      const url = c.website;
      html += `<td style="text-align:center">${url ? `<a href="${url}" target="_blank" rel="noopener" style="color:var(--blue);font-weight:600;font-size:.78rem">Visit →</a>` : '<span class="cmp-na">—</span>'}</td>`;
    });
    html += '</tr></tbody>';

    table.innerHTML = html;
    wrap.style.display = 'block';
    wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  window.resetCompare = function () {
    selectedColleges = new Set(TOP4_IDS);
    document.getElementById('cmpTableWrap').style.display = 'none';
    renderPickerChips();
  };

  // Init: render picker chips when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderPickerChips);
  } else {
    renderPickerChips();
  }

  // Auto-build comparison table with top 4 on load after data ready
  window.addEventListener('load', () => {
    setTimeout(() => {
      renderPickerChips();
      // Pre-build comparison with default top 4
      buildCompareTable();
    }, 1500);
  });

})();
