# GrantRadar - Propozycja SaaS dla Polskich Uniwersytetów

## Executive Summary

**GrantRadar** to platforma SaaS do automatyzacji pozyskiwania środków zewnętrznych na badania i AI dla uniwersytetów. Produkt startuje od najprostszego modułu (monitoring alertów), z możliwością rozbudowy o Grant Support Office i AI-assisted funding.

**Model biznesowy:** B2B SaaS (subskrypcja roczna)
**Cena startowa:** 15,000-25,000 PLN/rok per uniwersytet
**Rynek początkowy:** Polska (50+ publicznych uczelni)
**Ekspansja:** Europa Środkowa → DACH → UE

---

## Kontekst Strategiczny (z dokumentu US)

Na podstawie analizy dokumentów Uniwersytetu Szczecińskiego:

| Element | Problem | Rozwiązanie GrantRadar |
|---------|---------|------------------------|
| Monitoring naborów | Brak systematycznego śledzenia 50+ programów | Automatyczne alerty 90/60/30 dni |
| Grant Support Office | Rozproszone wsparcie, brak dedykowanego zespołu | Centralna platforma z szablonami |
| AI-assisted funding | Brak narzędzi do matchingu naukowiec-program | Inteligentny AI matching + predykcja |

---

## Moduły Produktu

### Moduł 1: Grant Radar (MVP - Q1-Q2 2026)
**Status: Core Product**

- [ ] Baza programów finansowania (NCN, NCBR, Horyzont Europa, FENG, Erasmus+)
- [ ] Automatyczne alerty email/Slack o nadchodzących naborach
- [ ] Dashboard z kalendarzem deadline'ów
- [ ] Kategoryzacja według dyscyplin, typu beneficjenta, budżetu

### Moduł 2: Grant Office Hub (Q3-Q4 2026)
**Status: Rozbudowa**

- [ ] Szablony wniosków dla programów polskich i europejskich
- [ ] System zarządzania konsorcjami (partnerzy, zadania, timeline)
- [ ] Automatyczne generowanie CV naukowców z PBN/API
- [ ] Checklisty formalne przed złożeniem

### Moduł 3: AI Funding Assistant (2027+)
**Status: Roadmap**

- [ ] AI matching: profil naukowca → rekomendowane programy
- [ ] AI-assisted writing: sugerowanie treści wniosku
- [ ] Predykcja szans powodzenia (historia + parametry wniosku)
- [ ] Analiza wytycznych programu (extraction + compliance check)

---

## Target Persona (ICP)

### Primary: Prodziekan ds. Nauki / Dyrektor Instytutu
- **Ból:** "Nie wiem jakie programy są dostępne dla moich naukowców"
- **Ból:** "Terminy przeoczamy o dni, a to setki tysięcy złotych"
- **Budżet:** 15-50k PLN/rok na narzędzia wspierające granty
- **Decyzja:** Zatwierdza zakup, konsultuje się z grant office

### Secondary: Grant Manager / Koordynator Projektów
- **Ból:** "Ręcznie sprawdzam 20 stron dziennie, żeby nie przegapić naboru"
- **Ból:** "Naukowcy przychodzą tydzień przed deadline z prośbą o pomoc"
- **Użycie:** Codzienne korzystanie z systemu
- **Wplyw:** Rekomenduje produkt prodziekanowi

### Tertiary: Naukowiec / Grantobiorca
- **Ból:** "Nie wiem na jakie programy mam szansę"
- **Ból:** "Pisanie wniosku od zera trwa tygodnie"
- **Użycie:** Przeglądanie alertów, korzystanie z AI assist

---

## Analiza Rynku

### Wielkość rynku (Polska)

| Segment | Ilość | Średni budżet/rok | Rynek (PLN) |
|---------|-------|-------------------|-------------|
| Uczelnie publiczne | 50 | 20,000 | 1,000,000 |
| Uczelnie prywatne | 30 | 8,000 | 240,000 |
| Instytuty badawcze | 40 | 15,000 | 600,000 |
| **RAZEM** | **120** | - | **~1.84M PLN** |

### Konkurencja

| Narzędzie | Funkcje | Cena | Gap |
|-----------|---------|------|-----|
| Fundusze.pl | Listing programów | 5,000/rok | Brak alertów, brak AI |
| NCN Portal | Informacje o naborach | Free | Brak personalizacji |
| GrantTracker (US) | Wewnętrzne narzędzie | N/A | Nie na sprzedaż |
| Pivot (US) | Baza grantów | $3,000/rok | Brak EU programs, drogi |

