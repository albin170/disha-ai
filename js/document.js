// ============================================================
//  Disha AI — Document Helper Engine (document.js)
// ============================================================

(function (global) {
  'use strict';

  const DishaAI = global.DishaAI || {};
  global.DishaAI = DishaAI;

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
    }
  ];

  /* ---- Analysis Templates ---- */
  const ANALYSIS_TEMPLATES = {
    bank: { type: 'Bank / Financial Document', tags: ['Banking', 'Financial', 'RBI Regulated'], urgencyColor: 'var(--saffron)', urgencyIcon: '⚠️' },
    legal: { type: 'Legal Notice', tags: ['Legal', 'Requires Response', 'Time-Sensitive'], urgencyColor: 'var(--rose)', urgencyIcon: '🚨' },
    govt: { type: 'Government Letter', tags: ['Government', 'Official', 'Action Required'], urgencyColor: 'var(--saffron)', urgencyIcon: '📋' },
    insurance: { type: 'Insurance Document', tags: ['Insurance', 'IRDAI', 'Health / Life'], urgencyColor: 'var(--saffron)', urgencyIcon: '🛡️' },
    rent: { type: 'Rental / Property Document', tags: ['Property', 'Contract', 'Tenant Rights'], urgencyColor: 'var(--emerald)', urgencyIcon: '🏠' },
    auto: { type: 'Document', tags: ['Analysed by Setu AI'], urgencyColor: 'var(--indigo)', urgencyIcon: '📄' }
  };

  function detectDocType(text) {
    if (!text || typeof text !== 'string') return 'auto';
    const lower = text.toLowerCase();
    if (/\b(?:rent|rental|tenant|landlord|lease|sublet)\b/i.test(lower)) return 'rent';
    if (/\b(?:kyc|emi|loan|cibil|bank|savings account)\b/i.test(lower)) return 'bank';
    if (/\b(?:income tax|section 148|court notice|legal notice)\b/i.test(lower)) return 'legal';
    if (/\b(?:municipal|property tax|government|corporation)\b/i.test(lower)) return 'govt';
    if (/\b(?:insurance|claim|irdai|policyholder)\b/i.test(lower)) return 'insurance';
    return 'auto';
  }

  function extractKeyInfo(text) {
    if (!text || typeof text !== 'string') return { amounts: [], deadlines: [], contacts: [] };

    const amounts = [];
    const amountRegex = /₹[\d,]+(?:\.\d+)?|rs\.?\s*[\d,]+(?:\.\d+)?|\b\d{1,3}(?:,\d{3})*(?:\.\d+)?\s*(?:rupees|lakh|crore)/gi;
    const amountMatches = text.match(amountRegex) || [];
    amountMatches.slice(0, 3).forEach(a => amounts.push(a.trim()));

    const deadlines = [];
    const deadlineRegex = /within\s+\d+\s+days?|by\s+\w+\s+\d+,?\s+\d{4}|\d+\s+days?\s+from|due\s+(?:on|by|date)[:\s]+[^\n.]+/gi;
    const deadlineMatches = text.match(deadlineRegex) || [];
    deadlineMatches.slice(0, 2).forEach(d => deadlines.push(d.trim()));

    const contacts = [];
    const phoneRegex = /(?:\+91[\s-]?)?(?:1800[\s-]?[0-9]{3,4}[-\s]?[0-9]{4}|\b[6-9][0-9]{9}\b|\b1800[0-9]{6,7}\b)/g;
    const phoneMatches = text.match(phoneRegex) || [];
    phoneMatches.slice(0, 2).forEach(p => contacts.push(p));

    return { amounts, deadlines, contacts };
  }

  function generateSimpleSummary(text, type = 'auto', lang = 'english') {
    const info = extractKeyInfo(text);
    const template = ANALYSIS_TEMPLATES[type] || ANALYSIS_TEMPLATES.auto;
    const isHindi = lang === 'hindi';

    const explanations = {
      bank_en: {
        summary: "This is a notice from your bank or a financial institution. It requires your attention and an action within a specific timeframe.",
        what: ["Your bank sent this regarding your account or loan compliance", "You may need to submit documents or clear dues", "Ignoring this notice could lead to account restrictions"],
        action: info.amounts.length > 0 ? `Pay the outstanding amount of ${info.amounts[0]} via Net Banking, UPI, or branch.` : "Visit your nearest branch with Aadhaar, PAN, and a copy of this notice.",
        office: "Your nearest bank branch or the bank's toll-free helpline"
      },
      bank_hi: {
        summary: "यह आपके बैंक की तरफ से नोटिस है। समय पर कार्रवाई करना जरूरी है।",
        what: ["बैंक ने खाते या लोन की समस्या के कारण नोटिस भेजा है", "दस्तावेज़ जमा करने या भुगतान की आवश्यकता हो सकती है", "अनदेखा करने से खाता प्रभावित हो सकता है"],
        action: info.amounts.length > 0 ? `${info.amounts[0]} की बकाया राशि जल्द चुकाएं।` : "अपना आधार, पैन और नोटिस लेकर बैंक शाखा जाएं।",
        office: "नजदीकी बैंक शाखा या हेल्पलाइन नंबर"
      },
      legal_en: {
        summary: "This is a legal notice. It carries legal weight and requires a formal response within the specified deadline.",
        what: ["A legal authority has issued this notice regarding a matter", "Action or reply is required within the stated deadline", "Failing to respond could lead to legal proceedings"],
        action: "Consult a qualified advocate or District Legal Services Authority (DLSA) immediately.",
        office: "District Court, Legal Aid Centre, or an advocate"
      },
      legal_hi: {
        summary: "यह एक कानूनी नोटिस है। निर्धारित समय में जवाब देना जरूरी है।",
        what: ["कानूनी प्राधिकरण ने यह नोटिस जारी किया है", "समय सीमा के भीतर जवाब देना अनिवार्य है", "कार्रवाई न करने पर कानूनी कार्यवाही हो सकती है"],
        action: "तुरंत वकील या जिला कानूनी सेवा प्राधिकरण (DLSA) से परामर्श करें।",
        office: "जिला न्यायालय या कानूनी सहायता केंद्र"
      },
      auto_en: {
        summary: "Setu has analysed this document. Here is a plain-language summary.",
        what: ["Official communication requiring your attention", "Contains important deadlines or details", "Keep a copy of this document for records"],
        action: "Visit the relevant office or call the helpline number listed in the document.",
        office: "The office or authority mentioned in the document"
      },
      auto_hi: {
        summary: "सेतु ने दस्तावेज़ का विश्लेषण किया है। यहाँ सरल सारांश है।",
        what: ["आधिकारिक संदेश जिस पर ध्यान देना आवश्यक है", "समय सीमा या विवरण शामिल है", "दस्तावेज़ की प्रति सुरक्षित रखें"],
        action: "संबंधित कार्यालय जाएं या हेल्पलाइन पर कॉल करें।",
        office: "दस्तावेज़ में उल्लिखित कार्यालय"
      }
    };

    const key = `${type}_${isHindi ? 'hi' : 'en'}`;
    const content = explanations[key] || explanations[`auto_${isHindi ? 'hi' : 'en'}`];
    return { content, meta: template, info, isHindi };
  }

  DishaAI.Document = {
    EXAMPLES,
    ANALYSIS_TEMPLATES,
    detectDocType,
    extractKeyInfo,
    generateSimpleSummary
  };

  global.detectDocType = detectDocType;
  global.extractKeyInfo = extractKeyInfo;
  global.generateSimpleSummary = generateSimpleSummary;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      EXAMPLES,
      ANALYSIS_TEMPLATES,
      detectDocType,
      extractKeyInfo,
      generateSimpleSummary
    };
  }
})(typeof window !== 'undefined' ? window : global);
