document.addEventListener("DOMContentLoaded", () => {
  // Fade-in animation on page load
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 1.2s ease";
  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 100);

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
