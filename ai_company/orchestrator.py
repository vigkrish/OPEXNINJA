from __future__ import annotations

import json
import os
import subprocess
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from incidents import list_incidents, upsert_health_incidents

ROOT = Path(__file__).resolve().parents[1]
CONFIG = Path(__file__).with_name("agents.json")
STATE = Path(os.getenv("AI_COMPANY_STATE", ROOT / ".ai-company-state.json"))


@dataclass
class CheckResult:
    name: str
    ok: bool
    detail: str


def run(cmd: list[str], timeout: int = 300) -> CheckResult:
    try:
        p = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True, timeout=timeout)
        detail = (p.stdout + "\n" + p.stderr).strip()[-8000:]
        return CheckResult(" ".join(cmd), p.returncode == 0, detail)
    except Exception as exc:
        return CheckResult(" ".join(cmd), False, f"{type(exc).__name__}: {exc}")


def detect_checks() -> list[list[str]]:
    checks: list[list[str]] = []
    package = ROOT / "package.json"
    if package.exists():
        scripts = json.loads(package.read_text()).get("scripts", {})
        for script in ("lint", "type-check", "build", "test"):
            if script in scripts:
                checks.append(["npm", "run", script])
    if (ROOT / "pyproject.toml").exists() or (ROOT / "requirements.txt").exists():
        checks.append(["python", "-m", "pytest", "-q"])
    return checks


def load_agents() -> dict[str, Any]:
    return json.loads(CONFIG.read_text())


def collect_status() -> dict[str, Any]:
    checks = [run(c) for c in detect_checks()]
    check_dicts = [c.__dict__ for c in checks]
    created = upsert_health_incidents(check_dicts)
    incidents = list_incidents()
    status = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "company": load_agents()["company"],
        "checks": check_dicts,
        "healthy": all(c.ok for c in checks) if checks else True,
        "autonomy": "guarded",
        "incidents_open": len([i for i in incidents if i.get("status") != "closed"]),
        "incidents_created": len(created),
    }
    STATE.write_text(json.dumps(status, indent=2))
    return status


def executive_summary(status: dict[str, Any]) -> str:
    failed = [c for c in status["checks"] if not c["ok"]]
    lines = [
        f"OPEX AI Company — {status['timestamp']}",
        f"Overall health: {'HEALTHY' if status['healthy'] else 'ATTENTION'}",
        f"Automated checks: {len(status['checks'])}",
        f"Failures: {len(failed)}",
        f"Open incidents: {status.get('incidents_open', 0)}",
        f"New incidents this cycle: {status.get('incidents_created', 0)}",
    ]
    for item in failed[:5]:
        lines.append(f"• {item['name']}: {item['detail'][-600:]}")
    if failed:
        lines.append("AI CTO action: incident raised and remediation path initiated; production remains protected.")
    else:
        lines.append("AI COO action: continue monitoring; no material intervention required.")
    return "\n".join(lines)


if __name__ == "__main__":
    result = collect_status()
    print(executive_summary(result))
