"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ComponentProps } from "react";

export type RevealProps = ComponentProps<typeof motion.div> & {
  delay?: number;
};

export function Reveal({ children, delay = 0, ...props }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const disableMotion = hydrated && reduceMotion;
  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: disableMotion ? 0 : 1.24, delay: disableMotion ? 0 : delay, ease: [0.4, 0, 0.2, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
