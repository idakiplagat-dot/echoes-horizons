async function loadPoems() {
  try {
    const response = await fetch("poems.json");
    const poems = await response.json();

    const container = document.querySelector(".poems-container");
    const searchInput = document.getElementById("search");

    function render(poemsToShow) {
      container.innerHTML = poemsToShow.map(poem => `
        <div class="poem-card">
          <img src="${poem.image}" alt="${poem.title}">
          <div class="poem-content">
            <h3 class="poem-title">${poem.title}</h3>
            <p>${poem.content.substring(0, 80)}...</p>
            <a href="poem.html?id=${poem.id}">Read more</a>
          </div>
        </div>
      `).join("");
    }

    render(poems);

    // Search
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = poems.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.content.toLowerCase().includes(q)
      );
      render(filtered);
    });

  } catch (err) {
    console.error("Error loading poems:", err);
    document.querySelector(".poems-container").innerHTML = "<p>Failed to load poems.</p>";
  }
}

loadPoems();
