# Plan Wdrożenia: Smieciarka App

## Cel
Aplikacja ma działać online - inni użytkownicy widzą te same przedmioty.

## Architektura Docelowa

```
┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │
│  (React)   │     │  (Node.js)  │
│            │     │   API REST  │
└─────────────┘     └──────┬─────┘
                           │
                    ┌──────┴──────┐
                    │  Baza danych │
                    │  (PostgreSQL)│
                    └─────────────┘
```

---

## Warstwy Aplikacji

### Warstwa 1: Frontend (teraz)
- React + Vite
- Leaflet.js (mapy)
- Tailwind CSS (style)

### Warstwa 2: Backend API (DO STWORZENIA)
- Node.js + Express
- endpoints: `/api/items`, `/api/messages`

### Warstwa 3: Baza danych (PostgreSQL)
- Heroku Postgres / Supabase / Railway

---

## Krok po kroku

### Faza 1: Przygotowanie Backend (3 dni)

#### 1.1 Struktura projektu
```
smieciarka-app/
├── client/          # React (teraźniejszy kod)
├── server/           # Node.js API (NOWE)
│   ├── index.js     # Express server
│   ├── routes/
│   │   ├── items.js
│   │   └── messages.js
│   ├── db/
│   │   └── index.js # Połączenie do PostgreSQL
│   └── .env         # Zmienne środowiskowe
├── package.json     # główne
└── README.md
```

#### 1.2 API Endpoints

| Metoda | Endpoint | Opis |
|-------|----------|------|
| GET | `/api/items` | Pobierz wszystkie przedmioty |
| GET | `/api/items/:id` | Pobierz jeden przedmiot |
| POST | `/api/items` | Dodaj przedmiot |
| PUT | `/api/items/:id` | Zmień przedmiot |
| DELETE | `/api/items/:id` | Usuń przedmiot |
| POST | `/api/messages` | Wyślij wiadomość |
| GET | `/api/messages/:itemId` | Pobierz wiadomości dla przedmiotu |

#### 1.3 Schemat bazy danych

```sql
-- Tabela: items (przedmioty)
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  address VARCHAR(255),
  status VARCHAR(50) DEFAULT 'available',
  contact VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela: messages (wiadomości)
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  item_id INTEGER REFERENCES items(id),
  sender VARCHAR(100),
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Faza 2: Produkcja (2 dni)

#### 2.1 Hosting Backend
| Usługa | Darmo | Uwagi |
|--------|------|-------|
| Render | ✓ | Polecana |
| Railway | ✓ | $5/msc |
| Fly.io | ✓ | |
| Heroku | ✓ (odin) | |

#### 2.2 Hosting Frontend
| Usługa | Darmo | Uwagi |
|--------|------|-------|
| Vercel | ✓ | Polecana |
| Netlify | ✓ | |
| GitHub Pages | ✓ | |

### Faza 3: Łącznie (1 dzień)

#### 3.1 Zmiana frontendu
- Usunąć Dexie.js
- Zmienić na `fetch()` do API
- Environment variables dla URL API

#### 3.2 Konfiguracja CORS
- Zezwolić na połączenia z domeny frontendu

---

## Harmonogram

| Dzień | Zadanie |
|-------|---------|
| 1 | Utworzenie struktury `server/` |
| 2 | API items (CRUD) |
| 3 | API messages |
| 4 | PostgreSQL na Render/Railway |
| 5 | Deploy backend |
| 6 | Deploy frontend na Vercel |
| 7 | Testy i poprawki |

---

## Komendy Startowe

```bash
# 1. Utwórz folder server
cd smieciarka-app
mkdir server
cd server
npm init -y

# 2. Zainstaluj zależności
npm install express cors dotenv pg

# 3. Uruchom lokalnie
node index.js
```

---

## Przykład: server/index.js

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.use(cors());
app.use(express.json());

// GET all items
app.get('/api/items', async (req, res) => {
  const result = await pool.query('SELECT * FROM items ORDER BY created_at DESC');
  res.json(result.rows);
});

// POST item
app.post('/api/items', async (req, res) => {
  const { title, description, image, latitude, longitude, address, contact } = req.body;
  const result = await pool.query(
    'INSERT INTO items (title, description, image, latitude, longitude, address, contact) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
    [title, description, image, latitude, longitude, address, contact]
  );
  res.json(result.rows[0]);
});

// PUT item status
app.put('/api/items/:id', async (req, res) => {
  const { status } = req.body;
  const result = await pool.query(
    'UPDATE items SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
    [status, req.params.id]
  );
  res.json(result.rows[0]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## Environment Variables (.env)

```
DATABASE_URL=postgres://user:pass@host:5432/dbname
PORT=3000
```

---

## Koszty (szacunkowo)

| Usługa | Miesięcznie |
|--------|------------|
| Render (PostgreSQL) | $0 |
| Vercel (Frontend) | $0 |
| **SUMA** | **$0** |

---

## Następny krok

Potwierdź i zaczynamy od Fazy 1:
1. Utworzenie struktury `server/`
2. Backend API Node.js + Express