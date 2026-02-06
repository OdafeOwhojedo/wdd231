const menuButton = document.querySelector("#menuButton");
const navList = document.querySelector("#navList");

menuButton.addEventListener("click", () => {
  navList.classList.toggle("open");

  const expanded =
    menuButton.getAttribute("aria-expanded") === "true";

  menuButton.setAttribute("aria-expanded", !expanded);
});
function updateFavoritesCount() {
  const favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];
  const countEl = document.getElementById("favoritesCount");

  if (countEl) {
    countEl.textContent = favorites.length;
  }
}

updateFavoritesCount();
window.addEventListener("storage", updateFavoritesCount);
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});
function updateFavoritesBadge() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const badge = document.querySelector(".favorites-badge");
  if (badge) badge.textContent = favorites.length;
}

document.addEventListener("DOMContentLoaded", updateFavoritesBadge);
// Footer dates
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;
