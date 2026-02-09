const form = document.querySelector("#contactForm");

form.addEventListener("submit", (event) => {
    let isValid = true;

    form.querySelectorAll("[required]").forEach(field => {
        let error = field.nextElementSibling;

        if (!error || !error.classList.contains("form-error")) {
            error = document.createElement("span");
            error.className = "form-error";
            field.after(error);
        }

        if (!field.value.trim()) {
            error.textContent = "This field is required.";
            error.classList.add("visible");
            field.setAttribute("aria-invalid", "true");
            isValid = false;
        } else {
            error.textContent = "";
            error.classList.remove("visible");
            field.setAttribute("aria-invalid", "false");
        }
    });

    if (!isValid) {
        event.preventDefault(); // ⬅ block only if invalid
    }
});

/* Favorites badge sync */
function updateFavoritesBadge() {
    const countEl = document.querySelector("#favoritesCount");
    if (!countEl) return;

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    countEl.textContent = favorites.length;
}

updateFavoritesBadge();

