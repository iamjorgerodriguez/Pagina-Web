function showFeedBack(input, valid, message) {
    let validClass = (valid) ? 'is-valid' : 'is-invalid';
    let div = (valid) ? input.nextAll("div.valid-feedback") : input.nextAll("div.invalid-feedback");
    input.nextAll('div').removeClass('d-block');
    div.removeClass('d-none').addClass('d-block');
    input.removeClass('is-valid is-invalid').addClass(validClass);
    if (message) {
        div.empty();
        div.append(message);
    }
}

function defaultCheckElement(event) {
    this.value = this.value.trim();
    if (!this.checkValidity()) {
        showFeedBack($(this), false);
    } else {
        showFeedBack($(this), true);
    }
}

function addProductionValidation (handler, handler2) {
    let form = document.forms.fAddProduction;
    $(form).attr('novalidate', true);

    $(form).submit(function (event) {
        event.preventDefault();
        let isValid = true;
        //Compruebo que no se haya mandado un valor con solo espacios en blanco
        let title = this.fTitle.value.trim();
        let nationality = this.fNationality.value.trim();
        let synopsis = this.fSynopsis.value.trim();
        //Compruebo que en el campo de temporadas solo se añadan numeros
        let patron = /^([0-9])*$/;

        if (!this.fTitle.checkValidity() || title == "") {
            isValid = false;
            showFeedBack($(this.fTitle), false);
        } else {
            showFeedBack($(this.fTitle), true);
        }

        if (!this.fNationality.checkValidity() || nationality == "") {
            isValid = false;
            showFeedBack($(this.fNationality), false);
        } else {
            showFeedBack($(this.fNationality), true);
        }

        if (!this.fPublication.checkValidity()) {
            isValid = false;
            showFeedBack($(this.fPublication), false);
        } else {
            showFeedBack($(this.fPublication), true);
        }

        if (!this.fImage.checkValidity()) {
            isValid = false;
            showFeedBack($(this.fImage), false);
        } else {
            showFeedBack($(this.fImage), true);
        }

        if (!this.fSynopsis.checkValidity() || synopsis == "") {
            isValid = false;
            showFeedBack($(this.fSynopsis), false);
        } else {
            showFeedBack($(this.fSynopsis), true);
        }

        if (this.fDirector.value == "disabled") {
            isValid = false;
            showFeedBack($(this.fDirector), false);
        } else {
            showFeedBack($(this.fDirector), true);
        }

        if (this.fActor.value == "disabled") {
            isValid = false;
            showFeedBack($(this.fActor), false);
        } else {
            showFeedBack($(this.fActor), true);
        }

        //Compruebo si los actores son los mismos cuando fActor2 es distinto al valor por defecto
        if ((this.fActor2.value != "disabled") && (this.fActor2.value == this.fActor.value)) {
            isValid = false;
            showFeedBack($(this.fActor2), false);
        }

        if (this.fCategory.value == "disabled") {
            isValid = false;
            showFeedBack($(this.fCategory), false);
        } else {
            showFeedBack($(this.fCategory), true);
        }

        //Compruebo si las categorías son las mismas cuando fCategory2 es distinta al valor por defecto
        if ((this.fCategory2.value != "disabled") && (this.fCategory.value == this.fCategory2.value)) {
            isValid = false;
            showFeedBack($(this.fCategory2), false);
        }

        if(this.fCheck.value == ""){
            isValid = false;
            showFeedBack($(this.fCheck), false);
        }else {
            showFeedBack($(this.fCheck), true);
        }

        //Solo lo comprobará en caso de que el check seleccionado sea el de Serie
        if((this.fCheck.value == "Serie") && ((this.fSeasons.value == "") || (!patron.test(this.fSeasons.value)))){
            isValid = false;
            showFeedBack($(this.fSeasons), false);
        }

        if (isValid) {
            //Compruebo si la película ya existe
            if (handler2(title)) {
                showFeedBack($(this.fSubmit), false);
            }else{
                let production = {
                    title: title,
                    nationality: nationality,
                    publication: this.fPublication.value,
                    synopsis: synopsis,
                    image: this.fImage.value
                }
                //Si el check seleccionado es una serie, le asigno la propiedad de las temporadas
                if (this.fCheck.value == "Serie") {
                    production.seasons = this.fSeasons.value;
                }

                let director = this.fDirector.value;
                let actors = [this.fActor.value];
                //Si un segundo actor ha sido seleccionado, lo meto en el array
                if (this.fActor2.value != "disabled") {actors.push(this.fActor2.value)};
                let categories = [this.fCategory.value];
                //Si una segunda categoría ha sido seleccionada, la meto en el array
                if (this.fCategory2.value != "disabled") {categories.push(this.fCategory2.value)};

                handler(production, director, actors, categories);
            }
        }
    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));
}

function assignPersonValidation(handler, handler2) {
    let form = document.forms.fAssignProduction;
    $(form).attr('novalidate', true);

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        if (this.fSelPerson.value == "disabled") {
            isValid = false;
            showFeedBack($(this.fSelPerson), false);
            firstInvalidElement = this.fSelPerson;
        } else {
            showFeedBack($(this.fSelPerson), true);
        }

        if (form.fSelProduction.value == "disabled") {
            isValid = false;
            showFeedBack($(this.fSelProduction), false);
            firstInvalidElement = this.fSelProduction;
        } else {
            showFeedBack($(this.fSelProduction), true);
        }

        if (isValid) {
            let found;
            let button = document.getElementById("submit-assign").getAttribute("data-option");
            let production = document.getElementById("select-production").value;
            let person = document.getElementById("select-people").value.split(" ");
            let personSelected = {
                name: person[0],
                lastname1: person[1]
            }
            //Buscará si la producción se encuentra ya asignada
            //Si lo ha encontrado será true, si no falso
            found = handler2(production, personSelected, button);

            if (!found) {
                handler(personSelected, production, button);
            } else {
                showFeedBack($(this.fSubmitt), false);
            }
        }
        
        event.preventDefault();
        event.stopPropagation();
    })
}

