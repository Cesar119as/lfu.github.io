let map; 

function inicializarMapa() {
    if (map) {
        map.remove(); 
    }

    map = L.map('map').setView([19.504210233596563, -99.1879535663178], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
    }).addTo(map);

    L.marker([19.504210233596563, -99.1879535663178]).addTo(map)
        .bindPopup('LABORATORIO FORMA URBANA')
        .openPopup();

    setTimeout(() => {
        map.invalidateSize();
    }, 100);
}
