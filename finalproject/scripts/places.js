// ================================
// places.js
// ================================

// DOM references
const placesContainer = document.querySelector("#places");
const dialog = document.querySelector("#placeDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogImage = document.querySelector("#dialogImage");
const dialogDescription = document.querySelector("#dialogDescription");
const dialogState = document.querySelector("#dialogState");
const dialogCategory = document.querySelector("#dialogCategory");
const closeDialogBtn = document.querySelector("#closeDialog");

const DATA_URL = "data/places.json";

// ================================
// Fetch places data
// ================================
async function getPlaces() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error("Failed to load places data");
    }

    const data = await response.json();
    displayPlaces(data.places);
  } catch (error) {
    console.error(error);
    placesContainer.innerHTML =
      "<p>Unable to load places at this time.</p>";
  }
}

// ================================
// Display place cards
// ================================
function displayPlaces(places) {
  places.forEach(place => {
    const card = document.createElement("article");
    card.classList.add("place-card");

    const img = document.createElement("img");
    img.src = `images/${place.image}`;
    img.alt = place.name;
    img.loading = "lazy";

    const title = document.createElement("h2");
    title.textContent = place.name;

    const state = document.createElement("p");
    state.innerHTML = `<strong>State:</strong> ${place.state}`;

    const button = document.createElement("button");
    button.textContent = "View Details";
    button.addEventListener("click", () => openDialog(place));

    card.append(img, title, state, button);
    placesContainer.appendChild(card);
  });
}

// ================================
// Open modal dialog
// ================================
function openDialog(place) {
  dialogTitle.textContent = place.name;
  dialogImage.src = `images/${place.image}`;
  dialogImage.alt = place.name;
  dialogDescription.textContent = place.description;
  dialogState.textContent = place.state;
  dialogCategory.textContent = place.category;

  dialog.showModal();
}

// ================================
// Close modal dialog
// ================================
closeDialogBtn.addEventListener("click", () => {
  dialog.close();
});

// ================================
// Initialize
// ================================
getPlaces();
