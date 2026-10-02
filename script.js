const nav = document.getElementById("navLinks");
const toggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const scene = document.getElementById("scene");

toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle?.setAttribute("aria-expanded", "false");
}));

window.addEventListener("scroll", () => {
  navbar?.classList.toggle("scrolled", window.scrollY > 40);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

scene?.addEventListener("mousemove", e => {
  if (window.matchMedia("(max-width: 720px)").matches) return;
  const r = scene.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5;
  const y = (e.clientY - r.top) / r.height - .5;
  scene.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 3}deg)`;
});
scene?.addEventListener("mouseleave", () => {
  scene.style.transform = "";
});

document.getElementById("contactForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const note = document.getElementById("formNote");
  const subject = encodeURIComponent("Portfolio enquiry from " + data.get("name"));
  const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`);
  // Replace this email address with your real address.
  window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;
  note.textContent = "Opening your email app…";
});
