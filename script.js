document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById('transition-overlay');

    // Al cargar, hacemos que la capa negra se desvanezca
    if (overlay) {
        overlay.style.opacity = '0';
    }

    // Manejar el clic en el botón para ir a portafolio
    const transitionLink = document.querySelector('a[href="portafolio.html"]');
    if (transitionLink) {
        transitionLink.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = transitionLink.href;
            overlay.style.opacity = '1';
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500); // Esperamos a que termine la animación de CSS
        });
    }
});

document.addEventListener("mousemove", (e) => {
    const layers = document.querySelectorAll(".parallax-layer");
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    layers.forEach((layer) => {
        const speed = layer.getAttribute("data-speed");
        const x = (window.innerWidth - mouseX * speed) / 100;
        const y = (window.innerHeight - mouseY * speed) / 100;

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});