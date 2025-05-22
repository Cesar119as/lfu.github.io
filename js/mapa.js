function inicializarMapa() {
  const mapDiv = document.getElementById('map');
  if (!mapDiv) {
    console.error("No se encontró el div con id 'map' para inicializar el mapa.");
    return;
  }

  const lat = 19.4826;
  const lng = -99.1269;
  const zoom = 15;

  const map = L.map('map').setView([lat, lng], zoom);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([lat, lng]).addTo(map)
    .bindPopup('Universidad Autónoma Metropolitana - Azcapotzalco')
    .openPopup();
}

function esperarMapaYInicializar() {
  const mapDiv = document.getElementById('map');
  if (mapDiv) {
    inicializarMapa();
  } else {
    // Revisar cada 100 ms hasta que el div exista
    setTimeout(esperarMapaYInicializar, 100);
  }
}

// Iniciar espera después de que el script se cargue
esperarMapaYInicializar();
