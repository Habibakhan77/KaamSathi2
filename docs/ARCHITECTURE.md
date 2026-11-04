# KaamSaathi System Architecture
**University of Swat BSSE Capstone Project**  
*Habiba Khan & Laiba Khaist | Supervised by Muhammad Hamza*

---

## 1. Architectural Overview

```mermaid
graph TD
    subgraph Presentation ["Presentation Layer (Client)"]
        UI["Next.js App Router (React 18)"]
        i18n["LanguageProvider (EN / UR / PS / Roman UR)"]
        Theme["Theme Context (WCAG AA CSS Custom Properties)"]
        Voice["HTML5 Web Speech API Voice Input"]
    end

    subgraph Service ["Service & API Route Handlers"]
        AI_Parse["POST /api/ai/parse"]
        AI_Match["POST /api/ai/match"]
        Auth["POST /api/auth (Role Session Manager)"]
        Bookings["POST/GET/PATCH /api/bookings"]
        Providers["GET/PATCH /api/providers"]
    end

    subgraph AI_Core ["AI & NLP Processing Engine"]
        OpenAI["OpenAI GPT-4o-mini (Cloud Mode)"]
        RuleEngine["Deterministic Swat Keyword Fallback (Mock Mode)"]
        FraudEngine["AI Fraud & Pricing Anomaly Detection"]
    end

    subgraph Data ["Data Abstraction Layer"]
        Repo["IRepository Interface"]
        MockDB["MockAdapter (data/mock-db.json + In-Memory Cache)"]
        SupaDB["SupabaseAdapter (PostgreSQL + RLS + Storage)"]
    end

    Presentation --> Service
    Service --> AI_Core
    AI_Parse --> OpenAI
    AI_Parse --> RuleEngine
    AI_Match --> FraudEngine
    Service --> Repo
    Repo --> MockDB
    Repo --> SupaDB
```

---

## 2. Key Engineering Patterns
1. **Repository Pattern:** Decouples API handlers from underlying database implementation. When cloud keys (`NEXT_PUBLIC_SUPABASE_URL`) are omitted, the application falls back gracefully to `MockAdapter`.
2. **Deterministic NLP Fallback:** Protects against OpenAI service outages or quota exhaustion by maintaining a local dictionary of Swat regional dialects, emergency triggers, and trade synonyms.
3. **Strict Color Variable Tokens:** Hard-coded hex values inside UI components are prohibited; all components consume semantic CSS properties (`var(--bg-main)`, `var(--text-primary)`, `var(--text-secondary)`, `var(--surface)`).
