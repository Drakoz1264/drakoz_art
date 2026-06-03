document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('transition-overlay');

    // Al cargar, hacemos que la capa negra se desvanezca
    if (overlay) {
        overlay.style.opacity = '0';
    }

    // Manejar el clic en el botón para volver al inicio
    const backLink = document.querySelector('a[href="index.html"]');
    if (backLink) {
        backLink.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = backLink.href;
            overlay.style.opacity = '1';
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500);
        });
    }

    // --- LÓGICA DE FILTRADO ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Función para aplicar el filtrado
    const applyFilter = (filter) => {
        portfolioItems.forEach(item => {
            const isVideo = item.querySelector('video');

            if (filter === 'all') {
                // Excluimos los videos de la pestaña "Todos"
                isVideo ? item.classList.add('hidden') : item.classList.remove('hidden');
            } else if (item.getAttribute('data-category') === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    };

    // Ejecutar al cargar la página para que "Todos" oculte los videos de entrada
    applyFilter('all');

    // Seleccionar el título para cambiarlo dinámicamente
    const portfolioTitle = document.querySelector('.portfolio-nav h1');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Cambiar clase activa en botones
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');

            // Actualizar el título dependiendo del filtro
            if (filterValue === 'all') {
                portfolioTitle.textContent = 'Mis Proyectos 3D';
            } else {
                portfolioTitle.textContent = btn.textContent;
            }

            applyFilter(filterValue);
        });
    });

    // --- LÓGICA DE LIGHTBOX ---
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
    const body = document.body;

    lightboxTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault(); // Previene cualquier acción por defecto del enlace si lo hubiera
            
            const sourceUrl = trigger.src; // Obtiene la URL del recurso clicado
            const isVideo = trigger.tagName.toLowerCase() === 'video';

            // 1. Crear el overlay del lightbox
            const lightboxOverlay = document.createElement('div');
            lightboxOverlay.classList.add('lightbox-overlay');

            // 2. Crear el contenido del lightbox (imagen o video y botón de cerrar)
            const lightboxContent = document.createElement('div');
            lightboxContent.classList.add('lightbox-content');

            let lightboxMedia;
            if (isVideo) {
                lightboxMedia = document.createElement('video');
                lightboxMedia.controls = true;
                lightboxMedia.autoplay = true;
            } else {
                lightboxMedia = document.createElement('img');
                lightboxMedia.alt = trigger.alt || 'Render';
            }
            
            lightboxMedia.classList.add('lightbox-image');
            lightboxMedia.src = sourceUrl;

            const lightboxClose = document.createElement('button');
            lightboxClose.classList.add('lightbox-close');
            lightboxClose.innerHTML = '&times;'; // Símbolo de "x"

            // 3. Ensamblar el lightbox
            lightboxContent.appendChild(lightboxMedia);
            lightboxContent.appendChild(lightboxClose);
            lightboxOverlay.appendChild(lightboxContent);
            body.appendChild(lightboxOverlay);

            // 4. Mostrar el lightbox y bloquear el scroll del body
            setTimeout(() => { // Pequeño retraso para que la transición CSS funcione
                lightboxOverlay.classList.add('active');
                body.classList.add('no-scroll');
            }, 10);

            // 5. Funcionalidad para cerrar el lightbox
            const closeLightbox = () => {
                lightboxOverlay.classList.remove('active');
                body.classList.remove('no-scroll');
                lightboxOverlay.addEventListener('transitionend', () => lightboxOverlay.remove(), { once: true });
            };
            lightboxClose.addEventListener('click', closeLightbox);
            lightboxOverlay.addEventListener('click', (e) => { if (e.target === lightboxOverlay) closeLightbox(); }); // Cierra al hacer clic fuera de la imagen
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); }, { once: true }); // Cierra con la tecla Esc
        });
    });
});
