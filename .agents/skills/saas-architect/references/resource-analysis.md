# Analiza Zasobów (Resource Analysis)

**Cel:** Audyt zasobów niezbędnych do realizacji produktu SaaS: czas (osobo-dni), budżet (koszty bezpośrednie i pośrednie) oraz zewnętrzne integracje wymagane do uruchomienia MVP i skalowania.

## 1. Preflight — zbierz od użytkownika

- Krótki opis produktu / 1-liner
- Stage: Idea / MVP / Scaling
- Horyzont planowania: 30 / 90 / 180 dni
- Dostępne zasoby: liczba devów, budżet miesięczny, planowane integracje
- Główny cel audytu

## 2. Audyt Czasu (osobo-dni)

Kategorie z estymacją minimalną (MVP), optymalną (PMF) i buforem ryzyka (20–30%):

- **Core development:** rdzeń produktu, backend, API, frontend.
- **Integracje:** implementacja zewnętrznych API i utrzymanie.
- **DevOps / Infra:** CI/CD, hosting, monitoring.
- **Design & UX:** prototypy, testy użyteczności.
- **QA:** testy manualne/automatyczne.
- **Growth & Ops:** landing page, onboarding, marketing podstawowy.
- **Support & Ops:** materiały wsparcia.

## 3. Audyt Budżetu

- **Jednorazowe:** prototypy, licencje, konsultacje prawne.
- **Miesięczne:** hosting, baza, monitoring, płatne integracje.
- **Koszty pracy:** stawki kontraktorów (przelicz na osobo-dni).
- **Marketing/Acquisition:** testowy budżet na kanały (pierwsze 3 mies.).

Zsumuj: minimalny budżet MVP (3 mies.) i rozszerzony (6–12 mies.).

## 4. Integracje Zewnętrzne

Oceń wg krytyczności i trudności: Krytyczne / Opcjonalne / Nice-to-have.

Przykłady: płatności (Stripe), auth, CRM, marketplace, storage (S3), email (SendGrid), analytics, webhooks/queue.

Dla każdej: wymagane scope API, koszty licencyjne, szacowany czas implementacji, punkty ryzyka (rate limits, compliance).

## 5. Macierz Priorytetów

Funkcja/integracja → wartość biznesowa (1–5) × trudność (1–5) → priorytet. Rozdziel: krytyczne do MVP vs. po launchu.

## 6. Estymacje i Alokacja

- Przydziel role (np. 0.5 FTE dev, 0.2 FTE designer) → osobo-dni.
- Minimalny zespół do MVP + lista zadań z terminami.
- Bufor 20–30% na nieprzewidziane prace i opóźnienia integracji.

## 7. Ryzyka i Mitigacje

ID ryzyka → wpływ → prawdopodobieństwo → plan mitigacji. Dla krytycznych punktów przygotuj alternatywy (backup integrations, manual workarounds).

## 8. Plan Finansowy Krótkoterminowy

- Runway: ile miesięcy działania przy minimalnym burn rate.
- Break-even: ilu płatnych użytkowników / jaka ARPA pokryje koszty.

## 9. Checklista MVP-Ready

- [ ] Krytyczne integracje zaimplementowane i przetestowane
- [ ] Automatyczny onboarding i tracking kluczowych eventów
- [ ] Monitoring (uptime, errors) i backupy
- [ ] Płatności i prosty billing
- [ ] Dokumentacja operacyjna dla supportu

## 10. Deliverables

- Arkusz osobo-dni i budżetu (CSV/Google Sheet)
- Lista integracji z oceną krytyczności i estymacjami
- Macierz priorytetów
- Plan działania 30/90/180 dni z właścicielami
