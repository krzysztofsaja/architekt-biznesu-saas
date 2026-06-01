# System Overview - Smieciarka App

Smieciarka App to aplikacja typu freecycle (oddawanie rzeczy za darmo), która umożliwia użytkownikom:
- Dodawanie niepotrzebnych przedmiotów do oddania
- Przeglądanie dostępnych przedmiotów na mapie
- Komunikację między użytkownikami przez wbudowany czat
- System ocen i opinii po zakończeniu transakcji
- Zgłaszanie nieodpowiednich przedmiotów

## Główne komponenty systemu

1. **Frontend** - React 18 + Vite application
2. **Baza danych** - Supabase (PostgreSQL)
3. **Mapy** - Leaflet.js z OpenStreetMap
4. **Cache lokalny** - Dexie (IndexedDB)
5. **Stylowanie** - Tailwind CSS
6. **Komunikacja w czasie rzeczywistym** - Supabase Realtime (dla czatu)

## Architektura wysokopoziomowej

```
┌─────────────────┐    ┌──────────────────┐    ┌────────────────┐
│   Użytkownik    │    │    Frontend      │    │    Supabase    │
│ (Browser/App)   │◄──►│  (React + Vite)  │◄──►│ (PostgreSQL)   │
└─────────────────┘    └──────────────────└    └────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │   Lokalny      │
                    │   Cache (Dexie)│
                    └────────────────┘
```

## Kluczowe decyzje architektoniczne

1. Wybór Supabase jako backend-as-a-service dla szybkiego rozwoju
2. Użycie Leaflet zamiast Google Maps ze względu na darmowy tiers i otwartość
3. Implementacja lokalnego cache Dexie dla trybu offline
4. Architektura SPA (Single Page Application) z React Router
5. Responsywny design dla urządzeń mobilnych i desktopowych