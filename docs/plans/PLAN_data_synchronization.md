# PLAN_data_synchronization.md

## 1. Cel
Zapewnić spójność danych między klientem (frontend) a serwerem (Supabase) poprzez synchronizację zmian w real-time i offline. Celem jest że dane są zawsze aktualne i nie ma konfiktów.

## 2. Zakres

**Wchodzi w zakres:**
- Real-time subscriptions (Supabase Realtime)
- Detekcja zmian (INSERT, UPDATE, DELETE)
- Automatyczna synchronizacja UI
- Konflikt resolution (last-write-wins)
- Tracking sync status (pending, synced)

**Nie wchodzi w zakres:**
- Conflict resolution (complex merging)
- Offline-first (będzie w offline mode)
- Encryption

## 3. Wymagania funkcjonalne

- [ ] Zmiany w bazie danych pojawiają się live na UI
- [ ] Nowy przedmiot dodany przez innego user'a pojawia się na mapie
- [ ] Usunięty przedmiot znika z mapy
- [ ] Zmieniony status przedmiotu aktualizuje się
- [ ] Sync status pokazuje czy dane są aktualne
- [ ] Konflikty rozwiązane: last-write-wins (timestamp)
- [ ] User widzi czy dane czekają na sync

## 4. Wymagania niefunkcjonalne

- **Wydajność:**
  - Real-time update < 1s
  - Brak lag'u przy updates
  - Batching updates (jeśli dużo zmian)

- **UX:**
  - Transparent syncing
  - Loader pokazuje sync progress
  - Jasny feedback jeśli sync failed

## 5. Kontekst techniczny

### Supabase Realtime:
```typescript
supabase
  .from('items')
  .on('*', (change) => {
    if (change.eventType === 'INSERT') handleInsert(change.new);
    if (change.eventType === 'UPDATE') handleUpdate(change.new);
    if (change.eventType === 'DELETE') handleDelete(change.old);
  })
  .subscribe();
```

### Conflict Resolution:
- Timestamp comparison: if (local.updated_at > remote.updated_at) keep local
- Otherwise: use remote

### Sync queue:
```javascript
{
  id: uuid,
  table: 'items',
  operation: 'UPDATE', // INSERT, UPDATE, DELETE
  data: {...},
  status: 'pending' // pending, synced, failed
  timestamp: Date
}
```

## 6. Kroki implementacji

1. **Setup Supabase Realtime**
   - Enable Realtime on tables: items, messages, reviews
   - Create subscriptions for each table

2. **Utwórz SyncManager (utils/syncManager.js)**
   - Methods: subscribe(), unsubscribe(), queueChange(), sync()
   - State: queue (changes pending), syncStatus

3. **Implementuj subscriptions**
   - MapView: subscribe to items
   - Chat: subscribe to messages
   - Profile: subscribe to reviews

4. **Handle INSERT events**
   - new item -> add to state
   - Render new marker on map
   - Add to Dexie cache

5. **Handle UPDATE events**
   - Find item in state, update properties
   - Refresh UI (map marker, list)
   - Check conflict: compare timestamps

6. **Handle DELETE events**
   - Remove from state
   - Remove marker from map
   - Remove from cache

7. **Queue management**
   - Offline changes are queued
   - On reconnect: process queue
   - Retry failed changes

8. **Sync status indicator**
   - Show badge: "Synchronizuję..." while syncing
   - Show error if sync failed with retry button
   - Show success: "Zsynchronizowane"

9. **Conflict resolution**
   - Receive remote update that conflicts with local
   - Compare: local.updated_at vs remote.updated_at
   - Keep newer version
   - Log conflict for monitoring

## 7. Kryteria akceptacji

- [ ] Real-time subscriptions są active
- [ ] INSERT: nowy item pojawia się na UI live
- [ ] UPDATE: zmiana pojawia się live
- [ ] DELETE: item znika live
- [ ] Sync queue tracks pending changes
- [ ] Offline changes są queued i synced later
- [ ] Konflikty są resolved (last-write-wins)
- [ ] Sync status jest wyświetlony

## 8. Testy

### Testy manualne:
1. Otwórz aplikację na 2 browserach
2. Na browser 1 dodaj przedmiot
3. Browser 2 powinien zobaczyć nowy przedmiot live
4. Na browser 1 zmień kategorie przedmiotu
5. Browser 2 powinna zobaczyć zmianę live
6. Usuń przedmiot na browser 1
7. Browser 2 powinna zobaczyć że zniknął
8. Testuj offline: wyłącz internet, dodaj przedmiot, włącz internet -> powinna się zsynchronizować

### Testy jednostkowe:
```javascript
// syncManager.test.js
- subscribe() sets up listeners
- handleInsert() adds item to state
- handleUpdate() updates item
- handleDelete() removes item
- queueChange() saves to queue
- Conflict resolution: keep newer timestamp
```

### Edge case'i:
- Szybkie updates na tym samym przedmiocie (ostatni win?)
- Delete i update ten sam item jednocześnie
- Offline -> 100 zmian -> online (batch sync?)
- Real-time lag (> 5s) -> user interaction conflict
