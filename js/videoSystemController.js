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
        //Directores
        let d1 = new Person("Francis","Ford","Coppola",new Date("Apr 7 1939"),"../img/Directores/coppola.jpg");
        let d2 = new Person("George","Orson","Welles",new Date("May 6 1915"),"../img/Directores/welles.jpg");
        let d3 = new Person("David Andrew","Leo","Fincher",new Date("Aug 28 1962"),"../img/Directores/fincher.jpg");
        let d4 = new Person("Christopher", "Edward" ,"Nolan",new Date("Jul 30 1970"),"../img/Directores/nolan.jpg");
        let d5 = new Person("Steven","Allan" ,"Spielberg" ,new Date("Dec 18 1946"),"../img/Directores/spielberg.jpg");
        let d6 = new Person("James","Francis" ,"Cameron" ,new Date("Aug 16 1954"),"../img/Directores/cameron.jpg");
        let d7 = new Person("Steven", "Andrew", "Soderbergh" ,new Date("Nov 14 1963"),"../img/Directores/soderbergh.jpg");
        let d8 = new Person("Quentin", "Jerome", "Tarantino" ,new Date("Mar 27 1963"),"../img/Directores/tarantino.jpg");
        let d9 = new Person("Charlie", "Brooker", "Huq" ,new Date("Mar 3 1971"),"../img/Directores/brooker.jpg");
        //Actores
        let a1 = new Person("Marlon", "Brando", "Jr." ,new Date("Apr 3 1924"),"../img/Actores/brando.jpg");
        let a2 = new Person("Alfredo", "James", "Pacino" ,new Date("Apr 25 1940"),"../img/Actores/pacino.jpg");
        let a4 = new Person("Joseph", "Cheshire","Cotten" ,new Date("Apr 3 1924"),"../img/Actores/cotten.jpg");
        let a5 = new Person("Liam", "Neeson", "Jr." ,new Date("Apr 3 1924"),"../img/Actores/neeson.jpg");
        let a6 = new Person("Ralph", "Nathaniel", "Twisleton-Wykeham-Fiennes" ,new Date("Dec 22 1962"),"../img/Actores/fiennes.jpg");
        let a7 = new Person("Martin", "Sheen", "Phelan" ,new Date("Aug 3 1940"),"../img/Actores/sheen.jpg");
        let a8 = new Person("Arnold", "Alois" ,"Schwarzenegger",new Date("Jul 30 1943"),"../img/Actores/arnold.jpg");
        let a9 = new Person("Linda", "Carrol", "Hamilton" ,new Date("Sep 26 1956"),"../img/Actores/lindahamilton.jpg");
        let a10 = new Person("Matthew", "David" ,"McConaughey" ,new Date("Nov 4 1969"),"../img/Actores/mcconaughey.jpg");
        let a11 = new Person("Jessica", "Michelle", "Chastain" ,new Date("Mar 24 1977"),"../img/Actores/chastain.jpg");
        let a12 = new Person("Leonardo" ,"Wilhelm" ,"DiCaprio" ,new Date("Nov 11 1974"),"../img/Actores/dicaprio.jpg");
        let a13 = new Person("Marion", "Cotillard", "" ,new Date("Sep 30 1975"),"../img/Actores/cotillard.jpg");
        let a14 = new Person("Bryce" ,"Dallas" ,"Howard" ,new Date("Mar 2 1981"),"../img/Actores/brycehoward.jpg");
        let a15 = new Person("Hayley" ,"Elizabeth" ,"Atwell" ,new Date("Apr 5 1982"),"../img/Actores/atwell.jpg");
        let a16 = new Person("William" ,"Bradley" ,"Pitt" ,new Date("Dec 18 1963"),"../img/Actores/pitt.jpg");
        let a17 = new Person("Morgan" ,"Freeman" ,"" ,new Date("Jun 1 1937"),"../img/Actores/freeman.jpg");
        let a18 = new Person("George", "Timothy", "Clooney" ,new Date("Jun 1 1937"),"../img/Actores/clooney.jpg");
        let a19 = new Person("John" ,"Joseph" ,"Travolta" ,new Date("Feb 18 1954"),"../img/Actores/travolta.jpg");
        //Producciones Drama
        let pr1 = new Movie("El Padrino", "EE.UU", new Date("Oct 20 1972"), "Don Vito Corleone es el respetado y temido jefe de una de las cinco familias de la mafia de Nueva York en los años 40. El hombre tiene cuatro hijos: Connie, Sonny, Fredo y Michael, que no quiere saber nada de los negocios sucios de su padre.", "../img/Peliculas/padrino.jpg");
        let pr2 = new Movie("Ciudadano Kane", "EE.UU", new Date("Feb 11 1946"), "Un periodista se obsesiona con comprender el significado de la última palabra que Charles Foster Kane dijo antes de morir: rosebud. Para descubrir el misterio investiga a varias personas del pasado del magnate.","../img/Peliculas/citizen.jpg");
        let pr3 = new Movie("La Lista de Schindler", "EE.UU", new Date("Mar 4 1994"), "El empresario alemán Oskar Schindler, miembro del Partido Nazi, pone en marcha un elaborado, costoso y arriesgado plan para salvar a más de mil judíos del Holocausto.","../img/Peliculas/schindler.jpg");
        let pr4 = new Movie("Apocalypse Now", "EE.UU", new Date("Nov 7 1979"), "Controvertida historia sobre la misión de un capitán del ejército de encontrar y matar a un oficial renegado en Camboya.","../img/Peliculas/apocalypse.jpg");
        //Producciones Ciencia Ficción
        let pr5 = new Movie("Terminator", "EE.UU", new Date("Feb 12 1984"), "En el año 2029 las máquinas dominan el mundo. Los rebeldes que luchan contra ellas tienen como líder a John Connor, un hombre que nació en los años ochenta","../img/Peliculas/teminator.jpg");
        let pr6 = new Movie("Interstellar", "EE.UU", new Date("Nov 7 2014"), "Un grupo de científicos y exploradores, encabezados por Cooper, se embarcan en un viaje espacial para encontrar un lugar con las condiciones necesarias para reemplazar a la Tierra y comenzar una nueva vida allí.","../img/Peliculas/interstellar.jpg");
        let pr7 = new Movie("Origen", "EE.UU", new Date("Aug 6 2010"), "Dom Cobb es un ladrón capaz de adentrarse en los sueños de la gente y hacerse con sus secretos. Sin embargo, ahora tiene que llevar a cabo una misión diferente a lo que ha hecho siempre: realizar una incepción para implantar una idea en el subconsciente de una persona.","../img/Peliculas/inception.jpg");
        let pr8 = new Serie("Black Mirror", "United Kingdom", new Date("Jun 16 2011"), "El lado oscuro de la era tecnológica en la que se vive: la paranoia de ser vigilados como en un panóptico, los usos terroristas de las nuevas herramientas y su relación con la experiencia cotidiana.","../img/Peliculas/blackmirror.jpg");
        //Producciones Thriller
        let pr9 = new Movie("Seven", "EE.UU", new Date("Sep 22 1995"), "Somerset es un solitario y veterano detective a punto de retirarse que se encuentra con Mills, un joven impulsivo. Ambos investigan un particular asesinato. Es este el primero de una serie de crímenes que aluden los siete pecados capitales.","../img/Peliculas/seven.jpg");
        let pr10 = new Movie("Oceans Eleven", "EE.UU", new Date("Sep 23 1994"), "Justo después de salir de prisión en libertad condicional, Danny Ocean planea su próximo robo. En este caso, el carismático ladrón quiere robar 150 millones de dólares de tres casinos de Las Vegas.","../img/Peliculas/oceans.jpg");
        let pr11 = new Movie("Pulp Fiction", "EE.UU", new Date("Dec 15 1994"), "Historias de dos matones, un boxeador y una pareja de atracadores de poca monta envueltos en una violencia espectacular e irónica.","../img/Peliculas/pulpfiction.jpg");
        let pr12 = new Movie("Memento", "EE.UU", new Date("Jan 19 2001"), "Leonard es un investigador de una agencia de seguros cuya memoria está irreversiblemente dañada por culpa de un golpe en la cabeza, al intentar evitar el asesinato de su mujer: éste es el último hecho que recuerda del pasado.","../img/Peliculas/memento.jpg");
        //Categorías
        let c1=new Category("Drama","Responde a una estructura narrativa en la que se presenta un conflicto personal en el protagonista o entre diferentes personajes.");
        let c2=new Category("Ciencia Ficción", "Es un género narrativo que sitúa la acción en unas coordenadas espacio-temporales imaginarias y diferentes a las nuestras, y que especula racionalmente sobre posibles avances científicos");
        let c3=new Category("Thriller", "Se caracteriza por tener una trama emocionante que mantiene al lector o espectador en constante suspenso, siguiendo con mucha atención el desarrollo de la historia hasta la resolución final del conflicto");

        //Asignación de directores con sus producciones
        this.#videoSystemModelo.assignDirector(d1,pr1,pr4);
        this.#videoSystemModelo.assignDirector(d2,pr2);
        this.#videoSystemModelo.assignDirector(d3,pr9);
        this.#videoSystemModelo.assignDirector(d4,pr6,pr7,pr12);
        this.#videoSystemModelo.assignDirector(d5,pr3);
        this.#videoSystemModelo.assignDirector(d6,pr5);
        this.#videoSystemModelo.assignDirector(d7,pr10);
        this.#videoSystemModelo.assignDirector(d8,pr11);
        this.#videoSystemModelo.assignDirector(d9,pr8);
        //Asignación de actores con sus producciones
        this.#videoSystemModelo.assignActor(a1,pr1,pr4);
        this.#videoSystemModelo.assignActor(a2,pr1);
        this.#videoSystemModelo.assignActor(a4,pr2);
        this.#videoSystemModelo.assignActor(a5,pr3);
        this.#videoSystemModelo.assignActor(a6,pr3);
        this.#videoSystemModelo.assignActor(a7,pr4);
        this.#videoSystemModelo.assignActor(a8,pr5);
        this.#videoSystemModelo.assignActor(a9,pr5);
        this.#videoSystemModelo.assignActor(a10,pr6);
        this.#videoSystemModelo.assignActor(a11,pr6);
        this.#videoSystemModelo.assignActor(a12,pr7);
        this.#videoSystemModelo.assignActor(a13,pr7);
        this.#videoSystemModelo.assignActor(a14,pr8);
        this.#videoSystemModelo.assignActor(a15,pr8);
        this.#videoSystemModelo.assignActor(a16,pr9,pr10);
        this.#videoSystemModelo.assignActor(a17,pr9);
        this.#videoSystemModelo.assignActor(a18,pr10);
        //Asinación de categorías con sus producciones
        this.#videoSystemModelo.assignCategory(c1,pr1,pr2,pr3,pr4);
        this.#videoSystemModelo.assignCategory(c2,pr5,pr6,pr7,pr8);
        this.#videoSystemModelo.assignCategory(c3,pr9,pr10,pr11,pr12);
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
        this.#videoSystemVista.bindMenu(this.handleMenu);
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
        };
        //Envio la produccion que tiene que mostrar la vista
        this.#videoSystemVista.showMoviesCharacteristics(productionSelected);
    }

    handleMenu = (opcion) => {
        if (opcion == "director") {
            this.#videoSystemVista.showPeopleList(opcion, this.#videoSystemModelo.directors);
            this.#videoSystemVista.bindPeople(this.handlePeople); 
        }if(opcion == "actor"){
            this.#videoSystemVista.showPeopleList(opcion, this.#videoSystemModelo.actors);
            this.#videoSystemVista.bindPeople(this.handlePeople); 
        }
    }

    handlePeople = (categoria, personName, personLastName1) => {
        let personSelected;
        let iterator;
        let iteratorProductions;
        
        if (categoria == "director") {
            iterator=this.#videoSystemModelo.directors;
        }if(categoria == "actor"){
            iterator=this.#videoSystemModelo.actors;
        }

        for (let person of iterator) {
            if (person.name == personName && person.lastname1 == personLastName1) {
                personSelected = person;
                if (categoria == "director") {
                    iteratorProductions = this.#videoSystemModelo.getProductionsDirector(personSelected);
                }if(categoria == "actor"){
                    iteratorProductions = this.#videoSystemModelo.getProductionsActor(personSelected);
                }
            }
        }

        this.#videoSystemVista.showPeopleCharacteristics(personSelected,iteratorProductions);
    }
}

export default VideoSystemController;