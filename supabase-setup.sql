-- Przejdź do: https://viqzsrmclimcnweioqym.supabase.co/project/_/sql
-- Wklej ten kod i kliknij "Run"

-- Tabela items (przedmioty)
CREATE TABLE IF NOT EXISTS items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'available',
  latitude NUMERIC,
  longitude NUMERIC,
  image TEXT,
  contact TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela messages (wiadomości czatu)
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  itemId UUID REFERENCES items(id) ON DELETE CASCADE,
  sender TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Włącz polityki RLS (zabezpieczenia)
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Polityki dla items - wszyscy mogą czytać i dodawać
CREATE POLICY "Wszyscy mogą czytać items" ON items FOR SELECT USING (true);
CREATE POLICY "Wszyscy mogą dodawać items" ON items FOR INSERT WITH CHECK (true);
CREATE POLICY "Wszyscy mogą aktualizować items" ON items FOR UPDATE USING (true);
CREATE POLICY "Wszyscy mogą usuwać items" ON items FOR DELETE USING (true);

-- Polityki dla messages
CREATE POLICY "Wszyscy mogą czytać wiadomości" ON messages FOR SELECT USING (true);
CREATE POLICY "Wszyscy mogą dodawać wiadomości" ON messages FOR INSERT WITH CHECK (true);

-- Włącz Realtime dla messages (opcjonalne)
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
