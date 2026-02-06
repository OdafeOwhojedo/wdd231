// const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add("visible");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
});

reveals.forEach(section => observer.observe(section));
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const height =
        document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / height) * 100;

    document.getElementById("scrollProgress").style.width =
        `${progress}%`;
});
const counters = document.querySelectorAll(".stat-number");

const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = +el.dataset.target;
        let current = 0;

        const step = Math.ceil(target / 40);

        const timer = setInterval(() => {
            current += step;
            el.textContent = current >= target ? target : current;
            if (current >= target) clearInterval(timer);
        }, 30);

        countObserver.unobserve(el);
    });
});

counters.forEach(c => countObserver.observe(c));
const featuredContainer = document.querySelector("#featuredPlaces");

async function loadFeaturedPlaces() {
    const response = await fetch("data/places.json");
    const data = await response.json();

    const featured = data.places.filter(p => p.featured);

    const shuffled = featured.sort(() => 0.5 - Math.random());
    const selection = shuffled.slice(0, 3);

    featuredContainer.innerHTML = "";

    selection.forEach(place => {
        const card = document.createElement("article");
        card.innerHTML = `
          <h3>${place.name}</h3>
          <p>${place.state}</p>
          <a href="places.html?place=${place.id}" class="cta-button">
            Explore
          </a>
        `;
        featuredContainer.appendChild(card);
    });
}

loadFeaturedPlaces();
/* ===========================
   Update Favorite badge
=========================== */

function updateFavoritesBadge() {
    const badgeCount = document.querySelector("#favoritesCount");
    if (!badgeCount) return;

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    badgeCount.textContent = favorites.length;
}

