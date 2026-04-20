# 🗑️ Smieciarka App

Aplikacja do oddawania niepotrzebnych przedmiotów w sąsiedztwie. Znajdź i oddaj rzeczy, które już nie są Ci potrzebne!

## 🎯 Funkcje

- **Mapa** - wyświetla przedmioty na mapie OpenStreetMap
- **Geolokalizacja** - automatycznie lokalizuje użytkownika
- **Dodawanie przedmiotów** - łatwe dodawanie nowych rzeczy do oddania
- **Lista przedmiotów** - widok listy z filtrami
- **Czat** - komunikacja między użytkownikami
- **Synchronizacja** - dane w chmurze Supabase

## 🛠️ Tech Stack

| Technologia | Zastosowanie |
|-------------|--------------|
| React 18 | Framework frontend |
| Vite | Build tool |
| Tailwind CSS | Stylizacja |
| Supabase | Baza danych (PostgreSQL) |
| Leaflet | Mapa |
| Dexie | Lokalna baza (offline) |

## 🚀 Uruchomienie lokalne

```bash
# 1. Instalacja
npm install

# 2. Uruchomienie dev
npm run dev

# 3. Build produkcyjny
npm run build
```

## 🔧 Konfiguracja Supabase

### Tworzenie tabel

Wejdź w [SQL Editor](https://smfplvmqzqhjcnqsjhyp.supabase.co/project/_/sql) i uruchom kod z `supabase-setup.sql`:

```sql
-- Tabela items (przedmioty)
CREATE TABLE items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'available',
  latitude NUMERIC,
  longitude NUMERIC,
  contact TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela messages (wiadomości)
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  itemId UUID REFERENCES items(id) ON DELETE CASCADE,
  sender TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Włącz RLS (zabezpieczenia)
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Polityki dostępu
CREATE POLICY "Public read items" ON items FOR SELECT USING (true);
CREATE POLICY "Public insert items" ON items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update items" ON items FOR UPDATE USING (true);
CREATE POLICY "Public delete items" ON items FOR DELETE USING (true);

CREATE POLICY "Public read messages" ON messages FOR SELECT USING (true);
CREATE POLICY "Public insert messages" ON messages FOR INSERT WITH CHECK (true);
```

###Zmienne środowiskowe

Utwórz plik `.env`:

```env
VITE_SUPABASE_URL=https://twoj-projekt.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=twoj-anon-key
```

## 📁 Struktura projektu

```
smieciarka-app/
├── src/
│   ├── App.jsx          # Główny komponent
│   ├── main.jsx         # Entry point
│   ├── db.js           # Operacje na bazie
│   ├── index.css       # Style globalne
│   ├── components/
│   │   ├── MapView.jsx     # Mapa Leaflet
│   │   ├── ItemList.jsx    # Lista przedmiotów
│   │   ├── ItemForm.jsx    # Formularz dodawania
│   │   ├── Chat.jsx        # Czat
│   │   ├── Loading.jsx    # Ładowanie
│   │   └── Toast.jsx      # Powiadomienia
│   └── utils/
│       ├── supabase.ts # Klient Supabase
│       └── geolocation.js # GPS
├── supabase-setup.sql   # SQL do Supabase
├── SETUP.md            # Szczegółowa instrukcja
├── package.json
└── vite.config.js
```

## 🎨 Kolory

| Kolor | Hex | Zastosowanie |
|-------|-----|--------------|
| Primary (zielony) | #10B981 | Nagłówek, przyciski |
| Secondary (niebieski) | #3B82F6 | Czat, linki |
| Accent (pomarańczowy) | #F59E0B | Oznaczenia |

## 📱 Mobilny design

Aplikacja jest w pełni responsywna:
- Tryb desktop: lista po lewej, mapa po prawej
- Tryb mobile: lista ukryta, mapa na cały ekran

## 📄 Licencja

MIT License

---

**Autor:** Natalia Saja  
**Projekt:** dla przedmiotu Architektura Biznesowa SaaS