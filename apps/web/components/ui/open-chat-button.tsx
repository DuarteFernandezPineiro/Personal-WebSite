"use client";

import type { ComponentProps } from "react";

export function OpenChatButton(props: ComponentProps<"button">) {
  return <button type="button" {...props} onClick={(event) => { props.onClick?.(event); document.querySelector<HTMLButtonElement>(".chat-trigger")?.click(); }} />;
}

