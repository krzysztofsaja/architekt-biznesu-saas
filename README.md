# Architekt Biznesu SaaS

## Opis Projektu

To repozytorium zawiera **metodologię i narzędzia do analizy biznesowej oraz technicznej pomysłów na produkty SaaS (Software as a Service)**. Jako SaaS Architect & Business Auditor, skupia się na rygorystycznej walidacji pomysłów przed rozpoczęciem kodowania, aby uniknąć strat czasu i pieniędzy na produkty, których nikt nie kupi.

Repozytorium jest przeznaczone dla:
- **Solo Developerów:** Chcących zbudować rentowny SaaS bez zespołu.
- **Studentów:** Uczących się architektury biznesowej SaaS poprzez praktyczne ćwiczenia.
- **Przedsiębiorców:** Potrzebujących narzędzi do szybkiej walidacji pomysłów.

## Kluczowe Zasady
- **Lean First:** Minimalny wysiłek na walidację.
- **Data-Driven:** Każda decyzja oparta na danych i faktach.
- **Solo-Dev Friendly:** Rozwiązania skalowalne dla jednej osoby.

## Struktura Katalogów

- **`AGENTS.md`**: Persona **SaaS Architect & Business Auditor** i zasady działania — czytana przez każdego agenta (Devin, Codex, Kilo Code, Claude Code, Copilot).
- **`.agents/skills/saas-architect/`**: Skill z 12 procedurami analitycznymi (`SKILL.md` + `references/`) — kanoniczna lokalizacja zgodna ze specyfikacją [Agent Skills](https://agentskills.io/specification).
- **`.devin/skills/`, `.claude/skills/`, `.kilocode/skills/`**: Symlinki do `.agents/skills/saas-architect` dla narzędzi wymagających własnych katalogów. Edytuj zawsze oryginał w `.agents/`.
  - ⚠️ **Windows:** symlinki wymagają włączonego Developer Mode podczas klonowania (`git config core.symlinks true` + ponowny checkout). Jeśli agent nie widzi skilla, skopiuj `.agents/skills/saas-architect/` do katalogu właściwego dla swojego narzędzia.
- **`.github/copilot-instructions.md`**: Konwencje repo dla GitHub Copilot.
- **`plans/`**: Plany projektów SaaS. Każdy projekt ma własny podkatalog (np. `ethical-code-generator/`) zawierający:
  - `README.md`: Główny plik z opisem projektu, właścicielem i spisem treści.
  - Dokumenty analityczne: Opis pomysłu, raporty z procedur analitycznych, analizy ryzyk itp.
- **`README.md`**: Ten plik – wprowadzenie do repozytorium.

## Metodyka (skill `saas-architect`)

Dawne workflowy `.kilocode/` zostały przeniesione do repozytoryjnego skilla agenta **`saas-architect`** (`.agents/skills/saas-architect/`) oraz persony w `AGENTS.md` — klonując repo dostajesz całą metodykę, niezależnie od narzędzia AI. Skill zawiera 12 procedur analitycznych w 4 fazach:

- **Discovery:** `idea-generation`, `ice-ranking`, `kill-the-idea`
- **Market Fit:** `competitor-audit`, `icp-persona`, `job-to-be-done`
- **Product Scope:** `mvp-scoping`, `user-journey-map`, `monetization-strategy`
- **Feasibility:** `tech-stack-audit`, `resource-analysis`, `gtm-strategy`

## Jak Korzystać
1. **Dla Studentów:** Wykonaj zadanie dokumentacyjne – stwórz własny podkatalog w `plans/` z kompletną analizą pomysłu SaaS, używając procedur ze skilla `saas-architect`.
2. **Dla Developerów:** Użyj procedur do walidacji własnego pomysłu przed inwestycją w kod (np. "przeprowadź pre-mortem mojego pomysłu" → `kill-the-idea`).
3. **Wywołanie skilla:** Wystarczy opisać zadanie – agent sam dobierze procedurę. Możesz też wywołać jawnie: `/saas-architect` (Claude Code, Kilo), `$saas-architect` (Codex) lub nazwij procedurę w promptach (Devin i inne).

## Przykład Projektu
Zobacz `plans/ethical-code-generator/` – przykład dokumentacji dla pomysłu na generator kodeksów etycznych. Zawiera README, opis pomysłu i analizę ryzyk (choć niepełną).

