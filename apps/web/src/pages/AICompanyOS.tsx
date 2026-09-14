import { Activity, Bot, BriefcaseBusiness, CheckCircle2, CircleDollarSign, Code2, Mail, ShieldCheck, Siren, TrendingUp, Users } from 'lucide-react';

const agents = [
  ['AI CEO','Executive','Prioritises goals, delegates work and escalates material decisions.','Working'],
  ['AI COO','Operations','Monitors incidents, deadlines, workload and operating health.','Monitoring'],
  ['AI CTO','Technology','Owns repository health, diagnostics, fixes and remediation PRs.','Working'],
  ['QA Auditor','Quality','Validates fixes and acceptance criteria before release.','Ready'],
  ['Security Auditor','Security','Checks secrets, unsafe changes and privilege boundaries.','Monitoring'],
  ['Revenue Agent','Growth','Finds consulting, training, affiliate and product revenue opportunities.','Working'],
  ['Marketing Agent','Growth','Creates SEO, campaign and content experiments.','Ready'],
  ['Finance Agent','Finance','Tracks revenue, costs, AI/API spend and contribution.','Monitoring'],
  ['Trading Director','Trading','Observes paper-trading divisions without bypassing risk controls.','Monitoring'],
  ['Communications Agent','Comms','Produces Telegram and email executive updates.','Ready'],
] as const;

const statusClass: Record<string,string> = {
  Working:'bg-emerald-100 text-emerald-700',
  Monitoring:'bg-blue-100 text-blue-700',
  Ready:'bg-slate-200 text-slate-700',
};

export function AICompanyOS(){
  return <section className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div><p className="text-sm font-bold uppercase tracking-[.25em] text-orange-400">Private AI Headquarters</p><h1 className="mt-3 text-4xl font-black sm:text-5xl">OPEX Autonomous Company OS</h1><p className="mt-3 max-w-3xl text-slate-300">One AI-managed operating layer for OPEX Ninja: business growth, software reliability, communications, finance oversight and trading supervision.</p></div>
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4"><div className="flex items-center gap-2 font-bold text-emerald-300"><Activity className="h-5 w-5"/> Autonomous monitoring active</div><div className="mt-1 text-sm text-slate-300">High-risk actions remain approval-gated.</div></div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['10','AI agents',Bot],['24/7','Ops monitoring',Siren],['PR only','Production fixes',Code2],['EOD','Email + Telegram',Mail]
        ].map(([value,label,Icon])=><div key={String(label)} className="rounded-3xl border border-white/10 bg-white/[.05] p-6"><Icon className="h-6 w-6 text-orange-400"/><div className="mt-5 text-3xl font-black">{String(value)}</div><div className="mt-1 text-sm text-slate-400">{String(label)}</div></div>)}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[.04] p-5 sm:p-7"><div className="flex items-center justify-between gap-4"><div><h2 className="text-2xl font-extrabold">Agent workforce</h2><p className="mt-1 text-sm text-slate-400">Specialised agents coordinated by the AI CEO and COO.</p></div><Users className="h-7 w-7 text-blue-400"/></div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">{agents.map(([name,dept,mission,status])=><article key={name} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"><div className="flex items-start justify-between gap-3"><div><div className="font-extrabold">{name}</div><div className="mt-1 text-xs uppercase tracking-wider text-slate-500">{dept}</div></div><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusClass[status]}`}>{status}</span></div><p className="mt-4 text-sm leading-6 text-slate-300">{mission}</p></article>)}</div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[.04] p-6"><h2 className="text-xl font-extrabold">Autonomy policy</h2><div className="mt-5 space-y-4 text-sm">
            <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"/><div><b>Automatic</b><p className="text-slate-400">Monitoring, diagnostics, low-risk analysis, test execution and draft content.</p></div></div>
            <div className="flex gap-3"><Code2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-400"/><div><b>PR-gated</b><p className="text-slate-400">Code fixes and production-impacting software changes are prepared as pull requests.</p></div></div>
            <div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-orange-400"/><div><b>Human approval</b><p className="text-slate-400">Live trading, payments, credentials, destructive actions and sensitive changes.</p></div></div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-orange-500/20 to-blue-500/10 p-6"><h2 className="text-xl font-extrabold">Operating divisions</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">{[[BriefcaseBusiness,'OPEX Ninja'],[TrendingUp,'Trading Division'],[CircleDollarSign,'Revenue & Finance'],[ShieldCheck,'Technology & Security']].map(([Icon,label])=><div key={String(label)} className="flex items-center gap-3 rounded-xl bg-black/20 p-4"><Icon className="h-5 w-5 text-orange-300"/><span className="font-semibold">{String(label)}</span></div>)}</div></div>
        </div>
      </div>
    </div>
  </section>;
}
