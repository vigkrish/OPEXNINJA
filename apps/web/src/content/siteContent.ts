import type { ContentPageProps } from '@/pages/ContentPage';

export const pageContent: Record<string, ContentPageProps> = {
  about: {
    eyebrow: 'About OPEX Ninja',
    title: 'Operational Excellence with practical AI and automation.',
    intro: 'OPEX Ninja helps organizations improve the way work gets done by combining Lean thinking, continuous improvement, digital transformation, analytics and responsible AI adoption.',
    sections: [
      { title: 'Our Mission', text: 'Help organizations remove operational friction, improve control and build scalable ways of working that deliver measurable business outcomes.' },
      { title: 'How We Work', text: 'We start small, validate the opportunity, prioritize by impact and feasibility, then support implementation and sustainment.', bullets: ['Evidence before assumptions', 'Business outcomes before tools', 'Practical change before transformation theatre'] },
      { title: 'What Makes Us Different', text: 'Our model combines operational excellence with technology execution instead of treating Lean, analytics, automation and AI as separate programs.' },
      { title: 'Where We Add Value', text: 'Complex operations, manual workflows, KPI gaps, ERP change, compliance pressure and teams that need a more disciplined improvement system.' },
    ],
  },
  services: {
    eyebrow: 'Services',
    title: 'Consulting services designed around measurable outcomes.',
    intro: 'Engagements are structured to help organizations diagnose performance gaps, improve processes, automate repetitive work and build stronger management systems.',
    sections: [
      { title: 'Operational Excellence', text: 'Lean transformation, Kaizen, value stream mapping, process redesign, cost reduction, productivity improvement and KPI systems.', bullets: ['Operational diagnostics', 'Kaizen facilitation', 'Process redesign', 'Performance management'] },
      { title: 'AI & Automation', text: 'AI readiness, business use-case prioritization, Microsoft Copilot adoption and workflow automation that complements existing operations.', bullets: ['AI opportunity assessment', 'Power Automate', 'Copilot adoption', 'Workflow redesign'] },
      { title: 'Performance Intelligence', text: 'Management reporting, KPI architecture, Power BI dashboards and analytics that make operational performance easier to understand and act on.', bullets: ['KPI architecture', 'Power BI', 'Executive dashboards', 'Operational analytics'] },
      { title: 'Digital & ERP Transformation', text: 'Process digitization, SAP/ERP readiness, transformation assurance and workflow redesign to improve technology value realization.' },
      { title: 'Risk, ISO & Governance', text: 'Risk reviews, governance, management systems, ISO readiness, internal audits and control improvement.' },
      { title: 'Training & Capability Building', text: 'Lean, Kaizen, root cause analysis, problem solving, AI for business, Power BI and change management workshops.' },
    ],
  },
  industries: {
    eyebrow: 'Industries',
    title: 'Built for operations where complexity creates hidden cost.',
    intro: 'OPEX Ninja is suited to organizations with process complexity, cross-functional handoffs, manual work, ERP dependencies, compliance requirements or pressure to improve productivity.',
    sections: [
      { title: 'Manufacturing & Industrial', text: 'Manufacturing, automotive components, electronics, packaging and process-intensive operations.', bullets: ['Cycle-time reduction', 'Quality improvement', 'Capacity and productivity', 'Digital shop-floor workflows'] },
      { title: 'FMCG & Pharmaceuticals', text: 'Operational improvement for regulated and high-volume environments where quality, speed and control matter simultaneously.' },
      { title: 'Shared Services & BPO', text: 'Reduce manual effort, improve service levels, strengthen KPI governance and identify automation opportunities.' },
      { title: 'Banking, Insurance & Technology', text: 'Process optimization, controls, analytics, automation and AI enablement for service-intensive functions.' },
    ],
  },
  'case-studies': {
    eyebrow: 'Case Studies',
    title: 'Evidence-led transformation, documented responsibly.',
    intro: 'This section is being prepared using anonymized and client-approved examples. We do not publish customer names, testimonials or savings figures without permission.',
    sections: [
      { title: 'Operational Improvement', text: 'Case-study format: challenge, baseline, root cause, intervention, measurable outcome and sustainment approach.' },
      { title: 'Automation & Analytics', text: 'Examples will show how workflow redesign, dashboards and automation reduce manual effort and improve management visibility.' },
      { title: 'Transformation Assurance', text: 'Examples will cover ERP, risk, ISO and governance interventions where stronger controls improve implementation confidence.' },
      { title: 'Have a Similar Challenge?', text: 'Start with a discovery conversation and we will determine whether a diagnostic or focused sprint is appropriate.' },
    ],
  },
  resources: {
    eyebrow: 'Resources',
    title: 'Practical tools for better operations.',
    intro: 'The OPEX Ninja resource center will contain concise guides, templates and insights on continuous improvement, AI, automation and performance management.',
    sections: [
      { title: 'Operational Excellence', text: 'Kaizen, Lean, root cause analysis, KPI design, process mapping and continuous improvement guidance.' },
      { title: 'AI for Operations', text: 'Practical AI adoption, responsible use, business use cases, Copilot and AI-readiness guidance.' },
      { title: 'Automation & Analytics', text: 'Power Automate, Power BI, Excel automation and digital workflow insights.' },
      { title: 'Templates & Diagnostics', text: 'Future downloadable assessment tools, checklists and improvement templates will be made available here.' },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Start with one operational challenge.',
    intro: 'Tell us where performance is being lost, work is too manual, controls are weak or technology is not delivering enough value. We will help identify the most practical next step.',
    sections: [
      { title: 'Discovery Call', text: 'A focused conversation to understand the business problem, expected outcome, urgency and current constraints.' },
      { title: 'Transformation Diagnostic', text: 'Where appropriate, the next step is a structured diagnostic covering process efficiency, KPI maturity, automation potential and AI readiness.' },
      { title: 'Engagement Options', text: 'Typical delivery models include focused assessments, Kaizen sprints, implementation projects, training and longer-term advisory support.' },
      { title: 'What to Prepare', text: 'A short description of the challenge, affected process, approximate scale and what success would look like.' },
    ],
    ctaTitle: 'Ready to discuss your challenge?',
    ctaText: 'Use the diagnostic form on the homepage to request a discovery conversation with OPEX Ninja.',
  },
  assessment: {
    eyebrow: 'OPEX Ninja Diagnostic',
    title: 'Find the highest-value improvement opportunities first.',
    intro: 'The OPEX Ninja Transformation Diagnostic is designed to identify operational waste, KPI gaps, automation opportunities and practical AI use cases before committing to a larger program.',
    sections: [
      { title: '1. Process Efficiency', text: 'Assess delays, rework, handoffs, bottlenecks, standardization gaps and waste.' },
      { title: '2. Cost & Performance', text: 'Review KPI maturity, cost visibility, service levels, capacity and management routines.' },
      { title: '3. Automation Potential', text: 'Identify repetitive work, rule-based tasks, manual reporting and workflow friction suitable for automation.' },
      { title: '4. AI Readiness', text: 'Identify realistic AI use cases, data dependencies, governance needs and adoption risks.' },
      { title: '5. Prioritized Roadmap', text: 'Rank opportunities by impact, feasibility, risk and implementation effort and translate them into a 90-day action plan.' },
      { title: 'Typical Output', text: 'An executive summary, opportunity map, prioritized initiatives, indicative impact and recommended next steps.' },
    ],
  },
};
