// ===== ARIA — EduOrbit Virtual CEO AI =====
const COMPANY = {
  name: 'EduOrbit',
  phone: '+91 9546201805',
  email: 'eduorbit.admissions@gmail.com',
  whatsapp: 'https://wa.me/919546201805',
  website: 'eduorbit.in',
  model: 'Commission per admitted student from partner colleges',
  states: ['Bihar', 'Jharkhand', 'West Bengal', 'Madhya Pradesh', 'UP'],
  loanSchemes: ['Bihar DRCC (₹4L)', 'Jharkhand Guruji (₹15L)', 'MP Schemes'],
  colleges: ['JIS Group', 'Brainware University', 'Adamas University', 'NIT Kolkata', 'GNIT', 'Asansol Engg College', 'IES Bhopal', 'SVU Barrackpore'],
  courses: ['B.Tech', 'MBA', 'BBA', 'BCA', 'MCA', 'Diploma', 'Law', 'Agriculture', 'Allied Health'],
};

// ===== BOOT =====
window.addEventListener('load', () => {
  let prog = 0;
  const bar = document.getElementById('bootProgress');
  const iv = setInterval(() => {
    prog += Math.random() * 18;
    if (prog >= 100) { prog = 100; clearInterval(iv); setTimeout(launchApp, 400); }
    bar.style.width = prog + '%';
  }, 120);
});

function launchApp() {
  document.getElementById('bootScreen').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  loadSidebarStats();
}

function loadSidebarStats() {
  const leads = JSON.parse(localStorage.getItem('eo_leads') || '[]');
  const cols = JSON.parse(localStorage.getItem('eo_colleges') || 'null');
  const crs = JSON.parse(localStorage.getItem('eo_courses') || 'null');
  document.getElementById('sideLeads').textContent = leads.length;
  document.getElementById('sideCols').textContent = cols ? cols.length : (typeof COLLEGES !== 'undefined' ? COLLEGES.length : 8);
  document.getElementById('sideCourses').textContent = crs ? crs.length : (typeof COURSES !== 'undefined' ? COURSES.length : 40);
}

// ===== CHAT ENGINE =====
const chatArea = document.getElementById('chatArea');
let isTyping = false;

function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 160) + 'px';
}

function sendTask(text) {
  document.getElementById('userInput').value = text;
  sendMessage();
}

function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (!text || isTyping) return;
  input.value = '';
  input.style.height = 'auto';

  // Remove welcome card
  const wc = document.querySelector('.welcome-card');
  if (wc) wc.remove();

  appendMsg('user', text);
  showTyping();
  isTyping = true;
  document.getElementById('sendBtn').disabled = true;

  const delay = 800 + Math.random() * 1200;
  setTimeout(() => {
    hideTyping();
    const reply = generateReply(text);
    appendMsg('bot', reply);
    isTyping = false;
    document.getElementById('sendBtn').disabled = false;
    loadSidebarStats();
  }, delay);
}

function appendMsg(role, text) {
  const isBot = role === 'bot';
  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.innerHTML = `
    <div class="msg-avatar">${isBot ? '🧠' : '👤'}</div>
    <div class="msg-body">
      <div class="msg-name">${isBot ? 'ARIA — CEO' : 'You'}</div>
      <div class="msg-bubble">${isBot ? formatResponse(text) : escHtml(text)}</div>
      <div class="msg-time">${time}</div>
    </div>`;
  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
}

let typingEl = null;
function showTyping() {
  const wrap = document.createElement('div');
  wrap.className = 'msg bot';
  wrap.id = 'typingMsg';
  wrap.innerHTML = `<div class="msg-avatar">🧠</div><div class="msg-body"><div class="msg-name">ARIA — CEO</div><div class="typing-indicator"><span></span><span></span><span></span></div></div>`;
  chatArea.appendChild(wrap);
  chatArea.scrollTop = chatArea.scrollHeight;
}
function hideTyping() {
  const el = document.getElementById('typingMsg');
  if (el) el.remove();
}

