const poems = [
  {
    id: 1,
    title: "The Dawn",
    content: "When the sun breaks the night,\nHope rises with its light...",
    image: "image_hero.jpg"
  },
  {
    id: 2,
    title: "Echoes in the Wind",
    content: "Whispers drift through the canyon of my heart,\nLingering like forgotten songs...",
    image: "image_boat.jpg"
  },
  {
    id: 3,
    title: "Silent Shores",
    content: "The ocean holds its breath at dawn,\nWaiting for the sun to rise...",
    image: "image_cosmic.jpg"
  }
];

// ✅ Escape text safely
function safeText(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

const params = new URLSearchParams(window.location.search);
let currentId = parseInt(params.get("id")) || 1;
const container = document.getElementById("poem-container");

function loadPoem(id) {
  const poem = poems.find(p => p.id === id);
  if (!poem) return;

  // Load text content only
  container.innerHTML = `
    <h2>${safeText(poem.title)}</h2>
    <div class="poem-content">${safeText(poem.content).replace(/\n/g, "<br>")}</div>
  `;

  // Set background image
  const hero = document.querySelector(".poem-hero");
  if (hero && poem.image) {
    hero.style.backgroundImage = `url('${poem.image}')`;
  }
}

loadPoem(currentId);

// 🔹 Navigation
document.getElementById("btn-back").onclick = () => history.back();
document.getElementById("btn-home").onclick = () => (window.location.href = "index.html");
document.getElementById("btn-prev").onclick = () => {
  if (currentId > 1) {
    currentId--;
    loadPoem(currentId);
  }
};
document.getElementById("btn-next").onclick = () => {
  if (currentId < poems.length) {
    currentId++;
    loadPoem(currentId);
  }
};



