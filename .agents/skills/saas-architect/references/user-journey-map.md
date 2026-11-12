# User Journey Map

**Cel:** Zaprojektowanie precyzyjnej ścieżki użytkownika od wejścia do aplikacji do momentu "sukcesu" (realnej wartości i rozważenia subskrypcji), z identyfikacją każdego friction pointu powodującego churn.

Twoim celem jest znaleźć **THE bottleneck** — jeden punkt, w którym większość użytkowników odchodzi. Nie rozmawiaj o pięknym designie ani roadmapie. Skupiaj się na sekwencji czasowej: ile czasu od wejścia do Aha Moment? Jeśli >5 minut — powiedz wprost. Jeśli second return rate <40%, Aha Moment jest fałszywy. Metryki są faktem, opinie to hałas.

## 1. Fundamentalna Zasada

> **User Success = First Touch Value + Minimal Friction + Moment of Aha**

Jeśli użytkownik po 5 minutach nie widzi, że produkt rozwiązuje jego problem — odejdzie.

## 2. Success Metric (przed mapowaniem!)

Pytanie: "Jaki konkretny wynik ma osiągnąć użytkownik?" Nie "być produktywnym" — tylko _"Wygenerować raport w 5 minut"_.

| Produkt | Success Metric |
|---------|---|
| Automatyzacja emaili | Wysłanie 100 emaili bez manualnej pracy w 24h |
| PDF generator | Wygenerowanie i wysłanie PDF w 3 minuty |
| Data validator | Walidacja 1000+ rekordów bez błędów |
| Analytics | Trend na własnych danych (min. 7 dni danych) |
| Scheduling | Rezerwacja 1 spotkania bez konfliktu |

Red Flag: jeśli success metric to "użytkownik spędzi 2h na konfiguracji" — to nie success, to pain.

## 3. Mapa 7-Punktowa

### Stage 1: Landing (0–30 s)

Cel: zrozumieć, czy to dla niego.

- [ ] Headline wyjaśnia co robi produkt (nie "AI-Powered Solution", tylko "Automatycznie generuje raporty z Twojego Excela")
- [ ] Value prop bez scrollowania
- [ ] Jasny CTA do sign-up

Friction: zawiła grafika zamiast tekstu, "Learn more" zamiast "Sign up free", zbyt wiele planów.
Aha Moment: "To dokładnie rozwiązuje mój problem" (w 10 s).

### Stage 2: Sign-Up (1–3 min)

- [ ] Email + Password (bez telefonu, bez custom pól)
- [ ] Potwierdzenie emailem instant-link
- [ ] Opcja Quick Start — skip zbędnych pytań
- [ ] Progress bar

Friction: 10+ pytań w formularzu, wymuszone 2FA, redirect do dokumentacji, "zaproś kolegów" przed value.
Aha Moment: wejście do aplikacji i widok głównego feature'u (NIE widok onboardingu).
Post-sign-up email (w 5 min): jeden link — "dodaj pierwsze dane".

### Stage 3: First Data Input (5–15 min)

- [ ] Jasna instrukcja co wpisać
- [ ] Pre-filled przykład danych
- [ ] Opcja upload CSV
- [ ] Walidacja real-time

Friction: długi formularz, brak instrukcji, kryptyczne errory, UI jak "settings" zamiast input-output.
Aha Moment: system akceptuje dane i przechodzi do przetwarzania.

### Stage 4: Processing (15–20 s)

- [ ] Progress bar z tekstem ("Analyzing your data...")
- [ ] Szacunkowy czas
- [ ] Jeśli >5 s — placeholder lub preview outputu

Friction: biały ekran ze spinnerem, >15 s czekania, brak info.

### Stage 5: First Output / AHA MOMENT (20–60 s) ⭐

- [ ] Output czytelny i praktyczny (nie generyczne demo)
- [ ] Rezultat bezpośrednio z ich inputu
- [ ] Natychmiastowy eksport/udostępnienie
- [ ] "To zaoszczędziło Ci 30 minut pracy"

Friction: piękny ale niepraktyczny output, "Upgrade to see full result", brak pobrania, zły format.
Aha Moment: "Mogę to sprzedać szefowi jako uzasadnienie subskrypcji".
**Cała ścieżka 1→5: max 3–5 minut.**

### Stage 6: Second Action (1–3 dni)

- [ ] Email po 24h: "Gotów na następny krok?"
- [ ] In-app widget "Spróbuj z innymi danymi"
- [ ] Templates do skopiowania

Friction: brak follow-upu, druga akcja trudniejsza niż pierwsza.
Aha Moment: druga akcja z własnej inicjatywy.

### Stage 7: Conversion to Paid (7–30 dni)

- [ ] Clear messaging: "Trial ends [DATE]"
- [ ] CTA usprawiedliwia cenę ("For unlimited reports")
- [ ] 1-click upgrade
- [ ] Brak surprise charges

Friction: hidden pricing, wymóg danych korporacyjnych, chaotyczne komunikaty ("Free forever" vs "trial ends").

## 4. Summary Metrics

- Landing → Sign-up: ___% (target >5%)
- Sign-up → First Output: ___% (target >70%)
- First Output → Day 1 Return: ___% (target >40%)
- Trial → Paid: ___% (target >5%)

**Biggest Friction Point:** [jeden punkt zabijający konwersję]
**Quick Wins:** 3 zmiany wykonalne w <4h.

## 5. Critical Checkpoints (czerwone flagi)

- 🚩 Aha Moment po >5 minutach → odejdzie zanim zobaczy.
- 🚩 Output wymaga wejścia w settings → za dużo frictionu.
- 🚩 Second return rate <30% → Aha Moment iluzoryczny.
- 🚩 Conversion <3% → problem w journey, nie w pricing.
- 🚩 Tickety "jak to używać?" → onboarding nie wyjaśnia.
- 🚩 "Pretty, but not useful" → zły UX.

## 6. Monitoring Post-Launch

```
Daily:  Landing→Sign-up %, Sign-up→Output %, time-to-output (min), Aha survey %
Weekly: D1 Return %, D7 Return %, Trial→Paid %
Monthly: Churn %, feature adoption, support load
```

## 7. Anti-Patterns

| Mistake | Why it fails | Fix |
|---------|-----------|-----|
| Sign up → Settings → Dashboard → Upload | user odchodzi przed value | Upload → Output → potem settings |
| "Download extension first" | friction przed value | web version w MVP |
| "Invite team before first success" | solo nie widzi po co | najpierw solo win |
| Free forever + agresywne upselle | brak ścieżki do paid | trial + jasny moment upgrade |
| 7+ ekranów onboardingu | userzy skipują | 1 tip, reszta by doing |
| System ról/uprawnień | solo overwhelmed | każdy = admin w MVP |
