# PLAN_item_reporting.md

## 1. Cel
Umożliwić użytkownikom zgłaszania nieodpowiednich przedmiotów, spamu lub złego zachowania, aby utrzymać wysoką jakość aplikacji i bezpieczeństwo społeczności.

## 2. Zakres

**Wchodzi w zakres:**
- Modal do zgłoszenia przedmiotu/użytkownika
- Kategorie raportów (spam, offensive, broken, fake)
- Opis problemu (tekst)
- Historia zgłoszeń użytkownika (dla moderatora)
- Automatyczne ukrywanie przedmiotu po N zgłoszeniach

**Nie wchodzi w zakres:**
- Panel moderacji (admin dashboard)
- Email notifications dla admina (będzie w osobnym planie)
- Automatyczne banowanie użytkowników
- Appeal process

## 3. Wymagania funkcjonalne

- [ ] ReportModal otwiera się z button "Report" na przedmiocie/profilu
- [ ] Kategorie raportów: Spam, Offensive, Broken/Fake, Other
- [ ] Description field (text area, max 500 chars)
- [ ] Użytkownik nie może raportować swojego przedmiotu
- [ ] Po zgłoszeniu: potwierdzenie, item ukrywany tymczasowo dla użytkownika
- [ ] Licznik raportów na item (admin widzi)
- [ ] Po 5+ raportach item jest automatycznie deactivated

## 4. Wymagania niefunkcjonalne

- **UX:**
  - Modal jest prosty i intuicyjny
  - Kategorie są jasne i odzwierciedlają problemy
  - Feedback: "Dziękujemy za raport"

- **Bezpieczeństwo:**
  - RLS: każdy zalogowany user może raportować
  - Brak spam raportów (limiter: 1 report per user per item per day)

- **Spam prevention:**
  - Brak report spam (dewnie user nie może raportować 100x)

## 5. Kontekst techniczny

### Komponenty zaangażowane:
- `ReportModal.jsx` – modal zgłoszenia
- `ItemDetails.jsx` – button "Report"

### Dane (struktura):
```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY,
  item_id UUID REFERENCES items(id) ON DELETE CASCADE,
  reporter_id UUID REFERENCES auth.users(id),
  category VARCHAR (50), -- 'spam', 'offensive', 'fake', 'other'
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX unique_report_per_day
  ON reports(item_id, reporter_id, DATE(created_at));
  
-- Count reports
SELECT COUNT(*) as report_count FROM reports WHERE item_id = ?;
```

## 6. Kroki implementacji

1. **Utwórz ReportModal.jsx**
   - Props: itemId, onSubmit
   - State: category, description
   - Render: radio buttons for categories, textarea, submit button

2. **Kategorie**
   - Spam: nieistotny, duplicate, promotional
   - Offensive: inappropriate content, hate speech
   - Broken/Fake: item doesn't exist, false description
   - Other: inne problemy

3. **Form validation**
   - Category required
   - Description optional ale recommended
   - Description max 500 chars

4. **Submit handler**
   - Check if already reported by user today (prevent spam)
   - Insert to DB
   - Update item visibility (temporary hide for reporter)
   - Show success toast: "Raport został złożony. Dziękujemy!"
   - Close modal

5. **Report counter**
   - Query: COUNT(*) FROM reports WHERE item_id
   - Threshold: >= 5 reports -> deactivate item (set status='reported')
   - Trigger: auto-update on INSERT

6. **Admin view** (future)
   - Show reports count on item
   - Button to view reports
   - Button to resolve/dismiss report

## 7. Kryteria akceptacji

- [ ] ReportModal otwiera się z button na przedmiocie
- [ ] Kategorie są wyświetlone (radio buttons)
- [ ] Description field jest widoczny (optional)
- [ ] Submit wysyła report do bazy
- [ ] Jeden report per user per item per day (no spam)
- [ ] Po 5+ raportach item jest deactivated
- [ ] Success toast pojawia się po submit
- [ ] User nie może raportować własnego przedmiotu

## 8. Testy

### Testy manualne:
1. Zaloguj się
2. Otwórz przedmiot innego użytkownika
3. Kliknij "Report"
4. Wybierz kategorię
5. Wpisz opis (optional)
6. Kliknij submit
7. Toast "Raport złożony"
8. Spróbuj raportować ten sam przedmiot ponownie dzisiaj – powinien błąd

### Testy jednostkowe:
```javascript
// ReportModal.test.js
- Category selection updates state
- Description textarea updates state
- Submit calls insertReport
- Validation: category required
```

### Edge case'i:
- User raportuje swój przedmiot – error
- 5 różnych userów raportuje -> item deactivated?
- Raport z unicode/emojis w description
- Wpisanie 500 znaków description
