// ===== ARIA — FULL POWER CEO AI =====
const GEMINI_MODEL = 'gemini-pro';
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models/';

const SYSTEM_PROMPT = `You are ARIA, the Virtual CEO and Chief Intelligence Officer of EduOrbit Educational Counselling.

COMPANY PROFILE:
- Name: EduOrbit Educational Counselling
- Owner: Priyanshu (you report to him)
- Phone: +91 9546201805
- Email: eduorbit.admissions@gmail.com
- Website: eduorbit.in
- Business: Student admission consultancy — we help students get admitted to private colleges and earn commission from colleges
- Revenue Model: Commission per admitted student (₹8,000–₹30,000 per student depending on course)
- Target Students: Bihar, Jharkhand, West Bengal, Madhya Pradesh, UP students
- Target Courses: B.Tech, MBA, BBA, BCA, MCA, Diploma, Law, Agriculture, Allied Health Sciences

PARTNER COLLEGES:
- JIS College of Engineering, Kolkata (B.Tech focus)
- Narula Institute of Technology, Kolkata
- GNIT, Kolkata
- Dr Sudhir Chandra Sur Institute, Kolkata
- Asansol Engineering College
- Brainware University, Kolkata (BCA, B.Tech, BBA)
- Adamas University, Kolkata
- IES University, Bhopal (Medical, Engineering, Education)
- Swami Vivekananda University, Barrackpore (All courses)

LOAN SCHEMES WE HELP WITH (FREE):
- Bihar Student Credit Card (DRCC): Up to ₹4 Lakh, 4% interest (1% for girls)
- Jharkhand Guruji Student Credit Card: Up to ₹15 Lakh, collateral-free
- MP Education Loan Schemes

YOUR ROLE AS CEO:
1. Think strategically about growing EduOrbit's revenue and lead base
2. Write marketing content (WhatsApp messages, Instagram captions, emails)
3. Create action plans and scripts
4. Analyze leads and suggest follow-up strategies
5. Draft professional business communications
6. Suggest revenue growth strategies

COMMUNICATION STYLE:
- Respond in Hinglish (mix of Hindi and English) when appropriate
- Be direct and actionable — no fluff
- Always include specific numbers, scripts, and ready-to-use content
- Format responses with clear headers, bullet points, and copy-paste ready text
- Use markdown formatting (** for bold, ## for headers, - for bullets)

IMPORTANT: Always end responses with a specific next action Priyanshu should take RIGHT NOW.`;

// ===== BOOT =====
let apiKey = localStorage.getItem('aria_api_key') || '';
let chatHistory = [];
let isTyping = false;

window.addEventListener('load', () => {
  let p = 0;
  const bar = document.getElementById('bootProgress');
  const iv = setInterval(() => {
    p += Math.random() * 15 + 5;
    if (p >= 100) {
      p = 100; clearInterval(iv);
      setTimeout(() => {
        document.getElementById('bootScreen').style.display = 'none';
        if (!apiKey) {
          document.getElementById('setupScreen').style.display = 'flex';
        } else {
          launchApp();
        }
      }, 500);
    }
    bar.style.width = p + '%';
  }, 100);
});

function saveApiKey() {
  const key = document.getElementById('apiKeyInput').value.trim();
  if (!key || !key.startsWith('AIza')) { showToast('❌ Invalid key. Should start with AIza...'); return; }
  localStorage.setItem('aria_api_key', key);
  apiKey = key;
  document.getElementById('setupScreen').style.display = 'none';
  launchApp();
}

function resetKey() {
  localStorage.removeItem('aria_api_key');
  apiKey = '';
  showToast('🔑 API key removed. Refresh to re-enter.');
  setTimeout(() => location.reload(), 1500);
}

function launchApp() {
  document.getElementById('app').style.display = 'flex';
  updateStats();
  renderPipeline();
  renderCampaigns();
}

