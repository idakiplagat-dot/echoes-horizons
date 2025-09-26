// scripts.js — JSON-backed homepage + simple admin (download + snippet)

let poems = [];

// DOM refs
const poemList = document.getElementById("poem-list");
const searchBar = document.getElementById("searchBar");
const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminPanel = document.getElementById("admin-panel");
const savePoemBtn = document.getElementById("savePoemBtn");
const showSnippetBtn = document.getElementById("showSnippetBtn");
const poemTitleInput = document.getElementById("poem-title");
const poemContentInput = document.getElementById("poem-content");
const adminMessage = document.getElementById("admin-message");
const enterBtn = document.getElementById("enterBtn");

// load poems.json
async function loadPoems() {
  poemList.innerHTML = '<p class="muted">Loading poems…</p>';
  try {
    const res = await fetch("./poems.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    poems = await res.json();
    renderPoems(poems);
  } catch (err) {
    console.error("Error loading poems:", err);
    poemList.innerHTML = '<p class="muted">Failed to load poems.</p>';
  }
}

// render list
function renderPoems(list) {
  if (!list || list.length === 0) {
    poemList.innerHTML = '<p class="muted">No poems yet.</p>';
    return;
  }

  poemList.innerHTML = "";
  list.forEach(poem => {
    const card = document.createElement("article");
    card.className = "poem-card";

    const thumbHtml = poem.image ? `<img class="poem-thumb" src="${escapeHtml(poem.image)}" alt="${escapeHtml(poem.title)}">` : "";
    const excerpt = (poem.content || "").replace(/\n/g, " ").slice(0,140) + (poem.content.length>140 ? "…" : "");
    card.innerHTML = `
      ${thumbHtml}
      <h3>${escapeHtml(poem.title)}</h3>
      <p>${escapeHtml(excerpt)}</p>
      <div class="card-actions">
        <a class="read-more" href="poem.html?id=${encodeURIComponent(poem.id)}">Read more</a>
        <span style="color:var(--muted); font-size:0.9rem;">${poem.likes ?? 0} ♥</span>
      </div>
    `;
    poemList.appendChild(card);
  });
}

// escape helper
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#39;");
}

// search
searchBar?.addEventListener("input", (e) => {
  const q = (e.target.value || "").toLowerCase();
  const filtered = poems.filter(p => (p.title + " " + (p.content||"")).toLowerCase().includes(q));
  renderPoems(filtered);
});

// simple admin login (client-side only)
let isAdmin = false;
adminLoginBtn?.addEventListener("click", () => {
  if (isAdmin) {
    // logout
    isAdmin = false;
    adminPanel.style.display = "none";
    adminLoginBtn.textContent = "Admin Login";
    adminMessage.textContent = "Logged out.";
    return;
  }
  const password = prompt("Admin password:");
  // CHANGE THIS to your own password
  if (password === "echoes123") {
    isAdmin = true;
    adminPanel.style.display = "block";
    adminLoginBtn.textContent = "Logout Admin";
    adminMessage.textContent = "Logged in as admin.";
  } else {
    alert("Incorrect password.");
  }
});

// save poem -> push to local array, download full poems.json and show snippet
savePoemBtn?.addEventListener("click", () => {
  const title = (poemTitleInput.value || "").trim();
  const content = (poemContentInput.value || "").trim();
  if (!title || !content) {
    adminMessage.textContent = "Please fill both title and content.";
    return;
  }

  const newPoem = {
    id: String(Date.now()),
    title,
    content,
    likes: 0
    // optional: image: "images/your-image.jpg"
  };

  poems.push(newPoem);
  renderPoems(poems);

  // download full file
  const blob = new Blob([JSON.stringify(poems, null, 2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "poems.json";
  a.click();
  URL.revokeObjectURL(url);

  adminMessage.innerHTML = "Poem added and downloaded.<br>Copy this snippet into your poems.json if you prefer:<pre>" +
    escapeHtml(JSON.stringify(newPoem, null, 2)) + "</pre>";
  poemTitleInput.value = "";
  poemContentInput.value = "";
});

// show snippet button: display last poem snippet if exists
showSnippetBtn?.addEventListener("click", () => {
  const last = poems[poems.length - 1];
  if (!last) { adminMessage.textContent = "No poem to show."; return; }
  adminMessage.innerHTML = "Copy this JSON snippet into poems.json:<pre>" + escapeHtml(JSON.stringify(last, null, 2)) + "</pre>";
});

// hero enter button scrolls to content
enterBtn?.addEventListener("click", () => {
  const contentEl = document.getElementById("content");
  contentEl?.scrollIntoView({ behavior: "smooth" });
});

// init
loadPoems();