function clearChat() {
  chatArea.innerHTML = '';
  chatArea.innerHTML = `<div class="welcome-card"><div class="welcome-avatar">🧠</div><h1>Chat Cleared</h1><p>Ready for your next command, Chief.</p></div>`;
}

function toggleMenu() {
  document.querySelector('.sidebar').classList.toggle('open');
}

// ===== FORMAT RESPONSE =====
function formatResponse(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^### (.*)/gm, '<h3>$1</h3>')
    .replace(/^## (.*)/gm, '<h3>$1</h3>')
    .replace(/^- (.*)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
    .replace(/💡(.*)/g, '<div class="highlight">💡$1</div>');
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ===== ARIA BRAIN — CEO KNOWLEDGE BASE =====
function generateReply(input) {
  const q = input.toLowerCase();
  const leads = JSON.parse(localStorage.getItem('eo_leads') || '[]');
  const today = leads.filter(l => new Date(l.date).toDateString() === new Date().toDateString());

  // --- DAILY REPORT ---
  if (q.includes('report') || q.includes('today') || q.includes('status')) {
    return `### 📊 EduOrbit Daily Business Report
**Date:** ${new Date().toLocaleDateString('en-IN', {weekday:'long', day:'numeric', month:'long', year:'numeric'})}

### Lead Performance
- **Total Leads Captured:** ${leads.length}
- **Today's New Leads:** ${today.length}
- **Pending Follow-ups:** ${leads.filter(l=>!l.called).length || leads.length}

### Revenue Opportunity
- Average commission per admission: **₹8,000–₹25,000**
- If 10% of ${leads.length} leads convert → **₹${(leads.length * 0.1 * 15000).toLocaleString('en-IN')} potential revenue**

### Top Priority Actions Today
- 📞 Call all ${today.length} new leads within 2 hours
- 💬 Follow up on yesterday's leads via WhatsApp
- 📱 Post 1 Instagram reel about admissions

💡 **ARIA Insight:** Bihar DRCC loan season is active — push this angle to every student from Bihar. Converts 3x better.`;
  }

  // --- WHATSAPP MESSAGE ---
  if (q.includes('whatsapp') || (q.includes('message') && q.includes('marketing'))) {
    const course = q.includes('btech') ? 'B.Tech' : q.includes('mba') ? 'MBA' : q.includes('bca') ? 'BCA' : 'Admissions 2026';
    return `### ✍️ WhatsApp Marketing Messages for ${course}

**Message 1 — Urgency:**
---
🎓 *EduOrbit — Admissions 2026 Open!*

Seats filling fast for ${course} in top colleges!
✅ Direct Private Admission
✅ No Donation / No Capitation
✅ Bihar DRCC Loan Available (₹4 Lakh)
✅ 100% Free Counselling

📞 Call/WhatsApp: *${COMPANY.phone}*
🌐 ${COMPANY.website}

⏳ Limited seats — Reply NOW with your marks!
---

**Message 2 — Emotional:**
---
💭 Ek sapna hai… Ek college hai… Bas ek sahi counsellor chahiye.

EduOrbit aapke saath hai — ${course} ke liye *direct admission*, *loan support*, aur *free guidance*.

👉 Abhi WhatsApp karo: ${COMPANY.phone}
---

💡 **Best time to send:** 8–9 AM and 7–9 PM. Tuesday–Thursday best conversion rate.`;
  }

  // --- EMAIL DRAFT ---
  if (q.includes('email') || q.includes('draft') && q.includes('college')) {
    return `### 📧 Professional Email Draft — College Partnership

**Subject:** Partnership Proposal for Student Admissions 2026-27 | EduOrbit Counselling

---
Dear [Principal/Admission Director Name],

I hope this message finds you well. I am writing on behalf of **EduOrbit Educational Counselling**, a growing student admission consultancy serving students across Bihar, Jharkhand, West Bengal, and Madhya Pradesh.

We currently work with 1,500+ students annually and are looking to strengthen our institutional partnerships for the 2026-27 academic session.

**What We Offer:**
- Pre-qualified student leads actively seeking admissions
- Students from Bihar DRCC & Jharkhand Guruji loan schemes
- Zero marketing cost to your institution

**What We Request:**
- Transparent commission structure per enrolled student
- Dedicated admission liaison contact
- Marketing collaterals and campus visit access

We believe a partnership would be mutually beneficial. I would love to schedule a call at your convenience.

Warm Regards,
**EduOrbit Admissions Team**
📞 ${COMPANY.phone} | ✉️ ${COMPANY.email}
---
💡 Send this to at least 5 new colleges this week. Even 1 new tie-up = massive revenue growth.`;
  }

  // --- REVENUE STRATEGY ---
  if (q.includes('revenue') || q.includes('earn') || q.includes('money') || q.includes('income')) {
    return `### 💰 5 Revenue Strategies for EduOrbit — Right Now

**1. 🎯 Focus on High-Commission Courses**
MBA & B.Tech pay ₹15,000–₹30,000 per admission. Prioritize these over Diploma.

**2. 📱 Instagram Reels Daily**
Post 1 reel daily showing real student journeys, fee breakdowns, loan success stories. Bihar/JH students watch 3x more reels than stories.

**3. 🏪 Target Coaching Centers**
Visit 10th/12th coaching centers in your city. Offer ₹2,000–₹5,000 referral per admitted student. They send 20–50 leads/month.

**4. 💳 Bihar DRCC Season Push**
Right now is DRCC loan application season. Run targeted WhatsApp broadcast: "DRCC loan le lo, B.Tech karo FREE mein" — this converts 40% better.

**5. 🤝 Student Ambassador Program**
Give each admitted student ₹1,000–₹2,000 if they refer 1 friend who gets admitted. Word of mouth is your cheapest channel.

💡 **ARIA Target:** If you do all 5 this month, estimated revenue = **₹1.5L–₹3L** minimum.`;
  }

  // --- LEAD GENERATION PLAN ---
  if (q.includes('lead') && (q.includes('plan') || q.includes('generation') || q.includes('generate'))) {
    return `### 🎯 Complete Lead Generation Plan — EduOrbit

### Phase 1: Digital (Week 1-2)
- **Instagram:** 1 reel/day. Content: Fee reveal, college tour, student story, loan guide
- **WhatsApp Broadcast:** Send to 200 contacts about admission deadlines
- **Website Popup:** Already live! Captures name + phone automatically

### Phase 2: Offline (Week 2-3)
- Visit 5 local coaching centers (Class 11/12)
- Put standee at DRCC office (Bihar students come here for loans!)
- Distribute 500 flyers near exam centers after board results

### Phase 3: Referral (Ongoing)
- Every admitted student → referral card → ₹1,500 bonus if they refer
- Create WhatsApp group of past students for updates

### 📊 Expected Results
| Channel | Expected Leads/Month |
|---------|---------------------|
| Instagram | 30-50 |
| WhatsApp Broadcast | 20-40 |
| Coaching Centers | 50-80 |
| Website Popup | 15-25 |
| **Total** | **115-195** |

💡 **ARIA says:** Even at 5% conversion at ₹12,000 avg commission = **₹69,000–₹1.17L/month**`;
  }

  // --- SOCIAL MEDIA / INSTAGRAM ---
  if (q.includes('instagram') || q.includes('social media') || q.includes('content') || q.includes('caption')) {
    return `### 📱 EduOrbit Instagram Content Plan — This Week

**Monday — Fee Reveal Reel:**
🎬 Show fee table. Caption:
*"B.Tech kitna expensive hai? Dekho asli data 👇 (Bihar walo ke liye DRCC loan bhi hai!)"*
Hashtags: #BTech2026 #CollegeAdmissions #Bihar #EduOrbit

**Tuesday — Student Story:**
🎬 Short testimonial video (even text-based). Caption:
*"Raju ne 65% mein B.Tech crack kiya — direct admission, zero donation 🔥"*

**Wednesday — Loan Awareness:**
🎬 Explain DRCC/Guruji in 30 seconds. Caption:
*"4 Lakh education loan — 1% interest for girls 😮 Full guide in bio link!"*

**Thursday — College Tour:**
📸 College campus photo. Caption:
*"Yeh campus tumhara ho sakta hai 🎓 Counselling bilkul free — link in bio"*

**Friday — CTA Post:**
🎬 Direct call to action. Caption:
*"Kal board result aa raha hai? Ghabrana mat — EduOrbit hai na 📞 ${COMPANY.phone}"*

💡 **Post timing:** 7–9 PM daily. Use Reels > Photos. Tag location: Bihar, Ranchi, Patna, Kolkata.`;
  }

  // --- CALL SCRIPT ---
  if (q.includes('call') && (q.includes('script') || q.includes('student') || q.includes('lead'))) {
    return `### 📞 Student Lead Call Script — EduOrbit

**[Opening — First 10 seconds]**
*"Hello [Name] bhai/didi! Main EduOrbit se bol raha hoon — aapne hamare website pe admission inquiry ki thi. Kya abhi 2 minute baat kar sakte hain?"*

**[Build Rapport — 20 seconds]**
*"Aap kaunse course mein interested hain? Aur 12th mein kitna percentage tha?"*

**[Value Deliver — 30 seconds]**
*"Perfect! Aapke marks mein [COLLEGE NAME] mein direct admission possible hai. Total fee sirf [AMOUNT] hai — aur Bihar ke hain toh DRCC loan mein ₹4 lakh tak mil sakta hai, basically free mein padhai!"*

**[Handle Objection — Fee]**
*"Fee zyada lag rahi hai? Bilkul samjha — isliye toh hum loan karwa dete hain. Aapko ek bhi rupya pocket se nahi lagega."*

**[Close]**
*"Ek kaam karo — kal hamare office aao ya WhatsApp pe documents bhejo. Main personally sab handle karunga. Okay?"*

**[Follow-up]**
Send WhatsApp immediately after call:
*"[Name] bhai, bahut achha laga baat karke! Yeh dekho — [College Name] ki complete fee details: [Website Link]"*

💡 **Golden Rule:** Call within 5 minutes of lead capture. Speed = Trust.`;
  }

  // --- COLLEGE PITCH ---
  if (q.includes('pitch') || (q.includes('approach') && q.includes('college'))) {
    return `### 🤝 College Partnership Pitch Script

**Step 1 — LinkedIn/Email Approach First:**
Find the Admission Director on LinkedIn → Connect → Send message:
*"Hi [Name], I run EduOrbit, a student counselling firm. We placed 150+ students last year in private colleges. Would love to discuss a partnership for 2026-27."*

**Step 2 — Phone Call:**
*"Sir/Ma'am, main EduOrbit se Priyanshu bol raha hoon. Hum Bihar, Jharkhand, WB se qualified students refer karte hain — DRCC loan wale. Kya hum 15 minute mein partner program discuss kar sakte hain?"*

**Step 3 — Meeting Questions to Ask:**
- Per student commission kitna milega?
- Minimum enrollment guarantee chahiye?
- Brochures aur marketing material milega?
- Dedicated admission POC kaun hoga?

**Step 4 — Send Proposal:**
After meeting → Send our email template + 1 page company profile

**Target Colleges This Month:**
${COMPANY.colleges.map(c => `- ${c}`).join('\n')}

💡 **ARIA Strategy:** Start with colleges where we already have students. Ask for commission increase before adding new colleges.`;
  }

  // --- BUSINESS REVIEW ---
  if (q.includes('review') || q.includes('analyze') || q.includes('business model')) {
    return `### 📋 EduOrbit Business Review — ARIA Analysis

### Strengths ✅
- **Zero student cost** model builds massive trust
- **DRCC/Guruji loan expertise** — rare competitive edge
- **Digital presence** — website with eligibility checker is unique
- Multi-state coverage (Bihar, JH, WB, MP, UP)

### Weaknesses ⚠️
- **No CRM system** — leads tracked manually (high dropout)
- **No testimonial videos** yet — trust factor weak
- **Single person operation** — scaling risk

### Opportunities 🚀
- Board result season (May-June) = 10x lead volume possible
- **Emerging demand:** Allied Health, Law, Agriculture — less competition
- **SVU + IES** — new colleges = new commission streams

### Immediate Fixes
1. Create WhatsApp group for all past admitted students
2. Record 3 student testimonial videos this week
3. Set up Google My Business for EduOrbit (free, huge local SEO boost)

💡 **ARIA Verdict:** Core model is solid. Growth bottleneck = lead volume + follow-up speed. Fix these 2 → revenue doubles in 60 days.`;
  }

  // --- RISK ANALYSIS ---
  if (q.includes('risk') || q.includes('problem') || q.includes('challenge')) {
    return `### ⚠️ EduOrbit Risk Analysis & Mitigation

### Risk 1: Board Results Delay 🕐
**Impact:** Students wait, may choose other counsellors
**Fix:** Start capturing leads NOW before results. Pre-book students.

### Risk 2: College Changes Commission 💰
**Impact:** Revenue cut without warning
**Fix:** Never rely on 1-2 colleges. Have minimum 8-10 active partners.

### Risk 3: Student Takes Loan But Doesn't Join 😬
**Impact:** Wasted time, no commission
**Fix:** Collect ₹500–₹1,000 "documentation fee" (refundable on joining) to ensure commitment.

### Risk 4: Competition from Other Consultants
**Impact:** Lead loss
**Fix:** Our DRCC/loan expertise is unique. Double down on this angle in all marketing.

### Risk 5: No Follow-up System 📵
**Impact:** Hot leads go cold
**Fix:** Call within 5 min → WhatsApp in 1 hour → Call again in 24 hours → Final follow-up Day 3

💡 **ARIA Priority:** Risk 5 is your biggest current problem. Set phone reminders for every new lead.`;
  }

  // --- PRIORITIES ---
  if (q.includes('priorit') || q.includes('focus') || q.includes('this week')) {
    return `### 🎯 ARIA's Top 3 Priorities for EduOrbit This Week

### Priority 1 — Lead Capture (40% of time)
Board exam results come in May-June. This is **peak season**.
- Run Instagram reels daily
- Send WhatsApp broadcast to all contacts
- Visit 2 coaching centers this week

### Priority 2 — Lead Follow-up (40% of time)
You have **${leads.length} leads** in the system.
- Call every lead within 5 minutes of capture
- WhatsApp follow-up same day
- Create WhatsApp group: "EduOrbit Admissions 2026"

### Priority 3 — College Relations (20% of time)
- Confirm seat availability with current partners
- Approach 1 new college this week for partnership
- Ask SVU and IES for additional incentives

💡 **ARIA's #1 Rule:** Revenue comes from SPEED. Fastest counsellor to call a student = 80% chance of closing the admission. Go fast, Chief.`;
  }

  // --- DEFAULT SMART FALLBACK ---
  return `### 🧠 ARIA Response

Great question, Chief. Here's my strategic take on **"${input.substring(0, 60)}..."**

For EduOrbit, everything connects back to our core mission: **Get students into good colleges, get paid commission, repeat.**

Based on your query, here's my recommendation:

### Immediate Action
- Identify which of our **${COMPANY.colleges.length} partner colleges** this applies to
- Check if Bihar DRCC or Jharkhand Guruji loan can be leveraged here
- Create a WhatsApp message around this topic and broadcast to leads

### Strategic View
EduOrbit is in a high-trust, high-value business. Every interaction should:
1. Build trust (free advice, loan help)
2. Create urgency (seats filling, deadline)
3. Close fast (call within 5 minutes)

### Next Step
Tell me more specifically what you need:
- 📝 A written message/script
- 📊 A plan or strategy
- 📧 A professional document
- 📱 Social media content

I'm here to execute, Chief. Give me the details.

💡 **Contact:** ${COMPANY.phone} | ${COMPANY.email}`;
}
