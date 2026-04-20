-- Autentykacja - uruchom w SQL Editor
-- https://smfplvmqzqhjcnqsjhyp.supabase.co/project/_/sql

-- Tabela profili użytkowników (łączy z auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT,
  avatar_url TEXT,
  phone TEXT,
  points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  items_added INTEGER DEFAULT 0,
  items_given INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Włącz RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Polityki
CREATE POLICY "Public profiles visible to everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Funkcja automatycznego tworzenia profilu po rejestracji
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, points, level)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'username', 0, 1);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Tabela zgłoszeń
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id UUID,
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert reports" ON reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can select reports" ON reports FOR SELECT USING (true);