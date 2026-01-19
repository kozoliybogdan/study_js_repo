function createSlider(root, options = {}) {
    const track = root.querySelector(".slider__track");
    const slides = Array.from(root.querySelectorAll(".slide"));
    const btnPrev = root.querySelector("[data-prev]");
    const btnNext = root.querySelector("[data-next]");
    const dotsContainer = root.querySelector("[data-dots]");

    const {
        interval = 4000,
        swipeThreshold = 70
    } = options;

    let index = 0;
    let timerId = null;

    let isDragging = false;
    let startX = 0;
    let dx = 0;

    const count = slides.length;
    const slideWidth = () => root.querySelector(".slider__viewport").clientWidth;
    const mod = (n, m) => ((n % m) + m) % m;

    const setTransition = (on) => {
        track.style.transition = on ? "transform 350ms ease" : "none";
    };

    const render = () => {
        const w = slideWidth();
        track.style.transform = `translateX(${-index * w}px)`;
        updateDots();
    };

    const buildDots = () => {
        dotsContainer.innerHTML = "";
        slides.forEach((_, i) => {
            const dot = document.createElement("div");
            dot.className = "dot";
            dot.addEventListener("click", () => goTo(i, true));
            dotsContainer.appendChild(dot);
        });
        updateDots();
    };

    const updateDots = () => {
        const dots = Array.from(dotsContainer.querySelectorAll(".dot"));
        dots.forEach((d, i) => d.classList.toggle("active", i === index));
    };

    const goTo = (i, restart = false) => {
        index = mod(i, count);
        setTransition(true);
        render();
        if (restart) restartAuto();
    };

    const next = (restart = false) => goTo(index + 1, restart);
    const prev = (restart = false) => goTo(index - 1, restart);

    const stopAuto = () => {
        if (timerId) clearInterval(timerId);
        timerId = null;
    };

    const startAuto = () => {
        stopAuto();
        timerId = setInterval(() => next(false), interval);
    };

    const restartAuto = () => {
        stopAuto();
        startAuto();
    };

    const onKeyDown = (e) => {
        if (e.key === "ArrowRight") next(true);
        if (e.key === "ArrowLeft") prev(true);
    };

    const onPointerDown = (e) => {
        stopAuto();
        isDragging = true;
        startX = e.clientX;
        dx = 0;

        track.classList.add("is-dragging");
        setTransition(false);
        track.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e) => {
        if (!isDragging) return;
        dx = e.clientX - startX;

        const w = slideWidth();
        track.style.transform = `translateX(${-index * w + dx}px)`;
    };

    const onPointerUp = () => {
        if (!isDragging) return;
        isDragging = false;

        track.classList.remove("is-dragging");
        setTransition(true);

        if (dx > swipeThreshold) prev(false);
        else if (dx < -swipeThreshold) next(false);
        else render();

        startAuto();
    };

    btnNext.addEventListener("click", () => next(true));
    btnPrev.addEventListener("click", () => prev(true));
    document.addEventListener("keydown", onKeyDown);

    track.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    window.addEventListener("resize", render);

    buildDots();
    render();
    startAuto();

    return { next, prev, goTo };
}

createSlider(document.getElementById("slider"), {
    interval: 4000,
    swipeThreshold: 80
});