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
