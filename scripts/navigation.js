const navButton = document.querySelector("#ham-button");
const navLinks = document.querySelector("nav");
navButton.addEventListener("click", () => {
  navButton.classList.toggle("show");
  navLinks.classList.toggle("show");
});



// const navButton = document.getElementById("menu");
// const nav = document.getElementById("nav");

// menuButton.addEventListener("click", () => {
//   nav.classList.toggle("open");
// });