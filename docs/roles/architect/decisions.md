# Architecture Decisions & System Design - Smieciarka App

## 1. System Context (C4 Level 1)

```
┌─────────────────────────────────────────────────────────┐
│                      Smieciarka App                      │
│                                                           │
│  ┌──────────────┐      ┌──────────────┐     ┌─────────┐ │
│  │   Browser    │◄────►│   Frontend   │────►│ Maps API│ │
│  │   (Web)      │      │  (React SPA) │     │(Leaflet)│ │
│  └──────────────┘      └──────────────┘     └─────────┘ │
│         ▲                       │                         │
│         │                       ▼                         │
│         └──────────────────────────────────────────────┐ │
│                                                        │ │
│                    Internet                            │ │
│                                                        │ │
└────────────────────────────────────────────────────────┼─┘
                                                         │
                                    ┌────────────────────▼──┐
                                    │   Supabase Cloud      │
                                    │  ┌────────────────┐   │
                                    │  │  PostgreSQL DB │   │
                                    │  │  Auth Service  │   │
                                    │  │  Storage       │   │
                                    │  │  Realtime      │   │
                                    │  └────────────────┘   │
                                    └───────────────────────┘
```

### Aktorzy:
- **User** – osoba korzystająca z aplikacji (mobile/desktop)
- **Smieciarka App** – nasza aplikacja React SPA
- **Supabase** – backend & database
- **Maps API** – OpenStreetMap/Leaflet

---

## 2. Container Architecture (C4 Level 2)

```
┌─────────────────────────────────────────────────────────────────┐
│                         Smieciarka App                           │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Frontend (React SPA)                        │    │
│  │                                                           │    │
│  │  ┌────────────────┐  ┌──────────────┐  ┌────────────┐   │    │
│  │  │   MapView      │  │  ItemList    │  │  Chat      │   │    │
│  │  └────────────────┘  └──────────────┘  └────────────┘   │    │
│  │                                                           │    │
│  │  ┌────────────────┐  ┌──────────────┐  ┌────────────┐   │    │
│  │  │  ItemForm      │  │  ItemDetails │  │  AuthPage  │   │    │
│  │  └────────────────┘  └──────────────┘  └────────────┘   │    │
│  │                                                           │    │
│  │  ┌────────────────┐  ┌──────────────┐  ┌────────────┐   │    │
│  │  │  UserProfile   │  │  Settings    │  │  Modals    │   │    │
│  │  └────────────────┘  └──────────────┘  └────────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                    │
│                              ▼                                    │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │           State Management & Services                   │    │
│  │                                                           │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐    │    │
│  │  │ Supabase     │  │ Geolocation  │  │ Dexie DB   │    │    │
│  │  │ Client       │  │ Service      │  │ (Offline)  │    │    │
│  │  └──────────────┘  └──────────────┘  └────────────┘    │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │            Infrastructure Services                       │    │
│  │                                                           │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐    │    │
│  │  │ Cache Manager│  │ Error Logger │  │ Toast      │    │    │
│  │  │              │  │              │  │ Service    │    │    │
│  │  └──────────────┘  └──────────────┘  └────────────┘    │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
               ┌──────────────────────────────┐
               │      Supabase Backend        │
               │                              │
               │  ┌────────────────────────┐  │
               │  │   PostgreSQL Tables    │  │
               │  │  - auth.users          │  │
               │  │  - items               │  │
               │  │  - messages            │  │
               │  │  - reviews             │  │
               │  │  - reports             │  │
               │  └────────────────────────┘  │
               │                              │
               │  ┌────────────────────────┐  │
               │  │  Auth Service          │  │
               │  │  (Email/Password)      │  │
               │  └────────────────────────┘  │
               │                              │
               │  ┌────────────────────────┐  │
               │  │  Storage (Files)       │  │
               │  │  (Zdjęcia przedmiotów) │  │
               │  └────────────────────────┘  │
               │                              │
               │  ┌────────────────────────┐  │
               │  │  Realtime              │  │
               │  │  (Live subscriptions)  │  │
               │  └────────────────────────┘  │
               └──────────────────────────────┘
```

---

## 3. Architektoniczne decyzje (Architecture Decision Records)

### ADR-003: Frontend State Management

**Problem:** Jak zarządzać stanem bez prop drilling?

**Opcje:**
1. React Context API (built-in, simple)
2. Redux (powerful, but overkill for MVP)
3. Zustand (lightweight)
4. Component state (useState) – current approach

**Decyzja:** Na MVP używamy **component state** (useState) + Supabase client. W przyszłości Context API dla global state.

**Uzasadnienie:**
- Proste, brak dependencies
- Wystarczające dla obecnych requirements
- Easy to refactor later

---

### ADR-004: Error Handling Strategy

**Decyzja:** Centralized error handling + user-friendly messages

**Implementacja:**
```javascript
try {
  const result = await apiCall();
} catch (error) {
  const userMessage = mapErrorToUserMessage(error);
  showToast({ type: 'error', message: userMessage });
  logger.error('Action failed', { error, context });
}
```

---

### ADR-005: Caching Strategy

