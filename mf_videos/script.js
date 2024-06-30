document.addEventListener('DOMContentLoaded', () => {
    updateFavoritesCount();
    window.addEventListener('message', (event) => {
        if (event.data.type === 'navigate') {
            loadContent(event.data.page);
        }
    });
    loadContent('videos');
});

function loadContent(page) {
    if (page === 'favorites') {
        loadFavoritesPage();
    } else {
        loadVideosPage();
    }
}

function loadVideosPage() {
    document.getElementById('content').innerHTML = `
        <div class="search-container">
            <input type="text" id="search-input" placeholder="Buscar vídeos...">
            <button id="search-button"><i class="fas fa-search"></i></button>
        </div>
        <div id="videos-container"></div>
    `;
    document.getElementById('search-button').addEventListener('click', searchVideos);
}

function loadFavoritesPage() {
    document.getElementById('content').innerHTML =
        `<p cl>FAVORITOS</p> 
         <div id="favorites-container"></div>`;
    renderFavorites();
}

function searchVideos() {
    const query = document.getElementById('search-input').value;
    fetch(`/search?query=${query}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const videosContainer = document.getElementById('videos-container');
            videosContainer.innerHTML = '';
            data.items.forEach(item => {
                const videoItem = document.createElement('div');
                videoItem.className = 'video-item';
                const isFavorite = JSON.parse(localStorage.getItem('favorites') || '[]').includes(item.id.videoId);

                const favoriteIcon = isFavorite ? '⭐' : '☆';

                videoItem.innerHTML = `
                    <div class="video-content">
                        <iframe width="100%" height="150" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                        <p>${item.snippet.title}</p>
                    </div>
                    <div class="video-footer">
                        <button class="favorite-button ${isFavorite ? 'favorited' : ''}" data-video-id="${item.id.videoId}">
                            ${favoriteIcon}
                        </button>
                    </div>
                `;
                videosContainer.appendChild(videoItem);
            });
            initFavoriteButtons();
        })
        .catch(error => {
            console.error('Error fetching videos:', error);
        });
}




function initFavoriteButtons() {
    document.querySelectorAll('.favorite-button').forEach(button => {
        button.addEventListener('click', toggleFavorite);
    });
}

function toggleFavorite(event) {
    const videoId = event.target.dataset.videoId;
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(videoId)) {
        favorites = favorites.filter(id => id !== videoId);
    } else {
        favorites.push(videoId);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesCount();
    event.target.classList.toggle('favorited');

    if (document.getElementById('favorites-container')) {
        renderFavorites();
    }
    searchVideos()
}

function updateFavoritesCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    window.parent.postMessage({ type: 'updateFavoritesCount', count: favorites.length }, '*');
}

function renderFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesContainer = document.getElementById('favorites-container');
    favoritesContainer.innerHTML = '';
    favorites.forEach(videoId => {
        fetch(`/videos/${videoId}`)
            .then(response => response.json())
            .then(data => {
                const isFavorite = favorites.includes(videoId);
                const videoItem = document.createElement('div');
                videoItem.className = 'video-item';
                videoItem.innerHTML = `
                    <div class="video-content">
                        <iframe width="100%" height="150" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                        <p>${data.snippet.title}</p>
                    </div>
                    <div class="video-footer">
                    <button class="favorite-button ${isFavorite ? 'favorited' : ''}" data-video-id="${videoId}">
                        ${isFavorite ? '⭐' : '☆'}
                    </button>
                    </div>
                `;
                favoritesContainer.appendChild(videoItem);
                if (isFavorite) {
                    const favoriteButton = videoItem.querySelector('.favorite-button');
                    favoriteButton.addEventListener('click', toggleFavorite);
                }
            });
    });
    initFavoriteButtons();
}

