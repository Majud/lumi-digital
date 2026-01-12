/* ==========================================
   demos slider - autoplay, arrows, dots, swipe
   ========================================== */

(function () {
  "use strict";

  function initSlider(root) {
    const track = root.querySelector(".slider-track");
    const viewport = root.querySelector(".demo-slider__viewport");
    const prevBtn = root.querySelector(".demo-slider__nav--prev");
    const nextBtn = root.querySelector(".demo-slider__nav--next");
    const dotsWrap = root.querySelector(".demo-slider__dots");

    if (!track || !viewport || !prevBtn || !nextBtn) return;

    let slides = [];
    let index = 0;
    let slideSize = 0;
    let gap = 0;
    let slidesPerView = 1;
    let autoplayId = null;
    let resizeTimer = null;

    const autoplayDelay = 6500;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const getLabel = (key, fallback) =>
      (window.LUMI_T && window.LUMI_T(key)) || fallback;

    const applyDirFix = () => {
      const isRtl = document.documentElement.dir === "rtl";
      if (isRtl) {
        viewport.style.direction = "ltr";
        track.style.direction = "ltr";
      } else {
        viewport.style.removeProperty("direction");
        track.style.removeProperty("direction");
      }
    };

    const setTransition = (enabled) => {
      track.style.transition = enabled ? "" : "none";
    };

    const readGap = () => {
      const styles = window.getComputedStyle(track);
      const raw = styles.gap || styles.columnGap || "0px";
      const value = parseFloat(raw);
      return Number.isNaN(value) ? 0 : value;
    };

    const measure = () => {
      const first = track.querySelector(".slider-item");
      if (!first) return;
      slideSize = first.getBoundingClientRect().width;
      gap = readGap();
      const viewportWidth = viewport.getBoundingClientRect().width;
      slidesPerView = Math.max(
        1,
        Math.floor((viewportWidth + gap) / (slideSize + gap))
      );
    };

    const syncHeights = () => {
      const items = Array.from(track.querySelectorAll(".slider-item"));
      if (!items.length) return;
      root.style.setProperty("--demo-card-height", "auto");
      track.getBoundingClientRect();
      let max = 0;
      items.forEach((item) => {
        const height = item.getBoundingClientRect().height;
        if (height > max) max = height;
      });
      if (max) {
        root.style.setProperty("--demo-card-height", `${Math.ceil(max)}px`);
      }
    };

    const removeClones = () => {
      track.querySelectorAll(".is-clone").forEach((node) => node.remove());
    };

    const cloneSlide = (slide) => {
      const clone = slide.cloneNode(true);
      clone.classList.add("is-clone");
      clone.setAttribute("aria-hidden", "true");
      return clone;
    };

    const realIndex = () => {
      const total = slides.length;
      if (!total) return 0;
      let idx = (index - slidesPerView) % total;
      if (idx < 0) idx += total;
      return idx;
    };

    const updateDots = () => {
      if (!dotsWrap) return;
      const dots = Array.from(dotsWrap.children);
      const active = realIndex();
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === active);
        if (i === active) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    };

    const updateDotLabels = () => {
      if (!dotsWrap) return;
      const label = getLabel("demos.dotLabel", "Go to demo");
      Array.from(dotsWrap.children).forEach((dot, i) => {
        dot.setAttribute("aria-label", `${label} ${i + 1}`);
      });
    };

    const buildDots = () => {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      slides.forEach((_, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "demo-slider__dot";
        btn.addEventListener("click", () => {
          stopAutoplay();
          goTo(i);
          requestAutoplay();
        });
        dotsWrap.appendChild(btn);
      });
      updateDotLabels();
      updateDots();
    };

    const setTranslate = (animate) => {
      setTransition(!!animate);
      const offset = -(slideSize + gap) * index;
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
    };

    const goTo = (target) => {
      if (!slides.length) return;
      index = target + slidesPerView;
      setTranslate(true);
      updateDots();
    };

    const move = (step) => {
      if (!slides.length) return;
      index += step;
      setTranslate(true);
      updateDots();
    };

    const handleLoop = () => {
      const total = slides.length;
      if (!total) return;
      if (index >= total + slidesPerView) {
        index = slidesPerView;
        setTranslate(false);
      } else if (index < slidesPerView) {
        index = total + slidesPerView - 1;
        setTranslate(false);
      }
    };

    const toggleNav = () => {
      const active = slides.length > slidesPerView;
      prevBtn.disabled = !active;
      nextBtn.disabled = !active;
      if (dotsWrap) dotsWrap.hidden = !active;
      root.classList.toggle("is-static", !active);
    };

    const startAutoplay = () => {
      if (autoplayId || reducedMotion) return;
      if (slides.length <= slidesPerView) return;
      autoplayId = window.setInterval(() => move(1), autoplayDelay);
    };

    const stopAutoplay = () => {
      if (autoplayId) {
        window.clearInterval(autoplayId);
        autoplayId = null;
      }
    };

    const requestAutoplay = () => {
      stopAutoplay();
      if (!isHovering) startAutoplay();
    };

    let isHovering = false;

    const rebuild = (preserveIndex) => {
      applyDirFix();
      const keep = preserveIndex ? realIndex() : 0;
      removeClones();
      slides = Array.from(track.querySelectorAll(".slider-item:not(.is-clone)"));
      if (!slides.length) return;

      measure();

      if (slides.length > slidesPerView) {
        const head = slides.slice(0, slidesPerView).map(cloneSlide);
        const tail = slides.slice(-slidesPerView).map(cloneSlide);
        tail.forEach((clone) => track.insertBefore(clone, track.firstChild));
        head.forEach((clone) => track.appendChild(clone));
      }

      index = slides.length > slidesPerView ? keep + slidesPerView : 0;
      setTranslate(false);
      buildDots();
      toggleNav();
      syncHeights();
      requestAutoplay();
    };

    // Arrows
    prevBtn.addEventListener("click", () => {
      stopAutoplay();
      move(-1);
      requestAutoplay();
    });
    nextBtn.addEventListener("click", () => {
      stopAutoplay();
      move(1);
      requestAutoplay();
    });

    // Hover / focus pause
    root.addEventListener("mouseenter", () => {
      isHovering = true;
      stopAutoplay();
    });
    root.addEventListener("mouseleave", () => {
      isHovering = false;
      requestAutoplay();
    });
    root.addEventListener("focusin", () => {
      isHovering = true;
      stopAutoplay();
    });
    root.addEventListener("focusout", () => {
      isHovering = false;
      requestAutoplay();
    });

    // Swipe
    let startX = 0;
    let startY = 0;
    let pointerDown = false;
    const swipeThreshold = 40;

    viewport.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (e.target.closest("a, button, input, textarea, select, label")) return;
      pointerDown = true;
      startX = e.clientX;
      startY = e.clientY;
      stopAutoplay();
      viewport.setPointerCapture(e.pointerId);
    });

    viewport.addEventListener("pointerup", (e) => {
      if (!pointerDown) return;
      pointerDown = false;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > swipeThreshold) {
        move(dx < 0 ? 1 : -1);
      }
      requestAutoplay();
      viewport.releasePointerCapture(e.pointerId);
    });

    viewport.addEventListener("pointercancel", () => {
      pointerDown = false;
      requestAutoplay();
    });

    track.addEventListener("transitionend", (e) => {
      if (e.propertyName !== "transform") return;
      handleLoop();
      updateDots();
    });

    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => rebuild(true), 150);
    });

    document.addEventListener("lumi:lang", () => {
      applyDirFix();
      rebuild(true);
      updateDotLabels();
      syncHeights();
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(syncHeights);
    }
    window.addEventListener("load", () => rebuild(true));

    rebuild(false);
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-slider='demos']").forEach(initSlider);
  });
})();
