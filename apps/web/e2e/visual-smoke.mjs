import { chromium } from "playwright";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const base = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000";
const output = resolve("test-results", "visual-smoke");
await mkdir(output, { recursive: true });
const executablePath = [
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
].find((candidate) => candidate && existsSync(candidate));
const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function unexpectedBrowserErrors(errors) {
  return errors.filter((message) => (
    !message.includes("503 (Service Unavailable)")
    // The sandbox can block the external Google Fonts socket; first-party UI
    // assertions and local assets are still verified independently below.
    && !message.includes("net::ERR_SOCKET_NOT_CONNECTED")
  ));
}

try {
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await desktop.newPage();
  const errors = [];
  page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(`${base}/es`, { waitUntil: "domcontentloaded" });
  await page.locator(".consent-banner").waitFor({ state: "visible" });
  assert(await page.locator(".consent-banner").isVisible(), "Consent banner is not visible on first visit");
  await page.screenshot({ path: resolve(output, "consent-banner.png"), fullPage: false });
  await page.getByRole("button", { name: /solo esenciales/i }).click();
  assert(!(await page.locator(".consent-banner").isVisible().catch(() => false)), "Consent choice did not close the banner");
  await page.reload({ waitUntil: "domcontentloaded" });
  assert((await page.locator(".consent-banner").count()) === 0, "Consent preference was not persisted");
  assert(await page.getByRole("heading", { level: 1 }).isVisible(), "Hero heading is not visible");
  assert(await page.locator(".hero-role", { hasText: "Ingeniero de Inteligencia Artificial" }).isVisible(), "The AI Engineer role is not prominent in the hero");
  const roleDecoration = await page.locator(".hero-role").evaluate((element) => ({
    leadingContent: getComputedStyle(element, "::before").content,
    trailingContent: getComputedStyle(element, "::after").content,
    markerColor: getComputedStyle(element).backgroundColor
  }));
  assert(roleDecoration.leadingContent === "none", "The removed role dot is still rendered");
  assert(roleDecoration.trailingContent === "none", "The old partial role underline is still rendered");
  assert(roleDecoration.markerColor !== "rgba(0, 0, 0, 0)", "The role is missing its full signal highlight");
  assert(parseFloat(await page.locator(".site-header").evaluate((element) => getComputedStyle(element).borderTopLeftRadius)) >= 10, "The site header is missing rounded corners");
  const initialHeaderFrame = await page.locator(".site-header").boundingBox();
  const initialIslandFrame = await page.locator(".home-page > .section-shell").first().boundingBox();
  assert(Boolean(initialHeaderFrame && initialIslandFrame && Math.abs(initialHeaderFrame.x - initialIslandFrame.x) <= 1 && Math.abs(initialHeaderFrame.width - initialIslandFrame.width) <= 2), "The header is not aligned with the content islands");
  assert(await page.getByRole("link", { name: /explorar proyectos/i }).isVisible(), "Primary CTA is not visible");
  assert(await page.getByRole("link", { name: /ver y descargar el cv/i }).first().isVisible(), "The hero résumé action is missing");
  assert((await page.locator(".hero-visual").count()) === 0, "The removed hero visual is still present");
  assert(await page.locator(".home-introduction-copy strong", { hasText: "primera promoción" }).isVisible(), "The first graduating class emphasis is missing");
  assert(await page.locator(".home-introduction-copy strong", { hasText: "Inteligencia Artificial" }).isVisible(), "The Artificial Intelligence emphasis is missing");
  assert((await page.locator(".experience-card").count()) === 2, "Education and experience must contain two cards");
  assert((await page.getByText("Bachillerato Científico", { exact: true }).count()) === 0, "Science Baccalaureate is still visible");
  assert((await page.locator(".credentials-section .credential-card").count()) === 3, "The three requested credentials are not present");
  assert(await page.getByText("E0A6793EE57A22FF", { exact: true }).isVisible(), "The Microsoft credential ID is missing");
  assert((await page.locator(".capability-track .capability-card").count()) === 9, "The complete knowledge carousel is missing areas");
  assert((await page.getByRole("button", { name: "Menú", exact: true }).count()) === 0, "The removed menu button is still present");
  for (const label of ["Proyectos", "Sobre mí", "Contacto"]) assert(await page.locator(".site-header").getByRole("link", { name: label, exact: true }).isVisible(), `Static header link is missing: ${label}`);
  assert(!(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)), "Desktop has horizontal overflow");
  await page.screenshot({ path: resolve(output, "home-desktop.png"), fullPage: false });
  await page.locator(".projects-section").scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.screenshot({ path: resolve(output, "home-projects.png"), fullPage: false });
  await page.locator(".trajectory-section").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  for (const selector of [".experience-card h3", ".experience-card > p", ".experience-disclosure"]) {
    const tops = await page.locator(`.trajectory-section ${selector}`).evaluateAll((elements) => elements.map((element) => Math.round(element.getBoundingClientRect().top)));
    assert(Math.max(...tops) - Math.min(...tops) <= 2, `Experience rows are not aligned: ${selector}`);
  }
  assert(parseFloat(await page.locator(".experience-card").first().evaluate((element) => getComputedStyle(element).borderTopLeftRadius)) >= 14, "Experience cards are missing the shared soft silhouette");
  const secondCardHeightBefore = (await page.locator(".experience-card").nth(1).boundingBox())?.height ?? 0;
  await page.getByText("Conocer el proceso", { exact: true }).first().click();
  assert(await page.locator(".experience-card button[aria-expanded='true']").first().isVisible(), "Experience details did not open");
  await page.locator(".experience-details-clip").first().waitFor({ state: "visible" });
  const secondCardHeightAfter = (await page.locator(".experience-card").nth(1).boundingBox())?.height ?? 0;
  assert(Math.abs(secondCardHeightAfter - secondCardHeightBefore) < 2, "Opening one experience card resized the other card");
  await page.screenshot({ path: resolve(output, "home-trajectory.png"), fullPage: false });
  await page.locator(".credentials-section").scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  for (const selector of [".credential-period", ".credential-card h3", ".credential-description", ".credential-meta"]) {
    const tops = await page.locator(`.credentials-section ${selector}`).evaluateAll((elements) => elements.map((element) => Math.round(element.getBoundingClientRect().top)));
    assert(Math.max(...tops) - Math.min(...tops) <= 2, `Credential rows are not aligned: ${selector}`);
  }
  await page.screenshot({ path: resolve(output, "home-credentials.png"), fullPage: false });
  await page.locator(".capabilities-section").scrollIntoViewIfNeeded();
  const knowledgeTrack = page.locator(".capability-track");
  const initialKnowledgeScroll = await knowledgeTrack.evaluate((element) => element.scrollLeft);
  const knowledgeGeometry = await knowledgeTrack.evaluate((element) => {
    const card = element.querySelector(".capability-card");
    const gap = Number.parseFloat(getComputedStyle(element).columnGap) || 0;
    return { track: element.clientWidth, card: card?.getBoundingClientRect().width ?? 0, gap };
  });
  assert(Math.abs(knowledgeGeometry.card * 2 + knowledgeGeometry.gap - knowledgeGeometry.track) <= 3, "Knowledge carousel must show exactly two complete cards on desktop");
  await page.getByRole("button", { name: /ver áreas siguientes/i }).click();
  await page.waitForTimeout(2_050);
  const knowledgeScrollAfter = await knowledgeTrack.evaluate((element) => element.scrollLeft);
  const expectedKnowledgeStep = (knowledgeGeometry.card + knowledgeGeometry.gap) * 2;
  assert(Math.abs(knowledgeScrollAfter - expectedKnowledgeStep) <= 3 && knowledgeScrollAfter > initialKnowledgeScroll, "Knowledge carousel did not advance by exactly two cards");
  for (const selector of ["h3", "p", ".tag-list"]) {
    const tops = await page.locator(`.capability-track .capability-card ${selector}`).evaluateAll((elements) => elements.slice(0, 3).map((element) => Math.round(element.getBoundingClientRect().top)));
    assert(Math.max(...tops) - Math.min(...tops) <= 2, `Knowledge card rows are not aligned: ${selector}`);
  }
  await page.screenshot({ path: resolve(output, "home-knowledge.png"), fullPage: false });
  await page.locator(".human-section").scrollIntoViewIfNeeded();
  await page.waitForFunction(() => [...document.images].some((image) => image.src.includes("duarte-waterfall-wide") && image.complete && image.naturalWidth > 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: resolve(output, "home-personal.png"), fullPage: false });

  await page.route("**/api/testimonials", async (route) => {
    const payload = route.request().postDataJSON();
    assert(payload.relationship === "other" && payload.otherRelationship === "Profesor de proyecto", "The custom testimonial relationship was not submitted");
    assert(payload.anonymous === true && payload.name === "", "Anonymous testimonial data is incorrect");
    assert(payload.comment === "Muy bien.", "A short testimonial was not submitted unchanged");
    await route.fulfill({ status: 202, contentType: "application/json", body: JSON.stringify({ ok: true, pending: true }) });
  });
  await page.locator(".testimonials-section").scrollIntoViewIfNeeded();
  const testimonialsIntroFrame = await page.locator(".testimonials-intro").boundingBox();
  const testimonialsFormFrame = await page.locator(".testimonial-form").boundingBox();
  assert(Boolean(testimonialsIntroFrame && testimonialsFormFrame && Math.abs(testimonialsIntroFrame.y - testimonialsFormFrame.y) <= 2), "The testimonial form does not start level with the section title");
  assert(await page.getByText("Deja aquí tu opinión acerca de Duarte.", { exact: false }).isVisible(), "The requested testimonial invitation is missing");
  await page.locator(".testimonial-form select[name='relationship']").selectOption("other");
  await page.locator(".testimonial-form input[name='otherRelationship']").fill("Profesor de proyecto");
  await page.locator(".anonymous-row input").check();
  await page.locator(".testimonial-form textarea").fill("Muy bien.");
  await page.locator(".testimonial-form input[name='consent']").check();
  await page.getByRole("button", { name: /enviar opinión/i }).click();
  await page.getByText(/se publicará cuando haya sido revisada/i).waitFor();
  await page.screenshot({ path: resolve(output, "home-testimonials.png"), fullPage: false });

  const sound = page.locator(".sound-button");
  assert((await page.locator("audio[src='/audio/duarte-playlist.mp3'][loop]").count()) === 1, "The ordered, looping music playlist is not connected");
  await page.waitForFunction(() => (document.querySelector("audio")?.duration ?? 0) > 600);
  assert((await sound.locator(".sound-icon-frame img").count()) === 1, "The supplied sound symbol is missing");
  assert((await sound.getAttribute("aria-pressed")) === "true", "Ambient music is not active by default");
  const soundFrame = await sound.boundingBox();
  const chatTriggerFrame = await page.locator(".chat-trigger").boundingBox();
  assert(Boolean(soundFrame && chatTriggerFrame && soundFrame.x - (chatTriggerFrame.x + chatTriggerFrame.width) >= 8), "Sound and chat controls are too close or overlapping");
  await sound.click();
  await page.waitForFunction(() => document.querySelector(".sound-button")?.getAttribute("aria-pressed") === "false");
  await sound.click();
  await page.waitForFunction(() => document.querySelector(".sound-button")?.getAttribute("aria-pressed") === "true");
  await page.waitForFunction(() => Math.abs((document.querySelector("audio")?.volume ?? 0) - 0.65) < 0.01);
  const scrollBeforeLocaleChange = await page.evaluate(() => window.scrollY);
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await page.waitForURL(`${base}/en`);
  await page.locator(".page-pixel-scene").waitFor({ state: "hidden", timeout: 6_000 });
  const scrollAfterLocaleChange = await page.evaluate(() => window.scrollY);
  assert(Math.abs(scrollAfterLocaleChange - scrollBeforeLocaleChange) <= 3, "Language change did not preserve the current scroll position");
  assert((await page.locator(".sound-button").getAttribute("aria-pressed")) === "true", "Ambient audio stopped when switching to English");
  await page.getByRole("link", { name: "ES", exact: true }).click();
  await page.waitForURL(`${base}/es`);
  await page.locator(".page-pixel-scene").waitFor({ state: "hidden", timeout: 6_000 });
  assert((await page.locator(".sound-button").getAttribute("aria-pressed")) === "true", "Ambient audio stopped when switching back to Spanish");
  await page.locator(".sound-button").click();
  await page.waitForFunction(() => document.querySelector(".sound-button")?.getAttribute("aria-pressed") === "false");

  await page.route("**/api/chat", async (route) => {
    const payload = route.request().postDataJSON();
    assert(payload.message === "¿Qué aporta Duarte a un equipo?", "Enter did not submit the chat question");
    assert(payload.detailLevel === "normal", "The chat detail level contract changed");
    await route.fulfill({
      status: 200,
      contentType: "application/x-ndjson; charset=utf-8",
      body: [
        JSON.stringify({ type: "status", message: "Preparando respuesta" }),
        JSON.stringify({ type: "delta", text: "Duarte aporta **IA aplicada**" }),
        JSON.stringify({ type: "delta", text: ", comunicación y criterio técnico." }),
        JSON.stringify({ type: "done" })
      ].join("\n") + "\n"
    });
  });
  const pageFrameBeforeChat = await page.locator(".site-page").boundingBox();
  await page.getByRole("button", { name: /pregunta a mi ia/i }).last().click();
  assert(await page.getByRole("dialog").isVisible(), "Chat dialog did not open");
  const pageFrameWithChat = await page.locator(".site-page").boundingBox();
  assert(Boolean(pageFrameBeforeChat && pageFrameWithChat && Math.abs(pageFrameBeforeChat.x - pageFrameWithChat.x) <= .5 && Math.abs(pageFrameBeforeChat.width - pageFrameWithChat.width) <= .5), "Opening the chat shifts the page when the scrollbar is locked");
  await page.waitForTimeout(950);
  await page.screenshot({ path: resolve(output, "chat-open.png"), fullPage: false });
  await page.locator("#chat-question").fill("¿Qué aporta Duarte a un equipo?");
  await page.locator("#chat-question").press("Enter");
  await page.getByText("Respuesta completada.", { exact: true }).waitFor();
  assert(await page.locator(".chat-message.assistant strong", { hasText: "IA aplicada" }).isVisible(), "Chat markdown emphasis was not rendered");
  assert((await page.locator(".chat-message.assistant").textContent())?.includes("comunicación y criterio técnico"), "The streamed response was incomplete");
  assert(!((await page.locator(".chat-message.assistant").textContent()) || "").includes("**"), "Markdown asterisks leaked into the chat UI");
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden", timeout: 2_000 });

  await page.goto(`${base}/es/projects`, { waitUntil: "domcontentloaded" });
  assert((await page.locator(".site-header").getByRole("link", { name: "Proyectos", exact: true }).getAttribute("aria-current")) === "page", "Projects is not marked as the current navigation tab");
  assert((await page.locator(".archive-page.editorial-page").count()) === 1, "Projects do not use the shared editorial layout");
  assert((await page.locator(".archive-page > .page-hero").evaluate((element) => getComputedStyle(element).backgroundColor)) === "rgba(0, 0, 0, 0)", "Projects hero is not floating over the ambient field");
  const projectCount = await page.locator(".project-index-row").count();
  assert(projectCount === 4, "The project page must contain exactly four main projects");
  assert((await page.locator(".archive-filters").count()) === 0, "Project filters should not be present");
  await page.locator(".project-index-row").first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: resolve(output, "projects-index.png"), fullPage: false });

  await page.route("**/api/contact", (route) => route.fulfill({
    status: 503,
    contentType: "application/json",
    body: JSON.stringify({ code: "not_configured" })
  }));
  await page.goto(`${base}/es/contact`, { waitUntil: "domcontentloaded" });
  assert((await page.locator(".site-header").getByRole("link", { name: "Contacto", exact: true }).getAttribute("aria-current")) === "page", "Contact is not marked as the current navigation tab");
  assert((await page.locator(".contact-page.editorial-page").count()) === 1, "Contact does not use the shared editorial layout");
  assert(await page.getByText("Santiago de Compostela · Disponible para remoto, híbrido y presencial.", { exact: true }).isVisible(), "The full work-mode availability is missing");
  await page.screenshot({ path: resolve(output, "contact-desktop.png"), fullPage: false });
  await page.getByLabel("Nombre").fill("Reclutadora Ejemplo");
  await page.getByLabel("Email").fill("recruiter@example.com");
  await page.getByLabel("Mensaje").fill("Me gustaría hablar sobre una oportunidad profesional en inteligencia artificial aplicada.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: /enviar mensaje/i }).click();
  await page.locator(".form-status").waitFor({ state: "visible" });
  assert((await page.locator(".form-status").textContent())?.includes("todavía no está configurado"), "Contact fallback was not shown");
  await page.unroute("**/api/contact");

  await page.goto(`${base}/es/privacy`, { waitUntil: "domcontentloaded" });
  assert((await page.locator(".privacy-page.editorial-page").count()) === 1, "Privacy does not use the shared editorial layout");
  assert((await page.locator(".privacy-page > .page-hero").evaluate((element) => getComputedStyle(element).backgroundColor)) === "rgba(0, 0, 0, 0)", "Privacy hero is not floating over the ambient field");
  assert((await page.locator(".privacy-card").count()) === 5, "Privacy topics are not presented as independent cards");
  for (const card of await page.locator(".privacy-card").all()) {
    assert((await card.evaluate((element) => getComputedStyle(element).backgroundColor)) !== "rgba(0, 0, 0, 0)", "A privacy card is transparent");
  }
  await page.screenshot({ path: resolve(output, "privacy-desktop.png"), fullPage: false });

  await page.goto(`${base}/es`, { waitUntil: "domcontentloaded" });
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await page.waitForURL(`${base}/en`);
  await page.locator(".page-pixel-scene").waitFor({ state: "hidden", timeout: 6_000 });
  await page.waitForLoadState("domcontentloaded");
  await page.waitForFunction(() => document.documentElement.lang === "en");
  assert((await page.locator("html").getAttribute("lang")) === "en", "HTML language did not update to English");
  assert((await page.getByRole("heading", { level: 1 }).textContent())?.includes("Duarte"), "English content is not visible");
  assert(await page.getByText("Linear algebra", { exact: true }).isVisible(), "English knowledge labels are missing");
  await page.goto(`${base}/es/projects`, { waitUntil: "domcontentloaded" });
  await page.locator(".project-index-row a").first().click();
  await page.locator(".page-pixel-scene").waitFor({ state: "visible", timeout: 2_000 });
  await page.waitForURL(`${base}/es/projects/rag-hibrido-documentacion`);
  await page.locator(".page-pixel-scene").waitFor({ state: "hidden", timeout: 6_000 });
  assert(await page.getByRole("heading", { level: 1, name: /RAG híbrido/i }).isVisible(), "Case study did not open");
  assert(await page.getByRole("heading", { name: /cómo funciona el sistema/i }).isVisible(), "Architecture narrative is missing");
  assert((await page.locator(".case-video iframe").count()) === 1, "RAG presentation is missing");
  assert((await page.locator(".previous-case").count()) === 0, "The first project should not have a previous-project link");
  assert((await page.locator(".next-case").count()) === 1, "The first project is missing its next-project link");
  await page.locator(".case-layout").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: resolve(output, "case-study.png"), fullPage: false });
  await page.locator(".case-pagination").scrollIntoViewIfNeeded();
  await page.screenshot({ path: resolve(output, "case-pagination.png"), fullPage: false });

  await page.goto(`${base}/es/projects/twinphoto`, { waitUntil: "domcontentloaded" });
  assert((await page.locator(".previous-case").count()) === 1, "A middle project is missing its previous-project link");
  assert((await page.locator(".next-case").count()) === 1, "A middle project is missing its next-project link");
  await page.locator(".case-pagination").scrollIntoViewIfNeeded();
  await page.screenshot({ path: resolve(output, "case-pagination-both.png"), fullPage: false });

  await page.goto(`${base}/es/about`, { waitUntil: "domcontentloaded" });
  assert((await page.locator(".site-header").getByRole("link", { name: "Sobre mí", exact: true }).getAttribute("aria-current")) === "page", "About is not marked as the current navigation tab");
  assert((await page.locator(".about-page.editorial-page").count()) === 1, "About does not use the shared editorial layout");
  for (const selector of [".about-identity", ".about-strengths", ".athletics-story", ".about-timeline", ".about-credentials", ".about-skills", ".about-hobbies", ".about-testimonials", ".about-closing"]) {
    const background = await page.locator(selector).evaluate((element) => getComputedStyle(element).backgroundColor);
    assert(background !== "rgba(0, 0, 0, 0)", `About section is still transparent: ${selector}`);
  }
  assert(await page.getByRole("heading", { level: 1, name: /Soy Duarte Fernández Piñeiro/i }).isVisible(), "Expanded profile heading is missing");
  const aboutHeroTypography = await page.locator(".about-hero h1").evaluate((element) => {
    const style = getComputedStyle(element);
    return parseFloat(style.lineHeight) / parseFloat(style.fontSize);
  });
  assert(aboutHeroTypography >= 0.95, "The About hero line-height is too tight for descenders and diacritics");
  const portrait = page.getByAltText(/Retrato profesional de Duarte/i);
  await portrait.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => [...document.images].some((image) => image.alt.includes("Retrato profesional") && image.complete && image.naturalWidth > 0));
  await page.waitForTimeout(900);
  assert(await portrait.isVisible(), "Professional portrait is missing");
  const portraitGeometry = await portrait.evaluate((element) => ({
    width: element.getBoundingClientRect().width,
    height: element.getBoundingClientRect().height,
    naturalWidth: element.naturalWidth,
    naturalHeight: element.naturalHeight
  }));
  assert(Math.abs(portraitGeometry.width / portraitGeometry.height - .8) <= .01, "The professional portrait does not keep the intended 4:5 crop");
  const portraitStyle = await portrait.evaluate((element) => ({ objectFit: getComputedStyle(element).objectFit, objectPosition: getComputedStyle(element).objectPosition }));
  assert(portraitStyle.objectFit === "cover" && portraitStyle.objectPosition.includes("27%"), "The professional portrait crop is not stable across viewports");
  await page.screenshot({ path: resolve(output, "about-portrait.png"), fullPage: false });
  const athletics = page.getByAltText(/Duarte compitiendo/i);
  await athletics.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => [...document.images].some((image) => image.alt.includes("Duarte compitiendo") && image.complete && image.naturalWidth > 0));
  await page.waitForTimeout(900);
  assert(await athletics.isVisible(), "Athletics photograph is missing");
  await page.screenshot({ path: resolve(output, "about-athletics.png"), fullPage: false });
  await page.locator(".about-strengths").scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  for (const selector of [".strength-card > span", ".strength-card h3", ".strength-card p"]) {
    const tops = await page.locator(`.strength-grid ${selector}`).evaluateAll((elements) => elements.map((element) => Math.round(element.getBoundingClientRect().top)));
    assert(Math.max(...tops) - Math.min(...tops) <= 2, `Strength card rows are not aligned: ${selector}`);
  }
  await page.screenshot({ path: resolve(output, "about-strengths.png"), fullPage: false });
  await page.locator(".about-hobbies").scrollIntoViewIfNeeded();
  await page.waitForFunction(() => [...document.images].some((image) => image.src.includes("duarte-sunset") && image.complete && image.naturalWidth > 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: resolve(output, "about-hobbies.png"), fullPage: false });
  const aboutSectionOrder = await page.locator(".about-hobbies, .about-testimonials, .about-closing").evaluateAll((elements) => elements.map((element) => element.className));
  assert(aboutSectionOrder[0].includes("about-hobbies") && aboutSectionOrder[1].includes("about-testimonials") && aboutSectionOrder[2].includes("about-closing"), "Testimonials are not placed between personal interests and the closing section");
  assert((await page.locator(".about-testimonials .testimonials-layout").count()) === 1, "About does not reuse the shared testimonial experience");
  const cvLink = page.locator(".about-story .cv-action");
  assert((await cvLink.getAttribute("href")) === "/cv/CV_Duarte_Fernandez_Pineiro_ES.pdf", "The Spanish About page does not use the Spanish CV");
  const cvClasses = (await cvLink.getAttribute("class"))?.split(/\s+/) ?? [];
  assert(["text-link", "hero-project-link", "hero-cv-link"].every((className) => cvClasses.includes(className)), "The About résumé action does not reuse the Home résumé treatment");
  const [cvPopup, cvDownload] = await Promise.all([
    desktop.waitForEvent("page"),
    page.waitForEvent("download"),
    cvLink.click()
  ]);
  assert(cvPopup.url().endsWith("/cv/CV_Duarte_Fernandez_Pineiro_ES.pdf"), "The CV preview did not open the Spanish document");
  assert(cvDownload.suggestedFilename() === "CV_Duarte_Fernandez_Pineiro_ES.pdf", "The Spanish CV download filename is incorrect");
  await cvPopup.close();
  const aboutScrollBeforeLocaleChange = await page.evaluate(() => window.scrollY);
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await page.locator(".page-pixel-scene").waitFor({ state: "visible", timeout: 2_000 });
  assert((await page.locator(".page-pixel-cell").count()) === 112, "The pixel transition is missing its 8 × 14 grid");
  await page.waitForTimeout(520);
  await page.screenshot({ path: resolve(output, "pixel-transition.png"), fullPage: false });
  await page.waitForURL(`${base}/en/about`);
  await page.locator(".page-pixel-scene").waitFor({ state: "hidden", timeout: 6_000 });
  assert(Math.abs((await page.evaluate(() => window.scrollY)) - aboutScrollBeforeLocaleChange) <= 3, "Language change did not preserve the position on the About route");
  assert((await page.locator(".about-story .cv-action").getAttribute("href")) === "/cv/CV_Duarte_Fernandez_Pineiro_EN.pdf", "The English About page does not use the English CV");
  await page.getByRole("link", { name: "ES", exact: true }).click();
  await page.waitForURL(`${base}/es/about`);
  await page.locator(".page-pixel-scene").waitFor({ state: "hidden", timeout: 6_000 });
  assert(parseFloat(await page.locator(".about-skill-groups article").first().evaluate((element) => getComputedStyle(element).borderTopLeftRadius)) >= 14, "About skill cards are missing the shared soft silhouette");
  assert(!(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)), "About page has horizontal overflow");
  const unexpectedErrors = unexpectedBrowserErrors(errors);
  assert(unexpectedErrors.length === 0, `Browser errors: ${unexpectedErrors.join(" | ")}`);
  await desktop.close();

  const widescreen = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const widescreenPage = await widescreen.newPage();
  const widescreenErrors = [];
  widescreenPage.on("console", (message) => message.type() === "error" && widescreenErrors.push(message.text()));
  widescreenPage.on("pageerror", (error) => widescreenErrors.push(error.message));
  await widescreenPage.goto(`${base}/es`, { waitUntil: "domcontentloaded" });
  if (await widescreenPage.locator(".consent-banner").isVisible()) await widescreenPage.getByRole("button", { name: /solo esenciales/i }).click();
  const pageFrame = await widescreenPage.locator(".site-page").boundingBox();
  assert(Boolean(pageFrame && pageFrame.width <= 1506 && pageFrame.x >= 200), "The centered editorial frame is not active at 1920px");
  assert(await widescreenPage.locator(".margin-neural-field").isVisible(), "The large-screen ambient margin field is missing");
  const heroBackground = await widescreenPage.locator(".hero-section").evaluate((element) => getComputedStyle(element).backgroundColor);
  assert(heroBackground === "rgba(0, 0, 0, 0)", "The hero should float directly over the particle field");
  const firstCard = await widescreenPage.locator(".home-page > .section-shell").first().boundingBox();
  const secondCard = await widescreenPage.locator(".home-page > .section-shell").nth(1).boundingBox();
  assert(Boolean(firstCard && secondCard && secondCard.y - (firstCard.y + firstCard.height) >= 10), "Homepage sections are not visibly separated");
  await widescreenPage.screenshot({ path: resolve(output, "home-widescreen-frame.png"), fullPage: false });
  await widescreenPage.locator(".capabilities-section").scrollIntoViewIfNeeded();
  const wideCardWidth = (await widescreenPage.locator(".capability-card").first().boundingBox())?.width ?? 0;
  assert(wideCardWidth >= 600, "Knowledge cards are too narrow on a 1920px monitor");
  await widescreenPage.screenshot({ path: resolve(output, "home-widescreen-knowledge.png"), fullPage: false });
  await widescreenPage.locator(".human-section").scrollIntoViewIfNeeded();
  await widescreenPage.waitForFunction(() => [...document.images].some((image) => image.src.includes("duarte-waterfall-wide") && image.complete && image.naturalWidth > 0));
  await widescreenPage.screenshot({ path: resolve(output, "home-widescreen-personal.png"), fullPage: false });
  await widescreenPage.locator(".site-footer").scrollIntoViewIfNeeded();
  assert((await widescreenPage.locator(".site-footer a[href='mailto:dfernandezpineiro@gmail.com']").count()) === 1, "The footer email does not point to the canonical inbox");
  const musicCredits = widescreenPage.locator(".music-credits");
  assert((await musicCredits.locator("summary").textContent())?.includes("Créditos musicales"), "The discreet music credits are missing");
  await musicCredits.locator("summary").click();
  for (const videoId of ["aazYwcjYPdQ", "gIrNZxDOYUY", "H0wvexNmX9U"]) {
    assert((await musicCredits.locator(`a[href='https://www.youtube.com/watch?v=${videoId}']`).count()) === 1, `The ${videoId} recording is not credited`);
  }
  const footerRadius = parseFloat(await widescreenPage.locator(".site-footer").evaluate((element) => getComputedStyle(element).borderTopLeftRadius));
  assert(footerRadius >= 10, "The footer card does not share the rounded island shape");
  assert((await widescreenPage.locator(".footer-statement").count()) === 0, "The removed footer statement is still present");
  assert(!(await widescreenPage.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)), "Widescreen layout has horizontal overflow");
  const unexpectedWidescreenErrors = unexpectedBrowserErrors(widescreenErrors);
  assert(unexpectedWidescreenErrors.length === 0, `Widescreen browser errors: ${unexpectedWidescreenErrors.join(" | ")}`);
  await widescreen.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(`${base}/es`, { waitUntil: "domcontentloaded" });
  if (await mobilePage.locator(".consent-banner").isVisible()) await mobilePage.getByRole("button", { name: /solo esenciales/i }).click();
  assert(!(await mobilePage.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)), "Mobile has horizontal overflow");
  await mobilePage.screenshot({ path: resolve(output, "home-mobile.png"), fullPage: false });
  await mobilePage.locator(".trajectory-section").scrollIntoViewIfNeeded();
  await mobilePage.screenshot({ path: resolve(output, "home-mobile-trajectory.png"), fullPage: false });
  await mobilePage.locator(".credentials-section").scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(900);
  const mobileCredentialWidth = (await mobilePage.locator(".credential-card").first().boundingBox())?.width ?? 0;
  assert(mobileCredentialWidth <= 360, "Credential cards do not fit the mobile viewport");
  await mobilePage.screenshot({ path: resolve(output, "home-mobile-credentials.png"), fullPage: false });
  await mobilePage.locator(".capabilities-section").scrollIntoViewIfNeeded();
  assert((await mobilePage.locator(".capability-track .capability-card").count()) === 9, "Mobile knowledge carousel is incomplete");
  await mobilePage.screenshot({ path: resolve(output, "home-mobile-knowledge.png"), fullPage: false });
  await mobilePage.locator(".human-section").scrollIntoViewIfNeeded();
  await mobilePage.waitForFunction(() => [...document.images].some((image) => image.src.includes("duarte-waterfall-wide") && image.complete && image.naturalWidth > 0));
  await mobilePage.screenshot({ path: resolve(output, "home-mobile-personal.png"), fullPage: false });
  for (const label of ["Proyectos", "Sobre mí", "Contacto"]) assert(await mobilePage.locator(".site-header").getByRole("link", { name: label, exact: true }).isVisible(), `Mobile static header link is missing: ${label}`);
  await mobilePage.goto(`${base}/es/about`, { waitUntil: "domcontentloaded" });
  assert(!(await mobilePage.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)), "Mobile about page has horizontal overflow");
  await mobilePage.screenshot({ path: resolve(output, "about-mobile.png"), fullPage: false });
  await mobilePage.getByAltText(/Retrato profesional de Duarte/i).scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(900);
  await mobilePage.screenshot({ path: resolve(output, "about-mobile-portrait.png"), fullPage: false });
  await mobile.close();

  const reduced = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  const reducedPage = await reduced.newPage();
  const reducedErrors = [];
  reducedPage.on("console", (message) => message.type() === "error" && reducedErrors.push(message.text()));
  reducedPage.on("pageerror", (error) => reducedErrors.push(error.message));
  await reducedPage.goto(`${base}/es`, { waitUntil: "domcontentloaded" });
  if (await reducedPage.locator(".consent-banner").isVisible()) await reducedPage.getByRole("button", { name: /solo esenciales/i }).click();
  assert((await reducedPage.locator(".hero-visual").count()) === 0, "The removed hero visual is present in reduced-motion mode");
  await reducedPage.screenshot({ path: resolve(output, "home-reduced-motion.png"), fullPage: false });
  const unexpectedReducedErrors = unexpectedBrowserErrors(reducedErrors);
  assert(unexpectedReducedErrors.length === 0, `Reduced-motion browser errors: ${unexpectedReducedErrors.join(" | ")}`);
  await reduced.close();
  console.log(JSON.stringify({ ok: true, projectCount, screenshots: output }));
} finally {
  await browser.close();
}
