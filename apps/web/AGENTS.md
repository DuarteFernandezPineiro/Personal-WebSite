# Web app instructions

For visual work, read `../../docs/UI_SYSTEM.md`; for boundaries, read `../../docs/architecture.md`. Use `../../docs/development.md` only for operational routing. Inspect only the target route, its imported components and the relevant selector ranges in `app/globals.css`.

- Default to server components. Add `"use client"` only for interaction, browser APIs or animation state.
- Use `next/image` for local raster media and meaningful bilingual alt text. Do not autoplay video. Ambient audio starts enabled, must tolerate browser autoplay blocking and must always remain user-mutable.
- Use Motion only; preserve reduced-motion behaviour. The Three.js hero source is currently disconnected from every route; do not re-enable it incidentally. If it is deliberately restored, keep it behind its existing dynamic boundary and static fallback.
- Preserve semantic landmarks, keyboard operation, visible focus and 44 px touch targets.
- All external integrations must have a credential-free fallback. Keep secrets out of `NEXT_PUBLIC_*` variables unless the value is intentionally public.
- Fetch portfolio data through `getPortfolioContent`; do not duplicate project claims inside components.

Verify with `npm run check`, `npm run build` and the visual smoke flow for visible changes.
