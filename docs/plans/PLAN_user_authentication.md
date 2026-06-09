# PLAN_user_authentication.md

## 1. Cel
Umożliwić użytkownikom rejestracji, logowania i zarządzania konto za pośrednictwem bezpiecznego systemu uwierzytelniania z wykorzystaniem Supabase Auth. Celem jest zapewnienie bezpiecznego dostępu do aplikacji oraz ochrona danych użytkownika.

## 2. Zakres

**Wchodzi w zakres:**
- Rejestracja nowego użytkownika (email + hasło)
- Logowanie użytkownika
- Wylogowanie użytkownika
- Przywracanie hasła (forgot password)
- Weryfikacja email (optional dla MVP)
- Przechowywanie danych sesji (token w localStorage/session storage)
- Obsługa stanu autentykacji (zalogowany/wylogowany)
- Ochrona tras (route guards) - przekierowanie na login jeśli niezalogowany

**Nie wchodzi w zakres:**
- Logowanie społecznościowe (Google, GitHub, itp.)
- Dwuskładnikowe uwierzytelnianie
- Integracja z systemami LDAP/SSO
- Custom email templates (użyjemy domyślnych z Supabase)

## 3. Wymagania funkcjonalne

- [ ] Użytkownik może się zarejestrować podając email i hasło
- [ ] Po rejestracji użytkownik jest automatycznie zalogowany
- [ ] Użytkownik może się zalogować istniejącymi danymi
- [ ] Logowanie wymaga poprawnego email i hasła
- [ ] Po zalogowaniu token jest przechowywany w session/localStorage
- [ ] Użytkownik może się wylogować (czyszczenie sesji)
- [ ] Po wylogowaniu użytkownik jest przekierowany na stronę logowania
- [ ] Użytkownik może zresetować hasło poprzez email
- [ ] Hasło jest wymagane i musi być min. 6 znaków
- [ ] Email musi być w poprawnym formacie
- [ ] Komunikaty błędów są jasne i zrozumiałe (email już istnieje, błędne hasło itp.)

## 4. Wymagania niefunkcjonalne

- **Bezpieczeństwo:**
  - Hasła nie są nigdy przechowywane w localStorage jako plain text
  - Komunikacja z Supabase odbywa się przez HTTPS
  - Tokeny mają ograniczony czas życia (exp time)
  - Token powinien być usuwany z localStorage przy wylogowaniu
  
- **Wydajność:**
  - Logowanie powinno zajać < 2 sekundy
  - Rejestracja < 3 sekundy
  - Brak blokerów UI podczas weryfikacji (loading state)

- **UX:**
  - Formularz logowania musi być dostępny i intuicyjny
  - Pola do wpisywania hasła muszą pokazywać/ukrywać tekst
  - Błędy powinny być pokazane w real-time (walidacja)
  - Po zalogowaniu płynne przejście do aplikacji

- **Niezawodność:**
  - Graceful error handling (bład Supabase, brak internetu)
  - Retry mechanizm dla nieudanych operacji
  - Sesja powinna być przywrócona po odświeżeniu strony (localStorage)

## 5. Kontekst techniczny

### Komponenty zaangażowane:
- `Auth.jsx` – główny komponent formularza logowania/rejestracji
- `App.jsx` – sprawdzanie stanu autentykacji, route guards
- `utils/supabase.js` – klient Supabase i funkcje auth

### API zewnętrzne:
- Supabase Auth API (`signUp`, `signIn`, `signOut`, `resetPasswordForEmail`)
- localStorage/sessionStorage API

### Dane:
- Tabela `users` w Supabase (automatic z `auth.users`)
- JWT token (zwracany przez Supabase)
- User metadata (email, created_at, updated_at)

### Zmienne środowiskowe:
```env
VITE_SUPABASE_URL=<project_url>
VITE_SUPABASE_PUBLISHABLE_KEY=<anon_key>
```

## 6. Kroki implementacji

1. **Konfiguracja Supabase Auth**
   - Włącz Email/Password provider w Supabase console
   - Skonfiguruj email templates (welcome, reset password)
   - Ustaw redirect URL na `http://localhost:5173` (dev) i `https://smieciarka-app.vercel.app` (prod)

