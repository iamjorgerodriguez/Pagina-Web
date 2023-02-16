"use strict";

import{NotThisType, AbstractClass} from './excepciones.js';

class Person {
    #name;
    #lastname1;
    #lastname2;
    #born;
    #picture;

    constructor(name, lastname1, lastname2 = "", born, picture = "") {
        this.#name = name;
        this.#lastname1 = lastname1;
        this.#lastname2 = lastname2;
        this.#born = born;
        this.#picture = picture;
    }

    //Getters

    get name() {
        return this.#name;
    }

    get born() {
        return this.#born;
    }

    toString() {
        return this.#name + " - " + this.#lastname1 + " - " + this.#lastname2 + " - " + this.#born.toLocaleDateString() + " - " + this.#picture;
    }
}

class Category {
    #name;
    #description;

    constructor(name, description = "") {

        this.#name = name;
        this.#description = description;
    }

    get name() {
        return this.#name;
    }


    get description() {
        return this.#description;
    }

    toString() {
        return "Category:\r\nNombre:"+this.#name + "\r\nDescripción " + this.#description+"\n\n";
    }
}

class Resource {
    #duration;
    #link;

    constructor(duration, link) {
        this.#duration = duration;
        this.#link = link;
    }

    toString() {
        return "Resource:\r\nDuración:"+this.#duration + "\r\nRuta de la película " + this.#link;
    }
}

class Production {
    #title;
    #nationality;
    #publication;
    #synopsis;
    #image;

    constructor(title, nationality = "", publication, synopsis = "", image = "") {
        //Comprobará que no se instancian objetos de esta clase
        if (new.target === Production) throw new AbstractClass(this.constructor.name);

        this.#title = title;
        this.#nationality = nationality;
        this.#publication = publication;
        this.#synopsis = synopsis;
        this.#image = image;
    }

    get title(){
        return this.#title;
    }

    get nationality(){
        return this.#nationality;
    }

    get publication(){
        return this.#publication;
    }

    get synopsis(){
        return this.#synopsis;
    }

    get image(){
        return this.#image;
    }

    toString() {
        return "Título:"+this.#title + "\r\nNacionalidad: " + this.#nationality+ "\r\Publicación: " + this.#publication.toLocaleDateString()+ "\r\nSinopsis: " + this.#synopsis+ "\r\nRuta Imagen: " + this.#image;
    }
}

class Movie extends Production {
    #resource;
    #locations;

    constructor(title, nationality, publication, synopsis, image, resource = new Resource, locations = new Coordinate) {
        //Excepción que controla que locations sea una instancia de locations
        if (!(locations instanceof Coordinate)) throw new NotThisType();
        // Excepción que controla que resource sea una instancia de Person
        if (!(resource instanceof Resource)) throw new NotThisType();

        super(title, nationality, publication, synopsis, image)
        this.#resource = resource;
        this.#locations = locations;
    }

    toString() {
        return super.toString()+"\r\nMovie:\r\nResource:"+this.#resource + "\r\nLocalizaciones: " + this.#locations;
    }
}

class Serie extends Production {
    #resources;
    #locations;
    #seasons;

    constructor(title, nationality, publication, synopsis, image, resource = new Resource, locations = new Coordinate, seasons = "") {
        // Excepción que controla que locations sea una instancia de Coordinate
        if (!(locations instanceof Coordinate)) throw new NotThisType();
        // Excepción que controla que resource sea una instancia de Person
        if (!(resource instanceof Resource)) throw new NotThisType();

        super(title, nationality, publication, synopsis, image);
        this.#resources = resource;
        this.#locations = locations;
        this.#seasons = seasons;
    }

    get seasons(){
        return this.#seasons;
    }

    toString() {
        return super.toString()+"\r\nMovie:\r\n Resource:"+this.#resources + "\r\nLocalizaciones: " + this.#locations + "\r\nTemporadas: "+this.#seasons;
    }
}

class User {
    #username;
    #email;
    #password;

    constructor(username, email, password) {
        this.#username = username;
        this.#email = email;
        this.#password = password;
    }

    //Getters

    get username() {
        return this.#username;
    }

    get email() {
        return this.#email;
    }

    toString(){
        return "User: \r\nNombre de Usuario: "+this.#username+"\r\nEmail: "+this.#email + "\r\nContraseña: "+this.#password;
    }
}

class Coordinate {
    #latitude;
    #longitude;

    constructor(latitude, longitude) {
        this.#latitude = latitude;
        this.#longitude = longitude;
    }

    toString(){
        return "\r\nCoordinate: \r\nLatitud: "+this.#latitude+"\r\nLongitud: "+this.#longitude;
    }
}

export{Person,Category,Resource,Production,Movie,Serie,User,Coordinate};