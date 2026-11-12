# MVP Scoping — Cięcie Funkcji do Minimum

**Cel:** Drastyczne cięcie funkcji produktu do absolutnego, technicznego minimum, które pozwala solo devowi walidować hipotezę rynkową w 4–8 tygodniach.

Twoim celem jest redukcja ambicji. Jeśli deweloper wymienia >10 funkcji, natychmiast zapytaj: _"Którą z tych funkcji będzie miał użytkownik, kiedy będzie rozważać opłacenie Ci $29/miesiąc?"_. Każdą funkcję bez odpowiedzi poddaj pod cięcie. Bądź brutalny — czas solo deva to najprzedniejszy zasób.

## 1. Fundamentalna Zasada

> **MVP to nie "wersja 0.1" Twojego marzenia. To najmniejsza możliwa instancja, która pozwala odpowiedzieć na jedno pytanie biznesowe: "Czy ludzie chcą zapłacić za rozwiązanie tego problemu?"**

Wszystko poza tym jest waste.

## 2. Faza Audytu Funkcji — Cztery Pytania

Dla każdej funkcji:

1. **"Czy ta funkcja jest niezbędna do dostarczenia Wartości #1?"** — NIE → usuń. TAK, ale działa bez niej → "Post-MVP".
2. **"Czy mogę to zbudować w mniej niż 4 godziny?"** — NIE → szukaj hacka (API third-party, pre-built, no-code) albo usuń.
3. **"Czy bez niej tracę klienta w onboardingu?"** — TAK → musi być w MVP.
4. **"Czy mogę to zwalidować bez budowy?"** (formularze, mockupy, ręczne demo) — TAK → faza "Manual Operation".

## 3. Struktura MVP

### Tier 1: Must-Have (0–4 tygodnie)

Funkcje niezbędne do pierwszej rundy walidacyjnej z 10–20 early adopters:

| Kategoria | Co to jest | Przykład |
|-----------|-----------|----------|
| **Onboarding** | Minimum do rejestracji i first-use value | Email + password (nie OAuth) |
| **Core Feature** | Jedno, JEDNO rozwiązanie problemu | Generator raportu → czysty tekst/PDF |
| **Data Input** | Jak użytkownik dostarcza dane | Formularz, CSV, webhook |
| **Data Output** | Jak użytkownik otrzymuje wartość | Email, eksport, read-only dashboard |
| **Billing** | Minimalny system płatności | Stripe Checkout |

### Tier 2: Should-Have (4–8 tygodni)

Po feedbacku: integracje (Zapier, Slack, Gmail), opcje dla power userów, analytics do optymalizacji.

### Tier 3: Nice-to-Have (post-launch)

Dark mode, mobile UI, advanced reporting, community — wszystko, co nie wpływa na decyzję o płatności.

## 4. Proces Cięcia

### Mapa Technicznego MVP

| Funkcja | Tier | Czas (h) | Cut? | Alternatywa / Hack |
|---------|------|----------|------|-------------------|
| User Authentication | 1 | 2 | ❌ | Email/Password |
| Social Login | 2 | 4 | ✅ CUT | Tier 2 |
| Admin Dashboard | 3 | 12 | ✅ CUT | Nie potrzebujesz |
| Report Generation | 1 | 6 | ❌ | Core feature |
| Email Notifications | 1 | 2 | ❌ | SendGrid API |
| Scheduled Tasks | 2 | 8 | ✅ CUT | Cron / Zapier |
| Advanced Analytics | 3 | 20 | ✅ CUT | Tier 2 |
| Customer Support Chat | 3 | 40 | ✅ CUT | Email + DM |

### "The 80/20 Question"

> _"Czy mogę dostarczyć 80% wartości, obcinając 80% złożoności technicznej?"_

- Zamiast systemu uprawnień → wszyscy użytkownicy mają dostęp.
- Zamiast pięknego responsywnego UI → funkcjonalne, może nie mobile.
- Zamiast complex data sync → batch CSV raz dziennie.

## 5. Szablon Outputu (MVP Scope Document)

```markdown
## MVP Scope: [Nazwa Produktu]

### Target Metrics (Co walidujesz?)
- [ ] Czy 10 użytkowników zapłaci $29/mo?
- [ ] Czy time-to-value < 5 minut?
- [ ] Czy churn < 10% miesięcznie?

### Core Loop
1. Sign-up (email + hasło) → 1 min
2. Upload data / Connect → 2 min
3. Receive value → <30 s
4. Export / Share → 1 min

### Tier 1 (Must-Have)
- [ ] User Registration (Email + Password)
- [ ] [CORE FEATURE #1]
- [ ] Basic Email Confirmation
- [ ] Stripe Checkout
- [ ] Output Export (PDF/CSV/Email)

**Total Build Time: [X] hours**

### Tier 2 (pierwszy update)
- [ ] OAuth, integracje, basic analytics

### What's Intentionally Cut
- Dark Mode, Mobile App, Permissions, Custom Branding, 24/7 Support

### Tech Stack
- Backend / DB / Payment / Hosting / Auth / Email (najprostsze opcje)
```

## 6. Red Lines — czego NIE wolno ciąć

1. Działający core feature — produkt musi realnie rozwiązywać problem.
2. Walidacja danych — śmieciowy input nie może crashować systemu.
3. Bezpieczeństwo — HTTPS, hashed passwords, basic GDPR.
4. Działająca płatność — bez niej nie wiesz, czy ktoś zapłaci.
5. Opłacalny hosting — <$20/miesiąc na start.

## 7. Checklist Gotowości

- [ ] Całkowity estimate ≤ 200 godzin
- [ ] 60%+ czasu na core feature, nie infrastrukturę
- [ ] Plan pozyskania 10–20 beta-testerów bez budżetu
- [ ] Produkt wyjaśnialny w 1 zdaniu
- [ ] Wiadomo, za co ludzie płacą ($X/miesiąc)
- [ ] Plan B, jeśli hipoteza się nie potwierdzi

## 8. Monitorowanie Post-Launch

- **Time-to-First-Value:** <5 minut?
- **Churn:** % rezygnujących w miesiącu?
- **Feature Requests:** 3 najczęściej proszone funkcje?
- **Support Load:** czy produkt wspiera się sam?

Decyzja: metryki dobre → scale (Tier 2); metryki słabe → pivot lub kill (procedura `kill-the-idea`).
