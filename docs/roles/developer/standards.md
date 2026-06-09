# Developer Standards & Best Practices - Smieciarka App

## 1. Konwencje nazewnictwa

### Komponenty React
- **Format:** PascalCase
- **Lokalizacja:** `src/components/ComponentName.jsx`
- **Przykłady:** `MapView.jsx`, `ItemForm.jsx`, `ChatMessage.jsx`
- **Rule:** Jeden komponent per file

### Zmienne i Funkcje
- **Format:** camelCase
- **Stałe:** UPPER_SNAKE_CASE
- **Booleans:** prefix `is`, `has`, `can` (np. `isLoading`, `hasError`)
- **Handlery:** `handle<Action>` (np. `handleSubmit`, `handleMarkerClick`)

### Pliki i foldery
- **Komponenty:** `src/components/`
- **Utils:** `src/utils/`
- **Styles:** `src/styles/` lub inline CSS/Tailwind
- **Tests:** `src/__tests__/` lub `.test.js` suffix
- **Format:** kebab-case dla file names w utils (np. `supabase-client.js`)

### CSS Classes (Tailwind)
- **Format:** kebab-case, descriptive
- **Przykład:** `map-container`, `item-card`, `modal-header`
- **Avoid:** Deeply nested, overly specific selectors

## 2. Struktura komponentu React

### Minimal component template:
```jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ComponentName = ({ prop1, prop2, onCallback }) => {
  const [state, setState] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Logic here
  }, [dependency]);

  const handleAction = () => {
    // Handler logic
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="container-class">
      {/* JSX */}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
  onCallback: PropTypes.func
};

ComponentName.defaultProps = {
  prop2: 0,
  onCallback: () => {}
};

export default ComponentName;
```

### Best Practices:
- **Jeden `useState` per concern** – nie mieszać logiki
- **useEffect cleanup** – unsubscribe, clearTimeout itp.
- **PropTypes validation** – zawsze validuj props
- **defaultProps** – ustaw defaults
- **Comments:** Opisuj "why", nie "what" (kod mówi co, nie po co)

## 3. Zarządzanie stanem

### Local state (useState):
- Dla UI state (isOpen, formValues, selected item)
- Small, component-scoped data

### Context API (na razie nie używamy, ale przyszłość):
- Dla global state (currentUser, theme)
- Avoid prop drilling

### Supabase queries:
- W utils/supabase.js (nie w komponencie)
- Zwracaj Promises
- Zawsze handle errors

### Caching:
- Używaj Dexie dla offline storage
- Persist do localStorage jeśli konieczne
- Clear cache strategy: LRU (Least Recently Used)

## 4. Error handling

### React component level:
```javascript
try {
  await performAction();
  setSuccess(true);
  showToast({ type: 'success', message: 'Done!' });
} catch (error) {
  console.error('Action failed:', error);
  setError(error.message);
  showToast({ type: 'error', message: error.message });
}
```

### Supabase errors:
```javascript
const { data, error } = await supabase
  .from('items')
  .select('*');

if (error) {
  console.error('Database error:', error.message);
  throw new Error(`Failed to fetch items: ${error.message}`);
}
```

### Validation errors:
```javascript
const validation = {
  email: !email ? 'Email is required' : !isValidEmail(email) ? 'Invalid email' : '',
  password: password.length < 6 ? 'Min 6 characters' : ''
};

if (Object.values(validation).some(v => v)) {
  setErrors(validation);
  return;
}
```

## 5. Testing strategy

### Unit tests (utils, helpers):
- File: `utils/helpers.test.js`
- Framework: Jest or Vitest
- Coverage: > 80% for utils

### Component tests (React components):
- File: `components/ComponentName.test.js`
- Framework: React Testing Library
- Focus: User behavior, not implementation details

### Integration tests:
- File: `__tests__/flows.integration.test.js`
- Test: Full user workflows (login -> add item -> chat)
- Database: Use test database

### Test template:
```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  test('renders without crashing', () => {
    render(<ComponentName />);
    expect(screen.getByText(/expected text/i)).toBeInTheDocument();
  });

  test('handles user interaction', async () => {
    render(<ComponentName />);
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText(/result/i)).toBeInTheDocument();
    });
  });
});
```

## 6. Komentarze i dokumentacja

