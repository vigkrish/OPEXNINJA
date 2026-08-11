import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  CloudCog,
  FileCheck2,
  Factory,
  Gauge,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from 'lucide-react';
import { useState } from 'react';
import { api } from '@/utils/api';

const services = [
  {
    icon: Workflow,
    title: 'Process Excellence',
    text: 'Rapid operational audits, Lean Six Sigma, Kaizen, process redesign, SOPs and KPI systems.',
  },
  {
    icon: CloudCog,
    title: 'SAP & ERP Transformation',
    text: 'SAP migration readiness, data and process advisory, ERP optimization and transformation assurance.',
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity & Risk',
    text: 'Security maturity reviews, risk assessments, governance and implementation support.',
  },
  {
    icon: FileCheck2,
    title: 'ISO Certification',
    text: 'Gap assessment, documentation, implementation, internal audit and certification readiness.',
  },
];

const industries = [
  'Manufacturing',
  'Auto Components',
  'Pharma Suppliers',
  'Electronics',
  'Packaging',
  'Logistics',
  'BPO / Shared Services',
  'SaaS & Technology',
];

const outcomes = [
  'Cost and waste visibility',
  'Faster, simpler processes',
  'Better operational controls',
  'ERP/SAP value realization',
  'Stronger risk and compliance posture',
  'A sustainable improvement cadence',
];

