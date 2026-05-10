const stage = document.querySelector(".cheetah-stage");

if (stage && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  stage.addEventListener("pointermove", (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    stage.style.setProperty("--tilt-x", `${y * -5}deg`);
    stage.style.setProperty("--tilt-y", `${x * 7}deg`);
    stage.style.transform = `perspective(1100px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y))`;
  });

  stage.addEventListener("pointerleave", () => {
    stage.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
  });
}

const revealTargets = document.querySelectorAll(".metrics, .split-section, .story-section, .wins-section, .contact-section");

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.16 }
);

for (const target of revealTargets) {
  target.classList.add("reveal");
  observer.observe(target);
}
