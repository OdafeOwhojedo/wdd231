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
