'use strict';

import {
    Person, Category, Movie, Serie, User
}
    from './clases.js';

import {
    NotThisType, NotFound404, ElementFound, SameEmail, SameName, DoesntExists, isNull
}
    from './excepciones.js';

let VideoSystem = (function () {
    let instantiated; //Objeto con la instancia única VideoSystem

    function init(name) { //Inicialización del Singleton
        //Declaración de la clase VideoSystem
        class VideoSystem {
            #name;
            #users = [];
            #productions = [];
            #categories = [];
            #actors = [];
            #directors = [];
            #CategoryProduction = new Map();
            #ActorProduction = new Map();
            #DirectorProduction = new Map();

            constructor(name) {
                this.#name = name;
            }

            get name() {
                return this.#name;
            }

            set name(name) {
                //Excepción que controlará que el atributo name no esté vacío
                if (name.length == 0) throw new isNull("name");

                this.#name = name;
            }

            /**
             * Añade una categoria a la lista #categories
             * @param {*} categoria 
             * @returns El nºde categorias en la lista #categories
             */

            addCategory(categoria) {
                //Controla que la categoría no sea nula
                if (categoria === null) throw new isNull(" Category ");
                //Controla que categoría sea una instancia de Category
                if (!(categoria instanceof Category)) throw new NotThisType(categoria.constructor.name);
                //Controla que la categoría no se encuentre ya añadida a la lista
                if ((this.#categories.indexOf(categoria)) != -1) throw new ElementFound(categoria);

                this.#categories.push(categoria);

                //Si no existe en el map de categorias y producciones, lo añado
                if (!(this.#CategoryProduction.has(categoria))) {
                    this.#CategoryProduction.set(categoria,[]);
                }

                return this.#categories.length;
            }

            /**
             * Elimina una categoria de la lista #categories
             * @param {*} categoria
             * @returns El nºde categorias en la lista #categories
             */

            removeCategory(categoria) {
                //Controla que la categoría se encuentre añadida a la lista
                let i = this.#categories.indexOf(categoria);
                if (i == -1) throw new NotFound404(categoria);

                this.#categories.splice(i, 1);

                //Elimino relaciones con otros objetos
                this.#CategoryProduction.delete(categoria);

                return this.#categories.length;
            }

            //Iterador de categorias
            get categorias() {
                let categories = this.#categories;
                //Retorno el objeto [Symbol.iterator]
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < categories.length; i++) {
                            yield categories[i];
                        }
                    }
                }
            }

            /**
             * Añade un usuario a la lista #users
             * @param {*} usuario 
             * @returns El nºde usuarios en la lista #users
             */

            addUser(usuario) {
                //Controla que el usuario no sea nulo
                if (usuario === null) throw new isNull(" User ");
                //Controla que el usuario sea una instancia de User
                if (!(usuario instanceof User)) throw new NotThisType(usuario.constructor.name);

                for (let userList of this.#users) {
                    //Controla que el nombre del usuario no se encuentre ya registrado
                    if (usuario.username == userList.username) throw new SameName(usuario.username);
                    //Controla que el email del usuario no se encuentre ya registrado
                    if (usuario.email == userList.email) throw new SameEmail(usuario.email);
                }

                this.#users.push(usuario);

                return this.#users.length;
            }

            /**
             * Elimina un usuario de la lista #users
             * @param {*} usuario 
             * @returns El nºde usuarios en la lista #users
             */

            removeUser(usuario) {
                if (usuario === null) throw new isNull(" User ");
                if (!(usuario instanceof User)) throw new NotThisType(usuario.constructor.name);

                let i = this.#users.indexOf(usuario);
                if (i == -1) throw new NotFound404(usuario);

                this.#users.splice(i, 1);

                return this.#users.length;
            }

            //Iterador de usuarios
            get users() {
                let listUsers = this.#users;
                //Retorno el objeto [Symbol.iterator]
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < listUsers.length; i++) {
                            yield listUsers[i];
                        }
                    }
                }
            }

            /**
             * Añade una producción a la lista #productions
             * @param {*} produccion 
             * @returns El nºde producciones en la lista #productions
             */

            addProduction(produccion) {
                //Controla que la produccion no sea igual a null
                if (produccion === null) throw new isNull(" Production ");
                //Controla que la produccion sea una instancia de Movie o Serie
                if ((!(produccion instanceof Movie)) && (!(produccion instanceof Serie))) throw new NotThisType(produccion.constructor.name);
                //Controla que la producción a añadir no se encuentre ya en la lista
                let i = this.#productions.indexOf(produccion);
                if (i != -1) throw new ElementFound(produccion);

                this.#productions.push(produccion);

                return this.#productions.length;
            }

            /**
             * Elimina una produccion de la lista #productions
             * @param {*} produccion 
             * @returns El nºde producciones en la lista #productions
             */

            removeProduction(produccion) {
                //Controla que la produccion no sea igual a null
                if (produccion === null) throw new isNull(" Production ");
                //Controla que la produccion sea una instancia de Movie o Serie
                if ((!(produccion instanceof Movie)) && (!(produccion instanceof Serie))) throw new NotThisType(produccion.constructor.name);
                //Controla que la producción a añadir se encuentre en la lista para poder eliminarla
                let i = this.#productions.indexOf(produccion);
                if (i == -1) throw new NotFound404(produccion);

                this.#productions.splice(i, 1);

                //Elimino las relaciones con otros objetos
                for (let director of this.#directors) {
                    if (this.#DirectorProduction.get(director).includes(produccion)) {
                        this.deassignDirector(director,produccion);
                    }
                }

                for (let actor of this.#actors) {
                    if (this.#ActorProduction.get(actor).includes(produccion)) {
                        this.deassignActor(actor,produccion);
                    }
                }

                for (let categoria of this.#categories) {
                    if (this.#CategoryProduction.get(categoria).includes(produccion)) {
                        this.deassignCategory(categoria,produccion);
                    }
                }

                return this.#productions.length;
            }

            //Iterador de producciones
            get productions() {
                let listProductions = this.#productions;
                //Retorno el objeto [Symbol.iterator]
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < listProductions.length; i++) {
                            yield listProductions[i];
                        }
                    }
                }
            }

            get productionsLength() {
                return this.#productions.length;
            }

            /**
             * Generará un array con X producciones
             * aleatorias
             */
            randomProduction(numeroProducciones) {
                let arrayProducciones = [];
                let numeroRandom;
                //Guardará las producciones aleatorias
                let produccionRandom;

                //Si hay menos películas de las que se piden, asigno todas las películas
                //del array #productions al array de producciones aleatorias
                if (this.productionsLength < numeroProducciones) {
                    arrayProducciones = this.#productions;
                }else{
                    for (let i = 0; i < numeroProducciones; i++) {
                        numeroRandom = Math.floor(Math.random() * this.productionsLength);
                        produccionRandom = this.#productions[numeroRandom];
                        //Compruebo que no se encuentra ya en el array
                        if (!(arrayProducciones.includes(produccionRandom))) {
                            arrayProducciones.push(produccionRandom);
                        } else {
                            i--;
                        }
                    }
                }
                
                return arrayProducciones;
            }

            /**
             * Añade un actor a la lista #actors
             * @param {*} actor 
             * @returns El nºde usuarios en la lista #actors
             */

            addActor(actor) {
                //Controla que el actor no sea igual a null
                if (actor === null) throw new isNull(" Actor ");
                //Controla que el actor sea una instancia de Person
                if (!(actor instanceof Person)) throw new NotThisType(actor.constructor.name);
                //Controla que el actor a añadir se encuentre ya en la lista
                let i = this.#actors.indexOf(actor);
                if (i != -1) throw new ElementFound(actor);

                //Si no existe en el map de actores y producciones, lo añado
                if (!(this.#ActorProduction.has(actor))) {
                    this.#ActorProduction.set(actor,[]);
                }

                this.#actors.push(actor);

                return this.#actors.length;
            }

            /**
             * Elimina un actor de la lista #actors
             * @param {*} actor 
             * @returns El nºde actores en la lista #actors
             */

            removeActor(actor) {
                //Controla que el actor no sea igual a null
                if (actor === null) throw new isNull(" Actor ");
                //Controla que el actor sea una instancia de Person
                if (!(actor instanceof Person)) throw new NotThisType(actor.constructor.name);
                //Controla que el actor a añadir se encuentre en la lista para poder eliminarla
                let i = this.#actors.indexOf(actor);
                if (i == -1) throw new NotFound404(actor);

                this.#actors.splice(i, 1);

                for (let produccion of this.productions) {
                    if (this.#ActorProduction.get(actor).includes(produccion)) {
                        this.deassignActor(actor,produccion);
                    }
                }

                return this.#actors.length;
            }

            //Iterador de producciones
            get actors() {
                let listActors = this.#actors;
                //Retorno el objeto [Symbol.iterator]
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < listActors.length; i++) {
                            yield listActors[i];
                        }
                    }
                }
            }

            /**
             * Añade un director a la lista #directors
             * @param {*} director 
             * @returns El nº de directores en la lista #directors
             */

            addDirector(director) {
                //Controla que el director no sea igual a null
                if (director === null) throw new isNull(" Person ");
                //Controla que el actor sea una instancia de Person
                if (!(director instanceof Person)) throw new NotThisType(director.constructor.name);
                //Controla que el actor a añadir se encuentre ya en la lista
                let i = this.#directors.indexOf(director);
                if (i != -1) throw new ElementFound(director);
                
                //Si no existe en el map de actores y producciones, lo añado
                if (!(this.#DirectorProduction.has(director))) {
                    this.#DirectorProduction.set(director,[]);
                }

                this.#directors.push(director);

                return this.#directors.length;
            }

            /**
             * Elimina un director de la lista #directors
             * @param {*} director 
             * @returns El nº de directores en la lista #directors
             */

            removeDirector(director) {
                //Controla que el actor no sea igual a null
                if (director === null) throw new isNull(" Person ");
                //Controla que el actor sea una instancia de Person
                if (!(director instanceof Person)) throw new NotThisType(director.constructor.name);
                //Controla que el actor a añadir se encuentre en la lista para poder eliminarla
                let i = this.#directors.indexOf(director);
                if (i == -1) throw new NotFound404(director);

                this.#directors.splice(i, 1);

                //Elimino relaciones con otros objetos
                for (let produccion of this.productions) {
                    if (this.#DirectorProduction.get(director).includes(produccion)) {
                        this.deassignDirector(director,produccion);
                    }
                }

                return this.#directors.length;
            }

            //Iterador de producciones
            get directors() {
                let listDirector = this.#directors;
                //Retorno el objeto [Symbol.iterator]
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < listDirector.length; i++) {
                            yield listDirector[i];
                        }
                    }
                }
            }

            /**
             * Asigno una o más producciones a una categoría
             * @param {*} categoria 
             * @param  {...any} producciones 
             * @returns 
             */

            assignCategory(categoria, ...producciones) {
                //Controla que la produccion no sea igual a null
                if (producciones.indexOf(null) != -1) throw new isNull(" Production ");
                //Controla que la categoria no sea igual a null
                if (categoria === null) throw new isNull(" Categoría ");

                for (let i = 0; i < producciones.length; i++) {
                    //Si no encuentra la producción en la lista, la añade
                    if ((this.#productions.indexOf(producciones[i])) == -1) {
                        this.addProduction(producciones[i]);
                    }
                }

                if ((this.#categories.indexOf(categoria)) == -1) {
                    //Si no encuentra la categoría en la lista, la añade
                    this.addCategory(categoria);
                }

                if (this.#CategoryProduction.has(categoria)) {
                    this.#CategoryProduction.get(categoria).push(...producciones);
                } else {
                    this.#CategoryProduction.set(categoria, []);
                    this.#CategoryProduction.get(categoria).push(...producciones);
                }

                return this.#CategoryProduction.get(categoria).length;
            }

            /**
             * Desasigno una o más producciones a una categoría
             * @param {*} categoria 
             * @param  {...any} producciones 
             * @returns 
             */

            deassignCategory(categoria, ...producciones) {
                //Controla que la produccion no sea igual a null
                if (producciones.indexOf(null) != -1) throw new isNull(" Production ");
                //Controla que la categoria no sea igual a null
                if (categoria === null) throw new isNull(" Categoría ");
                //Controla que exista la categoría para acceder a ella
                if (!(this.#CategoryProduction.has(categoria))) throw new DoesntExists(categoria.constructor.name);

                let posicion = -1;

                for (let i = 0; i < producciones.length; i++) {
                    posicion = this.#CategoryProduction.get(categoria).indexOf(producciones[i]);
                    //En caso de que se haya encontrado la categoria, se borrará la producción
                    if (posicion != -1) {
                        this.#CategoryProduction.get(categoria).splice(posicion, 1);
                    }
                }


                return this.#CategoryProduction.get(categoria).length;
            }

            //Iterador de producciones asignadas a una categoria
            getProductionsCategory(categoria) {
                //Controla que la categoria no sea igual a null
                if (categoria === null) throw new isNull(" Categoría ");

                let listProCat;

                for (let cLista of this.categorias) {
                    if (cLista.name == categoria) {
                        listProCat = this.#CategoryProduction.get(cLista);
                    }
                }

                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < listProCat.length; i++) {
                            yield listProCat[i];
                        }
                    }
                }
            }

            /**
             * Asigno una o más producciones a un director
             * @param {*} director 
             * @param  {...any} producciones 
             * @returns 
             */

            assignDirector(director, ...producciones) {
                //Controla que la produccion no sea igual a null
                if (producciones.indexOf(null) != -1) throw new isNull(" Production ");
                //Controla que la categoria no sea igual a null
                if (director === null) throw new isNull(" Categoría ");

                for (let i = 0; i < producciones.length; i++) {
                    if ((this.#productions.indexOf(producciones[i])) == -1) {
                        this.addProduction(producciones[i]);
                    }
                }

                if ((this.#directors.indexOf(director)) == -1) {
                    this.addDirector(director);
                }

                if (this.#DirectorProduction.has(director)) {
                    this.#DirectorProduction.get(director).push(...producciones);
                } else {
                    this.#DirectorProduction.set(director, []);
                    this.#DirectorProduction.get(director).push(...producciones);
                }

                return this.#DirectorProduction.get(director).length;
            }

            /**
             * Desasigno una o más producciones a un mismo director
             * @param {*} director 
             * @param  {...any} producciones 
             * @returns 
             */

            deassignDirector(director, ...producciones) {
                //Controla que la produccion no sea igual a null
                if (producciones.indexOf(null) != -1) throw new isNull(" Production ");
                //Controla que la categoria no sea igual a null
                if (director === null) throw new isNull(" Director ");
                //Controla que exista el director para acceder a ella
                if (!(this.#DirectorProduction.has(director))) throw new DoesntExists(director.constructor.name);

                let posicion = -1;

                for (let i = 0; i < producciones.length; i++) {
                    posicion = this.#DirectorProduction.get(director).indexOf(producciones[i]);
                    //En caso de que se haya encontrado al director, se borrará la producción
                    if (posicion != -1) {
                        this.#DirectorProduction.get(director).splice(posicion, 1);
                    }
                }


                return this.#DirectorProduction.get(director).length;
            }

            //Iterador de producciones asignadas a un director
            getProductionsDirector(director) {
                //Controla que la categoria no sea igual a null
                if (director === null) throw new isNull(" Categoría ");

                let listProDir = this.#DirectorProduction.get(director);
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < listProDir.length; i++) {
                            yield listProDir[i];
                        }
                    }
                }
            }

            /**
             * Asigno una o más producciones a un mismo actor
             * @param {*} actor 
             * @param  {...any} producciones 
             * @returns El nº de producciones asignadas a un mismo actor
             */

            assignActor(actor, ...producciones) {
                //Controla que la produccion no sea igual a null
                if (producciones.indexOf(null) != -1) throw new isNull(" Production ");
                //Controla que la categoria no sea igual a null
                if (actor === null) throw new isNull(" Categoría ");

                for (let i = 0; i < producciones.length; i++) {
                    if ((this.#productions.indexOf(producciones[i])) == -1) {
                        this.addProduction(producciones[i]);
                    }
                }

                if ((this.#actors.indexOf(actor)) == -1) {
                    this.addActor(actor);
                }

                if (this.#ActorProduction.has(actor)) {
                    this.#ActorProduction.get(actor).push(...producciones);
                } else {
                    this.#ActorProduction.set(actor, []);
                    this.#ActorProduction.get(actor).push(...producciones);
                }

                return this.#ActorProduction.get(actor).length;
            }

            /**
             * Desasigno una o más producciones a un mismo actor
             * @param {*} actor 
             * @param  {...any} producciones 
             * @returns El nº de producciones asignadas a un mismo actor
             */

            deassignActor(actor, ...producciones) {
                //Controla que la produccion no sea igual a null
                if (producciones.indexOf(null) != -1) throw new isNull(" Production ");
                //Controla que la categoria no sea igual a null
                if (actor === null) throw new isNull(" Director ");
                //Controla que exista la categoría para acceder a ella
                if (!(this.#ActorProduction.has(actor))) throw new DoesntExists(actor.constructor.name);

                let posicion = -1;

                for (let i = 0; i < producciones.length; i++) {
                    posicion = this.#ActorProduction.get(actor).indexOf(producciones[i]);
                    //En caso de que se haya encontrado al actor, se borrará la producción
                    if (posicion != -1) {
                        this.#ActorProduction.get(actor).splice(posicion, 1);
                    }
                }

                return this.#ActorProduction.get(actor).length;
            }

            /**
             * Obtendrá un iterador de las peliculas
             * asignadas a un actor 
             * @param {*} actor 
             * @returns 
             */
            getProductionsActor(actor) {
                //Controla que la categoria no sea igual a null
                if (actor === null) throw new isNull(" Actor ");

                let listProAct = this.#ActorProduction.get(actor);
                return {
                    *[Symbol.iterator]() {
                        for (let i = 0; i < listProAct.length; i++) {
                            yield listProAct[i];
                        }
                    }
                }
            }

            /**
             * Obtendrá un array de directores 
             * asignados a una producción
             * @param {*} production 
             * @returns 
             */
            getDirectorProduction(production) {
                let produccionDirector = [];

                for (let director of this.#directors) {
                    if (this.#DirectorProduction.get(director).includes(production)) {
                        produccionDirector.push(director);
                    }
                }

                return produccionDirector;
            }

            /**
             * Obtendrá un array de actores
             * asignados a una producción
             * @param {*} production 
             * @returns 
             */
            getActorsProduction(production) {
                let produccionActors = [];

                for (let actor of this.#actors) {
                    if (this.#ActorProduction.get(actor).includes(production)) {
                        produccionActors.push(actor);
                    }
                }

                return produccionActors;
            }

            /**
             * Obtendrá un objeto Production
             * a partir de su título
             * @param {*} title 
             * @returns 
             */
            findProductionByTitle(title) {
                let productionSelected;
                //Recorro todas las producciones añadidas
                for (let produccion of this.productions) {
                    //Busco la producción a partir del título obtenido
                    if (produccion.title.toUpperCase() == title.toUpperCase()) {
                        productionSelected = produccion;
                    }
                };

                return productionSelected;
            }

            //Busca a un actor por su nombre y su primer apellido
            //Devuelve el objeto person con todos sus atributos
            findActorByNameLastname(person){
                let actorSelected;

                for (let actor of this.actors) {
                    if ((person.name == actor.name) && (person.lastname1 == actor.lastname1)) {
                        actorSelected = actor;
                    }
                }

                return actorSelected;
            }

            //Busca a un director por su nombre y su primer apellido
            //Devuelve el objeto person con todos sus atributos
            findDirectorByNameLastname(person){
                let directorSelected;

                for (let director of this.directors) {
                    if ((person.name == director.name) && (person.lastname1 == director.lastname1)) {
                        directorSelected = director;
                    }
                }

                return directorSelected;
            }

            //Busca la categoría por el nombre
            findCategoryByName(categoria){
                let categorySelected;

                for (let category of this.categories) {
                    if (category.name == categoria) {
                        categorySelected = category;
                    }
                }
                
                return categorySelected;
            }

            //Busca al director por su posición en el array
            findDirectorByPosition(position){
                let contador = 0;
                let directorSelected;

                for (let director of this.directors) {
                    if (contador == position) {
                        directorSelected = director;
                        break;
                    }
                    contador++;
                }
                return directorSelected;
            }

            //Busca al actor por su posición en el array
            findActorByPosition(position){
                let contador = 0;
                let actorSelected;

                for (let actor of this.actors) {
                    if (contador == position) {
                        actorSelected = actor;
                        break;
                    }
                    contador++;
                }
                return actorSelected;
            }

            //Busca la categoría por su posición en el array
            findCategoryByPosition(position){
                let contador = 0;
                let categorySelected;

                for (let category of this.categorias) {
                    if (contador == position) {
                        categorySelected = category;
                        break;
                    }
                    contador++;
                }
                return categorySelected;
            }
        }

        let instance = new VideoSystem(name);
        Object.freeze(instance);

        return instance;
    }
    return {
        // Devuelve un objeto con el método getInstance
        getInstance: function (name) {
            if (!instantiated) {
                instantiated = init(name);
            }
            return instantiated;
        }
    };
})();

export default VideoSystem;