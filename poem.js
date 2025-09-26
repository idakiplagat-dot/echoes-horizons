// poem.js — loads poems.json, shows poem, enables Prev/Next/Home/Back

let poems = [];
let currentIndex = -1;

// small helper to escape html
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#39;");
}

async function loadPoem() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  try {
    const res = await fetch("./poems.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    poems = await res.json();

    currentIndex = poems.findIndex(p => String(p.id) === String(id));
    const poem = poems[currentIndex];

    const container = document.getElementById("poem-container");
    if (poem) {
      container.innerHTML = `
        <h2>${escapeHtml(poem.title)}</h2>
        <div class="poem-content">${escapeHtml(poem.content).replace(/\n/g,"<br>")}</div>
      `;
    } else {
      container.innerHTML = "<p>Poem not found.</p>";
    }
    updateNavButtons();
  } catch(err) {
    console.error("Error loading poem:", err);
    const container = document.getElementById("poem-container");
    if (container) container.innerHTML = "<p>Failed to load poem.</p>";
  }
}

function updateNavButtons() {
  const prevBtn = document.getElementById("btn-prev");
  const nextBtn = document.getElementById("btn-next");
  prevBtn.disabled = currentIndex <= 0;
  nextBtn.disabled = currentIndex < 0 || currentIndex >= poems.length - 1;
}

function goHome() { window.location.href = "index.html"; }
function goBack() { window.history.back(); }
function goPrev() {
  if (currentIndex > 0) {
    const prev = poems[currentIndex - 1];
    window.location.href = `poem.html?id=${encodeURIComponent(prev.id)}`;
  } else {
    alert("This is the first poem.");
  }
}
function goNext() {
  if (currentIndex < poems.length - 1) {
    const next = poems[currentIndex + 1];
    window.location.href = `poem.html?id=${encodeURIComponent(next.id)}`;
  } else {
    alert("This is the last poem.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-back").addEventListener("click", goBack);
  document.getElementById("btn-prev").addEventListener("click", goPrev);
  document.getElementById("btn-home").addEventListener("click", goHome);
  document.getElementById("btn-next").addEventListener("click", goNext);

  // keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
    if (e.key === "Escape") goHome();
  });

  loadPoem();
});
