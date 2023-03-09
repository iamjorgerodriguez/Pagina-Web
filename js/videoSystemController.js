import VideoSystem from './VideoSystemModelo.js';
import VideoSystemView from './videoSystemView.js';

import {
    Person,Category,Resource,Movie,Serie,User,Coordinate
}
    from './clases.js';

class VideoSystemController {
    #model;
    #view;

    #loadVideoSystemObjects() {
        //Directores
        let d1 = new Person("Francis","Ford","Coppola",new Date("Apr 7 1939"),"../img/Directores/coppola.jpg");
        let d2 = new Person("George","Orson","Welles",new Date("May 6 1915"),"../img/Directores/welles.jpg");
        let d3 = new Person("David-Andrew","Leo","Fincher",new Date("Aug 28 1962"),"../img/Directores/fincher.jpg");
        let d4 = new Person("Christopher", "Edward" ,"Nolan",new Date("Jul 30 1970"),"../img/Directores/nolan.jpg");
        let d5 = new Person("Steven","Allan" ,"Spielberg" ,new Date("Dec 18 1946"),"../img/Directores/spielberg.jpg");
        let d6 = new Person("James","Francis" ,"Cameron" ,new Date("Aug 16 1954"),"../img/Directores/cameron.jpg");
        let d7 = new Person("Steven", "Andrew", "Soderbergh" ,new Date("Nov 14 1963"),"../img/Directores/soderbergh.jpg");
        let d8 = new Person("Quentin", "Jerome", "Tarantino" ,new Date("Mar 27 1963"),"../img/Directores/tarantino.jpg");
        let d9 = new Person("Charlie", "Brooker", "Huq" ,new Date("Mar 3 1971"),"../img/Directores/brooker.jpg");
        //Actores
        let a1 = new Person("Marlon", "Brando", "Jr." ,new Date("Apr 3 1924"),"../img/Actores/brando.jpg");
        let a2 = new Person("Alfredo", "James", "Pacino" ,new Date("Apr 25 1940"),"../img/Actores/pacino.jpg");
        let a3 = new Person("George","Orson","Welles",new Date("May 6 1915"),"../img/Directores/welles.jpg");
        let a4 = new Person("Joseph", "Cheshire","Cotten" ,new Date("Apr 3 1924"),"../img/Actores/cotten.jpg");
        let a5 = new Person("William", "Liam", "Neeson" ,new Date("Apr 3 1924"),"../img/Actores/neeson.jpg");
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
        let a20 = new Person("Samuel" ,"Leroy" ,"Jackson" ,new Date("Dec 21 1948"),"../img/Actores/samuell.jpg");
        let a21 = new Person("Guy", "Edward" ,"Pearce" ,new Date("Oct 5 1967"),"../img/Actores/pearce.jpg");
        let a22 = new Person("Joseph", "Peter" , "Pantoliano" ,new Date("Sep 12 1951"),"../img/Actores/pantoliano.jpg");
        let a23 = new Person("Thomas", "Jeffrey", "Hanks" ,new Date("Jul 9 1956"),"../img/Actores/hanks.jpg");
        let a24 = new Person("Edward", "Harrison", "Norton" ,new Date("Aug 18 1969"),"../img/Actores/norton.jpg");
        //Producciones Drama
        let pr1 = new Movie("El Padrino", "EE.UU", new Date("Oct 20 1972"), "Don Vito Corleone es el respetado y temido jefe de una de las cinco familias de la mafia de Nueva York en los años 40. El hombre tiene cuatro hijos: Connie, Sonny, Fredo y Michael, que no quiere saber nada de los negocios sucios de su padre.", "../img/Peliculas/padrino.jpg");
        let pr2 = new Movie("Ciudadano Kane", "EE.UU", new Date("Feb 11 1946"), "Un periodista se obsesiona con comprender el significado de la última palabra que Charles Foster Kane dijo antes de morir: rosebud. Para descubrir el misterio investiga a varias personas del pasado del magnate.","../img/Peliculas/citizen.jpg");
        let pr3 = new Movie("La Lista de Schindler", "EE.UU", new Date("Mar 4 1994"), "El empresario alemán Oskar Schindler, miembro del Partido Nazi, pone en marcha un elaborado, costoso y arriesgado plan para salvar a más de mil judíos del Holocausto.","../img/Peliculas/schindler.jpg");
        let pr4 = new Movie("Apocalypse Now", "EE.UU", new Date("Nov 7 1979"), "Controvertida historia sobre la misión de un capitán del ejército de encontrar y matar a un oficial renegado en Camboya.","../img/Peliculas/apocalypse.jpg");
        let pr04 = new Movie("Érase una vez en Hollywood", "EE.UU", new Date("May 21 2019"), "A finales de los 60, Hollywood empieza a cambiar y el actor Rick Dalton tratará de seguir el cambio. Junto a su doble, ambos verán como sus raíces les complican el cambio, y al mismo tiempo su relación con la actriz Sharon Tate, que fue víctima de los Manson en la matanza de 1969, y que esta acaba de casarse con el prestigioso director Roman Polanski.","../img/Peliculas/hollywood.jpg");
        let pr05 = new Movie("El Club de la Lucha", "EE.UU", new Date("Nov 5 1999"), "Un empleado de oficina insomne en busca de una manera de cambiar su vida se cruza con un vendedor y crean un club de lucha clandestino como forma de terapia.","../img/Peliculas/clublucha.jpg");
        //Producciones Ciencia Ficción
        let pr5 = new Movie("Terminator", "EE.UU", new Date("Feb 12 1984"), "En el año 2029 las máquinas dominan el mundo. Los rebeldes que luchan contra ellas tienen como líder a John Connor, un hombre que nació en los años ochenta","../img/Peliculas/teminator.jpg");
        let pr6 = new Movie("Interstellar", "EE.UU", new Date("Nov 7 2014"), "Un grupo de científicos y exploradores, encabezados por Cooper, se embarcan en un viaje espacial para encontrar un lugar con las condiciones necesarias para reemplazar a la Tierra y comenzar una nueva vida allí.","../img/Peliculas/interstellar.jpg");
        let pr7 = new Movie("Origen", "EE.UU", new Date("Aug 6 2010"), "Dom Cobb es un ladrón capaz de adentrarse en los sueños de la gente y hacerse con sus secretos. Sin embargo, ahora tiene que llevar a cabo una misión diferente a lo que ha hecho siempre: realizar una incepción para implantar una idea en el subconsciente de una persona.","../img/Peliculas/inception.jpg");
        let pr8 = new Serie("Black Mirror", "United Kingdom", new Date("Jun 16 2011"), "El lado oscuro de la era tecnológica en la que se vive: la paranoia de ser vigilados como en un panóptico, los usos terroristas de las nuevas herramientas y su relación con la experiencia cotidiana.","../img/Peliculas/blackmirror.jpg",new Resource,new Coordinate, 8);
        //Producciones Thriller
        let pr9 = new Movie("Seven", "EE.UU", new Date("Sep 22 1995"), "Somerset es un solitario y veterano detective a punto de retirarse que se encuentra con Mills, un joven impulsivo. Ambos investigan un particular asesinato. Es este el primero de una serie de crímenes que aluden los siete pecados capitales.","../img/Peliculas/seven.jpg");
        let pr10 = new Movie("Oceans Eleven", "EE.UU", new Date("Sep 23 1994"), "Justo después de salir de prisión en libertad condicional, Danny Ocean planea su próximo robo. En este caso, el carismático ladrón quiere robar 150 millones de dólares de tres casinos de Las Vegas.","../img/Peliculas/oceans.jpg");
        let pr11 = new Movie("Pulp Fiction", "EE.UU", new Date("Dec 15 1994"), "Historias de dos matones, un boxeador y una pareja de atracadores de poca monta envueltos en una violencia espectacular e irónica.","../img/Peliculas/pulpfiction.jpg");
        let pr12 = new Movie("Memento", "EE.UU", new Date("Jan 19 2001"), "Leonard es un investigador de una agencia de seguros cuya memoria está irreversiblemente dañada por culpa de un golpe en la cabeza, al intentar evitar el asesinato de su mujer: éste es el último hecho que recuerda del pasado.","../img/Peliculas/memento.jpg");
        //Producciones Sin Categoría
        let pr13 = new Movie("Atrápame Si Puedes", "EE.UU", new Date("Jan 24 2003"), "Un adolescente estafador (Leonardo DiCaprio) se hace pasar exitosamente por un piloto de una aerolínea, un cirujano y un abogado.","../img/Peliculas/atrapame.jpg");
        //Categorías
        let c1=new Category("Drama","Responde a una estructura narrativa en la que se presenta un conflicto personal en el protagonista o entre diferentes personajes.", "img/Categorias/drama.jpg");
        let c2=new Category("Ciencia Ficción", "Es un género narrativo que sitúa la acción en unas coordenadas espacio-temporales imaginarias y diferentes a las nuestras, y que especula racionalmente sobre posibles avances científicos", "img/Categorias/ciencia.jpg" );
        let c3=new Category("Thriller", "Se caracteriza por tener una trama emocionante que mantiene al lector o espectador en constante suspenso, siguiendo con mucha atención el desarrollo de la historia hasta la resolución final del conflicto", "img/Categorias/thriller.jpg");
        //Usuario
        let u1 = new User("paulnewman","paulnewman@redford.com","JohnDoe");

