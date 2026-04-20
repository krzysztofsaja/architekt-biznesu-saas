# GrantRadar - Pełna Propozycja SaaS

## 1. One-Liner

**GrantRadar** to platforma SaaS automatyzująca monitoring i pozyskiwanie grantów dla uniwersytetów, oferująca alerty o naborach, szablony wniosków i AI-assisted matching naukowców z programami finansowania.

---

## 2. The "Why Now"

### Trendy wspierające produkt:

| Trend | Wpływ na produkt |
|-------|------------------|
| **AI w edukacji** - Strategia AI UE wymaga od uczelni inwestycji w AI | Zwiększone zapotrzebowanie na granty AI |
| **FENG 2021-2027** - Miliardy na transformację cyfrową i AI | Nowe programy = nowe nabory do śledzenia |
| **Horyzont Europa** - €95.5B na R&I 2021-2027 | Europejskie granty = skomplikowany monitoring |
| **Polityka "science for society"** - NCN wymaga więcej wniosków | Więcej naukowców = więcej potrzeb |
| **Demografia** - Spadek studentów = walka o granty jako źródło finansowania | Uczelnie muszą pozyskiwać środki zewnętrzne |

### Regulatory tailwind:
- **NCN** - Zmiana regulaminu 2024: więcej programów, krótsze terminy
- **FENG** - Nowe konkursy co kwartał (trudno śledzić ręcznie)
- **Digital Europe Programme** - Pierwszy raz dostępny dla polskich jednostek

---

## 3. Target Audience

### Primary: Prodziekani ds. Nauki na polskich uczelniach publicznych

| Parametr | Wartość |
|----------|---------|
| Ilość | ~150 osób (50 uczelni × 3 wydziały) |
| Budżet na narzędzia | 15,000-50,000 PLN/rok |
| Ból główny | "Nie wiem jakie programy są dostępne dla moich naukowców" |
| Decyzja | Kupuje sam lub rekomenduje prorektorowi |

### Secondary: Grant Manager / Koordynator Projektów

| Parametr | Wartość |
|----------|---------|
| Ilość | ~200 osób |
| Ból główny | "Ręcznie sprawdzam 20 stron dziennie" |
| Użycie | Codzienne korzystanie z systemu |

### Tertiary: Naukowcy (grantobiorcy)

| Parametr | Wartość |
|----------|---------|
| Ilość | ~50,000 w Polsce |
| Ból główny | "Nie wiem na jakie programy mam szansę" |
| Użycie | Przeglądanie alertów, korzystanie z AI |

---

## 4. Unfair Advantage dla Solo-Dev

### Dlaczego jedna osoba może to zbudować i wygrać:

| Przewaga | Opis |
|----------|------|
| **Lokalna wiedza** | Rozumiem polski system grantowy (NCN, NCBR), konkurencja zagraniczna nie zna szczegółów |
| **Język** | AI w języku polskim do analizy wytycznych (konkurencja oferuje tylko EN) |
| **Integracje** | PBN, OSF, systemy uczelniane - to polskie API, łatwiejsze do integracji |
| **Cena** | €3,000/rok vs $3,000 (Pivot) = 3x taniej dla polskich uczelni |
| **Szybkość** | Decyzja w tydzień vs. 3 miesiące korporacyjnego sales cycle |

### Co blokuje dużych graczy:
- **Mały rynek** - €2M PLN/rok to za mało dla międzynarodowych korporacji
- **Fragmentacja** - 50 uczelni = każdy ma inne potrzeby = customizacja = niskie margin
- **Relacje** - Polskie uczelnie kupują od lokalnych dostawców (zaufanie, support po polsku)

---

## 5. Monetization Idea

### Model: B2B SaaS - Annual Subscription

| Plan | Funkcje | Cena (PLN/rok) | Target |
|------|---------|----------------|--------|
| **Starter** | Monitoring 10 programów + 2 alerty/miesiąc | 5,000 | Małe uczelnie, instytuty |
| **Pro** | Pełny monitoring + szablony + konsorcja + Slack | 18,000 | Średnie uczelnie |
| **Enterprise** | Pro + AI Matching + dedykowany support + API | 35,000 | Duże uniwersytety |

### Dodatkowe źródła przychodu:

| Źródło | Opis | Potencjał |
|--------|------|-----------|
| **Szkolenia** | Webinary "Jak pisać wnioski NCN" | 50,000 PLN/rok |
| **Consulting** | Pomoc przy aplikacji (per grant) | 100,000 PLN/rok |
| **Data** | Anonimizowane dane o grantach = raporty rynkowe | 30,000 PLN/rok |

