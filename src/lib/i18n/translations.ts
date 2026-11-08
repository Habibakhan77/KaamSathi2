export type SupportedLanguage = "en" | "ur" | "ps" | "roman_ur";

export interface TranslationDictionary {
  brand: {
    name: string;
    tagline: string;
    subtagline: string;
    capstoneBadge: string;
    pilotBadge: string;
  };
  nav: {
    findServices: string;
    howItWorks: string;
    aiAssistant: string;
    becomeProvider: string;
    bookService: string;
    login: string;
    register: string;
    dashboard: string;
    logout: string;
  };
  hero: {
    title: string;
    highlight: string;
    subtitle: string;
    searchPlaceholder: string;
    searchBtn: string;
    voiceBtn: string;
    listening: string;
    trending: string;
  };
  /** Marketplace discovery section directly below the homepage hero. */
  discover: {
    eyebrow: string;
    title: string;
    highlight: string;
    subtitle: string;
    popularTitle: string;
  };
  trustBadges: {
    verified: string;
    verifiedDesc: string;
    aiMatch: string;
    aiMatchDesc: string;
    local: string;
    localDesc: string;
    safe: string;
    safeDesc: string;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    step5Title: string;
    step5Desc: string;
  };
  categories: {
    title: string;
    subtitle: string;
    viewAll: string;
    startsFrom: string;
    providersCount: string;
  };
  cta: {
    providerTitle: string;
    providerSubtitle: string;
    providerBtn: string;
    guaranteeText: string;
  };
  footer: {
    about: string;
    aboutDesc: string;
    quickLinks: string;
    services: string;
    contact: string;
    rights: string;
    disclaimer: string;
  };
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    brand: {
      name: "KaamSaathi",
      tagline: "Har kaam ke liye, aik bharosemand saathi.",
      subtagline: "AI-Powered Verified Local Services Marketplace for Pakistan",
      capstoneBadge: "University of Swat BSSE Capstone Project",
      pilotBadge: "Pilot Launching in Swat Valley",
    },
    nav: {
      findServices: "All Services",
      howItWorks: "How It Works",
      aiAssistant: "AI Assistant",
      becomeProvider: "Become a Provider",
      bookService: "Post a Job",
      login: "Login",
      register: "Register",
      dashboard: "Dashboard",
      logout: "Sign Out",
    },
    hero: {
      title: "Swat's Verified Local Services,",
      highlight: "Powered by AI.",
      subtitle:
        "Find trusted, CNIC-verified electricians, plumbers, AC technicians, and carpenters in Mingora, Saidu Sharif, and across Swat with transparent quotes.",
      searchPlaceholder:
        "Describe your issue in English, Urdu, Pashto, or Roman Urdu (e.g., 'Mera AC theek se cool nahi kar raha, Mingora mein')...",
      searchBtn: "AI Search",
      voiceBtn: "Voice Search",
      listening: "Listening to your voice...",
      trending: "Popular in Swat:",
    },
    discover: {
      eyebrow: "Your Local Service Marketplace",
      title: "Find the Right Professional for",
      highlight: "Every Job.",
      subtitle:
        "Discover trusted, verified professionals across Swat. Quality services, transparent quotations.",
      popularTitle: "Explore Popular Services",
    },
    trustBadges: {
      verified: "CNIC & Skill Verified",
      verifiedDesc: "Every professional passes government CNIC and skill audit.",
      aiMatch: "AI Smart Matching",
      aiMatchDesc: "Algorithm matches by skill, proximity, rating, and availability.",
      local: "Local Swat Coverage",
      localDesc: "Serving Mingora, Saidu Sharif, Kanju, Barikot, and Madyan.",
      safe: "Transparent Pricing",
      safeDesc: "Side-by-side quote comparison. Pay after job satisfaction.",
    },
    howItWorks: {
      title: "How KaamSaathi Works",
      subtitle: "A 5-step transparent workflow from voice inquiry to job completion",
      step1Title: "1. Describe the Problem",
      step1Desc: "Type or speak in English, Urdu, or Pashto with your location.",
      step2Title: "2. AI Understands & Diagnoses",
      step2Desc: "Identifies service category, urgency, and necessary technical details.",
      step3Title: "3. Verified Providers Quoted",
      step3Desc: "Nearby verified Ustads submit transparent, itemized quotes.",
      step4Title: "4. Compare & Confirm",
      step4Desc: "Review ratings, experience, and pricing side-by-side, then accept.",
      step5Title: "5. Real-Time Tracking",
      step5Desc: "Track your technician on the way, during work, and review upon completion.",
    },
    categories: {
      title: "Browse By Category",
      subtitle: "Professional home and commercial services available in Swat",
      viewAll: "Explore All Categories",
      startsFrom: "Starts from",
      providersCount: "verified ustads",
    },
    cta: {
      providerTitle: "Are you a skilled technician or artisan in Swat?",
      providerSubtitle:
        "Join KaamSaathi to get direct job requests in Mingora, Saidu Sharif, and Kanju with zero middleman exploitation.",
      providerBtn: "Register as a Provider",
      guaranteeText: "Requires valid CNIC and vocational certificate or trade reference.",
    },
    footer: {
      about: "About KaamSaathi",
      aboutDesc:
        "A final year BS Software Engineering capstone project at University of Swat (Habiba Khan & Laiba Khaist, supervised by Muhammad Hamza). Designed to connect households with verified local service professionals.",
      quickLinks: "Quick Navigation",
      services: "Popular Services",
      contact: "Swat Pilot Office",
      rights: "All rights reserved. University of Swat Capstone Project.",
      disclaimer: "Pilot preview with simulated demonstration data for academic evaluation.",
    },
  },

  ur: {
    brand: {
      name: "کام ساتھی",
      tagline: "ہر کام کے لیے، ایک بھروسہ مند ساتھی۔",
      subtagline: "پاکستان کے لیے مصنوعی ذہانت سے لیس تصدیق شدہ مقامی سروسز مارکیٹ",
      capstoneBadge: "یونیورسٹی آف سوات بی ایس ایس ای کیپ اسٹون پروجیکٹ",
      pilotBadge: "وادیٔ سوات میں پائلٹ لانچ",
    },
    nav: {
      findServices: "تمام خدمات",
      howItWorks: "یہ کیسے کام کرتا ہے",
      aiAssistant: "اے آئی اسسٹنٹ",
      becomeProvider: "بطور کاریگر شامل ہوں",
      bookService: "کام پوسٹ کریں",
      login: "لاگ ان",
      register: "رجسٹر کریں",
      dashboard: "ڈیش بورڈ",
      logout: "لاگ آؤٹ",
    },
    hero: {
      title: "سوات کے تصدیق شدہ مقامی کاریگر،",
      highlight: "اب جدید اے آئی کے ساتھ۔",
      subtitle:
        "مینگورہ، سیدو شریف، کانجو اور پورے سوات میں نادرا شناختی کارڈ سے تصدیق شدہ الیکٹریشن، پلمبر، اے سی ٹیکنیشن اور کارپینٹر شفاف قیمتوں پر حاصل کریں۔",
      searchPlaceholder:
        "اپنا مسئلہ اردو، پشتو یا انگریزی میں بیان کریں (مثلاً: 'مینگورہ میں کمرے کا اے سی ٹھنڈک نہیں کر رہا')...",
      searchBtn: "اے آئی تلاش",
      voiceBtn: "آواز سے تلاش کریں",
      listening: "آپ کی آواز سنی جا رہی ہے...",
      trending: "سوات میں مقبول خدمات:",
    },
    discover: {
      eyebrow: "آپ کی مقامی سروس مارکیٹ",
      title: "ہر کام کے لیے",
      highlight: "درست ماہر تلاش کریں۔",
      subtitle: "پورے سوات میں قابلِ اعتماد اور تصدیق شدہ ماہرین تلاش کریں۔ معیاری خدمات، شفاف قیمتیں۔",
      popularTitle: "مقبول خدمات دیکھیں",
    },
    trustBadges: {
      verified: "شناختی کارڈ اور ہنر کی تصدیق",
      verifiedDesc: "ہر کاریگر نادرا شناختی کارڈ اور فنی مہارت کے معائنے سے گزرتا ہے۔",
      aiMatch: "مصنوعی ذہانت سے درست ملاپ",
      aiMatchDesc: "الگورتھم فاصلے، ریٹنگ، مہارت اور دستیابی کے مطابق استاد تجویز کرتا ہے۔",
      local: "سوات کے تمام علاقوں میں کوریج",
      localDesc: "مینگورہ، سیدو شریف، کانجو، بریکوٹ اور مدین کے لیے خصوصی سروس۔",
      safe: "شفاف اور پیشگی ریٹ",
      safeDesc: "ایک سے زائد پیشکشوں کا موازنہ کریں۔ تسلی بخش کام کے بعد ادائیگی کریں۔",
    },
    howItWorks: {
      title: "کام ساتھی کیسے کام کرتا ہے؟",
      subtitle: "مسئلہ بیان کرنے سے لے کر کام مکمل ہونے تک 5 آسان مراحل",
      step1Title: "۱۔ مسئلہ بیان کریں",
      step1Desc: "بول کر یا لکھ کر اپنا مسئلہ اور مقام بتائیں۔",
      step2Title: "۲۔ اے آئی کی فہم اور تشخیص",
      step2Desc: "سسٹم خودکار طریقے سے شعبہ، فوری نوعیت اور تفصیلات سمجھتا ہے۔",
      step3Title: "۳۔ تصدیق شدہ استادوں کی کوٹیشنز",
      step3Desc: "قریبی کاریگر تفصیل اور شفاف خرچ کی پیشکش بھیجتے ہیں۔",
      step4Title: "۴۔ موازنہ اور انتخاب",
      step4Desc: "استاد کی ریٹنگ اور ریٹ دیکھ کر پسندیدہ کوٹیشن قبول کریں۔",
      step5Title: "۵۔ لائیو ٹریکنگ اور تصدیق",
      step5Desc: "کاریگر کی آمد سے لے کر کام کی تکمیل تک ہر مرحلہ مانیٹر کریں۔",
    },
    categories: {
      title: "شعبہ جات کے ذریعے تلاش",
      subtitle: "سوات میں دستیاب تمام پیشہ ورانہ گھریلو خدمات",
      viewAll: "تمام شعبہ جات دیکھیں",
      startsFrom: "ابتدائی قیمت",
      providersCount: "تصدیق شدہ استاد",
    },
    cta: {
      providerTitle: "کیا آپ سوات میں ایک ہنر مند استاد ہیں؟",
      providerSubtitle:
        "کام ساتھی کے ساتھ منسلک ہو کر بغیر کسی کٹوتی یا سفارش کے براہِ راست کام حاصل کریں۔",
      providerBtn: "بطور استاد رجسٹر ہوں",
      guaranteeText: "اصل شناختی کارڈ اور فنی تجربہ لازمی ہے۔",
    },
    footer: {
      about: "کام ساتھی کے بارے میں",
      aboutDesc:
        "یونیورسٹی آف سوات بی ایس سافٹ ویئر انجینئرنگ کا فائنل ائیر پراجیکٹ (حبیبہ خان اور لائبہ خائستہ، زیرِ نگرانی محمد حمزہ)۔",
      quickLinks: "فوری لنکس",
      services: "اہم خدمات",
      contact: "سوات آفس",
      rights: "جملہ حقوق محفوظ ہیں۔ یونیورسٹی آف سوات کیپ اسٹون پروجیکٹ۔",
      disclaimer: "تعلیمی جائزے کے لیے پائلٹ پریویو مع تمثیلی ڈیٹا۔",
    },
  },

  ps: {
    brand: {
      name: "کام ساتھی",
      tagline: "د هر کار لپاره، یو باوري ملګری.",
      subtagline: "د مصنوعي ذهانت لخوا چلېدونکی د سوات باوري مسلکي خدمتونه",
      capstoneBadge: "د سوات پوهنتون بی ایس سافټ ویر انجنیرینګ پروجیکټ",
      pilotBadge: "په سوات کې لومړنی پائلټ پرانیسته",
    },
    nav: {
      findServices: "ټول خدمات",
      howItWorks: "دا څنګه کار کوي",
      aiAssistant: "د AI مرستیال",
      becomeProvider: "د استاد په توګه یوځای شئ",
      bookService: "کار درج کړئ",
      login: "ننوتل",
      register: "نوم لیکنه",
      dashboard: "ډشبورډ",
      logout: "وتل",
    },
    hero: {
      title: "د سوات تصدیق شوي مسلکي کاریګر،",
      highlight: "د AI په نوې ټیکنالوژۍ.",
      subtitle:
        "په مینګوره، سیدو شریف، کانجو او بریکوټ کې برېښنا کار، نل ساز، د اے سي ماهر او ترکاڼ په مناسبو بیو ومومئ.",
      searchPlaceholder:
        "خپله ستونزه په پښتو، اردو یا انګلیسي کې ولیکئ یا ووایئ (لکه: 'په مینګوره کې زما اے سي یخوالی نه کوي')...",
      searchBtn: "د AI لټون",
      voiceBtn: "په غږ ولټوئ",
      listening: "ستاسو غږ اوریدل کیږي...",
      trending: "په سوات کې مشهور کارونه:",
    },
    discover: {
      eyebrow: "ستاسو محلي خدماتو بازار",
      title: "د هر کار لپاره",
      highlight: "سم ماهر ومومئ.",
      subtitle: "په ټول سوات کې باوري او تصدیق شوي ماهران ومومئ. ښې خدمتونه، روښانه بیې.",
      popularTitle: "مشهور خدمتونه وګورئ",
    },
    trustBadges: {
      verified: "د تذکرې او هنر تصدیق",
      verifiedDesc: "هر استاد د نادرا شناختي کارډ او د مهارت تصدیق لري.",
      aiMatch: "د AI هوښیار انتخاب",
      aiMatchDesc: "سیسټم ستاسو د سیمې او د استاد د ریټینګ له مخې غوره کس ټاکي.",
      local: "د سوات بشپړ پوښښ",
      localDesc: "مینګوره، سیدو شریف، کانجو، بریکوټ او مدین لپاره چمتو.",
      safe: "ښکاره او شفاف قېمتونه",
      safeDesc: "د بیو پرتله کول او د کار له ډاډ وروسته پیسې ورکول.",
    },
    howItWorks: {
      title: "کام ساتھی څنګه کار کوي؟",
      subtitle: "له غږیزې پلټنې تر کار بشپړیدو ۵ اسانه ګامونه",
      step1Title: "۱. خپله ستونزه بیان کړئ",
      step1Desc: "په پښتو یا اردو کې ولیکئ یا په خپله ژبه غږ وکړئ.",
      step2Title: "۲. د AI ژوره پوهه",
      step2Desc: "سیسټم کار پېژني او بېړنۍ اړتیا په ګوته کوي.",
      step3Title: "۳. د کاریګرو بیې (کوټیشن)",
      step3Desc: "نږدې تصدیق شوي استادان خپلې بیې او وخت درلیږي.",
      step4Title: "۴. پرتله او غوره کول",
      step4Desc: "د استادانو تجاربو او بیو ته په کتو غوره انتخاب تایید کړئ.",
      step5Title: "۵. د کار ژوندی څار",
      step5Desc: "تر هغه پورې چې کار په سمه توګه سرته ورسیږي څارنه وکړئ.",
    },
    categories: {
      title: "د کارونو ټولګي",
      subtitle: "په سوات کې د کور او دفتر ټول اړین مسلکي خدمات",
      viewAll: "ټولې څانګې وګورئ",
      startsFrom: "پیل له",
      providersCount: "باوري استادان",
    },
    cta: {
      providerTitle: "ایا تاسو په سوات کې تکړه استاد یاست؟",
      providerSubtitle:
        "په کام ساتھی کې وړیا نوم لیکنه وکړئ او په خپله سیمه کې مستقیماً نوي کارونه ترلاسه کړئ.",
      providerBtn: "د کاریګر په توګه ثبت شئ",
      guaranteeText: "د شناختي کارډ او کاري تجربې تصدیق اړین دی.",
    },
    footer: {
      about: "د کام ساتھی په اړه",
      aboutDesc:
        "د سوات پوهنتون بی ایس سافټ ویر انجنیرینګ وروستۍ پروژه (حبیبه خان او لایبه خایسته، تر څارنې لاندې د محمد حمزه).",
      quickLinks: "چټکې اړیکې",
      services: "مهم کارونه",
      contact: "د سوات څانګه",
      rights: "ټول حقوق خوندي دي. د سوات پوهنتون پروژه.",
      disclaimer: "د پوهنتون د بیاکتنې لپاره تمثیلي ازمایښتي ډاټا.",
    },
  },

  roman_ur: {
    brand: {
      name: "KaamSaathi",
      tagline: "Har kaam ke liye, aik bharosemand saathi.",
      subtagline: "AI-Powered Verified Local Services Marketplace for Pakistan",
      capstoneBadge: "University of Swat BSSE Capstone Project",
      pilotBadge: "Swat Valley Pilot Launch",
    },
    nav: {
      findServices: "Tamam Services",
      howItWorks: "Kaise Kaam Karta Hai",
      aiAssistant: "AI Assistant",
      becomeProvider: "Ustad Banein",
      bookService: "Kaam Post Karein",
      login: "Login",
      register: "Register",
      dashboard: "Dashboard",
      logout: "Sign Out",
    },
    hero: {
      title: "Swat Ke Verified Local Karigar,",
      highlight: "Ab AI Ke Saath.",
      subtitle:
        "Mingora, Saidu Sharif, Kanju aur poore Swat mein CNIC verified electrician, plumber, AC technician aur carpenter transparent rate par talash karein.",
      searchPlaceholder:
        "Apna masla likhein ya bolein (maslan: 'Mera AC theek se cool nahi kar raha, Mingora mein')...",
      searchBtn: "AI Search",
      voiceBtn: "Bolein",
      listening: "Aap ki aawaz suni ja rahi hai...",
      trending: "Swat mein maqbool services:",
    },
    discover: {
      eyebrow: "Aap ki Local Service Marketplace",
      title: "Har Kaam ke liye",
      highlight: "Sahi Professional Dhoondein.",
      subtitle:
        "Poore Swat mein bharosemand, verified professionals talash karein. Behtareen services, transparent quotations.",
      popularTitle: "Popular Services Dekhein",
    },
    trustBadges: {
      verified: "CNIC & Skill Verified",
      verifiedDesc: "Har ustad NADRA CNIC aur hunar verification ke baad shamil hota hai.",
      aiMatch: "AI Smart Matching",
      aiMatchDesc: "Algorithm aap ke area aur masle ke mutabiq behtareen ustad dhoondhta hai.",
      local: "Swat Coverage",
      localDesc: "Mingora, Saidu Sharif, Kanju, Barikot aur Madyan ke liye tayyar.",
      safe: "Transparent Pricing",
      safeDesc: "Multiple quotes compare karein. Tasalli bakhsh kaam ke baad payment karein.",
    },
    howItWorks: {
      title: "KaamSaathi Kaise Kaam Karta Hai?",
      subtitle: "Voice ya text se le kar kaam complete hone tak 5 asaan steps",
      step1Title: "1. Masla Bayan Karein",
      step1Desc: "Bol kar ya type kar ke apna masla aur area batayein.",
      step2Title: "2. AI Samajhta Aur Diagnose Karta Hai",
      step2Desc: "Category, urgency aur zaroori details identify hoti hain.",
      step3Title: "3. Verified Ustads Rate Bhejtay Hain",
      step3Desc: "Nazdeeki ustad transparent breakdown ke sath quote submit kartay hain.",
      step4Title: "4. Compare & Accept",
      step4Desc: "Rating aur rate dekh kar sab se behtareen quotation accept karein.",
      step5Title: "5. Live Tracking & Review",
      step5Desc: "Technician ke aane se kaam mukammal hone tak visual timeline monitor karein.",
    },
    categories: {
      title: "Category Ke Zariye Dhoondein",
      subtitle: "Swat mein dastyab professional gharelu services",
      viewAll: "Tamam Categories Dekhein",
      startsFrom: "Shuruat",
      providersCount: "verified ustads",
    },
    cta: {
      providerTitle: "Kya aap Swat ke hunarmand ustad hain?",
      providerSubtitle:
        "KaamSaathi par join karein aur direct jobs hasil karein baghair kisi commission exploitation ke.",
      providerBtn: "Register As Provider",
      guaranteeText: "Asal CNIC aur vocational certificate ya trade reference darkar hai.",
    },
    footer: {
      about: "KaamSaathi Ke Baare Mein",
      aboutDesc:
        "University of Swat BS Software Engineering ka final year capstone project (Habiba Khan & Laiba Khaist, supervised by Muhammad Hamza).",
      quickLinks: "Zaroori Links",
      services: "Maqbool Services",
      contact: "Swat Pilot Office",
      rights: "Tamam huqooq mehfooz hain. University of Swat Capstone Project.",
      disclaimer: "Academic evaluation ke liye demo preview data.",
    },
  },
};
