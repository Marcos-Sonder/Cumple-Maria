
// ==========================================
// ELEMENTOS HTML
// ==========================================

const welcome = document.getElementById("welcome");
const birthdayScene = document.getElementById("birthdayScene");
const startButton = document.getElementById("startButton");

const starsContainer = document.querySelector(".stars");
const sparklesContainer = document.querySelector(".sparkles");

// ==========================================
// ESTRELLAS Y PARTÍCULAS
// ==========================================

function createStars() {
    if (!starsContainer) return;

    for (let i = 0; i < 45; i++) {
        const star = document.createElement("span");

        star.classList.add("star");
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.animationDelay = Math.random() * 4 + "s";
        star.style.animationDuration = 2 + Math.random() * 4 + "s";

        starsContainer.appendChild(star);
    }
}

function createSparkles() {
    if (!sparklesContainer) return;

    for (let i = 0; i < 35; i++) {
        const sparkle = document.createElement("span");

        sparkle.classList.add("sparkle");
        sparkle.style.left = Math.random() * 100 + "%";
        sparkle.style.top = Math.random() * 100 + "%";
        sparkle.style.animationDelay = Math.random() * 5 + "s";

        sparklesContainer.appendChild(sparkle);
    }
}

createStars();
createSparkles();

// ==========================================
// MOVIMIENTO DEL MOUSE
// ==========================================

document.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;

    document.documentElement.style.setProperty("--mouse-x", x);
    document.documentElement.style.setProperty("--mouse-y", y);
});

// ==========================================
// PARTÍCULAS FLOTANTES
// ==========================================

function createFloatingParticle() {
    if (!sparklesContainer) return;

    const particle = document.createElement("span");

    particle.classList.add("sparkle");
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDuration = 3 + Math.random() * 4 + "s";

    sparklesContainer.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 7000);
}

if (sparklesContainer) {
    setInterval(createFloatingParticle, 500);
}

// ==========================================
// BOTÓN PARA ABRIR LA SORPRESA
// ==========================================

if (startButton) {
    startButton.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "./sorpresa.html";
    });
}
