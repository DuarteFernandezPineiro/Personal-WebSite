"use client";

import { translate, type Capability, type Locale } from "@duarte/content";
import { Tag } from "@duarte/ui";
import { animate, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef } from "react";
import { ProfessionalText } from "@/components/ui/professional-text";

function CarouselArrow({ direction }: { direction: -1 | 1 }) {
  return (
    <svg className="carousel-arrow" viewBox="0 0 28 28" aria-hidden="true" data-direction={direction}>
      <path d="M5 14h17M15 7l7 7-7 7" />
    </svg>
  );
}

export function CapabilityCarousel({ capabilities, locale }: { capabilities: Capability[]; locale: Locale }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const activeAnimation = useRef<{ stop: () => void } | null>(null);
  const reduceMotion = useReducedMotion();
  const trackId = useId();
  const isEs = locale === "es";

  useEffect(() => () => activeAnimation.current?.stop(), []);

  function move(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector<HTMLElement>(".capability-card");
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const cardWidth = firstCard?.getBoundingClientRect().width ?? track.clientWidth;
    const pageStep = (cardWidth + gap) * 2;
    const maximum = track.scrollWidth - track.clientWidth;
    const currentPage = Math.round(track.scrollLeft / pageStep);
    const target = Math.min(maximum, Math.max(0, (currentPage + direction) * pageStep));
    activeAnimation.current?.stop();
    if (reduceMotion) {
      track.scrollLeft = target;
      return;
    }
    track.style.scrollSnapType = "none";
    activeAnimation.current = animate(track.scrollLeft, target, {
      duration: 1.88,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (value) => { track.scrollLeft = value; },
      onComplete: () => {
        track.scrollLeft = target;
        requestAnimationFrame(() => { track.style.scrollSnapType = ""; });
      }
    });
  }

  return (
    <div className="capability-carousel">
      <div className="capability-controls" aria-label={isEs ? "Controles del carrusel" : "Carousel controls"}>
        <button type="button" onClick={() => move(-1)} aria-controls={trackId} aria-label={isEs ? "Ver áreas anteriores" : "View previous areas"}>
          <CarouselArrow direction={-1} />
        </button>
        <button type="button" onClick={() => move(1)} aria-controls={trackId} aria-label={isEs ? "Ver áreas siguientes" : "View next areas"}>
          <CarouselArrow direction={1} />
        </button>
      </div>
      <div
        className="capability-track"
        id={trackId}
        ref={trackRef}
        role="region"
        tabIndex={0}
        aria-label={isEs ? "Áreas de conocimiento técnico" : "Technical knowledge areas"}
      >
        {capabilities.map((capability) => (
          <article className="capability-card" key={capability.id}>
            <span>{capability.index}</span>
            <h3>{translate(capability.title, locale)}</h3>
            <p><ProfessionalText text={translate(capability.description, locale)} locale={locale} /></p>
            <div className="tag-list">{(locale === "en" ? capability.toolsEn ?? capability.tools : capability.tools).map((tool) => <Tag key={tool}>{tool}</Tag>)}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
