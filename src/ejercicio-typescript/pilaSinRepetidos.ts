import { Pila } from "./pila.js";

class PilaSinRepetidos<T> extends Pila<T> {

    push(elemento: T): boolean {
        if(!this.contiene(elemento)) {
            super.push(elemento);
            return true;
        } else {
            console.log(`El elemento "${elemento}" ya existe en la pila y no será agregado.`);
            return false;
        }
    }
}

export { PilaSinRepetidos };
