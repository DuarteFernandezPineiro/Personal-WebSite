# Duarte Fernández Piñeiro — professional portfolio

Bilingual professional portfolio focused on applied artificial intelligence, GenAI, RAG and NLP. The repository contains the public Next.js experience, a Sanity authoring studio, shared typed content and a FastAPI professional assistant.

For repository orientation, start with [`docs/README.md`](docs/README.md). It routes each kind of change to the smallest relevant set of files.

## Local web development

```powershell
npm ci
npm run dev
```

Open `http://localhost:3000/es`. The site works without external credentials through the checked-in content fallback. If integrations are needed, copy only the relevant web variables from `.env.example` to `apps/web/.env.local`; the chat service uses its own `services/chat-api/.env`.

## Workspaces and services

- `apps/web` — public Next.js site and server routes.
- `apps/studio` — Sanity authoring studio.
- `packages/content` — bilingual content contracts and fallback data.
- `packages/ui` — shared primitives.
- `services/chat-api` — standalone streaming FastAPI assistant; it is not an npm workspace.

## Quality commands

```powershell
npm run check
npm run build
npm run test:chat
```

Installation, environment variables, lint, E2E and Docker instructions are documented in [`docs/development.md`](docs/development.md).
