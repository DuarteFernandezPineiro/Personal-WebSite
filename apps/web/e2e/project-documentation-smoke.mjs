import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const scenarios = [
  { name: "desktop", viewport: { width: 1440, height: 900 } },
  { name: "widescreen", viewport: { width: 1920, height: 1080 } },
  { name: "mobile", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  { name: "reduced-motion", viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" }
];

/** Covers every project discovered in the archive, including future additions. */
export async function assertAllProjectDocumentationLayouts(browser, { base, output }) {
  await mkdir(output, { recursive: true });
  let checked = 0;
  for (const { name, ...options } of scenarios) {
    for (const locale of ["es", "en"]) {
      const context = await browser.newContext(options);
      try {
        const page = await context.newPage();
        await page.goto(`${base}/${locale}/projects`, { waitUntil: "networkidle" });
        const consent = page.locator(".consent-banner button").first();
        if (await consent.isVisible()) await consent.click();
        const links = await page.locator(".project-index-row a[href]").evaluateAll((elements) => [...new Set(elements.map((element) => element.getAttribute("href")))]);
        const paths = links.filter((href) => href?.startsWith(`/${locale}/projects/`));
        assert(paths.length > 0, `No projects discovered for ${locale}`);
        for (const path of paths) {
          const label = `${path} (${name})`;
          await page.goto(new URL(path, base).href, { waitUntil: "networkidle" });
          await page.evaluate(() => document.fonts.ready);
          const sections = page.locator(".case-article section");
          const diagramProject = {
            "twinphoto": "twinphoto",
            "asistente-profesional": "asistente-profesional",
            "bitcoin-sentiment": "bitcoin-sentiment"
          }[path.split("/").at(-1)];
          if (diagramProject) {
            assert.equal(await sections.count(), 7, `${label}: all seven reviewed sections must be present`);
            assert.equal(await page.locator(`[data-project-diagram='${diagramProject}'] svg`).count(), 1, `${label}: correct project diagram missing`);
            assert.equal(await page.locator("[data-project-diagram]").count(), 1, `${label}: unexpected project diagram`);
            assert.equal(await page.locator(".case-document-code").count(), 0, `${label}: raw Mermaid must not replace the diagram`);
          }
          if (path.endsWith("/rag-hibrido-documentacion")) {
            const eyebrow = await page.locator(".case-hero .eyebrow").textContent();
            assert(eyebrow?.includes(locale === "es" ? "Trabajo de Fin de Grado" : "Bachelor’s thesis"), `${label}: original hero label missing`);
            assert.equal(await sections.count(), 7, `${label}: RAG must retain all seven documentation sections`);
            assert.equal(await page.locator("[data-project-diagram='rag'] svg").count(), 1, `${label}: RAG diagram missing`);
            assert.equal(await page.locator(".airfryer-diagram").count(), 0, `${label}: wrong project's diagram`);
          }
          assert(await sections.count() > 0, `${label}: documentation missing`);
          assert.equal(await page.locator(".case-facts").count(), 1, `${label}: facts missing`);
          const frames = await sections.evaluateAll((elements) => elements.map((element) => {
            const frame = element.getBoundingClientRect();
            return { top: frame.top + scrollY, bottom: frame.bottom + scrollY };
          }));
          for (let index = 1; index < frames.length; index++) {
            assert(frames[index].top >= frames[index - 1].bottom - 1, `${label}: sections ${index} and ${index + 1} overlap or are out of order`);
          }
          // Sticky facts can move while scrolling: test the beginning, middle and end of every section.
          for (let index = 0; index < frames.length; index++) {
            const { top, bottom } = frames[index];
            for (const position of [top - 140, (top + bottom) / 2 - 140, bottom - 140]) {
              const collision = await page.evaluate(({ position, index }) => {
                window.scrollTo({ top: Math.max(0, position), behavior: "instant" });
                const facts = document.querySelector(".case-facts").getBoundingClientRect();
                const section = document.querySelectorAll(".case-article section")[index];
                const elements = [section, ...section.querySelectorAll("h2, h3, p, ul, ol, figure, .airfryer-diagram")];
                return elements.some((element) => {
                  const frame = element.getBoundingClientRect();
                  const width = Math.min(facts.right, frame.right) - Math.max(facts.left, frame.left);
                  const height = Math.min(facts.bottom, frame.bottom) - Math.max(facts.top, frame.top);
                  return width > 1 && height > 1;
                });
              }, { position, index });
              assert(!collision, `${label}: section ${index + 1} overlaps the facts at scroll ${Math.round(position)}`);
            }
          }
          const bounds = await page.evaluate(() => {
            const layout = document.querySelector(".case-layout");
            const rect = layout.getBoundingClientRect();
            const style = getComputedStyle(layout);
            const left = rect.left + parseFloat(style.paddingLeft);
            const right = rect.right - parseFloat(style.paddingRight);
            return {
              overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
              wideFits: [...document.querySelectorAll(".case-article--wide section")].every((section) => {
                const frame = section.getBoundingClientRect();
                return Math.abs(frame.left - left) <= 2 && Math.abs(frame.right - right) <= 2;
              })
            };
          });
          assert(!bounds.overflow, `${label}: horizontal page overflow`);
          assert(bounds.wideFits, `${label}: expanded documentation does not share both outer margins`);
          const flowViewport = page.locator(".project-flow__viewport");
          if (name === "mobile" && await flowViewport.count()) {
            await flowViewport.focus();
            await page.keyboard.press("ArrowRight");
            await page.waitForFunction(() => document.querySelector(".project-flow__viewport").scrollLeft > 0, undefined, { timeout: 2000 });
            await flowViewport.evaluate((element) => { element.scrollLeft = 0; });
          }
          const headings = await sections.locator("h2[id]").evaluateAll((elements) => elements.map((element) => element.id));
          assert.equal(new Set(headings).size, headings.length, `${label}: duplicate heading IDs`);
          await sections.nth(Math.min(2, frames.length - 1)).locator("h2").evaluate((heading) => window.scrollTo({ top: heading.getBoundingClientRect().top + scrollY - 150, behavior: "instant" }));
          await page.screenshot({ path: resolve(output, `${path.split("/").at(-1)}-${locale}-${name}.png`) });
          checked++;
        }
      } finally { await context.close(); }
    }
  }
  return checked;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const executablePath = [process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find((candidate) => candidate && existsSync(candidate));
  const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  try {
    const checked = await assertAllProjectDocumentationLayouts(browser, {
      base: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000",
      output: resolve("test-results", "project-documentation")
    });
    console.log(JSON.stringify({ ok: true, checked }));
  } finally { await browser.close(); }
}
