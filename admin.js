// ===== EDUORBIT ADMIN PANEL =====
// Credentials (change these to keep secure!)
const ADMIN_USER = 'eduorbit';
const ADMIN_PASS = 'admin@2026';

// ===== AUTH =====
function doLogin() {
  const u = (document.getElementById('loginUser').value || '').trim();
  const p = (document.getElementById('loginPass').value || '').trim();
  const err = document.getElementById('loginError');
  if (u === ADMIN_USER && p === ADMIN_PASS) {
    sessionStorage.setItem('eo_admin', 'true');
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminWrap').style.display = 'flex';
    initAdmin();
  } else {
    err.style.display = 'block';
    setTimeout(() => { err.style.display = 'none'; }, 3000);
  }
}

function doLogout() {
  sessionStorage.removeItem('eo_admin');
  location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
  // Always show login first — only skip if session active in same browser tab
  if (sessionStorage.getItem('eo_admin') === 'true') {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminWrap').style.display = 'flex';
    initAdmin();
  }
  // Enter key on password
  const passEl = document.getElementById('loginPass');
  if (passEl) passEl.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
  const userEl = document.getElementById('loginUser');
  if (userEl) userEl.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
});

// ===== DATA STORE =====
// Load from localStorage (fallback to data.js globals)
function getColleges() {
  const stored = localStorage.getItem('eo_colleges');
  return stored ? JSON.parse(stored) : [...COLLEGES];
}
function saveColleges(data) {
  localStorage.setItem('eo_colleges', JSON.stringify(data));
}
function getCourses() {
  const stored = localStorage.getItem('eo_courses');
  return stored ? JSON.parse(stored) : [...COURSES];
}
function saveCourses(data) {
  localStorage.setItem('eo_courses', JSON.stringify(data));
}
function getLeads() {
  return JSON.parse(localStorage.getItem('eo_leads') || '[]');
}
function saveLeads(data) {
  localStorage.setItem('eo_leads', JSON.stringify(data));
}

// ===== INIT =====
function initAdmin() {
  updateDashboard();
  renderCollegesTable();
  renderCoursesTable();
  renderLeadsTable();
  updateExportPreview();
  populateCollegeFilter();
}

// ===== TAB SWITCH =====
function showTab(tab, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  else {
    document.querySelectorAll('.nav-item').forEach(b => {
      if (b.textContent.toLowerCase().includes(tab.substring(0,4))) b.classList.add('active');
    });
  }
  const titles = { dashboard:'Dashboard', colleges:'Colleges', courses:'Courses', leads:'Student Leads', export:'Export Data' };
  document.getElementById('pageTitle').textContent = titles[tab] || tab;
  if (tab === 'export') updateExportPreview();
  if (window.innerWidth <= 768) toggleSidebar();
}

// ===== DASHBOARD =====
function updateDashboard() {
  const colleges = getColleges();
  const courses = getCourses();
  const leads = getLeads();
  const today = new Date().toDateString();
  const todayLeads = leads.filter(l => new Date(l.date).toDateString() === today);

  document.getElementById('statColleges').textContent = colleges.length;
  document.getElementById('statCourses').textContent = courses.length;
  document.getElementById('statLeads').textContent = leads.length;
  document.getElementById('statToday').textContent = todayLeads.length;

  const recentDiv = document.getElementById('recentLeads');
  const recent = [...leads].reverse().slice(0, 5);
  if (recent.length === 0) {
    recentDiv.innerHTML = '<p style="color:#9ca3af;font-size:.82rem">No leads yet.</p>';
  } else {
    recentDiv.innerHTML = recent.map(l => `
      <div class="recent-item">
        <strong>${escHtml(l.name)}</strong>
        ${escHtml(l.phone)} • ${escHtml(l.course || 'General')} <br>
        <span style="color:#9ca3af;font-size:.72rem">${new Date(l.date).toLocaleDateString('en-IN')}</span>
      </div>`).join('');
  }
}

