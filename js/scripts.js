document.addEventListener('DOMContentLoaded', function() {
            // Crear el mapa
            var map = L.map('map').setView([0, 0], 2);

            // Cargar el mapa base de OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Crear los puntos de interés
            var locations = [
                {lat: 48.8566, lng: 2.3522, title: 'París, Francia'},
                {lat: -13.1631, lng: -72.5450, title: 'Machu Picchu, Perú'},
                {lat: 35.6828, lng: 139.7594, title: 'Kyoto, Japón'}
            ];

            // Agregar los marcadores al mapa
            locations.forEach(function(location) {
                L.marker([location.lat, location.lng])
                    .addTo(map)
                    .bindPopup(location.title);
            });

            // Ajustar el mapa para mostrar todos los marcadores
            var bounds = L.latLngBounds(locations.map(function(location) {
                return [location.lat, location.lng];
            }));
            map.fitBounds(bounds);
        });