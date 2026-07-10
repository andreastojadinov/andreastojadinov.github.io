/* ==================================================
   main.js — scroll-spy za navigaciju
   Izmesten iz index.html u zaseban fajl da bismo mogli
   da postavimo STROG CSP (script-src 'self'), tj. da
   dozvolimo samo skripte sa naseg domena, bez 'unsafe-inline'.
   ================================================== */

// Uzmi sve sekcije koje imaju id i sve linkove iz navigacije
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a[href^='#']");

// IntersectionObserver "posmatra" kad sekcija udje u vidno polje
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // skini .active sa svih linkova...
            navLinks.forEach((link) => link.classList.remove("active"));
            // ...pa je dodaj linku cija je sekcija trenutno vidljiva
            const active = document.querySelector(
                "nav a[href='#" + entry.target.id + "']"
            );
            if (active) active.classList.add("active");
        }
    });
}, { rootMargin: "-40% 0px -55% 0px" }); // "okidac" je sredina ekrana

sections.forEach((sec) => observer.observe(sec));


/* ==================================================
   Zastita email adrese od spam botova
   --------------------------------------------------
   Adresa NIGDE ne postoji kao ceo tekst u HTML-u.
   Cuvamo je rasparcanu na delove i sklapamo je ovde,
   u browseru. Botovi koji ne izvrsavaju JavaScript
   (velika vecina) vide samo dugme "Email" bez adrese.
   ================================================== */
(function setupEmail() {
    const link = document.getElementById("email-link");
    if (!link) return;

    // delovi adrese — nikad spojeni u HTML-u
    const parts = ["andreastojadinov", "gmail", "com"];
    const address = parts[0] + "@" + parts[1] + "." + parts[2];

    link.href = "mailto:" + address;   // semanticki jeste mejl link
    link.textContent = address;        // adresa je vidljiva i citljiva
    link.title = "Click to copy";

    // Klik = kopiraj adresu u clipboard + kratka potvrda "Copied!"
    link.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            await navigator.clipboard.writeText(address);
            link.textContent = "Copied!";
            setTimeout(() => { link.textContent = address; }, 1500);
        } catch (err) {
            // ako clipboard nije dostupan, otvori mejl program kao rezervu
            window.location.href = "mailto:" + address;
        }
    });
})();


/* ==================================================
   Animacija kruznih progress indikatora (Certifications)
   --------------------------------------------------
   Kad sekcija sertifikata udje u ekran, svaki krug se
   "napuni" do svog procenta (data-percent), a broj u
   sredini odbroji od 0 do tog procenta.
   Animira se samo jednom.
   ================================================== */
(function setupCertRings() {
    const rings = document.querySelectorAll(".cert-ring");
    if (!rings.length) return;

    const CIRCUMFERENCE = 327; // mora da odgovara stroke-dasharray u CSS-u

    // da li korisnik zeli smanjene animacije
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function fillRing(ring) {
        const percent = parseInt(ring.dataset.percent, 10) || 0;
        const fill = ring.querySelector(".ring-fill");
        const label = ring.querySelector(".ring-pct");

        // napuni krug: pomeri offset srazmerno procentu
        const offset = CIRCUMFERENCE * (1 - percent / 100);
        fill.style.strokeDashoffset = offset;

        // odbroj broj od 0 do percent
        if (reduceMotion) {
            label.textContent = percent + "%";
            return;
        }
        let current = 0;
        const stepTime = 1400 / Math.max(percent, 1); // ~1.4s ukupno
        const timer = setInterval(() => {
            current++;
            label.textContent = current + "%";
            if (current >= percent) clearInterval(timer);
        }, stepTime);
    }

    // pokreni animaciju kad sekcija udje u ekran (samo jednom)
    const certObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                rings.forEach(fillRing);
                obs.disconnect(); // vise ne posmatramo — animira se jednom
            }
        });
    }, { threshold: 0.35 });

    // posmatramo sekciju sertifikata (roditelj prvog prstena)
    const certSection = document.getElementById("certifications");
    if (certSection) certObserver.observe(certSection);
})();
