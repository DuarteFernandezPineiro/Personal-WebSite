# Verified architectural decisions

This file records only choices demonstrated by current source, tests or existing repository rules. It is not a wishlist or debt register.

## npm workspaces plus an independent Python service

The root workspace includes `apps/*` and `packages/*`; `services/chat-api` has its own requirements, tests and Dockerfile. Frontend and chat therefore have separate installation and CI jobs.

## TypeScript packages are consumed from source

`@duarte/content` and `@duarte/ui` export their `src` entry points, emit no build artifact and are transpiled by Next. Shared contracts remain simple and repository-local.

## The public frontend uses Next.js App Router

Pages and layouts are Server Components by default, locale/project paths are statically generated, and server routes own provider calls. Client Components are introduced only for interaction, browser APIs and motion.

## Public content is bilingual with a complete local fallback

Spanish and English are typed locales. `packages/content` remains sufficient to render the public site without Sanity; CMS failures return that fixture rather than breaking the portfolio.

## CMS publication is filtered and partial

Public queries require published, visible, non-confidential records. Sanity overlays selected local fields instead of replacing the entire web model. Testimonials are created as pending and require explicit approval before public queries return them.

## The chat knowledge boundary is separate from web content

FastAPI reads an allowlisted Markdown catalog and optional published `chatSource` records; it does not import `packages/content`. Retrieval tools are mandatory during planning, and planning output is never streamed publicly.

## Browser chat is proxied through Next

The public drawer calls the same-origin `/api/chat` route. Next relays the stable request shape, NDJSON stream, cancellation and session cookie to FastAPI, keeping the preferred backend origin server-only.

## Chat state is server-side and per process

Conversation history, rate limits, concurrency, queueing and monthly budget are held in memory. The Docker entry point uses one worker, consistent with that non-distributed state model.

## External services degrade safely

Sanity, OpenAI, Resend, Turnstile and PostHog are optional configuration for local web rendering. Missing credentials select local content, a disabled analytics path or explicit unavailable responses instead of exposing secrets or fabricating success.

## Analytics requires explicit consent

PostHog is loaded dynamically after consent, respects Do Not Track and disables autocapture and session recording. Analytics keys exposed to browsers are intentionally public; provider secrets remain server-only.

## Motion uses one runtime and preserves fallbacks

Motion is the active React animation library. Active experiences include reduced-motion/static paths. Ambient audio starts enabled, uses one level-matched looping file and recovers on the first user interaction when browser policy blocks audible autoplay. The checked-in Three.js hero remains dynamically isolated but disconnected from routes.

## Styling is token-led and globally centralised

Design tokens, responsive rules and component selectors live in `apps/web/app/globals.css`. `packages/ui` remains a small primitive layer rather than a second page/component styling system.

## Deployment is provider-neutral except for the chat container

No web hosting provider or automated deploy workflow is committed. FastAPI has a non-root Docker image; Sanity has authoring configuration. Dated Vercel preview files and platform-related environment support are not treated as deployment decisions.
