const navButton = document.querySelector("#ham-button");
const navLinks = document.querySelector("nav");
navButton.addEventListener("click", () => {
  navButton.classList.toggle("show");
  navLinks.classList.toggle("show");
});