**Unfair Advantage:** Polskie programy (NCN, NCBR, FENG) + AI w języku polskim + lokalne integracje (PBN, OSF)

---

## Model Monetyzacji

### Pricing (v1.0)

| Plan | Funkcje | Cena (PLN/rok) |
|------|---------|----------------|
| **Basic** | Monitoring + 5 alertów/miesiąc | 8,000 |
| **Pro** | Pełny monitoring + szablony + konsorcja | 18,000 |
| **Enterprise** | Pro + AI Matching + dedykowany support | 35,000 |

### Revenue Projection ( konserwatywny)

| Rok | Użytkownicy | ARR (PLN) |
|-----|-------------|-----------|
| 2026 | 5 uczelni | 90,000 |
| 2027 | 15 uczelni | 270,000 |
| 2028 | 30 uczelni | 540,000 |

---

## MVP Scope (Moduł 1)

### Must Have (v1.0)
- [ ] Crawler programów NCN + NCBR + Horyzont Europa
- [ ] Baza danych programów (min. 50 programów)
- [ ] System alertów email (konfiguracja per użytkownik)
- [ ] Dashboard kalendarzowy
- [ ] Kategoryzacja programów (dziedzina, typ, budżet)

### Should Have (v1.1)
- [ ] Integracja Slack/Teams
- [ ] Export do kalendarza Google/Outlook
- [ ] Powiadomienia 90/60/30 dni przed deadline

### Nice to Have (v2.0)
- [ ] API dla systemów uczelnianych
- [ ] Widget na stronę www wydziału

---

## Tech Stack

| Warstwa | Technologia | Uzasadnienie |
|---------|-------------|--------------|
| Backend | Next.js + PostgreSQL | Szybki rozwój, TypeScript |
| AI | OpenAI API (GPT-4) | Analiza wytycznych, matching |
| Crawler | Puppeteer + Cheerio | Scraping stron programów |
| Email | Resend | Niezawodne transakcyjne |
| Hosting | Vercel + Supabase | Skalowalne, cheap startup |
| Auth | NextAuth + SSO SAML | Integracja z AD uczelnianym |

**Szacowany czas MVP:** 3-4 miesiące (solo dev z AI)
**Budżet dev:** 50,000-80,000 PLN (jeśli outsourcing) lub własny czas

---

## Go-To-Market Strategy

### Faza 1: Validation (Miesiąc 1-2)
- [ ] Wywiad z 5 prodziekanami US (case study = US)
- [ ] Landing page z waitlist
- [ ] Pre-order od 2 uczelni (discount 50%)

### Faza 2: Launch PL (Miesiąc 3-6)
- [ ] Pitch na konferencji REFORME (zarządzanie nauka)
- [ ] Cold outreach do prodziekanów (LinkedIn + email)
- [ ] Case study US jako reference customer
- [ ] Webinary: "Jak nie przegapić grantu NCN"

### Faza 3: Expansion (Rok 2)
- [ ] Ekspansja do Czech/Słowacja (podobny system grantowy)
- [ ] Moduł AI (dodatkowa wartość = upgrade)
- [ ] Partnerstwa z firmami consultingowymi (grant writing)

---

## Ryzyka i Mitigacje

| Ryzyko | Prawdopodobieństwo | Impact | Mitigacja |
|--------|-------------------|--------|-----------|
| Strona NCN zmieni API | Średnie | Wysoki | Multi-source (NCN + NCBR + własna baza) |
| Uczelnie nie kupują | Średnie | Wysoki | Early adopter discount + case study |
| Konkurencja (Fundusze.pl) | Niskie | Średni | AI features = differentiator |
| Zmiany w programach EU | Średnie | Średni | Automatyczne aktualizacje + human review |

---

## Następne Kroki

1. **Tydzień 1:** Wywiad z US (Komisja AI + Biuro Współpracy Międzynarodowej)
2. **Tydzień 2:** Finalizacja MVP scope + tech stack
3. **Tydzień 3:** Landing page + pre-order campaign
4. **Miesiąc 2:** Development start (sprint 1: crawler + baza)

---

## Pytanie do Dyskusji

**Który moduł powinien być priorytetem v1.0?**

- [ ] Monitoring alertów (najprostsze, najszybciej do sprzedaży)
- [ ] Szablony wniosków (większa wartość = wyższa cena)
- [ ] AI matching (game changer, ale więcej ryzyka technicznego)

---

*Document generated: 2026-03-25*
*Status: Draft v0.1*
