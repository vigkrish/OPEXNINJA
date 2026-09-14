# Trading Division Integration

This document defines how OPEX Autonomous Company OS supervises VK-s-Auto-Trader without bypassing trading safeguards.

## Control hierarchy

AI CEO -> AI COO -> Trading Director -> OPEX Trade AI -> Strategy Certification -> Portfolio Risk Shield -> Execution Gateway -> Broker adapters.

AI CTO, QA Auditor, Security Auditor, Finance Agent and Communications Agent consume operational telemetry but do not submit live orders.

## Telemetry contract

The AI Company API consumes a read-only trading summary from `TRADING_TELEMETRY_URL`. The endpoint should return:

```json
{
  "health": "healthy",
  "updated_at": "2026-09-14T12:00:00Z",
  "certifications": {"certified": 9, "probation": 4, "rejected": 4},
  "reconciliation": {"clean": true, "issues": 0, "last_run_at": "2026-09-14T11:55:00Z"},
  "executions": {"recent": 40, "accepted": 38, "blocked": 2, "last_event_at": "2026-09-14T11:58:00Z"},
  "metrics": {"paper_pnl": 0, "drawdown_pct": 0, "execution_latency_ms": 0}
}
```

The bridge is fail-safe: missing/unavailable telemetry is reported as `disconnected`; it never enables live trading.

## Workforce routing

- Trading Director: primary owner of trading health, certification and reconciliation status.
- AI CTO: receives software/runtime failures.
- QA Auditor: receives failed regression/certification checks.
- Security Auditor: receives unsafe configuration and live-gate alerts.
- Finance Agent: consumes P&L, cost and capital-use metrics.
- Communications Agent: includes material trading status in EOD updates.

## Guardrails

- No live-order submission through AI Company OS.
- No bypass of Risk Shield or strategy certification.
- No broker credential exposure in telemetry responses.
- Production code changes remain PR-first.
- Live trading continues to require explicit human approval.
