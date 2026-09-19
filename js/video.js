/* =========================================
   DISHA AI — Interactive Video Demo Engine
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const playBtn = document.getElementById('playBtn');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const restartBtn = document.getElementById('restartBtn');
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const timeDisplay = document.getElementById('timeDisplay');
  const voiceToggleBtn = document.getElementById('voiceToggleBtn');
  const voiceOnIcon = document.getElementById('voiceOnIcon');
  const voiceOffIcon = document.getElementById('voiceOffIcon');
  const speedSelect = document.getElementById('speedSelect');
  const subSelect = document.getElementById('subSelect');
  const fullScreenBtn = document.getElementById('fullScreenBtn');

  const sceneContainer = document.getElementById('sceneContainer');
  const captionsBar = document.getElementById('captionsBar');
  const captionText = document.getElementById('captionText');
  const tryLiveBtn = document.getElementById('tryLiveBtn');
  const videoChapterTag = document.getElementById('videoChapterTag');
  const chaptersList = document.getElementById('chaptersList');

  // Video Chapter Definitions
  const chapters = [
    {
      id: 0,
      title: 'Platform Overview',
      tag: 'CH 1: OVERVIEW',
      duration: 15,
      startTime: 0,
      url: 'chat.html',
      captionEN: 'Welcome to <strong>Disha AI (Setu AI)</strong> — India\'s bilingual AI companion for everyday life.',
      captionHI: 'दिशा एआई में आपका स्वागत है — आपकी दैनिक जीवन के लिए एआई साथी।',
      render: () => `
        <div class="mockup-window" style="max-width: 620px; text-align: center; padding: 2rem;">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;" class="logo-icon">◈</div>
          <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 0.5rem;">
            Setu <span style="color:var(--indigo-light);">AI</span>
          </h2>
          <p style="color:var(--text-secondary); max-width: 480px; margin: 0 auto 1.5rem; font-size: 0.95rem;">
            Empowering Bharat with AI-powered Govt Scheme Guidance, Job Interview Preparation, Legal Rights, and Plain Language Document Summaries.
          </p>
          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <div style="background: rgba(91,94,244,0.15); border: 1px solid var(--border-glow); padding: 10px 18px; border-radius: 12px; text-align: center;">
              <div style="font-size: 1.4rem; font-weight: 800; color: var(--indigo-light);">50+</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Govt Schemes</div>
            </div>
            <div style="background: rgba(255,123,0,0.15); border: 1px solid rgba(255,123,0,0.3); padding: 10px 18px; border-radius: 12px; text-align: center;">
              <div style="font-size: 1.4rem; font-weight: 800; color: var(--saffron);">24 / 7</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Legal Assistant</div>
            </div>
            <div style="background: rgba(0,214,160,0.15); border: 1px solid rgba(0,214,160,0.3); padding: 10px 18px; border-radius: 12px; text-align: center;">
              <div style="font-size: 1.4rem; font-weight: 800; color: var(--emerald);">Hindi + EN</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Voice & Text</div>
            </div>
          </div>
        </div>
      `
    },
    {
      id: 1,
      title: 'Govt Schemes Engine',
      tag: 'CH 2: SCHEMES',
      duration: 15,
      startTime: 15,
      url: 'schemes.html',
      captionEN: 'Discover government schemes tailored for you with <strong>1-click eligibility check</strong>.',
      captionHI: 'अपने लिए योग्य सरकारी योजनाओं को 1-क्लिक पात्रता जांच के साथ खोजें।',
      render: () => `
        <div class="mockup-window">
          <div class="mockup-header">
            <span class="dot-red"></span><span class="dot-yellow"></span><span class="dot-green"></span>
            <span class="mockup-url">https://disha-ai.in/schemes</span>
          </div>
          <div class="mockup-body">
            <div style="display: flex; gap: 10px; margin-bottom: 1rem;">
              <input type="text" value="Student Scholarship & Loan < 3 Lakhs" readonly style="flex:1; background:rgba(255,255,255,0.05); border:1px solid var(--border-glow); color:#fff; padding:8px 12px; border-radius:8px; font-size:0.85rem;" class="typing-cursor" />
              <button style="background:var(--saffron); border:none; padding:8px 16px; border-radius:8px; font-weight:700; color:#000;">Find</button>
            </div>
            <div style="background:var(--bg-card); border:1px solid var(--border-glow); border-radius:12px; padding:12px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;" class="spotlight-pulse">
              <div>
                <strong style="color:var(--text-primary); font-size:0.95rem;">PM Vidya Lakshmi Education Loan Scheme</strong>
                <div style="font-size:0.75rem; color:var(--text-secondary);">Collateral-free loan up to ₹7.5 Lakhs for higher studies</div>
              </div>
              <span style="background:rgba(0,214,160,0.15); color:var(--emerald); border:1px solid rgba(0,214,160,0.3); padding:4px 10px; border-radius:100px; font-size:0.75rem; font-weight:700;">98% Match</span>
            </div>
            <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:12px; padding:12px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="color:var(--text-primary); font-size:0.95rem;">National Means cum Merit Scholarship (NMMS)</strong>
                <div style="font-size:0.75rem; color:var(--text-secondary);">₹12,000/yr allowance for Class 9-12 students</div>
              </div>
              <span style="background:rgba(91,94,244,0.15); color:var(--indigo-light); border:1px solid var(--border-glow); padding:4px 10px; border-radius:100px; font-size:0.75rem; font-weight:700;">Eligible</span>
            </div>
          </div>
        </div>
      `
    },
    {
      id: 2,
      title: 'AI Interview Practice',
      tag: 'CH 3: INTERVIEWS',
      duration: 15,
      startTime: 30,
      url: 'interview.html',
      captionEN: 'Practice <strong>AI Mock Video Interviews</strong> with instant speech, posture & confidence scoring.',
      captionHI: 'लाइव स्पीच, बॉडी लैंग्वेज और कॉन्फिडेंस स्कोरिंग के साथ एआई मॉक इंटरव्यू अभ्यास करें।',
      render: () => `
        <div class="mockup-window">
          <div class="mockup-header">
            <span class="dot-red"></span><span class="dot-yellow"></span><span class="dot-green"></span>
            <span class="mockup-url">https://disha-ai.in/interview</span>
          </div>
          <div class="mockup-body" style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
            <div style="background:#000; border-radius:10px; height:140px; display:flex; flex-direction:column; align-items:center; justify-content:center; border:1px solid var(--border-glow); position:relative; overflow:hidden;">
              <div style="width:48px; height:48px; border-radius:50%; background:var(--indigo); display:flex; align-items:center; justify-content:center; font-size:1.5rem; box-shadow: 0 0 20px var(--indigo-light);">🤖</div>
              <div style="font-size:0.75rem; color:var(--indigo-light); margin-top:8px; font-weight:700;">AI Interviewer Active</div>
              <div style="position:absolute; bottom:6px; left:8px; font-size:0.65rem; color:var(--emerald); background:rgba(0,0,0,0.7); padding:2px 6px; border-radius:4px;">🎤 Recording Speech</div>
            </div>
            <div style="background:var(--bg-card); border-radius:10px; padding:10px; border:1px solid var(--border);">
              <div style="font-size:0.75rem; color:var(--text-muted);">AI Evaluation Report</div>
              <div style="font-size:1.5rem; font-weight:800; color:var(--emerald); margin:4px 0;">92 <span style="font-size:0.8rem; color:var(--text-secondary);">/ 100</span></div>
              <div style="font-size:0.75rem; color:var(--text-secondary); line-height:1.3;">
                ✔️ Clear articulation<br/>
                ✔️ Strong STAR technique<br/>
                💡 Tip: Reduce filler words ("um", "like")
              </div>
            </div>
          </div>
        </div>
      `
    },
    {
      id: 3,
      title: 'Document Simplifier',
      tag: 'CH 4: DOCUMENTS',
      duration: 15,
      startTime: 45,
      url: 'document.html',
      captionEN: 'Upload dense government PDFs & legal notices to get <strong>3-bullet plain summaries</strong>.',
      captionHI: 'कठिन सरकारी दस्तावेज अपलोड करें और 3-बुलेट में सरल हिंदी सारांश प्राप्त करें।',
      render: () => `
        <div class="mockup-window">
          <div class="mockup-header">
            <span class="dot-red"></span><span class="dot-yellow"></span><span class="dot-green"></span>
            <span class="mockup-url">https://disha-ai.in/document</span>
          </div>
          <div class="mockup-body">
            <div style="border: 2px dashed var(--border-glow); border-radius:10px; padding:12px; text-align:center; background:rgba(91,94,244,0.05); margin-bottom:12px;">
              <span style="font-size:1.2rem;">📄</span>
              <div style="font-size:0.8rem; font-weight:600; color:var(--indigo-light);">Tax_Assessment_Notice_2026.pdf</div>
              <div style="font-size:0.7rem; color:var(--text-muted);">OCR Scanned & Processed in 1.2s</div>
            </div>
            <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:10px; padding:10px; font-size:0.8rem;">
              <strong style="color:var(--saffron);">Summary in Plain Language:</strong>
              <ul style="margin-top:6px; padding-left:14px; color:var(--text-secondary); display:flex; flex-direction:column; gap:4px;">
                <li>No penalty owed; standard tax refund approved.</li>
                <li>Submit bank account verification within 15 days.</li>
                <li>Download pre-filled response draft template.</li>
              </ul>
            </div>
          </div>
        </div>
      `
    },
    {
      id: 4,
      title: '24/7 AI Legal Assistant',
      tag: 'CH 5: LEGAL AI',
      duration: 15,
      startTime: 60,
      url: 'legal.html',
      captionEN: 'Resolve legal disputes, tenant rights, consumer claims & FIR procedures with <strong>AI Legal Guidance</strong>.',
      captionHI: 'किरायेदार विवाद, उपभोक्ता शिकायत और एफआईआर प्रक्रिया पर त्वरित एआई कानूनी सहायता पाएं।',
      render: () => `
        <div class="mockup-window">
          <div class="mockup-header">
            <span class="dot-red"></span><span class="dot-yellow"></span><span class="dot-green"></span>
            <span class="mockup-url">https://disha-ai.in/legal</span>
          </div>
          <div class="mockup-body">
            <div style="background:rgba(255,255,255,0.04); border-radius:8px; padding:8px 12px; font-size:0.8rem; margin-bottom:10px; border-left:3px solid var(--saffron);">
              <strong>User Prompt:</strong> Can a landlord withhold my security deposit without receipts?
            </div>
            <div style="background:var(--bg-card); border:1px solid var(--border-glow); border-radius:10px; padding:12px; font-size:0.8rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-weight:700; color:var(--indigo-light);">⚖️ Legal Analysis (Rent Control Act)</span>
                <span style="background:rgba(255,78,122,0.15); color:var(--rose); padding:2px 8px; border-radius:100px; font-size:0.7rem; font-weight:700;">Actionable</span>
              </div>
              <p style="color:var(--text-secondary); line-height:1.4;">
                No. Under Model Tenancy Act §22, landlords must provide itemized repair invoices within 30 days. You can send a formal 7-day Legal Demand Notice.
              </p>
            </div>
          </div>
        </div>
      `
    },
    {
      id: 5,
      title: 'Bilingual Voice & Chat',
      tag: 'CH 6: VOICE CHAT',
      duration: 15,
      startTime: 75,
      url: 'chat.html',
      captionEN: 'Talk or type seamlessly in <strong>Hindi & English</strong> with 24/7 contextual intelligence.',
      captionHI: 'हिंदी और अंग्रेजी में आसानी से बोलें या लिखें — 24/7 एआई मार्गदर्शन पाएं।',
      render: () => `
        <div class="mockup-window">
          <div class="mockup-header">
            <span class="dot-red"></span><span class="dot-yellow"></span><span class="dot-green"></span>
            <span class="mockup-url">https://disha-ai.in/chat</span>
          </div>
          <div class="mockup-body" style="display:flex; flex-direction:column; gap:10px;">
            <div style="align-self:flex-end; background:var(--indigo); color:#fff; padding:8px 14px; border-radius:12px 12px 2px 12px; font-size:0.85rem; max-width:80%;">
              मुझे PM किसान योजना का फॉर्म कैसे भरना है? 🎙️
            </div>
            <div style="align-self:flex-start; background:var(--bg-card); border:1px solid var(--border-glow); color:var(--text-primary); padding:10px 14px; border-radius:12px 12px 12px 2px; font-size:0.85rem; max-width:85%;">
              <strong style="color:var(--saffron);">Setu AI:</strong> PM-Kisan में आवेदन करने के लिए आपका आधार कार्ड और भूमि खसरा दस्तावेज चाहिए। आप इसे 3 आसान स्टेप्स में कर सकते हैं:
            </div>
          </div>
        </div>
      `
    }
  ];

  const TOTAL_DURATION = 90; // seconds total
  let currentTime = 0;
  let isPlaying = false;
  let playbackSpeed = 1.0;
  let voiceEnabled = true;
  let currentChapterIndex = 0;
  let timerInterval = null;
  let synth = window.speechSynthesis;

  // Initialize Sidebar Chapters List
  function buildChaptersList() {
    chaptersList.innerHTML = '';
    chapters.forEach((ch, idx) => {
      const card = document.createElement('div');
      card.className = `chapter-card ${idx === currentChapterIndex ? 'active' : ''}`;
      card.onclick = () => jumpToChapter(idx);
      card.innerHTML = `
        <div class="chapter-num">${idx + 1}</div>
        <div class="chapter-info">
          <div class="chapter-name">${ch.title}</div>
          <div class="chapter-dur">${formatTime(ch.startTime)} - ${formatTime(ch.startTime + ch.duration)}</div>
        </div>
      `;
      chaptersList.appendChild(card);
    });
  }

  // Format Seconds to MM:SS
  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  // Render Active Scene based on currentTime
  function updateScene() {
    // Find matching chapter
    let foundIdx = chapters.findIndex((ch, i) => {
      const nextStart = chapters[i + 1] ? chapters[i + 1].startTime : TOTAL_DURATION;
      return currentTime >= ch.startTime && currentTime < nextStart;
    });

    if (foundIdx === -1) foundIdx = 0;

    const chapter = chapters[foundIdx];
    
    // Update Scene DOM if chapter changed
    if (foundIdx !== currentChapterIndex || !sceneContainer.children.length) {
      currentChapterIndex = foundIdx;
      videoChapterTag.textContent = chapter.tag;
      tryLiveBtn.href = chapter.url;

      // Render inner scene HTML
      sceneContainer.className = 'video-scene-container fade-enter';
      setTimeout(() => {
        sceneContainer.innerHTML = chapter.render();
        sceneContainer.className = 'video-scene-container active';
      }, 50);

      // Trigger Voiceover speech synthesizer if voiceEnabled
      speakCaption(chapter);
      buildChaptersList();
    }

    // Update Subtitles Caption Text
    const lang = subSelect.value;
    if (lang === 'off') {
      captionsBar.style.display = 'none';
    } else {
      captionsBar.style.display = 'block';
      captionText.innerHTML = lang === 'hi' ? chapter.captionHI : chapter.captionEN;
    }

    // Progress Bar & Timer
    const percent = (currentTime / TOTAL_DURATION) * 100;
    progressFill.style.width = `${percent}%`;
    timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(TOTAL_DURATION)}`;
  }

  // Speak Caption using Web Speech API
  function speakCaption(chapter) {
    if (!voiceEnabled || !synth) return;
    synth.cancel(); // cancel previous utterances

    const textToSpeak = subSelect.value === 'hi' ? 
      chapter.captionHI.replace(/<[^>]*>/g, '') : 
      chapter.captionEN.replace(/<[^>]*>/g, '');

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = playbackSpeed;
    utterance.lang = subSelect.value === 'hi' ? 'hi-IN' : 'en-US';
    synth.speak(utterance);
  }

  // Timer Tick Function
  function tick() {
    currentTime += 0.5 * playbackSpeed;
    if (currentTime >= TOTAL_DURATION) {
      currentTime = 0;
      pauseVideo();
    }
    updateScene();
  }

  // Play / Pause Handlers
  function playVideo() {
    if (isPlaying) return;
    isPlaying = true;
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    timerInterval = setInterval(tick, 500);
    speakCaption(chapters[currentChapterIndex]);
  }

  function pauseVideo() {
    isPlaying = false;
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    if (timerInterval) clearInterval(timerInterval);
    if (synth) synth.cancel();
  }

  function togglePlay() {
    if (isPlaying) pauseVideo();
    else playVideo();
  }

  function jumpToChapter(index) {
    currentChapterIndex = index;
    currentTime = chapters[index].startTime;
    updateScene();
    if (!isPlaying) playVideo();
  }

  // Global Expose for card buttons
  window.playChapter = (index) => {
    jumpToChapter(index);
    window.scrollTo({ top: document.getElementById('videoPlayerContainer').offsetTop - 80, behavior: 'smooth' });
  };

  // Event Listeners
  playBtn.addEventListener('click', togglePlay);

  restartBtn.addEventListener('click', () => {
    currentTime = 0;
    currentChapterIndex = 0;
    updateScene();
    playVideo();
  });

  voiceToggleBtn.addEventListener('click', () => {
    voiceEnabled = !voiceEnabled;
    if (voiceEnabled) {
      voiceOnIcon.style.display = 'block';
      voiceOffIcon.style.display = 'none';
      speakCaption(chapters[currentChapterIndex]);
    } else {
      voiceOnIcon.style.display = 'none';
      voiceOffIcon.style.display = 'block';
      if (synth) synth.cancel();
    }
  });

  speedSelect.addEventListener('change', (e) => {
    playbackSpeed = parseFloat(e.target.value);
    if (isPlaying) {
      clearInterval(timerInterval);
      timerInterval = setInterval(tick, 500);
    }
  });

  subSelect.addEventListener('change', () => {
    updateScene();
  });

  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    currentTime = ratio * TOTAL_DURATION;
    updateScene();
  });

  fullScreenBtn.addEventListener('click', () => {
    const playerEl = document.getElementById('videoPlayerContainer');
    if (!document.fullscreenElement) {
      playerEl.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen();
    }
  });

  // Init
  buildChaptersList();
  updateScene();
});
