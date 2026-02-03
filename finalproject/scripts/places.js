/* ===========================
   Global State
=========================== */

let allPlaces = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

/* ===========================
   DOM Ready Guard
=========================== */

document.addEventListener("DOMContentLoaded", () => {

  const placesContainer = document.querySelector("#places");
  const categoryFilter = document.querySelector("#filter");
  const stateFilter = document.querySelector("#stateFilter");
  const modal = document.querySelector("#placeModal");

  if (!placesContainer) return;

  /* ===========================
     Fetch Data
  =========================== */

  async function getPlaces() {
    try {
      const response = await fetch("data/places.json");
      if (!response.ok) throw new Error("Data fetch failed");

      const data = await response.json();
      allPlaces = data.places;

      if (stateFilter) populateStateFilter(allPlaces);
      displayPlaces(allPlaces);

    } catch (error) {
      placesContainer.innerHTML =
        "<p>Unable to load places at this time.</p>";
      console.error(error);
    }
    populateCategoryFilter(allPlaces);
    populateStateFilter(allPlaces);
    displayPlaces(allPlaces);

  }

  getPlaces();

  /* ===========================
     Display Cards
  =========================== */

  function displayPlaces(places) {
    placesContainer.innerHTML = "";

    places.forEach(place => {
      const card = document.createElement("article");
      card.classList.add("place-card");

      const img = document.createElement("img");
      img.src = place.image;
      img.alt = place.name;
      img.loading = "lazy";

      const title = document.createElement("h2");
      title.textContent = place.name;

      const location = document.createElement("p");
      location.textContent = `${place.state} • ${place.category}`;

      const detailsBtn = document.createElement("button");
      detailsBtn.textContent = "View Details";
      detailsBtn.addEventListener("click", () => openModal(place));

      const favBtn = document.createElement("button");
      favBtn.textContent = favorites.includes(place.id)
        ? "★ Favorited"
        : "☆ Add Favorite";

      favBtn.addEventListener("click", () =>
        toggleFavorite(place.id, favBtn)
      );

      card.append(img, title, location, detailsBtn, favBtn);
      placesContainer.appendChild(card);
    });
  }

  /* ===========================
     Modal Logic
  =========================== */

  function openModal(place) {
    if (!modal || typeof modal.showModal !== "function") return;

    modal.innerHTML = `
      <h2 id="modalTitle">${place.name}</h2>
      <p><strong>State:</strong> ${place.state}</p>
      <p><strong>Category:</strong> ${place.category}</p>
      <p>${place.description}</p>
      <button id="closeModal">Close</button>
    `;

    modal.showModal();

    const closeBtn = modal.querySelector("#closeModal");
    closeBtn.focus();
    closeBtn.addEventListener("click", () => modal.close());
  }

  /* ===========================
     Favorites
  =========================== */

  function toggleFavorite(id, button) {
    if (favorites.includes(id)) {
      favorites = favorites.filter(fav => fav !== id);
      button.textContent = "☆ Add Favorite";
    } else {
      favorites.push(id);
      button.textContent = "★ Favorited";
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  /* ===========================
     Filters
  =========================== */

  function populateStateFilter(data) {
    const states = [...new Set(data.map(p => p.state))];

    states.forEach(state => {
      const option = document.createElement("option");
      option.value = state;
      option.textContent = state;
      stateFilter.appendChild(option);
    });
  }
  function populateCategoryFilter(data) {
  if (!categoryFilter) return;

  const categories = [...new Set(data.map(p => p.category))];

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}


  function applyFilters() {
    let filtered = allPlaces;

    if (categoryFilter && categoryFilter.value !== "all") {
      filtered = filtered.filter(
        p => p.category === categoryFilter.value
      );
    }

    if (stateFilter && stateFilter.value !== "all") {
      filtered = filtered.filter(
        p => p.state === stateFilter.value
      );
    }

    displayPlaces(filtered);
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", applyFilters);
  }

  if (stateFilter) {
    stateFilter.addEventListener("change", applyFilters);
  }
});
/* ===========================
   Mobile Menu Toggle
=========================== */

const menuButton = document.querySelector("#menuButton");
const navList = document.querySelector("#navList");

menuButton.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
});

/* Close menu when a link is clicked */
navList.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navList.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});
document.addEventListener("click", (e) => {
  const isClickInsideMenu = navList.contains(e.target);
  const isClickOnButton = menuButton.contains(e.target);

  if (!isClickInsideMenu && !isClickOnButton) {
    navList.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});
/* ===========================
   Header Color Change on Scroll
=========================== */

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

