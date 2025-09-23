// Example poems (you can expand later or load from localStorage)
const poems = [
  {
    id: 1,
    title: "The Dawn",
    content: "When the sun breaks the night, hope rises with its light..."
  },
  {
    id: 2,
    title: "My Cry",
    content: "They say the end of the world is nigh\nAnd I want to go to heaven when I die\nI lift my eyes to look up on high..."
  },
  {
    id: 3,
    title: "Silent Echo",
    content: "Through the valleys deep and wide,\nWhispers of dreams still collide..."
  }
];

// Display poems on index.html
function displayPoems() {
  const poemList = document.getElementById("poem-list");
  if (!poemList) return; // if not index.html, stop

  poemList.innerHTML = ""; // clear before loading

  poems.forEach(poem => {
    const card = document.createElement("div");
    card.classList.add("poem-card");
    card.innerHTML = `
      <h3>${poem.title}</h3>
      <p>${poem.content.substring(0, 100)}...</p>
      <a href="poem.html?id=${poem.id}" class="read-more">Read More</a>
    `;
    poemList.appendChild(card);
  });
}

// Show poem details on poem.html
function displayPoemDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  if (!id) return;

  const poem = poems.find(p => p.id === id);
  if (!poem) return;

  const container = document.getElementById("poem-container");
  if (container) {
    container.innerHTML = `
      <h2>${poem.title}</h2>
      <p>${poem.content.replace(/\n/g, "<br>")}</p>
      <a href="index.html" class="back-btn">← Back to Poems</a>
    `;
  }
}

// Run correct function depending on page
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("poem-list")) {
    displayPoems();
  } else if (document.getElementById("poem-container")) {
    displayPoemDetails();
  }
});