### Projekcja przychodów (konserwatywna):

| Rok | Użytkownicy | ARR (PLN) | Uwagi |
|-----|-------------|-----------|-------|
| 2026 | 3-5 | 50,000-90,000 | Validation + early adopters |
| 2027 | 10-15 | 180,000-270,000 | Word of mouth + case studies |
| 2028 | 25-30 | 450,000-540,000 | Market leader PL |
| 2029 | 40+ | 800,000+ | Ekspansja EU |

---

## 6. Solo-Dev Audit (Kryteria Oceny)

### ✅ Low Support
- **Automatyzacja:** 80% procesu to automat (crawler + alerty)
- **Support:** Tylko email + dokumentacja, brak 24/7
- **Skalowalność:** 100 użytkowników = ten sam system, tylko więcej serwerów

### ✅ High Pain
- **Problem "palący się pieniędzy":** Przeoczony deadline = utrata 500,000 PLN grantu
- **Problem "straty czasu":** 10h/tydzień × 52 tygodnie = 520h/rok na ręczne sprawdzanie
- **Brak alternatywy:** Fundusze.pl ma stare dane, NCN portal nie ma alertów

### ✅ No Viral Dependency
- **Wartość dla pierwszego użytkownika:** Od pierwszego logowania widzi dostępne programy
- **Efekt sieciowy:** NIE jest potrzebny (nie ma social features)
- **Standalone value:** Może używać tylko alertów bez innych modułów

### ✅ Monetization Clarity
- **Jasna propozycja wartości:** "Nie przegap deadline grantu" = oszczędność czasu
- **Easy to sell:** Prodziekan rozumie problem w 30 sekund
- **Budget existing:** Uczelnie mają budżet na "narzędzia wspierające naukę"

---

## 7. Ryzyka (Red Flags)

### 🔴 High Risk

| Ryzyko | Opis | Mitigacja |
|--------|------|-----------|
| **Strona NCN zmieni strukturę** | Crawler przestanie działać | Multi-source (NCN + NCBR + ręczna aktualizacja) |
| **Uczelnie nie kupują SaaS** | Preferują darmowe rozwiązania | Case study ROI: "1 grant = zwrot 10x" |

### 🟡 Medium Risk

| Ryzyko | Opis | Mitigacja |
|--------|------|-----------|
| **Konkurencja (Fundusze.pl)** | Rozszerzy się o alerty | AI features = differentiator |
| **Zmiany w programach EU** | Horyzont Europa zmienia portal | Human review co miesiąc + community |

### 🟢 Low Risk

| Ryzyko | Opis | Mitigacja |
|--------|------|-----------|
| **Regulacje RODO** | Dane naukowców w systemie | On-premise opcja dla Enterprise |
| **Zależność od AI** | OpenAI podniesie ceny | Multi-provider (Anthropic, local LLM) |

---

## 8. Alternatywy Rozważane

### Rozważone i odrzucone:

| Pomysł | Powód odrzucenia |
|--------|------------------|
| **Narzędzie do pisania wniosków** | Za wcześnie = wymaga zaufania, trudne do sprzedaży bez track record |
| **Platforma do współpracy naukowców** | Konkurencja: ResearchGate, Academia.edu = silne network effects |
| **Baza ekspertów dla biznesu** | Za mały rynek w Polsce |
| **System zarządzania projektami B+R** | Konkurencja: Asana, Monday = za dużo funkcji = overengineering |

### Wybrane: Monitoring + Alert + AI Matching
- **Uzasadnienie:** Najmniejszy risk, najszybszy time-to-market, jasny pain point

---

## 9. Rekomendacja Następnego Kroku

Zgodnie z workflow `WF_Idea_Generation`, proponuję uruchomić **`WF_Kill_The_Idea`** dla tego pomysłu, aby:

1. **Zweryfikować rynek:** Czy prodziekani faktycznie mają ten problem?
2. **Znaleźć luki:** Gdzie jest największy ból, który nie jest adresowany?
3. **Zmitygować ryzyko:** Co może sprawić, że produkt nie sprzeda się?

**Pytanie do Ciebie:**

> Wybierz jeden aspekt, który chcesz abyśmy "przeanalizowali w WF_Kill_The_Idea":
> - [ ] Czy uczelnie faktycznie kupią ten produkt? (market validation)
> - [ ] Czy crawler NCN/NCBR będzie działał niezawodnie? (technical risk)
> - [ ] Czy AI matching ma sens bez historycznych danych? (product risk)
> - [ ] Czy model cenowy jest realistyczny? (business risk)
