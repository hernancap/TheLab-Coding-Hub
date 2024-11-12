import { Pila } from "./pila.js";
import { PilaSinRepetidos } from "./pilaSinRepetidos.js";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function elegirPila(): Promise<string> {
    let opcion: string;

    while (true) {
        console.log("Elige una pila: \n 1- Pila normal \n 2- Pila sin repetidos");

        opcion = await new Promise((resolve) => {
            rl.question("Opción: \n", (input) => {
                resolve(input);
            });
        });

        if (opcion === "1" || opcion === "2") {
            break;
        } else {
            console.log("Opción inválida. Por favor, elige una opción válida.");
        }
    }

    return opcion;
}

async function elegirDato(): Promise<string> {
    let opcion: string;

    while (true) {
        console.log("Elige un tipo de dato: \n 1- String \n 2- Number \n 3- Boolean");

        opcion = await new Promise((resolve) => {
            rl.question("Opción: \n", (input) => {
                resolve(input);
            });
        });

        if (opcion === "1" || opcion === "2" || opcion === "3") {
            break;
        } else {
            console.log("Opción inválida. Por favor, elige una opción válida.");
        }
    }
    return opcion;
}

async function agregarElemento(pila: Pila<any> | PilaSinRepetidos<any>, tipoDato: string) {
    let elemento: string;

    elemento = await new Promise((resolve) => {
        rl.question("Ingresa el elemento a agregar: \n", (input) => {
            resolve(input);
        });
    });

    let agregado = false;

    if (tipoDato === "1") {
        if (isNaN(Number(elemento))) {
            agregado = pila.push(elemento);
        } else {
            console.log("Error: El tipo de dato no es válido. Se esperaba un string.");
        }
    } else if (tipoDato === "2") {
        const num = parseFloat(elemento);
        if (!isNaN(num)) {
            agregado = pila.push(num);
        } else {
            console.log("Error: El tipo de dato no es válido. Se esperaba un número.");
        }
    } else if (tipoDato === "3") {
        const booleano = elemento.toLowerCase() === "true" || elemento.toLowerCase() === "false";
        if (booleano) {
            agregado = pila.push(elemento.toLowerCase() === "true");
        } else {
            console.log("Error: El tipo de dato no es válido. Se esperaba un booleano.");
        }
    }

    if (agregado) {
        console.log(`Elemento "${elemento}" agregado.`);
    }
}

async function quitarElemento(pila: Pila<any> | PilaSinRepetidos<any>) {
    const elemento = pila.pop();
    if (elemento === undefined) {
        console.log("La pila está vacía.");
    } else {
        console.log(`Elemento "${elemento}" quitado.`);
    }
}

function mostrarTamaño(pila: Pila<any> | PilaSinRepetidos<any>) {
    console.log(`Cantidad de elementos en la pila: ${pila.size()}`);
}

async function main() {
    const tipoPila = await elegirPila();
    const tipoDato = await elegirDato();

    let pila: Pila<any> | PilaSinRepetidos<any>;
    if (tipoPila === "1") {
        pila = new Pila();
    } else {
        pila = new PilaSinRepetidos();
    }

    while (true) {
        console.log("\n¿Qué quieres hacer?");
        console.log("1- Agregar elemento");
        console.log("2- Quitar elemento");
        console.log("3- Ver cantidad de elementos");
        console.log("4- Salir");

        const opcion = await new Promise((resolve) => {
            rl.question("Opción: \n", (input) => {
                resolve(input);
            });
        });

        if (opcion === "1") {
            await agregarElemento(pila, tipoDato);
        } else if (opcion === "2") {
            await quitarElemento(pila);
        } else if (opcion === "3") {
            mostrarTamaño(pila);
        } else if (opcion === "4") {
            break;
        } else {
            console.log("Opción inválida. Por favor, elige una opción válida.");
        }
    }

    rl.close();
}

main();
