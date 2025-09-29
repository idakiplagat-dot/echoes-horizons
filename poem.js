// poem.js — robust background loading + navigation

let poems = [];
let currentIndex = -1;

function safeText(s){ return String(s ?? ""); }

async function fetchPoems(){
  try {
    const r = await fetch("./poems.json");
    if (!r.ok) throw new Error(`Failed loading poems.json (status ${r.status})`);
    return await r.json();
  } catch (err) {
    console.error("Error fetching poems.json:", err);
    throw err;
  }
}

// try to preload an image from candidate paths, resolves with the successful path or null
function preloadImage(candidates = []) {
  return new Promise((resolve) => {
    let i = 0;
    function tryNext() {
      if (i >= candidates.length) return resolve(null);
      const url = candidates[i++];
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => tryNext();
      img.src = url;
    }
    tryNext();
  });
}

async function setHeroBackground(element, imgName) {
  if (!element) return;
  // candidate paths to try (order matters)
  const candidates = [
    imgName,
    `images/${imgName}`,
    `./images/${imgName}`,
    `./${imgName}`
  ].filter(Boolean);

  const found = await preloadImage(candidates);
  if (found) {
    element.style.backgroundImage = `url('${found}')`;
    element.classList.add("bg-loaded");
    console.log("Background image set to:", found);
  } else {
    console.warn("No background image found for:", imgName, "tried:", candidates);
    // fallback: remove background or set a safe color gradient
    element.style.backgroundImage = "linear-gradient(120deg,#0b0b0f,#0f1720)";
  }
}

async function loadPoem() {
  try {
    poems = await fetchPoems();
  } catch (err) {
    const container = document.getElementById("poem-container");
    if (container) container.innerHTML = "<p>Failed to load poem list.</p>";
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  currentIndex = poems.findIndex(p => String(p.id) === String(id));
  const poem = poems[currentIndex];

  const hero = document.querySelector(".poem-hero");
  const container = document.getElementById("poem-container");

  if (!container) {
    console.error("No '#poem-container' element found in DOM.");
    return;
  }

  if (!poem) {
    container.innerHTML = "<p>Poem not found.</p>";
    // also clear background to safe fallback
    if (hero) hero.style.backgroundImage = "linear-gradient(120deg,#0b0b0f,#0f1720)";
    return;
  }

  // set poem content (safe)
  container.innerHTML = `
    <h2>${safeText(poem.title)}</h2>
    <div class="poem-content">${safeText(poem.content).replace(/\n/g,"<br>")}</div>
  `;

  // try to set background image (poem.image expected in poems.json)
  const imageName = poem.image || poem.img || "";
  if (hero && imageName) {
    await setHeroBackground(hero, imageName);
  } else {
    // if no image specified, fallback gracefully (keeps existing body background or gradient)
    console.info("Poem has no image field, using default background.");
    if (hero) hero.style.backgroundImage = "linear-gradient(120deg,#0b0b0f,#0f1720)";
  }

  // update nav buttons' enabled/disabled state
  updateNavButtons();
}

function updateNavButtons() {
  const prevBtn = document.getElementById("btn-prev");
  const nextBtn = document.getElementById("btn-next");
  const homeBtn = document.getElementById("btn-home");
  const backBtn = document.getElementById("btn-back");

  if (prevBtn) prevBtn.disabled = currentIndex <= 0;
  if (nextBtn) nextBtn.disabled = currentIndex < 0 || currentIndex >= poems.length - 1;
  if (homeBtn) homeBtn.disabled = false;
  if (backBtn) backBtn.disabled = false;
}

function goHome(){ window.location.href = "index.html"; }
function goBack(){ window.history.back(); }
function goPrev(){
  if (currentIndex > 0) {
    const prev = poems[currentIndex - 1];
    window.location.href = `poem.html?id=${encodeURIComponent(prev.id)}`;
  } else { alert("This is the first poem."); }
}
function goNext(){
  if (currentIndex < poems.length - 1) {
    const next = poems[currentIndex + 1];
    window.location.href = `poem.html?id=${encodeURIComponent(next.id)}`;
  } else { alert("This is the last poem."); }
}

// attach handlers and load after DOM ready
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-prev")?.addEventListener("click", goPrev);
  document.getElementById("btn-next")?.addEventListener("click", goNext);
  document.getElementById("btn-home")?.addEventListener("click", goHome);
  document.getElementById("btn-back")?.addEventListener("click", goBack);

  loadPoem();
});


