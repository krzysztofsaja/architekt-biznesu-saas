# PLAN_publish_application.md

## 1. Cel
Publikacja aplikacji Smieciarka App na platformie Vercel w celu udostępnienia jej użytkownikom końcowym poprzez publiczny URL.

## 2. Zakres
**Wchodzi w zakres:**
- Konfiguracja projektu do budowania na Vercel
- Utworzenie konta na Vercel (jeśli nie istnieje)
- Połączenie repozytorium GitHub z Vercel
- Konfiguracja zmiennych środowiskowych dla Supabase
- Deployment aplikacji na Vercel
- Weryfikacja działającej aplikacji pod URL'em Vercel

**Nie wchodzi w zakres:**
- Modyfikacja kodu aplikacji (oprócz niezbędnych zmian konfiguracyjnych)
- Konfiguracja niestandardowej domeny
- Ustawianie zaawansowanych funkcji Vercel (jak funkcje serwerowe)
- Publikacja na innych platformach (Netlify, GitHub Pages, etc.) - skupienie się na jednej platformie

## 3. Wymagania funkcjonalne
- Aplikacja musi być dostępna pod publicznym URL'em po deploymentie
- Wszystkie funkcjonalności frontendowe muszą działać poprawnie:
  - Mapa z markerami przedmiotów
  - Formularz dodawania przedmiotów
  - Lista przedmiotów
  - Czat między użytkownikami
  - Uwierzytelnianie przez Supabase
- Zmienne środowiskowe muszą być prawidłowo skonfigurowane w Vercel
- Aplikacja musi ładować się w rozsądnym czasie (< 5 sekund na średnim połączeniu)

## 4. Wymagania niefunkcjonalne
- **Wydajność:** Czas ładowania początkowej strony < 3 sekund na średnim połączeniu 3G
- **Bezpieczeństwo:** Zmienne środowiskowe (klucze API) nie mogą być wystawione publicznie w kodzie źródłowym
- **UX:** Aplikacja musi być responsywna i działać na urządzeniach mobilnych i desktopowych
- **Niezawodność:** Deployment musi być powtarzalny - ponowne wdrożenie tego samego kodu musi dać ten sam rezultat
- **Skalowalność:** Rozwiązanie musi umożliwiać łatwe aktualizacje poprzez kolejne pushy do repozytorium

## 5. Kontekst techniczny
### Komponenty zaangażowane
- Cały frontend React/Vite aplikacji (src/ directory)
- plik vite.config.js (może wymagać drobnych modyfikacji)
- zmiennych środowiskowych dla Supabase (VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY)

### API zewnętrzne
- Vercel API (poprzez GitHub integration)
- Supabase API (już używane w aplikacji)

### Dane
- Żadne dodatkowe dane nie są wymagane oprócz już istniejących w Supabase
- Zmienne środowiskowe muszą być pobrane z istniejącego pliku .env

## 6. Kroki implementacji
1. Sprawdź aktualny stan kodu i upewnij się, że aplikacja działa lokalnie (`npm run dev`)
2. Zainstaluj Vercel CLI jeśli nie jest jeszcze zainstalowany: `npm i -g vercel`
3. Zaloguj się do Vercel: `vercel login` (postępuj zgodnie z instrukcjami)
4. Inicjalizacja projektu Vercel: `vercel` w katalogu projektu
5. Podczas inicjalizacji:
   - Wybierz framework: "Vite"
   - Wybierz czy zmienić ustawienia: można pozostawić domyślne lub dostosować
   - Czy chcesz przeszyć zmienne środowiskowe: Tak
   - Dodaj zmienne środowiskowe z pliku .env:
     * VITE_SUPABASE_URL
     * VITE_SUPABASE_PUBLISHABLE_KEY
6. Potwierdź deployment i poczekaj na zakończenie budowania
7. Po pomyślnym deploymentie, Vercel dostarczy URL (np. https://smieciarka-app.vercel.app)
8. Sprawdź aplikację pod tym URL'em pod kątem:
   - Poprawnego ładowania
   - Działania mapy
   - Dodawania przedmiotów (jeśli masz testowe konto Supabase)
   - Czatu (jeśli masz dwa testowe konta)
9. W razie problemów, sprawdź logi deploymentu w Vercel i dostosuj konfigurację
10. Po zweryfikowaniu działającej aplikacji, aktualizuj dokumentację

## 7. Kryteria akceptacji
- [ ] Aplikacja jest dostępna pod publicznym URL'em dostarczonym przez Vercel
- [ ] Strona główna ładuje się bez błędów konsoli
- [ ] Mapa jest wyświetlona i pozwala na interakcję (przybliżanie, oddalanie)
- [ ] Formularz dodawania przedmiotów jest dostępny i pozwala na wypełnienie pól
- [ ] Lista przedmiotów jest wyświetlana (choćby pusta początkowo)
- [ ] Zmienne środowiskowe są prawidłowo skonfigurowane (brak błędów związanych z Supabase)
- [ ] Aplikacja jest responsywna (wygląda dobrze zarówno na desktop jak i na urządzeniu mobilnym w trybie responsywnym devtools)
- [ ] Deployment można powtórzyć - kolejny push do gałęzi main powoduje automatyczne ponowne wdrożenie

## 8. Testy
### Testy manualne (do wykonania po deploymentie)
1. Otwórz aplikację w przeglądarce na podany URL
2. Sprawdź czy nie ma błędów w konsoli deweloperskiej
3. Przetestuj podstawowe funkcje:
   - Przejdź do sekcji dodawania przedmiotu
   - Wypełnij formularz testowymi danymi
   - Sprawdź czy marker pojawia się na mapie (po zatwierdzeniu formularza)
   - Sprawdź czy przedmiot pojawia się na liście
   - Przetestuj przełączanie między widokiem mapy a listą
   - Jeśli możliwe, przetestuj czat między dwoma różnymi kontami
4. Przetestuj na urządzeniu mobilnym (lub symulatorze) - sprawdź responsywność
5. Sprawdź czas ładowania strony przy pomocy narzędzi deweloperskich sieci

### Automatyczne testy
- Brak (do rozważenia w przyszłości jako osobna funkcjonalność)