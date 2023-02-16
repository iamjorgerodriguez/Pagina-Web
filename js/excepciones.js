class BaseException extends Error {
    constructor(message = "", fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = "BaseException";
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseException)
        }
    }
}

/**
 * Excepción que aparecerá en caso
 * de intentar instanciar una clase
 * abstracta
 */

class AbstractClass extends BaseException {
    constructor(clase,fileName, lineNumber) {
        super("La clase "+clase+" no puede ser instanciada.", fileName, lineNumber);
        this.name = "AbstractClass";
    }
}

/**
 * 
 */

class NotThisType extends BaseException {
    constructor(clase,fileName, lineNumber) {
        super("El elemento a añadir/eliminar no puede ser un/una "+clase, fileName, lineNumber);
        this.name = "NotThisType";
    }
}

//Aparecerá cuando se intente añadir o eliminar un objeto igual a null
class isNull extends BaseException {
    constructor(clase,fileName, lineNumber) {
        super("No se puede añadir o eliminar un objeto igual a null", fileName, lineNumber);
        this.name = "NotThisType";
    }
}

//Aparecerá cuando se intente borrar un elemento (categoria,persona,producción...) y no se encuentre en la lista
class NotFound404 extends BaseException{
    constructor(elem,fileName, lineNumber) {
        super(elem+" no se encuentra en la lista", fileName, lineNumber);
        this.name = "NotFound404";
    }
}

//Aparecerá cuando se intente añadir un elemento que ya se encuentra en la lista
class ElementFound extends BaseException{
    constructor(elem,fileName, lineNumber) {
        super("El elemento "+elem+"YA SE ENCUENTRA EN LA LISTA", fileName, lineNumber);
        this.name = "ElementFound";
    }
}

//Aparecerá cuando se intente añadir un usuario con el nombre ya añadido a la lista
class SameName extends BaseException{
    constructor(nombre,fileName, lineNumber) {
        super("El usuario "+nombre+" ya se encuentra registrado", fileName, lineNumber);
        this.name = "SameName";
    }
}

//Aparecerá cuando se intente añadir un usuario con el email ya registrado
class SameEmail extends BaseException{
    constructor(email,fileName, lineNumber) {
        super("El email "+email+" ya se encuentra registrado", fileName, lineNumber);
        this.name = "SameEmail";
    }
}

//Aparecerá cuando se intente desasignar una o más producciones y no se encuentren añadidas
class DoesntExists extends BaseException{
    constructor(clase,fileName, lineNumber) {
        super("El/La "+clase+" no se encuentra asignado/a a otras producciones.", fileName, lineNumber);
        this.name = "DoesntExists";
    }
}

export {BaseException,AbstractClass,NotThisType,NotFound404,ElementFound,SameEmail,SameName,DoesntExists,isNull};