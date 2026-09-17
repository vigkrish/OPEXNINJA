from __future__ import annotations

import json
import os
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
QUEUE_PATH = Path(os.getenv("AI_COMPANY_TASKS", ROOT / ".ai-company-tasks.json"))
VALID_STATES = {"queued", "assigned", "working", "blocked", "review", "waiting_approval", "done", "cancelled"}


def _load() -> list[dict[str, Any]]:
    if not QUEUE_PATH.exists():
        return []
    try:
        data = json.loads(QUEUE_PATH.read_text())
        return data if isinstance(data, list) else []
    except Exception:
        return []


def _save(tasks: list[dict[str, Any]]) -> None:
    QUEUE_PATH.write_text(json.dumps(tasks, indent=2, sort_keys=True))


def create_task(title: str, owner: str, priority: str = "medium", source: str = "system", metadata: dict[str, Any] | None = None) -> dict[str, Any]:
    tasks = _load()
    normalized = title.strip().lower()
    for task in tasks:
        if task.get("state") not in {"done", "cancelled"} and task.get("title", "").strip().lower() == normalized:
            return task
    now = datetime.now(timezone.utc).isoformat()
    task = {
        "id": str(uuid.uuid4()),
        "title": title,
        "owner": owner,
        "priority": priority,
        "source": source,
        "state": "queued",
        "created_at": now,
        "updated_at": now,
        "metadata": metadata or {},
    }
    tasks.append(task)
    _save(tasks[-500:])
    return task


def update_task(task_id: str, state: str, note: str | None = None) -> dict[str, Any] | None:
    if state not in VALID_STATES:
        raise ValueError(f"Invalid task state: {state}")
    tasks = _load()
    result = None
    for task in tasks:
        if task.get("id") == task_id:
            task["state"] = state
            task["updated_at"] = datetime.now(timezone.utc).isoformat()
            if note:
                task.setdefault("notes", []).append({
                    "text": note,
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                })
            result = task
            break
    _save(tasks)
    return result


def list_tasks(active_only: bool = False) -> list[dict[str, Any]]:
    tasks = _load()
    if active_only:
        return [t for t in tasks if t.get("state") not in {"done", "cancelled"}]
    return tasks


def tasks_for_agent(agent_id: str) -> list[dict[str, Any]]:
    return [t for t in list_tasks(active_only=True) if t.get("owner") == agent_id]
