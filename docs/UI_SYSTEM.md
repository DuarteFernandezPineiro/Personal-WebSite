# UI task pack

Use this file for layout, styling, motion and accessibility changes. It is a map, not a second specification.

## Direction

- Atlantic editorial identity: deep ink, mineral paper, tide cyan and a restrained signal lime.
- `Newsreader` carries expressive headings; `IBM Plex Sans/Mono` carries reading and technical detail.
- Pages use a centered editorial frame. Heroes float over the ambient particle field; subsequent sections are opaque rounded islands with generous spacing.
- Motion should feel calm and deliberate. Use Motion and the shared `--ease-calm` curve; never hijack scroll. Always preserve `prefers-reduced-motion`.

## File map

| Concern | Source |
| --- | --- |
| Global tokens, responsive layout and component styling | `apps/web/app/globals.css` |
| Static header navigation | `apps/web/components/layout/site-header.tsx` |
| Shared page shell and primitives | `packages/ui/src/index.tsx` |
| Home sections | `apps/web/app/[locale]/page.tsx` |
| Projects / About / Contact | matching route under `apps/web/app/[locale]` |
| Ambient particles | `apps/web/components/ui/margin-neural-field.tsx` |
| Chat panel | `apps/web/components/chat/chat-drawer.tsx` |
| Visual regression flow | `apps/web/e2e/visual-smoke.mjs` |

## Invariants

- Desktop and mobile, keyboard focus, 44 px touch targets and WCAG 2.2 AA.
- Header navigation treatment stays understated; interaction feedback never changes layout.
- Route and language changes use the 8 × 14 cell sweep from Codrops' PixelTransition demo 1, ported to the existing Motion runtime with the original 0.4 s cell duration and row/random stagger. Reduced motion and data saving skip it.
- The checked-in Three.js hero components are disconnected and the smoke flow asserts that `.hero-visual` is absent. Treat them as residual source, not an active visual layer.
- Local images use `next/image`; public copy remains bilingual.
- Opaque content islands must hide ambient particles. The hero intentionally does not.
- Validate visible work at the automated 1440×900, 1920×1080 and 390×844 viewports, plus reduced motion.
