// ============================================================
//  Setu AI — Document Helper Engine
// ============================================================

/* ---- Sample Documents ---- */
const EXAMPLES = [
  {
    icon: '🏦',
    title: 'Bank KYC Notice',
    type: 'bank',
    snippet: '"Your account has been marked for KYC non-compliance..."',
    text: `Dear Customer,

This is to inform you that your Savings Account No. XXXX-XXXX-1234 has been marked for KYC (Know Your Customer) non-compliance as per RBI Circular No. RBI/2021-22/45 dated April 5, 2021.

As per the guidelines issued by the Reserve Bank of India, all account holders are required to update their KYC details every 10 years (for low-risk customers), every 8 years (for medium-risk), and every 2 years (for high-risk customers).

Failure to update KYC within 30 days from the date of this notice may result in restriction of transactions on your account, including debit transactions, online transfers, and ATM withdrawals.

To avoid any inconvenience, please visit your nearest branch with the following documents:
1. Aadhaar Card (original + photocopy)
2. PAN Card (original + photocopy)
3. Recent passport-size photograph
4. Proof of current address (if changed)

You may also update your KYC online at [Bank's website] or visit our nearest branch. For further assistance, call our toll-free number 1800-XXX-XXXX.

Regards,
Branch Manager`
  },
  {
    icon: '⚖️',
    title: 'Income Tax Notice (Section 148)',
    type: 'legal',
    snippet: '"Notice under Section 148 of the Income Tax Act, 1961..."',
    text: `INCOME TAX DEPARTMENT
Notice under Section 148 of the Income Tax Act, 1961

To: [Taxpayer Name]
PAN: ABCDE1234F
Assessment Year: 2021-22

Whereas I have reason to believe that your income chargeable to tax for the above assessment year has escaped assessment within the meaning of Section 147 of the Income Tax Act, 1961.

I, therefore, propose to reassess your income for the said assessment year.

You are hereby required to furnish within 30 days from the date of service of this Notice, a return of your income in the prescribed form for the said assessment year.

Please note that any tax due on the income reassessed shall be payable along with interest under Sections 234A, 234B, and 234C of the Act.

If you believe this notice has been issued in error, you may file your objections before the Assessing Officer within 30 days of service of this notice.

Issued under Digital Signature
Income Tax Officer (Assessment)
Ward No. 5(3), Delhi`
  },
  {
    icon: '🏠',
    title: 'Rent Agreement Clause',
    type: 'rent',
    snippet: '"The Tenant shall not sublet, assign or part with possession..."',
    text: `CLAUSE 7 — RESTRICTIONS ON USE OF PREMISES

The Tenant hereby agrees and undertakes that:

(a) The Tenant shall not sublet, assign, or part with possession of the said premises or any part thereof to any person without the prior written consent of the Landlord.

(b) The Tenant shall use the said premises only for residential purposes and shall not carry on any commercial, illegal, or immoral activity within the premises.

(c) The Tenant shall not make any structural alterations, additions, or improvements to the premises without the written consent of the Landlord. Any approved alterations shall become the property of the Landlord upon termination of this agreement.

(d) The Tenant shall maintain the premises in good condition and shall be liable for any damage caused to the premises beyond normal wear and tear.

(e) The Tenant shall allow the Landlord or his authorized representative to inspect the premises at reasonable times with prior notice of 24 hours.

CLAUSE 8 — SECURITY DEPOSIT

The Tenant has paid a Security Deposit of ₹50,000 (Rupees Fifty Thousand only) to the Landlord. This deposit shall be refunded within 30 days of vacating the premises, subject to deduction for any outstanding dues or damage beyond normal wear and tear.`
  },
  {
    icon: '🛡️',
    title: 'Insurance Claim Rejection',
    type: 'insurance',
    snippet: '"We regret to inform you that your claim has been repudiated..."',
    text: `Dear Policyholder,

Policy Number: LIC/HEALTH/2023/78456
Claim Reference: CLM/2024/00123

We regret to inform you that your health insurance claim dated March 15, 2024 for hospitalisation expenses amounting to ₹87,450 has been repudiated on the following grounds:

1. PRE-EXISTING DISEASE EXCLUSION: The condition for which treatment was sought (Type 2 Diabetes Mellitus with complications) has been identified as a pre-existing disease. As per Policy Clause 4.1, pre-existing diseases are not covered for a period of 48 months from the policy inception date. Your policy commenced on January 1, 2022, and therefore the 48-month waiting period has not been completed.

2. INCOMPLETE DOCUMENTATION: The discharge summary does not mention the exact date of diagnosis of the primary condition, which is required for evaluation of waiting period applicability.

You have the right to appeal this decision. If you wish to appeal, please submit your written representation along with supporting medical records to our Grievance Redressal Officer within 15 days of receipt of this letter.

If unsatisfied with our resolution, you may approach the Insurance Ombudsman in your region or the IRDAI Grievance Cell (Toll Free: 155255).

Yours sincerely,
Claims Department`
  },
  {
    icon: '🏛️',
    title: 'Property Tax Demand Notice',
    type: 'govt',
    snippet: '"You are hereby directed to pay the outstanding property tax..."',
    text: `MUNICIPAL CORPORATION — PROPERTY TAX DEPARTMENT
DEMAND NOTICE

Property ID: MCD/SOUTH/2024/00456
Owner Name: [Property Owner]
Property Address: [Full Address]

SUBJECT: Outstanding Property Tax Demand for Financial Year 2023-24

You are hereby directed to pay the outstanding property tax amount as detailed below within 30 days from the date of this notice, failing which the Municipal Corporation shall be constrained to take legal action under the Delhi Municipal Corporation Act, 1957.

Outstanding Amount Breakup:
- Base Tax (FY 2023-24): ₹12,400
- Penalty @ 1% per month (6 months): ₹744
- Previous Balance (FY 2022-23): ₹3,200
- Total Amount Due: ₹16,344

Mode of Payment:
1. Online: Visit mcdonlinepayments.com
2. In-person: Visit Zone Office, Counter 3-7 (Mon-Fri, 10AM-4PM)
3. Mobile App: MCD mParichay App

Please carry this notice and your Property ID for all payments. The receipt must be retained for future reference.

Non-payment may result in attachment and auction of the property as per Section 154 of DMC Act.`
  },
  {
    icon: '📱',
    title: 'Loan EMI Overdue Notice',
    type: 'bank',
    snippet: '"Your loan EMI is overdue. Please pay immediately to avoid CIBIL impact..."',
    text: `Dear [Borrower Name],

Loan Account Number: HDFC/PL/2023/98761
Loan Type: Personal Loan
EMI Amount: ₹8,540

OVERDUE NOTICE

This is to inform you that your EMI payment due on March 5, 2024 has not been received by us as on the date of this notice. Your loan account is now classified as overdue (DPD: 32 days).

Outstanding Amount: ₹8,540
Late Payment Fee: ₹500
Penal Interest (32 days @ 24% p.a.): ₹187
Total Amount Payable: ₹9,227

Continued non-payment will result in:
1. Negative reporting to CIBIL and other credit bureaus, which will lower your credit score
2. Additional penal charges on the outstanding amount
3. Legal action as per the Loan Agreement
4. Recovery proceedings under SARFAESI Act (for secured loans)

Please pay immediately through:
• Net Banking using your account credentials
• NEFT/RTGS to our collection account
• Visit any branch with this notice

For payment arrangement or if you are facing financial hardship, please contact our Customer Care at 1800-202-6161 (Toll Free) within 7 days.

Collections Department`
  }
];

