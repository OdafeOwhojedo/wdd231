
  // Timestamp
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("timestamp").value = new Date().toISOString();
});

// Modals
const modalLinks = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".close-modal");

modalLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.getElementById(link.dataset.modal).showModal();
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest("dialog").close();
  });
});


// Footer dates
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// Header transparency on scroll
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

