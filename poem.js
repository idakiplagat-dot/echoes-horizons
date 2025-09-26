// poem.js — navigation-ready, single loadPoem(), event-listener approach

let poems = [];
let currentIndex = -1;

// small helper to avoid injecting raw HTML
function escapeHtml(str = "") {
  return str.replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[m]));
}

async function loadPoem() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  try {
    const response = await fetch("./poems.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    poems = await response.json();

    currentIndex = poems.findIndex((p) => String(p.id) === String(id));
    const poem = poems[currentIndex];

    const container = document.getElementById("poem-container");
    if (poem) {
      container.innerHTML = `
        <h2>${escapeHtml(poem.title)}</h2>
        <div class="poem-content">${escapeHtml(poem.content).replace(/\n/g, "<br>")}</div>
      `;
    } else {
      container.innerHTML = "<p>Poem not found.</p>";
    }

    updateNavButtons();
    console.log("Loaded poem index:", currentIndex, "id:", id);
  } catch (err) {
    console.error("Error loading poem:", err);
    const container = document.getElementById("poem-container");
    if (container) container.innerHTML = "<p>Failed to load poem.</p>";
  }
}

function updateNavButtons() {
  const prevBtn = document.getElementById("btn-prev");
  const nextBtn = document.getElementById("btn-next");

  if (!prevBtn || !nextBtn) return;

  prevBtn.disabled = currentIndex <= 0;
  nextBtn.disabled = currentIndex < 0 || currentIndex >= poems.length - 1;
}

// Navigation actions
function goHome() {
  console.log("Home clicked");
  window.location.href = "index.html";
}

function goBack() {
  console.log("Back clicked");
  window.history.back();
}

function goPrev() {
  console.log("Prev clicked, currentIndex:", currentIndex);
  if (currentIndex > 0) {
    const prevPoem = poems[currentIndex - 1];
    window.location.href = `poem.html?id=${encodeURIComponent(prevPoem.id)}`;
  } else {
    // you can keep this silent if you prefer
    alert("This is the first poem.");
  }
}

function goNext() {
  console.log("Next clicked, currentIndex:", currentIndex);
  if (currentIndex < poems.length - 1) {
    const nextPoem = poems[currentIndex + 1];
    window.location.href = `poem.html?id=${encodeURIComponent(nextPoem.id)}`;
  } else {
    alert("This is the last poem.");
  }
}

// Attach listeners after the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const back = document.getElementById("btn-back");
  const prev = document.getElementById("btn-prev");
  const home = document.getElementById("btn-home");
  const next = document.getElementById("btn-next");

  if (back) back.addEventListener("click", goBack);
  if (prev) prev.addEventListener("click", goPrev);
  if (home) home.addEventListener("click", goHome);
  if (next) next.addEventListener("click", goNext);

  // keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
    if (e.key === "Escape") goHome();
  });

  // finally load the poem
  loadPoem();
});







