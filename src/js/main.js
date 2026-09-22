// HOTEL JARAGUÁ REAL — mockup Negócios Smart
(function () {
    "use strict";

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => Array.from(document.querySelectorAll(sel));

    // Ano no footer
    $("#year").textContent = new Date().getFullYear();

    // ===== Scroll progress =====
    const progress = $("#scrollProgress");
    const onScroll = () => {
        const h = document.documentElement;
        const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        progress.style.width = scrolled + "%";
        $("#navbar").classList.toggle("navbar--scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // ===== Navbar mobile =====
    const toggle = $("#navToggle");
    const menu = $("#navMenu");
    toggle.addEventListener("click", () => {
        menu.classList.toggle("open");
        toggle.classList.toggle("active");
    });
    $$(".navbar__link").forEach((link) =>
        link.addEventListener("click", () => {
            menu.classList.remove("open");
            toggle.classList.remove("active");
        })
    );

    // ===== Hero slider =====
    const slides = $$(".hero__slide");
    const dotsWrap = $("#heroDots");
    let current = 0;
    let timer;

    slides.forEach((_, i) => {
        const btn = document.createElement("button");
        btn.setAttribute("aria-label", "Slide " + (i + 1));
        btn.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(btn);
    });
    const dots = $$("#heroDots button");

    function goTo(i) {
        slides[current].classList.remove("active");
        dots[current].classList.remove("active");
        current = (i + slides.length) % slides.length;
        slides[current].classList.add("active");
        dots[current].classList.add("active");
    }

    function autoPlay() {
        timer = setInterval(() => goTo(current + 1), 5000);
    }
    goTo(0);
    autoPlay();

    // ===== Reveal on scroll =====
    const animateables = $$("[data-animate]");
    if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("in-view");
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        animateables.forEach((el) => io.observe(el));
    } else {
        animateables.forEach((el) => el.classList.add("in-view"));
    }

    // ===== Smooth anchor (offset do navbar) =====
    $$('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
            const target = $(a.getAttribute("href"));
            if (!target) return;
            e.preventDefault();
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - 74,
                behavior: "smooth",
            });
        });
    });
})();