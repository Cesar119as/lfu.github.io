// Cargar encabezado
fetch('Cabecera.html')
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML('afterbegin', data);
        setupMenu();
        setupLinks();
    })
    .catch(error => console.error('Error al cargar el encabezado:', error));

// Cargar pie de página
fetch('Pie.html')
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML('beforeend', data);
    })
    .catch(error => console.error('Error al cargar el pie de página:', error));
