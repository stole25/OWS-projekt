// Funkcija za postavljanje veličine canvasa
function resizeCanvas() {
  const canvas = document.getElementById("tech-animation");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Klasa za animirane linije
class Line {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.speed = Math.random() * 1 + 0.5;
    this.length = Math.random() * 60 + 20;
    this.thickness = Math.random() * 2 + 1;
    const directions = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
    this.angle = directions[Math.floor(Math.random() * directions.length)];
  }
  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw(ctx) {
    ctx.strokeStyle = "#32CD32";
    ctx.lineWidth = this.thickness;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x + Math.cos(this.angle) * this.length,
      this.y + Math.sin(this.angle) * this.length
    );
    ctx.stroke();
  }
}

const canvas = document.getElementById("tech-animation");
const ctx = canvas.getContext("2d");
let lines = [];

function initLines() {
  lines = [];
  const numLines = 50;
  for (let i = 0; i < numLines; i++) {
    lines.push(new Line());
  }
}

function animateLines() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lines.forEach((line) => {
    line.update();
    line.draw(ctx);
  });
  requestAnimationFrame(animateLines);
}

// Inicijalizacija animacije i prilagodba pri promjeni veličine prozora
resizeCanvas();
initLines();
animateLines();
window.addEventListener("resize", () => {
  resizeCanvas();
  initLines();
});

// Dropdown funkcionalnost za Studij stranicu
function toggleDropdown() {
  const dropdown = document.getElementById("studijDropdown");
  if (dropdown) {
    dropdown.classList.toggle("show");
  }
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
