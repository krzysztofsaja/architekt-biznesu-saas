# AI Academic Reviewer — MVP Scoping Document

**Data:** 2026-02-02  
**Autor:** SaaS Architect & Business Auditor  
**Wersja:** 1.0  
**Status:** DOKUMENTACJA PROJEKTU

---

## 1. Executive Summary

Niniejszy dokument definiuje zakres MVP (Minimum Viable Product) dla AI Academic Reviewer — narzędzia AI wspierającego proces recenzji w małych i średnich czasopismach naukowych w Polsce.

**Kluczowe założenia MVP:**

| Aspekt        | Założenie                                               |
| ------------- | ------------------------------------------------------- |
| **Produkt**   | AI-powered assistant dla redaktorów czasopism naukowych |
| **Model**     | SaaS z integracją OJS (opcjonalnie)                     |
| **Target**    | Małe/średnie czasopisma w Polsce (Segment S2 + S3)      |
| **Cena**      | Freemium → 3.000-15.000 PLN/rok                         |
| **Dev time**  | 4-6 miesięcy (Solo-Dev)                                 |
| **AI Engine** | OpenAI API lub lokalne LLM                              |

**Core Value Proposition:** Automatyzacja 60% rutynowych zadań redakcyjnych bez konieczności posiadania wiedzy technicznej.

---

## 2. Strategic Pivot: Od "AI Recenzent" do "AI Assistant"

Na podstawie analizy Kill-The-Idea, oryginalny pomysł ("AI jako recenzent artykułów") jest zbyt ryzykowny. MVP musi pozycjonować się jako **narzędzie wspierające ludzi**, nie zastępujące ich.

### 2.1 Zmiana Filozofii

| Oryginalne podejście (ODRZUCONE) | Nowe podejście (MVP)                |
| -------------------------------- | ----------------------------------- |
| AI ocenia artykuły               | AI pomaga redaktorowi w organizacji |
| AI pisze recenzje                | AI sugeruje punkty do oceny         |
| AI podejmuje decyzje             | AI przypomina o terminach           |
| AI vs człowiek                   | AI + człowiek = lepszy proces       |

### 2.2 Dlaczego to działa?

- **Zero ryzyka halucynacji** — AI nie ocenia, więc błędy nie mają konsekwencji merytorycznych
- **Zgodność z polityką Elsevier/Springer** — nie naruszamy wytycznych o użyciu AI
- **Akceptowalne dla konserwatywnych redaktorów** — narzędzie, nie zagrożenie
- **Mierzalna wartość** — oszczędność czasu, nie subiektywna "jakość AI"

---

## 3. MVP Features — Priorytetyzacja

### 3.1 Feature Matrix (MoSCoW)

| Feature                            | Priorytet | Złożoność     | Czas  | Uzasadnienie    |
| ---------------------------------- | --------- | ------------- | ----- | --------------- |
| **M1** Dashboard statusów          | MUST      | Niska         | 2 tyg | Core workflow   |
| **M2** Przypomnienia/terminy       | MUST      | Niska         | 1 tyd | Pain point #1   |
| **M3** Baza recenzentów            | MUST      | Średnia       | 3 tyg | Pain point #2   |
| **M4** Szablony recenzji           | MUST      | Niska         | 1 tyd | Pain point #3   |
| **M5** Podstawowy AI suggestions   | MUST      | Średnia       | 2 tyg | Differentiator  |
| **S1** Integracja OJS              | SHOULD    | Wysoka        | 4 tyg | Adoption driver |
| **S2** Raporty/statystyki          | SHOULD    | Średnia       | 2 tyg | Pain point #4   |
| **S3** Wielojęzyczność             | SHOULD    | Niska         | 1 tyd | Differentiator  |
| **C1** Zaawansowane AI analytics   | COULD     | Wysoka        | 4 tyg | Future          |
| **C2** Peer review matching        | COULD     | Wysoka        | 4 tyg | Future          |
| **W1** Mobilna aplikacja           | WON'T     | Bardzo wysoka | —     | Out of scope    |
| **W1** Własna platforma hostingowa | WON'T     | Bardzo wysoka | —     | Use SaaS        |

### 3.2 Szczegółowy Opis Features MUST

#### **M1: Dashboard Statusów**

```
Funkcjonalność:
- Widok wszystkich artykułów w procesie recenzji
- Statusy: Nowy → W trakcie recenzji → Do decyzji → Opublikowany/Odrzucony
- Filtrowanie: czasopismo, autor, data zgłoszenia, status
- Szybka akcja: "Przypomnij recenzentowi", "Dodaj recenzenta"

User Stories:
1. Jako redaktor chcę widzieć wszystkie oczekujące artykuły na jednym ekranie
2. Jako redaktor chcę filtrować po statusie, żeby wiedzieć co jest pilne
3. Jako redaktor chcę klikać jednym kliknięciem, żeby wysłać przypomnienie

Tech: React Dashboard + PostgreSQL
```

