import { ArrowRight, CheckCircle2 } from 'lucide-react';

export type ContentPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Array<{
    title: string;
    text: string;
    bullets?: string[];
  }>;
  ctaTitle?: string;
  ctaText?: string;
};

export function ContentPage({ eyebrow, title, intro, sections, ctaTitle, ctaText }: ContentPageProps) {
  return (
    <>
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <p className="font-semibold uppercase tracking-[.2em] text-orange-400">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{intro}</p>
          <a href="/#assessment" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white transition hover:bg-orange-400">
            Book a Discovery Call <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-2 lg:px-8">
          {sections.map((section) => (
            <article key={section.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-2xl font-bold">{section.title}</h2>
              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{section.text}</p>
              {section.bullets && (
                <ul className="mt-6 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-100 py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-extrabold">{ctaTitle ?? 'Start with a focused business problem.'}</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">
            {ctaText ?? 'We begin with evidence, quantify the opportunity, and recommend the smallest practical intervention that can create measurable value.'}
          </p>
          <a href="/#assessment" className="mt-7 inline-flex items-center gap-2 font-semibold text-blue-600">
            Start the OPEX Ninja Diagnostic <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </>
  );
}
