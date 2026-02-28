# PRD

---

## 1. Vision & Goals

Build a **dynamic, API-driven admin dashboard** inspired by [Hasura Console](https://hasura.io/)—a single-page application (SPA) that talks to a Django backend exclusively via REST/API. Unlike the traditional Django Admin (server-rendered, static forms), this dashboard will be:

- **UI in Vue 3** (TypeScript, Vite) in the `web/` frontend
- **Backend in Django** (Python) exposing APIs for all operations
- **Fully dynamic**: data, schema, and UI state driven by API responses rather than server-rendered HTML

The goal is to provide a modern, fast, and extensible “backend development kit” experience: browsing data, managing schema/metadata, and operating the system through a rich client-side UI.

---

## 2. Target Users

- **Developers** configuring and operating the backend
- **Power users / internal ops** who need to inspect data, run operations, and manage permissions or metadata

---

## 3. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  Web (Vue 3 SPA)                                                 │
│  - Vite + TypeScript                                             │
│  - Router, state (Pinia or similar), API client (fetch/axios)    │
│  - All UI and navigation client-side                             │
└───────────────────────────┬─────────────────────────────────────┘
                             │ HTTP/REST (JSON)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  Django Backend (Python)                                         │
│  - REST API only (no server-rendered admin pages)                │
│  - Auth (e.g. session, JWT, or token) for dashboard users         │
│  - CORS configured for web origin                                │
└─────────────────────────────────────────────────────────────────┘
```

- **Frontend:** `web/` — Vue 3, TypeScript, Vite. Serves the SPA; in dev, Vite dev server; in production, static build can be served by Django or a CDN.
- **Backend:** Django project (e.g. root or `backend/`/`api/`) plus apps like `rubbie`. All dashboard features are exposed as **APIs** (e.g. REST or GraphQL later); no reliance on Django’s built-in admin templates for the main dashboard.

---

## 4. Core Features (Hasura-like Scope)

Features below are phrased as product goals; implementation order can be defined in phases.

| Area | Description |
|------|-------------|
| **Data browser** | Navigate and list tables/collections; view rows with filtering, sorting, pagination. All via API. |
| **API explorer** | Run queries or commands (e.g. REST or future GraphQL) from the UI with editable request body, headers, and view response. |
| **Schema / metadata** | View and edit schema or metadata (tables, columns, relations) that the backend uses. Stored and updated via API. |
| **Permissions & roles** | Define roles and rules for who can access what; manage via UI, persisted via API. |
| **Migrations / versioning** | List and optionally run or rollback schema/data migrations; status and history from API. |
| **Events / actions** | (Optional) Configure webhooks, events, or server actions and see logs/status. |
| **Settings & config** | Connection/config overview, feature flags, env hints (non-secret). |

The dashboard should feel like a **single app**: sidebar navigation, breadcrumbs, modals, and tabs—all driven by API data.

---

## 5. Non-Goals (Out of Scope for This PRD)

- Replacing Django Admin entirely for every use case (e.g. quick one-off CRUD can stay in Django Admin if desired).
- Public-facing product UI (this is an internal/developer dashboard).
- Real-time subscriptions in v1 (can be added later).

---

## 6. Project Structure

Recommended layout that keeps **web (Vue)** and **Python (Django)** clearly separated and consistent with your existing repo.

```
django-rubbie/
├── PRD.md                    # This document
├── README.md
├── pyproject.toml            # Python deps (Django, etc.)
├── uv.lock
├── .python-version
├── .venv/
│
├── config/                   # Django project settings (optional; or at repo root)
│   ├── __init__.py
│   ├── settings/
│   │   ├── base.py
│   │   ├── development.py
│   │   └── production.py
│   ├── urls.py
│   └── wsgi.py
│
├── rubbie/                   # Django app(s) – business logic + API
│   ├── migrations/
│   ├── api/                  # API layer (views, serializers, schemas)
│   │   ├── __init__.py
│   │   ├── urls.py
│   │   ├── views/
│   │   └── serializers/
│   ├── models.py
│   ├── admin.py              # Optional: classic Django admin for fallback
│   ├── views.py
│   └── ...
│
├── web/                      # Vue 3 SPA – dashboard UI
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── vite.config.ts
│   ├── tsconfig.json
│   │
│   ├── index.html
│   └── src/
│       ├── main.ts
│       ├── App.vue
│       ├── api/              # API client (base URL, auth, endpoints)
│       │   ├── client.ts
│       │   └── ...
│       ├── router/
│       ├── stores/           # State (e.g. Pinia)
│       ├── views/            # Route-level pages
│       │   ├── Dashboard.vue
│       │   ├── DataBrowser.vue
│       │   └── ...
│       ├── components/
│       │   ├── layout/       # Sidebar, header, breadcrumbs
│       │   └── ...
│       └── assets/
│
└── manage.py                 # If using classic Django layout; or django-admin from pyproject script
```

- **Backend:** All dashboard behaviour is implemented as **APIs** under something like `/api/` (or versioned `/api/v1/`). The Vue app is the only consumer of these APIs for the dashboard.
- **Frontend:** Single entry (`index.html` + `main.ts`), router for dashboard routes, `api/` for HTTP calls, `stores/` for global state, `views/` for full pages, `components/` for reuse.

---

## 7. Tech Stack Summary

| Layer | Choice | Notes |
|-------|--------|--------|
| Frontend framework | Vue 3 | Composition API, `<script setup>`, TypeScript |
| Build / dev server | Vite | Fast HMR, simple config |
| Language (frontend) | TypeScript | Typed API contracts, better DX |
| Backend | Django 5.x | APIs, auth, ORM, migrations |
| API style | REST (JSON) | Start here; GraphQL can be a later option |
| Auth (dashboard) | TBD | Session, JWT, or token; must work with SPA + CORS |

---

## 8. Key Workflows (To Be Detailed Later)

1. **Login** → Frontend calls auth API → receives token/session → subsequent requests send credentials.
2. **Data browser** → Frontend requests list of tables and then rows for a table (with filters, sort, page) → renders tables and controls.
3. **API explorer** → User edits method, URL, body, headers → Frontend sends request (or proxies via backend) → display response.
4. **Schema / metadata** → Load and display current schema; edits sent via PATCH/POST to API → backend persists and returns updated schema.

These can be broken into user stories and acceptance criteria in a separate doc or in this PRD.

---

## 9. Success Criteria

- Dashboard is a **Vue SPA** that uses **no server-rendered Django admin pages** for its core flows.
- All core flows (browse data, explore API, view/edit schema, etc.) work by **calling Django APIs** and rendering the responses in the UI.
- Project structure clearly separates `web/` (Vue) and Django app(s), with a single place for API definitions and client usage in `web/src/api/`.
- PRD is living doc: you can refine features, add phases, and move items between “in scope” and “later” as you go.

---

## 10. Testing the app locally

The `rubbie` app is a standalone Django app meant to be installed in Django projects. To test it in this repo without publishing:

1. **Use the in-repo test project** — `test_project/` is a minimal Django site with `rubbie` in `INSTALLED_APPS` and SQLite.

2. **Run from repo root** so the local `rubbie` package is on the path:
   - **Server:** `PYTHONPATH=. uv run python test_project/manage.py runserver`  
     Or: `./scripts/run-test-server.sh`
   - **Migrations:** `PYTHONPATH=. uv run python test_project/manage.py migrate`  
     (Run `makemigrations` from the app when you add models: `PYTHONPATH=. uv run python test_project/manage.py makemigrations rubbie`)
   - **Tests:** `PYTHONPATH=. uv run python test_project/manage.py test rubbie`

3. **Optional:** Use pytest with `DJANGO_SETTINGS_MODULE=test_project.settings` and run `pytest rubbie/` from repo root (add `pytest-django` to dev deps if you prefer pytest).

---

## 11. Next Steps

1. **Refine this PRD** — Add/remove features, set phases (e.g. Phase 1: auth + data browser + API explorer).
2. **Confirm project structure** — Add `config/` (or equivalent), `rubbie/api/`, and align `web/src/` with the structure above.
3. **Define API contract** — List endpoints (e.g. `GET /api/tables`, `GET /api/tables/:name/rows`, etc.) and auth method.
4. **Spike:** Login + one data-browser screen end-to-end (Vue → Django API → DB).
5. **Iterate:** Add schema UI, permissions, migrations, etc. per priority.

---

*You can now use this PRD to align the codebase and plan; adjust sections (especially §4, §6, §8) as you lock in specs.*
