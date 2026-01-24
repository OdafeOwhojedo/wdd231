import { discoverItems } from "../data/discoverWarri.mjs";

/* ---------------------------------------------------
   1. Grab reference to the DIV container
--------------------------------------------------- */
const cardsContainer = document.getElementById("discover-cards");

/* ---------------------------------------------------
   2. Function to display all discover items
--------------------------------------------------- */
function displayDiscoverItems(items) {
  items.forEach((item, index) => {

    /* ----- Card container ----- */
    const card = document.createElement("div");
    card.classList.add("discover-card");

    /* Optional: grid-area hook for CSS */
    card.style.gridArea = `card${index + 1}`;

    /* ----- Title ----- */
    const title = document.createElement("h2");
    title.textContent = item.title;

    /* ----- Photo ----- */
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = "images/${item.image}";
    image.alt = item.title;
    image.loading = "lazy";
    figure.appendChild(image);

    /* ----- Address ----- */
    const address = document.createElement("address");
    address.textContent = item.address;

    /* ----- Description ----- */
    const description = document.createElement("p");
    description.textContent = item.description;

    /* ----- Assemble card ----- */
    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);

    /* ----- Append to container ----- */
    cardsContainer.appendChild(card);
  });
}

/* ---------------------------------------------------
   3. Call function to display items
--------------------------------------------------- */
displayDiscoverItems(discoverItems);

/* ---------- Visit Message ---------- */
const visitMessage = document.getElementById("visitMessage");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

  if (days < 1) {
    visitMessage.textContent = "Back so soon! Awesome!";
  } else if (days === 1) {
    visitMessage.textContent = "You last visited 1 day ago.";
  } else {
    visitMessage.textContent = `You last visited ${days} days ago.`;
  }
}

localStorage.setItem("lastVisit", now);