// ===== COLLEGES TABLE =====
function renderCollegesTable() {
  const colleges = getColleges();
  const tbody = document.getElementById('collegesBody');
  if (colleges.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#9ca3af;padding:40px">No colleges yet. Add one!</td></tr>';
    return;
  }
  tbody.innerHTML = colleges.map((c, i) => `
    <tr>
      <td style="font-size:1.5rem">${c.img || '🏫'}</td>
      <td class="cell-name">${escHtml(c.name)}</td>
      <td><span class="badge badge-blue">${escHtml(c.abbr)}</span></td>
      <td><span class="badge badge-green">NAAC ${escHtml(String(c.naac))}</span></td>
      <td style="color:#6b7280;font-size:.8rem">${escHtml(c.location)}</td>
      <td>${c.est}</td>
      <td class="action-btns">
        <button class="btn-sm btn-edit" onclick="editCollege(${i})">✏ Edit</button>
        <button class="btn-sm btn-del" onclick="deleteCollege(${i})">🗑</button>
      </td>
    </tr>`).join('');
}

// ===== ADD / EDIT COLLEGE =====
function openAddCollege(idx = null) {
  const colleges = getColleges();
  const c = idx !== null ? colleges[idx] : {};
  document.getElementById('modalContent').innerHTML = `
    <h2 class="modal-title">${idx !== null ? '✏ Edit' : '➕ Add'} College</h2>
    <div class="modal-form">
      <div class="modal-grid">
        <div class="mf-field"><label>College Name *</label><input id="cf-name" value="${escHtml(c.name||'')}" placeholder="Full college name"></div>
        <div class="mf-field"><label>Abbreviation *</label><input id="cf-abbr" value="${escHtml(c.abbr||'')}" placeholder="e.g. JISCE"></div>
        <div class="mf-field"><label>ID (unique) *</label><input id="cf-id" value="${escHtml(c.id||'')}" placeholder="e.g. jisce"></div>
        <div class="mf-field"><label>NAAC Grade</label><input id="cf-naac" value="${escHtml(String(c.naac||''))}" placeholder="e.g. A+"></div>
        <div class="mf-field"><label>Established Year</label><input id="cf-est" type="number" value="${c.est||''}" placeholder="e.g. 2003"></div>
        <div class="mf-field"><label>Emoji</label><input id="cf-img" value="${escHtml(c.img||'🏫')}" placeholder="🏫"></div>
      </div>
      <div class="mf-field"><label>Location *</label><input id="cf-loc" value="${escHtml(c.location||'')}" placeholder="City, State"></div>
      <div class="modal-actions">
        <button class="btn-outline" onclick="closeModal()">Cancel</button>
        <button class="btn-primary" onclick="saveCollege(${idx})">💾 Save College</button>
      </div>
    </div>`;
  openModal();
}

function editCollege(idx) { openAddCollege(idx); }

function saveCollege(idx) {
  const colleges = getColleges();
  const obj = {
    id: v('cf-id'), name: v('cf-name'), abbr: v('cf-abbr'),
    naac: v('cf-naac'), est: parseInt(v('cf-est')) || 0,
    location: v('cf-loc'), img: v('cf-img') || '🏫'
  };
  if (!obj.name || !obj.abbr || !obj.id) { showToast('❌ Name, Abbr & ID are required'); return; }
  if (idx !== null) colleges[idx] = obj;
  else colleges.push(obj);
  saveColleges(colleges);
  closeModal();
  renderCollegesTable();
  updateDashboard();
  updateExportPreview();
  populateCollegeFilter();
  showToast('✅ College saved!');
}

function deleteCollege(idx) {
  if (!confirm('Delete this college?')) return;
  const colleges = getColleges();
  colleges.splice(idx, 1);
  saveColleges(colleges);
  renderCollegesTable();
  updateDashboard();
  updateExportPreview();
  showToast('🗑 College deleted');
}

