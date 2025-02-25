# TheLab-Coding-Hub

Alumno: Hernán Caparros

Proyecto: Sistema de Gestión de Eventos

Una vez ejecutado el proyecto, al único componente que podés acceder es al del login. Si no estás logueado, al ingresar al path de cualquier otro componente se te va a redireccionar al login, así como también cualquier petición realizada a la api del backend que requiera estar logueado será rechazada en caso de que no lo estés.
El login tiene 2 botones: uno para ingresar en caso de que ya estés registrado, y uno para crear una cuenta. Una vez adentro del sistema, el comportamiento cambia según el tipo de usuario:
- Tipo 'Usuario': Los usuarios de tipo 'usuario' van a ver la lista de eventos disponibles y los datos del evento, y un botón para poder inscribirse en cada evento que desee. Las cuentas creadas a través del botón "Crear nueva cuenta" son todas de tipo 'Usuario'. Y así como hay una protección tanto para visualizar componentes como para realizar peticiones a la api si el usuario no está logueado, también hay una protección similar para que un usuario de este tipo no pueda acceder ni a los componentes ni a las peticiones que requieren que el usuario sea de tipo 'Admin'. 
- Tipo 'Admin':  Los usuarios de tipo 'Admin' tienen acceso a todas las características de los tipo 'Usuario', pero además tienen accesos adicionales: en la pantalla de eventos van a aparecer botones para Agregar nuevos eventos, así también como para Editar o Borrar los eventos existentes. También en el Header de la aplicación va a aparecer un botón 'Usuarios' que lleva al admin al componente que muestra la lista de usuarios creados, con botones para agregar, borrar y editar usuarios (a diferencia del formulario que se accede desde el login, el formulario al que accede el 'Admin' tiene un campo extra en el que puede elegir el tipo de usuario).

Por último, la lógica de las inscripciones es bastante sencilla: cada evento tiene un botón que cambia dependiendo si el usuario está inscripto (el botón te permite cancelar la inscripción) o no (el botón te permite inscribirte al evento). Los eventos tienen una cantidad de cupos disponibles, cada vez que un usuario se inscribe al evento, esa cantidad de cupos se reduce en 1, y cuando cancela la inscripción el cupo aumenta en 1. Un evento con 0 cupos disponibles no te permite inscribirte.
