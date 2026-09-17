from __future__ import annotations

import json
import os
import smtplib
import urllib.parse
import urllib.request
from email.message import EmailMessage
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STATE = Path(os.getenv("AI_COMPANY_STATE", ROOT / ".ai-company-state.json"))


def build_message() -> str:
    if not STATE.exists():
        return "OPEX AI Company EOD: no state file found. Run orchestrator first."
    data = json.loads(STATE.read_text())
    failed = [c for c in data.get("checks", []) if not c.get("ok")]
    lines = [
        f"OPEX AI Company EOD — {data.get('timestamp', 'unknown time')}",
        f"Overall health: {'HEALTHY' if data.get('healthy') else 'ATTENTION'}",
        f"Automated checks: {len(data.get('checks', []))}",
        f"Failures: {len(failed)}",
    ]
    for item in failed[:5]:
        lines.append(f"- {item['name']}: {item['detail'][-350:]}")
    if failed:
        lines.append("AI CTO: remediation required; production remains protected by PR/approval gates.")
    else:
        lines.append("AI COO: systems nominal; monitoring continues.")
    return "\n".join(lines)


def send_telegram(text: str) -> str:
    token = os.getenv("TELEGRAM_BOT_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID")
    if not token or not chat_id:
        return "telegram skipped: credentials not configured"
    data = urllib.parse.urlencode({"chat_id": chat_id, "text": text}).encode()
    req = urllib.request.Request(f"https://api.telegram.org/bot{token}/sendMessage", data=data, method="POST")
    with urllib.request.urlopen(req, timeout=20) as response:
        return f"telegram sent: HTTP {response.status}"


def send_email(text: str) -> str:
    host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    port = int(os.getenv("SMTP_PORT", "587"))
    user = os.getenv("SMTP_USER")
    password = os.getenv("SMTP_PASSWORD")
    sender = os.getenv("EMAIL_FROM", user or "")
    recipient = os.getenv("EOD_EMAIL_TO", user or "")
    if not user or not password or not recipient:
        return "email skipped: SMTP credentials/recipient not configured"
    msg = EmailMessage()
    msg["Subject"] = "OPEX AI Company — End of Day Update"
    msg["From"] = sender
    msg["To"] = recipient
    msg.set_content(text)
    with smtplib.SMTP(host, port, timeout=30) as smtp:
        smtp.starttls()
        smtp.login(user, password)
        smtp.send_message(msg)
    return f"email sent: {recipient}"


if __name__ == "__main__":
    message = build_message()
    print(message)
    print(send_telegram(message))
    print(send_email(message))
