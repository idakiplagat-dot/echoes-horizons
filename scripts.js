async function loadPoems() {
  try {
    const response = await fetch("poems.json");
    const poems = await response.json();
    const container = document.getElementById("poem-list");

    container.innerHTML = poems.map(poem => `
      <div class="poem-card">
        <h2>${poem.title}</h2>
        <p>${poem.content.substring(0, 100)}...</p>
        <a href="poem.html?id=${poem.id}" class="read-more">Read More</a>
      </div>
    `).join("");
  } catch (err) {
    console.error("Error loading poems:", err);
    document.getElementById("poem-list").innerHTML = "<p>Failed to load poems.</p>";
  }
}

function loginAdmin() {
  alert("Admin login not yet implemented!");
}

loadPoems();
