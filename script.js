// CONFIGURACIÓN
const IMAGE_SRC = "ruta/imagen.png";   // Cambia por tu imagen
const SPAWN_INTERVAL = 400;            // Crear una nueva imagen cada X ms
const container = document.getElementById("floating-container");

// Crear una imagen flotante nueva
function spawnFloatingImage() {
    const img = document.createElement("img");
    img.src = IMAGE_SRC;
    img.classList.add("floating-image");

    // Centro exacto
    const centerX = (window.innerWidth / 2) - 90;
    const centerY = (window.innerHeight / 2) - 90;

    img.style.left = centerX + "px";
    img.style.top = centerY + "px";

    // Animación variada
    img.style.animationDuration = (10 + Math.random() * 14) + "s";

    // Rotación inicial leve
    img.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;

    container.appendChild(img);

    // Auto-destrucción tras acabar varias animaciones
    setTimeout(() => img.remove(), 20000);
}

// Generación infinita
setInterval(spawnFloatingImage, SPAWN_INTERVAL);
