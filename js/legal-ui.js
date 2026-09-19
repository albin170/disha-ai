// ============================================================
//  Setu AI Legal — UI Controller (legal-ui.js)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- State ---- */
  let isPiiMaskActive = true;
  let activeTab = 'tabSimplify';
  let currentBriefText = '';

  /* ---- DOM Elements ---- */
  const togglePiiMask = document.getElementById('togglePiiMask');
  const piiStatusText = document.getElementById('piiStatusText');
  const legalInputText = document.getElementById('legalInputText');
  const simplifyOutput = document.getElementById('simplifyOutput');
  const btnAnalyzeLegal = document.getElementById('btnAnalyzeLegal');

  const compareDocA = document.getElementById('compareDocA');
  const compareDocB = document.getElementById('compareDocB');
  const btnRunCompare = document.getElementById('btnRunCompare');
  const compareOutput = document.getElementById('compareOutput');
  const compareResultBody = document.getElementById('compareResultBody');

  const riskInputText = document.getElementById('riskInputText');
  const btnRunRiskScan = document.getElementById('btnRunRiskScan');
  const riskOutputContainer = document.getElementById('riskOutputContainer');
  const riskScoreVal = document.getElementById('riskScoreVal');
  const riskScoreGauge = document.getElementById('riskScoreGauge');
  const riskTitle = document.getElementById('riskTitle');
  const riskSummaryText = document.getElementById('riskSummaryText');
  const riskFlagsList = document.getElementById('riskFlagsList');

  const qaDocContext = document.getElementById('qaDocContext');
  const qaUserQuestion = document.getElementById('qaUserQuestion');
  const btnAskQA = document.getElementById('btnAskQA');
  const qaOutput = document.getElementById('qaOutput');

  const briefInputText = document.getElementById('briefInputText');
  const btnGenerateBrief = document.getElementById('btnGenerateBrief');
  const briefOutputWrapper = document.getElementById('briefOutputWrapper');
  const briefContentBody = document.getElementById('briefContentBody');
  const btnCopyBrief = document.getElementById('btnCopyBrief');
  const btnDownloadBrief = document.getElementById('btnDownloadBrief');

  /* ---- PII Toggle Event ---- */
  if (togglePiiMask) {
    togglePiiMask.addEventListener('change', () => {
      isPiiMaskActive = togglePiiMask.checked;
      piiStatusText.textContent = isPiiMaskActive
        ? 'Automatically masks names, PAN, Aadhaar, cards & phone numbers before AI processing.'
        : '⚠️ Privacy Shield Off: Raw text will be processed without automatic PII redaction.';
      piiStatusText.style.color = isPiiMaskActive ? 'var(--text-secondary)' : 'var(--rose)';
    });
  }

  /* ---- Tab Switcher ---- */
  document.querySelectorAll('.legal-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.legal-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));

      btn.classList.add('active');
      activeTab = btn.dataset.tab;
      const targetContent = document.getElementById(activeTab);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  /* ---- Utility: Apply PII & Security Sanitization ---- */
  function processInputText(rawText) {
    let text = rawText;
    let piiInfo = { maskedCount: 0, details: [] };

    // 1. Prompt Injection Sanitization
    const sanitizedObj = sanitizeInput(text);
    text = sanitizedObj.cleanText;

    // 2. PII Masking if active
    if (isPiiMaskActive) {
      const piiObj = maskPII(text);
      text = piiObj.sanitized;
      piiInfo = { maskedCount: piiObj.maskedCount, details: piiObj.details };
    }

    return { text, piiInfo, containsInjection: sanitizedObj.containsInjection };
  }

  /* ---- TAB 1: Simplify & Breakdown ---- */
  if (btnAnalyzeLegal) {
    btnAnalyzeLegal.addEventListener('click', () => {
      const rawText = legalInputText.value.trim();
      if (!rawText) {
        legalInputText.focus();
        return;
      }

      simplifyOutput.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--indigo-light);">⏳ Analyzing document clauses & simplifying terms…</div>';

      setTimeout(() => {
        const { text, piiInfo } = processInputText(rawText);
        const risks = scanDocumentRisks(text);

        // Extract Jargon
        const foundJargon = [];
        Object.keys(LEGAL_JARGON).forEach(term => {
          if (new RegExp(`\\b${term}\\b`, 'i').test(text)) {
            foundJargon.push({ term, def: LEGAL_JARGON[term] });
          }
        });

        let piiBadge = piiInfo.maskedCount > 0
          ? `<div style="background:rgba(0,214,160,0.1);border:1px solid rgba(0,214,160,0.3);padding:8px 12px;border-radius:var(--radius-sm);margin-bottom:1rem;font-size:0.8rem;color:var(--emerald);">
              🛡️ Privacy Protection Active: Redacted ${piiInfo.maskedCount} sensitive item(s) (${piiInfo.details.join(', ')}).
            </div>`
          : '';

        let html = `
          ${piiBadge}
          <div style="margin-bottom:1.25rem;">
            <div style="font-weight:700;font-size:1.05rem;color:var(--text-primary);margin-bottom:6px;">📝 Executive Summary</div>
            <div style="line-height:1.7;">Setu AI has simplified this legal document. Safety rating is <strong>${risks.score}/100 (${risks.level})</strong>. Below is your plain-language translation.</div>
          </div>

          <div style="margin-bottom:1.25rem;">
            <div style="font-weight:700;font-size:0.95rem;color:var(--text-primary);margin-bottom:6px;">✅ Key Rights & Tenant/User Obligations</div>
            <ul>
              <li><strong>Financial Commitments:</strong> Make all payments on or before agreed deadlines to avoid late interest penalties.</li>
              <li><strong>Usage Scope:</strong> Premises/Services must be used strictly for permitted purposes outlined in the agreement.</li>
              <li><strong>Notice & Exit:</strong> Ensure written notice is submitted within the specified timeframe prior to exit or renewal.</li>
            </ul>
          </div>
        `;

        if (foundJargon.length > 0) {
          html += `
            <div style="margin-top:1.25rem;padding-top:1rem;border-top:1px solid var(--border);">
              <div style="font-weight:700;font-size:0.95rem;color:var(--saffron);margin-bottom:8px;">📚 Legal Jargon Glossary (Found in your document)</div>
              ${foundJargon.map(j => `
                <div style="background:var(--bg-glass);padding:8px 12px;border-radius:var(--radius-sm);margin-bottom:6px;font-size:0.85rem;">
                  <strong style="color:var(--text-primary);">${j.term.toUpperCase()}:</strong> ${j.def}
                </div>
              `).join('')}
            </div>
          `;
        }

        simplifyOutput.innerHTML = html;
      }, 600);
    });
  }

  /* ---- TAB 2: Compare Contracts ---- */
  if (btnRunCompare) {
    btnRunCompare.addEventListener('click', () => {
      const docA = compareDocA.value.trim();
      const docB = compareDocB.value.trim();

      if (!docA || !docB) {
        alert('Please paste text for both Document A and Document B to run comparison.');
        return;
      }

      const { text: cleanA } = processInputText(docA);
      const { text: cleanB } = processInputText(docB);

      const comp = compareContracts(cleanA, cleanB);
      compareOutput.style.display = 'block';

      let html = `
        <div style="margin-bottom:1.25rem;background:rgba(91,94,244,0.08);padding:14px 18px;border-radius:var(--radius-md);border:1px solid var(--border-glow);">
          <div style="font-weight:700;color:var(--text-primary);">📊 Risk Shift Assessment</div>
          <div style="font-size:0.9rem;color:var(--text-secondary);margin-top:4px;">${comp.riskComparison}</div>
          <div style="display:flex;gap:1.5rem;margin-top:10px;font-size:0.85rem;">
            <div>Doc A Safety Score: <strong style="color:${comp.scanA.color}">${comp.scanA.score}/100</strong></div>
            <div>Doc B Safety Score: <strong style="color:${comp.scanB.color}">${comp.scanB.score}/100</strong></div>
          </div>
        </div>

        <table class="diff-table">
          <thead>
            <tr>
              <th>Clause Category</th>
              <th>Document A (Base)</th>
              <th>Document B (Proposed)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${comp.keyDiffs.map(d => `
              <tr class="${d.isDifferent ? 'diff-row-diff' : 'diff-row-match'}">
                <td><strong>${d.category}</strong></td>
                <td>${d.docA}</td>
                <td>${d.docB}</td>
                <td>${d.isDifferent ? '<span style="color:var(--rose);font-weight:700;">⚠️ Modified</span>' : '<span style="color:var(--emerald);font-weight:600;">Match</span>'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;

      compareResultBody.innerHTML = html;
      compareOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  /* ---- TAB 3: Risk & Red Flag Scanner ---- */
  if (btnRunRiskScan) {
    btnRunRiskScan.addEventListener('click', () => {
      const rawText = riskInputText.value.trim();
      if (!rawText) return;

      const { text } = processInputText(rawText);
      const risks = scanDocumentRisks(text);

      riskOutputContainer.style.display = 'block';
      riskScoreVal.textContent = risks.score;
      riskScoreGauge.style.borderColor = risks.color;
      riskScoreGauge.style.color = risks.color;

      riskTitle.textContent = risks.level;
      riskTitle.style.color = risks.color;
      riskSummaryText.textContent = `Scanned against 12 high-risk legal patterns. Detected ${risks.flagCount} flagged clause(s).`;

      if (risks.flags.length === 0) {
        riskFlagsList.innerHTML = '<div style="color:var(--emerald);font-weight:600;padding:1rem 0;">✅ No major red flags or high-risk clauses detected in the provided text.</div>';
      } else {
        riskFlagsList.innerHTML = risks.flags.map(f => `
          <div style="background:rgba(255,78,122,0.06);border:1px solid rgba(255,78,122,0.22);border-radius:var(--radius-md);padding:14px 18px;margin-bottom:12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
              <strong style="color:var(--rose);font-size:0.95rem;">🚩 ${f.name}</strong>
              <span class="legal-badge" style="background:rgba(255,78,122,0.15);color:var(--rose);border-color:rgba(255,78,122,0.3);">${f.severity.toUpperCase()} SEVERITY</span>
            </div>
            <div style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:8px;">${f.desc}</div>
            <div style="font-size:0.85rem;color:var(--saffron-light);background:rgba(255,123,0,0.08);padding:8px 12px;border-radius:var(--radius-sm);">
              💡 <strong>Recommended Action:</strong> ${f.advice}
            </div>
          </div>
        `).join('');
      }

      riskOutputContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  /* ---- TAB 4: Document Q&A ---- */
  if (btnAskQA) {
    btnAskQA.addEventListener('click', () => {
      const doc = qaDocContext.value.trim();
      const question = qaUserQuestion.value.trim();

      if (!doc || !question) {
        alert('Please enter both document context and your question.');
        return;
      }

      const { text } = processInputText(doc);
      qaOutput.innerHTML = '<div style="text-align:center;padding:1.5rem;color:var(--indigo-light);">Searching clause text for answer…</div>';

      setTimeout(() => {
        const answerHtml = answerDocumentQuestion(question, text, 'english');
        qaOutput.innerHTML = answerHtml;
      }, 400);
    });
  }

  /* ---- TAB 5: Lawyer Brief Generator ---- */
  if (btnGenerateBrief) {
    btnGenerateBrief.addEventListener('click', () => {
      const rawText = briefInputText.value.trim();
      if (!rawText) return;

      const { text } = processInputText(rawText);
      const brief = generateLawyerBrief(text, 'Legal Agreement', 'english');

      briefOutputWrapper.style.display = 'block';

      let html = `
        <div style="margin-bottom:1.5rem;">
          <h3 style="color:var(--text-primary);margin-bottom:4px;">1. Case Overview & Risk Rating</h3>
          <p>${brief.executiveSummary}</p>
        </div>

        <div style="margin-bottom:1.5rem;">
          <h3 style="color:var(--text-primary);margin-bottom:8px;">2. Identified Concerns & Red Flags</h3>
          ${brief.redFlags.length === 0 ? '<p>No critical red flags detected.</p>' : brief.redFlags.map(rf => `
            <div style="margin-bottom:8px;padding:8px 12px;background:var(--bg-glass);border-radius:var(--radius-sm);">
              <strong style="color:var(--saffron-light);">${rf.issue} (${rf.severity}):</strong> ${rf.detail}<br/>
              <em>Recommendation:</em> ${rf.recommendation}
            </div>
          `).join('')}
        </div>

        <div style="margin-bottom:1.5rem;">
          <h3 style="color:var(--text-primary);margin-bottom:8px;">3. Recommended Action Checklist</h3>
          <ul>
            ${brief.actionChecklist.map(ac => `<li>${ac}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-bottom:1.5rem;">
          <h3 style="color:var(--text-primary);margin-bottom:8px;">4. 5 Tailored Questions for Your Lawyer</h3>
          <ol style="padding-left:1.25rem;">
            ${brief.questionsForLawyer.map(q => `<li>${q}</li>`).join('')}
          </ol>
        </div>
      `;

      currentBriefText = `LEGAL CONSULTATION BRIEF\nDate: ${brief.date}\nRisk Rating: ${brief.riskScore}\n\nOVERVIEW:\n${brief.executiveSummary}\n\nQUESTIONS FOR LAWYER:\n${brief.questionsForLawyer.join('\n')}`;
      briefContentBody.innerHTML = html;
      briefOutputWrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  /* Copy & Download Brief */
  if (btnCopyBrief) {
    btnCopyBrief.addEventListener('click', () => {
      navigator.clipboard.writeText(currentBriefText).then(() => {
        btnCopyBrief.textContent = '✅ Copied!';
        setTimeout(() => { btnCopyBrief.textContent = '📋 Copy Brief'; }, 2000);
      });
    });
  }

  if (btnDownloadBrief) {
    btnDownloadBrief.addEventListener('click', () => {
      const blob = new Blob([currentBriefText], { type: 'text/plain;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `Lawyer_Consultation_Brief_${Date.now()}.txt`;
      a.click();
    });
  }

});

/* ---- Helper: Load Sample Contracts into Active Textareas ---- */
function loadSampleContract(typeKey) {
  const sample = SAMPLE_CONTRACTS[typeKey];
  if (!sample) return;

  const legalInputText = document.getElementById('legalInputText');
  const compareDocA = document.getElementById('compareDocA');
  const compareDocB = document.getElementById('compareDocB');
  const riskInputText = document.getElementById('riskInputText');
  const qaDocContext = document.getElementById('qaDocContext');
  const briefInputText = document.getElementById('briefInputText');

  if (legalInputText) legalInputText.value = sample;
  if (compareDocA && !compareDocA.value) compareDocA.value = SAMPLE_CONTRACTS.rent_standard;
  if (compareDocB && !compareDocB.value) compareDocB.value = SAMPLE_CONTRACTS.rent_risky;
  if (riskInputText) riskInputText.value = sample;
  if (qaDocContext) qaDocContext.value = sample;
  if (briefInputText) briefInputText.value = sample;

  // Provide visual feedback
  const toast = document.createElement('div');
  toast.style.cssText = 'position:fixed;bottom:24px;right:24px;background:var(--indigo);color:#fff;padding:10px 18px;border-radius:100px;font-size:0.85rem;font-weight:600;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,0.4);';
  toast.textContent = `Loaded sample "${typeKey.replace('_', ' ').toUpperCase()}"`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}

function clearLegalInputs() {
  const legalInputText = document.getElementById('legalInputText');
  const simplifyOutput = document.getElementById('simplifyOutput');
  if (legalInputText) legalInputText.value = '';
  if (simplifyOutput) {
    simplifyOutput.innerHTML = `
      <div style="text-align:center;padding:3rem 1rem;color:var(--text-muted);">
        <div style="font-size:2.5rem;margin-bottom:1rem;">⚖️</div>
        Paste legal text on the left and click <strong>Analyze & Simplify Document</strong> to receive plain language translation, obligations, and jargon definitions.
      </div>
    `;
  }
}

function showHelplineModal() {
  const modal = document.getElementById('helplineModal');
  if (modal) modal.style.display = 'flex';
}

function hideHelplineModal() {
  const modal = document.getElementById('helplineModal');
  if (modal) modal.style.display = 'none';
}
