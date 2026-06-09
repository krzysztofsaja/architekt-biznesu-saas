# PLAN_chat_messaging.md

## 1. Cel
Umożliwić bezpośrednią komunikację między użytkownikami (dawcą i odbiorcą) poprzez wbudowany system wiadomości. Celem jest ułatwienie negocjacji, ustaleń szczegółów oraz budowanie zaufania w społeczności.

## 2. Zakres

**Wchodzi w zakres:**
- Chat view dla konkretnego przedmiotu (1:1)
- Historia wiadomości (paginated)
- Wysyłanie nowych wiadomości
- Real-time updates (Supabase Realtime)
- Notyfikacja nowej wiadomości (Toast, Badge)
- Marker "user is typing" (optional dla MVP)
- Blokowanie użytkownika (jeśli spam)

**Nie wchodzi w zakres:**
- Group chat
- Voice/video call
- Message encryption (end-to-end)
- Message editing/deletion (będzie w osobnym planie)
- Rich text formatting (only plain text for MVP)

## 3. Wymagania funkcjonalne

- [ ] Chat otwiera się po kliknięciu na przedmiot
- [ ] Chat pokazuje wszystkie wiadomości dla danego przedmiotu
- [ ] Wiadomości grupia się po użytkownikach (different colors for sender/receiver)
- [ ] Input box do napisania nowej wiadomości
- [ ] Send button wysyła wiadomość do Supabase
- [ ] Nowa wiadomość pojawia się w chatcie (real-time)
- [ ] Historia jest paginated (load old messages on scroll up)
- [ ] Badge/counter na czacie pokazuje nowe wiadomości
- [ ] Użytkownik widzi timestamp dla każdej wiadomości
- [ ] Można blokować użytkownika (button "Block user")

## 4. Wymagania niefunkcjonalne

- **Wydajność:**
  - Chat otwiera się < 500ms
  - Wysłanie wiadomości < 200ms (optimistic update)
  - Real-time subscription < 1s delay

- **UX:**
  - Auto-scroll do ostatniej wiadomości
  - Input field stay focused dla user experience
  - Loading indicator while sending

- **Bezpieczeństwo:**
  - Tylko dawca i odbiorca mogą widzieć wiadomości
  - RLS policies w Supabase
  - Brak injections (sanitize text)

- **Dostępność:**
  - Chat dostępny na mobile (pełna wysokość)
  - Keyboard: Enter to send

## 5. Kontekst techniczny

### Komponenty zaangażowane:
- `Chat.jsx` – główny komponent chatu
- `ChatMessage.jsx` – pojedyncza wiadomość
- `utils/supabase.js` – chat functions

### API zewnętrzne:
- Supabase Database (`messages` table)
- Supabase Realtime (real-time subscriptions)

### Dane (struktura):
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY,
  item_id UUID REFERENCES items(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES auth.users(id),
  receiver_id UUID REFERENCES auth.users(id),
  message_text TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
CREATE POLICY "Users can see their own messages" ON messages
  FOR SELECT USING (
    auth.uid() = sender_id OR auth.uid() = receiver_id
  );
```

## 6. Kroki implementacji

1. **Utwórz Chat.jsx**
   - Props: itemId, receiverId
   - State: messages, newMessage, loading, page (for pagination)
   - Effects: fetchMessages(), subscribeToMessages()

2. **Fetch messages function**
   - Query: SELECT * FROM messages WHERE item_id = itemId AND ((sender_id = me AND receiver_id = other) OR vice versa)
   - Order: created_at ASC
   - Limit: 50 per page (pagination)

3. **Real-time subscription**
   - supabase.from('messages').on('*', (change) => handleMessageChange())
   - On INSERT: add message to state
   - Auto-scroll to bottom

4. **Send message**
   - handleSendMessage(text)
   - Validate: not empty, max 1000 chars
   - Optimistic update: add to state immediately
   - Insert to DB: supabase.from('messages').insert()
   - On error: rollback optimistic update, show error toast

5. **Message rendering**
   - Dla każdej wiadomości: sender name, text, timestamp
   - Kolory: my messages right-aligned, other messages left-aligned
   - Show avatar/initial jeśli jest

6. **Pagination on scroll up**
   - onScroll event: if scrollTop < 100px, fetch older messages
   - Prepend to state (insert at beginning)
   - Maintain scroll position

7. **Notifications**
   - Badge counter for unread messages
   - Toast notification on new message
   - Mark as read when viewing chat

8. **Block user functionality**
   - Button "Block user"
   - Add to blocked_users table
   - Don't show messages from blocked users

9. **Mobile responsiveness**
   - Full height: calc(100vh - header)
   - Touch-friendly input
   - No keyboard lag

## 7. Kryteria akceptacji

- [ ] Chat otwiera się dla konkretnego przedmiotu
- [ ] Wszystkie wiadomości są wyświetlone
- [ ] Wiadomości sender/receiver są innej barwy
- [ ] Timestamps są widoczne
- [ ] Nowa wiadomość wysyła się kliknięciem lub Enter
- [ ] Nowa wiadomość pojawia się real-time
- [ ] History ładuje się na scroll up
- [ ] Badge pokazuje nowe wiadomości
- [ ] Auto-scroll do ostatniej wiadomości
- [ ] Tylko upoważnieni użytkownicy mogą czytać chat
- [ ] Block user button działa

## 8. Testy

### Testy manualne:
1. Zaloguj się dwoma kontami
2. Dodaj przedmiot na koncie 1
3. Na koncie 2 otwórz chat dla tego przedmiotu
4. Wyślij wiadomość z konta 2
5. Wiadomość powinna pojawić się u konta 1 real-time
6. Wyślij wiadomość z konta 1
7. Wiadomości powinny być w różnych kolorach
8. Scroll up – powinne ładować się stare wiadomości
9. Badge powinien pokazywać nowe wiadomości
10. Testuj block user button

### Testy jednostkowe:
```javascript
// Chat.test.js
- fetchMessages returns messages for item
- subscribeToMessages sets up real-time listener
- sendMessage inserts to DB
- handleSendMessage optimistically updates state
- Pagination loads older messages
```

### Testy integracyjne:
```javascript
// Chat.integration.test.js
- User 1 sends message -> appears for User 2 real-time
- Pagination: load more -> scroll to old message
- Block user -> messages hidden
```

### Edge case'i:
- Wiadomość z unicode emojis
- Wiadomość z bardzo długim tekstem (1000 chars)
- Wysłanie 10 wiadomości szybko – czy duplicate?
- Offline -> disconnect -> reconnect – sync?
- Blokowanie użytkownika – czy usunąć historię?
