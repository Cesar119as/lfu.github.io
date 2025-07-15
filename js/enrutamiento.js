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

        document.querySelectorAll('.submenu-contexto').forEach(el => el.classList.remove('active'));

        const lowerUrl = url.toLowerCase();
        

        if (lowerUrl.includes('inicio') || lowerUrl.includes('que_hacemos')) {
            document.getElementById('submenu-inicio')?.classList.add('active');
        } else if (lowerUrl.includes('investigacion')) {
            document.getElementById('submenu-investigacion')?.classList.add('active');
        } else if (lowerUrl.includes('formacion')) {
            document.getElementById('submenu-formacion')?.classList.add('active');
        } else if (lowerUrl.includes('divulgacion')) {
            document.getElementById('submenu-divulgacion')?.classList.add('active');
        } else if (lowerUrl.includes('vinculacion')) {
            document.getElementById('submenu-vinculacion')?.classList.add('active');
        } else if (lowerUrl.includes('servicios')) {
            document.getElementById('submenu-servicios')?.classList.add('active');
        } else if (lowerUrl.includes('eventos_y_noticias')) {
            document.getElementById('submenu-eventos_y_noticias')?.classList.add('active');
        } else if (lowerUrl.includes('transparencia')) {
            document.getElementById('submenu-transparencia')?.classList.add('active');
        }

            // Inicializar funcionalidades según la página
            if (url.toLowerCase().includes('que_hacemos.html')) {
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

            if (url.toLowerCase().includes('Inicio.html')) {
            // Cargar carrusel.js dinámicamente si no está cargado
            if (typeof initCarrusel === 'function') {
                initCarrusel(); // si ya está cargado
            } else {
                const scriptCarrusel = document.createElement('script');
                scriptCarrusel.src = 'js/carrusel.js';
                scriptCarrusel.onload = () => initCarrusel(); // cuando termine de cargar
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