// ===== COURSES TABLE =====
function renderCoursesTable(filter = '') {
  let courses = getCourses();
  const colFilter = document.getElementById('courseColFilter')?.value || '';
  if (filter) courses = courses.filter(c => c.name.toLowerCase().includes(filter) || c.type.toLowerCase().includes(filter));
  if (colFilter) courses = courses.filter(c => c.colleges && c.colleges.includes(colFilter));
  const tbody = document.getElementById('coursesBody');
  if (courses.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#9ca3af;padding:40px">No courses found.</td></tr>';
    return;
  }
  tbody.innerHTML = courses.map((c, i) => {
    const origIdx = getCourses().indexOf(c);
    return `<tr>
      <td class="cell-name">${escHtml(c.name)}</td>
      <td><span class="badge badge-blue">${escHtml(c.type)}</span></td>
      <td>${(c.colleges||[]).map(col=>`<span class="badge badge-orange">${col}</span>`).join(' ')}</td>
      <td>${c.duration || '-'} yrs</td>
      <td style="font-weight:700">₹${formatNum(c.totalFee)}</td>
      <td style="font-weight:700;color:#e67e22">₹${formatNum(c.admissionCharge || 0)}</td>
      <td class="action-btns">
        <button class="btn-sm btn-edit" onclick="editCourse(${origIdx})">✏ Edit</button>
        <button class="btn-sm btn-del" onclick="deleteCourse(${origIdx})">🗑</button>
      </td>
    </tr>`;
  }).join('');
}

function filterCoursesTable() {
  const q = document.getElementById('courseSearch').value.toLowerCase();
  renderCoursesTable(q);
}

function populateCollegeFilter() {
  const sel = document.getElementById('courseColFilter');
  if (!sel) return;
  const colleges = getColleges();
  sel.innerHTML = '<option value="">All Colleges</option>' + colleges.map(c => `<option value="${c.abbr}">${c.abbr}</option>`).join('');
}

// ===== ADD / EDIT COURSE =====
function openAddCourse(idx = null) {
  const courses = getCourses();
  const colleges = getColleges();
  const c = idx !== null ? courses[idx] : {};
  const colOptions = colleges.map(col =>
    `<option value="${col.abbr}" ${(c.colleges||[]).includes(col.abbr)?'selected':''}>${col.abbr} — ${col.name}</option>`
  ).join('');
  document.getElementById('modalContent').innerHTML = `
    <h2 class="modal-title">${idx !== null ? '✏ Edit' : '➕ Add'} Course</h2>
    <div class="modal-form">
      <div class="modal-grid">
        <div class="mf-field"><label>Course Name *</label><input id="cr-name" value="${escHtml(c.name||'')}" placeholder="e.g. B.Tech CSE"></div>
        <div class="mf-field"><label>Type *</label><input id="cr-type" value="${escHtml(c.type||'')}" placeholder="e.g. B.Tech"></div>
        <div class="mf-field"><label>Category</label>
          <select id="cr-cat">
            ${['btech','btech-lateral','diploma','mba','mca','bca','bba','engineering','management','computer_applications','science','arts_humanities','law','pharmacy_health','agriculture','education'].map(x=>`<option value="${x}" ${c.category===x?'selected':''}>${x}</option>`).join('')}
          </select>
        </div>
        <div class="mf-field"><label>Duration (years) *</label><input id="cr-dur" type="number" value="${c.duration||\''}" placeholder="4"></div>
        <div class="mf-field"><label>Total Fee (₹) *</label><input id="cr-fee" type="number" value="${c.totalFee||\''}" placeholder="360000"></div>
        <div class="mf-field"><label>🔒 Direct Admission Charge (₹)</label><input id="cr-dac" type="number" value="${c.admissionCharge||0}" placeholder="0" style="border-color:#e67e22"></div>
        <div class="mf-field"><label>Hostel Boys (₹)</label><input id="cr-hb" value="${c.hostelBoys||\''}" placeholder="550000 or N/A"></div>
      </div>
      <div class="mf-field"><label>Hostel Girls (₹)</label><input id="cr-hg" value="${c.hostelGirls||\''}" placeholder="530000 or N/A"></div>
      <div class="mf-field"><label>Colleges (hold Ctrl/Cmd to select multiple) *</label>
        <select id="cr-cols" multiple style="height:120px">${colOptions}</select>
      </div>
      <div class="mf-field"><label>Eligibility</label><textarea id="cr-elig" rows="2" placeholder="Min 60% in 10+2...">${escHtml(c.eligibility||'')}</textarea></div>
      <div class="modal-actions">
        <button class="btn-outline" onclick="closeModal()">Cancel</button>
        <button class="btn-primary" onclick="saveCourse(${idx})">💾 Save Course</button>
      </div>
    </div>`;
  openModal();
}

