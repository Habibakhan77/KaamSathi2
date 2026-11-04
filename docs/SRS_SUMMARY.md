# Software Requirements Specification (SRS) Summary
**Project:** KaamSaathi — AI-Powered Verified Local Services Marketplace for Pakistan  
**Institution:** University of Swat, Department of Computer Science & Software Engineering  
**Students:** Habiba Khan & Laiba Khaist | **Supervisor:** Muhammad Hamza  

---

## 1. Executive Summary
KaamSaathi is an electronic marketplace engineered to streamline home maintenance procurement in Swat Valley, Pakistan. It addresses acute regional problems:
- Lack of price transparency in local bazaar trades.
- Inability to verify worker credentials (NADRA CNIC / trade qualifications).
- Language barriers for non-English speakers requiring repair services.
- Absence of post-service accountability or dispute arbitration.

---

## 2. Functional Requirements Matrix

| Req ID | Module | Functional Specification |
|---|---|---|
| **FR-01** | Multi-Lingual NLP | System shall parse free text & voice inputs in English, Urdu (اردو), Pashto (پښتو), and Roman Urdu into structured JSON: category, location, urgency, and fault symptoms. |
| **FR-02** | Provider Matching | Algorithm shall rank technicians by skill overlap, geographical proximity within Swat, customer rating, and availability. |
| **FR-03** | Identity Verification | System shall require technicians to upload CNIC front/back and vocational certificates; admin approval required before verified green badge is granted. |
| **FR-04** | Service Bidding | Providers shall submit transparent itemized quotations (parts, labor, callout) on posted service requests. |
| **FR-05** | Quote Acceptance | Customer shall compare quotations side-by-side and accept one, automatically updating other quotes to rejected. |
| **FR-06** | 7-Stage Job Tracking | System shall maintain visual chronological tracking: Requested &rarr; Quoted &rarr; Accepted &rarr; On the way &rarr; In progress &rarr; Completed &rarr; Cancelled. |
| **FR-07** | Verified Review Policy | Only customers with a 'completed' booking may submit a star rating and written review (strictly 1 review per booking). |
| **FR-08** | Dispute Mediation | Customer may log a formal dispute on a booking; administrator reviews facts and enters mediation resolution. |
| **FR-09** | AI Fraud Engine | System shall automatically flag duplicate CNICs, pricing deviations (>300%), and excessive provider cancellations. |
| **FR-10** | Provider Tiers | Support tiered plans (Hunar Basic, Ustad Pro Partner, Swat Guild Elite) for commercial sustainability. |

---

## 3. Non-Functional Requirements

- **Accessibility & Contrast:** Every text/background pair meets WCAG AA standards (minimum 4.5:1 body, 3.0:1 headings).
- **Zero-Key Offline Resilience:** Application functions 100% in mock mode without requiring cloud API keys.
- **Performance:** First Contentful Paint < 1.2s on standard Pakistani mobile 3G/4G connections.
- **RTL Script Support:** Native right-to-left layout transitions when Urdu or Pashto is selected.