#### **M2: Przypomnienia i Terminy**

```
Funkcjonalność:
- Automatyczne przypomnienia 7 dni przed terminem
- Przypomnienia 1 dzień przed terminem
- Przypomnienia po terminie (overdue)
- Konfigurowalne szablony wiadomości email
- Historia wysłanych przypomnień

User Stories:
1. Jako redaktor chcę ustawić standardowy 14-dniowy termin recenzji
2. Jako redaktor chcę otrzymywać alerty o spóźnionych recenzjach
3. Jako recenzent chcę dostawać przypomnienia email bez interwencji redaktora

Tech: Cron jobs + Email service (SendGrid/Resend)
```

#### **M3: Baza Recenzentów**

```
Funkcjonalność:
- Profil recenzenta: imię, email, afiliacja, specjalizacje, ORCID ID
- Historia recenzji: ile recenzji wykonanych, średni czas, jakość
- Statusy recenzentów: Aktywny, Nieaktywny, Zaproszony
- Tagowanie specjalizacji (słowa kluczowe)
- Import z CSV

User Stories:
1. Jako redaktor chcę dodać recenzenta z imieniem, email i specjalizacją
2. Jako redaktor chcę widzieć historię recenzji każdego recenzenta
3. Jako redaktor chcę filtrować recenzentów po specjalizacji

Tech: PostgreSQL + Search (Postgres Full-Text lub Elasticsearch)
```

#### **M4: Szablony Recenzji**

```
Funkcjonalność:
- Biblioteka szablonów recenzji (polski + angielski)
- Sekcje szablonu: Ocena oryginalności, Metodologii, Wniosków, Stylu
- Checklista punktów do oceny
- Komentarze szablonowe do edycji

User Stories:
1. Jako redaktor chcę przypisać szablon recenzji do czasopisma
2. Jako recenzent chcę wypełniać recenzję według jasnych kroków
3. Jako redaktor chcę edytować szablony według moich wymagań

Tech: Template engine + Rich text editor (Quill/TipTap)
```

#### **M5: Podstawowe AI Suggestions**

```
Funkcjonalność:
- AI-checklist na podstawie tytułu i abstraktu artykułu
- Sugerowane słowa kluczowe do recenzji
- Wykrywanie potencjalnych problemów (brakujące sekcje,格式)
- Podsumowanie artykułu dla redaktora (TL;DR)

User Stories:
1. Jako redaktor chcę otrzymać checklistę "co recenzent powinien sprawdzić"
2. Jako recenzent chcę wiedzieć jakie aspekty artykułu są kluczowe
3. Jako redaktor chcę szybko zrozumieć o czym jest artykuł przed przydzieleniem

Tech: OpenAI API (GPT-4o-mini lub GPT-3.5-turbo) + Prompt engineering

Ograniczenia AI:
- NIE generuje pełnych recenzji
- NIE ocenia jakości merytorycznej
- NIE podejmuje decyzji o akceptacji
- TYLKO wspomaga ludzi w ich pracy
```

---

## 4. Architecture Overview

### 4.1 Tech Stack (MVP)

```
Frontend:
├── React 18 + TypeScript
├── Tailwind CSS (shadcn/ui components)
├── React Query (data fetching)
└── Vite (build tool)

Backend:
├── Node.js + Express (lub Hono)
├── PostgreSQL (Supabase lub Railway)
├── Prisma ORM
└── JWT Auth

AI Integration:
├── OpenAI API (GPT-4o-mini)
├── Rate limiting
└── Caching (Redis opcjonalnie)

Infrastructure:
├── Vercel (frontend)
├── Railway/Render (backend)
├── Supabase (database)
└── Resend (email)
```

### 4.2 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React)                         │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐    │
│  │ Dashboard │  │ Reviewers │  │ Templates │  │ Settings  │    │
│  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘    │
└────────┼──────────────┼──────────────┼──────────────┼──────────┘
         │              │              │              │
         └──────────────┴──────────────┴──────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Backend API (Node.js)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ Auth        │  │ Articles    │  │ Reviewers   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ Templates   │  │ AI Service  │  │ Email       │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└────────────────────────────┬──────────────────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
       ┌──────────┐  ┌──────────┐  ┌──────────┐
       │PostgreSQL│  │ OpenAI   │  │  Email   │
       │  Database│  │   API    │  │ Service  │
       └──────────┘  └──────────┘  └──────────┘
