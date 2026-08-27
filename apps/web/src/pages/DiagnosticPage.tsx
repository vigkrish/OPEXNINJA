import { ArrowRight, CheckCircle2, ClipboardCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { api } from '@/utils/api';

const questions = [
  ['Process clarity','Our key processes are documented, standardized and understood by the people doing the work.'],
  ['Waste & rework','We actively measure and reduce delays, rework, handoff failures and unnecessary effort.'],
  ['KPI maturity','Our operational KPIs are reliable, actionable and reviewed with clear owners.'],
  ['Root cause discipline','Problems are solved through structured root cause analysis rather than temporary fixes.'],
  ['Improvement cadence','Teams have a regular Kaizen / continuous-improvement cadence with tracked actions.'],
  ['Automation readiness','We know which repetitive, rule-based tasks are suitable for automation.'],
  ['Data visibility','Leaders can access timely operational data without excessive manual reporting.'],
  ['AI readiness','We have realistic AI use cases, sufficient data quality and appropriate governance.'],
  ['Change capability','Process and technology changes are supported by communication, training and ownership.'],
  ['Sustainment','Improvements are checked after implementation to ensure gains are sustained.'],
] as const;

const options = [
  { value: 1, label: 'Not in place' },
  { value: 2, label: 'Ad hoc' },
  { value: 3, label: 'Partly established' },
  { value: 4, label: 'Consistent' },
  { value: 5, label: 'Leading practice' },
];

export function DiagnosticPage() {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [contact, setContact] = useState({ name: '', email: '', company: '', phone: '' });
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');

  const complete = answers.every(Boolean);
  const score = useMemo(() => answers.reduce((a,b) => a+b, 0), [answers]);
  const percentage = Math.round((score / (questions.length * 5)) * 100);
  const maturity = percentage < 40 ? 'Foundational' : percentage < 60 ? 'Developing' : percentage < 80 ? 'Established' : 'Advanced';

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!complete) return;
    setStatus('sending');
    const detail = questions.map(([title], i) => `${title}: ${answers[i]}/5`).join('\n');
    try {
      await api.post('/contact', {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        subject: `OPEX Ninja Diagnostic - ${maturity} (${percentage}%)`,
        message: `Diagnostic score: ${score}/${questions.length * 5} (${percentage}%)\nMaturity: ${maturity}\n\n${detail}\n\nPlease contact me to discuss the results and recommended next steps.`,
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="flex items-center gap-3 text-orange-400"><ClipboardCheck className="h-7 w-7" /><span className="font-semibold uppercase tracking-[.2em]">OPEX Ninja Diagnostic</span></div>
          <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">Assess your operational maturity in minutes.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Score ten practical dimensions across process discipline, KPIs, improvement, automation and AI readiness. You’ll receive an instant maturity result and can submit it for a follow-up conversation.</p>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-900">
        <form onSubmit={submit} className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="space-y-6">
            {questions.map(([title, text], index) => (
              <fieldset key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
                <legend className="px-2 text-lg font-bold">{index + 1}. {title}</legend>
                <p className="mt-2 text-slate-600 dark:text-slate-300">{text}</p>
                <div className="mt-5 grid gap-2 sm:grid-cols-5">
                  {options.map(option => (
                    <label key={option.value} className={`cursor-pointer rounded-xl border p-3 text-center text-sm transition ${answers[index] === option.value ? 'border-blue-500 bg-blue-50 font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300' : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'}`}>
                      <input className="sr-only" type="radio" name={`q-${index}`} value={option.value} checked={answers[index] === option.value} onChange={() => setAnswers(prev => prev.map((v,i) => i === index ? option.value : v))} />
                      <div className="text-xl font-bold">{option.value}</div>
                      <div className="mt-1">{option.label}</div>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-slate-950 p-8 text-white">
            <h2 className="text-2xl font-extrabold">Your current result</h2>
            {complete ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/5 p-5"><div className="text-3xl font-extrabold text-orange-400">{percentage}%</div><div className="mt-1 text-sm text-slate-300">Overall maturity score</div></div>
                <div className="rounded-2xl bg-white/5 p-5"><div className="text-3xl font-extrabold text-blue-400">{maturity}</div><div className="mt-1 text-sm text-slate-300">Maturity level</div></div>
                <div className="rounded-2xl bg-white/5 p-5"><div className="text-3xl font-extrabold text-emerald-400">{score}/50</div><div className="mt-1 text-sm text-slate-300">Raw score</div></div>
              </div>
            ) : <p className="mt-4 text-slate-300">Answer all ten questions to calculate your result.</p>}
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-2xl font-extrabold">Send me the result & discuss next steps</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Submit your score to OPEX Ninja and we’ll use it as the starting point for a discovery conversation.</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium">Name<input required value={contact.name} onChange={e => setContact({...contact,name:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900" /></label>
              <label className="text-sm font-medium">Work email<input required type="email" value={contact.email} onChange={e => setContact({...contact,email:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900" /></label>
              <label className="text-sm font-medium">Company<input value={contact.company} onChange={e => setContact({...contact,company:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900" /></label>
              <label className="text-sm font-medium">Phone<input value={contact.phone} onChange={e => setContact({...contact,phone:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900" /></label>
            </div>
            <button disabled={!complete || status === 'sending'} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50">{status === 'sending' ? 'Submitting…' : 'Submit Diagnostic Result'} <ArrowRight className="h-5 w-5" /></button>
            {status === 'success' && <p className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-600"><CheckCircle2 className="h-5 w-5" />Your diagnostic has been submitted successfully.</p>}
            {status === 'error' && <p className="mt-4 text-sm font-medium text-red-600">We could not submit your diagnostic. Please try again.</p>}
          </div>
        </form>
      </section>
    </>
  );
}
