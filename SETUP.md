# Smieciarka App - Setup

## Wymagania
- Node.js 18+
- Konto Supabase

## Instalacja

```bash
npm install
```

## Konfiguracja Supabase

1. Utwórz projekt na https://supabase.com
2. Wejdź w SQL Editor i uruchom:

```sql
-- Tabela items
CREATE TABLE IF NOT EXISTS items (
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

-- Tabela messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  itemId UUID REFERENCES items(id) ON DELETE CASCADE,
  sender TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read items" ON items FOR SELECT USING (true);
CREATE POLICY "Public insert items" ON items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update items" ON items FOR UPDATE USING (true);
CREATE POLICY "Public delete items" ON items FOR DELETE USING (true);

CREATE POLICY "Public read messages" ON messages FOR SELECT USING (true);
CREATE POLICY "Public insert messages" ON messages FOR INSERT WITH CHECK (true);
```

3. Skopiuj URL i Anon Key z Settings → API
4. Utwórz plik `.env`:

```
VITE_SUPABASE_URL=https://TWOJ_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=TWOJ_ANON_KEY
```

## Uruchomienie

```bash
npm run dev
```

## Budowanie

```bash
npm run build
```

## Tech Stack
- React + Vite
- Tailwind CSS
- Supabase
- Leaflet (mapa)
- Dexie (lokalna baza)