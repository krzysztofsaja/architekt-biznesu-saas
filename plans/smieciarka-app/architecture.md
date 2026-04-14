# Architektura Aplikacji: Smieciarka App

## 1. Model Architektury

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT-SIDE APP                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   UI Layer  │  │ Service Layer│  │  Data Layer │    │
│  │  (HTML/JS) │  │(BusinessLogic)│  │ (Dexie.js)  │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│         │                 │                 │              │
│         └─────────────────┴─────────────────┘              │
│                          │                                │
│                    ┌─────┴─────┐                         │
│                    │ Leaflet.js │ (Mapki)                  │
│                    └───────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

## 2. Struktura Komponentów

```
src/
├── index.html          # Główny plik HTML
├── css/
│   └── styles.css      # Style aplikacji
├── js/
│   ├── app.js         # Główna logika aplikacji
│   ├── db.js          # Warstwa bazy danych (Dexie.js)
│   ├── map.js         # Obsługa mapy Leaflet
│   ├── ui.js         # Obsługa UI i formularzy
│   └── utils.js      # Funkcje pomocnicze
└── assets/
    └── icons/         # Ikony aplikacji
```

## 3. Model Danych (Dexie.js/IndexedDB)

```javascript
// Tabela: items (ogłoszenia)
{
  id: auto increment,
  title: string,           // Tytuł przedmiotu
  description: string,    // Opis
  image: blob,            // Zdjęcie (base64 lub blob)
  latitude: number,       // Współrzędna GPS
  longitude: number,
  address: string,       // Adres (opcjonalnie)
  status: string,         // 'available' | 'reserved' | 'taken'
  createdAt: timestamp,
  updatedAt: timestamp,
  contact: string       // Numer telefonu
}

// Tabela: messages (czat)
{
  id: auto increment,
  itemId: number,        // FK do items
  sender: string,        // Numer telefonu
  message: string,
  createdAt: timestamp
}
```

## 4. Przepływ Danych

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Add Item   │────▶│  Validate   │────▶│  Save to   │
│  (Form)    │     │  (JS)       │     │  IndexedDB │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Map View   │◀────│  Query DB  │◀────│  Display  │
│  (Leaflet) │     │  (Dexie)   │     │  Markers   │
└��────────────┘     └─────────────┘     └─────────────┘
```

## 5. UI Screens (Widoki)

| Widok | Opis | Komponenty |
|-------|-----|------------|
| **Mapa Główna** | Mapa z pinezkami | Leaflet, lista przedmiotów |
| **Dodaj Ogłoszenie** | Formularz dodawania | Zdjęcie, lokalizacja, opis |
| **Szczegóły Przedmiotu** | Widok pojedynczego ogłoszenia | Zdjęcie, opis, przyciski akcji |
| **Czat** | Konwersacja | Lista wiadomości, input |

## 6. Integracje Zewnętrzne

| Usługa | Cel | Implementacja |
|--------|-----|---------------|
| **Geolokalizacja (GPS)** | Pobranie lokalizacji użytkownika | `navigator.geolocation` API |
| **Kamera** | Zdjęcia przedmiotów | `navigator.mediaDevices` API |
| **Mapy** | Wyświetlanie pinezek | Leaflet.js + OpenStreetMap |
| **Local Storage** | Utrzymywanie danych | IndexedDB (Dexie.js) |

## 7. Statusy Przedmiotu

```
available ──[REZERWUJ]──▶ reserved ──[ODEBRANE]──▶ taken
    │                          │                       │
    └──────────[ANULUJ]────────┘─────────────────────┘
```

## 8. Bezpieczeństwo

- Brak logowania → dane przechowywane lokalnie
- Zdjęcia konwertowane do base64 - nie wychodzą z urządzenia
- Numer telefonu widoczny tylko dla zainteresowanych

## 9. Flow Użytkownika (Architektura)

```
1. Otwarcie aplikacji → Ładowanie IndexedDB → Wyświetlenie mapy
2. Kliknięcie "Dodaj" → Pobranie GPS → Aparat → Formularz → Zapis
3. Kliknięcie pinezki → Szczegóły → Czat/Rezerwacja
4. Zmiana statusu → Aktualizacja DB → Odświeżenie mapy
```