/* ---- Document Analysis Engine ---- */
const ANALYSIS_TEMPLATES = {
  bank: {
    type: 'Bank / Financial Document',
    tags: ['Banking', 'Financial', 'RBI Regulated'],
    urgencyColor: 'var(--saffron)',
    urgencyIcon: '⚠️',
  },
  legal: {
    type: 'Legal Notice',
    tags: ['Legal', 'Requires Response', 'Time-Sensitive'],
    urgencyColor: 'var(--rose)',
    urgencyIcon: '🚨',
  },
  govt: {
    type: 'Government Letter',
    tags: ['Government', 'Official', 'Action Required'],
    urgencyColor: 'var(--saffron)',
    urgencyIcon: '📋',
  },
  insurance: {
    type: 'Insurance Document',
    tags: ['Insurance', 'IRDAI', 'Health / Life'],
    urgencyColor: 'var(--saffron)',
    urgencyIcon: '🛡️',
  },
  rent: {
    type: 'Rental / Property Document',
    tags: ['Property', 'Contract', 'Tenant Rights'],
    urgencyColor: 'var(--emerald)',
    urgencyIcon: '🏠',
  },
  auto: {
    type: 'Document',
    tags: ['Analysed by Setu AI'],
    urgencyColor: 'var(--indigo)',
    urgencyIcon: '📄',
  }
};

