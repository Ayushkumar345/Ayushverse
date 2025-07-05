// ========== PRELOADER + VOICE GREETING ==========
window.addEventListener("load", () => {
  const loader = document.getElementById("preloader");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  }, 1800);

  // Voice greeting only once per page load
  const greeting = new SpeechSynthesisUtterance("Welcome to Ayushverse");
  greeting.pitch = 1.2;
  greeting.rate = 1;
  window.speechSynthesis.speak(greeting);
});

// ========== TYPEWRITER ==========
const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");
const typeSpeed = 60;
const text1 = "Hello World, I'm Ayush Kumar";
const text2 = "Future Frontend Engineer.";
let i = 0, j = 0;

function typeLine1() {
  if (i < text1.length) {
    line1.textContent += text1.charAt(i);
    i++;
    setTimeout(typeLine1, typeSpeed);
  } else {
    setTimeout(typeLine2, 500);
  }
}
function typeLine2() {
  if (j < text2.length) {
    line2.textContent += text2.charAt(j);
    j++;
    setTimeout(typeLine2, typeSpeed);
  }
}
typeLine1();

// ========== CUSTOM CURSOR ==========
const cursor = document.querySelector(".cursor");
const trail = document.querySelector(".cursor-trail");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
  trail.style.left = `${e.clientX}px`;
  trail.style.top = `${e.clientY}px`;
});

// ========== 3D TILT EFFECT ON ABOUT CARD ==========
const aboutCard = document.getElementById("aboutCard");
aboutCard.addEventListener("mousemove", (e) => {
  const rect = aboutCard.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * 10;
  const rotateY = ((x - centerX) / centerX) * -10;
  aboutCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
aboutCard.addEventListener("mouseleave", () => {
  aboutCard.style.transform = "rotateX(0deg) rotateY(0deg)";
});

// ========== GSAP ANIMATIONS ==========
gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-title", {
  y: -80,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out"
});
gsap.from(".hero-buttons .btn", {
  opacity: 0,
  y: 50,
  stagger: 0.2,
  duration: 1,
  delay: 1
});
gsap.utils.toArray(".section-title").forEach((title) => {
  gsap.from(title, {
    scrollTrigger: {
      trigger: title,
      start: "top 80%",
    },
    opacity: 0,
    y: 30,
    duration: 0.8
  });
});

// ========== CANVAS PARTICLE BACKGROUND ==========
const canvas = document.getElementById("hero-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numParticles = 150;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = "#00f0ff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numParticles; i++) {
    particlesArray.push(new Particle());
  }
}
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
initParticles();
animateParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// ========== TRAIT RING PERCENTAGE ANIMATION ==========
document.querySelectorAll('.progress-circle').forEach(circle => {
  const percent = parseInt(circle.getAttribute('data-percent'));
  let current = 0;

  const update = () => {
    current++;
    if (current <= percent) {
      circle.style.background = `conic-gradient(#00f0ff ${current * 3.6}deg, #222 ${current * 3.6}deg)`;
      circle.querySelector('.percent-text').textContent = `${current}%`;
      requestAnimationFrame(update);
    }
  };
  setTimeout(update, 500);
});

// ========== KEYBOARD SHORTCUTS (ALT + 1/2/3...) ==========
document.addEventListener("keydown", (e) => {
  if (e.altKey) {
    switch (e.key) {
      case "1":
        document.querySelector("#hero").scrollIntoView({ behavior: "smooth" });
        break;
      case "2":
        document.querySelector("#about").scrollIntoView({ behavior: "smooth" });
        break;
      case "3":
        document.querySelector("#skills").scrollIntoView({ behavior: "smooth" });
        break;
      case "4":
        document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
        break;
      case "5":
        document.querySelector("#traits").scrollIntoView({ behavior: "smooth" });
        break;
      case "6":
        document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
        break;
    }
  }
});
