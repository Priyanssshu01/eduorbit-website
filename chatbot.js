// EduOrbit AI Chatbot — Premium Campus Counsellor Logic
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
      setTimeout(() => {
        botMsg("Namaskar! 🙏 Main EduOrbit ka AI Assistant hoon.\n\nAap kya jaanna chahte hain?\n• College fees\n• Admission eligibility\n• Loan schemes\n• Available courses\n\nNeeche buttons use karein ya apna sawaal type karein! 👇");
      }, 500);
    }
  });

  closeBtn.addEventListener('click', () => {
    isOpen = false;
    win.classList.remove('open');
  });

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
    const wrapper = document.createElement('div');
    wrapper.className = 'flex justify-end';
    
    const el = document.createElement('div');
    el.className = 'bg-brand-blue text-white px-5 py-3 rounded-2xl rounded-tr-none text-sm font-medium max-w-[85%] shadow-md animate-[fadeIn_0.3s_ease]';
    el.textContent = text;
    
    wrapper.appendChild(el);
    body.appendChild(wrapper);
    body.scrollTop = body.scrollHeight;
  }

  function botMsg(text) {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex justify-start items-end gap-2';
    
    const avatar = document.createElement('div');
    avatar.className = 'w-6 h-6 bg-brand-blue/10 rounded-full flex items-center justify-center text-[10px] text-brand-blue font-bold flex-shrink-0';
    avatar.textContent = '🎓';
    
    const el = document.createElement('div');
    el.className = 'bg-white text-gray-700 px-5 py-3 rounded-2xl rounded-bl-none text-sm font-medium max-w-[85%] shadow-sm border border-gray-100 animate-[fadeIn_0.3s_ease]';
    el.innerHTML = text.replace(/\n/g, '<br>');
    
    wrapper.appendChild(avatar);
    wrapper.appendChild(el);
    body.appendChild(wrapper);
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
      botMsg("📞 <strong>Call / WhatsApp:</strong> <a href='tel:+919546201805' class='text-brand-blue font-bold'>+91 9546201805</a>\n📧 <strong>Email:</strong> eduorbit.admissions@gmail.com\n\nYa seedha <a href='https://wa.me/919546201805' class='text-green-600 font-bold'>WhatsApp pe message karein →</a>");
      return;
    }

    // LOAN SCHEMES
    if (/loan|credit card|drcc|guruji|mmvy|scholarship|medhabritti|financial|paisa|fees.*(loan|help)/.test(q)) {
      let resp = "🏦 <strong>Education Loan Schemes:</strong>\n\n";
      if (/bihar|drcc/.test(q)) {
        resp += "🔸 <strong>Bihar Student Credit Card (DRCC)</strong>\n• Loan: Up to ₹4 Lakhs\n• Interest: 4% (1% for girls)\n• Apply: MNSSBY Portal";
      } else if (/jharkhand|guruji/.test(q)) {
        resp += "🔸 <strong>Jharkhand Guruji Credit Card</strong>\n• Loan: Up to ₹15 Lakhs\n• Interest: 4% simple\n• Collateral-free!";
      } else if (/mp|madhya|mmvy|medhavi/.test(q)) {
        resp += "🔸 <strong>MP Medhavi Vidyarthi Yojana</strong>\n• Full fee waiver for merit\n• 70%+ in MP Board";
      } else {
        resp += "🔸 <strong>Bihar DRCC:</strong> Up to ₹4 Lakhs\n🔸 <strong>Jharkhand Guruji:</strong> Up to ₹15 Lakhs\n🔸 <strong>MP MMVY:</strong> Merit Support\n\nAap kaunse state se hain?";
      }
      resp += "\n\n💡 Hum 100% FREE loan guidance dete hain!";
      botMsg(resp);
      return;
    }

    // COLLEGES LIST
    if (/college|university|institut|partner|campus|list/.test(q)) {
      let resp = "🏫 <strong>Hamare Partner Colleges:</strong>\n\n";
      COLLEGES.forEach((c, i) => {
        resp += `${i + 1}. <strong>${c.name}</strong> (${c.abbr})\n   📍 ${c.location}\n\n`;
      });
      resp += "Kisi specific college ke baare mein jaanein?";
      botMsg(resp);
      return;
    }

    // FEE STRUCTURE
    if (/fee|fees|kitna|paisa|cost|charge|price|kharcha/.test(q)) {
      const courseMatch = findCourse(q);
      if (courseMatch) {
        let resp = `💰 <strong>${courseMatch.name}</strong>\n`;
        resp += `🏫 College: ${courseMatch.colleges.join(', ')}\n`;
        resp += `💵 <strong>Total Fee: ₹${courseMatch.totalFee.toLocaleString('en-IN')}</strong>\n\n`;
        resp += `📊 Year-wise: ${courseMatch.yearWise.map(y => '₹' + (y === 'N/A' ? 'N/A' : y.toLocaleString('en-IN'))).join(' → ')}`;
        botMsg(resp);
      } else {
        let resp = "💰 <strong>Fee Structure:</strong>\n\nKaunsa course chahiye? Examples:\n• \"B.Tech fees\"\n• \"BCA fee\"\n• \"MBA fee\"\n\nYa <a href='#fees' class='text-brand-blue font-bold'>Fee Structure page</a> dekhein!";
        botMsg(resp);
      }
      return;
    }

    // ADMISSION PROCESS
    if (/admission|process|apply|kaise|procedure/.test(q)) {
      botMsg("📝 <strong>Process:</strong>\n\n1️⃣ Call/WhatsApp us\n2️⃣ College select karein\n3️⃣ Docs submit karein\n4️⃣ Hum form fill karenge\n5️⃣ Admission confirmed! 🎉\n\n📞 <a href='tel:+919546201805' class='text-brand-blue font-bold'>+91 9546201805</a>");
      return;
    }

    // THANK YOU
    if (/thank|shukriya|dhanyawad/.test(q)) {
      botMsg("Aapka dhanyawad! 🙏 EduOrbit hamesha aapki help ke liye yahan hai.😊");
      return;
    }

    // DEFAULT
    botMsg("🤔 Main samajh nahi paaya. Kya aap ye try kar sakte hain:\n• \"B.Tech CSE fees\"\n• \"72% eligibility check\"\n• \"Bihar loan scheme\"\n\nYa seedha humein call karein: <a href='tel:+919546201805' class='text-brand-blue font-bold'>9546201805</a>");
  }

  // Helper
  function findCourse(q) {
    const keywords = q.replace(/fee|fees|kitna|price|cost|hai|ka|ki|ke|mein|me|se|or|aur|and|the|for|at|in/g, '').trim().split(/\s+/).filter(w => w.length > 2);
    if (keywords.length === 0) return null;
    let bestMatch = null;
    let bestScore = 0;
    COURSES.forEach(c => {
      const searchStr = `${c.name} ${c.type} ${c.colleges.join(' ')}`.toLowerCase();
      let score = 0;
      keywords.forEach(kw => { if (searchStr.includes(kw)) score += 1; });
      if (score > bestScore) { bestScore = score; bestMatch = c; }
    });
    return bestScore >= 1 ? bestMatch : null;
  }

})();
