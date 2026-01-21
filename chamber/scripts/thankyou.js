
 document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  document.getElementById("fname").textContent = params.get("firstName");
  document.getElementById("lname").textContent = params.get("lastName");
  document.getElementById("email").textContent = params.get("email");
  document.getElementById("phone").textContent = params.get("phone");
  document.getElementById("org").textContent = params.get("organization");

  const rawTimestamp = params.get("timestamp");

  if (rawTimestamp) {
    const date = new Date(rawTimestamp);

    const formattedDate = date.toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short"
    });

    document.getElementById("date").textContent = formattedDate;
  } else {
    document.getElementById("date").textContent = "N/A";
  }
});

// Footer dates
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// Header transparency on scroll
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

