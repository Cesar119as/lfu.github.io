let map; 

function inicializarMapa() {
    if (map) {
        map.remove(); 
    }

    map = L.map('map').setView([19.504077, -99.188429], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
    }).addTo(map);

    L.marker([19.504077, -99.188429]).addTo(map)
        .bindPopup('Edificio 1P Planta alta')
        .openPopup();

    setTimeout(() => {
        map.invalidateSize();
    }, 100);
}
