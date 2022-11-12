// Crear una función q  ue nos permita obtener el API

const getData = (URL) => {
  const data = fetch(URL) //Devielve una promesa.
    //resultado de esta promesa, es otra promesa.
    .then((resp) => {
      const response = resp
        .json() // Esta es la otra promesa que resulta de resolver la promesa del fetch
        .then((resp) => {
          return resp.results;
        });
    })
    .catch((error) => {
      console.log("Problema en la promesa resp.json", error);
      return;
    });
};

const API_URL = "https://rickandmortyapi.com/api/character/";
const CHARACTER_URL = "https://rickandmortyapi.com/api/character/?name=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const h1 = document.querySelector("h1");

// CONSULTA DE API CON LA URL DE LA VARIABLE

const getCharacter = (character) => {
  const peticion = fetch(character);
  peticion
    .then((resp) => resp.json())
    .then((data) => showCharacter(data.results))
    .catch((error) =>
      Swal.fire({
        icon: "warning",
        title: "Ingrese dato correcto",
        text: "Intente de nuevo más tarde",
        confirmButtonText: "Aceptar",
      })
    );
};

getCharacter(API_URL);

//IMPRESIÓN DE RESULTADOS EN PANTALLA CON UN forEach

const showCharacter = (characters) => {
  if (characters.length == 0) {
    Swal.fire({
      icon: "warning",
      title: "Ingrese dato correcto",
      text: "Intente de nuevo más tarde",
      confirmButtonText: "Aceptar",
    });
  } else {
    main.innerHTML = ``;
    characters.forEach((element) => {
      const { id, name, status, species, gender, image } = element;
      const divCharacter = document.createElement("div");
      divCharacter.innerHTML = `
            <div class ="target">
                <div>
                    <img src="${image}"/>
                </div>
                <div id="${id}">
                    <h4>${name}</h4>
                </div>
                <div class ="status">
                    <h5>Estado</h5>
                    <span>${status}</span>
                </div>
                <div class="status2">
                    <h5>Género</h5>
                    <span>${gender} - ${species}</span>
                </div>
            </div>`;
      main.appendChild(divCharacter);
    });
  }
};

//EVENTO Submit PARA BUSCAR
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const term = search.value;
  if (term && term !== "") {
    getCharacter(CHARACTER_URL + term);
    search.value = "";
  } else {
    window.Location.reload();
  }
});

h1.addEventListener(`click`, () => {
  getCharacter(API_URL);
});
