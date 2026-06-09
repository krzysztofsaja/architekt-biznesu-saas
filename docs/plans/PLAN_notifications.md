# PLAN_notifications.md

## 1. Cel
Informować użytkowników o ważnych zdarzeniach (nowe wiadomości, zmiany statusu przedmiotu, nowe przedmioty w okolicy) poprzez system powiadomień (push, in-app, email).

## 2. Zakres

**Wchodzi w zakres:**
- In-app notifications (Toast, Badge)
- Email notifications (nowe wiadomości, przedmiot odebrany)
- Push notifications (browser notifications)
- Notification preferences (user control)
- Notification history (user can see past notifications)

**Nie wchodzi w zakres:**
- SMS notifications
- Advanced scheduling
- Notification templates customization

## 3. Wymagania funkcjonalne

- [ ] Toast notification pojawia się przy nowej wiadomości
- [ ] Badge na chacie pokazuje liczbę nowych wiadomości
- [ ] Email wysyłany gdy nowa wiadomość (optional dla user)
- [ ] Browser push notification (jeśli user dał permission)
- [ ] Notification preferences w settings
- [ ] User może disable/enable notyfikacje
- [ ] Notyfikacje mogą być snoozed (remind later)

## 4. Wymagania niefunkcjonalne

- **UX:**
  - Notifications nie są intrusive
  - User ma pełną kontrolę
  - Jasne action buttons

- **Performance:**
  - Toast animation smooth (60fps)
  - Brak delays w notifying

## 5. Kontekst techniczny

### Notyfikacje in-app (Toast):
- Biblioteka: `react-hot-toast` lub custom
- Trigger: messages, status changes, errors

### Email notifications:
- Supabase Functions lub external service
- Template: nowa wiadomość, przedmiot zarezerwowany

### Push notifications:
- Notification API (browser)
- Requires: manifest.json, service worker

### Preferences storage:
```sql
CREATE TABLE notification_preferences (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  new_messages BOOLEAN DEFAULT true,
  status_updates BOOLEAN DEFAULT true,
  nearby_items BOOLEAN DEFAULT true
);
```

## 6. Kroki implementacji

1. **Utwórz Toast system**
   - Custom component lub react-hot-toast
   - Types: success, error, info, warning
   - Position: top-right

2. **Setup notification triggers**
   - New message: supabase realtime -> show toast
   - Item status changed: show toast
   - Item deleted: show toast

3. **Email notifications**
   - Create Supabase Function to send emails
   - Trigger: on new message INSERT
   - Template: "New message from [user] on [item]"

4. **Push notifications**
   - Request permission: Notification.requestPermission()
   - Show notification: new Notification(title, options)
   - Handle click: notification.onclick = handleClick()

5. **Notification preferences**
   - Settings component: checkboxes for each preference
   - Save to notification_preferences table
   - Check before sending notification

6. **Notification center/history**
   - Component: list of past notifications
   - Paginated
   - Clear all button

7. **Snooze functionality**
   - Button in notification: "Remind in 1 hour"
   - Schedule setTimeout for later
   - Trigger notification again

8. **Badge counter**
   - Update badge count on new unread messages
   - document.title = `(3) Smieciarka App`
   - Or favicon badge (advanced)

## 7. Kryteria akceptacji

- [ ] Toast pojawia się na nową wiadomość
- [ ] Email wysyłany (jeśli enabled)
- [ ] Push notification pojawia się (jeśli enabled)
- [ ] User może disable notyfikacje w settings
- [ ] Badge pokazuje liczbę nowych wiadomości
- [ ] Notification history jest dostępna
- [ ] Snooze button zadziała

## 8. Testy

### Testy manualne:
1. Zaloguj się dwoma kontami
2. Na koncie 1 wyślij wiadomość do konta 2
3. Toast powinna pojawić się na koncie 2
4. Sprawdź email (powinien być)
5. Grant push permission i testuj push notification
6. Wejdź w settings i disable email notifications
7. Wyślij wiadomość – email nie powinien być wysłany
8. Testuj snooze: click "Remind in 1 hour"

### Testy jednostkowe:
```javascript
// Toast.test.js
- Toast renders with message
- Toast disappears after 5s
- Multiple toasts stack

// notifications.test.js
- showNotification() triggers toast
- Email preferences respected
- Push notification shown if enabled
```

### Edge case'i:
- 10 notifications rapid fire – stacking?
- Very long notification message
- Email rate limiting (spam prevention)
- Browser doesn't support Notification API
