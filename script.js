// Funkcija za postavljanje veličine canvasa
function resizeCanvas() {
  const canvas = document.getElementById("tech-animation");
  if (!canvas) return;
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
const ctx = canvas ? canvas.getContext("2d") : null;
let lines = [];

function initLines() {
  lines = [];
  for (let i = 0; i < 50; i++) {
    lines.push(new Line());
  }
}

function animateLines() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lines.forEach((line) => {
    line.update();
    line.draw(ctx);
  });
  requestAnimationFrame(animateLines);
}

resizeCanvas();
initLines();
animateLines();
window.addEventListener("resize", () => {
  resizeCanvas();
  initLines();
});

// Hamburger meni
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// STUDIJI – jedan gumb + animacija fade između studija
const toggleBtn = document.getElementById("toggle-studij-btn");
const studyContent = document.getElementById("study-content");

const preddipHTML = `
  <h2>Preddiplomski stručni studij informacijskih tehnologija</h2>
  <p>Traje 3 godine (6 semestara), 180 ECTS. Završetkom se stječe naziv bacc.ing.techn.inf.</p>
  <h3>Smjerovi:</h3>
  <ul>
    <li>Programiranje</li>
    <li>Računalni sustavi i mreže</li>
    <li>Baze podataka i web dizajn</li>
    <li>Informacijski sustavi</li>
  </ul>
  <h3>Primjeri kolegija:</h3>
  <ul>
    <li>Osnove programiranja</li>
    <li>Web programiranje</li>
    <li>Baze podataka</li>
    <li>Uvod u mreže</li>
  </ul>
`;

const diplomskiHTML = `
  <h2>Stručni diplomski studij informacijskih tehnologija</h2>
  <p>Traje 2 godine (4 semestra), 120 ECTS. Završetkom se stječe naziv mag.ing.inf.tech.</p>
  <h3>Smjerovi:</h3>
  <ul>
    <li>Programsko inženjerstvo i informacijski sustavi</li>
    <li>Računalni sustavi</li>
    <li>Ugradbena i prijenosna računala</li>
  </ul>
  <h3>Primjeri kolegija:</h3>
  <ul>
    <li>Računalna sigurnost</li>
    <li>Napredne baze podataka</li>
    <li>Distribuirani sustavi</li>
    <li>Diplomski rad</li>
  </ul>
`;

function fadeSwitch(content) {
  if (!studyContent) return;
  studyContent.classList.remove("visible");
  setTimeout(() => {
    studyContent.innerHTML = content;
    studyContent.classList.add("visible");
  }, 300);
}

if (toggleBtn && studyContent) {
  let showingPreddip = true;
  studyContent.innerHTML = preddipHTML;
  studyContent.classList.add("visible");
  toggleBtn.addEventListener("click", () => {
    showingPreddip = !showingPreddip;
    fadeSwitch(showingPreddip ? preddipHTML : diplomskiHTML);
  });
}

// PREDMETI – klik za prikaz detalja s efektom
document.querySelectorAll('#predmeti ul li').forEach(li => {
  li.style.cursor = 'pointer';
  li.addEventListener('click', () => {
    const existing = li.querySelector('.details');
    if (existing) {
      existing.remove();
    } else {
      const details = document.createElement('div');
      details.className = 'details';
      details.innerHTML = getDetailsFor(li.textContent.trim());
      details.style.opacity = 0;
      details.style.transition = 'opacity 0.4s ease';
      li.appendChild(details);
      requestAnimationFrame(() => {
        details.style.opacity = 1;
      });
    }
  });
});

function getDetailsFor(subject) {
  switch (subject) {
    case 'Osnove programiranja':
      return 'Uvod u algoritme, petlje, uvjeti, varijable.';
    case 'Objektno orijentirano programiranje':
      return 'Klase, objekti, nasljeđivanje, polimorfizam.';
    case 'Baze podataka i SQL':
      return 'Relacijski modeli, SELECT upiti, normalizacija.';
    case 'Web programiranje':
      return 'HTML, CSS, JS, responzivni dizajn, DOM manipulacija.';
    case 'Mrežne tehnologije':
      return 'TCP/IP, OSI, rutanje, sigurnost, IPv6.';
    case 'Razvoj mobilnih aplikacija':
      return 'Android i iOS razvoj, Swift, Kotlin, mobilni UI dizajn.';
    case 'Upravljanje IT projektima':
      return 'Scrum, Agile, vođenje tima, budžetiranje.';
    case 'Računalna sigurnost':
      return 'Kriptografija, autentifikacija, sigurnost mreže.';
    case 'Napredni SQL':
      return 'Stored procedures, funkcije, transakcije, indeksiranje.';
    case 'Operacijski sustavi':
      return 'Procesi, dretve, memorija, fajl sistemi, kernel.';
    default:
      return 'Detalji uskoro dostupni.';
  }
}