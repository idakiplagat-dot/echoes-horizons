// Get poem ID from URL
const params = new URLSearchParams(window.location.search);
const poemId = parseInt(params.get("id"), 10);

const poems = JSON.parse(localStorage.getItem("poems")) || [];
const poem = poems[poemId];

const display = document.getElementById("poem-display");
const nav = document.getElementById("poem-nav");

if (poem) {
  display.innerHTML = `
    <h2>${poem.title}</h2>
    <div class="poem-content">${poem.content}</div>
    <div class="like-section">
      <button class="like-btn">❤️</button>
      <span class="like-count">0</span>
    </div>
  `;

  const likeBtn = display.querySelector(".like-btn");
  const likeCount = display.querySelector(".like-count");
  let count = 0;

  likeBtn.addEventListener("click", () => {
    count++;
    likeCount.textContent = count;
  });

  // Add Next/Previous buttons
  nav.innerHTML = `
    <button id="prev-btn" ${poemId === 0 ? "disabled" : ""}>← Previous</button>
    <button id="next-btn" ${poemId === poems.length - 1 ? "disabled" : ""}>Next →</button>
  `;

  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  prevBtn?.addEventListener("click", () => {
    if (poemId > 0) {
      window.location.href = `poem.html?id=${poemId - 1}`;
    }
  });

  nextBtn?.addEventListener("click", () => {
    if (poemId < poems.length - 1) {
      window.location.href = `poem.html?id=${poemId + 1}`;
    }
  });

  // ✅ Keyboard navigation
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && poemId > 0) {
      window.location.href = `poem.html?id=${poemId - 1}`;
    }
    if (event.key === "ArrowRight" && poemId < poems.length - 1) {
      window.location.href = `poem.html?id=${poemId + 1}`;
    }
  });

} else {
  display.innerHTML = "<p>Poem not found.</p>";
}
