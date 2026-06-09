# PLAN_map_display.md

## 1. Cel
Wyświetlać interaktywną mapę z markerami dla wszystkich dostępnych przedmiotów w lokalnej okolicy. Mapa ma umożliwić użytkownikowi przeglądanie przedmiotów geograficznie, przybliżanie/oddalanie oraz wyświetlanie szczegółów przedmiotu na kliknięciu markera.

## 2. Zakres

**Wchodzi w zakres:**
- Wyświetlanie mapy OpenStreetMap (Leaflet)
- Markery dla każdego przedmiotu
- Lokalizacja użytkownika (geolokalizacja)
- Zoom in/out na mapie
- Popup/tooltip na marker (tytuł, opis, kategoria)
- Kliknięcie markera = wyświetl szczegóły przedmiotu
- Responsywność (desktop, tablet, mobile)

**Nie wchodzi w zakres:**
- Drukowanie mapy
- Export mapy do pliku
- Filtrowanie po kategorii (osobny plan – lista)
- Heatmaps / density visualization
- Własne style markera (będziemy używać domyślne Leaflet)

## 3. Wymagania funkcjonalne

- [ ] Mapa załaduje się ze wszystkimi przedmiotami z bazy
- [ ] Każdy przedmiot ma marker na mapie (lat/lon)
- [ ] Marker pokazuje ikonę lokalizacji
- [ ] Kliknięcie markera pokazuje popup z: tytuł, opis (first 50 chars), kategoria, button "Szczegóły"
- [ ] Button "Szczegóły" otwiera ItemDetails view
- [ ] Lokalizacja użytkownika wyświetla się jako inny marker (niebieski)
- [ ] Mapa domyślnie centruje się na użytkowniku
- [ ] Użytkownik może: zoomować, pan (przeciągać), dobierać zoom domyślnie 13
- [ ] Gdy brak przedmiotów – wyświetl wiadomość "Brak przedmiotów w twojej okolicy"
- [ ] Mapa aktualizuje się w real-time gdy dodany nowy przedmiot

## 4. Wymagania niefunkcjonalne

- **Wydajność:**
  - Mapa renderuje się < 2s
  - 1000+ markerów powinno być obsługiwane (clustering)
  - Brak lag'ów przy zoomowaniu/panningu

- **UX:**
  - Responsywna na mobile (full width, swipe do pan)
  - Jasne markery, łatwe do zauważenia
  - Popup powinien być czytielny

- **Dostępność:**
  - Mapa powinna pracować bez JavaScript (fallback?)
  - Klawiatura: Tab do nawiązywania markerów, Enter do otwarcia

## 5. Kontekst techniczny

### Komponenty zaangażowane:
- `MapView.jsx` – główny komponent mapy
- `App.jsx` – layout (mapa po prawej stronie)
- `utils/supabase.js` – funkcja fetchItems()
- Leaflet.js + react-leaflet

### API zewnętrzne:
- OpenStreetMap (tiles)
- Supabase (pobieranie przedmiotów)
- Geolocation API

### Dane:
```sql
SELECT id, title, description, category, latitude, longitude, image_url
FROM items
WHERE status = 'available'
ORDER BY created_at DESC
```

### Biblioteki:
```json
{
  "leaflet": "^1.9.3",
  "react-leaflet": "^4.0.0",
  "leaflet.markercluster": "^1.5.0"
}
```

## 6. Kroki implementacji

1. **Instalacja bibliotek**
   ```bash
   npm install leaflet react-leaflet leaflet.markercluster
   npm install -D @types/leaflet
   ```

2. **Utwórz MapView.jsx**
   - Import: MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents
   - State: markers (przedmioty), userLocation, zoom
   - Effect: fetchItems() przy mount
   - Effect: setupGeolocation()

3. **Konfiguracja mapy**
   - MapContainer: center={userLocation}, zoom={13}
   - TileLayer: attribution, url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
   - Responsive: height: '100vh', width: '100%'

4. **Markery dla użytkownika**
   - Marker dla user location (blue, unique icon)
   - Popup z tekstem "Twoja lokalizacja"

5. **Markery dla przedmiotów**
   - Loop przez items array
   - Dla każdego: Marker z lat/lon
   - Popup z: tytuł, opis (truncated), kategoria
   - onClick: handleMarkerClick() → otwórz ItemDetails

6. **Marker Clustering** (dla wydajności)
   - Instalacja: leaflet.markercluster
   - Grupowanie markerów gdy zoom < 12
   - Klaster pokazuje liczbę przedmiotów

7. **Interaktywność**
   - useMapEvents: 'zoomend', 'moveend'
   - Na zoom change: aktualizuj state
   - Na moveend: może trigger fetch dla nowego viewport (lazy load)

8. **Real-time updates**
   - Supabase Realtime subscription na `items` table
   - Cuando dodany nowy item: add marker to map
   - Cuando deleted: remove marker

9. **Mobile responsiveness**
   - Kontrola touchowaniem (pan, pinch zoom)
   - Popup nie powinien wychodzić poza ekran

10. **Error handling**
    - Brak geolokalizacji – center na Warszawę (default)
    - Brak internetu – cached items (Dexie)
    - Brak przedmiotów – show message overlay

## 7. Kryteria akceptacji

- [ ] Mapa wyświetla się bez błędów
- [ ] Markery są widoczne dla wszystkich przedmiotów
- [ ] Marker użytkownika jest w innym kolorze (niebieski)
- [ ] Kliknięcie markera otwiera popup
- [ ] Popup zawiera: tytuł, opis, kategoria, button "Szczegóły"
- [ ] Button "Szczegóły" otwiera view z pełnymi informacjami
- [ ] Mapa responsywna na mobile (pełna szerokość, można pan/zoom)
- [ ] Zoom in/out działa gładko
- [ ] Gdy brak przedmiotów – wyświetla message
- [ ] Real-time: dodanie nowego przedmiotu pojawia się na mapie
- [ ] Przy pierwszym załadowaniu mapa centruje się na użytkowniku

## 8. Testy

### Testy manualne:
1. Otwórz aplikację – mapa powinna się załadować z markerami
2. Locatez użytkownika powinien być niebieski i centralnie
3. Kliknij na marker przedmiotu – pokaż popup
4. Popup powinien zawierać tytuł, opis, kategorię
5. Kliknij "Szczegóły" w popup – otwarcie ItemDetails
6. Testuj zoom: scroll mouse wheel / pinch na mobile
7. Testuj pan: przeciągnij mapę
8. Dodaj nowy przedmiot – powinien pojawić się na mapie
9. Odśwież stronę – przedmioty powinny się załadować z cache (jeśli offline)

### Testy jednostkowe:
```javascript
// MapView.test.js
- Mapa renderuje się
- Markery renderują się dla każdego przedmiotu
- onClick marker -> handleMarkerClick
- Zoom state updates na wheel event
- Geolocation sets userLocation
```

### Testy integracyjne:
```javascript
// MapView.integration.test.js
- Fetch items -> Markery renderują
- Real-time: dodanie item -> marker pojawia się
- ItemDetails otwiera się po kliknięciu "Szczegóły"
```

### Edge case'i:
- 0 przedmiotów – show "Brak przedmiotów"
- 5000 przedmiotów – test wydajności (clustering?)
- Brak geolokalizacji – default center
- Offline mode – pokaż cached items
- Szybkie zoomowanie 10x – czy mapa się zawiesza?