function editCourse(idx) { openAddCourse(idx); }

function saveCourse(idx) {
  const courses = getCourses();
  const selCols = Array.from(document.getElementById('cr-cols').selectedOptions).map(o => o.value);
  const dur = parseInt(v('cr-dur')) || 4;
  const fee = parseInt(v('cr-fee')) || 0;
  const hb = v('cr-hb');
  const hg = v('cr-hg');

  const obj = {
    name: v('cr-name'), type: v('cr-type'), category: v('cr-cat'),
    colleges: selCols, duration: dur, totalFee: fee,
    admissionCharge: parseInt(v('cr-dac')) || 0,
    hostelBoys: isNaN(parseInt(hb)) ? 'N/A' : parseInt(hb),
    hostelGirls: isNaN(parseInt(hg)) ? 'N/A' : parseInt(hg),
    yearWise: Array(dur).fill(Math.round(fee / dur)),
    hostelBoysYW: Array(dur).fill('N/A'),
    hostelGirlsYW: Array(dur).fill('N/A'),
    eligibility: v('cr-elig')
  };
  if (!obj.name || !obj.type || selCols.length === 0) { showToast('❌ Name, Type & College are required'); return; }
  if (idx !== null) courses[idx] = obj;
  else courses.push(obj);
  saveCourses(courses);
  closeModal();
  renderCoursesTable();
  updateDashboard();
  updateExportPreview();
  showToast('✅ Course saved!');
}

function deleteCourse(idx) {
  if (!confirm('Delete this course?')) return;
  const courses = getCourses();
  courses.splice(idx, 1);
  saveCourses(courses);
  renderCoursesTable();
  updateDashboard();
  updateExportPreview();
  showToast('🗑 Course deleted');
}

// ===== LEADS TABLE =====
function renderLeadsTable() {
  const leads = getLeads();
  const tbody = document.getElementById('leadsBody');
  if (leads.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#9ca3af;padding:40px">No leads yet. When students fill the contact form, they will appear here.</td></tr>';
    return;
  }
  tbody.innerHTML = [...leads].reverse().map((l, i) => `
    <tr>
      <td style="color:#9ca3af">${leads.length - i}</td>
      <td class="cell-name">${escHtml(l.name)}</td>
      <td>${escHtml(l.phone)}</td>
      <td><span class="badge badge-blue">${escHtml(l.course||'General')}</span></td>
      <td style="font-size:.78rem;color:#6b7280;max-width:200px">${escHtml((l.message||'').substring(0,60))}${(l.message||'').length>60?'...':''}</td>
      <td style="font-size:.78rem;white-space:nowrap">${new Date(l.date).toLocaleDateString('en-IN')}</td>
      <td><a class="btn-sm btn-edit" href="https://wa.me/919546201805?text=${encodeURIComponent(`New Lead%0AName: ${l.name}%0APhone: ${l.phone}%0ACourse: ${l.course||'General'}%0AMessage: ${l.message||'-'}%0ADate: ${new Date(l.date).toLocaleDateString('en-IN')}`)}" target="_blank">📲 Enquiry</a></td>
      <td><button class="btn-sm btn-del" onclick="deleteLead(${leads.length-1-i})">🗑</button></td>
    </tr>`).join('');
}

