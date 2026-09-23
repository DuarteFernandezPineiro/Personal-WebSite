# Project context index

This is the low-token entry point for future Codex sessions. Read this page, select one task pack and inspect only the source files it routes to. Generated folders, local environment files, media binaries and Graphify output are not architectural context.

| Task | Read first | Then inspect |
| --- | --- | --- |
| Understand boundaries or make a cross-cutting change | [`architecture.md`](architecture.md) | [`codebase-map.md`](codebase-map.md) and affected scoped `AGENTS.md` files |
| Change layout, motion or accessibility | [`UI_SYSTEM.md`](UI_SYSTEM.md) | `apps/web/AGENTS.md`, the target route/component and matching CSS ranges |
| Edit biography, projects or claims | [`CONTENT_AND_CLAIMS.md`](CONTENT_AND_CLAIMS.md) | `packages/content/AGENTS.md` and targeted content/type ranges |
| Change chat behaviour or security | `services/chat-api/AGENTS.md` | [`security-chat.md`](security-chat.md), [`architecture.md`](architecture.md), contract tests and the affected Python module |
| Configure Sanity or shared content | [`architecture.md`](architecture.md) | Studio schema, content repository and shared types |
| Install, test, build or configure services | [`development.md`](development.md) | `.env.example`, package scripts and relevant provider code |
| Find the file for a specific change | [`codebase-map.md`](codebase-map.md) | Only the listed entry points and their imports |
| Review established architectural choices | [`decisions.md`](decisions.md) | The cited source or test |

## Stable project shape

- `apps/web` is the main public interface and BFF.
- `apps/studio` edits Sanity documents.
- `packages/content` provides the complete bilingual web fallback; `packages/ui` provides small primitives.
- `services/chat-api` is an independent FastAPI service with its own controlled corpus and retrieval flow.
- External credentials are optional for local web rendering and must fail into useful, private fallback states.

Specialised permanent references remain in [`AUDIO_LICENSE.md`](AUDIO_LICENSE.md), [`CONTENT_AND_CLAIMS.md`](CONTENT_AND_CLAIMS.md), [`security-chat.md`](security-chat.md), [`THIRD_PARTY.md`](THIRD_PARTY.md) and [`UI_SYSTEM.md`](UI_SYSTEM.md).
