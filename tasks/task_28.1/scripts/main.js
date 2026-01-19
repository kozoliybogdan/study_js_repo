function BaseSlider(root, config = {}) {
    if (!root) throw new Error("BaseSlider: root not found");

    this.root = root;
    this.viewport = root.querySelector(".slider__viewport");
    this.track = root.querySelector(".slider__track");
    this.slides = Array.from(root.querySelectorAll(".slide"));

    this.config = Object.assign(
        {
            interval: 4000,
            showDots: true,
            showArrows: true,
            keyboard: true,
            swipeThreshold: 80,
        },
        config
    );

    this.index = 0;
    this.timerId = null;

    this.btnPrev = null;
    this.btnNext = null;
    this.dotsWrap = null;

    this._init();
}

BaseSlider.prototype._init = function () {
    this._buildControls();
    this._bindBaseEvents();
    this._render();
    this.start();
};

BaseSlider.prototype._buildControls = function () {
    if (this.config.showArrows) {
        this.btnPrev = document.createElement("button");
        this.btnPrev.className = "arrow";
        this.btnPrev.type = "button";
        this.btnPrev.setAttribute("aria-label", "Previous");
        this.btnPrev.innerHTML = "&#8592;";

        this.btnNext = document.createElement("button");
        this.btnNext.className = "arrow";
        this.btnNext.type = "button";
        this.btnNext.setAttribute("aria-label", "Next");
        this.btnNext.innerHTML = "&#8594;";

        this.root.insertBefore(this.btnPrev, this.viewport);
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
};

BaseSlider.prototype._bindBaseEvents = function () {
    const self = this;

    this.btnNext?.addEventListener("click", function () {
        self.next(true);
    });

    this.btnPrev?.addEventListener("click", function () {
        self.prev(true);
    });

    this.dotsWrap?.addEventListener("click", function (e) {
        const dot = e.target.closest(".dot");
        if (!dot) return;
        self.goTo(Number(dot.dataset.index), true);
    });

    if (this.config.keyboard) {
        document.addEventListener("keydown", function (e) {
            if (e.key === "ArrowRight") self.next(true);
            if (e.key === "ArrowLeft") self.prev(true);
        });
    }

    window.addEventListener("resize", function () {
        self._render();
    });
};

BaseSlider.prototype._slideWidth = function () {
    return this.viewport.clientWidth;
};

BaseSlider.prototype._setTransition = function (on) {
    this.track.style.transition = on ? "transform 350ms ease" : "none";
};

BaseSlider.prototype._updateDots = function () {
    if (!this.dotsWrap) return;
    const dots = Array.from(this.dotsWrap.querySelectorAll(".dot"));
    dots.forEach((d, i) => d.classList.toggle("active", i === this.index));
};

BaseSlider.prototype._render = function () {
    const w = this._slideWidth();
    this.track.style.transform = `translateX(${-this.index * w}px)`;
    this._updateDots();
};

BaseSlider.prototype._mod = function (n, m) {
    return ((n % m) + m) % m;
};

BaseSlider.prototype.goTo = function (i, restart = false) {
    this.index = this._mod(i, this.slides.length);
    this._setTransition(true);
    this._render();
    if (restart) this.restart();
};

BaseSlider.prototype.next = function (restart = false) {
    this.goTo(this.index + 1, restart);
};

BaseSlider.prototype.prev = function (restart = false) {
    this.goTo(this.index - 1, restart);
};

BaseSlider.prototype.start = function () {
    const self = this;
    this.stop();
    this.timerId = setInterval(function () {
        self.next(false);
    }, this.config.interval);
};

BaseSlider.prototype.stop = function () {
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = null;
};

BaseSlider.prototype.restart = function () {
    this.stop();
    this.start();
};

function DragSlider(root, config = {}) {
    BaseSlider.call(this, root, config);

    this.isDragging = false;
    this.startX = 0;
    this.dx = 0;

    this._bindDragEvents();
}

DragSlider.prototype = Object.create(BaseSlider.prototype);
DragSlider.prototype.constructor = DragSlider;

DragSlider.prototype._bindDragEvents = function () {
    const self = this;

    this.track.addEventListener("pointerdown", function (e) {
        self.stop();

        self.isDragging = true;
        self.startX = e.clientX;
        self.dx = 0;

        self.track.classList.add("is-dragging");
        self._setTransition(false);
        self.track.setPointerCapture?.(e.pointerId);
    });

    window.addEventListener("pointermove", function (e) {
        if (!self.isDragging) return;

        self.dx = e.clientX - self.startX;
        const w = self._slideWidth();
        self.track.style.transform = `translateX(${-self.index * w + self.dx}px)`;
    });

    window.addEventListener("pointerup", function () {
        if (!self.isDragging) return;

        self.isDragging = false;
        self.track.classList.remove("is-dragging");
        self._setTransition(true);

        if (self.dx > self.config.swipeThreshold) self.prev(false);
        else if (self.dx < -self.config.swipeThreshold) self.next(false);
        else self._render();

        self.start();
    });
};

new DragSlider(document.getElementById("slider"), {
    interval: 4000,
    showDots: true,
    showArrows: true,
    keyboard: true,
    swipeThreshold: 80,
});