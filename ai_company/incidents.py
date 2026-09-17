from __future__ import annotations

import json
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Literal

ROOT = Path(__file__).resolve().parents[1]
INCIDENT_FILE = ROOT / '.ai-company-incidents.json'

Severity = Literal['low','medium','high','critical']
Status = Literal['open','investigating','fix_ready','waiting_approval','closed']

@dataclass
class Incident:
    id: str
    title: str
    severity: Severity
    owner: str
    status: Status
    created_at: str
    updated_at: str
    detail: str


def _load() -> list[dict]:
    if not INCIDENT_FILE.exists():
        return []
    try:
        return json.loads(INCIDENT_FILE.read_text())
    except Exception:
        return []


def _save(items: list[dict]) -> None:
    INCIDENT_FILE.write_text(json.dumps(items, indent=2))


def create_incident(title: str, detail: str, severity: Severity = 'medium', owner: str = 'AI CTO') -> Incident:
    now = datetime.now(timezone.utc).isoformat()
    items = _load()
    incident = Incident(
        id=f'INC-{datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S")}',
        title=title,
        severity=severity,
        owner=owner,
        status='open',
        created_at=now,
        updated_at=now,
        detail=detail,
    )
    items.append(asdict(incident))
    _save(items)
    return incident


def upsert_health_incidents(checks: list[dict]) -> list[Incident]:
    existing = _load()
    open_keys = {(x.get('title'), x.get('status')) for x in existing}
    created: list[Incident] = []
    for check in checks:
        if check.get('ok'):
            continue
        title = f"Health check failed: {check.get('name','unknown')}"
        if any(t == title and s != 'closed' for t, s in open_keys):
            continue
        created.append(create_incident(title, str(check.get('detail',''))[-2000:]))
    return created


def list_incidents() -> list[dict]:
    return sorted(_load(), key=lambda x: x.get('created_at',''), reverse=True)


if __name__ == '__main__':
    print(json.dumps(list_incidents(), indent=2))
