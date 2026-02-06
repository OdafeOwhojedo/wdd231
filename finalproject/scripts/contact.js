const form = document.querySelector("#contactForm");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;

    form.querySelectorAll("[required]").forEach(field => {
        const error = field.nextElementSibling;

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

    if (isValid) {
        form.classList.add("submitting");

        setTimeout(() => {
            window.location.href = "form-response.html";
        }, 900);
    }
});
function updateFavoritesBadge() {
    const countEl = document.querySelector("#favoritesCount");
    if (!countEl) return;

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    countEl.textContent = favorites.length;
}
