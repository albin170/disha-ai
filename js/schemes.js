// ============================================================
//  Disha AI — Schemes Finder Engine (schemes.js)
// ============================================================

(function (global) {
  'use strict';

  const DishaAI = global.DishaAI || {};
  global.DishaAI = DishaAI;

  const ALL_SCHEMES = [
    // Education
    { id: 1, name: 'PM Scholarship Scheme (PMSS)', category: 'Education', desc: 'Scholarship for wards of ex-servicemen & Coast Guard. ₹2500-₹3000/month.', eligible: 'Students with 60%+ in 12th, ward of ex-serviceman', link: 'https://ksb.gov.in/', who: ['student'], income: ['low','mid'], state: 'all' },
    { id: 2, name: 'National Means-cum-Merit Scholarship (NMMS)', category: 'Education', desc: '₹12,000/year for economically weaker students in Class 9–12.', eligible: 'Class 8 students, family income below ₹3.5L', link: 'https://scholarships.gov.in/', who: ['student'], income: ['low'], state: 'all' },
    { id: 3, name: 'Central Sector Scheme of Scholarships', category: 'Education', desc: '₹10,000–₹20,000/year for meritorious students in Degree/PG courses.', eligible: 'Top 20th percentile in 12th boards, income < ₹8L', link: 'https://scholarships.gov.in/', who: ['student'], income: ['low','mid'], state: 'all' },
    { id: 4, name: 'Post-Matric Scholarship (SC/ST)', category: 'Education', desc: 'Full tuition fee + maintenance allowance for SC/ST students pursuing higher education.', eligible: 'SC/ST students studying post-class 10', link: 'https://scholarships.gov.in/', who: ['student'], income: ['low','mid'], state: 'all' },
    { id: 5, name: 'Pragati Scholarship (Girls in Technical Education)', category: 'Education', desc: '₹50,000/year for girl students in AICTE-approved technical institutions.', eligible: 'Girl students in Diploma/Degree technical programs, family income < ₹8L', link: 'https://www.aicte-india.org/', who: ['student'], income: ['low','mid'], state: 'all' },

    // Business & Self-Employment
    { id: 6, name: 'PM Mudra Loan — Shishu', category: 'Business', desc: 'Collateral-free loans up to ₹50,000 to start a small business or self-employment.', eligible: 'Any Indian citizen with a business plan, no criminal record', link: 'https://www.mudra.org.in/', who: ['youth','adult'], income: ['low','mid'], state: 'all' },
    { id: 7, name: 'PM Mudra Loan — Kishore', category: 'Business', desc: 'Loans from ₹50,000 to ₹5 lakh for growing businesses.', eligible: 'Existing businesses with proof of operations', link: 'https://www.mudra.org.in/', who: ['youth','adult'], income: ['low','mid','high'], state: 'all' },
    { id: 8, name: 'Startup India Seed Fund (SISFS)', category: 'Business', desc: 'Up to ₹20 lakh for early-stage startups for proof of concept, prototype development.', eligible: 'DPIIT-recognized startup, incorporated < 2 years', link: 'https://startupindia.gov.in/', who: ['youth','adult'], income: ['mid','high'], state: 'all' },
    { id: 9, name: 'Stand-Up India', category: 'Business', desc: 'Bank loans from ₹10 lakh to ₹1 crore for SC/ST and women entrepreneurs.', eligible: 'SC/ST or women entrepreneurs for greenfield businesses', link: 'https://www.standupmitra.in/', who: ['adult'], income: ['low','mid'], state: 'all' },

    // Agriculture
    { id: 10, name: 'PM Kisan Samman Nidhi (PM-KISAN)', category: 'Agriculture', desc: '₹6,000/year (₹2,000 per installment) directly to farmers\' bank accounts.', eligible: 'Small & marginal farmers with land records', link: 'https://pmkisan.gov.in/', who: ['adult'], income: ['low','mid'], state: 'all' },
    { id: 11, name: 'PM Kisan MaanDhan Yojana', category: 'Agriculture', desc: 'Pension of ₹3,000/month after age 60 for small farmers.', eligible: 'Farmers aged 18-40, landholding < 2 hectares', link: 'https://pmkmy.gov.in/', who: ['adult'], income: ['low'], state: 'all' },
    { id: 12, name: 'Soil Health Card Scheme', category: 'Agriculture', desc: 'Free soil testing and customized fertilizer recommendations to boost crop yield.', eligible: 'All farmers across India', link: 'https://soilhealth.dac.gov.in/', who: ['adult'], income: ['low','mid'], state: 'all' },

    // Health
    { id: 13, name: 'Ayushman Bharat — PM-JAY', category: 'Health', desc: 'Free health cover up to ₹5 lakh per family per year across 23,000+ hospitals.', eligible: 'Families in SECC 2011 database or occupational categories', link: 'https://pmjay.gov.in/', who: ['student','youth','adult'], income: ['low'], state: 'all' },
    { id: 14, name: 'Janani Suraksha Yojana (JSY)', category: 'Health', desc: 'Cash incentive for institutional delivery to reduce maternal mortality.', eligible: 'Pregnant women from BPL families', link: 'https://nhm.gov.in/', who: ['adult'], income: ['low'], state: 'all' },

    // Women
    { id: 15, name: 'Mahila Shakti Kendra Scheme', category: 'Women', desc: 'Support for rural women through skill development, employment, and digital literacy.', eligible: 'Rural women across India', link: 'https://wcd.nic.in/', who: ['youth','adult'], income: ['low','mid'], state: 'all' },
    { id: 16, name: 'Pradhan Mantri Matru Vandana Yojana', category: 'Women', desc: '₹5,000 maternity benefit for the first live birth. Paid in 3 installments.', eligible: 'Pregnant and lactating women for first child', link: 'https://pmmvy.nic.in/', who: ['adult'], income: ['low','mid'], state: 'all' },
    { id: 17, name: 'Beti Bachao Beti Padhao', category: 'Women', desc: 'Sukanya Samriddhi Account for girl children with high interest rate and tax benefits.', eligible: 'Girl children below age 10', link: 'https://wcdhry.gov.in/', who: ['student'], income: ['low','mid','high'], state: 'all' },

    // Digital/Skills
    { id: 18, name: 'PM eVIDYA / SWAYAM', category: 'Education', desc: 'Free online courses from IITs, IIMs, and top universities. Certificates on completion.', eligible: 'All Indian students and learners', link: 'https://swayam.gov.in/', who: ['student','youth'], income: ['low','mid','high'], state: 'all' },
    { id: 19, name: 'Skill India — PMKVY', category: 'Education', desc: 'Free skill training in 300+ job roles with stipend and placement assistance.', eligible: 'Indians aged 15-45 seeking vocational training', link: 'https://www.skillindia.gov.in/', who: ['youth','adult'], income: ['low','mid'], state: 'all' }
  ];

  function filterSchemes(answers = {}, schemesList = ALL_SCHEMES) {
    let matched = schemesList.filter((s) => {
      const whoMatch = !answers.who || s.who.includes(answers.who);
      const incomeMatch = !answers.income || s.income.includes(answers.income);
      const catMatch = !answers.category || s.category === answers.category || answers.category === 'Digital';
      return whoMatch && incomeMatch && catMatch;
    });

    if (matched.length === 0) matched = schemesList.slice(0, 6);
    return matched;
  }

  // Attach to Namespace
  DishaAI.Schemes = {
    ALL_SCHEMES,
    filterSchemes
  };

  global.ALL_SCHEMES = ALL_SCHEMES;
  global.filterSchemes = filterSchemes;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      ALL_SCHEMES,
      filterSchemes
    };
  }
})(typeof window !== 'undefined' ? window : global);
