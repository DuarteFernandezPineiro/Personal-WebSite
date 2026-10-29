import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ConsentBanner } from "./consent-banner";

const posthog = vi.hoisted(() => ({ __loaded: false, init: vi.fn(), capture: vi.fn() }));
vi.mock("posthog-js", () => ({ default: posthog }));

const storageKey = "dfp-consent-v1";

beforeEach(() => {
  window.localStorage.clear();
  vi.clearAllMocks();
  vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", "test-public-key");
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("ConsentBanner", () => {
  it("does not read browser storage during server rendering", () => {
    const read = vi.spyOn(Storage.prototype, "getItem");
    expect(renderToString(<ConsentBanner locale="es" />)).toBe("");
    expect(read).not.toHaveBeenCalled();
  });

  it("waits for explicit opt-in and persists an essential-only choice", () => {
    render(<ConsentBanner locale="es" />);
    expect(screen.getByRole("complementary")).toBeInTheDocument();
    expect(posthog.init).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Solo esenciales" }));
    expect(window.localStorage.getItem(storageKey)).toBe("essential");
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
    expect(posthog.init).not.toHaveBeenCalled();
  });

  it("respects a saved essential-only choice", () => {
    window.localStorage.setItem(storageKey, "essential");
    render(<ConsentBanner locale="en" />);
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
    expect(posthog.init).not.toHaveBeenCalled();
  });

  it("enables analytics only after accepting and keeps recording disabled", async () => {
    render(<ConsentBanner locale="en" />);
    expect(posthog.init).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Allow analytics" }));

    await waitFor(() => expect(posthog.init).toHaveBeenCalledWith("test-public-key", expect.objectContaining({
      autocapture: false,
      disable_session_recording: true,
      respect_dnt: true,
      capture_pageview: false
    })));
    expect(posthog.capture).toHaveBeenCalledWith("pageview_consented");
    expect(window.localStorage.getItem(storageKey)).toBe("analytics");
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
  });

  it("restores analytics from a saved opt-in", async () => {
    window.localStorage.setItem(storageKey, "analytics");
    render(<ConsentBanner locale="es" />);
    await waitFor(() => expect(posthog.init).toHaveBeenCalledTimes(1));
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
  });

  it("requests a new choice for an unrecognised stored value", () => {
    window.localStorage.setItem(storageKey, "unexpected");
    render(<ConsentBanner locale="en" />);
    expect(screen.getByRole("complementary")).toBeInTheDocument();
    expect(posthog.init).not.toHaveBeenCalled();
  });

  it("allows a choice when browser storage is unavailable", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new DOMException("Blocked", "SecurityError"); });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new DOMException("Blocked", "SecurityError"); });
    render(<ConsentBanner locale="es" />);
    fireEvent.click(screen.getByRole("button", { name: "Solo esenciales" }));
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
    expect(posthog.init).not.toHaveBeenCalled();
  });

  it("keeps analytics disabled when the public key is absent", async () => {
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", "");
    window.localStorage.setItem(storageKey, "analytics");
    render(<ConsentBanner locale="es" />);
    await waitFor(() => expect(screen.queryByRole("complementary")).not.toBeInTheDocument());
    expect(posthog.init).not.toHaveBeenCalled();
  });
});
