/* main.js — navigation scroll-spy, e-mail assembly, certification ring animation */

/* Scroll-spy: highlight the nav link of the section currently in view */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a[href^='#']");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((link) => link.classList.remove("active"));
            const active = document.querySelector(
                "nav a[href='#" + entry.target.id + "']"
            );
            if (active) active.classList.add("active");
        }
    });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach((sec) => observer.observe(sec));


/* E-mail: assembled at runtime so the address never appears in the HTML source */
(function setupEmail() {
    const link = document.getElementById("email-link");
    if (!link) return;

    const parts = ["andreastojadinov", "gmail", "com"];
    const address = parts[0] + "@" + parts[1] + "." + parts[2];

    link.href = "mailto:" + address;
    link.textContent = address;
    link.title = "Click to copy";

    link.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            await navigator.clipboard.writeText(address);
            link.textContent = "Copied!";
            setTimeout(() => { link.textContent = address; }, 1500);
        } catch (err) {
            window.location.href = "mailto:" + address;
        }
    });
})();


/* Certification rings: fill to data-percent when the section scrolls into view */
(function setupCertRings() {
    const rings = document.querySelectorAll(".cert-ring");
    if (!rings.length) return;

    const CIRCUMFERENCE = 327;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function fillRing(ring) {
        const percent = parseInt(ring.dataset.percent, 10) || 0;
        const fill = ring.querySelector(".ring-fill");
        const label = ring.querySelector(".ring-pct");

        fill.style.strokeDashoffset = CIRCUMFERENCE * (1 - percent / 100);

        if (reduceMotion) {
            label.textContent = percent + "%";
            return;
        }
        let current = 0;
        const stepTime = 1400 / Math.max(percent, 1);
        const timer = setInterval(() => {
            current++;
            label.textContent = current + "%";
            if (current >= percent) clearInterval(timer);
        }, stepTime);
    }

    const certObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                rings.forEach(fillRing);
                obs.disconnect();
            }
        });
    }, { threshold: 0.35 });

    const certSection = document.getElementById("certifications");
    if (certSection) certObserver.observe(certSection);
})();