function detectDocType(text) {
  const lower = text.toLowerCase();
  if (lower.includes('kyc') || lower.includes('emi') || lower.includes('loan') || lower.includes('account') || lower.includes('bank') || lower.includes('neft') || lower.includes('cibil')) return 'bank';
  if (lower.includes('income tax') || lower.includes('section 148') || lower.includes('notice') && lower.includes('court') || lower.includes('legal')) return 'legal';
  if (lower.includes('municipal') || lower.includes('property tax') || lower.includes('ration') || lower.includes('government') || lower.includes('municipal corporation')) return 'govt';
  if (lower.includes('insurance') || lower.includes('claim') || lower.includes('irdai') || lower.includes('policy') || lower.includes('premium')) return 'insurance';
  if (lower.includes('rent') || lower.includes('tenant') || lower.includes('landlord') || lower.includes('lease') || lower.includes('deposit')) return 'rent';
  return 'auto';
}

function extractKeyInfo(text) {
  const lower = text.toLowerCase();

  // Extract amounts
  const amounts = [];
  const amountRegex = /₹[\d,]+(?:\.\d+)?|rs\.?\s*[\d,]+(?:\.\d+)?|\b\d{1,3}(?:,\d{3})*(?:\.\d+)?\s*(?:rupees|lakh|crore)/gi;
  const amountMatches = text.match(amountRegex) || [];
  amountMatches.slice(0, 3).forEach(a => amounts.push(a.trim()));

  // Extract deadlines
  const deadlines = [];
  const deadlineRegex = /within\s+\d+\s+days?|by\s+\w+\s+\d+,?\s+\d{4}|\d+\s+days?\s+from|due\s+(?:on|by|date)[:\s]+[^\n.]+/gi;
  const deadlineMatches = text.match(deadlineRegex) || [];
  deadlineMatches.slice(0, 2).forEach(d => deadlines.push(d.trim()));

  // Extract contact info
  const contacts = [];
  const phoneRegex = /\d{10}|\d{4}-\d{3}-\d{4}|1800[-\s]\d{3}[-\s]\d{4}|1800\d{6,7}/g;
  const phoneMatches = text.match(phoneRegex) || [];
  phoneMatches.slice(0, 2).forEach(p => contacts.push(p));

  return { amounts, deadlines, contacts };
}

