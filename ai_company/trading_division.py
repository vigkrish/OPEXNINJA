from __future__ import annotations

import json
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

STATE_PATH = Path(os.getenv("AI_COMPANY_TRADING_STATE", ".ai-company-trading.json"))


def _empty(reason: str = "TRADING_TELEMETRY_NOT_INGESTED") -> dict[str, Any]:
    return {
        "connected": False,
        "health": "disconnected",
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "certifications": {"certified": 0, "probation": 0, "rejected": 0},
        "reconciliation": {"clean": None, "issues": 0, "last_run_at": None},
        "executions": {"recent": 0, "accepted": 0, "blocked": 0, "last_event_at": None},
        "metrics": {},
        "reason": reason,
    }


def load_trading_division() -> dict[str, Any]:
    if not STATE_PATH.exists():
        return _empty()
    try:
        payload = json.loads(STATE_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return _empty("TRADING_TELEMETRY_INVALID")

    if not isinstance(payload, dict):
        return _empty("TRADING_TELEMETRY_INVALID")

    payload.setdefault("connected", True)
    payload.setdefault("health", "healthy")
    payload.setdefault("updated_at", datetime.now(timezone.utc).isoformat())
    payload.setdefault("certifications", {"certified": 0, "probation": 0, "rejected": 0})
    payload.setdefault("reconciliation", {"clean": None, "issues": 0, "last_run_at": None})
    payload.setdefault("executions", {"recent": 0, "accepted": 0, "blocked": 0, "last_event_at": None})
    payload.setdefault("metrics", {})
    return payload


def save_trading_division(payload: dict[str, Any]) -> dict[str, Any]:
    STATE_PATH.write_text(json.dumps(payload, indent=2, default=str), encoding="utf-8")
    return load_trading_division()
