# PLAN_item_list.md

## 1. Cel
Wyświetlić listę dostępnych przedmiotów w formacie karty/wiersza z możliwością filtrowania, sortowania i przeszukiwania. Celem jest zapewnienie szybkiego dostępu do przedmiotów bez potrzeby interakcji z mapą.

## 2. Zakres

**Wchodzi w zakres:**
- Lista wszystkich dostępnych przedmiotów (default sorterred by newest)
- Widok karty (card view) z: zdjęcie, tytuł, kategoria, lokalizacja (distance), data
- Filtrowanie po kategorii (checkbox/toggle)
- Filtrowanie po odległości (slider: 1-50km)
- Sortowanie: newest, oldest, nearest, furthest
- Wyszukiwanie po tytule/opisie (search box)
- Paginacja lub infinite scroll
- Responsywność (mobile: lista full width)

**Nie wchodzi w zakres:**
- Filtrowanie po statusie (dostępne/zarezerwowane – tylko available)
- Zaawansowane filtry (cena, materiał itp.)
- Saved searches / favorite filters
- Sortowanie po ratings (osobny plan)

## 3. Wymagania funkcjonalne

- [ ] Lista wyświetla wszystkie przedmioty w formie kart
- [ ] Każda karta zawiera: zdjęcie, tytuł, kategoria, distance, data dodania
- [ ] Kliknięcie karty otwiera ItemDetails
- [ ] Search box filtruje przedmioty po tytule
- [ ] Kategoria filter – checkbox dla każdej kategorii
- [ ] Odległość filter – slider 1-50km (default 50km = all)
- [ ] Sortowanie dropdown: newest, oldest, nearest
- [ ] Filtry są kombinowalne (kategoria AND odległość AND search)
- [ ] Licznik wyników (np. "10 przedmiotów")
- [ ] Brak wyników – show message "Brak przedmiotów pasujących do filtrów"
- [ ] Paginacja/infinite scroll (12 itemów per page)

## 4. Wymagania niefunkcjonalne

- **Wydajność:**
  - Lista ładuje się < 1s
  - Filtrowanie/sortowanie jest instant (< 100ms)
  - Scroll jest smooth (60fps)

- **UX:**
  - Filtry są intuicyjne i jasne
  - Wczytywaney wyniki aktualizują się w real-time
  - Sticky header z search+filters

- **Dostępność:**
  - Keyboard navigation (Tab, Enter)
  - ARIA labels dla filtrów

## 5. Kontekst techniczny

### Komponenty zaangażowane:
- `ItemList.jsx` – główny komponent
- `ItemCard.jsx` – pojedyncza karta przedmiotu
- `utils/supabase.js` – fetchItems() z filtrowaniem
- `utils/geolocation.js` – calculateDistance()

### API zewnętrzne:
- Supabase (query z WHERE/ORDER BY)
- Geolocation API (user location)

### Dane:
```sql
SELECT id, title, description, category, latitude, longitude, 
       image_url, creator_id, created_at
FROM items
WHERE status = 'available'
  AND category IN (selectedCategories OR all)
  AND distance(latitude, longitude, userLat, userLon) <= maxDistance
  AND (title ILIKE '%search%' OR description ILIKE '%search%')
ORDER BY created_at DESC
LIMIT 12 OFFSET offset
```

### State:
```javascript
{
  filters: {
    search: "",
    categories: [],
    maxDistance: 50,
    sortBy: "newest"
  },
  items: [],
  loading: false,
  page: 1,
  hasMore: true
}
```

## 6. Kroki implementacji

1. **Utwórz ItemList.jsx**
   - State: filters, items, loading, page
   - Effect: fetchItems() on filter change
   - Render: FilterBar + ItemGrid/ItemCards

2. **Utwórz ItemCard.jsx**
   - Prop: item object
   - Wyświetl: image, title, category, distance, date
   - onClick: navigate to ItemDetails

3. **FilterBar component**
   - Search input (onChange handler)
   - Category filter (checkbox list)
   - Distance slider (min/max)
   - Sort dropdown

4. **Search functionality**
   - debounce(handleSearch, 300ms)
   - Filter items where title/description contains search term
   - Case-insensitive

5. **Distance calculation**
   - Import calculateDistance() from utils
   - Haversine formula: distance(lat1, lon1, lat2, lon2)
   - Filter items by distance <= maxDistance

6. **Sortowanie**
   - newest: ORDER BY created_at DESC
   - oldest: ORDER BY created_at ASC
   - nearest: ORDER BY distance ASC
   - furthest: ORDER BY distance DESC

7. **Paginacja**
   - Button "Załaduj więcej" OR infinite scroll on scroll
   - LIMIT 12 OFFSET (page-1)*12
   - hasMore flag: if returned < 12, then no more

8. **Kombinowanie filtrów**
   - Wszystkie filtry są AND'owane
   - onChange na każdy filtr: reset page to 1, fetch new items

9. **UI/UX**
   - Sticky header (search + filters stay on top)
   - Grid layout (responsive: 1 col mobile, 2 tablet, 3 desktop)
   - Loading spinner while fetching
   - Empty state message

10. **Performance**
    - Memoize ItemCard (React.memo)
    - Virtualize list jeśli > 100 itemów (react-window)

## 7. Kryteria akceptacji

- [ ] Lista wyświetla się z przedmiotami
- [ ] Search box filtruje przedmioty w real-time
- [ ] Kategoria filter działa (checkbox)
- [ ] Odległość filter działa (slider)
- [ ] Sortowanie zmienia kolejność
- [ ] Filtry są kombinowalne
- [ ] Licznik wyników jest dokładny
- [ ] Brak wyników: show message
- [ ] Paginacja działa (load more button)
- [ ] Scroll jest smooth (60fps)
- [ ] Kliknięcie karty otwiera ItemDetails
- [ ] Responsywny na mobile

## 8. Testy

### Testy manualne:
1. Załaduj aplikację – lista powinna mieć przedmioty
2. Wpisz w search – przedmioty powinny się filtrować
3. Zaznacz kategorię – lista powinna zmienić się
4. Przesuń slider odległości – lista powinna się zmienić
5. Zmień sortowanie – porządek powinien się zmienić
6. Kombinuj filtry (kategoria + search) – powinny działać razem
7. Wpisz search który nic nie zwraca – show message
8. Kliknij "Załaduj więcej" – powinny pojawić się następne 12
9. Testuj na mobile – powinno być 1 kolumna

### Testy jednostkowe:
```javascript
// ItemList.test.js
- handleSearch aktualizuje search state
- handleCategoryChange aktualizuje filters
- handleDistanceChange aktualizuje filters
- fetchItems jest wywoływany na change
- Items renderują się z poprawnym sortem

// ItemCard.test.js
- ItemCard renderuje title, category, distance
- onClick Card -> navigate
```

### Testy integracyjne:
```javascript
// ItemList.integration.test.js
- Search + kategoria filter razem
- Distance filter + sort razem
- Paginacja: load more -> więcej itemów
```

### Edge case'i:
- Search: specjalne znaki, unicode
- 0 wyników – show message
- Bardzo szybkie zmiany filtrów – debounce?
- Scroll na mobile – infinite scroll smooth?
- Kategorii bez itemów – show empty