function generateSimpleSummary(text, type, lang) {
  const info = extractKeyInfo(text);
  const template = ANALYSIS_TEMPLATES[type] || ANALYSIS_TEMPLATES.auto;
  const isHindi = lang === 'hindi';

  // Build a contextual explanation based on doc type
  const explanations = {
    bank_en: {
      summary: "This is a notice from your bank or a financial institution. It requires your attention and possibly an action within a specific timeframe.",
      what: [
        "Your bank has sent this because of an issue with your account or loan",
        "They may need you to submit documents, make a payment, or verify information",
        "Ignoring this notice could lead to account restrictions or credit score impact"
      ],
      action: info.amounts.length > 0
        ? `Pay the outstanding amount of ${info.amounts[0]} as soon as possible. Use Net Banking, UPI, or visit the nearest branch.`
        : "Visit your nearest bank branch with your Aadhaar, PAN, and a copy of this notice.",
      office: "Your nearest bank branch or the bank's toll-free helpline"
    },
    bank_hi: {
      summary: "यह आपके बैंक या किसी वित्तीय संस्था की तरफ से एक नोटिस है। इस पर ध्यान देना और समय पर कार्रवाई करना जरूरी है।",
      what: [
        "आपके बैंक ने आपके खाते या लोन में किसी समस्या के कारण यह नोटिस भेजा है",
        "उन्हें आपसे दस्तावेज़, भुगतान या जानकारी की पुष्टि की आवश्यकता हो सकती है",
        "इस नोटिस को अनदेखा करने से खाता प्रतिबंध या CIBIL स्कोर पर असर पड़ सकता है"
      ],
      action: info.amounts.length > 0
        ? `${info.amounts[0]} की बकाया राशि जल्द से जल्द चुकाएं। नेट बैंकिंग, UPI, या नजदीकी शाखा में जाएं।`
        : "अपना आधार, पैन और इस नोटिस की कॉपी लेकर नजदीकी बैंक शाखा में जाएं।",
      office: "नजदीकी बैंक शाखा या बैंक का टोल-फ्री हेल्पलाइन नंबर"
    },
    legal_en: {
      summary: "This is a legal notice. It carries legal weight and requires a formal response within the specified time period. Do not ignore it.",
      what: [
        "A legal authority or party has issued this notice to inform you of a legal matter",
        "You are required to respond or take action within the deadline mentioned",
        "Failing to respond could result in legal proceedings against you"
      ],
      action: "Consult a lawyer or legal aid centre immediately. Do not respond to this notice on your own without legal advice. Many districts have free Legal Aid Services — contact your District Legal Services Authority (DLSA).",
      office: "District Court, Legal Aid Centre, or a qualified advocate"
    },
    legal_hi: {
      summary: "यह एक कानूनी नोटिस है। इसका कानूनी महत्व है और इसे निर्धारित समय के भीतर औपचारिक जवाब देना जरूरी है। इसे नजरअंदाज न करें।",
      what: [
        "किसी कानूनी प्राधिकरण या पक्ष ने आपको एक कानूनी मामले के बारे में सूचित करने के लिए यह नोटिस जारी किया है",
        "आपको नोटिस में उल्लिखित समय सीमा के भीतर जवाब देना या कार्रवाई करना होगा",
        "जवाब न देने पर आपके खिलाफ कानूनी कार्यवाही हो सकती है"
      ],
      action: "तुरंत किसी वकील या कानूनी सहायता केंद्र से परामर्श करें। बिना कानूनी सलाह के खुद से जवाब न दें। जिला कानूनी सेवा प्राधिकरण (DLSA) से निःशुल्क सहायता मिल सकती है।",
      office: "जिला न्यायालय, कानूनी सहायता केंद्र, या योग्य अधिवक्ता"
    },
    govt_en: {
      summary: "This is an official government notice or letter. It requires your attention and likely requires you to pay dues, submit documents, or respond formally.",
      what: [
        "A government department or municipality has identified an issue that needs resolution",
        "There may be outstanding dues, missing documents, or compliance requirements",
        "Non-compliance may result in penalties, attachment of property, or legal action"
      ],
      action: info.amounts.length > 0
        ? `Pay the total due of ${info.amounts[0]} online through the official portal or at the office. Carry this notice when paying.`
        : "Visit the relevant government office with your ID proof, property documents, and a copy of this notice.",
      office: "Relevant government office / municipal corporation mentioned in the notice"
    },
    govt_hi: {
      summary: "यह एक सरकारी विभाग की आधिकारिक नोटिस है। इस पर ध्यान देना जरूरी है — इसमें बकाया भुगतान, दस्तावेज़ जमा करने, या औपचारिक जवाब की आवश्यकता हो सकती है।",
      what: [
        "किसी सरकारी विभाग या नगर पालिका ने एक समस्या की पहचान की है जिसे हल करना जरूरी है",
        "बकाया राशि, लापता दस्तावेज़, या अनुपालन आवश्यकताएं हो सकती हैं",
        "अनुपालन न करने पर जुर्माना, संपत्ति कुर्की, या कानूनी कार्यवाही हो सकती है"
      ],
      action: info.amounts.length > 0
        ? `आधिकारिक पोर्टल या कार्यालय में ${info.amounts[0]} की कुल बकाया राशि का भुगतान करें। भुगतान करते समय यह नोटिस साथ ले जाएं।`
        : "अपना पहचान प्रमाण, संबंधित दस्तावेज़ और इस नोटिस की कॉपी लेकर संबंधित सरकारी कार्यालय जाएं।",
      office: "नोटिस में उल्लिखित संबंधित सरकारी कार्यालय"
    },
    insurance_en: {
      summary: "This is an insurance document — likely a policy, claim update, or rejection letter. Insurance language can be complex; here's what it means for you.",
      what: [
        "Your insurance company is communicating about a claim, policy, or coverage matter",
        "There may be a waiting period, exclusion clause, or documentation requirement involved",
        "You have rights as a policyholder to appeal decisions or approach IRDAI"
      ],
      action: "If your claim was rejected: File an appeal within 15 days with supporting documents. If still unsatisfied, contact the Insurance Ombudsman (free service) or IRDAI helpline: 155255.",
      office: "Your insurance company's grievance cell, or the nearest Insurance Ombudsman office"
    },
    insurance_hi: {
      summary: "यह एक बीमा दस्तावेज़ है — जैसे कि पॉलिसी, क्लेम अपडेट, या अस्वीकृति पत्र। बीमा की भाषा जटिल होती है — यहाँ इसका सरल अर्थ है।",
      what: [
        "आपकी बीमा कंपनी क्लेम, पॉलिसी, या कवरेज से जुड़ी जानकारी दे रही है",
        "इसमें प्रतीक्षा अवधि, बहिष्करण खंड, या दस्तावेज़ आवश्यकता शामिल हो सकती है",
        "पॉलिसीधारक के रूप में आपके पास निर्णय के खिलाफ अपील करने या IRDAI से संपर्क करने का अधिकार है"
      ],
      action: "यदि आपका दावा अस्वीकार किया गया: सहायक दस्तावेज़ों के साथ 15 दिनों के भीतर अपील करें। यदि फिर भी संतुष्ट नहीं हैं, तो बीमा लोकपाल (निःशुल्क सेवा) या IRDAI हेल्पलाइन: 155255 से संपर्क करें।",
      office: "आपकी बीमा कंपनी की शिकायत प्रकोष्ठ, या निकटतम बीमा लोकपाल कार्यालय"
    },
    rent_en: {
      summary: "This is a rental or property agreement clause. It defines your rights and responsibilities as a tenant or landlord. Here's what it means in plain language.",
      what: [
        "This agreement sets legally binding rules about how the property can be used",
        "Key clauses cover: subletting restrictions, maintenance responsibilities, deposit terms, and notice periods",
        "Violating these clauses could give grounds for eviction or legal action"
      ],
      action: info.amounts.length > 0
        ? `Security deposit of ${info.amounts[0]} should be refunded within the timeframe mentioned. If not returned, send a written demand and approach the Rent Control Court.`
        : "Read every clause carefully before signing. If unsure about any clause, consult a local lawyer or tenant rights organisation.",
      office: "Rent Control Court, District Court, or a local tenant rights advocate"
    },
    rent_hi: {
      summary: "यह एक किराया या संपत्ति अनुबंध का खंड है। यह किरायेदार या मकान मालिक के रूप में आपके अधिकारों और जिम्मेदारियों को परिभाषित करता है।",
      what: [
        "यह अनुबंध संपत्ति के उपयोग के बारे में कानूनी रूप से बाध्यकारी नियम निर्धारित करता है",
        "मुख्य खंड: उपकिराया प्रतिबंध, रखरखाव जिम्मेदारी, जमा शर्तें, और नोटिस अवधि",
        "इन खंडों का उल्लंघन बेदखली या कानूनी कार्यवाही का आधार बन सकता है"
      ],
      action: info.amounts.length > 0
        ? `${info.amounts[0]} की सुरक्षा जमा राशि उल्लिखित समय सीमा के भीतर वापस की जानी चाहिए। यदि नहीं लौटाई जाती है, तो लिखित मांग भेजें और किराया नियंत्रण न्यायालय में जाएं।`
        : "हस्ताक्षर करने से पहले हर खंड को ध्यान से पढ़ें। यदि किसी खंड के बारे में अनिश्चित हैं, तो स्थानीय वकील से परामर्श करें।",
      office: "किराया नियंत्रण न्यायालय, जिला न्यायालय, या स्थानीय किरायेदार अधिकार अधिवक्ता"
    },
    auto_en: {
      summary: "Setu has analysed this document. Here's a plain-language breakdown of what it says and what you should do.",
      what: [
        "This appears to be an official communication requiring your attention",
        "There may be deadlines, amounts, or required actions mentioned",
        "Read carefully and take note of any contact information provided"
      ],
      action: "Visit the relevant office or call the contact number in the document. Carry your Aadhaar, PAN, and the original document along with a photocopy.",
      office: "The office or authority mentioned in the document"
    },
    auto_hi: {
      summary: "सेतु ने इस दस्तावेज़ का विश्लेषण किया है। यहाँ सरल भाषा में बताया गया है कि इसमें क्या है और आपको क्या करना चाहिए।",
      what: [
        "यह एक आधिकारिक संचार प्रतीत होता है जिस पर आपका ध्यान चाहिए",
        "इसमें समय सीमा, राशि, या आवश्यक कार्रवाई का उल्लेख हो सकता है",
        "ध्यान से पढ़ें और दिए गए संपर्क जानकारी को नोट करें"
      ],
      action: "दस्तावेज़ में उल्लिखित कार्यालय में जाएं या संपर्क नंबर पर कॉल करें। आधार, पैन, और मूल दस्तावेज़ की फोटोकॉपी साथ लेकर जाएं।",
      office: "दस्तावेज़ में उल्लिखित कार्यालय या प्राधिकरण"
    }
  };

  const key = `${type}_${isHindi ? 'hi' : 'en'}`;
  const content = explanations[key] || explanations[`auto_${isHindi ? 'hi' : 'en'}`];
  const meta = template;

  return { content, meta, info, isHindi };
}