```

### 4.3 Data Model (Simplified)

```sql
-- Users (redaktorzy, sekretarze)
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  name VARCHAR(100),
  role VARCHAR(50), -- 'admin', 'editor', 'reviewer'
  created_at TIMESTAMP
);

-- Journals (czasopisma)
CREATE TABLE journals (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  issn VARCHAR(20),
  owner_id UUID REFERENCES users(id),
  settings JSONB
);

-- Reviewers (recenzenci)
CREATE TABLE reviewers (
  id UUID PRIMARY KEY,
  journal_id UUID REFERENCES journals(id),
  name VARCHAR(100),
  email VARCHAR(255),
  affiliation VARCHAR(255),
  orcid_id VARCHAR(50),
  expertise TEXT[], -- array of keywords
  status VARCHAR(50), -- 'active', 'inactive', 'pending'
  metrics JSONB -- {reviews_count, avg_time, avg_quality}
);

-- Articles (artykuły)
CREATE TABLE articles (
  id UUID PRIMARY KEY,
  journal_id UUID REFERENCES journals(id),
  title VARCHAR(500),
  abstract TEXT,
  authors JSONB,
  status VARCHAR(50), -- 'new', 'review', 'decision', 'published', 'rejected'
  submitted_at TIMESTAMP,
  ai_checklist JSONB -- AI-generated checklist
);

-- Reviews (recenzje)
CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  article_id UUID REFERENCES articles(id),
  reviewer_id UUID REFERENCES reviewers(id),
  template_id UUID,
  status VARCHAR(50), -- 'pending', 'in_progress', 'submitted'
  due_date TIMESTAMP,
  submitted_at TIMESTAMP,
  content JSONB -- structured review content
);
```

---

## 5. User Journey Map — MVP

### 5.1 Onboarding (Day 1)

```
KROK 1: Rejestracja (2 min)
├── Wypełniam email, hasło, nazwę czasopisma
├── Dostaję email weryfikacyjny
└── Klikam link → jestem na dashboardzie

KROK 2: Konfiguracja (5 min)
├── Ustawiam nazwy statusów (opcjonalnie)
├── Dodaję szablon recenzji (domyślny dostępny)
├── Dodaję pierwszych recenzentów (CSV lub ręcznie)
└── Ustawiam terminy (domyślne 14 dni)

KROK 3: Pierwszy artykuł (3 min)
├── Klikam "Dodaj artykuł"
├── Wklejam tytuł i abstrakt (AI generuje checklistę)
├── Wybieram recenzentów z listy
└── Wysyłam zaproszenia

KROK 4: Success moment (Day 2)
├── Dostaję email: "Przypomnienie o terminie recenzji"
├── Recenzent dostał szablon i wie co oceniać
└── Wszystko działa bez mojej interwencji
```

### 5.2 Daily Workflow

```
8:00 - Logowanie
├── Sprawdzam dashboard → wiem co jest pilne
├── Widzę 3 recenzje do końca terminu
└── Klikam "Wyślij przypomnienie" (jednym kliknięciem)

11:00 - Nowy artykuł
├── Dodaję artykuł → AI sugeruje checklistę
├── Przypisuję 2 recenzentów z bazy
└── System wysyła email z szablonem

14:00 - Sprawdzam postępy
├── 1 recenzja już wpłynęła
├── 1 recenzja w toku
├── 1 spóźniona → wysyłam follow-up
└── Wypełniam decyzję (przyjmuję/odrzucam)

