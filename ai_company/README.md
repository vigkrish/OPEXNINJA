# OPEX Autonomous Company OS

This module is the control layer for an AI-managed OPEX Ninja business.

## Current architecture

- AI CEO: prioritises goals and delegates work.
- AI COO: monitors incidents, deadlines and operational health.
- AI CTO: owns technical reliability and remediation.
- QA Auditor: validates fixes independently.
- Security Auditor: checks unsafe changes and secret exposure.
- Revenue Agent: finds monetisation opportunities.
- Marketing Agent: drafts campaigns and content.
- Finance Agent: tracks cost, revenue and AI/API spend.
- Trading Director: observes trading divisions without bypassing their risk controls.
- Communications Agent: prepares Telegram and email EOD reports.

## Autonomy model

Low-risk software defects may be diagnosed automatically. The intended repair loop is:

1. Detect failed health check or runtime incident.
2. COO creates an incident record.
3. CTO diagnoses root cause.
4. Developer agent prepares a patch on a separate branch.
5. QA runs lint, type-check and tests.
6. Security agent reviews the change.
7. A pull request is prepared for deployment.
8. High-risk changes remain approval gated.

The system must never silently bypass controls around live trading, payments, credentials, destructive data changes or production access.

## Running the health orchestrator

```bash
python ai_company/orchestrator.py
```

This runs the repository checks it can detect and writes `.ai-company-state.json`.

## Running end-of-day notifications

```bash
python ai_company/notifier.py
```

The notifier supports Telegram and SMTP email through environment variables.

### Telegram environment variables

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

### Email environment variables

- `SMTP_HOST` (defaults to `smtp.gmail.com`)
- `SMTP_PORT` (defaults to `587`)
- `SMTP_USER`
- `SMTP_PASSWORD`
- `EMAIL_FROM`
- `EOD_EMAIL_TO`

Do not commit real credentials into GitHub. Store them only in repository/deployment secrets.

## Suggested production schedule

Run the health orchestrator continuously or after deployments, and run the communications agent at 19:00 IST every day for the executive EOD summary.

## Next implementation milestones

1. Persistent task/incident database.
2. GitHub issue and PR automation.
3. LLM-backed diagnosis and patch generation.
4. Independent QA/security approval workflow.
5. Company dashboard showing agents, tasks, revenue, incidents and approvals.
6. Cross-project observers for OPEX Ninja, VK-s-Auto-Trader, OPEX-CyberShield and OPEX-Mine-AI.
7. Revenue pipeline agents for consulting, training, affiliate and software-product opportunities.
