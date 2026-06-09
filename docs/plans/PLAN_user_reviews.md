# PLAN_user_reviews.md

## 1. Cel
Umożliwić użytkownikom wystawiania ocen i opinii dla innych użytkowników po zakończeniu transakcji. System ocen buduje zaufanie w społeczności i pozwala identyfikować niezawodnych użytkowników.

## 2. Zakres

**Wchodzi w zakres:**
- Modal do wystawienia oceny (tytuł, ocena 1-5 gwiazdek, opis)
- Wyświetlenie ocen w profilu użytkownika
- Średnia ocena na profilu
- Historia recenzji (paginated)
- Filtrowanie po ocenie (1-5 stars)

**Nie wchodzi w zakres:**
- Odpowiadanie na recenzje (reply)
- Moderation/delete reviews (admin panel)
- Verified purchase badge
- Review spam detection

## 3. Wymagania funkcjonalne

- [ ] Po transakcji użytkownik może wystawić ocenę (ReviewModal)
- [ ] Ocena zawiera: rating (1-5 stars), title, description
- [ ] Ocena jest zapisana w bazie z datą
- [ ] Profil użytkownika pokazuje średnią ocenę i liczbę ocen
- [ ] Lista wszystkich recenzji na profilu
- [ ] Recenzje są sortowane od najnowszych
- [ ] Filtrowanie po liczbie gwiazdek
- [ ] Rating tooltip pokazuje rozkład ocen (5★: 10, 4★: 5, itp.)
- [ ] Ocena może być wystawiona tylko raz na przedmiot

## 4. Wymagania niefunkcjonalne

- **Wydajność:**
  - Modal otwiera się < 300ms
  - Rating calculation (avg) cached

- **UX:**
  - Star rating intuicyjny (hover effect)
  - Wiarygodna prezentacja ocen

- **Bezpieczeństwo:**
  - RLS: użytkownik może ocenić tylko po potwierdzeniu transakcji
  - Brak spam (one review per item per user)

## 5. Kontekst techniczny

### Komponenty zaangażowane:
- `ReviewModal.jsx` – modal do wystawienia recenzji
- `UserProfile.jsx` – profile review section
- `utils/supabase.js` – review functions

### Dane (struktura):
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  item_id UUID REFERENCES items(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES auth.users(id),
  reviewee_id UUID REFERENCES auth.users(id),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX unique_review_per_item 
  ON reviews(item_id, reviewer_id);
```

## 6. Kroki implementacji

1. **Utwórz ReviewModal.jsx**
   - Props: itemId, revieweeId, onSubmit
   - State: rating (1-5), title, description
   - Render: Star rating selector, title input, description textarea

2. **Star rating component**
   - 5 stars clickable
   - Hover effect (highlight stars up to hover point)
   - Current rating displayed

3. **ReviewModal submission**
   - handleSubmit: validate (rating required, title required)
   - Insert to DB: reviews table
   - Show success toast
   - Close modal

4. **UserProfile review section**
   - Calculate average rating
   - Show: "4.5★ (24 reviews)"
   - Button "View all reviews"

5. **Reviews list (modal/drawer)**
   - fetchReviews(userId) paginated
   - Display: reviewer name, rating, title, description, date
   - Newest first

6. **Rating distribution**
   - Show count: 5★: 12, 4★: 8, 3★: 3, 2★: 1, 1★: 0
   - Visual bar: width proportional to count

7. **Filtering**
   - Filter by stars (show only 5 star or 4+ stars etc.)
   - Update review list

## 7. Kryteria akceptacji

- [ ] ReviewModal otwiera się po transakcji
- [ ] Star rating jest interaktywny
- [ ] Recenzja zapisuje się w bazie
- [ ] Profil pokazuje średnią ocenę
- [ ] Lista recenzji jest paginated
- [ ] Filtrowanie po ocenie działa
- [ ] Jeden user = jedna recenzja na przedmiot
- [ ] Recenzje są sortowane od najnowszych

## 8. Testy

### Testy manualne:
1. Zaloguj się dwoma kontami
2. Na koncie 1 dodaj przedmiot
3. Na koncie 2 weź przedmiot
4. Mark as received -> ReviewModal powinna się otworzyć
5. Wybierz 4 gwiazdki, wpisz opinię
6. Submit -> modal się zamyka, toast success
7. Przejdź do profilu konta 1
8. Powinna być średnia 4★ i 1 recenzja
9. Kliknij "View reviews" -> widać recenzję
10. Filtruj: show only 5★ -> powinna być pusta

### Testy jednostkowe:
```javascript
// ReviewModal.test.js
- Star rating updates state
- Submit saves to DB
- Validation: rating required

// UserProfile.test.js
- Average rating calculated correctly
- Reviews list renders
- Filter works
```

### Edge case'i:
- Multiple reviews for same user (should error)
- Review z unicode/emojis
- Wpisanie bardzo długiego tekstu (5000 chars)
