# KaamSaathi: AI-Powered Verified Local Services Marketplace for Pakistan
**BS Software Engineering Capstone Project — University of Swat**  
*Researchers:* Habiba Khan &amp; Laiba Khaist  
*Supervisor:* Muhammad Hamza (Department of Computer Science &amp; Software Engineering)  
*Tagline:* **"Har kaam ke liye, aik bharosemand saathi."**

---

## 🌟 Overview
KaamSaathi is a modern, verified full-stack web marketplace designed to solve the blue-collar trust deficit in Pakistan, piloting in Swat Valley (Mingora, Saidu Sharif, Kanju, Barikot, Madyan, Fizagat) with a roadmap to scale across Khyber Pakhtunkhwa and Pakistan.

The platform bridges local households with government CNIC-audited and skill-verified technicians (Ustads) across 8 critical trade categories:
1. Electrician (wiring, circuit breakers, solar/UPS)
2. Plumber (concealed pipe leaks, geysers, sanitary fittings)
3. AC Technician (inverter gas refill, PCB repair, deep chemical wash)
4. Carpenter (woodcraft, lacquer polish, locks, cabinetry)
5. Solar & Inverter (net-metering, battery diagnostics, solar arrays)
6. Painter & Finisher (wall putty, moisture/seelan dampness, weather sheet)
7. Deep Cleaning (water tank sanitation, sofa wash)
8. Appliance Repair (washing machines, microwave ovens, refrigerators)

---

## 🚀 Quick Start (Zero Config / Mock Mode)

The project runs completely offline with **zero API keys required** by default.

### 1. Prerequisites
- Node.js 20+ (LTS) & npm
- Git

### 2. Installation & Running
```powershell
# Clone or navigate to the project directory
cd kaamsaathi

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🔑 Demo Accounts (1-Click Login)
Pre-seeded accounts are provided on the `/login` page for viva defense demonstration:

| Role | Demo Email | Password | Preloaded Context |
|---|---|---|---|
| **Customer** | `customer@kaamsaathi.pk` | `password123` | Ahmad Jan, Mohallah Shahdara, Mingora. Has active electrical and AC requests. |
| **Provider** | `provider@kaamsaathi.pk` | `password123` | Rashid Khan, Saidu Sharif. CNIC-verified electrician, 4.9 rating, 68 jobs. |
| **Admin** | `admin@kaamsaathi.pk` | `password123` | University of Swat Project Evaluation Team. Access to verification queue & fraud engine. |

---

## 🎨 Brand Identity & Logo
The official logo asset is stored at `/public/brand/kaamsaathi-logo.png` and rendered across the application using `<Logo />`:
- Authentic rounded-square deep green icon with a white house outline, 4-pane window, and white curved valley path.
- Exact primary green: `#0A5C2E` (gradient toward `#064A25` for depth).
- Near-black: `#151515`.
- Wordmark: "Kaam" in `#151515` (or `#F2F7F4` in dark mode) and "Saathi" in `#0A5C2E` (or `#1EB55E` in dark mode).

---

## 👁️ Critical: WCAG AA Text Contrast & Readability
Readability is strictly guaranteed across both light and dark themes via CSS semantic variables:
- **Light Theme (Default)**: Background `#F7FAF8`, Surface `#FFFFFF`, Body Text `#151515` (**17.38:1** contrast ratio), Secondary Text `#3E4F47` (**8.28:1** contrast ratio).
- **Dark Theme**: Background `#0B1410`, Surface `#111F18`, Body Text `#F2F7F4` (**17.28:1** contrast ratio), Secondary Text `#B8C9C0` (**10.83:1** contrast ratio).
- Zero low-opacity text, zero washed-out grey-on-grey text, solid scrims behind illustrations.

---

## 🧠 AI NLP & Regional Language Engine
- **POST `/api/ai/parse`**: Accepts free-form problem inquiries in English, Urdu (اردو), Pashto (پښتو), and Roman Urdu.
- **Microphone Voice Search**: Integrates the HTML5 Web Speech API for spoken inquiries.
- **Fallback Engine**: 100% deterministic keyword and symptom extraction active when OpenAI keys are not configured.
- **Matching & Fraud Engine**: Ranks technicians by proximity, verification, rating, and availability; detects duplicate CNIC identity theft and abnormal pricing (>300% deviation).

---

## 📁 Repository Structure
```
kaamsaathi/
├── data/
│   └── mock-db.json            # Persisted seed dataset for Swat pilot
├── docs/                       # BSSE Viva Defense Deliverables
│   ├── SRS_SUMMARY.md
│   ├── ARCHITECTURE.md
│   ├── ER_DIAGRAM.md
│   ├── TEST_CASES.md
│   └── FEATURE_MAPPING.md
├── public/
│   └── brand/                  # Logo PNG/JPEG/SVG assets & favicon
├── src/
│   ├── app/                    # Next.js App Router (Landing, Services, Dashboards, APIs)
│   ├── components/             # Reusable Logo, Navbar, Footer, AI Search, Job Tracker
│   ├── lib/                    # Types, DB adapters, AI NLP matcher, i18n
│   └── styles/globals.css      # WCAG AA semantic tokens
├── supabase/
│   └── migrations/             # PostgreSQL tables + Row Level Security policies
└── tests/
    └── run-tests.js            # Automated integration & unit test suite
```

---

## 🧪 Automated Testing
Run the project test suite:
```powershell
npm run test
# or
node tests/run-tests.js
```

---

## 📜 Academic Honesty Disclosure
KaamSaathi is an engineering capstone project designed and defended at the University of Swat. All statistical metrics and provider profiles are simulated pilot demonstration data for academic evaluation.
