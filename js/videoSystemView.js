class VideoSystemView {
  constructor() {
    this.main = $('main');
  }

  //Función que carga el inicio de la página
  init(randomProductions) {
    this.main.empty();
    this.main.append(`<h4>CATEGORÍAS</h4><hr>
    <div class="categories">
        <div class="row row-cols-1 row-cols-md-3 g-4 m-4">
        <div class="col">
          <div class="card h-100 ">
            <img src="img/Categorias/drama.jpg" class="card-img-top " alt="drama-img">
            <div class="card-body text-align">
            <a data-category="Drama" href="#"  class="Categorias"><h5 class="card-title">DRAMA</h5></a>
              <p class="card-text">Responde a una estructura narrativa en la que se presenta un conflicto personal en el protagonista o entre diferentes personajes.</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">Películas Drama</small>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src="img/Categorias/ciencia.jpg" class="card-img-top" alt="ciencia-ficcion-img">
            <div class="card-body">
            <a data-category="Ciencia Ficción" href="#" class="Categorias"><h5 class="card-title">CIENCIA FICCIÓN</h5></a>
              <p class="card-text">Es un género narrativo que sitúa la acción en unas coordenadas espacio-temporales imaginarias y diferentes a las nuestras, y que especula racionalmente sobre posibles avances científicos</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">Películas Ciencia Ficción</small>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src="img/Categorias/thriller.jpg" class="card-img-top" alt="thriller-img">
            <div class="card-body">
            <a data-category="Thriller" href="#" class="Categorias"><h5 class="card-title">THRILLER</h5></a>
              <p class="card-text">Se caracteriza por tener una trama emocionante que mantiene al lector o espectador en constante suspenso, siguiendo con mucha atención el desarrollo de la historia hasta la resolución final del conflicto</p>
            </div>
            <div class="card-footer">
              <small class="text-muted" id="Thriller">Películas Thriller</small>
            </div>
          </div>
        </div>
      </div>
      </div>`);

      this.main.append(`<h4>RECOMENDACIONES</h4><hr><div><div class="row row-cols-1 row-cols-md-3 g-4 m-4" id="random-movies"></div></div>`);
      
      let containerMovies = $("#random-movies");
      //Producciones aleatorias
      for (let i = 0; i < randomProductions.length; i++) {
        containerMovies.append(`<div class="col">
          <div class="card h-100">
            <img src="${randomProductions[i].image}" class="card-img-top " alt="${randomProductions[i].title}">
            <div class="card-body text-align">
              <a data-title="${randomProductions[i].title}" href="#"  class="Peliculas"><h5 class="card-title">${randomProductions[i].title}</h5></a>
              <p class="card-text">${randomProductions[i].synopsis}</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">${randomProductions[i].publication}</small>
            </div>
          </div>
        </div>
      </div>`) 
      }
  };

  //Enlace de botón de inicio
  bindInit(handler) {
    $('#init').click((event) => {
      handler();
    });
  }

  //Enlace del buscador
  bindBuscador(handler) {
    $('#Buscador').click((event) => {
      handler();
    });
  };

  //Enlace de las Categorías
  bindCategorias(handler) {
    let categorias = document.querySelectorAll(".Categorias");

    for (let i = 0; i < categorias.length; i++) {
      categorias[i].addEventListener("click", function () {
        handler(this.getAttribute("data-category"));
      });
    }
  };

  /**
   * Función que mostrará las películas pertenecientes a una categoría
   * @param {*} peliculas = Iterador de películas 
   * @param {*} categoria = Categoría de las películas
   */
  showCategoryMovies(peliculas,categoria) {
    this.main.empty();
    this.main.append(`<h2 class="movie-title">${categoria.toUpperCase()}</h2><hr><div id="carouselExampleControls" class="carousel slide" data-ride="carousel"><div id="carrusel-slider" class="carousel-inner"></div></div>`);
    let container = $('#carrusel-slider');
    let contador = 1;

    for (let pelicula of peliculas) {
      if (contador == 1) {
        container.append(`<div class="carousel-item active">
          <a data-title="${pelicula.title}" href="#pelicula" class="Peliculas"><img class="d-block w-50 m-auto" src="${pelicula.image}" alt="${pelicula.title}"></a>
        </div>`)
        contador++;
      } else {
        container.append(`<div class="carousel-item">
          <a data-title="${pelicula.title}" href="#pelicula" class="Peliculas"><img class="d-block w-50 m-auto" src="${pelicula.image}" alt="${pelicula.title}"></a>
        </div>`)
      }
    }

    container.append(`<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>`)
  };

  //Enlace a las Películas
  bindPeliculas(handler) {
    let peliculas = document.querySelectorAll(".Peliculas");
    for (let i = 0; i < peliculas.length; i++) {
      peliculas[i].addEventListener("click", function () {
        handler(this.getAttribute("data-title"));
      });
    }
  };

  /**
   * Mostrará la ficha de la película seleccionada
   * @param {*} pelicula = Película elegida
   * @param {*} director = Director de la película
   * @param {*} actores []  = Actores de la película
   */
  showMoviesCharacteristics(pelicula, director, actores){
    this.main.empty();
    this.main.append(`<div class="card mb-3" id="card-movie">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${pelicula.image}" class="img-fluid rounded-start" alt="${pelicula.title}">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title"><strong>${pelicula.title}</strong></h5>
          <p class="card-text"><strong>Nacionalidad:</strong> ${pelicula.nationality}</p>
          <p class="card-text"><strong>Fecha Publicación:</strong> ${pelicula.publication}</p>
          <p class="card-text">${pelicula.synopsis}</p>
          <div id="movie-casting">
          <p class="card-text"><strong>Director/a: </strong><a data-category="director" data-name="${director.name}" data-lastname1="${director.lastname1}" data-lastname2="${director.lastname2}" href="#" class="list-group-item list-group-item-action">${director.name} ${director.lastname1} ${director.lastname2}</p></a>
            <p class="card-text"><strong>Reparto: </strong></p>
          </div>
        </div>
      </div>
    </div>
  </div>`);

    let containerCasting = $("#movie-casting");

    for (let i = 0; i < actores.length; i++) {
      containerCasting.append(`<a data-category="actor" data-name="${actores[i].name}" data-lastname1="${actores[i].lastname1}" data-lastname2="${actores[i].lastname2}" href="#" class="list-group-item list-group-item-action">
      <p class="card-text">
      ${actores[i].name} ${actores[i].lastname1} ${actores[i].lastname2}
      </p>
      </a>`);
    };
  };

  //Enlace opciones menú 
  bindMenu(handler) {
    let opcionesMenu = document.querySelectorAll(".nav-item");
    
    for (let i = 0; i < opcionesMenu.length; i++) {
      opcionesMenu[i].addEventListener("click",function (){
        handler(this.getAttribute("data-option"));
      });
    }
  };

  //Mostrará la lista de actores o directores
  showPeopleList(opcion, people){
    this.main.empty();
    this.main.append(`<div class="list-group" id="peopleList"></div>`);

    let container = $("#peopleList");

    for (let person of people) {
      container.append(`<a data-category="${opcion}" data-name="${person.name}" data-lastname1="${person.lastname1}" data-lastname2="${person.lastname2}" href="#" class="list-group-item list-group-item-action">${person.name} ${person.lastname1} ${person.lastname2}</a>`)
    }
  };

  //Enlace de los actores y directores para acceder a su ficha
  bindPeople(handler){
    let people = document.querySelectorAll(".list-group-item");
    
    for (let i = 0; i < people.length; i++) {
      people[i].addEventListener("click",function (){
        handler(this.getAttribute("data-category"),this.getAttribute("data-name"),this.getAttribute("data-lastname1"));
      });
    }
  }

  /**
   * Mostrará la ficha del director
   * @param {*} person = Director o actor seleccionado
   * @param {*} iteratorProductions = Iterador con las producciones del director o actor
   */
  showPeopleCharacteristics(person,iteratorProductions){
    this.main.empty();
    this.main.append(`<div class="card mb-3" id="card-movie">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col-md-4 card-div-left">
        <img src="${person.picture}" class="img-fluid rounded-start card-image-people" alt="${person.name}">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title"><strong>${person.name} ${person.lastname1} ${person.lastname2}</strong></h5>
          <p class="card-text"><strong>Fecha de Nacimiento:</strong> ${person.born}</p>
          <h4 class="card-title text-center">Producciones:</h4><hr>
          <div class="container text-center my-3" id="productions-container">
            <div class="row" id="productionsPerson">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`)

    let containerProductions = $("#productionsPerson");
    //Recorre el iterador y muestra las producciones
    for (let production of iteratorProductions) {
      containerProductions.append(`<div class="col"><div class="card h-100 people-movies">
          <img src="${production.image}" class="card-img-top" alt="${production.title}">
          <div class="card-footer people-movies-footer">
          <a data-title="${production.title}" href="#pelicula" class="Peliculas"><p class="card-text">${production.title}</p></a>
        </div>`)
    }

    containerProductions.append("</div>");
  };
}

export default VideoSystemView;