function updateStats() {
  const leads = getLeads();
  const today = leads.filter(l => new Date(l.date).toDateString() === new Date().toDateString());
  document.getElementById('sL').textContent = leads.length;
  document.getElementById('sT').textContent = today.length;
  const cols = JSON.parse(localStorage.getItem('eo_colleges') || 'null');
  const crs = JSON.parse(localStorage.getItem('eo_courses') || 'null');
  document.getElementById('sC').textContent = cols ? cols.length : (typeof COLLEGES !== 'undefined' ? COLLEGES.length : 9);
  document.getElementById('sCr').textContent = crs ? crs.length : (typeof COURSES !== 'undefined' ? COURSES.length : 45);
}

// ===== DATA =====
function getLeads() { return JSON.parse(localStorage.getItem('eo_leads') || '[]'); }

// ===== MODE SWITCH =====
function switchMode(mode, btn) {
  document.querySelectorAll('.mode-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
  document.getElementById('mode-' + mode).classList.add('active');
  if (btn) btn.classList.add('active');
}

function toggleMenu() { document.getElementById('sidebar').classList.toggle('open'); }

// ===== GEMINI AI CALL =====
async function callGemini(userMessage) {
  chatHistory.push({ role: 'user', parts: [{ text: userMessage }] });
  const body = {
    contents: chatHistory,
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    generationConfig: { temperature: 0.8, maxOutputTokens: 2048 }
  };
  const resp = await fetch(`${API_BASE}${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.error?.message || 'API Error');
  }
  const data = await resp.json();
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
  chatHistory.push({ role: 'model', parts: [{ text: reply }] });
  return reply;
}

// ===== CHAT =====
function handleKey(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }
function autoResize(el) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 140) + 'px'; }
function sendTask(text) { document.getElementById('userInput').value = text; sendMessage(); }

async function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (!text || isTyping) return;
  input.value = ''; input.style.height = 'auto';
  const wc = document.querySelector('.welcome-card');
  if (wc) wc.remove();
  appendMsg('user', text);
  showTyping(); isTyping = true;
  document.getElementById('sendBtn').disabled = true;

  // Add lead context to message
  const leads = getLeads();
  const contextMsg = `${text}\n\n[CONTEXT: EduOrbit currently has ${leads.length} total leads. Today's leads: ${leads.filter(l=>new Date(l.date).toDateString()===new Date().toDateString()).length}. Recent leads: ${leads.slice(-3).map(l=>`${l.name} (${l.course||'General'})`).join(', ') || 'None'}]`;

  try {
    const reply = await callGemini(contextMsg);
    hideTyping();
    appendMsg('bot', reply);
  } catch (err) {
    hideTyping();
    if (err.message.includes('API_KEY_INVALID') || err.message.includes('401')) {
      appendMsg('bot', '❌ **API Key Invalid.** Please click "Change API Key" and enter a valid Gemini API key from [aistudio.google.com](https://aistudio.google.com/app/apikey)');
    } else {
      appendMsg('bot', `❌ Error: ${err.message}. Check your internet connection or API key.`);
    }
  }
  isTyping = false;
  document.getElementById('sendBtn').disabled = false;
  updateStats();
}

function appendMsg(role, text) {
  const isBot = role === 'bot';
  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.innerHTML = `
    <div class="msg-avatar">${isBot ? '🧠' : '👤'}</div>
    <div class="msg-body">
      <div class="msg-name">${isBot ? 'ARIA — CEO Intelligence' : 'You'}</div>
      <div class="msg-bubble">${isBot ? formatMd(text) : escHtml(text)}</div>
      <div class="msg-time">${time}</div>
    </div>`;
  document.getElementById('chatArea').appendChild(div);
  document.getElementById('chatArea').scrollTop = 99999;
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'msg bot'; div.id = 'typingMsg';
  div.innerHTML = `<div class="msg-avatar">🧠</div><div class="msg-body"><div class="msg-name">ARIA — Thinking...</div><div class="typing-indicator"><span></span><span></span><span></span></div></div>`;
  document.getElementById('chatArea').appendChild(div);
  document.getElementById('chatArea').scrollTop = 99999;
}
function hideTyping() { const el = document.getElementById('typingMsg'); if (el) el.remove(); }

function clearChat() {
  chatHistory = [];
  const ca = document.getElementById('chatArea');
  ca.innerHTML = `<div class="welcome-card"><div class="welcome-avatar">🧠</div><h1>New Chat Started</h1><p>ARIA ready for your next command, Chief.</p></div>`;
}

// ===== LEAD ENGINE =====
async function runLeadEngine(type) {
  const prompts = {
    whatsapp: 'Generate 5 different high-converting WhatsApp broadcast messages for EduOrbit. Each message should target different angles: urgency, loan/free education, results season, direct admission, testimonial. Make them ready to copy-paste. Include emojis and WhatsApp formatting (*bold*).',
    instagram: 'Create a complete 7-day Instagram content plan for EduOrbit. For each day: post type (reel/image/story), hook line, full caption, 10 hashtags. Make it viral and conversion-focused for Bihar/JH/WB students.',
    email: 'Write 3 cold email templates for EduOrbit: 1) To a college admission director for partnership, 2) To a student lead nurturing them, 3) To a coaching center for referral partnership. Include subject lines.',
    sms: 'Write 5 SMS messages (under 160 chars each) for EduOrbit for admission season. Different angles: loan, last seats, free counselling, board results, callback offer.',
    referral: 'Design a complete student referral program for EduOrbit. Include: incentive structure, referral script for students to say to friends, tracking system, WhatsApp message template students should forward.',
    coaching: 'Write a complete pitch package for approaching coaching centers as EduOrbit partners. Include: intro email, phone script, meeting agenda, commission offer, agreement terms to propose.'
  };
  const titles = {
    whatsapp: '💬 WhatsApp Campaign Messages',
    instagram: '📱 Instagram 7-Day Plan',
    email: '📧 Email Templates',
    sms: '📩 SMS Campaign',
    referral: '🤝 Referral Program',
    coaching: '🏫 Coaching Center Pitch'
  };

  const output = document.getElementById('engineOutput');
  const body = document.getElementById('engineOutputBody');
  const title = document.getElementById('engineOutputTitle');
  output.style.display = 'block';
  title.textContent = titles[type];
  body.innerHTML = '<div style="color:#64748B;padding:20px;text-align:center">🧠 ARIA is generating... please wait</div>';
  output.scrollIntoView({ behavior: 'smooth' });

  try {
    const leads = getLeads();
    const ctx = `${prompts[type]}\n\n[EduOrbit Context: ${leads.length} leads captured, targeting Bihar/Jharkhand/WB students, phone: +91 9546201805]`;
    const resp = await fetch(`${API_BASE}${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: SYSTEM_PROMPT + '\n\n' + ctx }] }],
        generationConfig: { temperature: 0.9, maxOutputTokens: 2048 }
      })
    });
    const data = await resp.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Error generating content';
    body.innerHTML = formatMd(text);
  } catch (e) {
    body.innerHTML = `<span style="color:#EF4444">Error: ${e.message}</span>`;
  }
}

function copyEngineOutput() {
  const text = document.getElementById('engineOutputBody').innerText;
  navigator.clipboard.writeText(text).then(() => showToast('📋 Copied to clipboard!'));
}

// ===== PIPELINE =====
const STAGES = ['new','contacted','interested','admitted'];
const STAGE_LABELS = { new:'🆕 New Leads', contacted:'📞 Contacted', interested:'✅ Interested', admitted:'🎓 Admitted' };

function renderPipeline() {
  const leads = getLeads();
  const cols = document.getElementById('pipelineCols');
  cols.innerHTML = STAGES.map(stage => `
    <div class="pipeline-col ${stage}">
      <div class="pipeline-col-title">${STAGE_LABELS[stage]} (${leads.filter(l=>(l.stage||'new')===stage).length})</div>
      <div id="pipe-${stage}">
        ${leads.filter(l=>(l.stage||'new')===stage).map((l,i) => `
          <div class="lead-card">
            <strong>${escHtml(l.name||'Unknown')}</strong>
            <span>${escHtml(l.phone||'')} • ${escHtml(l.course||'General')}</span><br>
            <span style="font-size:.68rem;color:#475569">${new Date(l.date).toLocaleDateString('en-IN')}</span>
            <div class="lead-card-actions">
              <a href="tel:${l.phone}" class="lca lca-call">📞 Call</a>
              <button class="lca lca-move" onclick="moveLead('${l.date}','${stage}')">Move →</button>
            </div>
          </div>`).join('') || '<p style="color:#475569;font-size:.75rem;padding:8px">No leads</p>'}
      </div>
    </div>`).join('');
}

function moveLead(dateStr, currentStage) {
  const leads = getLeads();
  const idx = leads.findIndex(l => l.date === dateStr);
  if (idx === -1) return;
  const nextStage = STAGES[STAGES.indexOf(currentStage) + 1] || 'admitted';
  leads[idx].stage = nextStage;
  localStorage.setItem('eo_leads', JSON.stringify(leads));
  renderPipeline(); updateStats();
  showToast(`✅ Lead moved to ${STAGE_LABELS[nextStage]}`);
}

// ===== CAMPAIGNS =====
function renderCampaigns() {
  const campaigns = JSON.parse(localStorage.getItem('aria_campaigns') || '[]');
  const list = document.getElementById('campaignsList');
  if (!campaigns.length) {
    list.innerHTML = `<div style="text-align:center;padding:60px 20px;color:#475569"><div style="font-size:2rem;margin-bottom:12px">📣</div><p>No campaigns yet. Click "+ New Campaign" to let ARIA generate one.</p></div>`;
    return;
  }
  list.innerHTML = campaigns.map((c, i) => `
    <div class="campaign-card">
      <h3>${c.title}</h3>
      <p>${c.description}</p>
      <div class="campaign-meta">
        <span class="cmeta">📅 ${c.date}</span>
        <span class="cmeta">📊 ${c.type}</span>
        <span class="cmeta" style="color:var(--green)">✅ Active</span>
      </div>
    </div>`).join('');
}

async function createCampaign() {
  const type = prompt('Campaign type? (whatsapp / instagram / email / referral)');
  if (!type) return;
  showToast('🧠 ARIA generating campaign...');
  try {
    const prompt = `Create a 7-day lead generation campaign for EduOrbit focused on ${type}. Give it a campaign name, description, daily action plan, and expected results. Be specific and ready-to-execute.`;
    const resp = await fetch(`${API_BASE}${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: SYSTEM_PROMPT + '\n\n' + prompt }] }], generationConfig: { temperature: 0.8, maxOutputTokens: 1024 } })
    });
    const data = await resp.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const campaigns = JSON.parse(localStorage.getItem('aria_campaigns') || '[]');
    campaigns.unshift({ title: `${type.toUpperCase()} Campaign — ${new Date().toLocaleDateString()}`, description: text.substring(0, 200) + '...', type, date: new Date().toLocaleDateString('en-IN'), full: text });
    localStorage.setItem('aria_campaigns', JSON.stringify(campaigns));
    renderCampaigns();
    showToast('✅ Campaign created by ARIA!');
  } catch (e) { showToast('❌ Error: ' + e.message); }
}

// ===== UTILS =====
function formatMd(text) {
  return text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.*?)\*/g,'<em>$1</em>')
    .replace(/^### (.*)/gm,'<h3>$1</h3>')
    .replace(/^## (.*)/gm,'<h3>$1</h3>')
    .replace(/^# (.*)/gm,'<h3>$1</h3>')
    .replace(/^- (.*)/gm,'<li>$1</li>')
    .replace(/^(\d+)\. (.*)/gm,'<li>$2</li>')
    .replace(/`(.*?)`/g,'<code>$1</code>')
    .replace(/\n\n/g,'<br><br>')
    .replace(/\n/g,'<br>');
}

function escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
