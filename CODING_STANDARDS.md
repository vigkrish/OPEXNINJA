# Coding Standards for OPEXNINJA

## General Principles

1. Readability: Self-documenting code
2. Maintainability: Easy to modify
3. Consistency: Follow patterns
4. Simplicity: Prefer KISS principle
5. Performance: Efficient code
6. Security: Consider security implications

## TypeScript Standards

### Type Safety

✅ DO:
```typescript
const userName: string = 'John';
interface User { id: string; email: string; }
function getItem<T>(items: T[], index: number): T { return items[index]; }
```

❌ DON'T:
```typescript
const data: any = fetchData();
```

### Naming Conventions

| Item | Convention | Example |
|------|-----------|----------|
| Variables | camelCase | `const userName` |
| Constants | UPPER_SNAKE_CASE | `const MAX_RETRIES` |
| Functions | camelCase | `function getUserById()` |
| Classes | PascalCase | `class UserService` |
| Interfaces | PascalCase | `interface IUser` |
| Files | PascalCase or camelCase | `UserProfile.tsx`, `utils.ts` |
| Boolean | is/has prefix | `isActive`, `hasPermission` |

## React Standards

✅ Use functional components with hooks
✅ Extract logic into custom hooks
✅ Type component props properly
✅ Memoize expensive computations

❌ Avoid prop drilling (use Context)
❌ Don't overuse state
❌ Avoid inline object/function creation in JSX

## Express.js Standards

### Route Organization
```typescript
const router = express.Router();
router.get('/', controller.list);
router.post('/', controller.create);
router.get('/:id', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
```

### Controller Pattern
```typescript
export class UserController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await service.getAll();
      res.json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  }
}
```

## Import Organization

```typescript
// 1. External dependencies
import express from 'express';

// 2. Internal packages
import { logger } from '@opexninja/utils';

// 3. Local files
import { userService } from './services';

// 4. Styles
import './styles.css';
```

## Comments & Documentation

✅ Document WHY, not WHAT
✅ Use JSDoc for public APIs
✅ Keep comments up-to-date

```typescript
/**
 * Calculate expense total with discounts
 * @param userId - User identifier
 * @param period - Time period
 * @returns Total amount
 */
function calculateExpense(userId: string, period: DateRange): number {}
```

## Testing

✅ Write descriptive test names
✅ Use AAA pattern (Arrange, Act, Assert)
✅ Test behavior, not implementation
✅ Mock external dependencies

```typescript
describe('UserService', () => {
  it('should create user with valid data', async () => {
    const user = await service.create(validData);
    expect(user.id).toBeDefined();
  });
});
```

## Error Handling

```typescript
class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

## Security Best Practices

✅ Validate all inputs
✅ Hash passwords (bcrypt)
✅ Use environment variables
✅ Never log sensitive data
✅ SQL injection prevention (parameterized queries)

❌ Don't commit .env files
❌ Don't hardcode secrets
❌ Don't log passwords

## Code Review Checklist

- [ ] Follows naming conventions
- [ ] Types properly defined
- [ ] No `any` types
- [ ] Single responsibility
- [ ] Error handling complete
- [ ] Tests included
- [ ] No console.logs
- [ ] No hardcoded secrets
- [ ] JSDoc for public APIs
- [ ] Performance considered
- [ ] Security reviewed
