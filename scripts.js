async function loadPoems() {
  try {
    const response = await fetch("poems.json");
    const poems = await response.json();

    const container = document.getElementById("poems-container");
    container.innerHTML = "";

    poems.forEach(poem => {
      const card = document.createElement("div");
      card.classList.add("poem-card");
      card.innerHTML = `
        <h3>${poem.title}</h3>
        <p>${poem.content.substring(0, 100)}...</p>
        <a href="poem.html?id=${poem.id}">Read more</a>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading poems:", err);
    document.getElementById("poems-container").innerHTML = "<p>Failed to load poems.</p>";
  }
}

loadPoems();
