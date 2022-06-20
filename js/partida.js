//Variable con las palabras secretas por defecto.

var palabrasSecretas = ["HTML", "FUNCION", "ALURA", "ORACLE", "PROGRAMA", "AHORCADO", "VARIABLE", "CODIGO", "LOGICA", "ESTILOS"];

//Otras variables para palabra secreta.

var palabraSecreta = "";

var palabraDesarmada = [];

var palabrasUsadas = [];

var letrasPresionadas = [];

var letrasAdivinadas = [];

var letrasIncorrectas = [];

var inicioJuego = false;

//Variables para definir tablero canvas.

var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");

var colorMunheco = "#0a3871";

//Variables para dibujar el muñeco.

var rectanguloBase = dibujarRectangulo(220, 280, 160, 5);

var rectanguloPoste = dibujarRectangulo(250, 82.4, 5, 200);

var rectanguloVertical = dibujarRectangulo(250, 82.4, 99, 5);

var rectanguloColgado = dibujarRectangulo(349, 82.4, 5, 20);

var circuloCabeza = dibujarCirculo(351, 123, 20);

var rectanguloTronco = dibujarRectangulo(349, 143.5, 4.6, 60);

var rectanguloPiernaIzq = dibujarRectanguloInclinado(349, 203.5, 326, 237.5, 329, 241, 354, 203.5);

var rectanguloPiernaDer = dibujarRectanguloInclinado(354, 203.5, 377, 237.5, 374, 241, 349, 203.5);

var rectanguloBrazoIzq = dibujarRectanguloInclinado(349, 158, 326, 192, 329, 195.5, 354, 158);

var rectanguloBrazoDer = dibujarRectanguloInclinado(354, 158, 377, 192, 374, 195.5, 349, 158);

//Funciones.

function crearPalabraSecreta() {

  if (palabrasSecretas.length == 0) {

    var consulta = prompt("Ha utilizado todas las palabras disponibles. ¿Desea volver a jugar?: si (presione s) - no (presione n)");

    if (consulta == "s") {
    
    palabrasSecretas = palabrasUsadas;

    palabrasUsadas = [];

    } else {

      irPantallaInicio();

      ocultarElementos(".input_mensaje_ganador");

      ocultarElementos(".input_mensaje_perdedor");

      inicioJuego = false;
    }
  }

  var i = Math.floor(Math.random() * palabrasSecretas.length);

  var palabraSecreta = palabrasSecretas[i];

  palabrasUsadas.push(palabraSecreta);

  palabrasSecretas.splice(i,1);

  return palabraSecreta;
}

function desarmarPalabra(palabra) {

  let palabraDesarmada = palabra.split("");

  return palabraDesarmada;
}

function verificarLetraIngresada(letra) {

  var cumpleVerificacion = true;

  if (/[^A-Za-z]/.test(letra)) {

    alert("Recuerde ingresar solo letras. Intente de nuevo...");

    cumpleVerificacion = false;

  } else {

    for (let i = 0; i < letrasPresionadas.length; i++) {

      if (letra == letrasPresionadas[i]) {

        alert("La letra ingresada ya ha sido utilizada. Intente con otra...!!!");

        cumpleVerificacion = false;

        break;
      }
    }
  }
  if (cumpleVerificacion == true) {

    letrasPresionadas.push(letra);

    comprobarAciertoLetra(letra);
  }
}

function comprobarAciertoLetra(letra) {

  var letraAcertada = false;

  for (var i = 0; i < palabraDesarmada.length; i++) {

    if (letra == palabraDesarmada[i]) {

      adicionarLetraCorrecta(i, letra);

      dibujarLetraCorrecta();

      letraAcertada = true;

      if (letrasAdivinadas.join("") == palabraSecreta) {

        inputMensajeGanador.value = "Ganaste. ¡¡Felicitaciones!!";

        mostrarElementos(".input_mensaje_ganador");

        inicioJuego = false;
      }

      console.log("indice coincidencia= " + i);
    }
  }

  if (letraAcertada == false) {

    letrasIncorrectas.push(letra);

    dibujarLetraIncorrecta();

    dibujarHorca(letrasIncorrectas.length);
    
    if (letrasIncorrectas.length == 10) {

      inputMensajePerdedor.value = "Perdiste. Fin del juego. La palabra secreta era: " + palabraSecreta;

      mostrarElementos(".input_mensaje_perdedor");

      inicioJuego = false;
    }
  }
}

function adicionarLetraCorrecta(indice, letra) {

  letrasAdivinadas[indice] = letra;
}

