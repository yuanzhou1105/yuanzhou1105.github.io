"use strict";

// Content and abstract controls work without JavaScript. This file only enhances
// the mobile navigation and marks the section currently being read.
const menuButton = document.querySelector(".nav-toggle");
const navigation = document.querySelector("#site-navigation");
const navigationLinks = Array.from(navigation.querySelectorAll('a[href^="#"]'));
const mobileLayout = window.matchMedia("(max-width: 760px)");

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "Menu";
}

menuButton.hidden = false;
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.textContent = isOpen ? "Menu" : "Close";
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (!mobileLayout.matches) return;
    closeMenu();
    const destination = link.getAttribute("href");
    // A document link should also close the menu before leaving the page.
    if (!destination.startsWith("#")) return;
    // Focus the chosen heading so keyboard users do not remain in a hidden menu.
    const section = document.querySelector(destination);
    const heading = section.querySelector("h1, h2");
    heading.setAttribute("tabindex", "-1");
    // Wait for the native anchor navigation before moving keyboard focus.
    window.requestAnimationFrame(() => heading.focus({ preventScroll: true }));
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});

mobileLayout.addEventListener("change", closeMenu);

const sections = navigationLinks.map((link) => document.querySelector(link.getAttribute("href")));
let navigationUpdatePending = false;

function updateCurrentSection() {
  const readingLine = document.querySelector(".site-header").offsetHeight + 100;
  let currentSection = sections[0];
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= readingLine) currentSection = section;
  });
  // Contact may be too short to reach the reading line before the page ends.
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  if (atBottom) currentSection = sections[sections.length - 1];
  navigationLinks.forEach((link) => {
    if (link.getAttribute("href") === `#${currentSection.id}`) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
  navigationUpdatePending = false;
}

function scheduleNavigationUpdate() {
  if (navigationUpdatePending) return;
  navigationUpdatePending = true;
  window.requestAnimationFrame(updateCurrentSection);
}

window.addEventListener("scroll", scheduleNavigationUpdate, { passive: true });
window.addEventListener("resize", scheduleNavigationUpdate);
window.addEventListener("pageshow", scheduleNavigationUpdate);
updateCurrentSection();
