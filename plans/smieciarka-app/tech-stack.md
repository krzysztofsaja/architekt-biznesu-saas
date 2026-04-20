# Tech Stack: Smieciarka App

## Wybrane Technologie

| Kategoria | Technologia | Wersja | Uzasadnienie |
|------------|-------------|--------|--------------|
| **Frontend** | React.js | 18.x | Biblioteka do UI, reaktywne komponenty |
| **Styling** | Tailwind CSS | 3.4.x | Szybkie stylowanie, mały bundle |
| **Baza danych** | Dexie.js | 4.0.x | API do IndexedDB, prostsze niż raw IDB |
| **Mapy** | Leaflet.js | 1.9.x | OpenSource, darmowe mapy OSM |
| **Build** | Vite | 5.x | Szybki dev server, hot reload |

## Struktura Zależności (package.json)

```json
{
  "name": "smieciarka-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "dexie": "^4.0.4",
    "leaflet": "^1.9.4"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "tailwindcss": "^3.4.0",
    "vite": "^5.0.0"
  }
}
```

## Instalacja Projektu

```bash
# 1. Tworzenie projektu Vite z React
npm create vite@latest smieciarka-app -- --template react

# 2. Przejście do katalogu
cd smieciarka-app

# 3. Instalacja zależności
npm install dexie leaflet tailwindcss postcss autoprefixer

# 4. Inicjalizacja Tailwind
npx tailwindcss init -p

# 5. Konfiguracja Vite (vite.config.js)
# Dodaj: import { defineConfig } from 'vite'
# Dodaj plugin react: plugins: [react()]

# 6. Uruchomienie dev server
npm run dev
```

## Konfiguracja Tailwind (tailwind.config.js)

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10B981',  //eko-zielony
        secondary: '#3B82F6',
        accent: '#F59E0B',
      }
    },
  },
  plugins: [],
}
```

## Konfiguracja Dexie.js (src/db.js)

```javascript
import Dexie from 'dexie';

export const db = new Dexie('SmieciarkaDB');

db.version(1).stores({
  items: '++id, title, status, latitude, longitude, createdAt',
  messages: '++id, itemId, createdAt'
});

export default db;
```

## Konfiguracja Leaflet (src/map.js)

```javascript
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const initMap = (elementId) => {
  const map = L.map(elementId).setView([52.2297, 21.0122], 13); // Warszawa domyślnie
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  
  return map;
};
```

## Struktura Plików (React)

```
smieciarka-app/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx        # Entry point (render App)
│   ├── App.jsx        # Główny komponent
│   ├── index.css      # Tailwind @import
│   ├── db.js          # Konfiguracja Dexie
│   ├── api/
│   │   └── items.js  # CRUD dla przedmiotów
│   ├── components/
│   │   ├── MapView.jsx    # Mapa Leaflet
│   │   ├── ItemForm.jsx   # Formularz dodawania
│   │   ├── ItemList.jsx   # Lista przedmiotów
│   │   ├── ItemDetail.jsx # Szczegóły przedmiotu
│   │   └── Chat.jsx       # Czat
│   └── utils/
│       └── geolocation.js
└── public/
    └── favicon.ico
```

## Konfiguracja Vite (vite.config.js)

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

## Wymagania Przeglądarkowe

| Przeglądarka | Minimalna Wersja |
|--------------|------------------|
| Chrome | 80+ |
| Firefox | 75+ |
| Safari | 14+ |
| Edge | 80+ |

## API Przeglądarkowe

- `navigator.geolocation` - GPS
- `navigator.mediaDevices.getUserMedia` - Kamera
- `window.indexedDB` - Dexie wrapper

## Alternatywy Rozważane

| Technologia | Wybrana | Powód |
|-------------|---------|-------|
| React vs Vanilla | **React** (wymagane) | Reaktywne UI, komponenty |
| LocalStorage vs IndexedDB | **IndexedDB (Dexie)** | Więcej miejsca, query |
| Mapbox vs Leaflet | **Leaflet** | Darmowe, bez klucza API |
| PWA vs SPA | **SPA** | Wystarczy na MVP |

## Narzędzia Deweloperskie

- **VS Code** - edytor
- **Kilo Code CLI** - wsparcie AI
- **GitHub** - version control
- **Vite** - dev server + build