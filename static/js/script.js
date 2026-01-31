document.addEventListener('DOMContentLoaded', () => {
    // Referencias al Modal
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-button');
    const detailButtons = document.querySelectorAll('.view-details-btn');

    // Abrir Modal
    detailButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            
            // Llenar datos
            document.getElementById('modal-title').textContent = button.dataset.title;
            document.getElementById('modal-description').textContent = button.dataset.description;
            document.getElementById('modal-img').src = button.dataset.imageurl;
            document.getElementById('modal-link').href = button.dataset.liveurl;
            document.getElementById('modal-tech').textContent = button.dataset.tech;
            
            modal.style.display = 'block';
        });
    });

    // Cerrar Modal
    if(closeBtn) {
        closeBtn.onclick = () => modal.style.display = 'none';
    }
    
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = 'none';
    }

    // Filtros
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
