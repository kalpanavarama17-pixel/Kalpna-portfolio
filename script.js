/* ==========================================================
   Kalpana Verma | Portfolio Script (Vanilla JS, no backend)
   ----------------------------------------------------------
   1. SITE_CONFIG   ← EDIT THIS to add your real links
   2. Helpers
   3. Link wiring, navbar, scroll effects, reveal animations
   4. Typewriter, skill bars, counters
   5. Lightbox, contact form
   ========================================================== */

/* ---------- 1. SITE CONFIGURATION ----------
   Paste your real URLs between the quotes. Anything left empty ("")
   is handled gracefully: the button shows a friendly notice instead of
   going to a broken page, and optional buttons (live demo) stay hidden.
*/
const SITE_CONFIG = {
  email: "kalpnavarma10072006@gmail.com",

  // Your profiles, e.g. "https://github.com/your-username"
  github: "",
  linkedin: "",

  // Project links, e.g. "https://github.com/your-username/ai-smart-office-assistant"
  repoSmartOffice: "",
  demoSmartOffice: "",          // Only fill in when a WORKING live demo exists
  repoApplicationForm: "",

  // Certificate files/links, e.g. "assets/certificates/copa-certificate.pdf"
  certCopa: "",
  certAdca: "",

  // Optional: a free form service endpoint (e.g. "https://formspree.io/f/xxxxxxx").
  // Leave empty to use the email-app (mailto) method, which needs no setup.
  formEndpoint: ""
};

/* ---------- 2. HELPERS ---------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const toastEl = $("#toast");
let toastTimer;
function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3600);
}

/* ---------- 3a. LINK WIRING ---------- */
const PENDING_MESSAGES = {
  github: "Add your GitHub profile URL in script.js (SITE_CONFIG → github).",
  linkedin: "Add your LinkedIn profile URL in script.js (SITE_CONFIG → linkedin).",
  default: "This link isn't set up yet. Add it in script.js (SITE_CONFIG)."
};

$$("[data-link]").forEach(link => {
  const key = link.dataset.link;
  const url = (SITE_CONFIG[key] || "").trim();

  if (url) {
    link.href = url;
    link.hidden = false;
    // Local files (assets/...) open in the same tab; external sites in a new tab
    if (!/^https?:\/\//i.test(url)) link.removeAttribute("target");
    return;
  }

  // No URL yet
  if (link.dataset.hideIfEmpty === "true") { link.hidden = true; return; }

  link.classList.add("is-pending");
  link.setAttribute("aria-disabled", "true");
  link.addEventListener("click", e => {
    e.preventDefault();
    showToast(PENDING_MESSAGES[key] || PENDING_MESSAGES.default);
  });
});

/* ---------- 3b. NAVBAR ---------- */
const navbar = $("#navbar");
const navToggle = $("#navToggle");
const navLinks = $("#navLinks");

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
navToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
$$(".nav-link").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
document.addEventListener("click", e => {
  if (navLinks.classList.contains("open") && !navLinks.contains(e.target) && !navToggle.contains(e.target)) setMenu(false);
});

/* ---------- 3c. SCROLL EFFECTS ---------- */
const progressBar = $("#scrollProgress");
const toTop = $("#toTop");

function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
  navbar.classList.toggle("scrolled", y > 20);
  toTop.classList.toggle("show", y > 600);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" }));

// Highlight the nav link of the section currently in view
const sectionLinks = new Map($$(".nav-link").map(a => [a.getAttribute("href").slice(1), a]));
if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sectionLinks.forEach(a => a.classList.remove("active"));
        const active = sectionLinks.get(entry.target.id);
        if (active) active.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach(s => spy.observe(s));
}

/* ---------- 3d. REVEAL ON SCROLL ---------- */
const revealEls = $$(".reveal");
if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = (i % 3) * 90 + "ms"; // gentle stagger
    revealer.observe(el);
  });
} else {
  revealEls.forEach(el => el.classList.add("in"));
}

