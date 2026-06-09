# Testing Strategy & Quality Assurance - Smieciarka App

## 1. Testing Pyramid

```
                    △
                   /  \
                  /    \
                 / E2E  \
                /────────\
               /         \
              / Integ.   \
             /────────────\
            /             \
           / Unit Tests   \
          /─────────────────\
         ▼
```

### Distribution:
- **Unit Tests (70%):** Utils, helpers, pure functions
- **Integration Tests (20%):** Component interactions, API calls
- **E2E Tests (10%):** Critical user flows (login, add item, chat)

---

## 2. Unit Tests

### Scope:
- Utility functions (`supabase.js`, `geolocation.js`)
- Pure functions (calculations, validators)
- Hooks (useOnlineStatus, custom hooks)

### Example:
```javascript
// utils/helpers.test.js
import { calculateDistance, validateEmail } from './helpers';

describe('calculateDistance', () => {
  test('calculates distance correctly between two points', () => {
    const distance = calculateDistance(52.2297, 21.0122, 51.5074, -0.1278);
    expect(distance).toBeCloseTo(304, -1); // ~304 km
  });

  test('returns 0 for same coordinates', () => {
    const distance = calculateDistance(52.2, 21.0, 52.2, 21.0);
    expect(distance).toBe(0);
  });
});

describe('validateEmail', () => {
  test('validates correct emails', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });

  test('rejects invalid emails', () => {
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('user@')).toBe(false);
  });
});
```

### Tools:
- **Framework:** Vitest or Jest
- **Command:** `npm run test:unit`
- **Coverage goal:** > 80%

---

## 3. Integration Tests

### Scope:
- Component + Service interactions
- API calls to Supabase
- State management & side effects

### Example:
```javascript
// components/ItemList.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createClient } from '@supabase/supabase-js';
import ItemList from './ItemList';

jest.mock('@supabase/supabase-js');

describe('ItemList Integration', () => {
  beforeEach(() => {
    // Mock Supabase
    const mockSupabase = {
      from: jest.fn(() => ({
        select: jest.fn().mockResolvedValue({
          data: [
            { id: '1', title: 'Sofa', category: 'Furniture' },
            { id: '2', title: 'Lamp', category: 'Lighting' }
          ],
          error: null
        })
      }))
    };
    createClient.mockReturnValue(mockSupabase);
  });

  test('renders items from database', async () => {
    render(<ItemList />);
    
    await waitFor(() => {
      expect(screen.getByText('Sofa')).toBeInTheDocument();
      expect(screen.getByText('Lamp')).toBeInTheDocument();
    });
  });

  test('filters items when search changes', async () => {
    render(<ItemList />);
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'Sofa' } });
    
    await waitFor(() => {
      expect(screen.getByText('Sofa')).toBeInTheDocument();
      expect(screen.queryByText('Lamp')).not.toBeInTheDocument();
    });
  });

  test('handles errors gracefully', async () => {
    const mockSupabase = {
      from: jest.fn(() => ({
        select: jest.fn().mockResolvedValue({
          data: null,
          error: { message: 'Network error' }
        })
      }))
    };
    createClient.mockReturnValue(mockSupabase);

    render(<ItemList />);
    
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
```

### Tools:
- **Framework:** React Testing Library
- **Command:** `npm run test:integration`
- **Focus:** User behavior, not implementation

---

## 4. E2E Tests (End-to-End)

### Scope:
- Critical user journeys
- Cross-browser testing
- Real database & APIs

### Critical flows to test:
1. **Login flow:** Register -> Email verification -> Login
2. **Add item flow:** Open form -> Fill -> Upload image -> Submit
3. **Chat flow:** User 1 sends message -> User 2 receives real-time
4. **Complete transaction:** Browse -> Select -> Chat -> Mark received

### Example (using Cypress):
```javascript
// cypress/e2e/add-item.cy.js
describe('Add Item Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.login('test@example.com', 'password123');
  });

  it('should allow user to add an item successfully', () => {
    // Navigate to form
    cy.contains('Dodaj przedmiot').click();

    // Fill form
    cy.get('input[name="title"]').type('Stara sofa');
    cy.get('textarea[name="description"]').type('Brązowa sofa w dobrym stanie');
    cy.get('select[name="category"]').select('Meble');

    // Add location
    cy.contains('Użyj mojej lokalizacji').click();
    cy.get('input[name="location"]').should('not.be.empty');

    // Upload image
    cy.get('input[type="file"]').selectFile('cypress/fixtures/sofa.jpg');

    // Submit
    cy.contains('Dodaj przedmiot').click();

    // Verify success
    cy.contains('Przedmiot został dodany').should('be.visible');
    cy.get('[data-testid="map"]').should('contain', 'Sofa');
  });

  it('should show validation errors', () => {
    cy.contains('Dodaj przedmiot').click();
    cy.contains('Dodaj przedmiot').click(); // Click without filling form

    cy.contains('Tytuł jest wymagany').should('be.visible');
    cy.contains('Opis jest wymagany').should('be.visible');
  });
});
```

### Tools:
- **Framework:** Cypress or Playwright
- **Command:** `npm run test:e2e` or `npm run cypress`
- **Coverage:** Minimum 3-5 critical flows

---

## 5. Manual Testing Checklist

### Before every release:

#### Functional Testing:
- [ ] Authentication (register, login, logout)
- [ ] Add item (all fields, validation, image upload)
- [ ] Browse items (map view, list view, filters)
- [ ] Chat (send message, receive real-time, history)
- [ ] Reviews (add review, view ratings)
- [ ] Reporting (report item, moderation)

#### Cross-browser Testing:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

#### Device Testing:
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

#### Performance:
- [ ] Page load time < 3s
- [ ] Chat responsiveness < 200ms
- [ ] Map zoom/pan smooth (60fps)
- [ ] No memory leaks (DevTools)

#### Security:
- [ ] No sensitive data in localStorage (just token)
- [ ] HTTPS enabled in production
- [ ] RLS policies enforced
- [ ] No XSS vulnerabilities

#### Offline Mode:
- [ ] Disconnect internet
- [ ] Browse cached items
- [ ] Offline indicator shows
- [ ] Chat message queued
- [ ] Reconnect: messages sync

---

## 6. Test Scenarios by Component

### Authentication Component:
```
✓ Register with valid email/password
✓ Register with existing email (error)
✓ Register with weak password (error)
✓ Login with correct credentials
✓ Login with wrong password (error)
✓ Logout clears session
✓ Remember session on refresh
✓ Redirect to login when not authenticated
```

### ItemForm Component:
```
✓ All fields required validation
✓ Title length validation (3-100)
✓ Description length (10-500)
✓ File upload (valid formats)
✓ File size limit (5MB)
✓ Geolocation permission handling
✓ Image preview
✓ Form reset on submit
✓ Error handling (network, storage)
```

### MapView Component:
```
✓ Renders map without errors
✓ Shows all item markers
✓ User location marker (blue)
✓ Click marker -> popup
✓ Zoom in/out smooth
✓ Pan smooth
✓ Real-time: new item appears
✓ Real-time: deleted item disappears
✓ Responsive on mobile
```

### Chat Component:
```
✓ Chat opens for correct item
✓ History loads paginated
✓ Send message: appears immediately
✓ Receive message: real-time update
✓ Sender/receiver colors different
✓ Timestamps visible
✓ Emoji support
✓ Special characters in messages
✓ Block user functionality
```

---

## 7. Bug Classification & Priority

### Severity Levels:
- **Critical:** App crashes, data loss, security breach → Fix immediately
- **High:** Major feature broken, significant UX impact → Fix in next sprint
- **Medium:** Minor feature issue, workaround exists → Fix when time allows
- **Low:** Cosmetic, minor UX improvement → Nice to have

### Example:
```
Bug: Chat messages don't send
Severity: CRITICAL
Reproducible: 100%
Steps: Send message in chat -> offline -> online
Expected: Message sends
Actual: Message disappears
Impact: Core feature broken
```

---

## 8. Performance Testing

### Metrics to Monitor:
- **FCP (First Contentful Paint):** < 1.5s
- **LCP (Largest Contentful Paint):** < 2.5s
- **CLS (Cumulative Layout Shift):** < 0.1
- **Bundle size:** < 500kb (gzipped)

### Tools:
- Google Lighthouse (in DevTools)
- WebPageTest
- Supabase dashboard (query performance)

### Commands:
```bash
npm run build        # Build optimization
npm run analyze      # Bundle analysis (if webpack-bundle-analyzer)
npm run lighthouse   # Run Lighthouse audit
```

---

## 9. Test Data & Fixtures

### Test database setup:
```sql
-- Clear tables
TRUNCATE TABLE items CASCADE;
TRUNCATE TABLE messages CASCADE;
TRUNCATE TABLE reviews CASCADE;

-- Insert test data
INSERT INTO items (id, title, description, category, creator_id, status)
VALUES
  ('item-1', 'Test Sofa', 'Good condition', 'Furniture', 'user-1', 'available'),
  ('item-2', 'Test Lamp', 'Working', 'Lighting', 'user-2', 'available');
```

### Test users:
```javascript
const testUsers = {
  user1: { email: 'test1@example.com', password: 'Test123456' },
  user2: { email: 'test2@example.com', password: 'Test123456' }
};
```

---

## 10. Continuous Integration (CI/CD)

### GitHub Actions workflow:
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test:unit
      - run: npm run test:integration
      - run: npm run lint
      - run: npm run build
```

### Before merge to main:
- ✓ All tests pass
- ✓ No linting errors
- ✓ Build succeeds
- ✓ Code review approved
- ✓ acceptance criteria met

---

## 11. Testing Tools & Setup

### Installed:
```json
{
  "devDependencies": {
    "vitest": "^latest",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "jest-mock-extended": "^3.0.0"
  }
}
```

### Configuration:
- `vitest.config.js` – test runner config
- `jest.setup.js` – test setup (mocks, globals)
- `.eslintrc.js` – linting rules for tests

---

## 12. Quality Gates

### Definition of "Ready for Release":
- [ ] All acceptance criteria met
- [ ] Unit test coverage > 80%
- [ ] Manual testing checklist passed
- [ ] No critical/high bugs open
- [ ] Code reviewed & approved
- [ ] Lighthouse score > 90
- [ ] E2E tests pass
- [ ] Documentation updated

---

**Next:** Review [Implemented Features](../../plans/implemented_features.md) for current status.
