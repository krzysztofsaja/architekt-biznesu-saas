```markdown
# MVP Scope — LookApp

## 🎯 Cel walidacji
- Czy 10-20 użytkowników zapłaci za premium, aby mieć nielimitowaną garderobę i AI-stylistę?
- Czy time-to-value (dodanie ubrania → pierwsza stylizacja) < 5 minut?

## Core Loop (User Journey w MVP)
1. Rejestracja (email + hasło) → ~1 minuta
2. Dodaj ubranie (zdjęcie upload / kamera) → ~2 minuty
3. Utwórz outfit (przeciągnij/kombinuj) → <5 minut
4. Otrzymaj rekomendację / zapisz outfit → 1 minuta

## Tier 1: Must-Have (0–4 tygodnie)
- User Registration: Email + Password (opcjonalnie Google jako Post-MVP)
- Wirtualna garderoba: upload zdjęć, podstawowe tagowanie (typ, kolor)
- Background removal: użyj zewnętrznego API (np. remove.bg) jako hack
- Tworzenie outfitów: prosty canvas drag-and-drop, zapis zestawów
- Podstawowe AI dopasowanie: reguły + proste heurystyki (kolor, typ)
- Storage: AWS S3 / managed storage
- Export / share: link do outfitów / screenshot
- Minimalny billing: Stripe Checkout (simple plan)

## Tier 2: Should-Have (4–8 tygodnie)
- Automatyczne tagowanie AI (embeddingi / similarity) — prosty model
- Integracje e‑commerce (linki afiliacyjne)
- Mobile-friendly UI / PWA

## Tier 3: Nice-to-Have (post-launch)
- Full native mobile app
- Zaawansowane rekomendacje oparte na ML
- Community / social features

## Proces cięcia funkcji (Brutal Cuts) — jak filtrować pomysły
- Jeśli funkcja nie pomaga w odpowiedzi: "Czy ktoś zapłaci za to $X/miesiąc?" → CUT
- Zamiast budować ML od zera, używaj reguł + outsourcing inference (API)
- Opóźnić: social login, zaawansowane filtrowanie, admin dashboard, rozbudowane analityki

## Mapa funkcji (sugerowane priorytety i estymaty)
| Funkcja | Tier | Est. (h) | Cut? | Hack / Alternatywa |
|---|---:|---:|---:|---|
| Rejestracja (email) | 1 | 4 | ❌ |  |
| Upload zdjęć + S3 | 1 | 6 | ❌ | Użyj managed storage
| Background removal | 1 | 2 | ❌ | Zewnętrzne API
| Tagowanie ręczne (UI) | 1 | 8 | ❌ | Minimalny formularz
| Canvas outfit (save/load) | 1 | 16 | ❌ | Prosty HTML5 canvas / drag
| Proste rekomendacje (rules) | 1 | 8 | ❌ | Heurystyki zamiast ML
| Stripe Checkout | 1 | 6 | ❌ | Checkout link (no subscriptions) 
| Google/Apple login | 2 | 8 | ✅ CUT | Dodaj po feedbacku
| Advanced ML matching | 2 | 60 | ✅ CUT | MVP: heurystyki + API
| Native mobile app | 3 | 120+ | ✅ CUT | PWA/Responsive first

**Suma Tier1 (szac.)**: ~50–70 godzin (solo-dev, z użyciem zewnętrznych API)

## Red Lines (nie negocjujemy)
1. Działający core feature: użytkownik musi móc dodać ubranie i stworzyć outfit.
2. Podstawowa prywatność zdjęć i bezpieczne przechowywanie.
3. Płatność działająca (Stripe) by móc walidować chęć płacenia.

## Checklist gotowości
- [ ] Total build time < 200h
- [ ] 60% czasu idzie na core feature (garderoba + outfit)
- [ ] Plan pozyskania 10–20 beta-userów (np. social, micro-influencerzy)
- [ ] Jasna propozycja wartości w jednym zdaniu

## Propozycje szybkich „hacków” walidacyjnych
- Manual operation: ręczne removal tła dla pierwszych userów (outsourcing)
- Formularz konwersji: pokaż mockup rekomendacji i zbierz zapisy przed buildem
- Landing + Stripe Checkout pre-order (sprawdź, czy ludzie zapłacą)


