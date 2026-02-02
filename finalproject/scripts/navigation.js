const menuButton = document.querySelector("#menuButton");
const navList = document.querySelector("#navList");

menuButton.addEventListener("click", () => {
  navList.classList.toggle("open");

  const expanded =
    menuButton.getAttribute("aria-expanded") === "true";

  menuButton.setAttribute("aria-expanded", !expanded);
});
