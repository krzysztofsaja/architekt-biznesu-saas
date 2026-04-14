-- Smieciarka App Database Schema
-- Uruchom w PostgreSQL (np. w pgAdmin lub przez psql)

-- Tabela: items (przedmioty)
CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  address VARCHAR(255),
  status VARCHAR(50) DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'taken')),
  contact VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela: messages (wiadomości)
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  sender VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indeksy dla wydajności
CREATE INDEX IF NOT EXISTS idx_items_status ON items(status);
CREATE INDEX IF NOT EXISTS idx_items_created ON items(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_item ON messages(item_id);

-- Przykładowe dane (do testowania)
-- INSERT INTO items (title, description, latitude, longitude, contact) 
-- VALUES ('Stara Mikrofalówka', 'Działa, nowy sprzęt po remoncie', 52.2297, 21.0122, '123456789');