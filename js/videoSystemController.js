import VideoSystem from './VideoSystemModelo.js';
import VideoSystemView from './videoSystemView.js';

import {
    Person,Category,Resource,Production,Movie,Serie,User,Coordinate
}
    from './clases.js';

class VideoSystemController {
    #videoSystemModelo;
    #videoSystemVista;

    #loadVideoSystemObjects() {
        //Producciones
        let pr1 = new Movie("La milla verde", "EE.UU", new Date("Feb 18 2000"), "Paul Edgecomb es un funcionario de prisiones que vigila la milla verde, el pasillo de linóleo que los condenados a muerte recorren hasta llegar a la silla eléctrica. John Coffey, un gigantesco convicto acusado de violar y asesinar a dos niñas de nueve años, está esperando su inminente ejecución.", "./img/lamillaverde.jpg");
        let pr2 = new Movie("Terminator", "EE.UU", new Date("Feb 12 1984"), "En el año 2029 las máquinas dominan el mundo. Los rebeldes que luchan contra ellas tienen como líder a John Connor, un hombre que nació en los años ochenta","../img/Peliculas/teminator.jpg");
        let pr3 = new Serie("Breaking Bad", "EE.UU", new Date("Mar 12 2008"), "Walter White, profesor de química en un instituto, descubre que tiene cáncer de pulmón y decide trabajar junto con un ex-alumno elaborando metanfetamina de alta calidad para poder ganar dinero para que su familia se mantenga.");
        let pr4 = new Movie("Vértigo", "United Kingdom", new Date("Mar 12 1958"), "Scottie Fergusson (James Stewart) es un detective de la policía de San Francisco que padece de vértigo. Cuando un compañero cae al vacío desde una cornisa mientras persiguen a un delincuente, Scottie decide retirarse.");
        let pr5 = new Movie("Psicosis", "United Kingdom", new Date("Jun 16 1960"), "La secretaria de una empresa inmobiliaria, Marion Crane, no puede casarse con su amante, Sam Loomis. El destino pone en sus manos 40.000 dólares en efectivo que su jefe le confía para depositarlos en el banco.");
        let pr6 = new Movie("The Birds", "EE.UU", new Date("Jun 25 1963"), "Melanie, una joven rica mujer, conoce en una pajarería al abogado Mitch Brenner. Tras el encuentro, Melanie persigue al hombre hasta Bodega Bay, lugar en el que es atacada por bandadas de pájaros enfurecidos.");
        let pr7 = new Movie("Forrest Gump", "EE.UU", new Date("Sep 23 1994"), "Sentado en un banco en Savannah, Georgia, Forrest Gump espera al autobús. Mientras éste tarda en llegar, el joven cuenta su vida a las personas que se sientan a esperar con él. Aunque sufre un pequeño retraso mental, esto no le impide hacer cosas maravillosas.");
        let pr8 = new Movie("Interstellar", "EE.UU", new Date("Nov 7 2014"), "Un grupo de científicos y exploradores, encabezados por Cooper, se embarcan en un viaje espacial para encontrar un lugar con las condiciones necesarias para reemplazar a la Tierra y comenzar una nueva vida allí.","../img/Peliculas/interstellar.jpg");
        //Categorías
        let c1=new Category("Drama","Responde a una estructura narrativa en la que se presenta un conflicto personal en el protagonista o entre diferentes personajes.");
        let c2=new Category("Ciencia Ficción", "Es un género narrativo que sitúa la acción en unas coordenadas espacio-temporales imaginarias y diferentes a las nuestras, y que especula racionalmente sobre posibles avances científicos");
        let c3=new Category("Thriller", "Se caracteriza por tener una trama emocionante que mantiene al lector o espectador en constante suspenso, siguiendo con mucha atención el desarrollo de la historia hasta la resolución final del conflicto");

        this.#videoSystemModelo.assignCategory(c1,pr4,pr5,pr6);
        this.#videoSystemModelo.assignCategory(c2,pr2,pr8);
        this.#videoSystemModelo.assignCategory(c3,pr1,pr2,pr3);
    }

    constructor(videoSystemModelo, videoSystemVista) {
        this.#videoSystemModelo = videoSystemModelo;
        this.#videoSystemVista = videoSystemVista;

        // Eventos iniciales del Controlador
        this.onLoad();
        this.onInit();

        // Enlazamos handlers con la vista
        this.#videoSystemVista.bindInit(this.onInit);
        this.#videoSystemVista.bindBuscador(this.handleBuscar);
    }

    onInit = () => {
        this.#videoSystemVista.init();
        this.#videoSystemVista.bindCategorias(this.handleCategorias);
    }

    onLoad = () => {
        this.#loadVideoSystemObjects();
    }

    handleBuscar = () => {
        this.#videoSystemVista.busqueda();
    }

    //Método enlace a los botones de categorías
    handleCategorias = (categoria) => {
        this.#videoSystemVista.showCategoryMovies(this.#videoSystemModelo.getProductionsCategory(categoria),categoria);
        this.#videoSystemVista.bindPeliculas(this.handleMovies);
    }

    handleMovies = (titulo) => {
        let productionSelected;

        //Recorro todas las producciones añadidas
        for (let produccion of this.#videoSystemModelo.productions) {
            //Busco la producción a partir del título obtenido al hacer click
            if (produccion.title == titulo) {
                productionSelected = produccion;
            }
        }

        //Envio la produccion que tiene que mostrar la vista
        this.#videoSystemVista.showMoviesCharacteristics(productionSelected);
    }
}

export default VideoSystemController;