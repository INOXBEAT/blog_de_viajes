document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('search');
    var cards = document.querySelectorAll('.card');

    searchInput.addEventListener('input', function() {
        var query = searchInput.value.toLowerCase();
        
        cards.forEach(function(card) {
            var title = card.querySelector('.card-title').innerText.toLowerCase();
            var content = card.querySelector('.card-content').innerText.toLowerCase();
            if (title.includes(query) || content.includes(query)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });

    var destinos = [
        {
            lat: 48.8566,
            lng: 2.3522,
            title: 'París, Francia',
            description: 'La ciudad del amor, famosa por su Torre Eiffel y su rica cultura gastronómica.',
            comments: []
        },
        {
            lat: -13.1631,
            lng: -72.5450,
            title: 'Machu Picchu, Perú',
            description: 'Una de las nuevas maravillas del mundo, ubicada en los Andes peruanos.',
            comments: []
        },
        {
            lat: 35.0116,
            lng: 135.7681,
            title: 'Kyoto, Japón',
            description: 'Conocida por la belleza de sus templos antiguos y sus hermosos paisajes naturales.',
            comments: []
        }
    ];

    // Cargar comentarios desde localStorage
    var storedDestinos = localStorage.getItem('destinos');
    if (storedDestinos) {
        destinos = JSON.parse(storedDestinos);
    }

    // Inicializar el mapa
    var map = L.map('map').setView([48.8566, 2.3522], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    destinos.forEach(function(destino, index) {
        L.marker([destino.lat, destino.lng]).addTo(map)
            .bindPopup('<b>' + destino.title + '</b><br>' + destino.description);

        var card = document.querySelectorAll('.card')[index];
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
