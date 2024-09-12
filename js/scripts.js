document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('search');
    var cards = document.querySelectorAll('.card');
    var filterButtons = document.querySelectorAll('[data-category]');

    // Función de filtrado
    function filterCards() {
        var query = searchInput.value.toLowerCase();
        var selectedCategory = document.querySelector('[data-category].active')?.dataset.category || '';

        cards.forEach(function(card) {
            var title = card.querySelector('.card-title').innerText.toLowerCase();
            var content = card.querySelector('.card-content').innerText.toLowerCase();
            var category = card.dataset.category.toLowerCase();

            var matchesSearch = title.includes(query) || content.includes(query);
            var matchesCategory = !selectedCategory || category === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Manejo de la búsqueda
    searchInput.addEventListener('input', filterCards);

    // Manejo de los filtros de categoría
    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Eliminar la clase 'active' de todos los botones
            filterButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });

            // Añadir la clase 'active' al botón seleccionado
            button.classList.add('active');
            filterCards();
        });
    });

    // Inicializar el mapa
    var map = L.map('map').setView([48.8566, 2.3522], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    var destinos = [
        {
            lat: 48.8566,
            lng: 2.3522,
            title: 'París, Francia',
            description: 'La ciudad del amor, famosa por su Torre Eiffel y su rica cultura gastronómica.',
            comments: [],
            category: 'cultura'
        },
        {
            lat: -13.1631,
            lng: -72.5450,
            title: 'Machu Picchu, Perú',
            description: 'Una de las nuevas maravillas del mundo, ubicada en los Andes peruanos.',
            comments: [],
            category: 'aventura'
        },
        {
            lat: 35.0116,
            lng: 135.7681,
            title: 'Kyoto, Japón',
            description: 'Conocida por la belleza de sus templos antiguos y sus hermosos paisajes naturales.',
            comments: [],
            category: 'naturaleza'
        }
    ];

    // Cargar comentarios desde localStorage
    var storedDestinos = localStorage.getItem('destinos');
    if (storedDestinos) {
        destinos = JSON.parse(storedDestinos);
    }

    destinos.forEach(function(destino, index) {
        L.marker([destino.lat, destino.lng]).addTo(map)
            .bindPopup('<b>' + destino.title + '</b><br>' + destino.description);

        var card = document.querySelectorAll('.card')[index];
        card.dataset.category = destino.category; // Asigna la categoría a la tarjeta

        var commentsContainer = card.querySelector('.collection');
        
        destino.comments.forEach(function(comment) {
            var listItem = document.createElement('li');
            listItem.className = 'collection-item';
            listItem.textContent = comment;
            commentsContainer.appendChild(listItem);
        });

        var form = card.querySelector('form');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            var commentInput = form.querySelector('#comment');
            var newComment = commentInput.value.trim();
            if (newComment) {
                destino.comments.push(newComment);
                
                var newListItem = document.createElement('li');
                newListItem.className = 'collection-item';
                newListItem.textContent = newComment;
                commentsContainer.appendChild(newListItem);
                
                commentInput.value = '';
                
                // Guardar los comentarios en localStorage
                localStorage.setItem('destinos', JSON.stringify(destinos));
            }
        });
    });
});
