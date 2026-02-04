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
