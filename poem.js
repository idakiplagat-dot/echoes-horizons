let poems = [];
let currentIndex = -1;

async function loadPoem() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  try {
    const response = await fetch("poems.json");
    poems = await response.json();
    const poem = poems.find(p => p.id === id);
    currentIndex = poems.findIndex(p => p.id === id);

    const container = document.getElementById("poem-container");
    if (poem) {
      container.innerHTML = `
        <h1>${poem.title}</h1>
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

function goHome() {
  window.location.href = "index.html";
}

function goBack() {
  window.history.back();
}

function goPrev() {
  if (currentIndex > 0) {
    const prevPoem = poems[currentIndex - 1];
    window.location.href = `poem.html?id=${prevPoem.id}`;
  } else {
    alert("This is the first poem.");
  }
}

function goNext() {
  if (currentIndex < poems.length - 1) {
    const nextPoem = poems[currentIndex + 1];
    window.location.href = `poem.html?id=${nextPoem.id}`;
  } else {
    alert("This is the last poem.");
  }
}

document.addEventListener("DOMContentLoaded", loadPoem);
