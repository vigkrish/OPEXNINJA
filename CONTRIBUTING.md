# Contributing to OPEXNINJA

Thank you for contributing! Please follow these guidelines.

## Getting Started

```bash
git clone https://github.com/vigkrish/OPEXNINJA.git
cd OPEXNINJA
npm install
git checkout -b feature/your-feature
```

## Development Workflow

1. Make your changes
2. Run tests: `npm run test`
3. Run linting: `npm run lint`
4. Commit with conventional commits: `git commit -m "feat: description"`
5. Push and create a Pull Request

## Conventional Commit Format

```
<type>(<scope>): <subject>
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only
- `style`: Code formatting
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Dependency updates
- `ci`: CI/CD changes

## PR Requirements

- All tests pass
- ESLint passes
- TypeScript compiles
- Documentation updated
- Code reviewed and approved

## Code of Conduct

See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)