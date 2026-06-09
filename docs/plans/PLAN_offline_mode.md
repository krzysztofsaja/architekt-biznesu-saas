# PLAN_offline_mode.md

## 1. Cel
Umożliwić użytkownikowi dostęp do wcześniej wczytanych danych (przedmiotów, mapy) bez połączenia internetowego. Aplikacja powinna działać offline z graceful fallback'iem dla rzeczy które wymagają internetu.

## 2. Zakres

**Wchodzi w zakres:**
- Przechowywanie przedmiotów w lokalnej bazie (Dexie/IndexedDB)
- Synchronizacja na startup (jeśli online)
- Offline indicator (badge/banner)
- Mapa offline (cached tiles i markers)
- Chat queuing (wysłane gdy online)
- Wczytane zdjęcia cache

**Nie wchodzi w zakres:**
- Service worker (PWA) – osobny plan
- Offline authentication
- Full app sync (wszystkie dane)

## 3. Wymagania funkcjonalne

- [ ] Przy załadowaniu aplikacji: zapisz przedmioty do Dexie
- [ ] Gdy offline: pokaż cached dane zamiast ładować z serwera
- [ ] Offline indicator: "Tryb offline" badge
- [ ] Przy powrocie online: sync cached data
- [ ] Chat: wiadomości offline są queued, wysyłane na reconnect
- [ ] Mapa: cached tiles (Leaflet plugin)
- [ ] Zdjęcia: cached w IndexedDB

## 4. Wymagania niefunkcjonalne

- **Wydajność:**
  - Offline load < 200ms (local DB)
  - Cache size limit: 50MB max

- **UX:**
  - Transparent offline experience
  - Jasny wskaźnik braku internetu
  - Dane są stale dostępne

## 5. Kontekst techniczny

### Biblioteki:
- `dexie` – wrapper dla IndexedDB
- `leaflet-offline` – offline map tiles

### Dane (Dexie schema):
```javascript
const db = new Dexie('SmicarkaDB');
db.version(1).stores({
  items: 'id',
  messages: 'id, item_id',
  users: 'id'
});
```

### Online status detection:
```javascript
window.addEventListener('online', handleOnline);
window.addEventListener('offline', handleOffline);
navigator.onLine // boolean
```

## 6. Kroki implementacji

1. **Utwórz utils/db.js (Dexie setup)**
   - Initialize DB z schema
   - Export: addItem, getItems, addMessage, getMessage, clearCache

2. **Sync function**
   - On app startup: if online, fetch items from Supabase
   - Save to Dexie
   - Use cached items if offline

3. **useOnlineStatus hook**
   - State: isOnline (boolean)
   - Event listeners: online/offline
   - Return: isOnline

4. **OfflineIndicator component**
   - Show if !isOnline
   - Banner: "Tryb offline - dane mogą być nieaktualne"

5. **Update components**
   - MapView: use Dexie for items if offline
   - ItemList: fetch from cache if offline
   - Chat: queue messages if offline, upload on online

6. **Message queue (offline chat)**
   - Create `pending_messages` table in Dexie
   - handleSendMessage: if offline, save to pending_messages
   - On reconnect: upload all pending messages

7. **Mapa offline**
   - Leaflet has offline tile layer support
   - Download/cache tiles (may require additional service)
   - Or use simple cached approach

8. **Storage limits**
   - Monitor IndexedDB size
   - Clear old items if > 50MB
   - Auto-cleanup: items older than 30 days

## 7. Kryteria akceptacji

- [ ] Items są savedowane do Dexie na load
- [ ] Offline: MapView pokazuje cached items
- [ ] Offline: ItemList pokazuje cached items
- [ ] Offline indicator pojawia się
- [ ] Chat messages są queued offline
- [ ] Na reconnect: messages są wysyłane
- [ ] Brak błędów w console offline
- [ ] Storage < 50MB

## 8. Testy

### Testy manualne:
1. Załaduj aplikację (online)
2. Przejdź do mapy (items powinny się wczytać)
3. Wyłącz internet (DevTools > offline)
4. Odśwież stronę – items powinny być z cache
5. Offline indicator powinien się pokazać
6. Spróbuj wysłać wiadomość – powinna zostać queued
7. Włącz internet – wiadomości powinny się wysłać

### Testy jednostkowe:
```javascript
// db.test.js
- addItem saves to Dexie
- getItems retrieves from cache
- clearCache clears table

// useOnlineStatus.test.js
- Hook returns isOnline boolean
- Changes on online/offline events
```

### Edge case'i:
- Very large cache (50MB)
- Offline for 1 hour, 10 messages queued
- Network intermittent (switches online/offline rapidly)
- Cache older than 30 days
