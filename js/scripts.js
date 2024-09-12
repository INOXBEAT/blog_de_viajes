document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('search');
    var cards = document.querySelectorAll('.card');

    searchInput.addEventListener('input', function() {
        var query = searchInput.value.toLowerCase();
        
        cards.forEach(function(card) {
            var title = card.querySelector('.card-title') ? card.querySelector('.card-title').innerText.toLowerCase() : '';
            var content = card.querySelector('.card-content') ? card.querySelector('.card-content').innerText.toLowerCase() : '';
            
            if (title.includes(query) || content.includes(query)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});


// mapa interactivo
document.addEventListener('DOMContentLoaded', function() {
    // Datos de los destinos
    var destinos = [
        {
            lat: 48.8566,
            lng: 2.3522,
            title: 'París, Francia',
            description: 'La ciudad del amor, famosa por su Torre Eiffel y su rica cultura gastronómica.'
        },
        {
            lat: -13.1631,
            lng: -72.5450,
            title: 'Machu Picchu, Perú',
            description: 'Una de las nuevas maravillas del mundo, ubicada en los Andes peruanos.'
        },
        {
            lat: 35.0116,
            lng: 135.7681,
            title: 'Kyoto, Japón',
            description: 'Conocida por la belleza de sus templos antiguos y sus hermosos paisajes naturales.'
        }
    ];

    // Inicializar el mapa
    var map = L.map('map').setView([48.8566, 2.3522], 5); // Centrar en París

    // Capa de mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Añadir marcadores
    destinos.forEach(function(destino) {
        L.marker([destino.lat, destino.lng]).addTo(map)
            .bindPopup('<b>' + destino.title + '</b><br>' + destino.description);
    });
});
