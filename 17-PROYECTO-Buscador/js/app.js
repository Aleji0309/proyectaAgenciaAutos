// Variables
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");
const resultado = document.querySelector("#resultado");

// Contenedor para los resultados
const max = new Date().getFullYear();
const min = max - 10;

// Generar un objeto con la busqueda
const datosBusqueda = {
  marca: "",
  year: "",
  maximo: "",
  minimo: "",
  puertas: "",
  transmision: "",
  color: "",
};

// Eventos
document.addEventListener("DOMContentLoaded", function () {
  mostrarAutos(autos); // Muestra los autos al cargar

  llenarSelect(); //Llena las opaciones de anios
});

// Event listeners para los selects
marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;
  filtrarAuto();
});

year.addEventListener("change", (e) => {
  datosBusqueda.year = e.target.value;
  filtrarAuto();
});

minimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = e.target.value;
  filtrarAuto();
});

maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = e.target.value;
  filtrarAuto();
});

puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = e.target.value;
  filtrarAuto();
});

transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;
  filtrarAuto();
});

color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;
  filtrarAuto();
});

// Funciones

// *** FUNCION PARA MOSTRAR LOS AUTOS ***//
function mostrarAutos(autos) {
  // Limpia el HTML
  limpiarHTML();

  // Reccorrer las propiedad del objeto auto
  autos.forEach((auto) => {
    //Aplicar destructing de objetos para ahorrar codigo
    const { marca, modelo, year, precio, puertas, color, transmision } = auto;
    const autoHTML = document.createElement("P");

    autoHTML.textContent = `
            ${marca}
            ${modelo} -
            ${year} -
            Precio: ${precio} - 
            Puertas:${puertas}
            Color: ${color}
            Transmisión: ${transmision}
        
        `;

    // Insertar  en HTML para
    resultado.appendChild(autoHTML);
  });
}

// *** FUNCIÓN QUE LIMPIA EL HTML *** //
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

// *** FUNCIÓN PARA LLENAR LOS ANIOS DEL SELECT ***//
function llenarSelect() {
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement("option");
    opcion.textContent = i;
    year.appendChild(opcion); // Agrega las opciones de anio al select
  }
}

// *** FUNCIÓN QUE FILTRA EN BASE  A LA BÚSQUEDA ***///
function filtrarAuto() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);
  // Función de alto nivel, toma otra función como parámetro

  if (resultado.length) {
    //console.log(resultado);
    mostrarAutos(resultado);
  } else {
    noResultado();
  }
}
  function noResultado(){
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados';
    resultado.appendChild(noResultado);
  
}

// *** FUNCIÓN QUE FILTRA POR MARCA ***//
function filtrarMarca(auto) {
  const { marca } = datosBusqueda;
  if (marca) {
    // Si el objeto tiene algún valor en marca
    return auto.marca === marca;
  }

  return auto;
}

// *** FUNCIÓN QUE FILTRA POR ANIO ***//
function filtrarYear(auto) {
  const { year } = datosBusqueda;

  if (year) {
    return auto.year === parseInt(year);
  }
  return auto;
}

// *** FUNCIÓN QUE FILTRA POR PRECIO MINIMIO *** //
function filtrarMinimo(auto) {
  const { minimo } = datosBusqueda;

  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto;
}

// *** FUNCIÓN QUE FILTRA POR PRECIO MÁXIMO *** //
function filtrarMaximo(auto) {
  const { maximo } = datosBusqueda;

  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto;
}

// *** FUNCIÓN QUE FILTRA POR PUERTAS *** //
function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda;

  if (puertas) {
    return auto.puertas === parseInt(puertas);
  }

  return auto;
}

// *** FUNCIÓN QUE FILTRA POR PUERTAS *** //
function filtrarTransmision(auto) {
  const { transmision } = datosBusqueda;

  if (transmision) {
    return auto.transmision === transmision;
  }

  return auto;
}

// *** FUNCIÓN QUE FILTRA POR COLOR *** //
function filtrarColor(auto) {
  const { color } = datosBusqueda;

  if (color) {
    return auto.color === color;
  }

  return auto;
}
