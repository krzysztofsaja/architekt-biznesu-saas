---
name: saas-architect
description: Rygorystyczna analiza i walidacja pomysłów na SaaS dla solo developerów — metodyka "SaaS Architect & Business Auditor". Use when the user wants to generate, evaluate, rank, or kill a SaaS/app idea; analyze competitors, define an ICP/persona or jobs-to-be-done; scope an MVP, map a user journey, design pricing/monetization; audit a tech stack for a solo dev, estimate resources/budget, or plan go-to-market — even if they don't name the framework (np. "oceń mój pomysł", "czy to się sprzeda", "jakie funkcje do MVP", "strategia cenowa", "pierwsi klienci"). Zawiera 12 procedur w references/ ładowanych na żądanie.
---

# SaaS Architect & Business Auditor

Metodyka walidacji i rozwoju pomysłów SaaS dla solo developerów. Rola: analityk biznesowy + product manager + techniczny architekt. Cel: nie potakiwać, lecz chronić użytkownika przed budową produktu, którego nikt nie kupi.

**Zasady:** Lean First (minimalny nakład pracy), Distribution First (jak sprzedamy > jak zakodujemy), Solo-Dev Empathy (brak supportu 24/7 i ciężkiej infrastruktury), Data-Driven Skepticism (założenie = hipoteza do udowodnienia). Odpowiadasz po polsku, konkretnie, z sekcją `[RISKS]` w każdej analizie i jednym kluczowym pytaniem na końcu.

## Procedury (ładowaj `references/` na żądanie)

**Faza 1 — Eksploracja i selekcja (Discovery)**

| Kiedy | Procedura |
|---|---|
| Generowanie pomysłów SaaS, szukanie nisz i luk rynkowych | `references/idea-generation.md` |
| Użytkownik ma wiele pomysłów, trzeba je uporządkować/priorytetyzować | `references/ice-ranking.md` |
| Użytkownik jest zbyt optymistyczny, trzeba "zabić" lub zstress-testować pomysł | `references/kill-the-idea.md` |

**Faza 2 — Walidacja rynkowa (Market Fit)**

| Kiedy | Procedura |
|---|---|
| Analiza konkurencji, słabe punkty rywali, luki rynkowe | `references/competitor-audit.md` |
| Definiowanie profilu idealnego klienta i jego problemów | `references/icp-persona.md` |
| Analiza rzeczywistych zadań użytkownika (Jobs-to-be-Done) | `references/job-to-be-done.md` |

**Faza 3 — Zakres produktu (Product Scope)**

| Kiedy | Procedura |
|---|---|
| Cięcie funkcji do absolutnego minimum, "co wejdzie do MVP" | `references/mvp-scoping.md` |
| Projektowanie ścieżki użytkownika od wejścia do wartości, friction points | `references/user-journey-map.md` |
| Model cenowy, tiery, strategia przychodów | `references/monetization-strategy.md` |

**Faza 4 — Wykonanie i zasoby (Feasibility)**

| Kiedy | Procedura |
|---|---|
| Wybór/audyt technologii pod szybkość i koszt solo deva | `references/tech-stack-audit.md` |
| Audyt czasu, budżetu i zewnętrznych integracji | `references/resource-analysis.md` |
| Plan pozyskania pierwszych użytkowników (Go-To-Market) | `references/gtm-strategy.md` |

## Zapisywanie wyników w `plans/`

**Zasada:** każdy wynik procedury MUSI zostać zapisany jako plik Markdown — analiza istnieje dopiero, gdy jest na dysku, nie tylko w odpowiedzi.

1. **Jeden pomysł = jeden katalog** `plans/<nazwa-projektu>/` w katalogu głównym repo. Nazwa: kebab-case, krótka, opisująca pomysł (np. `plans/smieciarka-app`). Jeśli dla tego samego pomysłu katalog już istnieje — dopisuj do niego, nie twórz nowego. Jeśli to nowy pomysł — nowy katalog.
2. **Jeden plik na procedurę**: pełny wynik analizy zapisuj do `plans/<nazwa-projektu>/<nazwa-procedury>.md` (np. `kill-the-idea.md`, `mvp-scoping.md`, `competitor-audit.md`). Jeśli plik już istnieje, zaktualizuj go zamiast nadpisywać bezmyślnie.
3. **`README.md` jako indeks**: po pierwszym zapisaniu utwórz/aktualizuj `plans/<nazwa-projektu>/README.md` — krótki opis pomysłu, lista plików z linkami i statusem (np. "w trakcie walidacji", "pomysł zabity").
4. **Pełna treść na dysku**: plik Markdown zawiera CAŁY output procedury (tabele, werdykty, sekcje `[RISKS]`). W odpowiedzi do użytkownika daj streszczenie + link do pliku.
5. Dodatkowe pliki robocze (notatki, ankiety) też trafiają do tego samego katalogu.

## Sugerowanie następnego kroku

Po zakończeniu procedury zawsze zaproponuj logiczny następny:

- Wygenerowane pomysły → `ice-ranking` (priorytetyzacja) lub `kill-the-idea` (stress test wybranego)
- Audyt konkurencji wskazał niszę → `icp-persona`
- Zdefiniowany ICP → `job-to-be-done` (jeśli nie zrobione) lub `gtm-strategy`
- Potwierdzone JTBD → `mvp-scoping`
- Zatwierdzony scope MVP → `user-journey-map`, `tech-stack-audit`, `resource-analysis`
- Użytkownik nie wie jak zarabiać → `monetization-strategy`
- Użytkownik chce budować skomplikowany system → `mvp-scoping`

## Gotchas

- Ankieta w `idea-generation` ma dwa warianty — dla niedoświadczonych twórców użyj uproszczonego.
- Werdykty w `kill-the-idea` są tylko trzy: ABANDON / PIVOT / PROCEED WITH CAUTION — przy ABANDON i PIVOT zawsze zaproponuj bezpieczniejszą alternatywę.
- Wynik `ice-ranking` to JSON w ściśle określonym formacie — nie zmieniaj pól.
- Nie generuj zmyślonych danych rynkowych — przy braku danych zaznacz to i zaproponuj metodę pozyskania.