16:00 - Koniec dnia
├── Wszystko pod kontrolą
├── Zero Exceli i ręcznych przypomnień
└── Mam 2 godziny więcej na badania
```

---

## 6. MVP vs Full Product

### 6.1 Phase 1: MVP (4-6 miesięcy)

**W scope:**

- Dashboard statusów
- Przypomnienia automatyczne
- Baza recenzentów z podstawowym wyszukiwaniem
- Szablony recenzji (statyczne)
- Podstawowe AI checklisty (GPT-3.5-turbo)
- Ręczne dodawanie artykułów
- Raporty podstawowe (ilościowe)

**Out of scope:**

- Integracja OJS (później)
- Zaawansowane AI analytics (później)
- Mobile app (nigdy)
- Wielojęzyczność pełna (później)
- Własne modele AI (później)

### 6.2 Phase 2: v1.0 (miesiące 7-9)

**Dodane:**

- Integracja OJS (plugin/API)
- Raporty zaawansowane (CSV export, statystyki)
- Wielojęzyczność (EN + PL)
- AI suggestions dla reviewer matching
- Więcej szablonów

### 6.3 Phase 3: Growth (miesiące 10-12)

**Dodane:**

- Peer review matching algorithm
- AI analytics dashboard
- API dla integracji zewnętrznych
- Multi-journal support (platforma)
- White-label option

---

## 7. Metrics i Success Criteria

### 7.1 MVP Success Metrics

| Metric              | Target                                    | Measurement          |
| ------------------- | ----------------------------------------- | -------------------- |
| **Time to Value**   | < 30 minut od rejestracji                 | In-product analytics |
| **Activation Rate** | > 50% rejestracji dodaje recenzenta w 24h | Analytics            |
| **Retention D7**    | > 40% wraca po 7 dniach                   | Analytics            |
| **Retention D30**   | > 20% aktywnych po 30 dniach              | Analytics            |
| **NPS**             | > 30 (dobra)                              | Survey               |
| **Support Tickets** | < 5/week                                  | Helpdesk             |

### 7.2 Business Metrics

| Metric                        | Target                | Measurement |
| ----------------------------- | --------------------- | ----------- |
| **Free → Paid Conversion**    | > 10%                 | Billing     |
| **CAC**                       | < 1.500 PLN           | Marketing   |
| **LTV**                       | > 15.000 PLN (3 lata) | Billing     |
| **Churn**                     | < 10%/rok             | Billing     |
| **Paying Customers (Year 1)** | 30-50                 | Billing     |

---

## 8. Riski i Mitigacje

### 8.1 Technical Risks

| Risk                      | Probability | Impact | Mitigation                                             |
| ------------------------- | ----------- | ------ | ------------------------------------------------------ |
| OpenAI API costs too high | Medium      | High   | Prompt caching, GPT-3.5 for simple tasks, usage limits |
| Database scaling issues   | Low         | Medium | Start with Supabase, monitor from day 1                |
| Email deliverability      | Medium      | Medium | Use Resend with proper SPF/DKIM                        |

### 8.2 Market Risks

| Risk                      | Probability | Impact | Mitigation                               |
| ------------------------- | ----------- | ------ | ---------------------------------------- |
| Low adoption of new tools | High        | Medium | Focus on pain points, case studies       |
| OJS introduces native AI  | Low         | High   | Build on open standards, differentiation |
| Budget cuts in academia   | Medium      | High   | Freemium to capture market share         |

### 8.3 Product Risks

| Risk                           | Probability | Impact | Mitigation                           |
| ------------------------------ | ----------- | ------ | ------------------------------------ |
| AI suggestions are useless     | Medium      | High   | User feedback loops, rapid iteration |
| UI too complex for older users | Medium      | Medium | Simple defaults, Polish support      |

---

## 9. Roadmap MVP

### 9.1 Sprint Plan (12 tygodni)

```
Tydzień 1-2: Setup & Auth
├── Inicjalizacja projektu (repo, CI/CD)
├── Autentykacja (JWT, email verification)
├── Baza danych (Prisma schema)
└── Podstawowy UI (shadcn/ui setup)

Tydzień 3-4: Core CRUD
├── Dashboard (listy, filtry)
├── CRUD artykułów
├── CRUD recenzentów
└── CRUD szablonów

Tydzień 5-6: Workflow Automation
├── Przypomnienia email (cron)
├── Status transitions
├── Notification system
└── Podstawowe raporty

Tydzień 7-8: AI Integration
├── OpenAI API setup
├── AI checklist generation
├── Prompt engineering
└── Rate limiting & caching

Tydzień 9-10: Polish & Polish
├── UI polish (Tailwind)
├── Error handling
├── Loading states
└── Mobile responsiveness

