# Tech Stack Audit — Technologia dla Solo Deva

**Cel:** Optymalizacja technologii pod szybkość i koszty solo dewelopera, eliminacja "złotych młotków".

> **Najlepszy stack to ten, który uruchamia MVP w 4–8 tygodni, nie ten "najmodniejszy" czy "najbardziej skalowalny".**

Wróg: over-engineering zanim sprzedałeś pierwszą subskrypcję.

## 1. Audyt Constraints

### Background dewelopera

| Level | Rekomendacja | Dlaczego |
|-------|--------------|----------|
| Junior / samouczek | Next.js + Vercel + Supabase | najmniejsza krzywa uczenia |
| Mid (3–5 lat) | Next.js / Django + PostgreSQL + Stripe | balans szybkość/kontrola |
| Senior (5+) | dowolny stack | wie co robi |

🚩 Junior chcący uczyć się Kubernetes na MVP → "nie, to czeka do roku 2".

### Budżet infrastruktury

| Budżet | Rekomendacja | Limit |
|--------|--------------|-------|
| $0–20/mo | Vercel + Supabase Free + Stripe | do ~1k MAU |
| $20–100/mo | Vercel + Railway + PostgreSQL + S3 | do ~10k MAU |
| $100–500/mo | AWS/DO + managed DB + CDN | do ~100k MAU |
| $500+/mo | dedicated — NIE dla MVP | scale time |

### Wymogi operacyjne

- Uptime SLA 99.9%? → monitoring + backup (+$50/mo).
- Dane wrażliwe (GDPR, PII, finanse)? → WAF, encryption, auditing.
- Real-time? → Redis/queues.
- Batch? → cron.

## 2. Monolith vs Microservices

**Dla solo deva: zawsze monolith.** Microservices dopiero gdy zespół 2+. Serverless dla konkretnych use case'ów (webhooks, cron).

## 3. Warstwy Stacka

### Frontend

| Opcja | Kiedy |
|-------|-------|
| **Next.js + Tailwind** | default — 90% przypadków |
| Svelte/Vue | jeśli już znasz |
| htmx | jeśli backend Python/Django |
| Flutter/RN | SKIP na MVP — web first |

### Backend

| Opcja | Kiedy |
|-------|-------|
| **Next.js API Routes** | frontend Next.js — no-brainer |
| Django/FastAPI | jeśli znasz Python |
| Supabase (BaaS) | brak czasu na backend, realtime |
| Go | tylko gdy performance = priorytet |

### Database

| Opcja | Kiedy |
|-------|-------|
| **PostgreSQL managed** (Railway/Heroku/RDS) | default — 95% SaaS |
| **Supabase** | DB + realtime + auth za darmo |
| Firebase | zero zarządzania, ale vendor lock-in |
| MongoDB, self-hosted PG | SKIP na MVP |

### Supporting Services

| Need | Best | Koszt |
|------|------|-------|
| Auth | NextAuth / Supabase | $0 |
| Payment | Stripe (Paddle jeśli EU VAT) | % |
| Email | Resend / SendGrid | $0–20/mo |
| Storage | S3 / Supabase Storage | $1–5/mo |
| Analytics | Plausible / Vercel Analytics | $0–20/mo |
| Errors | Sentry free tier | $0 |
| Cron | GitHub Actions / Zapier | $0 |
| Rate limiting | Upstash Redis | $0–20/mo |
| Search | Algolia / MeiliSearch | $0–100/mo |

## 4. Framework Oceny (4 osie, 1–10)

Dla każdego komponentu:

- **TTI** (time-to-implement): 10 = weekend, 1 = 3+ mies.
- **OB** (operational burden): 10 = zero maintenance, 1 = 10+h/mo.
- **CS** (cost scaling): 10 = liniowy, 1 = wykładniczy/surprise.
- **DF** (developer familiarity): 10 = expert, 1 = pierwszy raz słyszę.

`Score = (TTI + OB + CS + DF) / 4`

## 5. Złote Reguły (Red Lines)

Nigdy:
- ❌ Nieznane narzędzie "na przyszłość"
- ❌ >8 serwisów (każdy = punkt awarii)
- ❌ Managed service z lock-in bez planu B
- ❌ VPS $3/mo do produkcyjnego SaaS
- ❌ Baza bez backupów

Zawsze: backupy, CDN (Cloudflare free), monitoring (Sentry), plan wersjonowania API.

## 6. Gotowe Stacki (Pick & Go)

### 🚀 Starter — najszybszy start
```
Next.js + Vercel | API Routes | Supabase | NextAuth | Stripe Checkout
Resend | Supabase Storage | Vercel Analytics | Sentry
Koszt: $0–20/mo | Setup: 40–60h | Launch: 4–6 tyg. | Maint: 2–3h/mo
```

### 💼 Professional — balans
```
Next.js + TS | API Routes lub Django | PostgreSQL (Railway) + Redis
NextAuth | Stripe | SendGrid | S3 | Plausible | Sentry | GitHub Actions
Koszt: $30–80/mo | Setup: 60–80h | Launch: 6–8 tyg. | Maint: 4–6h/mo
```

### ⚡ Performance — gdy już jest trakcja
```
Next.js + Edge | Go/Node | PostgreSQL + pgBouncer + Redis
JWT | Stripe webhooks | S3 + CloudFront | ClickHouse | Grafana
Koszt: $80–200/mo | Setup: 120+h | Launch: 10–12 tyg.
```

## 7. Migration Path

Miesiąc 1–2: Starter → Miesiąc 3–6 (jeśli trakcja): Professional → Miesiąc 6+ (jeśli 1k+ MAU): Performance.

## 8. Tech Debt Flags

🚨 Działaj teraz: deployment >10 min, brak testów, baza bez backupów, manual scaling.
⚠️ Monitoruj: >5 API calls/page, queries >100ms, >8 third-party services, brak error trackingu.

## 9. Checklist

- [ ] Time-to-market 4–8 tygodni?
- [ ] Przewidywalne koszty m.1/6/12?
- [ ] Plan B jeśli coś padnie?
- [ ] Monitoring?
- [ ] Zrozumiałe za 3 miesiące?
- [ ] Bezpieczeństwo (HTTPS, encryption, secrets)?
- [ ] Liniowe skalowanie kosztów?

Na koniec: _"Który stack najbliższy? Jeśli nie wiesz — Starter Stack (Next.js + Supabase + Vercel), zero-brainer na MVP. Po pierwszych 10 subskrypcjach optymalizujemy."_
