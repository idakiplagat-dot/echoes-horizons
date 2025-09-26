let poems = [];

// Load poems from poems.json
async function loadPoems() {
  try {
    const response = await fetch("./poems.json");

    poems = await response.json();
    renderPoems(poems);
  } catch (err) {
    console.error("Error loading poems:", err);
    document.getElementById("poem-list").innerHTML = "<p>Failed to load poems.</p>";
  }
}

// Render poems on homepage
function renderPoems(list) {
  const container = document.getElementById("poem-list");
  container.innerHTML = "";

  list.forEach((poem) => {
    const div = document.createElement("div");
    div.className = "poem-card";
    div.innerHTML = `
      <h3><a href="poem.html?id=${poem.id}">${poem.title}</a></h3>
    `;
    container.appendChild(div);
  });
}

// Search bar
document.getElementById("searchBar").addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = poems.filter((p) =>
    p.title.toLowerCase().includes(term) ||
    p.content.toLowerCase().includes(term)
  );
  renderPoems(filtered);
});

// --- Fake Admin Login ---
const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminPanel = document.getElementById("admin-panel");
const savePoemBtn = document.getElementById("savePoemBtn");
const adminMessage = document.getElementById("admin-message");

adminLoginBtn.addEventListener("click", () => {
  const password = prompt("Enter admin password:");
  if (password === "echoes123") { // 🔑 change this to your own password
    adminPanel.style.display = "block";
    adminMessage.textContent = "Logged in as Admin.";
  } else {
    alert("Wrong password.");
  }
});

// --- Save Poem (downloads updated poems.json) ---
savePoemBtn.addEventListener("click", () => {
  const title = document.getElementById("poem-title").value.trim();
  const content = document.getElementById("poem-content").value.trim();

  if (!title || !content) {
    adminMessage.textContent = "Please fill in both fields.";
    return;
  }

  const newPoem = {
    id: String(Date.now()), // unique id
    title,
    content,
    likes: 0
  };

  poems.push(newPoem);

  // Download updated poems.json
  const blob = new Blob([JSON.stringify(poems, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "poems.json";
  a.click();
  URL.revokeObjectURL(url);

  adminMessage.textContent = "Poem added! Downloaded updated poems.json. Replace it in your repo to update the site.";
  renderPoems(poems);
});

// Load poems on page load
loadPoems();


