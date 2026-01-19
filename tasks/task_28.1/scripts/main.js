class Slider {
    constructor(root, config = {}) {
        if (!root) throw new Error("Slider: root not found");

        this.root = root;
        this.viewport = root.querySelector(".slider__viewport");
        this.track = root.querySelector(".slider__track");
        this.slides = Array.from(root.querySelectorAll(".slide"));

        this.config = {
            interval: 4000,
            showDots: true,
            showArrows: true,
            keyboard: true,
            swipeThreshold: 80,
            pauseOnHover: true,
            ...config,
        };

        this.index = 0;
        this.timerId = null;

        this.btnPrev = null;
        this.btnNext = null;
        this.dotsWrap = null;

        this.init();
    }

    init() {
        this.buildControls();
        this.bindEvents();
        this.render();
        this.start();
    }

    slideWidth() {
        return this.viewport.clientWidth;
    }

    setTransition(on) {
        this.track.style.transition = on ? "transform 350ms ease" : "none";
    }

    buildControls() {
        if (this.config.showArrows) {
            this.btnPrev = document.createElement("button");
            this.btnPrev.className = "arrow";
            this.btnPrev.type = "button";
            this.btnPrev.setAttribute("aria-label", "Previous");
            this.btnPrev.innerHTML = "&#8592;";
            this.root.insertBefore(this.btnPrev, this.viewport);

            this.btnNext = document.createElement("button");
            this.btnNext.className = "arrow";
            this.btnNext.type = "button";
            this.btnNext.setAttribute("aria-label", "Next");
            this.btnNext.innerHTML = "&#8594;";
            this.root.insertBefore(this.btnNext, this.viewport.nextSibling);
        }

        if (this.config.showDots) {
            this.dotsWrap = document.createElement("div");
            this.dotsWrap.className = "dots";
            this.root.appendChild(this.dotsWrap);

            for (let i = 0; i < this.slides.length; i++) {
                const dot = document.createElement("div");
                dot.className = "dot";
                dot.dataset.index = String(i);
                this.dotsWrap.appendChild(dot);
            }
        }
    }

    updateDots() {
        if (!this.dotsWrap) return;
        const dots = Array.from(this.dotsWrap.querySelectorAll(".dot"));
        dots.forEach((d, i) => d.classList.toggle("active", i === this.index));
    }

    render() {
        const w = this.slideWidth();
        this.track.style.transform = `translateX(${-this.index * w}px)`;
        this.updateDots();
    }

    mod(n, m) {
        return ((n % m) + m) % m;
    }

    goTo(i, restart = false) {
        this.index = this.mod(i, this.slides.length);
        this.setTransition(true);
        this.render();
        if (restart) this.restart();
    }

    next(restart = false) {
        this.goTo(this.index + 1, restart);
    }

    prev(restart = false) {
        this.goTo(this.index - 1, restart);
    }

    start() {
        this.stop();
        this.timerId = setInterval(() => this.next(false), this.config.interval);
    }

    stop() {
        if (this.timerId) clearInterval(this.timerId);
        this.timerId = null;
    }

    restart() {
        this.stop();
        this.start();
    }

    bindEvents() {
        this.btnNext?.addEventListener("click", () => this.next(true));
        this.btnPrev?.addEventListener("click", () => this.prev(true));

        this.dotsWrap?.addEventListener("click", (e) => {
            const dot = e.target.closest(".dot");
            if (!dot) return;
            this.goTo(Number(dot.dataset.index), true);
        });

        if (this.config.keyboard) {
            document.addEventListener("keydown", (e) => {
                if (e.key === "ArrowRight") this.next(true);
                if (e.key === "ArrowLeft") this.prev(true);
            });
        }

        window.addEventListener("resize", () => this.render());
    }
}

class HoverPauseSlider extends Slider {
    bindEvents() {
        super.bindEvents();
        let isDragging = false;
        let startX = 0;
        let dx = 0;

        this.track.addEventListener("pointerdown", (e) => {
            this.stop();
            isDragging = true;
            startX = e.clientX;
            dx = 0;

            this.track.classList.add("is-dragging");
            this.setTransition(false);
            this.track.setPointerCapture?.(e.pointerId);
        });

        window.addEventListener("pointermove", (e) => {
            if (!isDragging) return;
            dx = e.clientX - startX;

            const w = this.slideWidth();
            this.track.style.transform = `translateX(${-this.index * w + dx}px)`;
        });

        window.addEventListener("pointerup", () => {
            if (!isDragging) return;
            isDragging = false;

            this.track.classList.remove("is-dragging");
            this.setTransition(true);

            if (dx > this.config.swipeThreshold) this.prev(false);
            else if (dx < -this.config.swipeThreshold) this.next(false);
            else this.render();

            this.start();
        });

        if (this.config.pauseOnHover) {
            this.root.addEventListener("mouseenter", () => this.stop());
            this.root.addEventListener("mouseleave", () => this.start());
        }
    }
}

new HoverPauseSlider(document.getElementById("slider"), {
    interval: 4000,
    showDots: true,
    showArrows: true,
    keyboard: true,
    swipeThreshold: 80,
    pauseOnHover: true,
});