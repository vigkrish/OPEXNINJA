# OPEX Ninja

Operational Excellence Consulting and Transformation.

## Commercial model

1. **Quick Feasibility Check** — 3–10 day rapid diagnostic.
2. **30-Day Transformation Sprint** — focused, measurable operational improvement.
3. **Long-Term Surveillance & Optimization** — recurring audits, KPI reviews and continuous improvement.

Core capabilities:

- Process Excellence / Lean Six Sigma
- SAP / ERP Transformation
- Cybersecurity & Risk
- ISO Certification Consulting & Implementation

## Website

The public website is in `apps/web`.

### Local development

```bash
npm install
npm run dev:web
```

### Production build

```bash
npm run build:web
```

### GitHub Pages

The included workflow deploys `apps/web/dist` to GitHub Pages on pushes to `main`.

If using a custom domain, change `VITE_BASE_PATH` to `/` in the workflow and Vite config, then add the custom domain through GitHub Pages settings.

## Lead form

The website uses the existing API endpoint:

`POST /api/contact`

Set `VITE_API_URL` in the deployment environment to the public API base URL, for example:

`https://api.example.com/api`

Do not commit secrets or private credentials.

## Before launch

Replace the following placeholders in `apps/web/src/components/organisms/Footer.tsx`:

- `YOUR_EMAIL`
- `YOUR_PHONE`
- `YOUR_LOCATION`
- `YOUR_LINKEDIN_URL`

Also update the canonical/OG URLs in `apps/web/index.html` when the final domain is confirmed.
