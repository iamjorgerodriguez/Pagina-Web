import {addProductionValidation ,addCategoryValidation, deassignPersonValidation, assignPersonValidation, addPersonValidation } from "./validations.js";

class VideoSystemView {
  constructor() {
    this.menu = $('#list-menu');
    this.main = $('main');
    //Array con todas las ventanas emergentes
    this.movieWindow = [];
  }

  #executeHandler(handler, handlerArguments, scrollElement, data, url, event) {
    handler(...handlerArguments);
    $(scrollElement).get(0).scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }

  //Función que carga el inicio de la página
  init(categorias, randomProductions) {
    this.main.empty();
    this.main.append(`<h4>CATEGORÍAS</h4><hr>
      <div class="categories">
        <div class="row row-cols-1 row-cols-md-3 g-4 m-4 card-category" id="all-categories">
        </div>
      </div>`);

    let containerCards = $(".card-category");
    //Añado todas las categorías al contenedor
    for (let category of categorias) {
      containerCards.append(`<div class="col">
      <div class="card h-100 ">
        <img src="${category.image}" class="card-img-top " alt="${category.name}-img">
        <div class="card-body text-align">
        <a data-category="${category.name}" href="#"  class="Categorias"><h5 class="card-title">${category.name}</h5></a>
          <p class="card-text">${category.description}</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Películas ${category.name}</small>
        </div>
      </div>
    </div>`);
    }
    
    //Si no existen categorías, relleno el main con una por defecto
    if (document.getElementById("all-categories").children.length < 1) {
      containerCards.append(`<div class="col m-auto">
      <div class="card h-100 ">
        <img src="../img/Peliculas/peliculapordefecto.jpg" class="card-img-top " alt="categoria-por-defecto-img">
        <div class="card-body text-align">
        <h5 class="card-title">Sin Categorías</h5>
          <p class="card-text">No hay categorías en el Video System</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Categoría Por Defecto</small>
        </div>
      </div>
    </div>`);
    }

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

      if (randomProductions.length == 0) {
        //Película que aparecerá en caso de que no hayan producciones
        containerMovies.append(`<div class="col m-auto" id="produccion-por-defecto">
        <div class="card h-100" >
          <img src="../img/Peliculas/peliculapordefecto.jpg" class="card-img-top " alt="produccion-por-defecto">
          <div class="card-body text-align">
            <h5 class="card-title">Sin Películas</h5>
            <p class="card-text">No existen películas en el Video System, se el primero en añadir una producción</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Producción Por Defecto</small>
          </div>
        </div>
        </div>
        </div>`);
      }
      
    
  };

  showCategoryMenu(categorias) {
    //Elimino el menú para que no se duplique al actualizarse
    document.getElementById("delete-dropdown").remove();
    this.menu.append(`<li data-option="categories" class="nav-item dropdown" id="delete-dropdown">
    <a class="nav-link dropdown-toggle text-light" href="#" role="button"
        data-bs-toggle="dropdown" aria-expanded="true">
        Categorías
    </a>
    <ul class="dropdown-menu dropdown-categories" id="dropdown-categories" href="#">
    </ul>
    </li>`);

    let container = $("#dropdown-categories");
    //Cargo las categorías al menú
    for (let categoria of categorias) {
      container.append(`<li>
        <a data-category="${categoria.name}" class="dropdown-item Categorias" href="#">
          ${categoria.name}
        </a>
      </li>`);
    }
    //Compruebo si existe alguna categoría en el menú
    if (document.getElementById("dropdown-categories").children.length < 1) {
      container.append(`<li>
      &nbsp;&nbsp;Sin categorías
      </li>`);
    }
  }

  //Enlace de botón de inicio
  bindInit(handler) {
    $('#init').click((event) => {
      this.#executeHandler(handler, [], "body", { action: 'init' }, '#', event);
    });
  }

  //Enlace de las Categorías
  bindCategorias(handler) {
    let categorias = document.querySelectorAll(".Categorias");
    //Guardo la funcion en una variable porque dentro del EventListener pierde el contexto de this
    let execute = this.#executeHandler;

    for (let i = 0; i < categorias.length; i++) {
      categorias[i].addEventListener("click", function (event) {
        execute(handler, [this.getAttribute("data-category")], "body"
          , { action: 'showCategoryMovies', category: this.getAttribute("data-category") }
          , '#' + this.getAttribute("data-category") + 'Movies', event);
      });
    }
  };

  //Enlace nueva ventana
  bindNewWindow(handler) {
    $('#newwindow').click((event) => {
      this.movieWindow.push(window.open("pelicula.html", $('#newwindow').data("title"), "width=800, height=550, top=100, left=350, titlebar=yes, toolbar=no, menubar=no, location=no"));

      for (let i = 0; i < this.movieWindow.length; i++) {
        this.movieWindow[i].addEventListener('DOMContentLoaded', () => {
          handler($('#newwindow').data("title"));
        });
      }
    });
  }

  /**
   * Función que mostrará las películas pertenecientes a una categoría
   * @param {*} peliculas = Iterador de películas 
   * @param {*} categoria = Categoría de las películas
   */
  showCategoryMovies(peliculas, categoria) {
    this.main.empty();
    this.main.append(`<h2 class="movie-title">${categoria.toUpperCase()}</h2><hr><div id="carouselExampleControls" class="carousel slide" data-ride="carousel"><div id="carrusel-slider" class="carousel-inner"></div></div>`);
    let container = $('#carrusel-slider');
    let contador = 1;

    for (let pelicula of peliculas) {
      if (contador > 1) {
        container.append(`<div class="carousel-item">
          <a data-title="${pelicula.title}" href="#" class="Peliculas"><img class="d-block w-50 m-auto" src="${pelicula.image}" alt="${pelicula.title}"></a>
        </div>`)
      }
      if (contador == 1) {
        container.append(`<div class="carousel-item active">
          <a data-title="${pelicula.title}" href="#" class="Peliculas"><img class="d-block w-50 m-auto" src="${pelicula.image}" alt="${pelicula.title}"></a>
        </div>`)
        contador++;
      }
    }

    //Si no existen películas para la categoría
    if ($(".carousel-item").length == 0) {
      container.append(`<div class="carousel-item active">
      <h5>NO SE HAN ENCONTRADO PRODUCCIONES PARA LA CATEGORÍA ELEGIDA</h5>
    </div>`);
    } else {
      container.append(`<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>`)
    }
  };

  //Enlace a las Películas
  bindPeliculas(handler) {
    let peliculas = document.querySelectorAll(".Peliculas");
    let execute = this.#executeHandler;

    for (let i = 0; i < peliculas.length; i++) {
      peliculas[i].addEventListener("click", function (event) {
        execute(handler, [this.getAttribute("data-title")], "body", { action: 'showMovieCharacteristics', movie: this.getAttribute("data-title") }, '#' + this.getAttribute("data-title"), event);
      });
    }
  };

  /**
   * Mostrará la ficha de la película seleccionada
   * @param {*} pelicula = Película elegida
   * @param {*} director = Director de la película
   * @param {*} actores []  = Actores de la película
   */
  showMoviesCharacteristics(production, directors, actores) {
    this.main.empty();
    this.main.append(`<div class="card mb-3" id="card-movie">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${production.image}" id="image-movie" class="img-fluid rounded-start" alt="${production.title}">
      </div>
      <div class="col-md-8">
        <div class="card-body" id="cuerpo-carta">
          <h5 class="card-title" id="titulo"><strong>${production.title}</strong></h5>
          <p class="card-text"><strong>Nacionalidad:</strong> ${production.nationality}</p>
          <p class="card-text"><strong>Fecha Publicación:</strong> ${production.publication}</p>
          <p class="card-text"><strong>Sinopsis:</strong><br>${production.synopsis}</p>
          <button data-title="${production.title}" type="button" class="btn btn-primary" id="newwindow">Información</button>
        </div>
      </div>
    </div>
    </div>`);
    
    //Compruebo si es una serie o una pelicula
    if (production.seasons != null) {
      $("#cuerpo-carta").append(`<p class="card-text"><strong>Temporadas:</strong> ${production.seasons}</p>`);
    }

    $("#cuerpo-carta").append(`<div id="production-casting"></div>`);

    let containerCasting = $("#production-casting");

    //Compruebo si existe un director asignado a la producción
    if (directors.length == 0) {
      containerCasting.prepend(`<p class="card-text"><strong>Director/a: </strong>
      <a href="#" class="list-group-item list-group-item-action">No hay director asignado a la producción</p></a>`)
    } else {
      containerCasting.prepend(`<p class="card-text"><strong>Director/a: </strong></p>`);
      for (let i = 0; i < directors.length; i++) {
        containerCasting.append(`<a data-category="director" data-name="${directors[i].name}" data-lastname1="${directors[i].lastname1}" data-lastname2="${directors[i].lastname2}" href="#" class="list-group-item list-group-item-action person-selected">
        ${directors[i].name} ${directors[i].lastname1} ${directors[i].lastname2}
        </a>`)
      }
    }

    if (actores.length != 0) {
      containerCasting.append(`<p class="card-text"><strong>Reparto: </strong></p>`);
      for (let i = 0; i < actores.length; i++) {
        containerCasting.append(`<a data-category="actor" data-name="${actores[i].name}" data-lastname1="${actores[i].lastname1}" data-lastname2="${actores[i].lastname2}" href="#" class="list-group-item list-group-item-action person-selected">
        <p class="card-text">
        ${actores[i].name} ${actores[i].lastname1} ${actores[i].lastname2}
        </p>
        </a>`);
      };
    } else {
      containerCasting.append(`<p class="card-text"><strong>Reparto: </strong></p><a href="#" class="list-group-item list-group-item-action">
        <p class="card-text">No hay actores asignados a la producción</p>
        </a>`);
    }
  };

  //Enlace opciones menú 
  bindMenu(handler) {
    let opcionesMenu = document.querySelectorAll(".nav-menu");
    let execute = this.#executeHandler;

    for (let i = 0; i < opcionesMenu.length; i++) {
      opcionesMenu[i].addEventListener("click", function (event) {
        execute(handler, [this.getAttribute("data-option")], "body", { action: 'menuOptions', option: this.getAttribute("data-option") }, '#' + this.getAttribute("data-option"), event);
      });
    }
  };

  //Mostrará la lista de actores o directores
  showPeopleList(opcion, people) {
    this.main.empty();
    this.main.append(`<div class="list-group" id="peopleList"></div>`);

    let container = $("#peopleList");

    for (let person of people) {
      container.append(`<a data-category="${opcion}" data-name="${person.name}" data-lastname1="${person.lastname1}" data-lastname2="${person.lastname2}" href="#" class="list-group-item list-group-item-action person-selected">${person.name} ${person.lastname1} ${person.lastname2}</a>`)
    }

    if (document.getElementById("peopleList").children.length < 1) {
      container.append(`<a href="#" class="list-group-item list-group-item-action text-center"><strong>AÚN NO EXISTEN ${opcion.toUpperCase()}ES AÑADIDOS</strong></a>`);
    }
  };

  //Enlace de los actores y directores para acceder a su ficha
  bindPeople(handler) {
    let people = document.querySelectorAll(".person-selected");
    let execute = this.#executeHandler;

    for (let i = 0; i < people.length; i++) {
      people[i].addEventListener("click", function (event) {
        execute(handler, [this.getAttribute("data-category"), this.getAttribute("data-name"), this.getAttribute("data-lastname1")]
          , "body", {
            action: 'showPersonCharacteristics', person: {
              category: this.getAttribute("data-category"),
              name: this.getAttribute("data-name"),
              lastname1: this.getAttribute("data-lastname1")
            }
        }
          , '#' + this.getAttribute("data-name") + this.getAttribute("data-lastname1")
          , event);
      });
    }
  }

  /**
   * Mostrará la ficha del director
   * @param {*} person = Director o actor seleccionado
   * @param {*} iteratorProductions = Iterador con las producciones del director o actor
   */
  showPeopleCharacteristics(person, iteratorProductions) {
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
          <a data-title="${production.title}" href="#" class="Peliculas"><p class="card-text">${production.title}</p></a>
        </div>`)
    }

    containerProductions.append("</div>");
  };

  //Rellanará el HTML de las páginas emergentes
  newWindow(production) {
    //Cojo el main y el header de la última página instanciada
    let main = $(this.movieWindow[this.movieWindow.length - 1].document).find('main');
    let header = $(this.movieWindow[this.movieWindow.length - 1].document).find('header > div');

    header.append(`<h1 id="new-window-title">${production.title.toUpperCase()}</h1>`);
    main.append(`<div class="container h-50 text-justify" id="cuerpoventana">
      <img src="${production.image}" alt="${production.title}" class="mx-auto d-block new-window-img">
      <h5><strong>Nacionalidad: </strong>${production.nationality}</h5>
      <h5><strong>Fecha de Publicación: </strong>${production.publication}</h5>
      <h5><strong>Sinopsis: </strong><br>${production.synopsis}</h5>
    </div>`);

    //Si es una serie le añado las temporadas
    if (production.seasons != undefined) {
      main.find("div").append(`<h5><strong>Temporadas: </strong>${production.seasons}</h5>`);
    }
  }

  //Cerrará todas las ventanas emergentes
  closeWindows() {
    if (this.movieWindow.length != 0) {
      for (let i = 0; i < this.movieWindow.length; i++) {
        this.movieWindow[i].close();
      }
      //Elimino las ventanas del array
      this.movieWindow.length = 0;
    }
  }

  /**
   * FORMULARIOS
   */
  bindForm(handler) {
    let opcionesForm = document.querySelectorAll(".dropdown-form");
    let execute = this.#executeHandler;

    for (let i = 0; i < opcionesForm.length; i++) {
      opcionesForm[i].addEventListener("click", function (event) {
        execute(handler, [this.getAttribute("data-option-form")],
                "body",{
                        action: 'showFormOption', option: this.getAttribute("data-option-form")
                }, '#'+this.getAttribute("data-option-form"), event);
      });
    }
  }

  showAddProductionForm(directors, actors, categories) {
    this.main.empty();
    this.main.append(`<form class="row g-3 w-50 my-5" id="forms-register" name="fAddProduction" novalidate>
    <div class="col-md-6">
      <label for="inputTitle" class="form-label">Título</label>
      <div class="input-group">
        <span class="input-group-text" ><i class="fa-solid fa-signature"></i></span>
        <input type="text" class="form-control" id="fTitle" minlength="2" required>
        <div class="invalid-feedback">Rellene este campo</div>
  			<div class="valid-feedback">Correcto</div>
      </div>
    </div>
    <div class="col-md-6">
      <label for="inputNationality" class="form-label">Nacionalidad</label>
      <div class="input-group">
        <span class="input-group-text" ><i class="fa-solid fa-flag"></i></span>
        <input type="text" class="form-control" id="fNationality" required>
        <div class="invalid-feedback">Rellene este campo. <br>El país debe contener al menos 4 letras</div>
			  <div class="valid-feedback">Correcto</div>
      </div>
    </div>
    <div class="col-md-6">
      <label for="inputPublication" class="form-label">Publicación</label>
      <div class="input-group">
        <span class="input-group-text" ><i class="fa-solid fa-calendar-days"></i></span>
        <input type="date" class="form-control" id="fPublication" required>
        <div class="invalid-feedback">Rellene este campo</div>
			  <div class="valid-feedback">Correcto</div>
      </div>
    </div>
    <div class="col-md-6">
      <label for="basic-url" class="form-label">URL Imagen Película</label>
      <div class="input-group">
        <span class="input-group-text" ><i class="fas fa-link"></i></span>
        <input type="url" class="form-control" id="fImage" aria-describedby="basic-addon3" required>
        <div class="invalid-feedback">La URL no es válida</div>
			  <div class="valid-feedback">Correcto</div>
      </div>
    </div>
    <div class="col-md-12 my-2">
      <label for="inputSynopsis" class="form-label">Sinopsis</label>
      <div class="input-group">
        <span class="input-group-text" ><i class="fa-solid fa-signature"></i></span>
        <input type="text" class="form-control" id="fSynopsis" required minlength="10">
        <div class="invalid-feedback">Rellene este campo. <br>La sinopsis debe tener al menos 10 caracteres</div>
			  <div class="valid-feedback">Correcto</div>
      </div>
    </div>
    <div class="col-md-12">
      <div class="input-group">
        <select aria-label=".form-select-lg example" id="fDirector" class="form-select form-select-lg select-add-production" name="fDirector" required>
          <option value="disabled" disabled selected>Selecciona un director</option>
        </select>
        <div class="invalid-feedback">Rellene este campo</div>
			  <div class="valid-feedback">Correcto</div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="input-group">
        <select class="form-select form-select-lg select-add-production" aria-label=".form-select-lg example" id="fActor" name="fActor" requiered>
          <option value="disabled" disabled selected>Selecciona un actor</option>
        </select>
        <div class="invalid-feedback">Selecciona un actor</div>
			  <div class="valid-feedback">Correcto</div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="input-group">
        <select class="form-select form-select-lg select-add-production" aria-label=".form-select-lg example" id="fActor2" name="fActor2">
          <option value="disabled" disabled selected>Selecciona un segundo actor (Opcional)</option>
        </select>
        <div class="invalid-feedback">Los actores no pueden ser los mismos</div>
      </div>
    </div>
    <div class="col-md-6 ">
      <div class="input-group">
        <select aria-label=".form-select-lg example" id="fCategory" class="form-select form-select-lg mt-2 select-add-production" name="fCategory" required>
          <option value="disabled" disabled selected>Selecciona una categoría</option>
        </select>
        <div class="invalid-feedback">Selecciona una de las categorías</div>
        <div class="valid-feedback">Correcto</div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="input-group">
        <select aria-label=".form-select-lg example" id="fCategory2" class="form-select form-select-lg mt-2 select-add-production" name="fCategory2">
          <option value="disabled" disabled selected>Selecciona una categoría (Opcional)</option>
        </select>
        <div class="invalid-feedback">Las categorías no pueden ser las mismas</div>
      </div>
    </div>
    <div class="col-md-6">
      <div id="person-kind">
        <label for="kind" class="form-label my-2">Elige una de las opciones:</label>
        <div class ="input-group">
          <input type="radio" value="Movie" name="fCheck" class="mr-1 fCheck">Película
          <input type="radio" value="Serie" name="fCheck" class="ml-3 mr-1 fCheck">Serie
          <div class="valid-feedback">Correcto</div>
          <div class="invalid-feedback">Tienes que seleccionar una de las opciones</div>
        </div>  
      </div>
    </div>
    <div class="col-md-6 my-2" id="seasons-hide">
      <label for="inputSeasons" class="form-label">Temporadas</label>
      <div class="input-group">
        <span class="input-group-text" ><i class="fa-solid fa-signature"></i></span>
        <input type="number" class="form-control" id="fSeasons" name="fSeasons" minlength="1" required>
        <div class="invalid-feedback">Rellene este campo. <br>Solo valen números a partir de 0</div>
        <div class="valid-feedback">Correcto</div>
      </div>
    </div>
    <div class="col-md-7">
      <button type="submit" id="btnAddProd" class="btn btn-primary" name="fSubmit">Añadir producción</button>
      <div class="invalid-feedback">La producción ya existe</div>
    </div>
    <div class="col-md-2">
      <input class="btn btn-danger" id="btnAddProdReset" type="reset" value="Borrar">
    </div>
  </form>`);

    //Escondo el input de temporadas hasta que se seleccione Serie
    $("#seasons-hide").hide();

    //Añado directores al select
    let contador = 0;

    for (let director of directors) {
      $("#fDirector").append(`<option value=${contador++}>
        ${director.name + " " + director.lastname1 + " " + director.lastname2}
      </option>`);
    }

    contador = 0;

    //Añado actores al primer select
    for (let actor of actors) {
      $("#fActor").append(`<option value=${contador++}>
        ${actor.name + " " + actor.lastname1 + " " + actor.lastname2}
      </option>`);
    }

    contador = 0;

    //Añado actores al segundo select
    for (let actor of actors) {
      $("#fActor2").append(`<option value=${contador++}>
        ${actor.name + " " + actor.lastname1 + " " + actor.lastname2}
      </option>`);
    }

    contador = 0;

    //Añado las categorias al primer select
    for (let category of categories) {
      $("#fCategory").append(`<option value=${contador++}>
        ${category.name}
      </option>`)
    }

    contador = 0;

    //Añado las categorias al primer select
    for (let category of categories) {
      $("#fCategory2").append(`<option value=${contador++}>
        ${category.name}
      </option>`)
    }

  };

  bindAddProduction(handler, handler2) {
    //Valido el formulario
    addProductionValidation(handler, handler2);

    let checks = document.querySelectorAll(".fCheck");
    //Mostrará las temporadas cuando clicke en el radio-button de Serie
    for (let i = 0; i < checks.length; i++) {
      checks[i].addEventListener("change", function () {
        if (checks[i].value == "Serie") {
          $("#seasons-hide").show();
        }else{
          $("#seasons-hide").hide();
        }
      })
    }
  };

  //Funciones para eliminar produccionees
  showDelProductionForm(productions) {
    this.main.empty();
    this.main.append(`<div class="list-group" id="productionsList"></div>`);

    let containerList = $("#productionsList");

    for (let production of productions) {
      containerList.append(`<a href="#" class="list-group-item list-group-item-action">
        ${production.title}
        <button type="button" class="btn btn-danger float-right button-delete" data-title="${production.title}">Eliminar Producción</button>
      </a>`);
    }
  }

  bindDeleteProduction(handler) {
    let botones = document.querySelectorAll(".button-delete");

    for (let i = 0; i < botones.length; i++) {
      botones[i].addEventListener("click", function () {
        handler(botones[i].getAttribute("data-title"));
      })
    }
  }

  //Aparecerá al eliminar o añadir una producción
  modalAddDeleteProduction(produccion, texto) {
    this.main.append(`<div class="modal" tabindex="-1">
    <div class="modal-dialog my-5">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title">Producción ${texto} con éxito</h5>
        </div>
        <div class="modal-body">
          <p>La producción <strong>${produccion.title}</strong> ha sido ${texto}</strong></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
    </div>`);

    $(".modal").show();
    $(".modal").find("button").click(function (event) {
      $('.modal').remove();
    });
  }

  //Funciones para asignar producciones a objetos Person
  showAssignDeassignProductionsChecks(texto) {
    this.main.empty();
    this.main.append(`<div class="form-checkboxes">
    <h4>ELIGE UNA DE LAS OPCIONES</h4>
    <div class="form-check form-check-inline">
      <input class="form-check-input select-person-list" type="checkbox" id="inlineCheckbox1" value="actor">
      <label class="form-check-label" for="inlineCheckbox1">${texto} Actor</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input select-person-list" type="checkbox" id="inlineCheckbox2" value="director">
      <label class="form-check-label" for="inlineCheckbox2">${texto} Director</label>
    </div>
    </div>`);
  }

  bindSelectedPerson(handler) {
    let checks = document.querySelectorAll(".select-person-list");

    for (let i = 0; i < checks.length; i++) {
      checks[i].addEventListener("change", function () {
        handler(checks[i].value);
      })
    }
  }

  showAssignProductionsForm(listPeople, producciones, opcion) {
    this.main.empty();
    this.main.append(`<form class="row g-3 w-50" id="form-assign-production" name="fAssignProduction" novalidate>
    <div class="col-12">
      <h4 class="my-5">ASIGNAR PRODUCCIÓN A ${opcion.toUpperCase()}</h4>
    </div>
    <div class="col-md-6">
      <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" id="select-people" name="fSelPerson" requiered>
        <option value="disabled" selected disabled >Selecciona una persona</option>
      </select>
      <div class="invalid-feedback">La persona elegida no es válida</div>
			<div class="valid-feedback">Correcto</div>
    </div>
    <div class="col-md-6">
      <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" id="select-production" name="fSelProduction" requiered>
        <option value="disabled" selected disabled>Selecciona una producción</option>
      </select>
      <div class="invalid-feedback">La producción elegida no es válida</div>
			<div class="valid-feedback">Correcto</div>
    </div>
    <div class="col-12">
      <button type="submit" class="btn btn-primary" data-option="${opcion}" id="submit-assign" name="fSubmitt">Asignar Producción</button>
      <div class="invalid-feedback">La persona elegida ya tiene asignada la película</div>
    </div>
  </form>`)

    //Relleno el select con la lista que puede ser directores o actores
    for (let person of listPeople) {
      $("#select-people").append(`<option value="${person.name} ${person.lastname1} ${person.lastname2}">
        ${person.name} ${person.lastname1} ${person.lastname2}
      </option>`)
    }
    //Relleno el select con las producciones
    for (let production of producciones) {
      $("#select-production").append(`<option value="${production.title}">
        ${production.title}
      </option>`)
    }
  }

  bindAssignProductionPerson(handler, handler2) {
    assignPersonValidation(handler, handler2);
  }

  //DESASIGNAR ACTORES CON PRODUCCIÓN
  showDeassignProductionsForm(listPeople, producciones, opcion) {
    this.main.empty();
    this.main.append(`<form class="row g-3 w-50" id="form-assign-production" name="fDeassignProduction" novalidate>
    <div class="col-12">
      <h4 class="my-5">DESASIGNAR PRODUCCIÓN A ${opcion.toUpperCase()}</h4>
    </div>
    <div class="col-md-6">
      <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" id="select-people" name="fSelPerson" requiered>
        <option selected disabled>Selecciona una persona</option>
      </select>
    </div>
    <div class="col-md-6">
      <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" id="select-production" name="fSelProduction" requiered>
        <option selected disabled>Selecciona una producción</option>
      </select>
      <div class="invalid-feedback">La producción elegida no es válida</div>
			<div class="valid-feedback">Correcto</div>
    </div>
    <div class="col-12">
      <button type="submit" class="btn btn-primary" data-option="${opcion}" id="submit-deassign">Desasignar Producción</button>
    </div>
  </form>`);

    $("#select-production").hide();
    $("#submit-deassign").hide();

    //Relleno el select con la lista que puede ser directores o actores
    for (let person of listPeople) {
      $("#select-people").append(`<option>
        ${person.name} ${person.lastname1} ${person.lastname2}
      </option>`)
    }
  }

  bindDeassignProductionPersonSelect(handler) {
    let personList = document.getElementById("select-people")
    //Opción elegida. Puede ser un actor o un director
    let opcion = document.getElementById("submit-deassign").getAttribute(("data-option"));

    personList.addEventListener("change", function () {
      let nombreCompleto = this.value.split(" ");
      let person = {
        name: nombreCompleto[0],
        lastname1: nombreCompleto[1]
      };

      handler(person, opcion);
    })
  }

  //Mostrará el select de las películas para la persona seleccionada
  showProductionsSelect(productions) {
    let prodSelect = $("#select-production");
    prodSelect.empty();

    prodSelect.append(`<option value="disabled" selected disabled>Selecciona una producción</option>`);

    for (let produccion of productions) {
      prodSelect.append(`<option value="${produccion.title}">${produccion.title}</option>`);
    }

    $("#select-production").show();
    $("#submit-deassign").show();
  }

  //Desasigna una producción al hacer el submit
  bindDeassignProduction(handler) {
    deassignPersonValidation(handler);
  }

  //Modal que aparecerá al asignar o desasignar una producción
  modalAssignDeassignProduction(produccion, person, texto) {
    this.main.append(`<div class="modal" tabindex="-1">
    <div class="modal-dialog my-5">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title">Producción ${texto} con éxito</h5>
        </div>
        <div class="modal-body">
          <p>La producción <strong>${produccion.title}</strong> ha sido ${texto} a <strong>${person.name} ${person.lastname1} ${person.lastname2}</strong></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
    </div>`);

    $(".modal").show();
    $(".modal").find("button").click(function (event) {
      $('.modal').remove();
    });
  }

  //Funciones para añadir categorías
  showAddCategoryForm() {
    this.main.empty();
    this.main.append(`<form class="row g-3 w-50 my-5" id="forms-register" name="fAddCategory" novalidate>
    <div class="col-md-6">
      <label for="name" class="form-label">Nombre</label>
      <div class="input-group">
        <span class="input-group-text" ><i class="fa-solid fa-signature"></i></span>
        <input type="text" class="form-control" id="fName" minlength="3" aria-describedby="basic-addon3" name="fName" required>
        <div class="valid-feedback">Correcto</div>
        <div class="invalid-feedback">El nombre no es válido. Tiene que tener un mínimo de 3 caracteres</div>
      </div>
    </div>
    <div class="col-md-6">
      <label for="basic-url" class="form-label">URL Imagen Categoría</label>
      <div class="input-group">
        <span class="input-group-text" ><i class="fas fa-link"></i></span>
        <input type="url" class="form-control" id="fImage" aria-describedby="basic-addon3" name="fURL" required>
        <div class="valid-feedback">URL válida</div>
        <div class="invalid-feedback">La URL no es válida.</div>
      </div>
    </div>
    <div class="col-12">
      <label for="inputSynopsis" class="form-label">Descripción: </label>
      <input type="text" class="form-control" minlength="10" id="fDescription" name="fDescription" required>
      <div class="valid-feedback">Descripción válida</div>
      <div class="invalid-feedback">Descripción no válida. Tiene que tener al menos 10 caracteres</div>
    </div>
    <div class="col-md-2">
      <button type="submit" class="btn btn-primary" name="fSubmitt">Añadir</button>
      <div class="invalid-feedback">La categoría ya existe</div>
    </div>
    <div class="col-md-2">
      <input class="btn btn-danger" type="reset" value="Borrar">
    </div>
    </form>`);
  }

  bindAddCategory(handler, handler2) {
    addCategoryValidation(handler, handler2);
  }


  //Funciones para eliminar categorías
  showDeleteCategory(categories) {
    this.main.empty();
    this.main.append(`<div class="list-group" id="categoriesList"></div>`);

    let containerList = $("#categoriesList");

    for (let categoria of categories) {
      containerList.append(`<a href="#" class="list-group-item list-group-item-action">
        ${categoria.name}
        <button type="button" class="btn btn-danger float-right button-delete" data-name="${categoria.name}">Eliminar Categoría</button>
      </a>`);
    }
  }


  bindDeleteCategory(handler) {
    let botones = document.querySelectorAll(".button-delete");

    for (let i = 0; i < botones.length; i++) {
      botones[i].addEventListener("click", function () {
        handler(botones[i].getAttribute("data-name"));
      })
    }
  }

  //Modal que aparecerá al añadir o eliminar una categoría
  modalAddDeleteCategory(categoria, texto) {
    this.main.append(`<div class="modal" tabindex="-1">
    <div class="modal-dialog my-5">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title">Categoría ${texto} con éxito</h5>
        </div>
        <div class="modal-body">
          <p>La categoría <strong>${categoria.name}</strong> ha sido ${texto} en el VideoSystem</strong></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
    </div>`);

    $(".modal").show();
    //Cuando se pulse en el botón se cerrará el modal
    $(".modal").find("button").click(function (event) {
      $('.modal').remove();
    });
  }

  //Funciones para añadir Personas
  showAddPersonForm(){
    this.main.empty();
    this.main.append(`<form class="row g-3 w-75 my-5" id="forms-register" name="fAddPerson" novalidate>
    <div class="col-md-4">
      <label for="name" class="form-label">Nombre</label>
      <div class="input-group">
        <span class="input-group-text" ><i class="fa-solid fa-signature"></i></span>
        <input type="text" class="form-control" minlength="2" aria-describedby="basic-addon3" name="fName" required>
        <div class="valid-feedback">Correcto</div>
        <div class="invalid-feedback">El nombre no es válido. Tiene que tener un mínimo de 2 caracteres</div>
      </div>
    </div>
    <div class="col-md-4">
      <label for="surname1" class="form-label">Primer Apellido</label>
      <div class="input-group">
        <span class="input-group-text" ><i class="fa-solid fa-signature"></i></span>
        <input type="text" class="form-control" minlength="2" aria-describedby="basic-addon3" name="fSurname1" required>
        <div class="valid-feedback">Correcto</div>
        <div class="invalid-feedback">El apellido no es válido. Tiene que tener un mínimo de 2 caracteres</div>
      </div>
    </div>
    <div class="col-md-4">
      <label for="surname2" class="form-label">Segundo Apellido (Opcional)</label>
      <div class="input-group">
        <span class="input-group-text" ><i class="fa-solid fa-signature"></i></span>
        <input type="text" class="form-control" minlength="2" aria-describedby="basic-addon3" name="fSurname2">
        <div class="valid-feedback">Correcto</div>
      </div>
    </div>
    <div class="col-md-6">
      <label for="surname2" class="form-label">Fecha de Nacimiento</label>
      <div class="input-group">
        <span class="input-group-text" ><i class="fa-solid fa-calendar-days"></i></span>
        <input type="date" class="form-control" id="fBorn" required>
        <div class="valid-feedback">Descripción válida</div>
        <div class="invalid-feedback">Descripción no válida. Tiene que tener al menos 10 caracteres</div>
      </div>
    </div>
    <div class="col-md-6">
      <label for="basic-url" class="form-label">URL Imagen</label>
      <div class="input-group">
        <span class="input-group-text" ><i class="fas fa-link"></i></span>
        <input type="url" class="form-control" id="fImage" aria-describedby="basic-addon3" name="fURL" required>
        <div class="valid-feedback">URL válida</div>
        <div class="invalid-feedback">La URL no es válida.</div>
      </div>
    </div>
    <div class="col-md-12">
      <div id="person-kind">
        <label for="kind" class="form-label my-3">Elige una de las opciones:</label>
        <div class ="input-group">
          <input type="radio" value="Actor" name="fCheck" class="mr-1">Actor
          <input type="radio" value="Director" name="fCheck" class="ml-3 mr-1">Director
          <div class="valid-feedback">Correcto</div>
          <div class="invalid-feedback">Tienes que seleccionar una de las opciones</div>
        </div>  
      </div>
    </div>
    <div class="col-md-2 ">
      <button type="submit" class="btn btn-primary my-2" name="fSubmitt">Añadir Persona</button>
      <div class="invalid-feedback">La persona ya está registrada</div>
    </div>
    <div class="col-md-1 ">
      <input class="btn btn-danger my-2" type="reset" value="Borrar">
      <div class="invalid-feedback">La persona ya está registrada</div>
    </div>
    </form>`);
  }

  //El primer handler añadirá a la persona
  //El segundo comprobará que esa persona no se encuentre ya añadida al VideoSystem
  bindAddPerson(handler, handler2){
    addPersonValidation(handler,handler2);
  }

  //Funciones para eliminar Personas
  showDeleteDirectorForm(directors) {
    this.main.empty();
    this.main.append(`<div class="list-group" id="peopleList"></div>`);

    let containerList = $("#peopleList");

    containerList.append(`<a href="#" class="list-group-item list-group-item-action text-center"><h2>DIRECTORES</h2></a>`);

    for (let director of directors) {
      containerList.append(`<a href="#" class="list-group-item list-group-item-action">
        ${director.name + " " + director.lastname1 + " " + director.lastname2}
        <button type="button" class="btn btn-danger float-right button-delete-person" data-option="Director" data-name="${director.name}" data-lastname1="${director.lastname1}">
          Eliminar Director
        </button>
      </a>`);
    }

    containerList.append(`<a id="next" href="#"><img src="../img/Otros/fDer.png" class="flechas"></a>`);
  }

  bindDeleteDirector(handler, handler2) {
    let botones = document.querySelectorAll(".button-delete-person");
    //Elimina un director
    for (let i = 0; i < botones.length; i++) {
      botones[i].addEventListener("click", function () {
        handler(botones[i].getAttribute("data-name"), botones[i].getAttribute("data-lastname1"), botones[i].getAttribute("data-option"));
      })
    }
    //Cambiará a la vista de actores
    $('#next').click((event) => {
      handler2();
    });
  }

  showDeleteActorForm(actors) {
    this.main.empty();
    this.main.append(`<div class="list-group" id="peopleList"></div>`);

    let containerList = $("#peopleList");

    containerList.append(`<a href="#" class="list-group-item list-group-item-action text-center"><h2>ACTORES</h2></a>`);

    for (let actor of actors) {
      containerList.append(`<a href="#" class="list-group-item list-group-item-action">
        ${actor.name + " " + actor.lastname1 + " " + actor.lastname2}
        <button type="button" class="btn btn-danger float-right button-delete-person" data-option="Actor" data-name="${actor.name}" data-lastname1="${actor.lastname1}">
          Eliminar Actor
        </button>
      </a>`);
    }

    containerList.append(`<a id="previous" href="#"><img src="../img/Otros/fIzq.png" class="flechas"></a>`);
  }

  bindDeleteActor(handler, handler2) {
    let botones = document.querySelectorAll(".button-delete-person");

    for (let i = 0; i < botones.length; i++) {
      botones[i].addEventListener("click", function () {
        handler(botones[i].getAttribute("data-name"), botones[i].getAttribute("data-lastname1"), botones[i].getAttribute("data-option"));
      })
    }

    //Cambiará a la vista de directores
    $('#previous').click((event) => {
      handler2();
    });
  }

  //Modal que aparecerá al añadir o eliminar un objeto Person (Director o Actor)
  modalAddDeletePerson(person, opcion, texto) {
    this.main.append(`<div class="modal" tabindex="-1">
    <div class="modal-dialog my-5">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title">${opcion} ${texto} con éxito</h5>
        </div>
        <div class="modal-body">
          <p>El ${opcion} <strong>${person.name} ${person.lastname1} ${person.lastname2}</strong> ha sido ${texto}</strong></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
    </div>`);

    $(".modal").show();
    //Cuando se pulse en el botón se cerrará el modal
    $(".modal").find("button").click(function (event) {
      $('.modal').remove();
    });
  }
}

export default VideoSystemView;