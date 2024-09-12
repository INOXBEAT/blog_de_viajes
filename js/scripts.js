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

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el mapa
    var map = L.map('map').setView([51.505, -0.09], 13); // Coordenadas de ejemplo para centrar el mapa

    // Capa de mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Marcador de ejemplo
    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('Un marcador de ejemplo en Londres.')
        .openPopup();
});

