window.addEventListener('DOMContentLoaded', () => {
    const hash = location.hash.slice(1);
    if (hash) {
        loadContent(hash);
    } else {
        loadContent('Inicio.html');
    }
});

fetch('Inicio.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('content').innerHTML = html;
    // Si el script ya está cargado, llamar a la función init
    if (typeof initCarrusel === 'function') {
      initCarrusel();
    } else {
      // Carga el script 
      const script = document.createElement('script');
      script.src = 'js/carrusel.js';
      script.onload = () => {
        initCarrusel(); 
      }
      document.body.appendChild(script);
    }
  });


