"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const ACTIVE_VOLUME = 0.65;

const labels = {
  es: { on: "Activar música", off: "Silenciar música", label: "Música" },
  en: { on: "Enable music", off: "Mute music", label: "Music" }
} as const;

export function SoundToggle() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "es";
  const [enabled, setEnabled] = useState(true);
  const enabledRef = useRef(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeFrameRef = useRef(0);

  const fadeTo = useCallback((target: number, duration = 1200, onComplete?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    window.cancelAnimationFrame(fadeFrameRef.current);
    const initial = audio.volume;
    const started = performance.now();
    const step = (time: number) => {
      const progress = Math.max(0, Math.min(1, (time - started) / duration));
      const eased = 1 - Math.pow(1 - progress, 3);
      audio.volume = Math.max(0, Math.min(1, initial + (target - initial) * eased));
      if (progress < 1) fadeFrameRef.current = window.requestAnimationFrame(step);
      else onComplete?.();
    };
    fadeFrameRef.current = window.requestAnimationFrame(step);
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !enabledRef.current;
    if (next) {
      audio.volume = 0;
      try {
        await audio.play();
      } catch {
        return;
      }
      fadeTo(ACTIVE_VOLUME, 900);
    } else {
      fadeTo(0, 900, () => audio.pause());
    }
    enabledRef.current = next;
    setEnabled(next);
    window.localStorage.setItem("dfp-ambient-v2", next ? "on" : "off");
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;

    const removeUnlockListeners = () => {
      document.removeEventListener("pointerdown", startAudio);
      document.removeEventListener("keydown", startAudio);
    };
    const startAudio = async () => {
      if (!enabledRef.current || !audio.paused) return;
      try {
        await audio.play();
        fadeTo(ACTIVE_VOLUME, 900);
        removeUnlockListeners();
      } catch {
        // Browsers may defer audible playback until the first user interaction.
      }
    };

    void startAudio();
    document.addEventListener("pointerdown", startAudio);
    document.addEventListener("keydown", startAudio);

    const onVisibility = () => {
      if (document.hidden) audio.pause();
      else if (enabledRef.current) void startAudio();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      removeUnlockListeners();
      document.removeEventListener("visibilitychange", onVisibility);
      window.cancelAnimationFrame(fadeFrameRef.current);
    };
  }, [fadeTo]);

  const copy = labels[locale];
  return (
    <>
      <audio ref={audioRef} src="/audio/duarte-playlist.mp3" preload="metadata" loop />
      <button className="utility-button sound-button" data-playing={enabled} type="button" aria-pressed={enabled} onClick={toggle} title={enabled ? copy.off : copy.on}>
        <span className="sound-icon-frame" aria-hidden="true">
          <Image src={enabled ? "/icons/sound-on.webp" : "/icons/sound-muted.webp"} alt="" width={100} height={100} unoptimized />
        </span>
        <span className="sr-only">{enabled ? copy.off : copy.on}</span>
        <span className="sound-label" aria-hidden="true">{copy.label}</span>
      </button>
    </>
  );
}
