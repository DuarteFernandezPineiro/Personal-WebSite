# Third-party design references

## PixelTransition

The route transition in `apps/web/components/ui/route-depth-transition.tsx` ports the overlay movement from demo 1 of Codrops' **PixelTransition** to the Motion runtime already used by the site:

- Article: https://tympanus.net/codrops/2023/04/05/ideas-for-pixel-page-transitions/
- Repository: https://github.com/codrops/PixelTransition/
- Original implementation: 8 × 14 overlay, 0.4-second cells, `power3.inOut`/`power2` easing and a 0.03-second row/random stagger.
- Adaptation: the same grid, transform origins, timings and stagger shape run through Motion; GSAP is not added as a second animation runtime.

The Codrops repository is MIT-licensed. Keep the attribution when changing or redistributing this adaptation.
