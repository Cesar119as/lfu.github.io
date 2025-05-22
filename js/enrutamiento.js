function setupLinks() {
    document.querySelectorAll('a').forEach(link => {
        if (!link.hasAttribute('target') || link.getAttribute('target') !== '_blank') {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                const url = this.getAttribute('href');
                if (url !== '#') {
                    loadContent(url);
                    history.pushState(null, '', `#${url}`);
                }
            });
        }
    });
}

function loadContent(url) {
    if (url.startsWith('#')) {
        url = url.slice(1);
    }

    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
        })
        .catch(error => {
            console.error('Error al cargar la página:', error);
            document.getElementById('content').innerHTML = "<p>No se pudo cargar el contenido.</p>";
        });
}

window.onpopstate = function () {
    loadContent(location.pathname);
};
