import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Copy, ExternalLink, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react';

const base = import.meta.env.BASE_URL;
const SUPABASE_URL = 'https://gibwltoooekmqckpoghu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_y3QKGkpDoBytRtDcpojzTQ_K2Ow3y6M';
const SESSION_KEY = 'opexAdminSession';

type Lead = {
  id: string;
  organization: string;
  industry: string | null;
  location: string | null;
  trigger_event: string;
  problem_description: string;
  recommended_pitch: string | null;
  source_url: string | null;
  source_date: string | null;
  discovered_at: string;
};

type Platform = 'LinkedIn' | 'Instagram' | 'SEO Brief';

async function rpc<T>(name: string, body: Record<string, unknown>): Promise<T> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: SUPABASE_KEY },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json() as Promise<T>;
}

export function MarketingStudio() {
  const token = localStorage.getItem(SESSION_KEY) || '';
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedLeadId, setSelectedLeadId] = useState('manual');
  const [platform, setPlatform] = useState<Platform>('LinkedIn');
  const [audience, setAudience] = useState('');
  const [topic, setTopic] = useState('');
  const [evidence, setEvidence] = useState('');
  const [offer, setOffer] = useState('');
  const [cta, setCta] = useState('');
  const [keyword, setKeyword] = useState('');
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);

  const selectedLead = useMemo(
    () => leads.find((lead) => lead.id === selectedLeadId),
    [leads, selectedLeadId]
  );

  async function loadLeads() {
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      setLeads(await rpc<Lead[]>('admin_get_leads', { p_token: token }));
    } catch {
      setError('Your admin session is invalid or expired. Please sign in again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadLeads();
  }, []);

  useEffect(() => {
    if (!selectedLead) return;
    setTopic(`${selectedLead.organization}: ${selectedLead.trigger_event}`);
    setEvidence(selectedLead.problem_description);
    setOffer(selectedLead.recommended_pitch || '');
    setKeyword(selectedLead.industry || '');
  }, [selectedLead]);

  function generate() {
    const cleanTopic = topic.trim();
    const cleanEvidence = evidence.trim();
    if (!cleanTopic || !cleanEvidence) {
      setError('Add a topic and evidence/context before generating content.');
      return;
    }
    setError('');
    const target = audience.trim() || 'operations and business leaders';
    const service = offer.trim() || 'a focused OPEX Ninja diagnostic or improvement engagement';
    const action = cta.trim() || `${window.location.origin}${base}assessment`;

    if (platform === 'LinkedIn') {
      setDraft(`${cleanTopic}\n\nContext: ${cleanEvidence}\n\nFor ${target}, the key question is not which improvement tool to apply first, but whether the problem is defined with enough evidence to select the right intervention. OPEX Ninja can support this through ${service}.\n\nIf this challenge is relevant to your organization, start here: ${action}${selectedLead?.source_url ? `\n\nSource used for this draft: ${selectedLead.source_url}` : ''}`);
      return;
    }

    if (platform === 'Instagram') {
      setDraft(`${cleanTopic}\n\n${cleanEvidence}\n\nOPEX Ninja helps teams turn operational problems into structured improvement actions.\n\nRelevant offer: ${service}\n\nLearn more: ${action}${keyword.trim() ? `\n\n#${keyword.trim().replace(/\s+/g, '')}` : ''}`);
      return;
    }

    setDraft(`SEO CONTENT BRIEF\n\nPrimary topic: ${cleanTopic}\nTarget audience: ${target}\nPrimary keyword/input: ${keyword.trim() || 'Not provided'}\nEvidence/context to use: ${cleanEvidence}\nRelevant OPEX Ninja offer: ${service}\nCTA: ${action}\n\nRecommended structure:\n1. Define the operational problem in the user's language.\n2. Explain why the issue persists and what evidence should be collected.\n3. Compare the relevant problem-solving or improvement approaches.\n4. Provide a practical step-by-step method.\n5. Add examples only where verified or explicitly supplied.\n6. Answer common buyer questions as FAQs.\n7. Link to the relevant OPEX Ninja service and diagnostic.\n\nRule: do not invent customer names, results, statistics, testimonials or market facts. Verify any external claim before publication.${selectedLead?.source_url ? `\n\nSource context: ${selectedLead.source_url}` : ''}`);
  }

  async function copyDraft() {
    await navigator.clipboard.writeText(draft);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  if (!token) {
    return <section className="min-h-screen bg-slate-950 px-6 py-24 text-white"><div className="mx-auto max-w-lg rounded-3xl border border-white/10 p-8"><ShieldCheck className="h-10 w-10 text-blue-400"/><h1 className="mt-5 text-3xl font-extrabold">Admin login required</h1><p className="mt-3 text-slate-300">Marketing Studio uses private lead data and is available only after an authenticated admin session.</p><a href={`${base}admin`} className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold">Go to Admin Login</a></div></section>;
  }

  return <section className="min-h-screen bg-slate-100 px-4 py-10 dark:bg-slate-950 sm:px-6"><div className="mx-auto max-w-7xl"><div className="flex flex-wrap items-center justify-between gap-3"><a href={`${base}admin`} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"><ArrowLeft className="h-4 w-4"/>Admin Dashboard</a><button onClick={()=>void loadLeads()} className="inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2 text-sm font-semibold dark:bg-slate-900"><RefreshCw className={`h-4 w-4 ${loading?'animate-spin':''}`}/>Refresh live lead data</button></div><p className="mt-7 font-semibold uppercase tracking-[.2em] text-orange-500">Input-driven workspace</p><h1 className="mt-2 text-4xl font-extrabold">Marketing & Promotion Studio</h1><p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">No prewritten market claims or fake campaign metrics. Content is generated only from your inputs or source-backed lead records currently stored in the private database.</p>{error&&<div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>}

<div className="mt-8 grid gap-6 lg:grid-cols-[.8fr_1.2fr]"><div className="space-y-5 rounded-3xl border bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><h2 className="text-xl font-bold">Content inputs</h2><label className="block text-sm font-semibold">Context source<select value={selectedLeadId} onChange={e=>setSelectedLeadId(e.target.value)} className="mt-2 w-full rounded-xl border p-3 dark:bg-slate-950"><option value="manual">Manual input</option>{leads.map(l=><option key={l.id} value={l.id}>{l.organization}</option>)}</select></label>{selectedLead&&<div className="rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-950"><div className="font-bold">Source-backed record</div><div className="mt-1 text-slate-500">{selectedLead.source_date || selectedLead.discovered_at.slice(0,10)}</div>{selectedLead.source_url&&<a href={selectedLead.source_url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-blue-600">Open source <ExternalLink className="h-4 w-4"/></a>}</div>}<label className="block text-sm font-semibold">Platform<select value={platform} onChange={e=>setPlatform(e.target.value as Platform)} className="mt-2 w-full rounded-xl border p-3 dark:bg-slate-950"><option>LinkedIn</option><option>Instagram</option><option>SEO Brief</option></select></label><label className="block text-sm font-semibold">Audience<input value={audience} onChange={e=>setAudience(e.target.value)} placeholder="e.g. Plant Heads, Quality Leaders, Shared Services Heads" className="mt-2 w-full rounded-xl border p-3 dark:bg-slate-950"/></label><label className="block text-sm font-semibold">Topic / business event<textarea value={topic} onChange={e=>setTopic(e.target.value)} rows={3} className="mt-2 w-full rounded-xl border p-3 dark:bg-slate-950"/></label><label className="block text-sm font-semibold">Verified evidence / problem context<textarea value={evidence} onChange={e=>setEvidence(e.target.value)} rows={5} className="mt-2 w-full rounded-xl border p-3 dark:bg-slate-950"/></label><label className="block text-sm font-semibold">Offer / service<input value={offer} onChange={e=>setOffer(e.target.value)} className="mt-2 w-full rounded-xl border p-3 dark:bg-slate-950"/></label><label className="block text-sm font-semibold">Keyword or industry<input value={keyword} onChange={e=>setKeyword(e.target.value)} className="mt-2 w-full rounded-xl border p-3 dark:bg-slate-950"/></label><label className="block text-sm font-semibold">CTA or destination URL<input value={cta} onChange={e=>setCta(e.target.value)} placeholder={`${window.location.origin}${base}assessment`} className="mt-2 w-full rounded-xl border p-3 dark:bg-slate-950"/></label><button onClick={generate} className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white"><Sparkles className="h-4 w-4"/>Generate from inputs</button></div>

<div className="rounded-3xl border bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><h2 className="text-xl font-bold">Generated draft</h2><p className="mt-2 text-sm text-slate-500">Editable output. Review factual statements before publishing.</p><textarea value={draft} onChange={e=>setDraft(e.target.value)} rows={24} placeholder="Complete the inputs and generate a draft." className="mt-4 w-full rounded-xl border bg-slate-50 p-4 text-sm leading-6 dark:bg-slate-950"/>{draft&&<button onClick={()=>void copyDraft()} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white"><Copy className="h-4 w-4"/>{copied?'Copied':'Copy draft'}</button>}</div></div></div></section>;
}
