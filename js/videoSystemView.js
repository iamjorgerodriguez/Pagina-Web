class VideoSystemView {
  constructor() {
    this.main = $('main');
    this.categories = $('.categories');
  }

  init() {
    this.main.empty();
    this.main.append(`<div class="categories">
        <div class="row row-cols-1 row-cols-md-3 g-4 m-4">
        <div class="col">
          <div class="card h-100">
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
  };

  /**
   * Enlace de botón de inicio
   * @param {*} handler 
   */

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

  showCategoryMovies(peliculas,categoria) {
    this.main.empty();
    this.main.append(`<h1 name="">${categoria.toUpperCase()}</h1><hr><div id="carouselExampleControls" class="carousel slide" data-ride="carousel"><div id="carrusel-slider" class="carousel-inner"></div></div>`);
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

  showMoviesCharacteristics(pelicula){
    this.main.empty();
    this.main.append(`<div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${pelicula.image}" class="img-fluid rounded-start" alt="${pelicula.title}">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${pelicula.title}</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>`)
  };
}

export default VideoSystemView;