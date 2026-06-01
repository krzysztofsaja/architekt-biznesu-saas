# Wytyczne UX/UI - Smieciarka App

## Zasady projektowania
1. **Prostota** - interfejs powinien być intuicyjny nawet dla osób niezaznajomionych z technologią
2. **Spójność** - jednolite użycie kolorów, czcionek i wzorców interakcji w całej aplikacji
3. **Dostępność** - zapewnienie użyteczności dla osób z różnymi niepełnosprawnościami (kontrast, rozmiar czcionki, nawigacja klawiaturą)
4. **Odpowiedzialność** - projekt musi działać dobrze zarówno na urządzeniach mobilnych jak i desktopowych
5. **Feedback wizualny** - użytkownik zawsze powinien wiedzieć co się dzieje (ładowanie, sukces, błędy)

## Paleta kolorów
- Primary (zielony): #10B981 - używany dla głównych przycisków i akcentów
- Secondary (niebieski): #3B82F6 - używany dla elementów interaktywnych (linki, przyciski sekundarne)
- Accent (pomarańczowy): #F59E0B - używany dla wyróżnień i ostrzeżeń
- Neutralne: szarości dla tekstu, tła i dividerów

## Typografia
- Czcionka systemowa lub Inter dla lepszej czytelności
- Rozmiary czcionki: 
  - Nagłówki: 24px, 20px, 18px
  - Tekst podstawowy: 16px
  - Małe teksty: 14px
- Wagi: normal (400), medium (500), bold (600)

## Ikony i ilustracje
- Używaj jednolitego stylu ikon (np. wszystkie outline lub wszystkie filled)
- Ikony powinny być rozpoznawalne nawet bez etykiet tekstowych
- Ilustracje powinny wspierać przekaz, nie odwracać uwagi od głównej funkcjonalności

## Wzorce interakcji
1. **Formularze**
   - Jasne etykiety i placeholders
   - Walidacja w czasie rzeczywistym przy utracie fokusu
   - Komunikaty o błędach umieszczone blisko pola z błędem
   - Przycisk submit wyraźnie zaznaczony
   
2. **Listy i karty**
   - Jednolite odstępy między elementami
   - Jasna hierarchia informacji (tytuł pierwszy, potem opis, potem metadane)
   - Obsługa stanu pustego (pusta lista) z pomocnym komunikatem
   
3. **Mapy**
   - Jasne oznaczenia pozycji użytkownika
   - Klasteryzacja markerów przy dużej liczbie przedmiotów
   - Informacje w tooltipie po kliknięciu na marker
   - Łatwe przełączanie między widokiem listy a mapą

4. **Czat**
   - Jasne rozróżnienie wiadomości wysłanych i otrzymanych
   - Automatyczne przewijanie do najnowszej wiadomości
   - Wskaźnik "pisze..."
   - Powiadomienia o nowych wiadomościach gdy czat nie jest aktywny