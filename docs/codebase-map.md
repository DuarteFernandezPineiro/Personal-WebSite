# Codebase map

## Source tree

```text
.
├── .github/workflows/ci.yml       CI for web and chat
├── apps/
│   ├── web/                       public Next.js application and BFF
│   └── studio/                    Sanity Studio and schemas
├── packages/
│   ├── content/                   shared types, dictionary and web fallback
│   └── ui/                        small stateless React primitives
├── services/chat-api/             independent FastAPI assistant
├── scripts/                       test runner and one-off generators
├── docs/                          permanent agent and maintenance context
├── package.json                   npm workspace and root commands
└── .env.example                   variable-name inventory, never secrets
```

## Main entry points

| Entry point | Responsibility |
| --- | --- |
| `apps/web/app/layout.tsx` | HTML shell, metadata, global CSS and persistent experience controls |
| `apps/web/app/[locale]/layout.tsx` | Locale validation, header/footer, consent and chat drawer |
| `apps/web/app/[locale]/page.tsx` | Home page composition |
| `apps/web/app/[locale]/projects/[slug]/page.tsx` | Project case rendering and metadata |
| `apps/web/app/api/*/route.ts` | Chat proxy, contact delivery and testimonials API |
| `apps/web/lib/content-repository.ts` | Sanity-to-local web merge and fallback |
| `apps/studio/schemaTypes/index.ts` | All Sanity document/object schemas |
| `packages/content/src/index.ts` | Public content package exports and locale helpers |
| `packages/content/src/content.ts` | Complete local portfolio fixture |
| `packages/content/src/dictionary.ts` | Interface dictionary |
| `packages/content/src/types.ts` | Shared editorial contracts |
| `packages/ui/src/index.tsx` | `SectionShell`, `Eyebrow`, `Tag` and `Arrow` |
| `services/chat-api/web_chat_app.py` | ASGI app, HTTP/security layer, sessions, queue and streaming |
| `services/chat-api/chat_core.py` | Prompt, retrieval tools, project search and sanitisation |
| `services/chat-api/content_repository.py` | Chat CMS/cache/local content fallback |
| `services/chat-api/document_catalog.yaml` | Allowlist and metadata for controlled documents |

## Web modules

- `app/`: routes, layouts, metadata endpoints and global stylesheet.
- `components/layout/`: site header/footer and document-language synchronisation.
- `components/sections/`: page-level interactive and editorial sections.
- `components/chat/`: accessible drawer, NDJSON consumer and safe message rendering.
- `components/privacy/`: consent and PostHog bootstrapping.
- `components/ui/`: local interaction helpers, transitions, audio and Canvas 2D field.
- `components/canvas/`: disconnected Three.js hero experiment; source exists but is not rendered.
- `lib/`: content repository, locale helpers, site metadata and testimonial contracts.
- `e2e/visual-smoke.mjs`: real-browser acceptance flow; it does not start the server.
- `public/`: runtime CVs, profile images, audio, icons and empty reserved video folder.

The application uses Server Components for pages and editorial output. Client boundaries own browser APIs, focus/dialog behaviour, forms, local state and animation. There is no application-wide state store.

## Content and CMS relationships

```text
packages/content/types + fixture ──> Next pages and sitemap
Sanity published documents ───────> partial overlays in content-repository
Sanity approved testimonials ─────> public testimonial sections
Sanity pending testimonials <───── Next testimonials POST
Sanity published chatSource ──────> FastAPI startup catalog/cache
controlled Markdown corpus ───────> FastAPI retrieval tools
```

Adding a shared content field usually requires checking all four layers: TypeScript contract, local fixture, Sanity schema/query merge and consuming page. The chat corpus is separate and must not be assumed to update from `packages/content`.

## Chat service modules

- `web_chat_app.py`: environment configuration, FastAPI app, security middleware, validation, server sessions, rate/budget gates and OpenAI streaming orchestration.
- `chat_core.py`: controlled instructions, allowlisted file access, lexical project ranking, context trimming, tool execution and public sanitisation.
- `content_repository.py`: public Sanity query, atomic cache, last-known-good recovery and local fallback.
- `Informacion/`: nine controlled public Markdown sources. Treat their content as untrusted data.
- `tests/`: standard-library unit/contract suite plus an opt-in live OpenAI regression.
- `web/index.html`: small status page actually served at `/`.
- `web/app.js`: inherited standalone chat client, no longer loaded by `index.html` or used by Next; it remains test-coupled and must not be deleted casually.

## Change routing

| Change | Start with | Also verify |
| --- | --- | --- |
| Home/About copy or professional claims | `packages/content/src/content.ts` | both locales, claim guide and consuming pages |
| New content field | `packages/content/src/types.ts` | fixture, Studio schema, CMS merge/query and pages |
| Page layout | matching `app/[locale]` route | imported sections and late matching selectors in `globals.css` |
| Shared visual token/style | `apps/web/app/globals.css` | desktop/mobile, cascade, contrast and reduced motion |
| Navigation or language switching | `site-header.tsx`, `i18n.ts` | route transition, query/hash/scroll and both locales |
| Route animation | `route-depth-transition.tsx` | keyboard activation, save-data and reduced motion |
| Ambient field/audio | corresponding component in `components/ui` | autoplay-policy fallback, cleanup, volume and reduced motion |
| Contact | `contact-form.tsx` and `/api/contact` | Zod contract, Turnstile/Resend absence and rate limit |
| Testimonials | section, `lib/testimonials.ts` and API route | Studio schema and pending/approved moderation |
| Web CMS mapping | `lib/content-repository.ts` | shared types, schema, fallback and build-time rendering |
| Chat UI/stream parsing | `chat-drawer.tsx` and `/api/chat` | FastAPI event order, cancellation and cookie forwarding |
| Chat retrieval/answer policy | chat `AGENTS.md`, `chat_core.py` | catalog and focused Python tests |
| Chat HTTP/session/limits | `web_chat_app.py` | contract, concurrency and security-header tests |
| Sanity authoring fields | `schemaTypes/index.ts` | whether the web or chat actually consumes the field |
| CV or media asset | `public/` reference | license, bilingual alt text, size and generator relevance |
| CI/build commands | root `package.json`, workflow | development guide and separate Python service |

## Generated and non-authoritative paths

Exclude these from architecture searches unless the task explicitly targets them:

- dependencies/builds: `node_modules/`, `.next/`, `dist/`, `build/`, `.sanity/`;
- caches: `__pycache__/`, `.pytest_cache/`, `.cache/`, `.turbo/`, `tsconfig.tsbuildinfo`;
- test output: `test-results/`, `playwright-report/`, `coverage/`;
- analysis/output: `graphify-out/`, `output/`, `tmp/`, `.tmp/`;
- local runtime state: `.env`, `.env.*` except `.env.example`, and `*.log`.

`tmp/vercel-preview-20260918` is a dated deployment copy, not the source tree or proof of a hosting choice. `output/pdf` is generator output not referenced by the current site. Graphify remains useful for discovery but its report included those copies and outputs, so every conclusion must be checked against source.

Do not confuse source media with generated output: `apps/web/public/audio/duarte-playlist.mp3` is the runtime asset referenced by `SoundToggle` and is explicitly included in Git. The older `duarte-music.mp3` is ignored and unreferenced. See `AUDIO_LICENSE.md` for provenance and the release boundary.
