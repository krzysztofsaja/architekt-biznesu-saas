# WF_Tech_Stack_Audit & WF_Resource_Analysis – NeuroAthlete

## 1. Cel dokumentu

Celem dokumentu jest:
- określenie realistycznego stosu technologicznego,
- zaplanowanie architektury SaaS,
- oraz oszacowanie zasobów potrzebnych do budowy MVP NeuroAthlete.

Projekt jest traktowany jako **mobile-first SaaS**.

---

## 2. Architektura systemu

### Model ogólny

NeuroAthlete będzie oparty o architekturę typu:

> Mobile App + API + Cloud Backend

#### Składniki:
- Aplikacja mobilna (iOS + Android)
- Backend API
- Baza danych
- System analityczny
- Moduł autoryzacji
- System płatności

---

## 3. Warstwa frontend (Mobile)

### Technologie:
| Element | Technologia |
|---------|-------------|
Framework mobilny | Flutter / React Native |
Język | Dart / TypeScript |
UI | Material UI / Native UI |
Stan aplikacji | Riverpod / Redux |
Testy | Unit + UI tests |

### Dlaczego cross-platform?
- jeden kod na iOS i Android
- niższy koszt MVP
- szybkie iteracje

---

## 4. Backend & API

| Element | Technologia |
|---------|-------------|
API | REST / GraphQL |
Backend | Node.js (NestJS) |
Autoryzacja | JWT + OAuth2 |
Walidacja | OpenAPI |
Hosting | AWS / GCP / Firebase |

---

## 5. Baza danych i analityka

| Element | Technologia |
|---------|-------------|
Baza danych | PostgreSQL |
Cache | Redis |
Analityka | Firebase Analytics |
Logi | Cloud Logging |

---

## 6. AI i komponent poznawczy

Na etapie MVP:
- regułowe algorytmy oceny refleksu i koncentracji

W kolejnych etapach:
- modele ML do predykcji zmęczenia poznawczego
- personalizacja treningów

---

## 7. Bezpieczeństwo i zgodność

- szyfrowanie danych użytkowników
- zgodność z RODO
- anonimizacja danych analitycznych
- role użytkowników: zawodnik / trener / admin

---

## 8. Zasoby zespołowe (Resource Analysis)

### MVP Team (Lean):

| Rola | Zakres |
|------|----------|
Product Owner | wizja produktu |
Mobile Developer | aplikacja mobilna |
Backend Developer | API i logika |
UX Designer | interfejs i flow |
Domain Expert | kognitywistyka / sport |
QA | testy |

Możliwe połączenie ról przy małym zespole.

---

## 9. Koszty MVP (szacunkowo)

| Obszar | Koszt miesięczny |
|--------|------------------|
Cloud hosting | 300–500 zł |
Narzędzia developerskie | 200 zł |
Analityka / monitoring | 100 zł |
Razem | ~600–800 zł |

---

## 10. Skalowalność

System projektowany pod:
- rosnącą liczbę użytkowników
- przyszłe integracje (wearables)
- ekspansję na inne sporty

---

## 11. Wnioski

Zaproponowany stack:
- umożliwia szybkie wdrożenie MVP,
- jest skalowalny,
- oraz realistyczny kosztowo dla projektu studenckiego i startupowego.
