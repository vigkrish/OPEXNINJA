import { ExternalLink, Search, ShieldCheck, Star, Zap } from 'lucide-react';

const TAG = 'atoz082-21';

const guides = [
  {
    title: 'Best work-from-home essentials for Indian professionals',
    slug: 'work-from-home-essentials',
    intro: 'A practical starter guide for building a comfortable home workstation without buying unnecessary gadgets.',
    picks: ['Laptop stands and monitor risers', 'Wireless keyboard and mouse', 'USB-C hubs and cable management'],
    query: 'work from home essentials desk setup'
  },
  {
    title: 'Useful desk accessories that actually improve productivity',
    slug: 'desk-accessories',
    intro: 'Small upgrades can remove daily friction. These are the desk categories worth evaluating before spending money.',
    picks: ['Desk organisers', 'Monitor arms and laptop stands', 'Desk lamps and charging stations'],
    query: 'desk accessories productivity'
  },
  {
    title: 'Best useful products under ₹500',
    slug: 'useful-products-under-500',
    intro: 'A value-focused list of inexpensive products that solve common household, travel and work problems.',
    picks: ['Cable and charger organisers', 'Kitchen and storage helpers', 'Travel organisers'],
    query: 'useful products under 500'
  },
  {
    title: 'Smart kitchen upgrades for busy families',
    slug: 'smart-kitchen-upgrades',
    intro: 'Skip novelty gadgets. Focus on tools that save preparation time, reduce mess or make storage easier.',
    picks: ['Food storage solutions', 'Kitchen organisers', 'Time-saving preparation tools'],
    query: 'kitchen organisers useful gadgets'
  },
  {
    title: 'Car accessories worth considering for Indian roads',
    slug: 'car-accessories',
    intro: 'A practical checklist of car-accessory categories focused on convenience, organisation and everyday usability.',
    picks: ['Phone mounts', 'Boot and seat organisers', 'Cleaning and emergency accessories'],
    query: 'car accessories India useful'
  },
  {
    title: 'Travel accessories for short Indian trips',
    slug: 'travel-accessories',
    intro: 'Build a compact travel kit around organisation, charging, comfort and protecting your essentials.',
    picks: ['Packing organisers', 'Universal travel adapters', 'Compact toiletry and cable kits'],
    query: 'travel accessories India'
  },
  {
    title: 'Baby and family organisation essentials',
    slug: 'baby-family-essentials',
    intro: 'Parents benefit most from simple organisation products that make feeding, changing and travel easier.',
    picks: ['Storage organisers', 'Diaper-bag organisers', 'Bottle and feeding storage solutions'],
    query: 'baby organisation essentials'
  },
  {
    title: 'Best charging and cable-management ideas',
    slug: 'charging-cable-management',
    intro: 'A cleaner charging setup can make desks and bedside areas easier to use and maintain.',
    picks: ['Multi-device charging stations', 'Cable clips and sleeves', 'Power strips with USB ports'],
    query: 'cable management charging station'
  },
  {
    title: 'Practical home-storage products for small spaces',
    slug: 'home-storage',
    intro: 'The best storage products use vertical space, make frequently used items visible and avoid adding clutter.',
    picks: ['Drawer organisers', 'Stackable storage', 'Under-shelf and vertical organisers'],
    query: 'home storage organisers small space'
  },
  {
    title: 'How to choose tech accessories without wasting money',
    slug: 'tech-accessories-buying-guide',
    intro: 'Use compatibility, warranty, build quality and actual use frequency as your buying filters—not marketing claims.',
    picks: ['Check ports and device compatibility', 'Prefer established specifications', 'Avoid buying duplicates of what you already own'],
    query: 'tech accessories USB C laptop'
  }
];

function amazonSearch(query: string) {
  return `https://www.amazon.in/s?k=${encodeURIComponent(query)}&tag=${TAG}`;
}

export function AmazonHub() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-5 py-5 flex items-center justify-between gap-4">
          <a href="#top" className="font-extrabold tracking-tight text-xl">Smart Buy India</a>
          <a href="#guides" className="text-sm font-semibold text-slate-600 hover:text-slate-950">Buying Guides</a>
        </div>
      </header>

      <main id="top">
        <section className="bg-slate-900 text-white">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-sm text-slate-200">
                <Zap size={15} /> Practical product research for India
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">Buy less. Choose better.</h1>
              <p className="mt-6 text-lg md:text-xl text-slate-300 leading-relaxed">Original, practical buying guides for everyday products—so you can compare the category, understand what matters and then shop when you're ready.</p>
              <a href="#guides" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-900 hover:bg-slate-100">Explore guides <ExternalLink size={17} /></a>
            </div>
          </div>
        </section>

        <section className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-5 py-5 text-sm text-slate-600 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <span className="font-semibold">As an Amazon Associate I earn from qualifying purchases.</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck size={16} /> We don't publish prices that may become outdated.</span>
          </div>
        </section>

        <section id="guides" className="mx-auto max-w-6xl px-5 py-14">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Buying guides</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">Start with what you actually need</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">Every guide starts with the problem, then narrows down the product categories worth considering. Amazon links below are paid links and may earn us a commission at no extra cost to you.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {guides.map((guide, index) => (
              <article id={guide.slug} key={guide.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Guide {String(index + 1).padStart(2, '0')}</span>
                  <Star size={18} className="text-slate-400" />
                </div>
                <h3 className="mt-3 text-xl font-extrabold">{guide.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{guide.intro}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {guide.picks.map((pick) => <li key={pick} className="flex gap-2"><span className="mt-1">•</span><span>{pick}</span></li>)}
                </ul>
                <a
                  href={amazonSearch(guide.query)}
                  target="_blank"
                  rel="sponsored nofollow noopener"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-700"
                >
                  <Search size={16} /> See options on Amazon.in
                </a>
                <p className="mt-3 text-xs text-slate-400">Paid link · Availability and selection can change on Amazon.in</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-slate-100 border-y">
          <div className="mx-auto max-w-6xl px-5 py-12">
            <h2 className="text-2xl font-extrabold">How we choose what to recommend</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <div className="rounded-xl bg-white p-5"><strong>1. Start with the problem</strong><p className="mt-2 text-sm text-slate-600">We focus on the job the product needs to do before looking at brands.</p></div>
              <div className="rounded-xl bg-white p-5"><strong>2. Filter the noise</strong><p className="mt-2 text-sm text-slate-600">Compatibility, practicality, durability and use frequency matter more than flashy claims.</p></div>
              <div className="rounded-xl bg-white p-5"><strong>3. Let you decide</strong><p className="mt-2 text-sm text-slate-600">We send you to Amazon to check the current selection and make the final purchase decision.</p></div>
            </div>
          </div>
        </section>

        <footer className="bg-white">
          <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-slate-500">
            <p className="font-semibold text-slate-700">Smart Buy India</p>
            <p className="mt-2">Independent product research and buying guides. This site participates in the Amazon Associates Program.</p>
            <p className="mt-2">Last updated: August 24, 2026 · We do not claim to be Amazon or represent Amazon directly.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
