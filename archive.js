async function loadArchive() {
  try {
    const response = await fetch("poems.json?nocache=" + new Date().getTime());
    if (!response.ok) throw new Error("Failed to load poems.json");

    const poems = await response.json();
    const list = document.getElementById("poem-list");

    poems.forEach(poem => {
      // make a preview (first 20 words or so)
      const preview = poem.content.split(" ").slice(0, 20).join(" ") + "...";

      const card = document.createElement("div");
      card.className = "poem-card";
      card.onclick = () => window.location.href = `poem.html?id=${poem.id}`;

      card.innerHTML = `
        <h2>${poem.title}</h2>
        <p>${preview}</p>
      `;

      list.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading archive:", err);
    document.getElementById("poem-list").innerHTML = "<p>Failed to load poems.</p>";
  }
}

loadArchive();
