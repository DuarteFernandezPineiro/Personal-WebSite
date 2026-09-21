import { describe, expect, it } from "vitest";
import { alternateLocale, locales } from "./i18n";

describe("bilingual routing", () => {
  it("publishes exactly the Spanish and English variants", () => {
    expect(locales).toEqual(["es", "en"]);
    expect(alternateLocale("es")).toBe("en");
    expect(alternateLocale("en")).toBe("es");
  });
});
