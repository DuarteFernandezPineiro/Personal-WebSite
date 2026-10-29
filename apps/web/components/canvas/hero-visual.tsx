"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useHydrated } from "../ui/use-hydrated";

const TideCanvas = dynamic(() => import("./tide-canvas"), { ssr: false });

export function HeroVisual() {
  const hydrated = useHydrated();
  return hydrated ? <BrowserHeroVisual /> : <HeroVisualFrame canRender={false} />;
}

function BrowserHeroVisual() {
  const [canRender] = useState(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = "connection" in navigator && Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
    const canvas = document.createElement("canvas");
    const webgl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    return Boolean(webgl) && !reduce && !saveData && window.innerWidth >= 760;
  });

  return <HeroVisualFrame canRender={canRender} />;
}

function HeroVisualFrame({ canRender }: { canRender: boolean }) {
  return (
    <div className="hero-visual" aria-hidden="true" data-webgl={canRender}>
      {canRender ? <TideCanvas /> : <div className="tide-fallback"><i /><i /><i /><i /></div>}
      <div className="hero-visual-caption"><span>DATA CURRENT / 001</span><span>42.8782° N · 8.5448° W</span></div>
    </div>
  );
}

