# Stos Technologiczny - Smieciarka App

## Frontend
| Technologia | Wersja | Zastosowanie | Uzasadnienie wyboru |
|-------------|--------|--------------|---------------------|
| React | 18.2.0 | Biblioteka UI | Duża społeczność, ekosystem, wydajność dzięki wirtualnemu DOM |
| Vite | 4.0.0 | Narzędzie budujące | Szybkie uruchamianie dev servera, błyskawiczne HMR, optymalizowane budowanie |
| Tailwind CSS | 3.2.4 | Stylowanie | Utility-first approach, szybkie stylowanie bez opuszczania HTML, mały rozmiar końcowego CSS dzięki purgowaniu |
| Leaflet.js | 1.9.3 | Mapy | Darmowa, open-source biblioteka map, lekka, łatwa w użyciu, nie wymaga klucza API dla podstawowego użycia |
| react-leaflet | 4.0.0 | Integracja Leaflet z Reactem | Deklaratywne komponenty, lepsza integracja z cyklem życia Reacta |
| Dexie.js | 3.2.2 | Lokalna baza (IndexedDB) | Prostota użycia w porównaniu do surowego IndexedDB, obsługa wersjonowania schematu, obietnice zamiast zdarzeń |
| @supabase/supabase-js | 2.0.0 | Klient Supabase | Oficjalna biblioteka do komunikacji z Supabase, obsługa auth, realtime, storage, funkcji brzegowych |

## Backend (Obecnie - Supabase jako BaaS)
| Technologia | Zastosowanie | Uzasadnienie |
|-------------|--------------|--------------|
| Supabase | Platforma backendowa | PostgreSQL jako služba, uwierzytelnianie, magazynowanie plików, subskrypcje w czasie rzeczywistym, funkcje brzegu |
| PostgreSQL | Baza danych | Relacyjna baza danych z pełnym wsparciem SQL, rozszerzalność, wydajność |
| GoTrue | Uwierzytelnianie | System uwierzytelniania używany przez Supabase, oparty na JWT |
| Supabase Storage | Magazynowanie plików | Przechowywanie zdjęć przedmiotów, CDN dla szybkiego dostarczania |
| Realtime | Subskrypcje | Funkcjonalność czatu na żywo, powiadomienia o zmianach w danych |

## Narzędzia developerskie
| Technologia | Zastosowanie |
|-------------|--------------|
| ESLint | Analiza statyczna kodu JavaScript/JSX |
| PostCSS | Przetwarzanie CSS (niezbędny dla Tailwind) |
| Git | Kontrola wersji |
| npm | Zarządzanie pakietami |
| Vitest | Testowanie (w planach) |

## Konwencje projektowe
### Struktura plików
```
src/
├── components/     # Komponenty Reacta (podzielone według funkcjonalności)
├── utils/          # Funkcje pomocnicze (geolokalizacja, supabase client)
├── styles/         # Globalne style i konfiguracja Tailwind
├── hooks/          # Custom React hooks (w planach)
└── context/        # React Context dla zarządzania stanem globalnym (w planach)
```

### Konwencje nazewnictwa
- Komponenty: PascalCase (np. `ItemForm.jsx`)
- Funkcje i zmienne: camelCase (np. `handleSubmit`)
- Stałe: UPPER_SNAKE_CASE (np. `MAX_UPLOAD_SIZE`)
- Pliki CSS: kebab-case (np. `custom-styles.css`)
- Pliki testów: `.test.js` lub `.spec.js`

### Jakość kodu
- Brak konsoli.log w kodzie produkcyjnym
- Komponenty funkcjonalne z hookami zamiast klasowych
- Komponenty powinny być małe i skupione na jednej odpowiedzialności
- Prop drilling powinien być ograniczony przez Context lub stan globalny (gdy będzie potrzebny)
- Obróbka błędów w miejscach wywołania API

## Ograniczenia technologiczne
1. **Rozmiar paczki** - Należy monitorować rozmiar paczki JS i stosować code splitting
2. **Zgodność z przeglądarkami** - Wspieramy nowoczesne przeglądarki (Chrome, Firefox, Safari, Edge)
3. **Ograniczenia Supabase** - Darmowy plan ma limity na liczbę projektów, przestrzeń dyskową i przepustowość
4. **SEO** - Jako aplikacja SPA może wymagać dodatkowych działań dla lepszej indeksacji (w planach: prerendering lub SSR dla niektórych stron)