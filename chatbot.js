// EduOrbit AI Chatbot — Smart Campus Counsellor
(function () {
  const fab = document.getElementById('chatbotFab');
  const win = document.getElementById('chatbotWindow');
  const closeBtn = document.getElementById('chatbotClose');
  const body = document.getElementById('chatbotBody');
  const input = document.getElementById('chatbotInput');
  const sendBtn = document.getElementById('chatbotSend');
  const quickBtns = document.querySelectorAll('.chatbot-qbtn');

  let isOpen = false;

  // Toggle
  fab.addEventListener('click', () => {
    isOpen = !isOpen;
    win.classList.toggle('open', isOpen);
    if (isOpen && body.children.length === 0) {
      botMsg("Namaskar! 🙏 Main EduOrbit ka AI Assistant hoon.\n\nAap kya jaanna chahte hain?\n• College fees\n• Admission eligibility\n• Loan schemes\n• Available courses\n\nNeeche buttons use karein ya apna sawaal type karein! 👇");
    }
  });
  closeBtn.addEventListener('click', () => { isOpen = false; win.classList.remove('open'); });

  // Quick buttons
  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.q;
      if (q === 'fees') { userMsg('Fee structure batao'); processQuery('fee structure'); }
      else if (q === 'eligibility') { userMsg('Eligibility check karna hai'); processQuery('eligibility check'); }
      else if (q === 'loans') { userMsg('Loan schemes ke baare mein batao'); processQuery('loan scheme'); }
      else if (q === 'colleges') { userMsg('Konse colleges hain?'); processQuery('colleges list'); }
      else if (q === 'contact') { userMsg('Contact details chahiye'); processQuery('contact'); }
    });
  });

  // Send message
  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(); });

  function send() {
    const txt = input.value.trim();
    if (!txt) return;
    userMsg(txt);
    input.value = '';
    setTimeout(() => processQuery(txt.toLowerCase()), 500);
  }

  function userMsg(text) {
    const el = document.createElement('div');
    el.className = 'chatbot-msg user';
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }

  function botMsg(text) {
    const el = document.createElement('div');
    el.className = 'chatbot-msg bot';
    el.innerHTML = text.replace(/\n/g, '<br>');
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }

  // --- SMART QUERY PROCESSOR ---
  function processQuery(q) {
    // GREETING
    if (/^(hi|hello|hey|namaskar|namaste)/.test(q)) {
      botMsg("Hello! 👋 EduOrbit mein aapka swagat hai! Aap kaunsa course ya college ke baare mein jaanna chahte hain?");
      return;
    }

    // CONTACT
    if (/contact|phone|call|number|whatsapp/.test(q)) {
      botMsg("📞 <strong>Call / WhatsApp:</strong> <a href='tel:+919546201805'>+91 9546201805</a>\n📧 <strong>Email:</strong> eduorbit.admissions@gmail.com\n🌐 <strong>Website:</strong> eduorbit.in\n\nYa seedha <a href='https://wa.me/919546201805'>WhatsApp pe message karein →</a>");
      return;
    }

    // LOAN SCHEMES
    if (/loan|credit card|drcc|guruji|mmvy|scholarship|medhabritti|financial|paisa|fees.*(loan|help)/.test(q)) {
      let resp = "🏦 <strong>Education Loan Schemes:</strong>\n\n";
      if (/bihar|drcc/.test(q)) {
        resp += "🔸 <strong>Bihar Student Credit Card (DRCC)</strong>\n• Loan: Up to ₹4 Lakhs\n• Interest: 4% (1% for girls)\n• Age: ≤25 years\n• Apply: MNSSBY Portal";
      } else if (/jharkhand|guruji/.test(q)) {
        resp += "🔸 <strong>Jharkhand Guruji Credit Card</strong>\n• Loan: Up to ₹15 Lakhs\n• Interest: 4% simple\n• Collateral-free!\n• Repayment: 15 years";
      } else if (/mp|madhya|mmvy|medhavi/.test(q)) {
        resp += "🔸 <strong>MP Medhavi Vidyarthi Yojana</strong>\n• Full fee waiver for meritorious students\n• 70%+ in MP Board or 85%+ in CBSE";
      } else {
        resp += "🔸 <strong>Bihar DRCC:</strong> Up to ₹4 Lakhs @ 4%\n🔸 <strong>Jharkhand Guruji:</strong> Up to ₹15 Lakhs @ 4%\n🔸 <strong>MP MMVY:</strong> Full fee waiver for merit\n\nAap kaunse state se hain? Batayein toh detail mein guide karunga!";
      }
      resp += "\n\n💡 Hum 100% FREE loan guidance dete hain!";
      botMsg(resp);
      return;
    }

    // COLLEGES LIST
    if (/college|university|institut|partner|campus|list/.test(q)) {
      let resp = "🏫 <strong>Hamare Partner Colleges:</strong>\n\n";
      COLLEGES.forEach((c, i) => {
        resp += `${i + 1}. <strong>${c.name}</strong> (${c.abbr})\n   📍 ${c.location} | NAAC: ${c.naac}\n\n`;
      });
      resp += "Kisi specific college ke baare mein jaanein? Naam type karein!";
      botMsg(resp);
      return;
    }

    // SPECIFIC COLLEGE QUERY
    const collegeMatch = COLLEGES.find(c =>
      q.includes(c.abbr.toLowerCase()) || q.includes(c.name.toLowerCase().split(' ')[0])
    );
    if (collegeMatch && !/fee|course|eligib/.test(q)) {
      const courses = COURSES.filter(c => c.colleges.includes(collegeMatch.abbr));
      let resp = `🏫 <strong>${collegeMatch.name}</strong>\n📍 ${collegeMatch.location}\n⭐ NAAC: ${collegeMatch.naac} | Est: ${collegeMatch.est}\n\n📚 <strong>${courses.length} Courses Available:</strong>\n`;
      courses.slice(0, 8).forEach(c => {
        resp += `• ${c.name} (${c.type}) — ₹${c.totalFee.toLocaleString('en-IN')}\n`;
      });
      if (courses.length > 8) resp += `\n...aur ${courses.length - 8} aur courses hain!`;
      resp += "\n\nKisi course ki detail chahiye toh course ka naam likhein!";
      botMsg(resp);
      return;
    }

    // FEE STRUCTURE
    if (/fee|fees|kitna|paisa|cost|charge|price|kharcha/.test(q)) {
      // Try to find specific course
      const courseMatch = findCourse(q);
      if (courseMatch) {
        let resp = `💰 <strong>${courseMatch.name}</strong>\n`;
        resp += `🏫 College: ${courseMatch.colleges.join(', ')}\n`;
        resp += `⏳ Duration: ${courseMatch.duration} Years\n`;
        resp += `💵 <strong>Total Fee: ₹${courseMatch.totalFee.toLocaleString('en-IN')}</strong>\n\n`;
        resp += `📊 Year-wise: ${courseMatch.yearWise.map(y => '₹' + (y === 'N/A' ? 'N/A' : y.toLocaleString('en-IN'))).join(' → ')}\n`;
        if (courseMatch.eligibility) resp += `\n📋 Eligibility: ${courseMatch.eligibility}`;
        botMsg(resp);
      } else {
        let resp = "💰 <strong>Fee Structure Overview:</strong>\n\nKaunsa course chahiye? Examples:\n";
        resp += "• \"B.Tech CSE fees\"\n• \"BCA fee Adamas\"\n• \"MBA fee IES\"\n• \"Nursing fee\"\n\n";
        resp += "Ya aap hamari <a href='#fees'>Fee Structure page</a> pe jaakar filter kar sakte hain!";
        botMsg(resp);
      }
      return;
    }

    // ELIGIBILITY CHECK
    if (/eligib|qualify|admission|marks|percent|12th|10th|graduate|pass/.test(q)) {
      // Try to extract percentage
      const percMatch = q.match(/(\d{2,3})\s*(%|percent|marks)/);
      if (percMatch) {
        const perc = parseInt(percMatch[1]);
        const eligible = COURSES.filter(c => {
          if (!c.eligibility) return false;
          const e = c.eligibility.toLowerCase();
          const reqMatch = e.match(/(\d{2,3})%/);
          if (reqMatch && perc < parseInt(reqMatch[1])) return false;
          return true;
        });
        botMsg(`📋 <strong>${perc}% marks ke saath:</strong>\n\nAap <strong>${eligible.length} courses</strong> ke liye eligible ho sakte hain!\n\nDetailed check ke liye hamara <a href='#eligibility'>Eligibility Checker tool</a> use karein — wahan stream aur exam bhi select kar sakte hain! 🎯`);
      } else {
        botMsg("📋 <strong>Eligibility Check:</strong>\n\nAapke kitne % marks hain? Aise likhein:\n• \"72% marks hai eligibility check\"\n\nYa hamara <a href='#eligibility'>Eligibility Checker tool</a> use karein — full detailed results milenge! ✅");
      }
      return;
    }

    // COURSE SEARCH
    const courseFound = findCourse(q);
    if (courseFound) {
      let resp = `📚 <strong>${courseFound.name}</strong>\n`;
      resp += `Type: ${courseFound.type} | Duration: ${courseFound.duration} yrs\n`;
      resp += `🏫 ${courseFound.colleges.join(', ')}\n`;
      resp += `💰 <strong>Total: ₹${courseFound.totalFee.toLocaleString('en-IN')}</strong>\n`;
      if (courseFound.eligibility) resp += `📋 Eligibility: ${courseFound.eligibility}`;
      botMsg(resp);
      return;
    }

    // ADMISSION PROCESS
    if (/admission|process|apply|kaise|procedure/.test(q)) {
      botMsg("📝 <strong>Admission Process:</strong>\n\n1️⃣ Humse contact karein (call/WhatsApp)\n2️⃣ Course aur college select karein\n3️⃣ Documents submit karein (12th marksheet, Aadhar, etc.)\n4️⃣ Hum admission form fill karwa denge\n5️⃣ Loan chahiye toh wo bhi karwa denge\n6️⃣ College mein admission confirmed! 🎉\n\n📞 Call: <a href='tel:+919546201805'>+91 9546201805</a>\n💬 <a href='https://wa.me/919546201805'>WhatsApp karein →</a>");
      return;
    }

    // PLACEMENT
    if (/placement|job|salary|package|naukri/.test(q)) {
      botMsg("💼 <strong>Placement Information:</strong>\n\nHamare partner colleges mein achha placement record hai!\n• JIS Group: Average 4-6 LPA (CSE)\n• Adamas University: Average 4-8 LPA\n• IES Bhopal: Average 3-5 LPA\n\nSpecific college ki placement info ke liye college ka naam batayein! 📊");
      return;
    }

    // HOSTEL
    if (/hostel|accommodation|room|rehen|stay/.test(q)) {
      botMsg("🏠 <strong>Hostel Information:</strong>\n\nJIS Group colleges mein hostel available hai:\n• Boys: ~₹50,000-65,000/year extra\n• Girls: ~₹45,000-60,000/year extra\n\nAdamas/IES ke liye separate hostel inquiry karein.\n\nDetails ke liye <a href='#fees'>Fee Structure</a> mein \"With Hostel\" column dekhein!");
      return;
    }

    // THANK YOU
    if (/thank|shukriya|dhanyawad/.test(q)) {
      botMsg("Aapka dhanyawad! 🙏 EduOrbit hamesha aapki help ke liye yahan hai.\n\nKoi aur sawaal ho toh zaroor puchiyega! 😊\n\n📞 <a href='tel:+919546201805'>+91 9546201805</a>");
      return;
    }

    // DEFAULT / FALLBACK
    botMsg("🤔 Main samajh nahi paaya. Kya aap ye try kar sakte hain:\n\n• \"B.Tech CSE fees\"\n• \"72% marks eligibility\"\n• \"Bihar loan scheme\"\n• \"Adamas University courses\"\n• \"Admission process\"\n\nYa seedha hamare counsellor se baat karein:\n📞 <a href='tel:+919546201805'>+91 9546201805</a>");
  }

  // --- COURSE FINDER HELPER ---
  function findCourse(q) {
    const keywords = q.replace(/fee|fees|kitna|price|cost|kya|hai|ka|ki|ke|mein|me|se|or|aur|and|the|for|at|in/g, '').trim().split(/\s+/).filter(w => w.length > 2);
    if (keywords.length === 0) return null;

    let bestMatch = null;
    let bestScore = 0;

    COURSES.forEach(c => {
      const searchStr = `${c.name} ${c.type} ${c.colleges.join(' ')} ${c.category}`.toLowerCase();
      let score = 0;
      keywords.forEach(kw => {
        if (searchStr.includes(kw)) score += 1;
      });
      // Boost for exact course type matches
      if (q.includes('btech') || q.includes('b.tech')) { if (searchStr.includes('b.tech')) score += 2; }
      if (q.includes('bca')) { if (searchStr.includes('bca')) score += 2; }
      if (q.includes('mba')) { if (searchStr.includes('mba')) score += 2; }
      if (q.includes('nursing')) { if (searchStr.includes('nursing')) score += 2; }
      if (q.includes('pharma')) { if (searchStr.includes('pharm')) score += 2; }
      if (q.includes('law') || q.includes('llb')) { if (searchStr.includes('law') || searchStr.includes('llb')) score += 2; }

      if (score > bestScore) { bestScore = score; bestMatch = c; }
    });

    return bestScore >= 2 ? bestMatch : null;
  }

})();
