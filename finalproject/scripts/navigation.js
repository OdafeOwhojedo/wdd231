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
  const badge = document.querySelector(".favorites-badge");
  const countEl = document.querySelector("#favoritesCount");
  if (!badge || !countEl) return;

  const favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  countEl.textContent = favorites.length;

  // trigger animation
  badge.classList.remove("animate");
  void badge.offsetWidth; // reflow
  badge.classList.add("animate");

  // tooltip update
  badge.setAttribute(
    "aria-label",
    `You have ${favorites.length} saved places`
  );
}
document.addEventListener("DOMContentLoaded", () => {
  const badge = document.querySelector(".favorites-badge");

  if (!badge) return;

  badge.addEventListener("click", () => {
    // Only redirect when not already on favorites view
    if (!window.location.href.includes("places.html")) {
      window.location.href = "places.html?favorites=true";
    } else {
      window.location.href = "places.html?favorites=true";
    }
  });

  badge.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      badge.click();
    }
  });
});


// function updateFavoritesBadge() {
//   const countEl = document.querySelector("#favoritesCount");
//   if (!countEl) return;

//   const favorites =
//     JSON.parse(localStorage.getItem("favorites")) || [];

//   countEl.textContent = favorites.length;
// }
document.addEventListener("DOMContentLoaded", updateFavoritesBadge);
window.addEventListener("storage", updateFavoritesBadge);


// function updateFavoritesBadge() {
//   const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//   const badge = document.querySelector(".favorites-badge");
//   if (badge) badge.textContent = favorites.length;
// }

// document.addEventListener("DOMContentLoaded", updateFavoritesBadge);
// Footer dates
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;
