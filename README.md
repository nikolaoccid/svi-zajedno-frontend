# Svi Zajedno web app

Web client for an activity and attendance tracker used by the Croatian NGO Svi Zajedno. It started as my bachelor's thesis and has been in production since 2023.

The API is in [svi-zajedno-backend](https://github.com/nikolaoccid/svi-zajedno-backend).

## What it does

- Activities and categories, with the students attending each one
- School years, with students enrolled per year
- Project associates and project users
- Statistics dashboards per school year (Recharts)
- Global search, user settings, login with role-based routes
- Croatian and English (i18next)

## Stack

React 18, TypeScript, Vite, React Router, TanStack Query, i18next, Recharts, Emotion.

The API client in `src/api/codegen` is generated from the backend's OpenAPI document with `openapi-generator` (`typescript-axios`), so request and response types match the server.

## Run it locally

```bash
npm install
cp .env.example .env     # point VITE_API_URL at a running backend
npm run dev
```

To refresh the generated client while the backend runs on port 3001: `npm run codegen`.

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Type check, then production build |
| `npm run preview` | Serve the production build |
| `npm run lint` | ESLint |

## Configuration

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Base URL of the backend |
| `VITE_HIDE_LANGUAGE_PICKER` | Hide the language switcher |
| `VITE_DEMO_MODE` | Pre-fill a demo login (needs the two demo variables below) |
| `VITE_DEMO_EMAIL`, `VITE_DEMO_PASSWORD` | Demo account for `VITE_DEMO_MODE` |

## Status

Production code from a thesis project. It has no automated tests yet.