2. **Funkcje w utils/supabase.js**
   ```javascript
   export const signUp = async (email, password)
   export const signIn = async (email, password)
   export const signOut = async ()
   export const resetPassword = async (email)
   export const getCurrentUser = async ()
   export const onAuthStateChange = (callback)
   ```

3. **Komponent Auth.jsx**
   - Formularz z polami: email, hasło, potwierdzenie hasła
   - Toggle do pokazywania/ukrywania hasła
   - Walidacja w real-time
   - Linki: "Nie masz konta? Zarejestruj się" / "Masz konto? Zaloguj się"
   - Link do resetowania hasła
   - Loading state podczas wysyłania

4. **Integracja w App.jsx**
   - Sprawdzenie stanu autentykacji przy starcie
   - Route guard – jeśli nie zalogowany, wyświetl Auth.jsx
   - Jeśli zalogowany, pokaż główną aplikację
   - Menu z opcją "Wyloguj się"

5. **Persistencja sesji**
   - Przy zalogowaniu: zapisz token do localStorage
   - Przy odświeżeniu strony: przywróć token i użytkownika
   - Supabase ma wbudowaną obsługę – use `onAuthStateChange` hook

6. **Error handling**
   - Catch błędy z Supabase (invalid credentials, network error)
   - Wyświetl Toast notifications z komunikatami
   - Log errors do console (dev) dla debugowania

7. **UI/UX**
   - Pasek logowania: email field (text input) + password field (password input z toggle'em)
   - Przycisk "Zaloguj się" (disabled gdy form niepełny lub loading)
   - Link "Zarejestruj się" – zmienia na formularz rejestracji
   - Formularz rejestracji: email + password + confirmPassword
   - Link "Powrót do logowania"

## 7. Kryteria akceptacji

- [ ] Użytkownik może się zarejestrować z email i hasłem
- [ ] Po rejestracji token jest przechowywany w localStorage
- [ ] Użytkownik jest automatycznie zalogowany po rejestracji
- [ ] Użytkownik może się wylogować i token jest usunięty
- [ ] Po wylogowaniu użytkownik widzi formularz logowania
- [ ] Formularz logowania waliduje dane w real-time (email format, hasło length)
- [ ] Błędy są jasne: "Email już istnieje", "Błędne hasło" itp.
- [ ] Formularz ma loading state podczas operacji
- [ ] Token jest przywrócony po odświeżeniu strony
- [ ] Bezpieczne hasło: min 6 znaków, brak plain text w localStorage
- [ ] Reset hasła: użytkownik otrzymuje email (testować w Supabase)

## 8. Testy

### Testy manualne:
1. Otwórz aplikację – powinna wyświetlić formularz logowania
2. Kliknij "Zarejestruj się"
3. Wpisz email i hasło (min 6 znaków)
4. Kliknij "Zaloguj się"
5. Aplikacja powinna wyświetlić główny ekran
6. Odśwież stronę – powinna pamiętać login
7. Kliknij "Wyloguj się" – powinna wrócić do formularza logowania
8. Zaloguj się ponownie z tym samym mailem
9. Spróbuj zalogować się z błędnym hasłem – powinien pokazać błąd
10. Testuj reset hasła – sprawdź email (Supabase log)

### Testy jednostkowe:
```javascript
// utils/supabase.test.js
- signUp() z poprawnym email i hasłem
- signUp() z istniejącym email (error)
- signIn() z poprawnym email i hasłem
- signIn() z błędnym hasłem (error)
- signOut() czyści localStorage
- getCurrentUser() zwraca zalogowanego użytkownika
- onAuthStateChange() callback jest wywoływany
```

### Testy integracyjne:
```javascript
// Auth.integration.test.js
- Rejestracja -> Logowanie -> Wylogowanie flow
- Po rejestracji aplikacja wyświetla główny ekran
- Po wylogowaniu powraca do formularza
- Token persystuje po refresh
```

### Edge case'i:
- Brak internetu – error handling
- Email bez domeny – walidacja formularza
- Hasło puste – walidacja
- Hasło o 1000+ znakach – czy jest limit?
- Szybkie klikanie "Zaloguj się" 5x – czy się duplikują requesty?
