# GrantRadar - WF_Kill_The_Idea: Market Validation

## Cel Audytu

Zweryfikowanie czy uczelnie faktycznie kupią produkt GrantRadar. Domniemanie robocze: **"Ten projekt nie sprzeda się w ciągu 12 miesięcy"**.

---

## 1. Analiza "5 Zabójczych Filtrów" (Market Validation Focus)

### Filtr 1: Distribution Hell (Piekło Dystrybucji)

**Pytanie:** Czy dotarcie do klienta będzie droższe niż zysk z subskrypcji?

| Aspekt                              | Analiza                                                                                                | Wynik          |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------- |
| **CAC (Customer Acquisition Cost)** | Cold outreach do prodziekanów: ~500 PLN/spotkanie (LinkedIn + email). Potrzeba 50 spotkań = 25,000 PLN | ⚠️ Umiarkowany |
| **Sales cycle**                     | Uczelnie = wolne decyzje. Średnio 3-6 miesięcy od pierwszego kontaktu do zakupu                        | 🔴 Długi       |
| **LTV (Lifetime Value)**            | 18,000 PLN/rok × 3 lata = 54,000 PLN                                                                   | ✅ Wysoki      |
| **LTV:CAC ratio**                   | 54,000:25,000 = 2.16x (przy 1. roku)                                                                   | ⚠️ Margines    |
| **Organic reach**                   | Konferencje REFORME, webinary = bezkosztowe dotarcie                                                   | ✅ Możliwe     |

**Wniosek:** CAC jest akceptowalny, ale długi sales cycle wymaga dużego cash runway (6 miesięcy bez przychodów).

---

### Filtr 2: Feature, Not a Product (To tylko funkcja)

**Pytanie:** Czy GrantRadar to nie jest funkcja, którą inni mogą dodać w weekend?

| Potencjalny konkurent | Czy może dodać?          | Odpowiedź GrantRadar                                 |
| --------------------- | ------------------------ | ---------------------------------------------------- |
| **NCN** (portal)      | Może dodać alerty email  | Ale nie ma incentive - to "free service", nie biznes |
| **Fundusze.pl**       | Może dodać alerty        | Ale ich model to listingi reklamowe, nie SaaS        |
| **Microsoft/Google**  | Mogą dodać do 365/Google | Ale polski rynek to za mało, żeby ich interesować    |
| **Notion**            | Może dodać template      | Ale nie integruje się z PBN, NCN API                 |

**Wniosek:** ✅ Niski risk. Specyfika polskiego systemu grantowego = naturalny moat.

---

### Filtr 3: The Support Trap (Pułapka Wsparcia)

**Pytanie:** Czy produkt wymaga 8h dziennie supportu?

| Obszar               | Ryzyko                                   | Mitigacja                                |
| -------------------- | ---------------------------------------- | ---------------------------------------- |
| **Crawler NCN/NCBR** | Strony zmienią strukturę = błędne dane   | Multi-source + human review (1h/tydzień) |
| **Alerty email**     | Użytkownicy nie wiedzą jak skonfigurować | Setup call przy onboardingu (30 min)     |
| **Integracje**       | Problemy z PBN/OSF API                   | Dokumentacja + status page               |
| **Dane grantowe**    | Błędne terminy = utrata grantu           | Disclaimer + weryfikacja human           |

**Wniosek:** ⚠️ Medium risk. Wymaga dedykowania 2-4h/tydzień na support na start.

---

### Filtr 4: The "Nice-to-Have" Vitamin

**Pytanie:** Czy to rozwiązuje palący ból (krwawienie) czy jest tylko "witaminą"?

| Scenariusz                                | Ból                                 | Czy kupią?    |
| ----------------------------------------- | ----------------------------------- | ------------- |
| **Prodziekan nie wie o naborze**          | Przeoczony deadline = 0 PLN grant   | ✅ Krwawienie |
| **Grant manager ręcznie sprawdza strony** | 10h/tydzień × 52 tyg = 520h/rok     | ✅ Krwawienie |
| **Naukowiec szuka programu**              | 5h na research = czas na publikacje | ⚠️ Vitamin    |
| **Nie ma "dobrego" systemu**              | Obecnie używają Excel + email       | ⚠️ Vitamin    |

**Wniosek:** ⚠️ Mixed. Dla prodziekanów = krwawienie. Dla naukowców = vitamin. Sprzedawaj do prodziekanów, nie do naukowców.

---

### Filtr 5: Zero-Moat (Brak barier wejścia)

**Pytanie:** Czy ktoś może skopiować produkt w weekend?

| Zasób              | Czy można skopiować?               | GrantRadar advantage                             |
| ------------------ | ---------------------------------- | ------------------------------------------------ |
| **Kod**            | ✅ Tak (open source scraper)       | Nie da się ukryć                                 |
| **Dane programów** | ⚠️ Częściowo (NCN publiczne)       | Ale trzeba utrzymywać aktualność                 |
| **Relacje**        | ❌ Nie                             | Case study US = referencje                       |
| **Integracje PBN** | ⚠️ Trudne (API wymaga autoryzacji) | Ale można poprosić                               |
| **Know-how**       | ❌ Nie                             | Wiedzę "jak sprzedawać do uczelni" trzeba zdobyć |

**Wniosek:** ⚠️ Medium moat. Główna bariera = czas i relacje, nie technologia.

---

