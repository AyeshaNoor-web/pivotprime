#!/usr/bin/env node
/**
 * Behaviour, with JavaScript running.
 *
 * Every other check on this branch reads static HTML. That is deliberate and it
 * caught real defects, but it cannot see interaction, and presence is exactly
 * what stays true while an interactive component is broken: the navigation
 * dropdowns were in the served markup, correctly hidden, and could not be opened
 * by clicking. The markup assertion passed throughout.
 *
 * The failure was that hover set the open menu and the click handler toggled it,
 * so by the time the click ran, hover had already opened the panel and the click
 * closed it. On a phone there is no hover, so the tap was the only way in and it
 * hit the same conflict.
 *
 * Drives the real Chrome through playwright-core.
 *
 *   node scripts/check-behaviour.mjs [baseUrl]
 */

import { chromium } from "playwright-core";

const BASE = (process.argv[2] ?? process.env.CHECK_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");

const failures = [];
let checks = 0;
const expect = (name, ok, detail = "") => {
  checks += 1;
  if (!ok) failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
};

let browser;
try {
  browser = await chromium.launch({ channel: "chrome" });
} catch (err) {
  console.error(`behaviour-check: could not launch the system Chrome: ${err.message.split("\n")[0]}`);
  console.error("  This check needs Google Chrome installed. Skipping rather than failing the build.");
  process.exit(0);
}

const openPanels = (page) =>
  page.evaluate(() => {
    const nav = document.querySelector("nav");
    return [...nav.querySelectorAll("div[id^='menu-']")]
      .filter((el) => getComputedStyle(el).display !== "none")
      .map((el) => el.id);
  });

// DESKTOP
{
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE, { waitUntil: "networkidle" });
  const triggers = await page.$$("nav button[aria-haspopup]");

  expect("three dropdown triggers exist", triggers.length === 3, `found ${triggers.length}`);
  expect("no panel is open on load", (await openPanels(page)).length === 0);

  // The literal reported failure: a mouse user hovers the label, the panel
  // appears, they click it, and it vanishes. Asserted separately from a bare
  // click because Playwright's click implies a hover of its own, and the two
  // orderings do not exercise the same race.
  await triggers[0].hover();
  await page.waitForTimeout(200);
  expect("hovering opens the panel on a pointer device", (await openPanels(page)).length === 1);
  await triggers[0].click();
  await page.waitForTimeout(200);
  expect(
    "clicking a label the pointer is already hovering keeps the panel open",
    (await openPanels(page)).length === 1,
    "hover opened it and the click closed it again",
  );
  await page.keyboard.press("Escape");
  await page.waitForTimeout(150);
  await page.mouse.move(1000, 600);
  await page.waitForTimeout(150);

  // Click reveals, click again hides.
  await triggers[0].click();
  await page.waitForTimeout(150);
  const afterOpen = await openPanels(page);
  expect("clicking a top-level item reveals its panel", afterOpen.length === 1, `open: ${afterOpen.length}`);
  expect(
    "the trigger reports itself expanded",
    (await triggers[0].getAttribute("aria-expanded")) === "true",
  );

  await triggers[0].click();
  await page.waitForTimeout(150);
  expect("clicking it again hides the panel", (await openPanels(page)).length === 0);

  // Opening by click must survive the pointer moving away.
  await triggers[1].click();
  await page.waitForTimeout(150);
  await page.mouse.move(1000, 600);
  await page.waitForTimeout(250);
  expect("a panel opened by click stays open when the pointer leaves", (await openPanels(page)).length === 1);

  // Only one at a time.
  await triggers[2].click();
  await page.waitForTimeout(150);
  const both = await openPanels(page);
  expect("only one panel is open at a time", both.length === 1, `open: ${both.join(", ")}`);

  // Escape closes and returns focus to the trigger.
  await page.keyboard.press("Escape");
  await page.waitForTimeout(150);
  expect("Escape closes the panel", (await openPanels(page)).length === 0);
  const focused = await page.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 20) ?? "");
  expect("Escape returns focus to the trigger", focused.length > 0, `focus on "${focused}"`);

  // Outside click closes.
  await triggers[0].click();
  await page.waitForTimeout(150);
  await page.mouse.click(700, 600);
  await page.waitForTimeout(200);
  expect("clicking outside closes the panel", (await openPanels(page)).length === 0);

  // Keyboard alone must be able to open it.
  await page.keyboard.press("Tab");
  await triggers[0].focus();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(150);
  expect("Enter on a focused trigger opens the panel", (await openPanels(page)).length === 1);

  await page.close();
}

// TOUCH. There is no hover here, so the tap has to be sufficient on its own.
{
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });

  const burger = await page.$('nav button[aria-controls="mobile-menu"]');
  expect("the mobile menu button exists", !!burger);
  await burger.tap();
  await page.waitForTimeout(250);
  expect("tapping it opens the mobile menu", !!(await page.$("#mobile-menu")));

  const sections = await page.$$("#mobile-menu button[aria-expanded]");
  expect("the mobile menu has disclosure buttons", sections.length === 3, `found ${sections.length}`);

  await sections[0].tap();
  await page.waitForTimeout(250);
  const revealed = await page.evaluate(
    () => document.querySelectorAll("#mobile-menu ul a").length,
  );
  expect("tapping a section reveals its links", revealed > 0, `${revealed} links`);
  expect(
    "the section reports itself expanded",
    (await sections[0].getAttribute("aria-expanded")) === "true",
  );

  await sections[0].tap();
  await page.waitForTimeout(250);
  expect(
    "tapping it again collapses the section",
    (await sections[0].getAttribute("aria-expanded")) === "false",
  );

  await context.close();
}

await browser.close();

if (failures.length === 0) {
  console.log(`behaviour-check: clean (${checks} interaction assertions, desktop and touch)`);
} else {
  for (const f of failures) console.error(`  ${f}`);
  console.error(`\nbehaviour-check: ${failures.length} of ${checks} interaction assertions failed.`);
  process.exit(1);
}
