# Testing Setup

This project uses Jest for testing with the following configuration:

## Setup

1. **Install dependencies** (already added to package.json):
   ```bash
   pnpm install
   ```

2. **Run tests**:
   ```bash
   # Run all tests
   pnpm test

   # Run tests in watch mode
   pnpm test:watch

   # Run tests with coverage
   pnpm test:coverage
   ```

## Test Structure

- `__tests__/utilities/` - Tests for utility functions
- `__tests__/lib/` - Tests for library functions and stores

## Test Files

### Utilities Tests
- `constants.test.ts` - Tests for constant values
- `endpoints.test.ts` - Tests for API endpoints
- `api.test.ts` - Tests for API utility functions

### Library Tests
- `utils.test.ts` - Tests for utility functions (cn, formatDateFn, etc.)
- `auth-store.test.ts` - Tests for authentication store

## Configuration Files

- `jest.config.js` - Jest configuration for Next.js
- `jest.setup.js` - Global test setup and mocks

## Mocks

The following are mocked in `jest.setup.js`:
- Next.js router (`useRouter`, `useSearchParams`, `usePathname`)
- `nookies` for cookie management
- `next/headers` for server-side cookies
- `sonner` for toast notifications
- `fetch` for API calls
- Browser APIs (`matchMedia`, `IntersectionObserver`, `ResizeObserver`)

## Writing Tests

### Example Test Structure
```typescript
import { functionToTest } from '@/path/to/function'

describe('Function Name', () => {
  test('should do something specific', () => {
    const result = functionToTest(input)
    expect(result).toBe(expectedOutput)
  })
})
```

### Testing Async Functions
```typescript
test('should handle async operations', async () => {
  const result = await asyncFunction()
  expect(result).toEqual(expectedData)
})
```

### Testing with Mocks
```typescript
// Mock a module
jest.mock('@/path/to/module', () => ({
  someFunction: jest.fn(() => 'mocked result')
}))

test('should use mocked function', () => {
  const result = functionThatUsesMock()
  expect(result).toBe('mocked result')
})
```

## Coverage

The test configuration includes coverage reporting for:
- `utilities/**/*.{js,jsx,ts,tsx}`
- `lib/**/*.{js,jsx,ts,tsx}`

Run `pnpm test:coverage` to see coverage reports. 