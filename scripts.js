async function loadPoems() {
  try {
    const response = await fetch("poems.json");
    const poems = await response.json();

    const list = document.getElementById("poems-list");
    list.innerHTML = poems.map(poem => `
      <div class="poem-card">
        <h2>${poem.title}</h2>
        <p>${poem.content.split("\n")[0]}...</p>
        <a href="poem.html?id=${poem.id}" class="read-btn">Read More</a>
      </div>
    `).join("");
  } catch (err) {
    console.error("Error loading poems:", err);
    document.getElementById("poems-list").innerHTML = "<p>Failed to load poems.</p>";
  }
}

function adminLogin() {
  const password = prompt("Enter admin password:");
  if (password === "admin123") {
    alert("Welcome, Admin!");
  } else {
    alert("Wrong password!");
  }
}

document.addEventListener("DOMContentLoaded", loadPoems);
