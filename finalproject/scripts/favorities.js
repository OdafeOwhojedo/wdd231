const container = document.querySelector("#favoritesList");

let allPlaces = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

async function loadFavorites() {
    try {
        const response = await fetch("data/places.json");
        const data = await response.json();
        allPlaces = data.places;

        const favoritePlaces = allPlaces.filter(place =>
            favorites.includes(place.id)
        );

        displayFavorites(favoritePlaces);
    } catch (err) {
        container.innerHTML = "<p>Unable to load favorites.</p>";
        console.error(err);
    }
}

function displayFavorites(places) {
    container.innerHTML = "";

    if (places.length === 0) {
        container.innerHTML = "<p>You have no favorites yet.</p>";
        return;
    }

    places.forEach(place => {
        const card = document.createElement("article");
        card.className = "place-card";

        card.innerHTML = `
      <img src="${place.image}" alt="${place.name}" loading="lazy">
      <h2>${place.name}</h2>
      <p>${place.state} • ${place.category}</p>
      <button data-id="${place.id}">Remove Favorite</button>
    `;

        card.querySelector("button").addEventListener("click", () => {
            favorites = favorites.filter(id => id !== place.id);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            loadFavorites();
            updateFavoritesBadge();
        });

        container.appendChild(card);
    });
}

function updateFavoritesBadge() {
    const badge = document.querySelector(".favorites-badge");
    if (badge) badge.textContent = favorites.length;
}

loadFavorites();
