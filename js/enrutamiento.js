let currentPage = '';

document.addEventListener('DOMContentLoaded', () => {
    setupLinks();

    // Cargar página inicial si hay hash
    if (location.hash) {
        const initial = location.hash.substring(1);
        if (initial.includes('#')) {
            handleAnchorLink(initial);
        } else {
            loadContent(initial);
        }
    }
});

function setupLinks() {
    document.addEventListener('click', function (event) {
        const link = event.target.closest('a');
        if (!link) return;

        // No interceptar enlaces externos
        if (link.target === '_blank') return;

        const href = link.getAttribute('href');
        if (!href || href === '#') return;

        event.preventDefault();

        // Link con sección
        if (href.includes('#')) {
            handleAnchorLink(href);
        } 
        // Link normal
        else {
            loadContent(href);
            history.pushState(null, '', `#${href}`);
        }
    });
}

function loadContent(url, callback) {
    const cleanUrl = url.split('#')[0];
    currentPage = cleanUrl;

    fetch(cleanUrl)
        .then(response => response.text())
        .then(data => {
            const content = document.getElementById('content');
            content.innerHTML = data;

            actualizarSubmenu(cleanUrl);
            inicializarScripts(cleanUrl);

            if (!url.includes('#')) {
                window.scrollTo({ top: 0, behavior: 'auto' });
            }

            if (typeof callback === 'function') {
                callback();
            }
        })
        .catch(() => {
            document.getElementById('content').innerHTML =
                '<p>No se pudo cargar el contenido.</p>';
        });
}


function actualizarSubmenu(url) {
    document.querySelectorAll('.submenu-contexto')
        .forEach(el => el.classList.remove('active'));

    const lowerUrl = url.toLowerCase();

    if (lowerUrl.includes('inicio') || lowerUrl.includes('que_hacemos')) {
        document.getElementById('submenu-inicio')?.classList.add('active');
    } else if (lowerUrl.includes('investigacion')) {
        document.getElementById('submenu-investigacion')?.classList.add('active');
    } else if (lowerUrl.includes('formacion')) {
        document.getElementById('submenu-formacion')?.classList.add('active');
    } else if (lowerUrl.includes('vinculacion')) {
        document.getElementById('submenu-vinculacion')?.classList.add('active');
    } else if (lowerUrl.includes('divulgacion')) {
        document.getElementById('submenu-divulgacion')?.classList.add('active');
    } else if (lowerUrl.includes('servicios')) {
        document.getElementById('submenu-servicios')?.classList.add('active');
    } else if (lowerUrl.includes('eventos_y_noticias')) {
        document.getElementById('submenu-eventos_y_noticias')?.classList.add('active');
    } else if (lowerUrl.includes('transparencia')) {
        document.getElementById('submenu-transparencia')?.classList.add('active');
    }
}

function inicializarScripts(url) {
    const lower = url.toLowerCase();

    if (lower.includes('que_hacemos.html')) {
        if (typeof inicializarMapa === 'function') {
            inicializarMapa();
        } else {
            cargarScript('js/mapa.js', 'inicializarMapa');
        }
    }

    if (lower.includes('inicio.html')) {
        if (typeof initCarrusel === 'function') {
            initCarrusel();
        } else {
            cargarScript('js/carrusel.js', 'initCarrusel');
        }
    }
}

function cargarScript(src, callbackName) {
    if (document.querySelector(`script[src="${src}"]`)) return;

    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
        if (typeof window[callbackName] === 'function') {
            window[callbackName]();
        }
    };
    document.body.appendChild(script);
}

function handleAnchorLink(href) {
    const [page, anchor] = href.split('#');

    if (page && page !== currentPage) {
        loadContent(page, () => {
            if (anchor) {
                scrollToAnchor(anchor);
            } else {
                window.scrollTo({ top: 0, behavior: 'auto' });
            }
        });
        history.pushState(null, '', `#${href}`);
    } else if (anchor) {
        scrollToAnchor(anchor);
    } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }
}

function scrollToAnchor(anchor) {
    const target = document.getElementById(anchor);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

window.onpopstate = () => {
    if (location.hash) {
        const path = location.hash.substring(1);
        if (path.includes('#')) {
            handleAnchorLink(path);
        } else {
            loadContent(path);
        }
    }
};
