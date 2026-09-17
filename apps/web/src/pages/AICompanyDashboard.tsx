import { Activity, Bot, BrainCircuit, Bug, CheckCircle2, CircleDollarSign, Code2, Mail, Megaphone, ShieldCheck, Siren, TrendingUp } from 'lucide-react';

const agents = [
  { name: 'AI CEO', role: 'Strategy & orchestration', icon: BrainCircuit, state: 'Working' },
  { name: 'AI COO', role: 'Operations, tasks & KPIs', icon: Activity, state: 'Working' },
  { name: 'AI CTO', role: 'Engineering & remediation', icon: Code2, state: 'Monitoring' },
  { name: 'QA Auditor', role: 'Regression & acceptance tests', icon: CheckCircle2, state: 'Monitoring' },
  { name: 'Security Auditor', role: 'Secrets, dependency & change review', icon: ShieldCheck, state: 'Monitoring' },
  { name: 'Revenue Agent', role: 'Offers, leads & monetisation', icon: CircleDollarSign, state: 'Working' },
  { name: 'Marketing Agent', role: 'Campaigns, SEO & content', icon: Megaphone, state: 'Working' },
  { name: 'Finance Agent', role: 'Cost, revenue & ROI controls', icon: TrendingUp, state: 'Monitoring' },
  { name: 'Trading Director', role: 'Observes trading divisions; no live-order bypass', icon: Bot, state: 'Guarded' },
  { name: 'Communications Agent', role: 'Telegram & EOD email reporting', icon: Mail, state: 'Scheduled' },
];

const flow = [
  ['1', 'Detect', 'CI, runtime and business monitors create an incident.'],
  ['2', 'Diagnose', 'AI CTO classifies root cause and gathers evidence.'],
  ['3', 'Repair', 'Developer agent prepares the smallest safe patch on a branch.'],
  ['4', 'Verify', 'QA and Security agents test the proposed change.'],
  ['5', 'Deploy', 'Low-risk fixes can merge after gates; sensitive actions require approval.'],
  ['6', 'Report', 'COO sends outcome in the EOD Telegram/email executive brief.'],
];

export function AICompanyDashboard() {
  return (
    <section className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-semibold uppercase tracking-[.22em] text-orange-400">OPEX Autonomous Company OS</p>
            <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">AI Company Headquarters</h1>
            <p className="mt-3 max-w-3xl text-slate-300">A protected control plane for autonomous operations, software repair, business growth and executive reporting. Trading engines remain isolated behind their own risk controls.</p>
          </div>
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-200"><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-emerald-400"/>Control plane enabled</div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[['AI agents','10'],['Autonomy mode','Guarded'],['Bug response','Detect → PR'],['EOD report','Telegram + Email']].map(([k,v]) => <div key={k} className="rounded-2xl border border-white/10 bg-white/[.05] p-5"><div className="text-2xl font-extrabold">{v}</div><div className="mt-1 text-sm text-slate-400">{k}</div></div>)}
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-[1.25fr_.75fr]">
          <div>
            <div className="mb-4 flex items-center gap-2"><Bot className="h-5 w-5 text-blue-400"/><h2 className="text-xl font-bold">Agent workforce</h2></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {agents.map(({name,role,icon:Icon,state}) => <article key={name} className="rounded-2xl border border-white/10 bg-white/[.045] p-5"><div className="flex items-start justify-between gap-3"><div className="rounded-xl bg-white/10 p-2.5"><Icon className="h-5 w-5"/></div><span className="rounded-full border border-white/10 px-2.5 py-1 text-xs font-semibold text-slate-300">{state}</span></div><h3 className="mt-4 font-bold">{name}</h3><p className="mt-1 text-sm text-slate-400">{role}</p></article>)}
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-orange-400/20 bg-orange-400/10 p-6"><div className="flex items-center gap-2 text-orange-200"><Siren className="h-5 w-5"/><b>Autonomy policy</b></div><p className="mt-3 text-sm leading-6 text-orange-50/90">Agents may investigate, create issues, prepare patches, run tests and open pull requests. Live trades, payments, destructive data operations, secrets and sensitive production changes remain human approval gated.</p></div>
            <div className="rounded-3xl border border-white/10 bg-white/[.045] p-6"><div className="flex items-center gap-2"><Bug className="h-5 w-5 text-red-300"/><h2 className="font-bold">Self-healing loop</h2></div><div className="mt-5 space-y-4">{flow.map(([n,t,d]) => <div key={n} className="flex gap-3"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-bold">{n}</div><div><div className="font-semibold">{t}</div><p className="mt-1 text-sm text-slate-400">{d}</p></div></div>)}</div></div>
          </aside>
        </div>
      </div>
    </section>
  );
}
