# OPEX Ninja

**Operational Excellence Consulting and Transformation**

OPEX Ninja helps organizations identify operational improvement opportunities, deliver focused transformation, and sustain performance across:

- Process Excellence / Lean Six Sigma
- SAP / ERP Transformation
- Cybersecurity & Risk
- ISO Certification Consulting & Implementation

## Commercial model

1. **Quick Feasibility Check** — 3–10 day rapid diagnostic.
2. **30-Day Transformation Sprint** — focused, measurable operational improvement.
3. **Long-Term Surveillance & Optimization** — recurring audits, KPI reviews and continuous improvement.
4. **OPEXaaS** — ongoing operational excellence advisory and performance governance.

## Website

The public website is in `apps/web`.

```bash
npm install
npm run dev:web
npm run build:web
```

### GitHub Pages

A GitHub Actions workflow at `.github/workflows/deploy.yml` builds `apps/web` and deploys it to GitHub Pages.

Expected initial URL:

`https://vigkrish.github.io/OPEXNINJA/`

The workflow uses:

`VITE_BASE_PATH=/OPEXNINJA/`

and the production API:

`https://opexninja-api.onrender.com/api`

For a custom domain, change `VITE_BASE_PATH` to `/` in the workflow/Vite configuration and update the canonical URL in `apps/web/index.html`.

## API

The Express API is in `apps/api`.

```bash
npm run dev:api
npm run build:api
```

The API exposes:

`GET /health`

`POST /api/contact`

Contact enquiries are stored through Prisma/PostgreSQL.

### Production API

A Render Blueprint is included in `render.yaml`.

Deploy the blueprint to create:

- Web service: `opexninja-api`
- PostgreSQL database: `opexninja-db`

Required production environment:

- `DATABASE_URL` — supplied by Render
- `CORS_ORIGIN` — set to the website origin
- `NODE_ENV=production`

## Contact

**Email:** contactus.opexninja@gmail.com  
**Phone:** +91 91768 16218  
**Location:** Chennai, India  
**LinkedIn:** Coming soon

## Before custom-domain launch

Update:

- canonical URL in `apps/web/index.html`
- Open Graph URL in `apps/web/index.html`
- `VITE_BASE_PATH` from `/OPEXNINJA/` to `/`
- `CORS_ORIGIN` on the API to include the custom domain

Do not commit passwords, API keys, database credentials, or other secrets.
