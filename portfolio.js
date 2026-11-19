const themeButton = document.querySelector("#tema");
const root = document.documentElement;
let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
try {
  const saved = localStorage.getItem("portfolio-theme");
  if (saved) dark = saved === "dark";
} catch { /* Storage may be disabled. */ }

function renderTheme() {
  root.dataset.theme = dark ? "dark" : "light";
  themeButton.textContent = dark ? "Tema terang" : "Tema gelap";
}
renderTheme();
themeButton.hidden = false;
themeButton.addEventListener("click", () => {
  dark = !dark;
  renderTheme();
  try { localStorage.setItem("portfolio-theme", root.dataset.theme); } catch {}
});

const filters = document.querySelector(".filters");
const buttons = filters.querySelectorAll("button");
const projects = document.querySelectorAll("[data-category]");
function selectCategory(category) {
  for (const button of buttons) {
    button.setAttribute("aria-pressed", String(button.dataset.filter === category));
  }
  for (const project of projects) {
    project.hidden = category !== "all" && project.dataset.category !== category;
  }
}
filters.hidden = false;
for (const button of buttons) {
  button.addEventListener("click", () => selectCategory(button.dataset.filter));
}
window.addEventListener("hashchange", () => {
  if (location.hash === "#videos") {
    selectCategory("brand");
    document.getElementById("videos").scrollIntoView();
  }
});