function deassignPersonValidation(handler) {
    let opcion = document.getElementById("submit-deassign").getAttribute("data-option");
    let form = document.forms.fDeassignProduction;
    $(form).attr('novalidate', true);

    $(form).submit(function (event) {
        let isValid = true;
        let firstInvalidElement = null;
        let pelicula = document.getElementById("select-production").value;

        if (pelicula == "disabled") {
            isValid = false;
            showFeedBack($(this.fSelProduction), false);
            firstInvalidElement = this.fSelProduction;
        } else {
            showFeedBack($(this.fSelProduction), true);
        }

        if (form.fSelPerson.value == "disabled") {
            isValid = false;
            showFeedBack($(this.fSelPerson), false);
            firstInvalidElement = this.fSelPerson;
        } else {
            showFeedBack($(this.fSelPerson), true);
        }

        if (isValid == true) {
            let nombreCompleto = form.fSelPerson.value.split(" ");
            let person = {
                name: nombreCompleto[0],
                lastname1: nombreCompleto[1]
            };

            handler(person, pelicula, opcion);
        } if (isValid == false) {
            firstInvalidElement.focus();
        }

        event.preventDefault();
        event.stopPropagation();
    });
}

function addCategoryValidation(handler, handler2) {
    let form = document.forms.fAddCategory;
    $(form).attr('novalidate', true);

    $(form).submit(function (event) {
        let isValid = true;
        let name = this.fName.value.trim();
        let description = this.fDescription.value.trim();

        if (!this.fName.checkValidity() || name == "") {
            isValid = false;
            showFeedBack($(this.fName), false);
        } else {
            showFeedBack($(this.fName), true);
        }

        if (!this.fURL.checkValidity()) {
            isValid = false;
            showFeedBack($(this.fURL), false);
        } else {
            showFeedBack($(this.fURL), true);
        }

        if (!this.fDescription.checkValidity() || description == "") {
            isValid = false;
            showFeedBack($(this.fDescription), false);
        } else {
            showFeedBack($(this.fDescription), true);
        }

        if (isValid) {
            //Busca si la categoría se encuentra ya añadida
            if (handler2(name)) {
                showFeedBack($(this.fSubmitt), false);
            } else {
                let category = {
                    name: name,
                    description: description,
                    image: this.fURL.value
                }

                handler(category);
            }
        }

        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));
}

//Valida el formulario para añadir personas
function addPersonValidation(handler, handler2) {
    let form = document.forms.fAddPerson;
    $(form).attr('novalidate', true);

    $(form).submit(function (event) {
        let isValid = true;
        let name = this.fName.value.trim();
        let surname1 = this.fSurname1.value.trim();

        if (!this.fName.checkValidity() || name == "") {
            isValid = false;
            showFeedBack($(this.fName), false);
        } else {
            showFeedBack($(this.fName), true);
        }

        if (!this.fSurname1.checkValidity() || surname1 == "") {
            isValid = false;
            showFeedBack($(this.fSurname1), false);
        } else {
            showFeedBack($(this.fSurname1), true);
        }

        if (!this.fSurname2.checkValidity()) {
            isValid = false;
            showFeedBack($(this.fSurname2), false);
        } else {
            showFeedBack($(this.fSurname2), true);
        }

        if (!this.fBorn.checkValidity()) {
            isValid = false;
            showFeedBack($(this.fBorn), false);
        } else {
            showFeedBack($(this.fBorn), true);
        }

        if (!this.fURL.checkValidity()) {
            isValid = false;
            showFeedBack($(this.fURL), false);
        } else {
            showFeedBack($(this.fURL), true);
        }

        if(this.fCheck.value == ""){
            isValid = false;
            showFeedBack($(this.fCheck), false);
        }else{
            showFeedBack($(this.fCheck), true);
        }

        if (isValid) {
            //Sustituyo los espacios en blanco que pueda haber en el nombre y en el apellido por un guión
            name = name.replace(/ /g, "-");
            surname1 = surname1.replace(/ /g, "-");

            let person = {
                name: name,
                lastname1: surname1 
            }

            //Si devuelve true, es que la persona ya se encuentra en el Video System
            if (handler2(person,this.fCheck.value)) {
                showFeedBack($(this.fSubmitt), false);
            }else{
                let personAdd = {
                    name: name,
                    lastname1: surname1,
                    lastname2: this.fSurname2.value.trim(),
                    born: this.fBorn.value,
                    picture: this.fURL.value.trim()
                }
                //Añado a la persona al VideoSystem
                handler(personAdd, this.fCheck.value);   
            }
        }

        event.preventDefault();
        event.stopPropagation();
    });

    form.addEventListener('reset', (function (event) {
        let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
        feedDivs.removeClass('d-block').addClass('d-none');
        let inputs = $(this).find('input');
        inputs.removeClass('is-valid is-invalid');
    }));
}

export {addProductionValidation ,deassignPersonValidation, addCategoryValidation, assignPersonValidation, addPersonValidation };