        //Asignación de directores con sus producciones
        this.#model.assignDirector(d1,pr1,pr4);
        this.#model.assignDirector(d2,pr2);
        this.#model.assignDirector(d3,pr05,pr9);
        this.#model.assignDirector(d4,pr6,pr7,pr12);
        this.#model.assignDirector(d5,pr3,pr13);
        this.#model.assignDirector(d6,pr5);
        this.#model.assignDirector(d7,pr10);
        this.#model.assignDirector(d8,pr11,pr04);
        this.#model.assignDirector(d9,pr8);
        //Asignación de actores con sus producciones
        this.#model.assignActor(a1,pr1,pr4);
        this.#model.assignActor(a2,pr1);
        this.#model.assignActor(a3,pr2);
        this.#model.assignActor(a4,pr2);
        this.#model.assignActor(a5,pr3);
        this.#model.assignActor(a6,pr3);
        this.#model.assignActor(a7,pr4);
        this.#model.assignActor(a8,pr5);
        this.#model.assignActor(a9,pr5);
        this.#model.assignActor(a10,pr6);
        this.#model.assignActor(a11,pr6);
        this.#model.assignActor(a12,pr04,pr7,pr13);
        this.#model.assignActor(a13,pr7);
        this.#model.assignActor(a14,pr8);
        this.#model.assignActor(a15,pr8);
        this.#model.assignActor(a16,pr04,pr05,pr9,pr10);
        this.#model.assignActor(a17,pr9);
        this.#model.assignActor(a18,pr10);
        this.#model.assignActor(a19,pr11);
        this.#model.assignActor(a20,pr11);
        this.#model.assignActor(a21,pr12);
        this.#model.assignActor(a22,pr12);
        this.#model.assignActor(a23,pr13);
        this.#model.assignActor(a24,pr05);
        //Asinación de categorías con sus producciones
        this.#model.assignCategory(c1,pr1,pr2,pr3,pr4,pr04,pr05);
        this.#model.assignCategory(c2,pr5,pr6,pr7,pr8);
        this.#model.assignCategory(c3,pr9,pr10,pr11,pr12);
        //Añado usuario
        this.#model.addUser(u1);
    }

    constructor (model, view) {
        this.#model = model;
        this.#view = view;

        // Eventos iniciales del Controlador
        this.onLoad();
        this.onInit();
        //Enlazo el menú, las categorias, las películas aleatorias y el nombre para el inicio 
        this.#view.bindInit(this.onInit);
    }

    onInit = () => {
        this.#view.init(this.#model.categorias,this.#model.randomProduction(3));
        this.chargeMenu();
        this.#view.bindPeliculas(this.handleMovies);
        this.#view.bindForm(this.handleForm);
    }

    onLoad = () => {
        //Cargo los objetos al VideoSystem
        this.#loadVideoSystemObjects();
        this.#view.bindMenu(this.handleMenu);
    }

    //Actualiza el menú de categorías
    chargeMenu = () => {
        this.#view.showCategoryMenu(this.#model.categorias);
        this.#view.bindCategorias(this.handleCategorias);
    }

    //Enlaza a los botones de categorías
    handleCategorias = (categoria) => {
        this.#view.showCategoryMovies(this.#model.getProductionsCategory(categoria),categoria);
        //Enlazo las películas del carrusel a su ficha
        this.#view.bindPeliculas(this.handleMovies);
    }
    
    //Enlaza las películas con su ficha
    handleMovies = (titulo) => {
        let productionSelected = this.#model.findProductionByTitle(titulo);
        //Envio la produccion con su director y sus actores
        this.#view.showMoviesCharacteristics(productionSelected, this.#model.getDirectorProduction(productionSelected),this.#model.getActorsProduction(productionSelected));
        this.#view.bindPeople(this.handlePeople); 
        this.#view.bindNewWindow(this.handleNewWindow);
    }
    
    //Enviará uno u otro iterador en función del data-option
    //O cerrará todas las ventanas emergentes a la vez
    handleMenu = (opcion) => {
        if (opcion == "director") {
            this.#view.showPeopleList(opcion, this.#model.directors);
            this.#view.bindPeople(this.handlePeople); 
        }if(opcion == "actor"){
            this.#view.showPeopleList(opcion, this.#model.actors);
            this.#view.bindPeople(this.handlePeople); 
        }if(opcion == "windows"){
            this.#view.closeWindows();
        };
    }

    handlePeople = (categoria, personName, personLastName1) => {
        let personSelected;
        let iterator;
        let iteratorProductions;
        
        if (categoria == "director") {
            iterator=this.#model.directors;
        }if(categoria == "actor"){
            iterator=this.#model.actors;
        }

        for (let person of iterator) {
            if (person.name == personName && person.lastname1 == personLastName1) {
                personSelected = person;
                if (categoria == "director") {
                    //Guardo las producciones asignadas al director
                    iteratorProductions = this.#model.getProductionsDirector(personSelected);
                }if(categoria == "actor"){
                    //Guardo las producciones asignadas al actor
                    iteratorProductions = this.#model.getProductionsActor(personSelected);
                }
            }
        }

        this.#view.showPeopleCharacteristics(personSelected,iteratorProductions);
        this.#view.bindPeliculas(this.handleMovies);
    }
    
    //Enlaza el boton de información a una nueva ventana
    handleNewWindow = (titulo) => {
        this.#view.newWindow(this.#model.findProductionByTitle(titulo));
    }

    //Opciones del menú de registro
    handleForm = (opcion) => {
        if(opcion == "AddProd"){
            this.#view.showAddProductionForm(this.#model.directors,this.#model.actors,this.#model.categorias);
            this.#view.bindAddProduction(this.handleAddProduction, this.handleFindProduction);
        }if(opcion == "DelProd"){
            this.#view.showDelProductionForm(this.#model.productions);
            this.#view.bindDeleteProduction(this.handleDelProduction);
        }if(opcion == "AddCat") {
            this.#view.showAddCategoryForm();
            this.#view.bindAddCategory(this.handleAddCategory, this.handleFindCategory);
        }if (opcion == "DelCat") {
            this.#view.showDeleteCategory(this.#model.categorias);
            this.#view.bindDeleteCategory(this.handleDelCategory);
        }if (opcion == "AddPer"){
            this.#view.showAddPersonForm();
            this.#view.bindAddPerson(this.handleAddPerson,this.handleFindPerson);
        }if (opcion == "DelPer"){
            this.#view.showDeleteDirectorForm(this.#model.directors);
            this.#view.bindDeleteDirector(this.handleDelPerson, this.handleSwitchActorList);
        }if (opcion == "AssignProd"){
            this.#view.showAssignDeassignProductionsChecks("Asignar");   
            this.#view.bindSelectedPerson(this.handleSelectPersonAssign);
        }if (opcion == "DeasProd"){
            this.#view.showAssignDeassignProductionsChecks("Desasignar");   
            this.#view.bindSelectedPerson(this.handleSelectPersonDeassign);
        }
    }
    
    //Manejador para añadir una producción
    handleAddProduction = (production, director, actors, categories) => {
        let newProduction ;
        //Compruebo si tiene la propiedad seasons
        if (production.hasOwnProperty("seasons")) {
            //Instancio una nueva Serie
            newProduction = new Serie (production.title, production.nationality, production.publication, production.synopsis, production.image, new Resource, new Coordinate, production.seasons);
        }else{
            //Instancio una nueva Película
            newProduction = new Movie (production.title, production.nationality, production.publication, production.synopsis, production.image, new Resource, new Coordinate);
        }
        //Asigno el director
        this.#model.assignDirector(this.#model.findDirectorByPosition(director),newProduction);
        //Asigno los actores
        actors.forEach(actor => {
                this.#model.assignActor(this.#model.findActorByPosition(actor), newProduction);
        });
        //Asigno las categorías
        categories.forEach(category => {
            this.#model.assignCategory(this.#model.findCategoryByPosition(category), newProduction);
        });

        this.#view.showAddProductionForm(this.#model.directors,this.#model.actors,this.#model.categorias);
        this.#view.bindAddProduction(this.handleAddProduction, this.handleFindProduction);
        this.#view.modalAddDeleteProduction(newProduction, "añadida");
    }

    //Buscará una película por su título 
    //Si la encuentra devolverá true
    handleFindProduction = (productionTitle) => {
        return this.#model.findProductionByTitle(productionTitle) == undefined ? false : true;
    }

    //Eliminará una producción del VideoSystem
    handleDelProduction = (title) => {
        let deleteProduction;

        for (let production of this.#model.productions) {
            if (production.title == title){
                deleteProduction = production;
                this.#model.removeProduction(production);
            }
        }
        //Reinicio el formulario
        this.#view.showDelProductionForm(this.#model.productions);
        this.#view.bindDeleteProduction(this.handleDelProduction);
        this.#view.modalAddDeleteProduction(deleteProduction, "eliminada");
    }

    //Mostrará un formulario con una lista u otra dependiendo de la 
    //opción elegida en los checkbox
    handleSelectPersonAssign = (opcion) => {
        if (opcion == "director") {
            this.#view.showAssignProductionsForm(this.#model.directors,this.#model.productions, opcion);
        }if (opcion == "actor") {
            this.#view.showAssignProductionsForm(this.#model.actors,this.#model.productions, opcion);
        }

        this.#view.bindAssignProductionPerson(this.handleAssignProduction, this.handleFindMovieAssigned);
    }

    //Asignará la producción con el actor o el director
    handleAssignProduction = (person, production ,option) => {
        if (option == "director") {
            this.#model.assignDirector(this.#model.findDirectorByNameLastname(person), this.#model.findProductionByTitle(production));
            this.#view.showAssignProductionsForm(this.#model.directors,this.#model.productions, option);
            this.#view.modalAssignDeassignProduction(this.#model.findProductionByTitle(production),this.#model.findDirectorByNameLastname(person), "asignada");
        }if (option == "actor") {
            this.#model.assignActor(this.#model.findActorByNameLastname(person), this.#model.findProductionByTitle(production));
            this.#view.showAssignProductionsForm(this.#model.actors,this.#model.productions, option);
            this.#view.modalAssignDeassignProduction(this.#model.findProductionByTitle(production),this.#model.findActorByNameLastname(person), "asignada");
        }
        this.#view.bindAssignProductionPerson(this.handleAssignProduction, this.handleFindMovieAssigned);
    }

    //Busca si la película se encuentra ya asignada al director o actor
    handleFindMovieAssigned = (production, personSelected, option) => {
        let found = false;

        if (option == "director") {
            if (this.#model.getDirectorProduction(this.#model.findProductionByTitle(production)).includes(this.#model.findDirectorByNameLastname(personSelected))) {
                found == true;
            }
        }if (option == "actor") {
            if (this.#model.getActorsProduction(this.#model.findProductionByTitle(production)).includes(this.#model.findActorByNameLastname(personSelected))) {
                found = true;
            }
        }

        return found;
    }
    
    //Mostrará un formulario con las películas asignadas por el director/actor en el select
    handleSelectPersonDeassign = (opcion) => {
        if (opcion == "director") {
            this.#view.showDeassignProductionsForm(this.#model.directors,this.#model.productions, opcion);
        }if (opcion == "actor") {
            this.#view.showDeassignProductionsForm(this.#model.actors,this.#model.productions, opcion);
        }

        this.#view.bindDeassignProductionPersonSelect(this.handleShowSelectOptions);
    }

    handleShowSelectOptions = (person, opcion) => {
        if (opcion == "director") {
            this.#view.showProductionsSelect(this.#model.getProductionsDirector(this.#model.findDirectorByNameLastname(person)));
        }if (opcion == "actor") {
            this.#view.showProductionsSelect(this.#model.getProductionsActor(this.#model.findActorByNameLastname(person)));
        }

        this.#view.bindDeassignProduction(this.handleDeassignProduction);
    }

    handleDeassignProduction = (person,production,opcion) => {
        if (opcion == "director") {
            this.#model.deassignDirector(this.#model.findDirectorByNameLastname(person), this.#model.findProductionByTitle(production));
            this.#view.showProductionsSelect(this.#model.getProductionsDirector(this.#model.findDirectorByNameLastname(person)));
            this.#view.modalAssignDeassignProduction(this.#model.findProductionByTitle(production),this.#model.findDirectorByNameLastname(person), "desasignada");
        }if (opcion == "actor") {
            this.#model.deassignActor(this.#model.findActorByNameLastname(person), this.#model.findProductionByTitle(production));
            this.#view.showProductionsSelect(this.#model.getProductionsActor(this.#model.findActorByNameLastname(person)));
            this.#view.modalAssignDeassignProduction(this.#model.findProductionByTitle(production),this.#model.findActorByNameLastname(person), "desasignada");
        }

        this.#view.bindDeassignProduction(this.handleDeassignProduction);
    }

    //Añadirá una categoría
    handleAddCategory = (categoria) => {
        this.#model.addCategory(new Category (categoria.name,categoria.description,categoria.image));
        
        this.chargeMenu();
        this.#view.showAddCategoryForm();
        this.#view.bindAddCategory(this.handleAddCategory, this.handleFindCategory);
        this.#view.modalAddDeleteCategory(categoria, "añadida");
    }

    //Busca si la categoría se encuentra ya añadida
    handleFindCategory = (categoryname) => {
        let found = false;

        for (let category of this.#model.categorias) {
            if (category.name.toUpperCase() == categoryname.toUpperCase()) {
                found = true;
            }
        }
                
        return found;
    } 

    //Eliminará una categoria del VideoSystem
    handleDelCategory = (name) => {
        let categoriaEliminada;

        for (let category of this.#model.categorias) {
            if (category.name == name) {
                categoriaEliminada = category;
                this.#model.removeCategory(category);
            }
        }

        //Reinicio el formulario
        this.chargeMenu();
        this.#view.showDeleteCategory(this.#model.categorias);
        this.#view.bindDeleteCategory(this.handleDelCategory);
        this.#view.modalAddDeleteCategory(categoriaEliminada, "eliminada");
    }

    //Añadirá una persona al VideoSystem dependiendo de si es actor o director
    handleAddPerson = (person,option) => {
        //Instancio una nueva persona
        let newPerson = new Person(person.name, person.lastname1, person.lastname2, person.born, person.picture);

        if (option == "Director") {
            this.#model.addDirector(newPerson);
            //Reinicio el formulario
            this.#view.showAddPersonForm();
            this.#view.bindAddPerson(this.handleAddPerson,this.handleFindPerson);
            this.#view.modalAddDeletePerson(person, "Director", "añadido");
        }else{
            this.#model.addActor(newPerson);
            //Reinicio el formulario
            this.#view.showAddPersonForm();
            this.#view.bindAddPerson(this.handleAddPerson,this.handleFindPerson);
            this.#view.modalAddDeletePerson(person, "Actor", "añadido");
        }
    }

    //Buscará si la persona a añadir se encuentra ya en el VideoSystem
    handleFindPerson = (person, option) => {
        let found = false;

        if (option == "Director") {
            //Si devuelve algo, es porque existe el actor
            if (this.#model.findDirectorByNameLastname(person) != undefined) {
                found = true;   
            }
        }else{
            if (this.#model.findActorByNameLastname(person) != undefined) {
                found = true;   
            }
        }

        return found;
    }

    //Eliminará una persona del VideoSystem
    handleDelPerson = (name, lastname1, opcion) => {
        if (opcion == "Director") {
            let directorSelected;

            for (let director of this.#model.directors) {
                if (director.name == name && (director.lastname1 == lastname1)) {
                    //Guardo el director seleccionado para mostrarlo en el modal
                    directorSelected = director;
                    this.#model.removeDirector(director);
                }
            }
            this.#view.showDeleteDirectorForm(this.#model.directors);
            this.#view.bindDeleteDirector(this.handleDelPerson, this.handleSwitchActorList);
            this.#view.modalAddDeletePerson(directorSelected, "Director", "eliminado");
        }if (opcion == "Actor"){
            let actorSelected;
            for (let actor of this.#model.actors) {
                if (actor.name == name && (actor.lastname1 == lastname1)) {
                    //Guardo el actor seleccionado para mostrarlo en el modal
                    actorSelected = actor;
                    this.#model.removeActor(actor);
                }
            }
            this.#view.showDeleteActorForm(this.#model.actors);
            this.#view.bindDeleteActor(this.handleDelPerson, this.handleSwitchDirectorList);
            this.#view.modalAddDeletePerson(actorSelected, "Actor", "eliminado");
        }
    }

    //Manejador para cambiar de vista en el formulario para eliminar persona
    handleSwitchDirectorList = () => {
        this.#view.showDeleteDirectorForm(this.#model.directors);
        this.#view.bindDeleteDirector(this.handleDelPerson, this.handleSwitchActorList);
    }
    //Manejador para cambiar de vista en el formulario para eliminar persona
    handleSwitchActorList = () => {
        this.#view.showDeleteActorForm(this.#model.actors);
        this.#view.bindDeleteActor(this.handleDelPerson, this.handleSwitchDirectorList);
    }
}

export default VideoSystemController;