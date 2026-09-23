# Development

## Prerequisites

- Node.js 22 or newer.
- npm 10 or newer.
- Python 3.11 or 3.12 for the chat service.
- A Chromium browser for the Playwright smoke flow.
- Docker only when building the chat container.

The repository uses npm lockfile v3. Prefer `npm ci` for a clean deterministic installation.

## Install and run the web

From the repository root:

```powershell
npm ci
npm run dev
```

Open `http://localhost:3000/es`. No external credentials are required for the public pages: missing Sanity configuration selects the typed fallback, while forms and analytics expose controlled disabled/unavailable states.

When integrations are needed, create `apps/web/.env.local` and copy only the relevant names from the root `.env.example`. Do not copy secrets into Markdown, screenshots or `NEXT_PUBLIC_*` variables.

## Run Sanity Studio

```powershell
npm run dev:studio
```

Provide `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` to the Studio process. The checked-in `replace-me` fallback lets configuration load but is not a usable project.

## Install and run the chat service

Create and activate a virtual environment, then install the pinned requirements:

```powershell
py -3.12 -m venv .venv
.venv\Scripts\python.exe -m pip install -r services/chat-api/requirements.txt
Set-Location services/chat-api
..\..\.venv\Scripts\python.exe -m uvicorn web_chat_app:app --reload
```

FastAPI calls `load_dotenv`; local chat variables belong in `services/chat-api/.env` or the process environment. The service exposes `/healthz`, `/readyz`, `/api/health`, `/api/chat` and a small status page at `/`.

For the integrated drawer, configure the Next server with `CHAT_API_URL=http://127.0.0.1:8000`. `NEXT_PUBLIC_CHAT_API_URL` remains a backward-compatible server-side fallback but unnecessarily exposes the backend address in a public-prefixed variable.

## Build commands

```powershell
npm run build
npm run build:all
```

- `build` typechecks `packages/content` and creates the production Next build.
- `build:all` invokes every workspace build script, including Sanity Studio and the no-emit UI/content checks.
- Shared packages are consumed directly from TypeScript source; their build scripts do not emit packages.
- The Next application is server-capable, not a static export.

Build the chat container with its service directory as context:

```powershell
docker build -t duarte-chat-api services/chat-api
```

The image runs as a non-root user with one Uvicorn worker and `${PORT:-8000}`.

## Tests, typecheck and lint

```powershell
npm run check
npm run build
npm run test:chat
npm run lint --workspace @duarte/web
```

- `check` runs typecheck in all four npm workspaces, then the Vitest suites in web and content.
- `test:chat` uses `scripts/run_chat_tests.py` to discover the Python unittest suite with the correct import path.
- The live OpenAI regression is skipped unless `RUN_LIVE_OPENAI_TESTS=1`; never enable it without explicit credentials and intent.
- ESLint is not included in `check` or CI. At the onboarding baseline it reports four `react-hooks/set-state-in-effect` errors and three warnings. Documentation-only work must not claim lint is green; code work should run it and avoid adding new findings unless it explicitly fixes the baseline.

## Browser smoke flow

The smoke script does not start a server. In one terminal:

```powershell
npm run dev
```

In another:

```powershell
npm run test:e2e
```

Override the target with `PLAYWRIGHT_BASE_URL`. `PLAYWRIGHT_CHROMIUM_EXECUTABLE` can point to a specific Chromium binary. The flow writes screenshots and artifacts under `test-results/visual-smoke`, which is not source.

Set Playwright overrides in the invoking shell; this standalone Node script does not load Next or FastAPI dotenv files.

Use it for visible changes. It covers desktop, widescreen, 390 px mobile, reduced motion, ES/EN navigation, carousel, consent, audio, mocked chat/testimonials, projects, About, Contact, Privacy and CV access.

## Environment variable inventory

Values below are names and code defaults only. Local `.env` files are sensitive and are never documentation input.

### Next web and E2E

| Variable | Required | Purpose/default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical public URL; defaults to `http://localhost:3000` |
| `CHAT_API_URL` | For integrated chat | Server-only FastAPI origin; preferred over the public-prefixed fallback |
| `NEXT_PUBLIC_CHAT_API_URL` | No | Legacy fallback for chat origin; defaults to localhost |
| `CHAT_PROXY_SECRET` | Production chat | Long random server-only value; set the identical value in Vercel and FastAPI |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | No | Enables public Sanity reads and testimonial storage setup |
| `NEXT_PUBLIC_SANITY_DATASET` | No | Defaults to `production` |
| `SANITY_API_WRITE_TOKEN` | For testimonial submission | Server-only Sanity mutation token |
| `RESEND_API_KEY` | For contact delivery and testimonial alerts | Server-only Resend credential |
| `CONTACT_FROM_EMAIL` | For contact delivery and testimonial alerts | Verified sender |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | No | Loads the client challenge when configured |
| `TURNSTILE_SECRET_KEY` | No | Enables server verification |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | Public analytics project key; analytics remains consent gated |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | Defaults to the EU PostHog host |
| `PLAYWRIGHT_BASE_URL` | No | Smoke target; defaults to `http://localhost:3000` |
| `PLAYWRIGHT_CHROMIUM_EXECUTABLE` | No | Optional browser executable for smoke tests |

### Sanity Studio

| Variable | Required | Purpose/default |
| --- | --- | --- |
| `SANITY_STUDIO_PROJECT_ID` | Yes for a usable Studio | Falls back to the non-functional `replace-me` placeholder |
| `SANITY_STUDIO_DATASET` | No | Defaults to `production` |