## 2. Struktura Raportu Audytowego

### 🚩 RED FLAGS (Krytyczne)

| Flag     | Opis                                                       | Konsekwencja                                           | Mitigacja                                      |
| -------- | ---------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------- |
| **RF-1** | Sales cycle 3-6 miesięcy = brak przychodów na start        | Burn rate bez przychodów = 6 miesięcy cash             | Pre-order discount + consulting jako cash flow |
| **RF-2** | Rynek = tylko 50 uczelni publicznych w Polsce              | Każdy klient jest krytyczny = brak tolerancji na błędy | 100% uptime priority + dedykowany support      |
| **RF-3** | Zależność od NCN/NCBR (zmiana strony = crawler nie działa) | Produkt przestaje działać = utrata zaufania            | Multi-source + backup manualny                 |

---

### ⚠️ YELLOW FLAGS (Ostrzegawcze)

| Flag     | Opis                                                | Konsekwencja                                 | Mitigacja                               |
| -------- | --------------------------------------------------- | -------------------------------------------- | --------------------------------------- |
| **YF-1** | Uczelnie preferują "darmowe" rozwiązania            | Trudniejszy pitch = więcej czasu na sprzedaż | ROI calculation: "1 grant = zwrot 10x"  |
| **YF-2** | Konkurencja (Fundusze.pl) może dodać alerty         | Utrata differentiatora                       | AI features = trudne do skopiowania     |
| **YF-3** | Wymagany dedykowany support = mniej czasu na rozwój | Produkt stanie w miejscu                     | Dokumentacja + self-service + community |
| **YF-4** | Polskie uczelnie = specyficzny procurement process  | Długie umowy, wymagania formalne             | Wzór umowy + formalności od początku    |

---

### 💀 The "Death Scenario"

**Scenariusz:** Po 4 miesiącach deweloper zamyka projekt.

**Przebieg:**

1. **Miesiąc 1-2:** Development MVP (crawler + alerty)
2. **Miesiąc 3:** Pierwsze rozmowy z prodziekanami
3. **Miesiąc 4:** 3/5 rozmów = "jestem zainteresowany, ale nie mam budżetu w tym roku"
4. **Miesiąc 5:** Kolejne 2 rozmowy = to samo
5. **Miesiąc 6:** Brak przychodów + rosnące koszty = decyzja o zamknięciu

**Przyczyny:**

- Budżet uczelni na "narzędzia IT" jest w linijce "bieżące" i wynosi 0 PLN po lipcu
- Prodziekani nie mają autonomii w wydatkach > 5,000 PLN (wymagają akceptacji prorektora)
- Konkurencja "mamy to w Excelu" jest darmowa i "wystarcza"

**Prawdopodobieństwo:** 35% (jeśli nie zrobimy pre-validation)

---

### 📉 Verdict

| Kryterium          | Ocena                                                                     |
| ------------------ | ------------------------------------------------------------------------- |
| **Market Demand**  | ⚠️ **PIVOT NEEDED** - Problem istnieje, ale "chęć" ≠ "gotowość do zakupu" |
| **Timing**         | ✅ **PROCEED** - AI hype = uwaga na produkt                               |
| **Competition**    | ✅ **PROCEED** - Luka w rynku                                             |
| **Business Model** | ⚠️ **PIVOT NEEDED** - Sales cycle za długi dla solo-deva                  |
| **Go-to-Market**   | ⚠️ **CAUTION** - Potrzebne pre-validation                                 |

---

## 3. Rekomendacja

### Werdykt: **PIVOT NEEDED**

Produkt ma potencjał, ale model sprzedaży do polskich uczelni jest zbyt wolny dla solo-dewa z ograniczonym runway.

### Wymagane zmiany:

| Zmiana             | Uzasadnienie                                    | Implementacja                                                 |
| ------------------ | ----------------------------------------------- | ------------------------------------------------------------- |
| **Zmiana targetu** | Uczelnie = wolne. Małe firmy doradcze = szybsze | Sprzedawaj do firm consultingowych (grant writing) jako B2B2C |
| **Pre-validation** | Musisz potwierdzić gotowość do zakupu           | Wywiad z 5 prodziekanami: "Ile zapłacisz za X?"               |
| **Cash flow**      | Consulting jako dodatkowe źródło                | Pomoc przy aplikacji o grant = 5,000-10,000 PLN per wniosek   |
| **Pricing**        | Obniż próg wejścia                              | Starter plan = 5,000 PLN (dostępny z budżetu bieżącego)       |

### Alternatywa (jeśli nie chcesz pivotować):

**Sprzedawaj do sektora prywatnego:**

- Firmy B+R szukają grantów (NCBR, Horyzont Europa)
- Szybsze decyzje, wyższe budżety
- Rynek: 500+ firm w Polsce

---

## 4. Następne Kroki (do akceptacji)

1. **Tydzień 1:** Wywiad z 5 prodziekanami (pytanie o budżet i pain point)
2. **Tydzień 2:** Pre-order campaign (offer: "first 3 customers = 50% discount")
3. **Tydzień 3:** Jeśli brak pre-order → pivot do firm consultingowych
4. **Miesiąc 2:** MVP launch + pierwsze płatności

---

## Pytanie do Ciebie

> Czy chcesz przeprowadzić wywiad z prodziekanami (market validation), czy wolisz od razu pivotować do firm consultingowych jako target?
