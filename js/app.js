//asignar las variables
const resultado = document.querySelector("#resultado");

//variables del formulario
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

//variables para los select
let max = new Date().getFullYear();
let min = 2013;

const datosBusqueda = {
  marca: "",
  year: "",
  color: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
};

//eventos del formulario

marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;
  filtrar();
});

year.addEventListener("change", (e) => {
  datosBusqueda.year = Number(e.target.value);
  filtrar();
});

color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;
  filtrar();
});

minimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = Number(e.target.value);
  filtrar();
});

maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = Number(e.target.value);
  filtrar();
});

puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = e.target.value;
  filtrar();
});

transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;
  filtrar();
});

//cargar todo al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
  getCars(autos);

  //lenar el select
  llenarSelect();
});

//funciones

function getCars(autos) {
  limpiarHtml();
  autos.forEach((coche) => {
    const { marca, modelo, year, color, precio, puertas, transmision } = coche;
    const carro = document.createElement("P");
    carro.textContent = `
        ${marca} ${modelo} - ${year} ${color} - ${precio}  € - ${puertas} puertas - ${transmision}
       `;
    resultado.appendChild(carro);
  });
}

function llenarSelect() {
  for (let i = max; i >= min; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    year.appendChild(option);
  }
}

function filtrar() {
  const resultadoFiltrado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarColor)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision);
    
    if(resultadoFiltrado.length){
        getCars(resultadoFiltrado);
    }else{
        noResultado()
    }


}

function noResultado() {
    limpiarHtml();
    const noResult = document.createElement("DIV");
    noResult.classList.add("alerta", "error");
    noResult.textContent = "No hay resultados";

    resultado.appendChild(noResult);

}

function limpiarHtml() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

//funciones filtradoras

function filtrarMarca(autos) {
  const { marca } = datosBusqueda;
  if (marca) {
    return autos.marca === marca;
  }

  return autos;
}

function filtrarYear(autos) {
  const { year } = datosBusqueda;
  if (year) {
    return autos.year === year;
  }

  return autos;
}

function filtrarColor(autos) {
  const { color } = datosBusqueda;
  if (color) {
    return autos.color === color;
  }

  return autos;
}

function filtrarMinimo(autos) {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return autos.precio >= minimo;
  }

  return autos;
}

function filtrarMaximo(autos) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return autos.precio <= maximo;
  }

  return autos;
}

function filtrarPuertas(autos) {
  const { puertas } = datosBusqueda;
  if (puertas) {
    return autos.puertas === puertas;
  }

  return autos;
}

function filtrarTransmision(autos) {
    const { transmision } = datosBusqueda;
  if (transmision) {
    return autos.transmision === transmision;
  }

  return autos;
}
