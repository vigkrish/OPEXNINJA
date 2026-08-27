import { ArrowRight, BookOpen, CheckSquare, Download, FileText, Gauge, Lightbulb, Workflow } from 'lucide-react';

const resources = [
  {
    icon: CheckSquare,
    title: 'Operational Excellence Self-Check',
    description: 'A practical 12-point checklist to identify waste, KPI gaps, standardization issues and improvement opportunities.',
    action: 'Open Diagnostic',
    href: `${import.meta.env.BASE_URL}assessment`,
  },
  {
    icon: Workflow,
    title: 'Kaizen A3 Template',
    description: 'A simple one-page structure for problem definition, root cause, countermeasures, actions and sustainment.',
    action: 'Use Template',
    href: '#a3-template',
  },
  {
    icon: Gauge,
    title: 'KPI Design Checklist',
    description: 'Use this checklist to test whether your operational KPIs are actionable, balanced and linked to business outcomes.',
    action: 'View Checklist',
    href: '#kpi-checklist',
  },
  {
    icon: Lightbulb,
    title: 'AI Opportunity Filter',
    description: 'A quick filter to determine whether a business problem is better solved by process redesign, automation, analytics or AI.',
    action: 'View Framework',
    href: '#ai-filter',
  },
];

export function ResourcesPage() {
  return (
    <>
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <p className="font-semibold uppercase tracking-[.2em] text-orange-400">Resources</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">Practical tools you can use today.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Use these OPEX Ninja tools to assess performance, structure improvement work and identify the right next intervention.</p>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {resources.map(({ icon: Icon, title, description, action, href }) => (
              <article key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-orange-400 dark:bg-blue-600"><Icon className="h-6 w-6" /></div>
                <h2 className="mt-6 text-2xl font-bold">{title}</h2>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{description}</p>
                <a href={href} className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600">{action} <ArrowRight className="h-4 w-4" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="a3-template" className="bg-slate-50 py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="flex items-center gap-3"><FileText className="h-7 w-7 text-orange-500" /><h2 className="text-3xl font-extrabold">Kaizen A3 Template</h2></div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {['1. Problem / business impact','2. Current condition / baseline','3. Root cause analysis','4. Target condition','5. Countermeasures','6. Action owner & due date','7. Result / before-after','8. Sustainment check'].map(item => <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 font-medium dark:border-slate-800 dark:bg-slate-900">{item}</div>)}
          </div>
          <p className="mt-6 text-sm text-slate-500">Copy these sections into your preferred document or collaboration tool and use one page per improvement problem.</p>
        </div>
      </section>

      <section id="kpi-checklist" className="bg-white py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold">KPI Design Checklist</h2>
          <div className="mt-8 space-y-3">{['Directly linked to a business outcome','Clear owner and review cadence','Reliable data source','Leading and lagging indicators balanced','Thresholds / targets defined','Action expected when off target','Drill-down available to root cause','Metric cannot be easily gamed'].map(item => <div key={item} className="flex gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-800"><CheckSquare className="h-5 w-5 shrink-0 text-emerald-500" />{item}</div>)}</div>
        </div>
      </section>

      <section id="ai-filter" className="bg-slate-50 py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="flex items-center gap-3"><BookOpen className="h-7 w-7 text-orange-500" /><h2 className="text-3xl font-extrabold">AI Opportunity Filter</h2></div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><h3 className="font-bold">Process problem?</h3><p className="mt-2 text-slate-600 dark:text-slate-300">Fix the process first if the workflow is unstable, duplicated or unclear.</p></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><h3 className="font-bold">Rule-based repetitive work?</h3><p className="mt-2 text-slate-600 dark:text-slate-300">Consider workflow automation before generative AI.</p></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><h3 className="font-bold">Decision / visibility gap?</h3><p className="mt-2 text-slate-600 dark:text-slate-300">Improve data quality and analytics before adding AI.</p></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><h3 className="font-bold">Knowledge-heavy / unstructured work?</h3><p className="mt-2 text-slate-600 dark:text-slate-300">AI may be appropriate when the process and data controls are sufficiently mature.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <Download className="mx-auto h-8 w-8 text-orange-400" />
          <h2 className="mt-4 text-3xl font-extrabold">Want a tailored improvement roadmap?</h2>
          <a href={`${import.meta.env.BASE_URL}assessment`} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-semibold">Start the Diagnostic <ArrowRight className="h-5 w-5" /></a>
        </div>
      </section>
    </>
  );
}
