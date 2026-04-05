document.addEventListener("DOMContentLoaded", () => {
  // Ensure GSAP and ScrollTrigger are available
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP or ScrollTrigger is missing.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const videoSection = document.querySelector(".scroll-video-section");
  const videoContainer = document.querySelector(".scroll-video-container");
  const video = document.querySelector(".scroll-video");
  const videoText = document.querySelector(".scroll-video-text");

  if (!videoSection || !video) return;

  // Wait for the video's metadata to load so we know its duration
  video.addEventListener("loadedmetadata", () => {
    initVideoScroll();
  });

  // If already loaded (e.g., from cache)
  if (video.readyState >= 1) {
    initVideoScroll();
  }

  function initVideoScroll() {
    // Only initialize once
    if (video.dataset.initialized) return;
    video.dataset.initialized = "true";

    const duration = video.duration || 5; // fallback to 5s if duration fails

    // Ensure video pauses (it might autoplay on some devices despite rules)
    video.pause();

    // Proxy object for smoother frame handling
    let proxy = { time: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: videoSection, // Pin the outer perfectly stable section
        start: "center center", 
        end: `+=${duration * 200}`,
        scrub: 0.8, 
        pin: true, // This now pins videoSection
      }
    });

    // Update proxy object instead of directly manipulating DOM
    tl.to(proxy, {
      time: duration,
      ease: "none",
      duration: 1,
      onUpdate: () => {
        // Direktes Setzen ist flüssiger, die Glättung übernimmt 'scrub'
        video.currentTime = proxy.time;
      }
    });

    // Text fade-in halfway through
    if (videoText) {
      tl.fromTo(videoText,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 },
        0.5 // Start at 50% of the timeline
      );
    }
  }
});
