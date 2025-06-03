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

            // Inicializar funcionalidades según la página
            if (url.toLowerCase().includes('ubicacion.html')) {
                if (typeof inicializarMapa === 'function') {
                    inicializarMapa();
                } else {
                    // Cargar mapa.js dinámicamente si no está cargado
                    const scriptMapa = document.createElement('script');
                    scriptMapa.src = 'js/mapa.js';
                    scriptMapa.onload = () => inicializarMapa();
                    document.body.appendChild(scriptMapa);
                }
            }

            if (url.toLowerCase().includes('inicio.html')) {
            // Cargar carrusel.js dinámicamente si no está cargado
            if (typeof iniciarCarrucel === 'function') {
                iniciarCarrucel(); 
            } else {
                const scriptCarrusel = document.createElement('script');
                scriptCarrusel.src = 'js/carrusel.js';
                scriptCarrusel.onload = () => iniciarCarrucel();
                document.body.appendChild(scriptCarrusel);
            }
            }

        })
        .catch(error => {
            console.error('Error al cargar la página:', error);
            document.getElementById('content').innerHTML = "<p>No se pudo cargar el contenido.</p>";
        });
}

window.onpopstate = function () {
    loadContent(location.pathname);
};
