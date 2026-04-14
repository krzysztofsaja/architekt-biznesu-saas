# Zakres MVP: Smieciarka App
**Cel:** Stworzenie najprostszej wersji aplikacji, która pozwoli uratować przedmiot przed wyrzuceniem.

## 1. Kluczowe funkcje (Co musi być na start)
* **Dodawanie ogłoszenia:** Użytkownik robi zdjęcie (np. wspomnianej lodówki), dodaje krótki opis i lokalizację.
* **Mapa znalezisk:** Widok mapy z pinezkami, aby inni wiedzieli, gdzie przedmiot się znajduje.
* **Prosty Czat:** Możliwość napisania do właściciela: "Chcę to odebrać, będę za 20 minut".
* **System statusów:** Przycisk "Zarezerwowane" i "Odebrane", aby inni nie jechali na marne.

## 2. Co odrzucamy na razie (zgodnie z zasadą Lean First)
* **Płatności online:** Nie są potrzebne, bo rzeczy są za darmo lub za czekoladę.
* **Rozbudowane profile użytkowników:** Wystarczy numer telefonu lub nick.
* **System kurierski:** Użytkownicy sami organizują transport.

## Grupa docelowa
* Osoby robiące remonty/przeprowadzki.
* Studenci szukający darmowego wyposażenia.
* Pasjonaci renowacji mebli i Zero Waste.
## 🏗️ 3. Architektura aplikacji (High Level)
* **Model:** Client-Side Application (działa bezpośrednio w przeglądarce).
* **Dane:** Synchronizacja lokalna – ogłoszenia zapisywane w pamięci urządzenia.
* **AI:** Wykorzystanie gotowych modeli do rozpoznawania przedmiotów na zdjęciach.

## 🛠️ 4. Tech Stack (Stos Technologiczny)
* **Frontend:** HTML5, CSS3 (Tailwind CSS), JavaScript.
* **Baza danych:** **Dexie.js** (IndexedDB) – to jest kluczowe wymaganie techniczne.
* **Mapy:** Leaflet.js (do wyświetlania znalezisk).
* **Narzędzia:** VS Code, GitHub, Kilo Code CLI.