# Content package instructions

Read `../../docs/CONTENT_AND_CLAIMS.md` before editing professional claims.

- Every public string is bilingual and typed as `LocalizedText`.
- Preserve conservative scope labels and evidence on metrics. Never turn coursework, prototypes or experiments into production claims.
- `src/content.ts` is the complete local fallback and must remain useful without Sanity.
- Adding a field to `Project` or `SiteProfile` also requires checking the Sanity schema, CMS query/merge and consuming pages.
- Project links must point to verified public destinations. Do not advertise a download or live demo that was not checked.
- Keep confidential company names, document content and personal identifiers out of fixtures and tests.

Run `npm run check` and `npm run build` from the repository root.
