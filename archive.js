document.addEventListener("DOMContentLoaded", () => {
  const poemList = document.getElementById("poem-list");

  fetch("poems.json")
    .then(res => res.json())
    .then(data => {
      data.forEach((poem, index) => {
        const card = document.createElement("div");
        card.classList.add("poem-card");

        // Generate excerpt dynamically from "content"
        let excerptSource = poem.content || "";
        let excerpt = excerptSource.replace(/\n/g, " ").substring(0, 120);
        if (excerptSource.length > 120) excerpt += "...";

        card.innerHTML = `
          <h3>${poem.title}</h3>
          <p>${excerpt}</p>
        `;

        card.addEventListener("click", () => {
          localStorage.setItem("currentPoem", index);
          window.location.href = "poem.html";
        });

        poemList.appendChild(card);
      });
    })
    .catch(err => {
      poemList.innerHTML = `<p style="color:#f1c40f;">Error loading poems. Please check poems.json.</p>`;
      console.error(err);
    });
});
