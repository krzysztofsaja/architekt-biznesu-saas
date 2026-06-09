# 🗑️ Smieciarka App

Aplikacja do oddawania niepotrzebnych przedmiotów w sąsiedztwie. Znajdź i oddaj rzeczy, które już nie są Ci potrzebne!

## 📘 Spec Driven Development (SDD)

Projekt **smieciarka-app** jest realizowany przy użyciu metodyki **Spec Driven Development**. Oznacza to, że:

- ✅ **Specyfikacja poprzedza kod** – każda funkcjonalność ma jawny plan
- ✅ **Repozytorium = Źródło Prawdy** – wszystkie decyzje są dokumentowane
- ✅ **AI-First Development** – plany są generowane dla agentów AI (Kilo CLI)
- ✅ **Audytowalność** – każda zmiana ma powiązaną dokumentację
- ✅ **Deployment live** – aplikacja działa na Vercel: https://smieciarka-app.vercel.app

### 📂 Struktura SDD

```
/docs
  /architecture      – decyzje architektoniczne (ADR), system overview
  /business          – wizja produktu, user stories
  /tech              – stos technologiczny, konwencje
  /plans             – PLANY funkcjonalności (PLAN_*.md) ← CORE
  /roles             – wytyczne dla ról: Developer, Architect, Tester
    /developer       – standardy kodu, best practices
    /architect       – decyzje systemu, C4 diagramy
    /tester          – strategie testowania
```

### 🎯 Lista planów (11/11 ✅)

| Plan | Opis | Status |
|------|------|--------|
| [PLAN_user_authentication.md](docs/plans/PLAN_user_authentication.md) | Logowanie & rejestracja | ✅ |
| [PLAN_add_item.md](docs/plans/PLAN_add_item.md) | Dodawanie przedmiotów | ✅ |
| [PLAN_map_display.md](docs/plans/PLAN_map_display.md) | Mapa interaktywna | ✅ |
| [PLAN_item_list.md](docs/plans/PLAN_item_list.md) | Lista przedmiotów + filtry | ✅ |
| [PLAN_chat_messaging.md](docs/plans/PLAN_chat_messaging.md) | Chat 1:1 | ✅ |
| [PLAN_user_reviews.md](docs/plans/PLAN_user_reviews.md) | Oceny & opinie | ✅ |
| [PLAN_item_reporting.md](docs/plans/PLAN_item_reporting.md) | Zgłaszanie przedmiotów | ✅ |
| [PLAN_offline_mode.md](docs/plans/PLAN_offline_mode.md) | Tryb offline (Dexie) | ✅ |
| [PLAN_data_synchronization.md](docs/plans/PLAN_data_synchronization.md) | Synchronizacja real-time | ✅ |
| [PLAN_notifications.md](docs/plans/PLAN_notifications.md) | Powiadomienia | ✅ |
| [PLAN_publish_application.md](docs/plans/PLAN_publish_application.md) | Publikacja na Vercel | ✅ |

**👉 Pełną listę planów znajdziesz w:** [docs/plans/implemented_plans.md](docs/plans/implemented_plans.md)

---

## 🤖 Kilo CLI – Workflow AI

Projekt jest skonfigurowany do pracy z **Kilo CLI** – agentem AI do automatyzacji pracy projektowej.

### 1️⃣ Workflow: PLAN

Generowanie specyfikacji dla nowej funkcjonalności:

```bash
kilo run WF_Plan_Feature --project-dir "c:\Users\natal\Desktop\smieciarka-app\smieciarka-app"
```

**Wejście:** Opis funkcjonalności  
**Wyjście:** Kompletny plik `/docs/plans/PLAN_*.md`

### 2️⃣ Workflow: IMPLEMENT

Implementacja funkcjonalności na bazie planu:

```bash
kilo run WF_Implement_Feature --plan "PLAN_add_item.md"
```

**Wejście:** Plik `PLAN_*.md`  
**Wyjście:** 
- Kod (src/components/*.jsx, src/utils/*.js)
- Testy (src/__tests__/*.test.js)
- Aktualizacja: `implemented_plans.md` + `implemented_features.md`

### 3️⃣ Instrukcje dla Kilo CLI

Wszystkie plany znajdują się w `/docs/plans/`:
- Każdy plik = jedna mała funkcjonalność
- Struktura: Cel, Zakres, Wymagania, Kontekst techniczny, Kroki, Kryteria, Testy
- Gotowe do automatyzacji ✅

**Projekt jest widoczny dla agenta Kilo CLI –** wszystkie plany, rola Developer, Architect, Tester są dostępne w katalogu `/docs`.

---

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

### Zmienne środowiskowe

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
├── docs/
│   ├── architecture/    # Decyzje (ADR), system overview
│   ├── business/        # Wizja, user stories
│   ├── plans/           # PLANY funkcjonalności (SDD)
│   ├── roles/           # Developer, Architect, Tester
│   └── tech/            # Tech stack, konwencje
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

## 🌐 Wersja online

Aplikacja została wdrożona na platformie Vercel i jest dostępna pod adresem:
**https://smieciarka-app.vercel.app**

## 📂 Repozytorium GitHub

Kod źródłowy projektu jest dostępny na GitHubie: https://github.com/krzysztofsaja/architekt-biznesu-saas

## 📄 Licencja

MIT License

---

## 👥 Role projektowe

- 👨‍💼 **Product Owner:** [docs/roles/product_owner/responsibilities.md](docs/roles/product_owner/responsibilities.md)
- 👨‍🎨 **UX/UI Designer:** [docs/roles/ux_ui/guidelines.md](docs/roles/ux_ui/guidelines.md)
- 👨‍💻 **Developer:** [docs/roles/developer/standards.md](docs/roles/developer/standards.md)
- 🏗️ **Architect:** [docs/roles/architect/decisions.md](docs/roles/architect/decisions.md)
- 🧪 **Tester:** [docs/roles/tester/strategy.md](docs/roles/tester/strategy.md)

---

## 📚 Dokumentacja dodatkowa

- **Wizja produktu:** [docs/business/product_vision.md](docs/business/product_vision.md)
- **System Overview:** [docs/architecture/system_overview.md](docs/architecture/system_overview.md)
- **Tech Stack:** [docs/tech/stack.md](docs/tech/stack.md)
- **Decyzje architektoniczne:** [docs/architecture/adr_001.md](docs/architecture/adr_001.md), [adr_002.md](docs/architecture/adr_002.md)

---

**Autor:** Natalia Okołot  
**Projekt:** Architektura Biznesowa SaaS  
**Metodologia:** Spec Driven Development (SDD)