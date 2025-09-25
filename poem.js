async function loadPoem() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  try {
    const response = await fetch("poems.json");
    const poems = await response.json();
    const poem = poems.find((p) => p.id === id);

    const container = document.getElementById("poem-container");
    if (poem) {
      container.innerHTML = `
        <h2>${poem.title}</h2>
        <p>${poem.content.replace(/\n/g, "<br>")}</p>
      `;
    } else {
      container.innerHTML = "<p>Poem not found.</p>";
    }
  } catch (err) {
    console.error("Error loading poem:", err);
    document.getElementById("poem-container").innerHTML = "<p>Failed to load poem.</p>";
  }
}

loadPoem();


