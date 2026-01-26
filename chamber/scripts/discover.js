import { discoverItems } from "../data/discover.mjs";

const cardsContainer = document.getElementById("discover-cards");

function displayDiscoverItems(items) {
  items.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("discover-card");

    const title = document.createElement("h2");
    title.textContent = item.title;

    const figure = document.createElement("figure");

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.title;
    image.loading = "lazy";
    image.width = 300;
    image.height = 200;

    figure.appendChild(image);

    const address = document.createElement("address");
    address.textContent = item.address;

    const description = document.createElement("p");
    description.textContent = item.description;

    /* ✅ Learn More Button (REQUIRED) */
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Learn More";
    button.classList.add("learn-more");

    /* Optional: Accessibility enhancement */
    button.setAttribute(
      "aria-label",
      `Learn more about ${item.title}`
    );

    card.append(title, figure, address, description, button);
    cardsContainer.appendChild(card);
  });
}

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
// Footer dates
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;