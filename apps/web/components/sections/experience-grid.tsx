"use client";

import { translate, type Locale, type TimelineEntry } from "@duarte/content";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ProfessionalText } from "@/components/ui/professional-text";

export function ExperienceGrid({ entries, locale }: { entries: TimelineEntry[]; locale: Locale }) {
  const prefersReducedMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const reduceMotion = hydrated && Boolean(prefersReducedMotion);

  return (
    <div className="experience-grid">
      {entries.map((entry, index) => (
        <ExperienceCard
          key={`${entry.period}-${entry.title.es}`}
          entry={entry}
          index={index}
          locale={locale}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}

function ExperienceCard({
  entry,
  index,
  locale,
  reduceMotion
}: {
  entry: TimelineEntry;
  index: number;
  locale: Locale;
  reduceMotion: boolean;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `experience-panel-${index}`;
  const isEs = locale === "es";

  return (
    <motion.article
      className="experience-card"
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: reduceMotion ? 0 : 1.35, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="experience-card-meta"><span>{entry.period}</span><p>{translate(entry.organization, locale)}</p></div>
      <h3>{translate(entry.title, locale)}</h3>
      <p><ProfessionalText text={translate(entry.description, locale)} locale={locale} /></p>
      {entry.details?.length ? (
        <div className="experience-disclosure">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((current) => !current)}
          >
            <span>{isEs ? "Conocer el proceso" : "Learn about the process"}</span>
            <motion.i aria-hidden="true" animate={{ rotate: open ? 45 : 0 }} transition={{ duration: reduceMotion ? 0 : 1.15, ease: [0.4, 0, 0.2, 1] }}>+</motion.i>
          </button>
          <AnimatePresence initial={false}>
            {open ? (
              <motion.div
                id={panelId}
                className="experience-details-clip"
                initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{
                  height: { duration: reduceMotion ? 0 : 1.72, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: reduceMotion ? 0 : 1.2, ease: [0.4, 0, 0.2, 1], delay: reduceMotion || !open ? 0 : 0.24 }
                }}
              >
                <div className="experience-details">
                  {entry.details.map((detail, detailIndex) => (
                    <section key={detailIndex}>
                      <h4>{translate(detail.title, locale)}</h4>
                      <p><ProfessionalText text={translate(detail.description, locale)} locale={locale} /></p>
                    </section>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      ) : null}
    </motion.article>
  );
}
