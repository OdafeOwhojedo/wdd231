
    const params = new URLSearchParams(window.location.search);

    document.getElementById("resp-name").textContent =
    params.get("name") || "—";

    document.getElementById("resp-email").textContent =
    params.get("email") || "—";

    document.getElementById("resp-subject").textContent =
    params.get("subject") || "Not specified";

    document.getElementById("resp-message").textContent =
    params.get("message") || "—";
    if (card) {
        card.focus();
    card.scrollIntoView({behavior: "smooth", block: "center" });
            }
    const card = document.getElementById("responseCard");



