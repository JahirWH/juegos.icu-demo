function getCategoryName(category) {
    const names = {
        puzzle: 'Puzzle',
        racing: 'Carreras',
        adventure: 'Aventura',
        strategy: 'Estrategia',
        shooter: 'Acción',
        platform: 'Plataforma',
        cards: 'Cartas',
        rpg: 'RPG',
        arcade: 'Arcade',
        sports: 'Deportes'
    };
    return names[category] || category;
}


function filterGames(filter) {
    currentFilter = filter;
    let filteredGames = games;
    if (filter === 'popular') {
        filteredGames = games.filter(game => game.type === 'popular');
    } else if (filter === 'new') {
        filteredGames = games.filter(game => game.type === 'new');
    } else if (filter !== 'all') {
        filteredGames = games.filter(game => game.category === filter);
    }
    renderGames(filteredGames);
}

function renderGames(games) {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = '';
    games.forEach((game, index) => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.dataset.category = game.category;
        gameCard.style.animationDelay = `${index * 0.1}s`;
        gameCard.onclick = () => window.location.href = `/game/${game.id}`;
        gameCard.innerHTML = `
            <div class="game-image">
                <img class="img_logo" src="${game.icon}">
                ${game.type === 'popular' ? '<div class="badge popular">Popular</div>' : ''}
                ${game.type === 'new' ? '<div class="badge new">Nuevo</div>' : ''}
            </div>
            <div class="game-info">
                <div class="game-title">${game.title}</div>
                <div class="game-category">${game.category}</div>
            </div>
        `;
        gamesGrid.appendChild(gameCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterGames(btn.dataset.filter);
        });
    });
});

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

