let poems = [];
let currentIndex = -1;

async function loadPoem() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  try {
    const response = await fetch("poems.json?nocache=" + new Date().getTime());
    if (!response.ok) throw new Error("Failed to load poems.json");
    poems = await response.json();

    const poem = poems.find((p) => p.id === id);
    currentIndex = poems.findIndex((p) => p.id === id);

    const titleElement = document.getElementById("poem-title");
    const contentElement = document.getElementById("poem-content");

    if (poem) {
      titleElement.textContent = poem.title;
      contentElement.textContent = poem.content;

      // 🌄 set background image for this poem
      if (poem.image) {
        document.body.style.backgroundImage = `url('${poem.image}')`;
      }
    } else {
      titleElement.textContent = "Poem Not Found";
      contentElement.textContent = "";
      document.body.style.backgroundImage = ""; // fallback
    }
  } catch (error) {
    console.error("Error loading poem:", error);
  }
}

// navigation
function goHome() { window.location.href = "index.html"; }
function goBack() { window.history.back(); }
function prevPoem() {
  if (currentIndex > 0) {
    const prevPoem = poems[currentIndex - 1];
    window.location.href = `poem.html?id=${prevPoem.id}`;
  }
}
function nextPoem() {
  if (currentIndex < poems.length - 1) {
    const nextPoem = poems[currentIndex + 1];
    window.location.href = `poem.html?id=${nextPoem.id}`;
  }
}

loadPoem();