function renderOutput({ content, meta, info, isHindi }) {
  const deadlineHtml = info.deadlines.length > 0
    ? `<div class="deadline-box" style="margin-bottom:1rem;">🚨 <strong>Deadline detected:</strong> ${info.deadlines[0]}</div>` : '';

  const amountsHtml = info.amounts.length > 0
    ? `<div class="tag-row">${info.amounts.map(a => `<span class="result-tag">💰 ${a}</span>`).join('')}</div>` : '';

  const contactHtml = info.contacts.length > 0
    ? `<div class="tip-item" style="margin-top:0.75rem;"><span class="tip-icon">📞</span><strong>${isHindi ? 'हेल्पलाइन:' : 'Helpline found:'}</strong> ${info.contacts.join(', ')}</div>` : '';

  return `
    <div class="result-section">
      <div class="result-section-title" style="color:${meta.urgencyColor}">${meta.urgencyIcon} ${isHindi ? 'दस्तावेज़ का प्रकार' : 'Document Type'}: ${meta.type}</div>
      <div class="tag-row">${meta.tags.map(t => `<span class="result-tag">${t}</span>`).join('')}</div>
    </div>

    ${deadlineHtml}

    <div class="result-section">
      <div class="result-section-title">📝 ${isHindi ? 'सरल भाषा में' : 'In Plain Language'}</div>
      <div class="result-section-body">${content.summary}</div>
    </div>

    <div class="result-section">
      <div class="result-section-title">🔍 ${isHindi ? 'मुख्य बातें' : 'Key Points'}</div>
      <div class="result-section-body"><ul>${content.what.map(w => `<li>${w}</li>`).join('')}</ul></div>
      ${amountsHtml}
    </div>

    <div class="result-section">
      <div class="result-section-title">✅ ${isHindi ? 'आपको क्या करना है' : 'What You Need to Do'}</div>
      <div class="action-box">${content.action}</div>
    </div>

    <div class="result-section">
      <div class="result-section-title">🏢 ${isHindi ? 'कहाँ जाएं' : 'Where to Go'}</div>
      <div class="result-section-body">${content.office}</div>
      ${contactHtml}
    </div>

    <div style="margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border);font-size:0.75rem;color:var(--text-muted);text-align:center;">
      ${isHindi
        ? '⚠️ यह AI द्वारा एक सामान्य व्याख्या है। महत्वपूर्ण कानूनी या वित्तीय मामलों के लिए हमेशा एक योग्य पेशेवर से परामर्श करें।'
        : '⚠️ This is a general AI explanation. Always consult a qualified professional for important legal or financial matters.'}
    </div>
  `;
}

