# PLAN_add_item.md

## 1. Cel
Umożliwić użytkownikowi łatwe dodawanie nowych przedmiotów do oddania poprzez formularz z polami opisującymi przedmiot, jego lokalizację, oraz opcjonalne zdjęcia. Celem jest zapewnienie intuicyjnego procesu, który zachęci użytkowników do dzielenia się rzeczami.

## 2. Zakres

**Wchodzi w zakres:**
- Formularz z polami: tytuł, opis, kategoria, lokalizacja (geolokalizacja)
- Możliwość dodania zdjęcia (1 lub więcej)
- Walidacja formularza
- Zapisanie przedmiotu w Supabase
- Potwierdzenie dodania przedmiotu
- Historia dodanych przedmiotów użytkownika

**Nie wchodzi w zakres:**
- Edytowanie już dodanego przedmiotu (osobny plan)
- Usuwanie przedmiotu (osobny plan)
- Zaawansowana obróbka zdjęć (crop, filter)
- Kompresja zdjęć na klienckie (używamy Supabase Storage)
- Kategoryzacja zaawansowana (taksonomia)

## 3. Wymagania funkcjonalne

- [ ] Formularz ItemForm ma pola: tytuł, opis, kategoria, lokalizacja, zdjęcie
- [ ] Tytuł jest obowiązkowy (min 3 znaki, max 100)
- [ ] Opis jest obowiązkowy (min 10 znaków, max 500)
- [ ] Kategoria ma z góry zdefiniowane opcje (dropdown)
- [ ] Lokalizacja może być: manual (wpisana) lub geolokalizacja (GPS)
- [ ] Użytkownik może dodać zdjęcie (upload via input file)
- [ ] Zdjęcie jest przesyłane do Supabase Storage
- [ ] Po wysłaniu formularza przedmiot pojawia się w mapie i liście
- [ ] Użytkownik widzi potwierdzenie sukcesu (Toast)
- [ ] Przedmiot ma status "available" po utworzeniu
- [ ] Przedmiot jest powiązany z użytkownikiem (creator_id)

## 4. Wymagania niefunkcjonalne

- **Wydajność:**
  - Formularz ładuje się < 1s
  - Upload zdjęcia max 5MB bez blokady UI (async upload)
  - Po wysłaniu formularz resetuje się na skutek

- **UX:**
  - Walidacja w real-time na polach obowiązkowych
  - Feedback wizualny: przycisk disabled gdy form niepełny
  - Loading state podczas uploadu zdjęcia
  - Brak CAPTCHA (aby nie odstraszać użytkowników)

- **Bezpieczeństwo:**
  - Zdjęcia muszą być skanowane na malware (może być np. Supabase virus scanning)
  - Tylko zalogowani użytkownicy mogą dodawać
  - Rozmiar pliku max 5MB
  - Obsługiwane formaty: JPG, PNG, WebP

- **Dostępność:**
  - Formularz powinien być dostępny na mobile i desktop
  - Geolokalizacja powinna być optional (fallback: manual input)

## 5. Kontekst techniczny

### Komponenty zaangażowane:
- `ItemForm.jsx` – główny komponent formularza
- `MapView.jsx` – wyświetlanie nowo dodanego przedmiotu na mapie
- `ItemList.jsx` – aktualizacja listy
- `utils/supabase.js` – funkcje do zapisu w bazie
- `utils/geolocation.js` – pobieranie GPS

### API zewnętrzne:
- Geolocation API (`navigator.geolocation`)
- Supabase Storage (upload pliku)
- Supabase Database (`items` table)

### Dane (struktura w bazie):
```sql
INSERT INTO items (
  id, title, description, category, latitude, longitude, 
  contact, creator_id, image_url, status, created_at, updated_at
) VALUES (...)
```

### Kategorie (stałe):
```javascript
CATEGORIES = [
  "Meble",
  "Elektronika",
  "Ubrania",
  "Książki",
  "Sprzęt sportowy",
  "Kuchnia",
  "Inne"
]
```

## 6. Kroki implementacji

1. **Utwórz strukturę ItemForm.jsx**
   - Import React, form hooks
   - State: formData, loading, error, image
   - Funkcje: handleChange, handleImageChange, handleSubmit

