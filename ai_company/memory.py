from __future__ import annotations

import json
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
MEMORY_PATH = Path(os.getenv("AI_COMPANY_MEMORY", ROOT / ".ai-company-memory.json"))


def _load() -> dict[str, Any]:
    if not MEMORY_PATH.exists():
        return {"version": 1, "facts": {}, "decisions": [], "agent_notes": {}}
    try:
        data = json.loads(MEMORY_PATH.read_text())
    except Exception:
        return {"version": 1, "facts": {}, "decisions": [], "agent_notes": {}}
    data.setdefault("version", 1)
    data.setdefault("facts", {})
    data.setdefault("decisions", [])
    data.setdefault("agent_notes", {})
    return data


def _save(data: dict[str, Any]) -> None:
    MEMORY_PATH.write_text(json.dumps(data, indent=2, sort_keys=True))


def remember_fact(key: str, value: Any, source: str = "system") -> None:
    data = _load()
    data["facts"][key] = {
        "value": value,
        "source": source,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    _save(data)


def record_decision(summary: str, owner: str = "ceo", rationale: str = "") -> None:
    data = _load()
    data["decisions"].append({
        "summary": summary,
        "owner": owner,
        "rationale": rationale,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    })
    data["decisions"] = data["decisions"][-200:]
    _save(data)


def add_agent_note(agent_id: str, note: str) -> None:
    data = _load()
    notes = data["agent_notes"].setdefault(agent_id, [])
    notes.append({"note": note, "timestamp": datetime.now(timezone.utc).isoformat()})
    data["agent_notes"][agent_id] = notes[-100:]
    _save(data)


def snapshot() -> dict[str, Any]:
    return _load()