/* ---- State ---- */
let selectedType = 'auto';
let selectedLang = 'english';
let currentText = '';

/* ---- DOM refs ---- */
const docInput = document.getElementById('docInput');
const docOutput = document.getElementById('docOutput');
const charCount = document.getElementById('charCount');
const analyseBtn = document.getElementById('analyseBtn');

/* ---- Event Listeners ---- */

// Type chips
document.querySelectorAll('.doc-type-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.doc-type-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    selectedType = chip.dataset.type;
  });
});

// Language toggle
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedLang = btn.dataset.lang;
  });
});

// Char count
docInput.addEventListener('input', () => {
  const len = docInput.value.length;
  charCount.textContent = `${len.toLocaleString()} character${len !== 1 ? 's' : ''}`;
  charCount.style.color = len > 5000 ? 'var(--rose)' : 'var(--text-muted)';
});

// Clear
document.getElementById('clearDocBtn').addEventListener('click', () => {
  docInput.value = '';
  charCount.textContent = '0 characters';
  docOutput.innerHTML = `<div class="output-placeholder" id="outputPlaceholder">
    <div class="output-placeholder-icon">📄</div>
    <div class="output-placeholder-text">
      Paste your document on the left and click <strong style="color:var(--text-primary)">Analyse Document</strong>.<br /><br />
      Setu will explain it in plain language and tell you exactly what to do next.
    </div>
  </div>`;
  docInput.focus();
});

