let poems = [];
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  fetch("poems.json")
    .then(res => res.json())
    .then(data => {
      poems = data;
      const savedIndex = parseInt(localStorage.getItem("currentPoem")) || 0;
      currentIndex = savedIndex;
      displayPoem(poems[currentIndex]);
    });
});

function displayPoem(poem) {
  const container = document.getElementById("poem-container");
  container.innerHTML = `
    <h2>${poem.title}</h2>
    <p>${poem.content}</p>
  `;
}

function goPrev() {
  if (currentIndex > 0) {
    currentIndex--;
    localStorage.setItem("currentPoem", currentIndex);
    displayPoem(poems[currentIndex]);
  }
}

function goNext() {
  if (currentIndex < poems.length - 1) {
    currentIndex++;
    localStorage.setItem("currentPoem", currentIndex);
    displayPoem(poems[currentIndex]);
  }
}

function goHome() {
  window.location.href = "archive.html";
}
