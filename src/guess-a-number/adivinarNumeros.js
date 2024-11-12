import readline from "readline";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

console.log("Bienvenido al juego de adivinar números");

let intentosMaximos;
let intentos;

async function adivinarNum() {
	let jugar = true;

	while (jugar) {
		const numAleatorio = Math.floor(Math.random() * 100) + 1;
		let adivinado = false;

		let dificultad;
		intentos = 0;

		do {
			console.log("Elige la dificultad del juego: \n 1- Fácil (15 intentos) \n 2- Medio (10 intentos) \n 3- Dificil (5 intentos)");
			dificultad = await new Promise((resolve) => {
				rl.question("Opción: \n", (dificultad) => {
					resolve(parseInt(dificultad));
				});
			});

			switch (dificultad) {
				case 1:
					intentosMaximos = 15;
					break;
				case 2:
					intentosMaximos = 10;
					break;
				case 3:
					intentosMaximos = 5;
					break;
				default:
					console.log("El dato ingresado no es válido.");
					break;
			}
		} while (isNaN(dificultad) || dificultad < 1 || dificultad > 3);

		console.log(`Dificultad seleccionada. Tenés ${intentosMaximos} intentos. `);

		while (intentos < intentosMaximos && !adivinado) {
			let numIngresado = await new Promise((resolve) => {
				rl.question(`(Intento ${intentos + 1}/${intentosMaximos}) Ingrese un número entre 1 y 100: \n`, (numIngresado) => {
						resolve(parseInt(numIngresado));
					}
				);
			});

			if (isNaN(numIngresado) || numIngresado < 1 || numIngresado > 100) {
				console.log("El dato ingresado no es válido.");
				continue;
			}

			if (numIngresado === numAleatorio) {
				console.log(`¡Felicitaciones!. El número era ${numAleatorio}. `);
				adivinado = true;
			} else if (numIngresado < numAleatorio) {
				console.log(`El número es mayor a ${numIngresado}. `);
				intentos++;
			} else {
				console.log(`El número es menor a ${numIngresado}. `);
				intentos++;
			}
		}

		if (!adivinado) {
			console.log(`No te quedan más intentos. El número era ${numAleatorio}.`);
		}

		jugar = await new Promise((resolve) => {
			rl.question("Querés jugar de nuevo? (s/n): ", (respuesta) => {
				resolve(respuesta.toLowerCase() === "s");
			});
		});
	}

	rl.close();
}

adivinarNum();