Tydzień 11-12: Testing & Launch
├── E2E tests (Playwright)
├── Bug fixing
├── Performance optimization
└── Soft launch (beta users)
```

### 9.2 Milestones

| Milestone                     | Target Date | Description                     |
| ----------------------------- | ----------- | ------------------------------- |
| **M1: First Commit**          | Week 1      | Projekt zainicjalizowany        |
| **M2: MVP Features Complete** | Week 8      | Wszystkie funkcje MUST działają |
| **M3: Beta Launch**           | Week 10     | 10 beta users onboarded         |
| **M4: Public Launch**         | Week 12     | Wersja 1.0 publiczna            |
| **M5: First Paying Customer** | Week 14     | Target: 5 paying customers      |

---

## 10. Costs Estimation (MVP)

### 10.1 Infrastructure (Monthly)

| Service                  | Cost (PLN)        | Notes                |
| ------------------------ | ----------------- | -------------------- |
| Vercel (Frontend)        | 0-200             | Free tier do 100GB   |
| Railway/Render (Backend) | 200-500           | 2GB RAM, 2 vCPU      |
| Supabase (Database)      | 0-200             | Free tier początkowo |
| OpenAI API               | 500-2.000         | Zależnie od usage    |
| Resend (Email)           | 0-200             | Free tier 3k emails  |
| **Total Monthly**        | **900-3.100 PLN** |                      |

### 10.2 One-time Costs

| Item               | Cost (PLN)      | Notes                  |
| ------------------ | --------------- | ---------------------- |
| Domain + SSL       | 200-500         | .pl domain             |
| Design (Figma)     | 0               | Korzystamy z shadcn/ui |
| Copywriting        | 0               | Własny content         |
| **Total One-time** | **200-500 PLN** |                        |

### 10.3 Development Time

| Phase            | Hours          | Notes                   |
| ---------------- | -------------- | ----------------------- |
| Setup            | 20h            | Repo, CI/CD, deployment |
| Auth + Database  | 40h            | JWT, Prisma, migrations |
| Dashboard        | 60h            | Frontend + backend      |
| AI Integration   | 40h            | OpenAI prompts, caching |
| Testing + Polish | 40h            | Playwright, bug fixes   |
| **Total**        | **~200 hours** | Solo-dev, 4-6 miesięcy  |

---

## 11. Go-to-Market MVP

### 11.1 Launch Strategy

```
Faza 1: Beta (tydzień 10-12)
├── 10-15 redaktorów z sieci prof.
├── Feedback loop
├── Bug fixes
└── Case studies (3-5)

Faza 2: Soft Launch (tydzień 14-16)
├── Newsletter do czasopism (1.500+ w Polsce)
├── LinkedIn content (1 post/tydzień)
├── 1-2 webinary demonstracyjne
└── PR w portalach akademickich

Faza 3: Growth (tydzień 17+)
├── Referencje od beta users
├── Content marketing (SEO)
├── Partnerships (OJS community)
└── Paid ads (LinkedIn do akademików)
```

### 11.2 Pricing MVP

| Plan             | Cena         | Features                                                         |
| ---------------- | ------------ | ---------------------------------------------------------------- |
| **Free**         | 0 PLN/mc     | Do 20 artykułów/mc, 5 recenzentów, podstawowe AI                 |
| **Starter**      | 299 PLN/mc   | Do 100 artykułów/mc, 25 recenzentów, pełne AI                    |
| **Professional** | 699 PLN/mc   | Do 500 artykułów/mc, 100 recenzentów, raporty, priorytet support |
| **Enterprise**   | 1.499 PLN/mc | Nielimitowane, white-label, dedykowany onboarding                |

---

## 12. Podsumowanie

### 12.1 MVP w pigułce

| Aspekt              | Szczegóły                                               |
| ------------------- | ------------------------------------------------------- |
| **Nazwa robocza**   | AI Academic Reviewer                                    |
| **Core value**      | Oszczędność 5-10h tygodniowo dla redaktora              |
| **AI role**         | Assistant, nie evaluator                                |
| **Target**          | Małe/średnie czasopisma w Polsce                        |
| **Dev time**        | 4-6 miesięcy (Solo-Dev)                                 |
| **Budget (Year 1)** | ~50.000 PLN (infrastruktura) + własny czas              |
| **TAM (PL)**        | ~210-310 czasopism × średnia 5.000 PLN = 1-1.5M PLN/rok |

### 12.2 Kluczowe Ryzyka do Monitorowania

1. **Adoption risk** — czy redaktorzy będą chcieli nowego narzędzia?
2. **AI cost risk** — czy GPT API nie zje całego marginu?
3. **OJS risk** — czy OJS nie wprowadzi własnych AI features?

### 12.3 Decyzje do Podjęcia

- [ ] Czy skupiamy się tylko na Polsce czy CEE od początku?
- [ ] Czy budujemy plugin OJS czy standalone SaaS?
- [ ] Czy używamy OpenAI API czy lokalnych modeli?

---

## 13. Następne Kroki

1. **WF_Monetization_Strategy** — szczegółowy model cenowy i projekcje
2. **WF_Tech_Stack_Audit** — deep dive w architekturę
3. **WF_Resource_Analysis** — budżet i timeline szczegółowy
4. **WF_GTM_Strategy** — plan pozyskania pierwszych użytkowników

---

_Dokument przygotowany w ramach workflow WF_MVP_Scoping.  
Wersja: 1.0 | Data: 2026-02-02 | Autor: SaaS Architect & Business Auditor_
