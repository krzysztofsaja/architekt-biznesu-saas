# ICP Persona — Definiowanie Idealnego Klienta

**Cel:** Powtarzalna procedura definiowania Ideal Customer Profile (ICP) oraz mapowania i priorytetyzacji kluczowych problemów, tak aby solo dev mógł szybko przejść do badań, eksperymentów i GTM.

## Wejścia

- Krótki opis produktu / 1-liner wartości
- Etap produktu (Idea / MVP / PMF)
- Wstępne hipotezy o kliencie (branża, rola, wielkość firmy)
- (opcjonalnie) Wyniki `competitor-audit` lub `job-to-be-done`

## Wyjścia

- Skrócony profil ICP (1-stronicowa karta)
- Lista 5–8 problemów (opis + metryka wartości)
- Priorytetyzacja problemów (Impact × Confidence × Ease)
- Sugerowane następne eksperymenty (interview script, landing page, outreach)

## Procedura

1. **Wstępny ICP (3 zdania):** branża/segment, rola decyzyjna, wielkość organizacji i budżet decyzyjny.
2. **Zbierz JTBD i kontekst** (użyj `job-to-be-done`): 5–10 krótkich wywiadów/obserwacji (Job Snapshot). Dla każdego: Context, Motivation, Desired Outcome, Current Solution, Barriers, Trigger, Wartość, Confidence.
3. **Pain Mapping:** zgrupuj obserwacje tematycznie (onboarding, integracje, czas, koszty). Dla każdego bólu: kto go odczuwa, kiedy, jak często, jaka wartość do odzyskania.
4. **Kwantyfikacja wartości:** metryki — czas oszczędzony, koszt uniknięty, wzrost konwersji; skala per user / per company / miesięcznie.
5. **Confidence i Ease (0–10):** Confidence — jakość danych (1 = opinia, 10 = telemetry/transakcje); Ease — jak łatwo solo dev zbuduje rozwiązanie.
6. **Priorytetyzacja:** Priority = Impact × Confidence × Ease. Wybierz 1 Core Problem do natychmiastowego testu.
7. **Wynik:** ICP Card + Problem Matrix.

## Szablony

**ICP Card (1 akapit)**
- Kto: [branża, rola, wielkość]
- Co: [główny job / cel]
- Ból: [najważniejszy problem]
- Decision Criteria: [co sprawia, że kupią?]

**Problem Row (dla każdego problemu)**
- Problem: krótki opis
- Trigger: kiedy się pojawia
- Value: metryki (czas, koszt, %)
- Current Solution: jak to robią teraz
- Impact (1–10), Confidence (1–10), Ease (1–10), Priority = I×C×E
- Suggested experiment: (landing page / interview / concierge MVP)

## Interview Script (7 pytań)

1. Opowiedz o ostatnim razie, kiedy próbowałeś [zadanie].
2. Co dokładnie robiłeś krok po kroku? (Current solution)
3. Co w tym procesie jest najbardziej frustrujące? (Pain)
4. Jak rozpoznasz, że problem został rozwiązany? (Desired outcome)
5. Ile czasu/kosztu to zabiera teraz? (Value)
6. Co byś zapłacił za prostsze rozwiązanie? (Willingness-to-pay)
7. Czy próbowałeś już czegoś innego? Dlaczego nie zadziałało? (Alternatives)

## Szybkie eksperymenty (priorytetyzowane)

- Landing page + pre-signup (test komunikacji i willingness to pay)
- 5–10 rozmów z targetem (potwierdzenie value metrics)
- Concierge / manual flow dla 3 klientów (willingness to pay)
- Small paid ad test (jeden use case, CTR → signup)

## Checklista końcowa

- [ ] 1-stronicowa karta ICP
- [ ] 5–10 Job Snapshotów
- [ ] Problem Matrix z priorytetami
- [ ] 3 propozycje szybkich eksperymentów
- [ ] Zapisany next step (GTM / MVP / Outreach)

## Next Steps

- Zdefiniowany ICP → `job-to-be-done` (jeśli nie zrobione)
- Lista konkurentów → `competitor-audit` (luki)
- Potwierdzone ICP i problemy → `gtm-strategy`