/* ---------- 4a. TYPEWRITER ---------- */
const roles = [
  "Aspiring Software Developer",
  "Computer Software Application Trainee",
  "Python & Web Developer",
  "AI Enthusiast"
];
const twEl = $("#typewriter");
if (prefersReducedMotion) {
  twEl.textContent = roles[0];
} else {
  let r = 0, c = 0, deleting = false;
  (function tick() {
    const word = roles[r];
    twEl.textContent = word.slice(0, c);
    let delay = deleting ? 35 : 75;
    if (!deleting && c === word.length) { deleting = true; delay = 1700; }
    else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 400; }
    else { c += deleting ? -1 : 1; }
    setTimeout(tick, delay);
  })();
}

/* ---------- 4b. SKILL BARS + COUNTERS ---------- */
function animateBars(root) {
  $$(".bar span", root).forEach(bar => { bar.style.width = bar.dataset.level + "%"; });
}
function animateCount(el) {
  const target = Number(el.dataset.count);
  if (prefersReducedMotion) { el.textContent = target; return; }
  const start = performance.now(), duration = 1200;
  (function step(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  })(start);
}

if ("IntersectionObserver" in window) {
  const fillObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateBars(entry.target);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  $$(".skill-card").forEach(card => fillObs.observe(card));

  const countObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCount(entry.target);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach(el => countObs.observe(el));
} else {
  animateBars(document);
  $$("[data-count]").forEach(el => { el.textContent = el.dataset.count; });
}

/* ---------- 5a. LIGHTBOX ---------- */
const lightbox = $("#lightbox");
const lightboxImg = $("#lightboxImg");
let lastFocus = null;

function openLightbox(src, trigger) {
  lastFocus = trigger;
  lightboxImg.src = src;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  $("#lightboxClose").focus();
}
function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = "";
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}
$$("[data-lightbox]").forEach(btn => btn.addEventListener("click", () => openLightbox(btn.dataset.lightbox, btn)));
$("#lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !lightbox.hidden) closeLightbox(); });

/* ---------- 5b. CONTACT FORM ----------
   No backend needed:
   • Default  → opens the visitor's email app with a pre-filled message.
   • Optional → if SITE_CONFIG.formEndpoint is set, posts to that service.
*/
const form = $("#contactForm");
const statusEl = $("#formStatus");

function setFieldError(input, message) {
  const field = input.closest(".field");
  field.classList.toggle("invalid", Boolean(message));
  $(".error", field).textContent = message || "";
}

function validateForm() {
  let valid = true;
  const name = form.elements.name, email = form.elements.email, message = form.elements.message;

  if (!name.value.trim()) { setFieldError(name, "Please enter your name."); valid = false; } else setFieldError(name);

  if (!email.value.trim()) { setFieldError(email, "Please enter your email."); valid = false; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { setFieldError(email, "That email doesn't look right."); valid = false; }
  else setFieldError(email);

  if (message.value.trim().length < 10) { setFieldError(message, "Please write a short message (10+ characters)."); valid = false; } else setFieldError(message);

  return valid;
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  statusEl.className = "form-status";
  statusEl.textContent = "";
  if (!validateForm()) return;

  const data = {
    name: form.elements.name.value.trim(),
    email: form.elements.email.value.trim(),
    subject: form.elements.subject.value.trim() || "Portfolio enquiry",
    message: form.elements.message.value.trim()
  };

  // Option A: external form service
  if (SITE_CONFIG.formEndpoint) {
    try {
      const res = await fetch(SITE_CONFIG.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      statusEl.classList.add("ok");
      statusEl.textContent = "Thank you! Your message has been sent.";
    } catch (err) {
      statusEl.classList.add("err");
      statusEl.textContent = "Sorry, something went wrong. Please email me directly at " + SITE_CONFIG.email + ".";
    }
    return;
  }

  // Option B (default): open the visitor's email app
  const body = `Hi Kalpana,\n\n${data.message}\n\n— ${data.name}\n${data.email}`;
  window.location.href =
    `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
  statusEl.classList.add("ok");
  statusEl.textContent = "Opening your email app… if nothing opens, write to " + SITE_CONFIG.email + ".";
});

// Clear an error as soon as the user fixes the field
["name", "email", "message"].forEach(n => form.elements[n].addEventListener("input", () => setFieldError(form.elements[n])));

/* ---------- Footer year ---------- */
$("#year").textContent = new Date().getFullYear();
