// Certifications data (rendered dynamically)
const certs = [
  ["Programming in Python","Coursera"],
  ["C Programming with DSA Foundation","Coursera"],
  ["Advanced Java Development","Coursera"],
  ["Create a Supermarket App using Java OOP","Coursera"],
  ["Preparing for the AZ-900 Microsoft Azure Fundamentals Exam","Coursera"],
  ["MongoDB Basics for Students - Skill Badge","ICT Academy (Skill-a-thon 2026)"],
  ["Celonis Foundations","Celonis Academy"],
  ["Get Data Into Celonis","Celonis Academy"],
  ["Process Mining - From Theory to Execution","Celonis Academy"],
  ["Build Action Flows","Celonis Academy"],
  ["Process Mining Audit Professional","Celonis Academy"],
  ["Process Automation Concepts","Celonis Academy"],
  ["Digital Application Fundamentals (STEM)","FutureSkills Prime (NASSCOM)"]
];
const list = document.getElementById("certList");
certs.forEach(([name, org]) => {
  const li = document.createElement("li");
  li.innerHTML = `<b>${name}</b><small>${org}</small>`;
  list.appendChild(li);
});

// Typing effect
const words = ["Computer Science Student", "Python Developer", "Java Learner", "Problem Solver"];
const typed = document.getElementById("typed");
let w = 0, ch = 0, deleting = false;
(function type() {
  const word = words[w];
  typed.textContent = word.slice(0, ch);
  if (!deleting && ch === word.length) { deleting = true; return setTimeout(type, 1400); }
  if (deleting && ch === 0) { deleting = false; w = (w + 1) % words.length; }
  ch += deleting ? -1 : 1;
  setTimeout(type, deleting ? 40 : 90);
})();

// Mobile menu
const navLinks = document.getElementById("navLinks");
document.getElementById("menuBtn").onclick = () => navLinks.classList.toggle("open");
navLinks.querySelectorAll("a").forEach(a => a.onclick = () => navLinks.classList.remove("open"));

// Dark mode (remembered)
const themeBtn = document.getElementById("themeBtn");
function applyTheme(dark) {
  document.body.classList.toggle("dark", dark);
  themeBtn.innerHTML = dark ? "&#9728;" : "&#9790;";
}
try { applyTheme(localStorage.getItem("theme") === "dark"); } catch (e) {}
themeBtn.onclick = () => {
  const dark = !document.body.classList.contains("dark");
  applyTheme(dark);
  try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
};

// Scroll reveal + skill bars
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("show");
      e.target.querySelectorAll(".bar i").forEach(b => b.style.width = b.dataset.w + "%");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Back to top
const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => topBtn.style.display = window.scrollY > 400 ? "block" : "none");
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

// Contact form validation, opens the user's email app
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = cName.value.trim(), email = cEmail.value.trim(), msg = cMsg.value.trim();
  const err = document.getElementById("formError");
  if (!name || !email || !msg) { err.textContent = "Please fill in all fields."; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = "Please enter a valid email."; return; }
  err.textContent = "";
  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(msg + "\n\nFrom: " + name + " (" + email + ")");
  window.location.href = `mailto:annapooranis298@gmail.com?subject=${subject}&body=${body}`;
});

document.getElementById("year").textContent = new Date().getFullYear();