function dibujarHorca(numeroError) {

  switch (numeroError) {

    case 1: dibujarRectangulo(220, 280, 160, 5); break;

    case 2: dibujarRectangulo(250, 82.4, 5, 200); break;

    case 3: dibujarRectangulo(250, 82.4, 99, 5); break;

    case 4: dibujarRectangulo(349, 82.4, 5, 20); break;

    case 5: dibujarCirculo(351, 123, 20); break;

    case 6: dibujarRectangulo(349, 143.5, 4.6, 60); break;

    case 7: dibujarRectanguloInclinado(349, 203.5, 326, 237.5, 329, 241, 354, 203.5); break;

    case 8: dibujarRectanguloInclinado(354, 203.5, 377, 237.5, 374, 241, 349, 203.5); break;

    case 9: dibujarRectanguloInclinado(349, 158, 326, 192, 329, 195.5, 354, 158); break;

    case 10: dibujarRectanguloInclinado(354, 158, 377, 192, 374, 195.5, 349, 158); break;
  }
}

function limpiarTablero(xIni, yIni, xMax, yMax) {

  pincel.clearRect(xIni, yIni, xMax, yMax);
}

function dibujarRectangulo(x0, y0, ancho, alto) {

  pincel.fillStyle = colorMunheco;
  pincel.fillRect(x0, y0, ancho, alto);
}

function dibujarCirculo(x0, y0, radio) {

  pincel.fillStyle = colorMunheco;
  pincel.beginPath();
  pincel.arc(x0, y0, radio, 0, 2 * Math.PI);
  pincel.fill();
}

function dibujarRectanguloInclinado(x0, y0, x1, y1, x2, y2, x3, y3) {

  pincel.fillStyle = colorMunheco;
  pincel.beginPath();
  pincel.moveTo(x0, y0);
  pincel.lineTo(x1, y1);
  pincel.lineTo(x2, y2);
  pincel.lineTo(x3, y3);
  pincel.fill();
}

function mostrarGuiones(cantidadLetras) {

  let separacionGuiones = 16;
  let anchoGuion = 57;
  let x0 = (600 - (anchoGuion + separacionGuiones) * cantidadLetras) / 2;
  let y0 = 370;
  let altoGuion = 3;

  for (let i = 1; i <= cantidadLetras; i++) {

    dibujarRectangulo(x0, y0, anchoGuion, altoGuion);

    x0 += (anchoGuion + separacionGuiones);
  }
}

function dibujarLetraCorrecta() {

  pincel.font = "bold 40px Inter";
  pincel.fillStyle = colorMunheco;

  let separacionGuiones = 16;
  let anchoGuion = 57;
  let x0 = (628 - (anchoGuion + separacionGuiones) * letrasAdivinadas.length) / 2;
  let y0 = 355;

  for (let i = 0; i < letrasAdivinadas.length; i++) {

    if (letrasAdivinadas[i] !== undefined) {

      pincel.fillText(letrasAdivinadas[i], x0, y0);

      x0 += (anchoGuion + separacionGuiones);
    } else {

      pincel.fillText(" ", x0, y0);

      x0 += (anchoGuion + separacionGuiones);

    }
  }
}

function dibujarLetraIncorrecta() {

  limpiarTablero(0, 390, 600, 420);
  pincel.font = "22px Inter";
  pincel.fillStyle = colorMunheco;

  let separacionGuiones = 16;
  let anchoGuion = 44;
  let x0 = (628 - (anchoGuion + separacionGuiones) * letrasIncorrectas.length) / 2;
  let y0 = 410;

  for (let i = 0; i < letrasIncorrectas.length; i++) {

    pincel.fillText(letrasIncorrectas[i], x0, y0);

    x0 += (anchoGuion + separacionGuiones);
  }
}



document.addEventListener("keypress", function (event) {
  var letraPresionada = event.key.toUpperCase();

  if (inicioJuego) {

    verificarLetraIngresada(letraPresionada);

    console.log("La palabra secreta es: " + palabraSecreta);
    console.log("Palabra desarmada: " + palabraDesarmada);
    console.log("letra presionada: " + letraPresionada);
    console.log("Letras presionadas hasta ahora: " + letrasPresionadas);
    console.log("listado letras incorrectas: " + letrasIncorrectas);
    console.log("letras adivinadas: " + letrasAdivinadas);
  }
})

//Funcion de mantenimiento para capturar las coordenadas del click del mouse en tablero canvas.

/*function alerta(evento){
  var x =evento.pageX-pantalla.offsetLeft;
  var y = evento.pageY-pantalla.offsetTop;
  alert("x " + x + ", y " +y);
}

var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");
pantalla.onclick = alerta;*/