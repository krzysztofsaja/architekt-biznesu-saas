-- Konfiguracja tabel w Supabase
-- Wejdź w: https://smfplvmqzqhjcnqsjhyp.supabase.co/project/_/sql
-- Wklej i kliknij Run

-- Tabela items (przedmioty)
CREATE TABLE IF NOT EXISTS items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'inne',
  status TEXT DEFAULT 'available',
  latitude NUMERIC,
  longitude NUMERIC,
  contact TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela profiles (profil)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY,
  username TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela messages (wiadomości)
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  itemId UUID REFERENCES items(id) ON DELETE CASCADE,
  sender TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Włącz RLS
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Polityki dla items
CREATE POLICY "Public read items" ON items FOR SELECT USING (true);
CREATE POLICY "Public insert items" ON items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update items" ON items FOR UPDATE USING (true);
CREATE POLICY "Public delete items" ON items FOR DELETE USING (true);

-- Polityki dla messages
CREATE POLICY "Public read messages" ON messages FOR SELECT USING (true);
CREATE POLICY "Public insert messages" ON messages FOR INSERT WITH CHECK (true);

-- Przykładowe dane
INSERT INTO items (title, description, status, latitude, longitude, contact) VALUES
('Stary wózek dziecięcy', 'Kompletny wózek marki Britax, stan dobry', 'available', 52.2297, 21.0122, 'kontakt@email.pl'),
('Krzesło biurowe', 'Ergonomiczne krzesło z podłokietnikami', 'available', 52.4064, 16.9253, 'info@firma.pl'),
('Lodówka', 'Mała lodówka Ariston, sprawna', 'available', 52.2328, 21.0181, 'tel:123456789');