### FastAPI chat and providers

| Variable | Required | Purpose/default |
| --- | --- | --- |
| `OPENAI_API_KEY` | For readiness/chat | OpenAI credential |
| `OPENAI_MODEL` | No | Overrides the model declared by `chat_core` |
| `OPENAI_TIMEOUT_SECONDS` | No | Provider timeout; default 90 |
| `OPENAI_MAX_RETRIES` | No | SDK retry count; default 2 |
| `OPENAI_REASONING_EFFORT` | No | Default `low` |
| `OPENAI_MAX_OUTPUT_TOKENS` | No | Overrides per-detail response limits |
| `OPENAI_PLANNING_MAX_OUTPUT_TOKENS` | No | Planning cap; default 2000 |
| `OPENAI_GENERATION_ATTEMPTS` | No | Incomplete-response attempts; default 2 |
| `CHAT_ALLOWED_ORIGINS` | Production | Explicit CORS/browser origins; local origins default in development |
| `CHAT_ALLOWED_HOSTS` | Production | Trusted hosts; local hosts default in development |
| `CHAT_PROXY_SECRET` | Production | Authenticates the Next proxy; must match Vercel and is never exposed to the browser |
| `CHAT_COOKIE_SECURE` | Production | Default `false`; enable behind HTTPS |
| `CHAT_ENABLE_HSTS` | No | Default `false` |
| `CHAT_PUBLIC_ORIGIN` | No | Public service origin used by proxy-safety checks |
| `KOYEB_PUBLIC_DOMAIN` | No | Additional trusted host when the platform supplies it |
| `CHAT_MAX_CONCURRENT_GENERATIONS` | No | Default 2 |
| `CHAT_MAX_QUEUED_GENERATIONS` | No | Default 20 |
| `CHAT_MAX_REQUESTS_PER_MINUTE` | No | Default 12 per client |
| `CHAT_SESSION_TTL_SECONDS` | No | Default 3600 |
| `CHAT_MAX_SESSIONS` | No | Default 500 |
| `CHAT_MAX_TRACKED_CLIENTS` | No | Default 2000 |
| `CHAT_MAX_MONTHLY_REQUESTS` | No | In-process monthly request fuse; code default 1000 |
| `CHAT_CONTENT_TTL_SECONDS` | No | Repository TTL; default 300, applied during catalog construction |
| `SANITY_PROJECT_ID` | No | Enables public chatSource reads |
| `SANITY_DATASET` | No | Defaults to `production` |
| `POSTHOG_PUBLIC_KEY` | No | Public key exposed only by the inherited chat config endpoint |
| `POSTHOG_HOST` | No | Must match the service allowlist; EU host by default |
| `RUN_LIVE_OPENAI_TESTS` | Tests only | Set to `1` only for the explicit live regression |

`SANITY_API_READ_TOKEN` is not used: all current Sanity reads are public and filtered in their queries.

## Production topology and secrets

Use two deployments:

1. Deploy `apps/web` to Vercel as the Next.js project. Keep monorepo source outside the app root available so the build can resolve `packages/content` and `packages/ui`. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin, `CHAT_API_URL` to the public FastAPI origin and a long random `CHAT_PROXY_SECRET`.
2. Deploy `services/chat-api` from its Dockerfile to a container host. Keep one worker because sessions, rate limits, queue state and the monthly budget are process-local. Configure the final web origin in `CHAT_ALLOWED_ORIGINS`, the service hostname in `CHAT_ALLOWED_HOSTS`, the same `CHAT_PROXY_SECRET`, and set `CHAT_COOKIE_SECURE=true` behind HTTPS.

`OPENAI_API_KEY` belongs only in the chat service provider's encrypted environment-variable settings. Never put it in Vercel's `NEXT_PUBLIC_*` variables, browser code, HTML, Sanity, or a committed `.env` file. The browser calls the same-origin Next `/api/chat` route; the Next server authenticates to FastAPI with `CHAT_PROXY_SECRET`, and only FastAPI reads the OpenAI key.

For messages and reviews, configure `RESEND_API_KEY` and a verified `CONTACT_FROM_EMAIL` on the Vercel web project. The recipient is deliberately not configurable: both contact mail and testimonial alerts use `profile.email`, currently `dfernandezpineiro@gmail.com`. Configure `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` and the server-only `SANITY_API_WRITE_TOKEN`; submissions are stored as pending, reviewed in Sanity Studio and become visible on both Home and About after approval and cache refresh.

Before launch, verify the sender domain in Resend, create a least-privilege Sanity write token, configure Turnstile for the final hostname, and exercise one real contact message, one testimonial submission/approval and one chat query against the production URLs.

## Validation ladder

1. Inspect the smallest affected route/module and its scoped `AGENTS.md`.
2. Run `npm run check` and `npm run build` for frontend, content or Studio-facing changes.
3. Run `npm run test:chat` for chat, shared professional data or stream-contract changes.
4. Run lint for TypeScript/React work and compare with the recorded baseline.
5. Run the browser smoke flow for visible work; verify both locales, mobile/desktop, keyboard, reduced motion and missing credentials.
6. Confirm no secrets, private identifiers or unpublished CMS data appear in source, fixtures, logs or screenshots.

At the current baseline, `check` passes 18 Vitest tests across web and content, the Next build produces 26 route outputs and the Python suite passes 36 tests with one live test skipped.