// Analyse
analyseBtn.addEventListener('click', () => {
  const text = docInput.value.trim();
  if (!text) {
    docInput.style.borderColor = 'var(--rose)';
    docInput.placeholder = '⚠️ Please paste some document text first!';
    setTimeout(() => {
      docInput.style.borderColor = '';
    }, 2000);
    return;
  }

  // Show loading
  docOutput.innerHTML = '';
  docOutput.classList.add('loading');
  analyseBtn.textContent = 'Analysing…';
  analyseBtn.disabled = true;

  setTimeout(() => {
    const type = selectedType === 'auto' ? detectDocType(text) : selectedType;
    const analysis = generateSimpleSummary(text, type, selectedLang);
    docOutput.classList.remove('loading');
    docOutput.innerHTML = renderOutput(analysis);
    analyseBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg> Analyse Document`;
    analyseBtn.disabled = false;
    docOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 1800);
});

/* ---- Render Examples ---- */
const examplesGrid = document.getElementById('examplesGrid');
EXAMPLES.forEach((ex, i) => {
  const card = document.createElement('div');
  card.className = 'example-card';
  card.id = `example${i}`;
  card.innerHTML = `
    <div class="example-card-icon">${ex.icon}</div>
    <div class="example-card-title">${ex.title}</div>
    <div class="example-card-snippet">${ex.snippet}</div>
  `;
  card.addEventListener('click', () => {
    docInput.value = ex.text;
    charCount.textContent = `${ex.text.length.toLocaleString()} characters`;
    // Auto-select matching type
    document.querySelectorAll('.doc-type-chip').forEach(c => c.classList.remove('active'));
    const matchChip = document.querySelector(`[data-type="${ex.type}"]`);
    if (matchChip) { matchChip.classList.add('active'); selectedType = ex.type; }
    docInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    docInput.focus();
  });
  examplesGrid.appendChild(card);
});

/* ---- Scroll reveal ---- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.example-card').forEach(el => {
  el.style.opacity = '0'; el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(el);
});

/* ---- Navbar ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});