export function Home() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Operational Health Check',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function submitLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    try {
      await api.post('/contact', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        subject: form.service,
        message: `${form.service}\n\n${form.message}`,
      });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', company: '', service: 'Operational Health Check', message: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <section id="home" className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,136,229,.28),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(255,107,0,.16),transparent_34%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:px-8 lg:py-32">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200">
              <Sparkles className="h-4 w-4 text-orange-400" />
              Results-oriented operational transformation
            </div>
            <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl">
              Turn operational complexity into measurable performance.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              OPEX Ninja helps organizations identify improvement potential, deliver focused transformation,
              and sustain performance across processes, SAP/ERP, cybersecurity and ISO compliance.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#assessment" className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-400">
                Get a Free Health Check <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#method" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10">
                Explore the OPEX Ninja Method
              </a>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                ['3–10 days', 'Feasibility check'],
                ['30 days', 'Transformation sprint'],
                ['Ongoing', 'Surveillance & optimization'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xl font-bold">{value}</div>
                  <div className="mt-1 text-sm text-slate-400">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[.06] p-6 shadow-2xl backdrop-blur">
            <div className="rounded-2xl bg-white p-6 text-slate-900">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-950 p-3 text-orange-400"><Target className="h-6 w-6" /></div>
                <div>
                  <div className="font-bold">Start with evidence, not assumptions.</div>
                  <div className="text-sm text-slate-500">Rapid diagnostic → focused action → sustained control</div>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {[
                  'Find where value and cost are leaking',
                  'Prioritize initiatives by impact and feasibility',
                  'Deliver visible improvements quickly',
                  'Keep gains under surveillance',
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="method" className="bg-white py-24 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-semibold uppercase tracking-[.2em] text-orange-500">The OPEX Ninja Method</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Three stages. One objective: sustainable performance.</h2>
            <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">
              We do not start by selling a large transformation program. We start by proving where the opportunity is,
              then execute a focused intervention and keep the improvements under surveillance.
            </p>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              { n: '01', icon: ClipboardCheck, title: 'Quick Feasibility Check', time: '3–10 days', text: 'Assess process maturity, cost leakage, bottlenecks, SAP/ERP opportunities, risk and compliance gaps.', deliverables: ['Operational health score', 'Opportunity map', 'Priority roadmap', 'Indicative ROI'] },
              { n: '02', icon: Gauge, title: '30-Day Transformation Sprint', time: '30 days', text: 'Focus a cross-functional team on a small number of high-value improvements and make the change visible.', deliverables: ['Process redesign', 'Lean / Kaizen actions', 'KPI deployment', 'Implementation support'] },
              { n: '03', icon: ShieldCheck, title: 'Long-Term Surveillance', time: 'Monthly / quarterly', text: 'Keep performance from slipping through recurring audits, KPI reviews, risk monitoring and continuous improvement.', deliverables: ['Surveillance audits', 'Performance reviews', 'ISO readiness', 'Continuous improvement backlog'] },
            ].map(({ n, icon: Icon, title, time, text, deliverables }) => (
              <article key={n} className="group rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl dark:border-slate-700 dark:bg-slate-950">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold tracking-widest text-blue-600">{n}</span>
                  <Icon className="h-7 w-7 text-orange-500" />
                </div>
                <h3 className="mt-7 text-2xl font-bold">{title}</h3>
                <div className="mt-2 font-semibold text-blue-600">{time}</div>
                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{text}</p>
                <ul className="mt-6 space-y-3">
                  {deliverables.map((d) => <li key={d} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-emerald-500" />{d}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-slate-50 py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="font-semibold uppercase tracking-[.2em] text-orange-500">Capabilities</p>
              <h2 className="mt-3 text-4xl font-extrabold tracking-tight">Consulting where operations, technology and assurance meet.</h2>
            </div>
            <a href="#assessment" className="inline-flex items-center gap-2 font-semibold text-blue-600">Discuss your challenge <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-orange-400"><Icon className="h-6 w-6" /></div>
                <h3 className="mt-6 text-2xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{text}</p>
                <a href="#assessment" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">Assess your opportunity <ChevronRight className="h-4 w-4" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div>
              <Factory className="h-10 w-10 text-orange-400" />
              <h2 className="mt-6 text-4xl font-extrabold">Built for organizations where small inefficiencies become big costs.</h2>
              <p className="mt-5 leading-8 text-slate-300">
                Our model is especially suited to mid-sized businesses with operational complexity, ERP change,
                compliance requirements or a need for faster performance improvement.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {industries.map((industry) => (
                <div key={industry} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">{industry}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="why" className="bg-white py-24 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-semibold uppercase tracking-[.2em] text-orange-500">Why OPEX Ninja</p>
              <h2 className="mt-3 text-4xl font-extrabold">Operational excellence without the consulting theatre.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                We combine Lean thinking with technology, ERP/SAP understanding, risk and compliance discipline.
                The engagement is structured around evidence, execution and measurable control.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {outcomes.map((outcome) => (
                <div key={outcome} className="flex gap-3 rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                  <span className="font-medium">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="assessment" className="bg-slate-100 py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="font-semibold uppercase tracking-[.2em] text-orange-500">Start here</p>
              <h2 className="mt-3 text-4xl font-extrabold">Request a free 30-minute Operational Health Check.</h2>
              <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                Tell us where you see friction. We will use the conversation to identify whether a rapid feasibility
                assessment is the right next step.
              </p>
              <div className="mt-8 space-y-4 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex gap-3"><Target className="h-5 w-5 text-orange-500" /> Focus on one business problem first.</div>
                <div className="flex gap-3"><BarChart3 className="h-5 w-5 text-orange-500" /> Prioritize impact and feasibility.</div>
                <div className="flex gap-3"><LockKeyhole className="h-5 w-5 text-orange-500" /> Treat operational and risk information with care.</div>
              </div>
            </div>
            <form onSubmit={submitLead} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium">Name<input required value={form.name} onChange={e => setForm({...form, name:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700" /></label>
                <label className="text-sm font-medium">Work email<input required type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700" /></label>
                <label className="text-sm font-medium">Company<input value={form.company} onChange={e => setForm({...form, company:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700" /></label>
                <label className="text-sm font-medium">Phone<input value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700" /></label>
              </div>
              <label className="mt-5 block text-sm font-medium">What can we help with?
                <select value={form.service} onChange={e => setForm({...form, service:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 dark:bg-slate-900 dark:border-slate-700">
                  <option>Operational Health Check</option>
                  <option>Process Excellence</option>
                  <option>SAP / ERP Transformation</option>
                  <option>Cybersecurity & Risk</option>
                  <option>ISO Certification</option>
                  <option>Long-Term Surveillance</option>
                </select>
              </label>
              <label className="mt-5 block text-sm font-medium">What is the challenge?
                <textarea required minLength={10} value={form.message} onChange={e => setForm({...form, message:e.target.value})} rows={5} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700" placeholder="For example: high rework, SAP migration risk, audit findings, manual processes..." />
              </label>
              <button disabled={status === 'sending'} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60 dark:bg-blue-600">
                {status === 'sending' ? 'Sending…' : 'Request Operational Health Check'} <ArrowRight className="h-5 w-5" />
              </button>
              {status === 'success' && <p className="mt-4 text-sm font-medium text-emerald-600">Thank you. Your request has been received.</p>}
              {status === 'error' && <p className="mt-4 text-sm font-medium text-red-600">We could not submit the form. Please configure VITE_API_URL or contact OPEX Ninja directly.</p>}
              <p className="mt-4 text-xs leading-5 text-slate-500">Do not submit confidential credentials, security secrets or sensitive personal data through this form.</p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