### Dokumentuj:
- **Public functions:** JSDoc comments
- **Complex logic:** Inline comments explaining "why"
- **Hacks/workarounds:** Explain issue and solution
- **Performance optimizations:** Why this optimization matters

### Nie dokumentuj:
- Oczywisty kod (np. `const name = user.name;` nie potrzebuje komentarza)
- Boilerplate
- Powtarzające się implementacje

### Przykład JSDoc:
```javascript
/**
 * Calculates distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Haversine formula implementation
  const R = 6371; // Earth radius in km
  // ...
};
```

## 7. Performance best practices

### Component optimization:
- **React.memo:** Dla pure components (props rarely change)
- **useMemo:** For expensive calculations
- **useCallback:** For handler functions passed as props
- **Lazy loading:** Dynamic imports for routes

### Rendering optimization:
- **Key prop:** Always provide unique key for list items
- **Conditional rendering:** Use short-circuit evaluation
- **Fragment:** Use `<>...</>` instead of wrapping divs

### Bundle size:
- Check: `npm run build` output
- Avoid: Large libraries without need
- Prefer: Tree-shaking compatible libraries

### Network optimization:
- **Pagination:** Don't fetch all items at once
- **Debouncing:** Search, filter on input change
- **Caching:** Cache API responses in Dexie
- **Lazy images:** Implement image lazy loading

## 8. Workflow implementacji

### 1. Zanim zaczniesz kod:
- [ ] Przeczytaj PLAN_*.md dla feature
- [ ] Zrozum requirements (Functional + Non-functional)
- [ ] Zidentyfikuj komponenty/files to create/modify
- [ ] Check acceptance criteria

### 2. Tworzymy:
- [ ] Create component/util files
- [ ] Implement with TypeScript/JSDoc types
- [ ] Add error handling
- [ ] Style with Tailwind CSS

### 3. Testing:
- [ ] Write unit tests
- [ ] Manual testing (checklist from PLAN)
- [ ] Check acceptance criteria

### 4. Documentation:
- [ ] Update README.md if needed
- [ ] Add inline comments
- [ ] Update implemented_plans.md

### 5. Commit:
```bash
git commit -m "feat: Add item display on map

- Implement MapView component with Leaflet
- Add marker rendering for items
- Add real-time subscription to items table
- Update: docs/plans/implemented_features.md

Closes #issue-number"
```

## 9. Git workflow

### Branches:
- Feature: `feature/feature-name`
- Bug fix: `bugfix/bug-name`
- Hotfix: `hotfix/critical-issue`

### Commits:
- Atomic commits (one feature = one commit)
- Descriptive messages (type: description)
- Types: feat, fix, refactor, docs, test, style

### PRs:
- Link to PLAN_*.md
- List changes
- Attach screenshots (if UI change)

## 10. Tools & Setup

### ESLint & Prettier:
- Auto-format on save
- Config: `.eslintrc.json`, `.prettierrc`
- Ignore: node_modules, dist, .git

### Dev dependencies:
```json
{
  "devDependencies": {
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "vitest": "^latest",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0"
  }
}
```

### IDE extensions (VS Code):
- ESLint
- Prettier - Code formatter
- React Developer Tools
- Tailwind CSS IntelliSense

## 11. Common pitfalls to avoid

❌ **Don't:**
- Mutate state directly (`state.prop = value`)
- Use index as key in lists
- Fetch data inside render
- Create new objects/functions in render (use useMemo/useCallback)
- Block main thread (use web workers for heavy tasks)
- Hardcode URLs/keys (use .env)

✅ **Do:**
- Create immutable copies of state
- Use unique, stable keys
- Fetch in useEffect
- Memoize expensive operations
- Keep main thread responsive
- Use environment variables

## 12. Security practices

### Authentication:
- Never store plain passwords
- Use Supabase Auth (JWT tokens)
- Store token in secure storage (localStorage ok for now, httpOnly in future)

### Data validation:
- Validate on client AND server
- Use PropTypes/TypeScript
- Sanitize user input (prevent XSS)

### API calls:
- Always use HTTPS
- Include auth headers
- Validate response data

### Environment:
- Never commit .env file
- Use .env.example as template
- Rotate secrets regularly

---

**Next:** Review [Architect Guidelines](../architect/decisions.md) for system design decisions.
