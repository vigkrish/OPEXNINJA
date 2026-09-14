import { Router } from 'express';
import fs from 'node:fs';
import path from 'node:path';

const VALID_TASK_STATES = new Set(['queued','assigned','working','blocked','review','waiting_approval','done','cancelled']);
const VALID_AGENT_ACTIONS = new Set(['pause','resume','run_now']);

function rootDir() {
  return path.resolve(process.cwd(), '../..');
}
function readJson(file: string, fallback: unknown) {
  try { return JSON.parse(fs.readFileSync(path.join(rootDir(), file), 'utf8')); } catch { return fallback; }
}
function writeJson(file: string, value: unknown) {
  fs.writeFileSync(path.join(rootDir(), file), JSON.stringify(value, null, 2));
}
function controlAllowed(req: any) {
  const expected = process.env.AI_COMPANY_CONTROL_KEY;
  return Boolean(expected && req.header('x-ai-company-key') === expected);
}

export function aiCompanyRoutes() {
  const router = Router();

  router.get('/status', (_req, res) => {
    const agentsDoc: any = readJson('ai_company/agents.json', { company: 'OPEX AI Company OS', agents: [] });
    const state: any = readJson('.ai-company-state.json', { healthy: true, checks: [], timestamp: null });
    const tasks: any[] = readJson('.ai-company-tasks.json', []) as any[];
    const incidents: any[] = readJson('.ai-company-incidents.json', []) as any[];
    const memory: any = readJson('.ai-company-memory.json', { facts: {}, decisions: [], agent_notes: {} });
    const controls: any = readJson('.ai-company-controls.json', { agents: {} });
    const activeTasks = tasks.filter((t) => !['done','cancelled'].includes(t.state));
    const openIncidents = incidents.filter((i) => i.status !== 'closed');
    const agents = (agentsDoc.agents || []).map((a: any) => ({
      ...a,
      state: controls.agents?.[a.id]?.state || (activeTasks.some((t) => t.owner === a.id || t.owner === a.name) ? 'working' : 'monitoring'),
      active_tasks: activeTasks.filter((t) => t.owner === a.id || t.owner === a.name).length,
    }));
    res.json({
      company: agentsDoc.company,
      timestamp: new Date().toISOString(),
      system: state,
      agents,
      tasks: tasks.slice(-100).reverse(),
      incidents: incidents.slice(-100).reverse(),
      memory,
      controls,
      metrics: {
        active_agents: agents.filter((a: any) => a.state !== 'paused').length,
        open_tasks: activeTasks.length,
        open_incidents: openIncidents.length,
        automation_health: state.healthy === false ? 70 : 100,
        pending_approvals: activeTasks.filter((t) => t.state === 'waiting_approval').length + openIncidents.filter((i) => i.status === 'waiting_approval').length,
      },
    });
  });

  router.post('/tasks/:id/state', (req, res) => {
    if (!controlAllowed(req)) return res.status(401).json({ error: 'Invalid AI company control key' });
    const next = String(req.body?.state || '');
    if (!VALID_TASK_STATES.has(next)) return res.status(400).json({ error: 'Invalid task state' });
    const tasks: any[] = readJson('.ai-company-tasks.json', []) as any[];
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    task.state = next;
    task.updated_at = new Date().toISOString();
    writeJson('.ai-company-tasks.json', tasks);
    res.json({ success: true, task });
  });

  router.post('/agents/:id/action', (req, res) => {
    if (!controlAllowed(req)) return res.status(401).json({ error: 'Invalid AI company control key' });
    const action = String(req.body?.action || '');
    if (!VALID_AGENT_ACTIONS.has(action)) return res.status(400).json({ error: 'Invalid agent action' });
    const controls: any = readJson('.ai-company-controls.json', { agents: {} });
    controls.agents ||= {};
    const now = new Date().toISOString();
    if (action === 'pause') controls.agents[req.params.id] = { state: 'paused', updated_at: now };
    if (action === 'resume') controls.agents[req.params.id] = { state: 'monitoring', updated_at: now };
    if (action === 'run_now') controls.agents[req.params.id] = { ...(controls.agents[req.params.id] || {}), requested_run_at: now, updated_at: now };
    writeJson('.ai-company-controls.json', controls);
    res.json({ success: true, control: controls.agents[req.params.id] });
  });

  return router;
}
