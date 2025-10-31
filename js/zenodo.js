  const registros = [
  {
    titulo: "Mezcla de los usos del suelo del Sistema Urbano Nacional en nivel manzana 2020",
    autores: [
      { nombre: "Rodrigo Tapia-McClung", orcid: true },
      { nombre: "Jorge Montejano", orcid: true },
      { nombre: "Camilo Caudillo", orcid: true },
      { nombre: "Gerardo Ávila", orcid: false },
      { nombre: "Itzia Barrera", orcid: false }
    ],
    descripcion: "Mezcla de uso de suelo del Sistema Urbano Nacional 2020 normalizada y suavizada a 500 m. Tiene valores entre 0 y 1...",
    doi: "10.5281/zenodo.10484320",
    enlace: "https://zenodo.org/records/10484320",
    fecha: "November 22, 2022 (v1.7)",
    tipo: "Dataset",
    acceso: "Open",
    subido: "Uploaded on January 11, 2024",
    vistas: 991,
    descargas: 160,
    versiones: 7
  },
  {
    titulo: "Matriz de accesibilidad a servicios de salud en México 2020",
    autores: [
      { nombre: "Rodrigo Tapia-McClung", orcid: true },
      { nombre: "Jorge Montejano", orcid: true },
      { nombre: "Camilo Caudillo", orcid: true }
    ],
    descripcion: "Este dataset contiene la accesibilidad espacial a los servicios de salud en México para el año 2020, calculada a partir de distancias de viaje y disponibilidad de infraestructura hospitalaria.",
    doi: "10.5281/zenodo.7977956",
    enlace: "https://zenodo.org/records/7977956",
    fecha: "May 25, 2023 (v1.0)",
    tipo: "Dataset",
    acceso: "Open",
    subido: "Uploaded on May 25, 2023",
    vistas: 1200,
    descargas: 300,
    versiones: 1
  }
];

    function mostrarResultados(lista) {
      const contenedor = document.getElementById("results");
      contenedor.innerHTML = "";
      if (lista.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
      }
      lista.forEach(r => {
        const autoresHTML = r.autores.map(a => 
          `${a.nombre}${a.orcid ? '<span class="orcid">🟢 ORCID</span>' : ''}`
        ).join(", ");
        
        const div = document.createElement("div");
        div.classList.add("record");
        div.innerHTML = `
          <div class="badges">
            <span class="badge date">${r.fecha}</span>
            <span class="badge dataset">${r.tipo}</span>
            <span class="badge open">${r.acceso}</span>
          </div>
          <h2><a href="${r.enlace}" target="_blank">${r.titulo}</a></h2>
          <div class="meta">${autoresHTML}</div>
          <div class="description">${r.descripcion}</div>
          <div class="doi"><strong>DOI:</strong> <a href="https://doi.org/${r.doi}" target="_blank">${r.doi}</a></div>
          <div class="meta">${r.subido} | ${r.versiones} more versions exist</div>
          <div class="stats">
            👁️ ${r.vistas} &nbsp;&nbsp; ⬇️ ${r.descargas}
          </div>
        `;
        contenedor.appendChild(div);
      });
    }
    
    function buscar() {
      const texto = document.getElementById("search").value.toLowerCase();
      const filtrados = registros.filter(r =>
        r.titulo.toLowerCase().includes(texto) ||
        r.autores.some(a => a.nombre.toLowerCase().includes(texto)) ||
        r.descripcion.toLowerCase().includes(texto) ||
        r.doi.toLowerCase().includes(texto)
      );
      mostrarResultados(filtrados);
    }

    mostrarResultados(registros);