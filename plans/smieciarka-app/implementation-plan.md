# Plan Implementacji: Smieciarka App

## Faza 1: Setup Projektu (1 dzień)

### 1.1 Inicjalizacja
- [ ] Utwórz projekt Vite (`npm create vite@latest smieciarka-app -- --template vanilla`)
- [ ] Zainstaluj zależności: `dexie`, `leaflet`, `tailwindcss`, `postcss`, `autoprefixer`
- [ ] Skonfiguruj Tailwind CSS
- [ ] Skonfiguruj Vite

### 1.2 Struktura
- [ ] Utwórz katalogi: `src/api`, `src/components`, `src/utils`, `public`
- [ ] Skonfiguruj Dexie.js w `src/db.js`
- [ ] Skonfiguruj Leaflet w `src/map.js`
- [ ] Dodaj podstawowy HTML w `index.html`

---

## Faza 2: Baza Danych (1 dzień)

### 2.1 Model Danych
- [ ] Zdefiniuj schema dla tabeli `items`
- [ ] Zdefiniuj schema dla tabeli `messages`
- [ ] Dodaj indeksy: `status`, `latitude`, `longitude`, `createdAt`

### 2.2 CRUD API
- [ ] Funkcja `addItem(item)` - dodaj ogłoszenie
- [ ] Funkcja `getItems()` - pobierz wszystkie
- [ ] Funkcja `getItemById(id)` - pobierz jedno
- [ ] Funkcja `updateItem(id, data)` - aktualizuj
- [ ] Funkcja `deleteItem(id)` - usuń
- [ ] Funkcja `getItemsByStatus(status)` - filtrowanie

---

## Faza 3: Mapa + GPS (2 dni)

### 3.1 Mapa Leaflet
- [ ] Zainicjalizuj mapę na stronie głównej
- [ ] Dodaj warstwę OpenStreetMap
- [ ] Obsługa zoom i lokalizacji użytkownika

### 3.2 Geolokalizacja
- [ ] Funkcja pobierania GPS (`navigator.geolocation`)
- [ ] Obsługa błędów (brak pozwolenia, brak GPS)
- [ ] Auto-ustawienie widoku mapy na lokalizacji użytkownika

### 3.3 Pinezki
- [ ] Dodaj pinezkę dla każdego przedmiotu z bazy
- [ ] Ikony pinezek w zależności od statusu (zielony/czerwony)
- [ ] Kliknięcie pinezki = otwarcie szczegółów

---

## Faza 4: Dodawanie Przedmiotów (2 dni)

### 4.1 Formularz
- [ ] formularz HTML: tytuł, opis, lokalizacja
- [ ] Walidacja pól (wymagane: tytuł, współrzędne)
- [ ] Przycisk "Dodaj przedmiot" w UI

### 4.2 Zdjęcia
- [ ] Integracja z kamerą (`navigator.mediaDevices`)
- [ ] Obsługa Gallery (wybór z dysku)
- [ ] Kompresja zdjęć przed zapisem (max 1MB)
- [ ] Podgląd zdjęcia przed wysłaniem

### 4.3 Zapis
- [ ] Zapis do IndexedDB (Dexie)
- [ ] Automatyczne pobranie GPS przy dodawaniu
- [ ] Potwierdzenie zapisu (toast/notyfikacja)
- [ ] Odświeżenie mapy po zapisie

---

## Faza 5: Szczegóły Przedmiotu (1 dzień)

### 5.1 Modal/Szczegóły
- [ ] Widok po kliknięciu pinezki
- [ ] Wyświetl zdjęcie, tytuł, opis
- [ ] Wyświetl lokalizację na miniaturze mapy

### 5.2 Akcje
- [ ] Przycisk "Rezerwuj" → zmiana statusu na `reserved`
- [ ] Przycisk "Odebrane" → zmiana statusu na `taken`
- [ ] Przycisk "Anuluj" → powrót do `available`

### 5.3 Kontakt
- [ ] Wyświetl numer telefonu
- [ ] Przycisk "Zadzwoń" (`tel:`)
- [ ] Przycisk "Kopiuj numer"

---

## Faza 6: Prosty Czat (1-2 dni)

### 6.1 UI Czatu
- [ ] Modal/sekcja czatu przy przedmiocie
- [ ] Lista wiadomości dla przedmiotu
- [ ] Input + przycisk "Wyślij"

### 6.2 Wiadomości
- [ ] Zapis wiadomości do tabeli `messages`
- [ ] Odświeżanie listy po wysłaniu
- [ ] Sortowanie od najnowszych

---

## Faza 7: Lista Przedmiotów (1 dzień)

### 7.1 Widok Listy
- [ ] Lista obok mapy (sidebar)
- [ ] Sortowanie: najnowsze / najbliższe
- [ ] Filtrowanie po statusie

### 7.2 Szczegóły
- [ ] Miniaturka zdjęcia
- [ ] Tytuł, odległość, status
- [ ] Klik = przejście do szczegółów

---

## Faza 8: Polish & Testowanie (1-2 dni)

### 8.1 UI/UX
- [ ] Responsywność (mobile-first)
- [ ] Loading states (spinners)
- [ ] Error handling (toasty)
- [ ] Puste stany (empty states)

### 8.2Offline
- [ ] Service Worker (PWA basics)
- [ ] Cache zasobów statycznych

### 8.3 Testy
- [ ] Testy manualne na telefonie
- [ ] Testy w Chrome DevTools
- [ ] Debug błędów IndexedDB

---

## Podsumowanie Czasowe

| Faza | Zadania | Czas |
|------|---------|------|
| 1 | Setup | 1 dzień |
| 2 | Baza danych | 1 dzień |
| 3 | Mapa + GPS | 2 dni |
| 4 | Dodawanie | 2 dni |
| 5 | Szczegóły | 1 dzień |
| 6 | Czat | 1-2 dni |
| 7 | Lista | 1 dzień |
| 8 | Polish | 1-2 dni |
| **Razem** | | **10-12 dni** |

---

## Priorytet MVP (v1.0)

### Musi być (P0)
1. ✅ Mapa z pinezkami
2. ✅ Dodawanie przedmiotu (zdjęcie + GPS + opis)
3. ✅ Wyświetlanie przedmiotów na mapie
4. ✅ Statusy (available/reserved/taken)

### Ważne (P1)
5. ⬜ Lista przedmiotów obok mapy
6. ⬜ Szczegóły przedmiotu
7. ⬜ Prosty czat

### Nice to have (P2)
8. ⬜ Filtr po statusie
9. ⬜ Sortowanie
10. ⬜ PWA/Offline

---

## Pierwszy Commit (Checklist)

Zanim zaczniesz kodować, upewnij się że:
- [ ] Masz Node.js 18+ zainstalowane
- [ ] Utworzyłeś katalog projektu
- [ ] Masz dostęp do terminala
- [ ] Masz VS Code lub ulubiony edytor
- [ ] Rozumiesz jak działa GPS w przeglądarce

---

## START (React)

```bash
npm create vite@latest smieciarka-app -- --template react
cd smieciarka-app
npm install dexie leaflet tailwindcss postcss autoprefixer
npx tailwindcss init -p
# Dodaj plugin react do vite.config.js
# ... i działaj!
```