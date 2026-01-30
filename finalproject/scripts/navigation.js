const menuButton = document.querySelector("#menu");
const navList = document.querySelector("nav ul");

menuButton.addEventListener("click", () => {
  navList.classList.toggle("open");
});
