"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export const LOCALE_TRANSITION_EVENT = "duarte:locale-transition";

type LocaleTransitionDetail = {
  href: string;
  locale: "es" | "en";
  preserveScroll?: boolean;
  label?: string;
};

type ActiveTransition = LocaleTransitionDetail & {
  phase: "covering" | "revealing";
};

export function requestLocaleTransition(detail: LocaleTransitionDetail) {
  const event = new CustomEvent<LocaleTransitionDetail>(LOCALE_TRANSITION_EVENT, { cancelable: true, detail });
  return !window.dispatchEvent(event);
}

// Demo 1 of Codrops' PixelTransition uses an 8 × 14 overlay, 0.4 s cells and
// a 0.03 s row/random stagger. Keeping those values makes the route swap land
// at the same fully-covered moment without adding GSAP beside Motion.
const pixelRows = 8;
const pixelColumns = 14;
const pixelCount = pixelRows * pixelColumns;
const cellDuration = 0.4;
const staggerStep = 0.03;
const maximumStagger = staggerStep * ((pixelRows - 1) + 5);
const navigationMoment = (cellDuration + maximumStagger) * 1_000;
const transitionDuration = navigationMoment * 2;
const coverEase = (progress: number) => progress < 0.5
  ? Math.pow(progress * 2, 4) / 2
  : 1 - Math.pow((1 - progress) * 2, 4) / 2;
const revealEase = (progress: number) => 1 - Math.pow(1 - progress, 3);

function randomOffset(index: number) {
  const noise = Math.sin((index + 1) * 12.9898) * 43_758.5453;
  return (noise - Math.floor(noise)) * 5;
}

const pixels = Array.from({ length: pixelCount }, (_, index) => ({
  index,
  delay: staggerStep * (Math.floor(index / pixelColumns) + randomOffset(index))
}));

export function RouteDepthTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const savedScroll = useRef(0);
  const activeRef = useRef(false);
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [active, setActive] = useState<ActiveTransition | null>(null);

  const clearTimers = useCallback(() => {
    if (navigationTimer.current) clearTimeout(navigationTimer.current);
    if (finishTimer.current) clearTimeout(finishTimer.current);
    navigationTimer.current = null;
    finishTimer.current = null;
  }, []);

  const finish = useCallback(() => {
    clearTimers();
    activeRef.current = false;
    setActive(null);
  }, [clearTimers]);

  const startTransition = useCallback((detail: LocaleTransitionDetail) => {
    if (activeRef.current) return;
    activeRef.current = true;
    savedScroll.current = window.scrollY;

    if (reduceMotion || navigator.connection?.saveData) {
      router.push(detail.href, { scroll: false });
      requestAnimationFrame(() => {
        window.scrollTo({ top: detail.preserveScroll ? savedScroll.current : 0, left: 0, behavior: "instant" });
        document.documentElement.lang = detail.locale;
        activeRef.current = false;
      });
      return;
    }

    setActive({ ...detail, phase: "covering" });
    navigationTimer.current = setTimeout(() => {
      setActive((current) => current ? { ...current, phase: "revealing" } : null);
      router.push(detail.href, { scroll: false });
    }, navigationMoment);
    finishTimer.current = setTimeout(finish, transitionDuration);
  }, [finish, reduceMotion, router]);

  useEffect(() => {
    const begin = (event: Event) => {
      const transitionEvent = event as CustomEvent<LocaleTransitionDetail>;
      transitionEvent.preventDefault();
      startTransition(transitionEvent.detail);
    };

    const followInternalLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.dataset.localeTransition === "true" || anchor.dataset.pageTransition === "false") return;
      if ((anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || !["http:", "https:"].includes(url.protocol)) return;
      const current = new URL(window.location.href);
      if (url.pathname === current.pathname && url.search === current.search) return;
      event.preventDefault();
      startTransition({
        href: `${url.pathname}${url.search}${url.hash}`,
        locale: url.pathname.startsWith("/en") ? "en" : "es",
        preserveScroll: false,
        label: anchor.textContent?.trim()
      });
    };

    window.addEventListener(LOCALE_TRANSITION_EVENT, begin);
    document.addEventListener("click", followInternalLink, true);
    return () => {
      clearTimers();
      window.removeEventListener(LOCALE_TRANSITION_EVENT, begin);
      document.removeEventListener("click", followInternalLink, true);
    };
  }, [clearTimers, startTransition]);

  useEffect(() => {
    if (active?.phase !== "revealing") return;
    const targetPath = new URL(active.href, window.location.origin).pathname;
    if (pathname !== targetPath) return;
    document.documentElement.lang = active.locale;
    requestAnimationFrame(() => window.scrollTo({ top: active.preserveScroll ? savedScroll.current : 0, left: 0, behavior: "instant" }));
  }, [active, pathname]);

  const revealing = active?.phase === "revealing";

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="page-pixel-scene"
          data-active="true"
          data-phase={active.phase}
          aria-hidden="true"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }}
        >
          {pixels.map((pixel) => (
            <motion.div
              className="page-pixel-cell"
              key={pixel.index}
              style={{ transformOrigin: revealing ? "50% 100%" : "50% 0%" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={revealing
                ? { opacity: 0, scale: 0 }
                : { opacity: 1, scale: 1.01 }}
              transition={{
                duration: cellDuration,
                delay: pixel.delay,
                ease: revealing ? revealEase : coverEase
              }}
            />
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

declare global {
  interface NetworkInformation { saveData?: boolean }
  interface Navigator { connection?: NetworkInformation }
}
