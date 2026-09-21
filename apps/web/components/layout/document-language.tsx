"use client";

import type { Locale } from "@duarte/content";
import { useLayoutEffect } from "react";

export function DocumentLanguage({ locale }: { locale: Locale }) {
  useLayoutEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
