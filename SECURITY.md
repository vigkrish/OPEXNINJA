# Security Policy

## Reporting Vulnerabilities

Do NOT create public issues for security vulnerabilities.

Email: security@example.com with:
- Description
- Steps to reproduce
- Potential impact
- Suggested fix

## Security Standards

### Authentication
- JWT tokens with secure refresh flow
- Role-based access control (RBAC)
- Bcrypt password hashing
- MFA support for admin accounts

### Data Protection
- HTTPS/TLS for all data in transit
- Encryption at rest for sensitive data
- Regular database backups
- GDPR compliance

### API Security
- CORS configuration
- Rate limiting
- Input validation and sanitization
- CSRF protection
- SQL injection prevention

### Dependency Management
- Regular security audits (`npm audit`)
- Dependabot for automated updates
- Vulnerability scanning in CI/CD
- No hardcoded secrets

## Security Checklist

- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Security headers set
- [ ] CORS properly configured
- [ ] Database encryption enabled
- [ ] Secrets not in repository
- [ ] Dependency vulnerabilities resolved
- [ ] Rate limiting configured
- [ ] Logging and monitoring active

## Supported Versions

| Version | Status | Security Updates |
|---------|--------|------------------|
| 1.x | In Development | TBD |
