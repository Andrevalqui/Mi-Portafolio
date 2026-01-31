document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. LÓGICA DEL MODAL (VENTANA EMERGENTE)
    // ==========================================
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-button');
    const detailButtons = document.querySelectorAll('.view-details-btn');

    detailButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Evita conflictos con el click de la tarjeta
            
            // Llenar datos desde los atributos del botón
            document.getElementById('modal-title').textContent = button.dataset.title;
            document.getElementById('modal-description').textContent = button.dataset.description;
            document.getElementById('modal-img').src = button.dataset.imageurl;
            document.getElementById('modal-link').href = button.dataset.liveurl;
            document.getElementById('modal-tech').textContent = button.dataset.tech;
            
            modal.style.display = 'block';
        });
    });

    // Cerrar Modal con la X
    if(closeBtn) {
        closeBtn.onclick = () => modal.style.display = 'none';
    }
    
    // Cerrar Modal clicando fuera
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = 'none';
    }

    // ==========================================
    // 2. LÓGICA DE FILTROS (CATEGORÍAS)
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Cambiar clase activa visualmente
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;

            // Mostrar u ocultar tarjetas
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ==========================================
    // 3. LÓGICA DE VIDEO PREVIEW (NUEVO)
    // ==========================================
    const projectImages = document.querySelectorAll('.project-thumb');

    projectImages.forEach(img => {
        const videoUrl = img.dataset.video;

        // Solo activamos esto si hay un video válido
        if (videoUrl && videoUrl !== 'None' && videoUrl !== '') {
            
            // Cuando el mouse entra
            img.parentElement.addEventListener('mouseenter', () => {
                // Crear el elemento de video dinámicamente
                const video = document.createElement('video');
                video.src = videoUrl;
                video.muted = true;      // Obligatorio para autoplay
                video.loop = true;       // Que se repita
                video.autoplay = true;   // Que arranque solo
                video.playsInline = true; // Para móviles
                
                // Estilos para que se vea igual que la imagen
                video.style.width = "100%";
                video.style.height = "200px";
                video.style.objectFit = "cover";
                video.style.borderRadius = "8px 8px 0 0"; // Respetar bordes redondeados
                
                // Ocultar imagen y mostrar video
                img.style.display = 'none';
                img.parentElement.insertBefore(video, img);
            });

            // Cuando el mouse sale
            img.parentElement.addEventListener('mouseleave', () => {
                const video = img.parentElement.querySelector('video');
                if (video) {
                    video.remove(); // Borrar video para ahorrar memoria
                    img.style.display = 'block'; // Mostrar imagen de nuevo
                }
            });
        }
    });

});
