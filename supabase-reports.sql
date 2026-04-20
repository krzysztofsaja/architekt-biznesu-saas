-- Tabela zgłoszeń
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id UUID,
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Włącz RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Polityki
CREATE POLICY "Public can insert reports" ON reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can select reports" ON reports FOR SELECT USING (true);