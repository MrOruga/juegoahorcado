//Asignación de botones HTML a variables en JavaScript.

var botonIniciar = document.querySelector(".boton_iniciar");
var botonAgregarPalabra = document.querySelector(".boton_agregar_palabra");
var botonGuardar = document.querySelector(".boton_guardar");
var botonBorrar = document.querySelector(".boton_borrar");
var botonVolver = document.querySelector(".boton_volver");
var botonNuevoJuego = document.querySelector(".boton_nuevo_juego");
var botonSalir = document.querySelector(".boton_salir");
var botonMenu = document.querySelector(".boton_menu");
var botonCerrar = document.querySelector(".boton_cerrar");


//Asignación de cajas input HTML a variable JS.

var inputAgregarPalabra = document.querySelector(".input_agregar_palabra");
var inputMensajeGanador = document.querySelector(".input_mensaje_ganador");
var inputMensajePerdedor = document.querySelector(".input_mensaje_perdedor");

//Funciones para moverse entre las distintas pantallas.

function ocultarElementos(clase) {
  document.querySelector(clase).style.display = "none";
}

function mostrarElementos(clase) {
  document.querySelector(clase).style.display = "inherit";
}

function irPantallaInicio() {

  ocultarElementos(".pantalla_partida");
  ocultarElementos(".pantalla_agregar_palabra");
  mostrarElementos(".pantalla_inicial");
}

function irPantallaAgregar() {

  ocultarElementos(".pantalla_inicial");
  mostrarElementos(".pantalla_agregar_palabra");
  inputAgregarPalabra.focus();
}

function irPantallaJuego() {

  ocultarElementos(".pantalla_inicial");
  mostrarElementos(".pantalla_partida");
}

function iniciarNuevaPartida() {

  ocultarElementos(".input_mensaje_ganador");

  ocultarElementos(".input_mensaje_perdedor");

  irPantallaJuego();

  palabraSecreta = crearPalabraSecreta();

  palabraDesarmada = desarmarPalabra(palabraSecreta);

  limpiarTablero(0, 0, 600, 500);

  mostrarGuiones(palabraDesarmada.length);

  letrasPresionadas = [];

  letrasAdivinadas = Array(palabraDesarmada.length);

  letrasIncorrectas = [];

  inicioJuego = true;
}

function finalizarPartida() {

  var consulta = prompt("¿Está seguro que desea abandonar la partida?: si (presione s) - no (presione n)");

  if (consulta == "s") {

    irPantallaInicio();

    ocultarElementos(".input_mensaje_ganador");

    ocultarElementos(".input_mensaje_perdedor");

    inicioJuego = false;
  }
}

//Funciones del boton menu caracteristcas-version.

function abrirMenu() {
  document.querySelector(".menu").style.display = "inherit";
}

function cerrarMenu() {
  document.querySelector(".menu").style.display = "none";
}


//Sentencias que desarrollan los botones al hacer click sobre ellos.

botonIniciar.onclick = iniciarNuevaPartida;
botonAgregarPalabra.onclick = irPantallaAgregar;
botonNuevoJuego.onclick = iniciarNuevaPartida;
botonSalir.onclick = finalizarPartida;
botonMenu.onclick = abrirMenu;
botonCerrar.onclick = cerrarMenu;