2. **Dodaj pola formularza**
   - Input text: tytuł (required, 3-100 chars)
   - Textarea: opis (required, 10-500 chars)
   - Select: kategoria (z CATEGORIES)
   - Input text: lokalizacja manual (alternative)
   - Button: "Użyj mojej lokalizacji" (GPS)

3. **Implementuj geolokalizację**
   - Button "Użyj mojej lokalizacji"
   - Callback geolocation.getCurrentPosition()
   - Update lat/lon w formData
   - Error handling (brak uprawnień, brak sygnału GPS)

4. **Implementuj upload zdjęcia**
   - Input type="file" accept="image/*"
   - onChange: handleImageChange (validate size, format)
   - Preview zdjęcia (img tag z data URL)
   - Upload do Supabase Storage przy submit

5. **Walidacja formularza**
   - Real-time validation na blur
   - Disable submit button gdy form invalid
   - Pokaż error messages dla każdego pola

6. **Submit formularza**
   - Upload zdjęcia do Supabase Storage
   - Pobierz public URL z Storage
   - Zapisz przedmiot do tabeli `items` (z image_url)
   - Update MapView i ItemList (refresh danych)
   - Pokaż Toast success
   - Reset formularza

7. **Error handling**
   - Upload failed – show error toast
   - Geolocation denied – allow manual input
   - Network error – retry button

8. **UI Components**
   - Form wrapper (container, spacing)
   - Label + Input pair (consistency)
   - Error message (red text below field)
   - Loading spinner (while uploading)
   - Success toast (Smieciarka app header)

## 7. Kryteria akceptacji

- [ ] Formularz wyświetla wszystkie wymagane pola
- [ ] Tytuł: walidacja 3-100 znaków, error message jeśli nie spełnia
- [ ] Opis: walidacja 10-500 znaków
- [ ] Kategoria: dropdown z predefiniowanymi opcjami
- [ ] Lokalizacja: można wpisać ręcznie lub użyć GPS
- [ ] Button "Użyj mojej lokalizacji" aktualizuje pole lokalizacji
- [ ] Upload zdjęcia: akceptuje JPG, PNG, WebP, odrzuca inne formaty
- [ ] Zdjęcie max 5MB, błąd jeśli większe
- [ ] Preview zdjęcia wyświetla się po wyborze
- [ ] Submit button jest disabled gdy form incomplete
- [ ] Po wysłaniu zdjęcie pojawia się na mapie i w liście
- [ ] Toast pokazuje potwierdzenie sukcesu
- [ ] Formularz się resetuje po pomyślnym submit
- [ ] Brak zdjęcia – przedmiot i tak się tworzy (opcjonalne)

## 8. Testy

### Testy manualne:
1. Zaloguj się do aplikacji
2. Otwórz formularz dodawania przedmiotu
3. Wpisz tytuł (test: za krótki, dobry, za długi)
4. Wpisz opis (test: za krótki, dobry, za długi)
5. Wybierz kategorię z dropdown
6. Wpisz lokalizację ręcznie
7. Kliknij "Użyj mojej lokalizacji" (zgódź się na GPS) – powinno zaktualizować
8. Wybierz zdjęcie (JPG, PNG)
9. Kliknij "Dodaj przedmiot"
10. Przedmiot powinien pojawić się na mapie
11. Testuj edge case: zdjęcie 6MB (powinien błąd)
12. Testuj: formularz bez zdjęcia (powinien się wysłać)

### Testy jednostkowe:
```javascript
// ItemForm.test.js
- Formularz renderuje wszystkie pola
- handleChange aktualizuje state
- handleImageChange validuje rozmiar (< 5MB)
- handleImageChange odrzuca złe formaty (.exe, .txt)
- Walidacja: tytuł < 3 znaki – error
- Walidacja: opis < 10 znaków – error
- Submit button disabled gdy form incomplete
- handleSubmit wywoła uploadImage i createItem
```

### Testy integracyjne:
```javascript
// ItemForm.integration.test.js
- Formularz -> Upload -> Database -> Map update
- Zdjęcie pojawia się w Supabase Storage
- Przedmiot pojawia się w tabeli items
- Nowy marker pojawia się na MapView
```

### Edge case'i:
- Upload offline – error handling
- Zdjęcie 4.9MB – powinno przejść
- Geolocation timeout (> 10s) – fallback do manual
- Brak permisji na GPS – pokaż info i allow manual
- Formularz wysłany 2x szybko – avoid duplicate inserts
