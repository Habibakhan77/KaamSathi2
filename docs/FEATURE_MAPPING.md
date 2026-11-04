# Feature-to-Page Viva Defense Mapping
**Project:** KaamSaathi: AI-Powered Verified Local Services Marketplace for Pakistan  
**Institution:** University of Swat — BS Software Engineering  

Use this index during project defense to demonstrate each minimum, optional, and commercialization requirement:

| Requirement Category | Specific Feature | Primary URL / Component | Verification Steps for Evaluators |
|---|---|---|---|
| **Branding** | Authentic Logo & Dark Variant | `/` (Header, Footer, Auth) | Toggle dark mode; observe wordmark switches to white `#F2F7F4`, brand icon remains deep green `#0A5C2E`. |
| **Accessibility** | WCAG AA Contrast Compliance | All Pages | Toggle light (#F7FAF8) and dark (#0B1410). Notice zero washed-out grey text. Inspect CSS variables. |
| **Localization** | Urdu, Pashto, Roman Urdu RTL | Navbar Globe dropdown | Select اردو or پښتو; verify layout switches to RTL (`dir="rtl"`), fonts switch to Noto Nastaliq Urdu / Naskh. |
| **Minimum Req 1** | Customer, Provider, Admin Auth | `/login` & `/register` | Click any of the 3 "Demo accounts" for 1-click login without entering credentials. |
| **Minimum Req 2** | Provider Profiles & Services | `/providers/prov-prof-01` | Displays verified badge, skills, experience, service areas in Swat, and customer reviews. |
| **Minimum Req 3** | Provider Verification & Approval | `/provider/verification` & `/admin/dashboard` | Provider uploads CNIC and VTI certificate; Admin audits and approves or rejects with reason. |
| **Minimum Req 4** | Search & Filters with Swat Areas | `/services` | Filter by Category, Area (Mingora, Saidu, Kanju, Barikot, etc.), Rating, and CNIC Verified badge. |
| **Minimum Req 5** | Multi-Step Service Booking | `/customer/request` | 3-step wizard (Trade, Details/Urgency, Swat Location/Date) with AI pre-fill from search query. |
| **Minimum Req 6** | Quotation Submission & Comparison | `/customer/dashboard` & `/provider/quotes` | Provider submits itemized quote; Customer views side-by-side comparison and accepts one. |
| **Minimum Req 7** | Verified Customer Reviews | `/customer/bookings` | Rate completed job; system validates booking completion and strictly enforces 1 review per job. |
| **Minimum Req 8** | Admin Management Console | `/admin/dashboard` | Analytics overview, verification audit queue, fraud alerts, dispute mediation, and category manager. |
| **Optional Req 1** | Floating & Full-Page AI Assistant | `/ai-assistant` & Floating Pill | Chat with local NLP diagnostic assistant; receive pre-arrival safety instructions and matched ustads. |
| **Optional Req 2** | Natural Language & Voice Search | `/` (Hero Search) | Click microphone to speak or type in Roman Urdu; real-time diagnosis card appears immediately. |
| **Optional Req 3** | 7-Stage Visual Job Tracker | `/customer/bookings` | Visual progress bar: Requested &rarr; Quoted &rarr; Accepted &rarr; On the way &rarr; In progress &rarr; Completed. |
| **Optional Req 4** | Complaint & Dispute Resolution | `/customer/bookings` & `/admin/dashboard` | Customer files dispute; Admin reviews and records mediation resolution under warranty. |
| **Optional Req 5** | AI-Assisted Fraud Detection | `/admin/dashboard` | Flags duplicate CNICs, pricing deviations (>300%), and unverified high-quote velocity. |
| **Commercialization** | Tiered Subscription Plans | `/provider/subscription` | Basic, Ustad Pro Partner (PKR 1,499), and Elite Guild (PKR 3,499). Notice truthful 'Online Payments Coming Soon' banner. |
