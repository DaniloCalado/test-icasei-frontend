function navigate(page) {
    document.getElementById('content-frame').contentWindow.postMessage({ type: 'navigate', page: page }, '*');
}

window.addEventListener('message', (event) => {
    if (event.data.type === 'updateFavoritesCount') {
        const favoritesCountElement = document.getElementById('favorites-count');
        if (favoritesCountElement) {
            favoritesCountElement.textContent = event.data.count;
        }
    }
});
