/* ==================================================
   main.js — scroll-spy za navigaciju
   Izmesten iz index.html u zaseban fajl da bih mogla
   da postavim STROG CSP (script-src 'self'), tj. da
   dozvolim samo skripte sa mog domena, bez 'unsafe-inline'.
   ================================================== */

// Uzeti sve sekcije koje imaju id i sve linkove iz navigacije
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

/*Zastita email-a od botova */
(function setupEmail() {
    const link = document.getElementById("email-link");
    if (!link) return;
 
   
    const parts = ["andreastojadinov", "gmail", "com"];
    const address = parts[0] + "@" + parts[1] + "." + parts[2];
 
    link.href = "mailto:" + address;   
    link.textContent = address;        
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