**Decyzja:** Hybrid approach
- Supabase realtime dla live updates
- Dexie/IndexedDB dla offline access
- localStorage dla session data

**Flow:**
1. Fetch from Supabase
2. Save to Dexie
3. On offline: use Dexie
4. On reconnect: sync with Supabase

---

### ADR-006: Component Hierarchy & Composition

**Struktura:**
```
App (root, auth logic)
├── Layout
│   ├── Header
│   ├── MainContent
│   │   ├── MapView
│   │   └── ItemList
│   └── Modals (ItemDetails, Chat, ReviewModal, etc.)
└── Toast notifications
```

**Rules:**
- Komponenty powinny być small & focused
- Avoid prop drilling > 3 levels (use Context jeśli konieczne)
- Lift state up only when necessary

---

## 4. Data Flow

### Diagram: "User adds item"
```
User Input
    │
    ▼
ItemForm component
    │
    ├─ Validate
    ├─ Upload image to Supabase Storage
    │
    ▼
Insert to items table (Supabase)
    │
    ├─ Supabase Realtime triggers
    │   └─ All connected clients receive update
    │
    ▼
MapView receives update
    │
    ├─ Add marker
    ├─ Save to Dexie cache
    │
    ▼
User sees new marker on map
```

### Diagram: "Real-time synchronization"
```
Browser 1: Adds item        Browser 2: Viewing map
    │                            │
    ├─ POST to Supabase ─────────┤
    │                            │
    ├─ Supabase Realtime ────────┤
    │                            │
    └─ Broadcast to all ─────────┤
                                 ▼
                            Receive update
                            Render marker live
```

---

## 5. Performance Optimization Strategy

### Frontend:
- **Code splitting:** Lazy-load modals, routes
- **Image optimization:** Compress before upload, use WebP
- **Memoization:** React.memo for expensive components
- **Pagination:** Load 12 items per page (not all)

### Backend (Supabase):
- **Indexes:** On frequently queried columns (creator_id, status)
- **Pagination:** LIMIT/OFFSET in queries
- **Row Level Security (RLS):** Enforce at DB level

### Caching:
- **Dexie:** Cache items, messages locally
- **HTTP Cache:** Supabase auth tokens cached
- **localStorage:** User preferences, session data

---

## 6. Security Architecture

### Authentication Flow:
```
User enters email/password
    │
    ▼
Send to Supabase Auth (over HTTPS)
    │
    ├─ Hash password (bcrypt on server)
    ├─ Return JWT token
    │
    ▼
Store JWT in localStorage/sessionStorage
    │
    ├─ Include in every API request (Authorization header)
    │
    ▼
Supabase validates token
    │
    ├─ RLS policies check: can user access this data?
    │
    ▼
Return data or 403 Forbidden
```

### Data Access Control (RLS):
```sql
-- Users can see all items
CREATE POLICY "Read items" ON items
  FOR SELECT USING (true);

-- Users can only see their own messages
CREATE POLICY "Read own messages" ON messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Users can only update their own items
CREATE POLICY "Update own items" ON items
  FOR UPDATE USING (auth.uid() = creator_id);
```

---

## 7. Scalability Considerations

### Current (MVP):
- Supabase free tier (OK for < 50k users)
- Dexie caching (client-side)
- Marker clustering on map (Leaflet)

### Future (Production):
- Supabase paid tier
- CDN for static assets (Vercel already does)
- Database query optimization (indexes, materialized views)
- Message queue for long tasks (Supabase Functions, Bull)
- Search engine (ElasticSearch) for items search
- Recommendation engine for "recommended items"

---

## 8. Disaster Recovery & Monitoring

### Backups:
- Supabase handles daily backups
- Data redundancy (cross-region)

### Monitoring:
- Error logs (Sentry integration – future)
- Performance metrics (Google Analytics)
- Database monitoring (Supabase dashboard)

### Incident Response:
1. Alert team (via email)
2. Isolate affected service
3. Rollback if necessary
4. Post-mortem & fix

---

## 9. Design Patterns Used

### Factory Pattern:
```javascript
// utils/supabase.js
export const createSupabaseClient = () => {
  return new SupabaseClient(...);
};
```

### Observer Pattern:
```javascript
// Real-time subscriptions
supabase.from('items').on('*', (change) => {
  // handle change
});
```

### Singleton Pattern:
```javascript
// Single Supabase client instance
export const supabase = createSupabaseClient();
```

### Custom Hooks Pattern:
```javascript
// useOnlineStatus, useGeolocation, useFetchItems
export const useOnlineStatus = () => {
  // logic
};
```

---

## 10. Architectural Principles

1. **Separation of Concerns:** Components handle UI, Services handle data
2. **DRY (Don't Repeat Yourself):** Reuse functions, components
3. **Single Responsibility:** Each component does one thing well
4. **Dependency Inversion:** Components depend on interfaces, not implementations
5. **Fail Fast:** Validate early, error handling comprehensive
6. **Performance First:** Optimize before premature optimization catches you

---

**Next:** Review [Developer Standards](../developer/standards.md) for coding guidelines.
