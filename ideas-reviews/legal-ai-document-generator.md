**Pomysł:** aplikacja z RAG na dokumentach/prawie + agenci AI, która generuje gotowe umowy (np. NDA, najem mieszkania) dla osób prywatnych w Polsce.

**Założenie pre-mortem:** „Ten projekt upadnie w 6 miesięcy”. Poniżej dowody na tę tezę.

---

## 5 Zabójczych Filtrów

### 1) Distribution Hell (piekło dystrybucji)

- **SEO = ekstremalna konkurencja**: frazy typu „umowa najmu wzór”, „NDA wzór” są obstawione przez portale prawne, kancelarie, agregatory wzorów i duże media. Zbudowanie autorytetu domeny wymaga czasu i skali contentu.
- **Ads często nie domykają ekonomii**: w B2C potrzeba dokumentu jest zwykle epizodyczna (one-off). Jeśli CAC wejdzie w kilkadziesiąt zł, a produkt kosztuje 19–49 zł za dokument, LTV i marża nie wytrzymają.
- **Brak naturalnej retencji**: użytkownik nie wraca co tydzień. Subskrypcja będzie miała wysoki churn.

**Wniosek:** bez „pewnego” kanału dystrybucji (partnerstwa, integracje w miejscu powstawania potrzeby) projekt będzie zależny od drogich kanałów.

### 2) Feature, Not a Product (to tylko funkcja)

- **Generator umów jest funkcją**: prompt + szablony + UI. Większe platformy (portale nieruchomości, fintech, ubezpieczenia) mogą to dorzucić jako feature.
- **RAG nie jest przewagą**: RAG może cytować źródła, ale nie „gwarantuje” właściwego doboru konstrukcji prawnej do kontekstu użytkownika.

**Wniosek:** bez workflow + zaufania + dystrybucji, to cienka warstwa, łatwa do skopiowania.

### 3) The Support Trap (pułapka wsparcia)

- **B2C nie umie zrobić poprawnego briefu**: użytkownicy będą pytać „czy to jest OK?”, co szybko wchodzi w obszar porady prawnej i nie skaluje się dla solo-deva.
- **Edge-case’y są regułą**: nawet „prosta” umowa najmu ma wiele wariantów (kaucja, podnajem, wypowiedzenia, protokół, rozliczenia mediów, współwłasność, pełnomocnictwa).
- **Chargebacki i reklamacje**: gdy umowa „nie zadziała” w konflikcie, pretensje lecą do produktu.

**Wniosek:** self-serve B2C bez prawnika generuje support kosztowny i ryzykowny reputacyjnie.

### 4) Nice-to-Have Vitamin (witamina)

- **Prawdziwy ból pojawia się dopiero po szkodzie**: zanim coś się wydarzy, większość osób użyje darmowego wzoru. Po szkodzie częściej pójdą do prawnika niż kupią generator.
- **Pierwsze do cięcia**: przy oszczędzaniu kosztów „generator dokumentów” łatwo spada z listy zakupów.

**Wniosek:** trudna monetyzacja w B2C; najczęściej model one-off z niskim LTV.

### 5) Zero-Moat (brak fosy)

- **Kopiowalność**: inny dev + AI odtworzy MVP szybko.
- **Szablony to commodity**: same wzory nie budują bariery wejścia.

**Wniosek:** sensowna fosa to: dystrybucja, marka/zaufanie, partnerstwa, unikalny workflow i dane o realnych przypadkach.

---

## 🚩 RED FLAGS (krytyczne)

1. **Odpowiedzialność i expectation gap**: obietnica „gotowej umowy do użycia bez prawnika” buduje oczekiwanie gwarancji skutku. Disclaimery nie chronią przed zwrotami, reputacją i eskalacjami.
2. **Prawdopodobnie niedomknięte unit economics**: B2C ma niskie LTV; bez organic/partnerstw CAC łatwo > marża.
3. **Zaufanie jest trudniejsze niż technologia**: użytkownik oddaje sprawę o realnych konsekwencjach. Bez autorytetu konwersja będzie słaba.
4. **RAG ≠ poprawność**: cytowanie przepisów/orzeczeń nie oznacza, że zastosowana klauzula jest właściwa dla danej sytuacji.

## ⚠️ YELLOW FLAGS (ostrzeżawcze)

1. **Utrzymanie aktualności**: prawo i praktyka się zmieniają; szablony wymagają stałego utrzymania.
2. **Jakość danych wejściowych**: potrzebujesz walidacji pól, wykrywania sprzeczności i „idiotoodporności” formularzy.
3. **Bezpieczeństwo i RODO**: dokumenty zawierają dane wrażliwe; dochodzi retencja, usuwanie danych, logowanie dostępu.
4. **Ryzyko reputacyjne**: jeden głośny przypadek „AI wygenerowało umowę i mam problem” może zabić wzrost.

---

## 💀 The “Death Scenario” (4 miesiące)

- **M1–M2**: budujesz MVP, wpuszczasz pierwszych użytkowników z SEO/ads.
- **M2–M3**: słaba konwersja (brak zaufania) → zwiększasz ads.
- **M3–M4**: CAC rośnie, support rośnie („czy to poprawne?”), pojawiają się zwroty i negatywne historie. Organiczny ruch nie rośnie do poziomu, który „sam się niesie”.
- **Efekt**: brak dźwigni dystrybucji + wysoki churn + support zjada czas → zamknięcie projektu jako nieopłacalnego.

---

## 📉 Verdict

**ABANDON** w obecnym kształcie (PL, B2C, self-serve bez prawnika).

To nie jest problem technologii RAG. To problem fundamentów: dystrybucji, zaufania, LTV oraz ekspozycji na odpowiedzialność.

---

## 🔁 Pivot Suggestion (bezpieczniejsza alternatywa)

### Opcja A (najbezpieczniejsza): „Asystent przygotowania umowy” + człowiek w pętli

- Produkt robi: checklistę danych, proponuje klauzule, wykrywa braki i ryzyka, przygotowuje szkic.
- **Finalizacja**: płatny przegląd/akceptacja przez prawnika (partnerzy / marketplace). Ty sprzedajesz narzędzie i lead, a odpowiedzialność merytoryczna jest po stronie prawnika.
- Dystrybucja: partnerstwa z kancelariami i twórcami prawnymi (oni mają zaufanie, ty masz produkt).

### Opcja B (lepsze LTV): mikro-nisza „pakiet najmu” zamiast ogólnego generatora

- Skupienie na jednym domenowym use-case = mniej edge-case’ów, lepsze UX i long-tail SEO.
- Pakiet: umowa + protokół zdawczo-odbiorczy + harmonogram płatności + przypomnienia + archiwum + checklisty.
- Dystrybucja: współprace z portalami ogłoszeniowymi, zarządcami najmu, społecznościami wynajmujących.

---

## Pytanie kontrolne (które „zabija” projekt, jeśli brak odpowiedzi)

**Jak zdobędziesz klientów bez płatnych reklam, tak aby CAC był znacząco niższy od marży na dokumencie — i jaki konkretny kanał dystrybucji masz już dziś (partner, integracja, społeczność)?**
