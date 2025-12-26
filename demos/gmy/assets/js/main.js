document.getElementById("year").textContent = new Date().getFullYear();

const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");

burger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

// close menu after click
mobileMenu?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => mobileMenu.classList.remove("open"));
});