function deleteLead(idx) {
  const leads = getLeads();
  leads.splice(idx, 1);
  saveLeads(leads);
  renderLeadsTable();
  updateDashboard();
  showToast('🗑 Lead deleted');
}

function clearLeads() {
  if (!confirm('Delete ALL leads? This cannot be undone!')) return;
  saveLeads([]);
  renderLeadsTable();
  updateDashboard();
  showToast('🗑 All leads cleared');
}

function exportLeadsCSV() {
  const leads = getLeads();
  if (!leads.length) { showToast('No leads to export'); return; }
  const rows = [['#','Name','Phone','Course','Message','Date']];
  leads.forEach((l, i) => rows.push([i+1, l.name, l.phone, l.course||'', l.message||'', new Date(l.date).toLocaleDateString()]));
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  downloadFile('eduorbit_leads.csv', csv, 'text/csv');
  showToast('📥 CSV downloaded!');
}

// ===== SEND TODAY'S LEADS REPORT TO WHATSAPP =====
function sendDailyReportWA() {
  const leads = getLeads();
  const today = new Date().toDateString();
  const todayLeads = leads.filter(l => new Date(l.date).toDateString() === today);

  if (todayLeads.length === 0) {
    showToast('No leads today to send!');
    return;
  }

  let msg = `📊 *EduOrbit Daily Lead Report*\n`;
  msg += `📅 Date: ${new Date().toLocaleDateString('en-IN')}\n`;
  msg += `👥 Total Leads Today: *${todayLeads.length}*\n\n`;

  todayLeads.forEach((l, i) => {
    msg += `*${i+1}. ${l.name}*\n`;
    msg += `📞 ${l.phone}\n`;
    msg += `📚 ${l.course || 'General'}\n`;
    if (l.message) msg += `💬 ${l.message.substring(0, 60)}\n`;
    msg += `\n`;
  });

  msg += `_Sent from EduOrbit Admin Panel_`;

  const waUrl = `https://wa.me/919546201805?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
  showToast('📲 Opening WhatsApp with today\'s report!');
}

// ===== EXPORT DATA.JS =====
function generateDataJS() {
  const colleges = getColleges();
  const courses = getCourses();
  const c = JSON.stringify(colleges, null, 2).replace(/"([^"]+)":/g, '$1:');
  const cr = JSON.stringify(courses, null, 2).replace(/"([^"]+)":/g, '$1:');
  return `// EduOrbit — College & Fee Structure Data\n// Updated: ${new Date().toLocaleString()}\n\nconst COLLEGES = ${c};\n\nconst COURSES = ${cr};\n`;
}

function updateExportPreview() {
  const el = document.getElementById('exportPreview');
  if (el) el.value = generateDataJS();
}

function exportDataJS() {
  const content = generateDataJS();
  downloadFile('data.js', content, 'text/javascript');
  showToast('✅ data.js downloaded! Replace file in your project.');
}

function copyExport() {
  const el = document.getElementById('exportPreview');
  el.select();
  document.execCommand('copy');
  showToast('📋 Copied to clipboard!');
}

// ===== MODAL =====
function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
}
function closeModal(e) {
  if (e && e.target !== document.getElementById('modalOverlay')) return;
  document.getElementById('modalOverlay').classList.remove('open');
}

// ===== SIDEBAR TOGGLE (mobile) =====
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ===== HELPERS =====
function v(id) { return (document.getElementById(id)?.value || '').trim(); }
function escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function formatNum(n) { return (n||0).toLocaleString('en-IN'); }
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
function downloadFile(name, content, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type }));
  a.download = name;
  a.click();
}

// ===== SAVE LEADS FROM CONTACT FORM (inject this into main site) =====
// This function is called from app.js when contact form is submitted
window.saveAdminLead = function(lead) {
  const leads = getLeads();
  leads.push({ ...lead, date: new Date().toISOString() });
  saveLeads(leads);
};
