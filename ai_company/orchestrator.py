from __future__ import annotations

import json
import os
import subprocess
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
CONFIG = Path(__file__).with_name("agents.json")
STATE = Path(os.getenv("AI_COMPANY_STATE", ROOT / ".ai-company-state.json"))


@dataclass
class CheckResult:
    name: str
    ok: bool
    detail: str


def run(cmd: list[str], timeout: int = 180) -> CheckResult:
    try:
        p = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True, timeout=timeout)
        detail = (p.stdout + "\n" + p.stderr).strip()[-5000:]
        return CheckResult(" ".join(cmd), p.returncode == 0, detail)
    except Exception as exc:
        return CheckResult(" ".join(cmd), False, f"{type(exc).__name__}: {exc}")


def detect_checks() -> list[list[str]]:
    checks: list[list[str]] = []
    if (ROOT / "package-lock.json").exists() or (ROOT / "package.json").exists():
        checks.extend([["npm", "run", "lint"], ["npm", "run", "type-check"], ["npm", "test", "--", "--runInBand"]])
    if (ROOT / "pyproject.toml").exists() or (ROOT / "requirements.txt").exists():
        checks.append(["python", "-m", "pytest", "-q"])
    return checks


def load_agents() -> dict[str, Any]:
    return json.loads(CONFIG.read_text())


def collect_status() -> dict[str, Any]:
    checks = [run(c) for c in detect_checks()]
    status = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "company": load_agents()["company"],
        "checks": [c.__dict__ for c in checks],
        "healthy": all(c.ok for c in checks) if checks else True,
    }
    STATE.write_text(json.dumps(status, indent=2))
    return status


def executive_summary(status: dict[str, Any]) -> str:
    failed = [c for c in status["checks"] if not c["ok"]]
    lines = [
        f"OPEX AI Company EOD — {status['timestamp']}",
        f"Overall health: {'HEALTHY' if status['healthy'] else 'ATTENTION'}",
        f"Automated checks: {len(status['checks'])}",
        f"Failures: {len(failed)}",
    ]
    for item in failed[:5]:
        lines.append(f"• {item['name']}: {item['detail'][-500:]}")
    if failed:
        lines.append("AI CTO action: remediation PR required; no direct production change permitted.")
    else:
        lines.append("AI COO action: continue monitoring; no material intervention required.")
    return "\n".join(lines)


if __name__ == "__main__":
    result = collect_status()
    print(executive_summary(result))
