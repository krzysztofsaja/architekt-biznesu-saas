# Job To Be Done (JTBD)

**Cel:** Zidentyfikować rzeczywiste zadania, które użytkownicy próbują zrealizować, oraz warunki sukcesu (desired outcomes). Szybko, mierzalnie, nastawione na walidację hipotez.

**Jak używać:** Wypełnij sekcje dla jednego ICP. Zbierz 5–10 krótkich wywiadów lub obserwacji produktu i wpisz je w szablon "Job Snapshot". Skup się na kontekście, motywacjach i kryteriach sukcesu. Każdą obserwację traktuj jak hipotezę do przetestowania.

## Struktura raportu

**Summary**
- **Hipoteza problemu:** (1 zdanie)
- **Target ICP:** (kto, profil, stanowisko/funkcja)
- **Top insight:** (najważniejsze odkrycie z sesji JTBD)

**Job Snapshot (dla każdego przypadku)**
- **Context (kiedy):** sytuacja, w której użytkownik działał.
- **Motivation (dlaczego):** co skłoniło do szukania rozwiązania?
- **Desired Outcome (sukces):** co musi się stać, żeby użytkownik powiedział "to działa"?
- **Current Solution / Workaround:** co robi teraz?
- **Barriers / Pain Points:** co przerywa lub komplikuje pracę?
- **Trigger:** zdarzenie / KPI / deadline uruchamiający potrzebę.
- **Wartość (w liczbach):** czas oszczędzony, koszty, strata przy błędzie.
- **Confidence (0–10):** opinia vs obserwacja vs telemetry.

**Przykład wpisu**
- Context: "Rano, przed pierwszym meetingiem, muszę szybko przygotować raport dla klienta."
- Motivation: "Nie chcę tracić czasu na formatowanie, muszę mieć gotowy PDF w 10 minut."
- Desired Outcome: "Gotowy raport w 10 min, poprawnie sformatowany, z wykresami z ostatnich 30 dni."
- Current Solution: "Eksport CSV → Excel → ręczne wykresy → eksport do PDF."
- Barriers: "Ręczna praca, błędy w formułach, brak automatyzacji."
- Trigger: "Dzień raportowy co poniedziałek lub nagła prośba klienta."
- Wartość: "~2h oszczędności na raporcie, 5 raportów/mies. → 10h/mies."
- Confidence: 7

**Syntetyczna Analiza (po 5–10 snapshotach)**
- **Top 3 Jobs:** najczęściej powtarzające się zadania.
- **Top 3 Desired Outcomes:** mierzalne kryteria sukcesu.
- **Primary Pain Drivers:** 3 główne przyczyny bólu.
- **Variability:** w jakich sytuacjach job się różni (segmentacja ICP).

**Opportunity Mapping**
- **Core Job-to-be-Done (wybierz 1):** najlepsza kombinacja palącości i łatwości rozwiązania.
- **Minimum success criteria:** 3 kryteria, które MVP musi spełnić.
- **Quick experiments:** 3 krótkie testy (landing page, zapisy, concierge, prefill flows).

**[RISKS]**
- False positives: deklarują potrzebę, ale nie zapłacą.
- Edge-case fragmentation: jobs zbyt specyficzne do uogólnienia.
- High manual work: rozwiązanie wymaga ręcznej konfiguracji/supportu.

**MVP Scope**
- **Essential:** 1 core flow realizujący Core JTBD + 1 integracja + szybki onboarding.
- **Analytics:** time-to-first-value i % osiągających Desired Outcome.
- **Do not build yet:** enterprise features, on-prem, heavy role management.

**Metrics to Track**
- Activation: % reaching desired outcome in first session
- Engagement: repeat usage per week
- Monetization: % converting to paid after success
- Efficiency: manual hours per successful outcome

## Interview Script (7 pytań)

1. "Opowiedz mi o ostatnim razie, kiedy próbowałeś to zrobić." (Context)
2. "Co wtedy dokładnie robiłeś krok po kroku?" (Current solution)
3. "Co było najgorsze w tym procesie?" (Pain)
4. "Jak rozpoznasz, że to rozwiązanie zadziałało?" (Desired outcome)
5. "Ile czasu/kosztu to zabiera teraz?" (Value)
6. "Co byś zapłacił za prostsze rozwiązanie?" (Willingness-to-pay)
7. "Czy próbowałeś czegoś innego? Dlaczego nie zadziałało?" (Alternatives)

## Checklista

- [ ] 5–10 wypełnionych Job Snapshotów
- [ ] Co najmniej 2 przytoczone metryki wartości (czas/koszt)
- [ ] Zidentyfikowany Core Job-to-be-Done
- [ ] 3 propozycje szybkich eksperymentów

## Next Steps

- **Sugerowany kolejny krok:** `mvp-scoping` — zdefiniuj minimalny produkt realizujący Core Job.
- **Szybki eksperyment:** landing page + formularz pre-signup + outreach do 20 potencjalnych użytkowników.
