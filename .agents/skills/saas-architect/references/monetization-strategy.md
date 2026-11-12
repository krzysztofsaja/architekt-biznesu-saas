# Strategia Monetyzacji (Monetization Strategy)

**Cel:** Model cenowy i strategia przychodów maksymalizujące przychody solo deva przy minimalnej złożoności operacyjnej.

> **Prosty model cenowy, który zarabia dziś, zawsze bije skomplikowany model, który _kiedyś_ zarabiać będzie.**

Wróg: "elastyczność" wprowadzająca chaos operacyjny. Każdy wariant ceny i custom deal = dodatkowe godziny wsparcia miesięcznie.

## 1. Audyt Modelu

### Pytanie 1: Jaka jest jednostka wartości?

| Jednostka | Przykład | Pros | Cons |
|-----------|----------|------|------|
| Per User/Seat | $29/mo za użytkownika | skaluje z wartością | B2B waha się dodawać userów |
| Per Feature/Tier | Pro $49, Premium $99 | proste do zarządzania | price lock — klienci nie upgrade'ują |
| Per Usage | $0.01/raport | duży potencjał przychodu | monitoring, fraud, złożony billing |
| Per API Call | $0.05/1000 zapytań | naturalne skalowanie | horror operacyjny |
| Hybrid | seats + features | wzrost przychodu/klienta | chaos segmentacyjny |
| One-Time | $199 jednorazowo | mniej supportu | spłaszczona krzywa przychodów |

**Rekomendacja:** zacznij od Per Feature (tiery) lub Per User — najprostsze rachunkowo i wdrożeniowo.

### Pytanie 2: Kto płaci?

- **End user** (freelancer, małe biuro) → $9–49/mo, mało supportu.
- **SMB** (10–100 osób) → $49–299/mo, więcej supportu.
- **Enterprise** (100+) → $500+/mo custom, SLA, dedykowany support. 🚩 Nie dla solo deva.

### Pytanie 3: Cykl decyzji?

- **Impulse** (<$10/mo) → Stripe Checkout, bez triala.
- **Planned** ($10–100/mo) → trial 7–14 dni.
- **Strategic** (>$100/mo, procurement) → enterprise playbook — nie teraz.

## 2. Architektura Tierów (3-Level Standard)

Free / Starter / Pro. Enterprise tylko jeśli naprawdę nadchodzi.

```
FREE ($0)           — akwizycja, walidacja; core feature TYLKO; limity X/mo
STARTER ($29–49/mo) — early adopters; core + 1–2 integracje; np. 100 raportów/mo
PRO ($99–149/mo)    — power users/SMB; wszystkie integracje + API; priority support
```

**Price anchoring:** zawsze dwa tiery płatne. Starter $29 + Pro $99 (3×) — większość wybierze Pro, bo Starter "zbyt ograniczony".

## 3. Mechanizm Konwersji

**Golden Rule:** pokaż wartość PRZED paywallem. User generuje 1 raport na FREE, widzi że działa → chce więcej.

| Model | Pros | Cons |
|-------|------|------|
| Trial (7–30 dni) | wyższa konwersja | churning po trialu, support |
| Freemium | niekończąca się akwizycja | niższa konwersja, musi być użyteczny free tier |

**Rekomendacja:** freemium (limit ~10 działań/mo) + opcjonalny 7-dniowy trial Premium bez karty.

**Micro-moments upsellu:**
1. Quota limit → "Przejdź na PRO dla 100+ raportów"
2. Feature locked → integracja Slack tylko w PRO
3. Time-based → po 7 dniach rabat na PRO
4. Exit intent → "PRO 60% OFF przez 3 dni"

## 4. Realistyczna Projekcja (12 miesięcy)

```
Miesiąc 1–2: $0 (beta, launch)
Miesiąc 3:   $200 (2–3 płatnych)
Miesiąc 6:   $2–3k MRR (20–30 płatnych)
Miesiąc 12:  $5–10k MRR (50–100 płatnych) ← cel "lifestyle SaaS"
```

Konwersja FREE→PAID: 2–5% przy dobrym marketingu.

## 5. Blokady — gdzie tracisz pieniądze

1. Custom pricing / one-off deals → koniec standaryzacji.
2. Rabaty >50% → wszyscy czekają na sale.
3. Monthly-only bez annual discount → niska LTV.
4. Darmowe integracje enterprise → tech debt.
5. Payment plans / invoice later <$1000/mo → nieściągalne.

## 6. Go-Live Checklist

- [ ] Stripe (Paddle jeśli VAT EU)
- [ ] Pricing page — czytelna tabelka, bez "contact sales"
- [ ] ToS + Privacy Policy (iubenda.com itp.)
- [ ] Refund policy (14 dni, no questions)
- [ ] Onboarding email
- [ ] Self-serve upgrade flow
- [ ] Failed payment retry (Stripe robi automatycznie)

## 7. Szablon Outputu

```markdown
## Monetization Strategy: [Produkt]

### Market Context
- Target / Buyer / Purchase Behavior / ACV / Competitive Pricing

### Pricing Model
Primary unit + payment cycle (monthly, -20% annual)

### Tier Structure
| | Free | Starter | Pro |
|---|------|---------|-----|
| Price | $0 | $29/mo | $99/mo |
| Limits... | | | |

### Conversion Strategy
freemium + upsell moments + annual incentive

### Revenue Forecast + Payment Infrastructure

### Operacyjne Red Lines
- ❌ no custom pricing, no payment plans <$1000
- ✅ annual discount, self-serve upgrade
```

## 8. Proaktywne Korekty

- 🚨 Enterprise pricing → "Masz 5 userów. Starter/Pro najpierw, enterprise w Q3."
- 🚨 6+ tierów → "Mniej opcji = wyższa konwersja. Free/Starter/Pro."
- 🚨 "Pay what you want" → "To crowdfunding, nie SaaS. Ustaw ceny."
- 🚨 Ceny $1–5/mo → "Stripe fee 2.9% + $0.30. Minimum $9–10/mo."

Na koniec pytaj: _"Masz wybraną jednostkę wartości? Jeśli nie — proponuję Per Feature (Free/Starter/Pro): najszybciej się implementuje."_
