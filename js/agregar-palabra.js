//Funciones para agregar palabras.

function comprobarExepcionesPalabras() {
  var comprobarPalabra = inputAgregarPalabra.value;

  if (comprobarPalabra == "") {

    vaciarCajaInput();

  } else if (/[^A-Z]/.test(comprobarPalabra)) {

    alert("Hubo un error al ingresar la palabra. Recuerde que el programa solo admite LETRAS MAYUSCULAS (Elimine minúsculas, acentos, caracteres especiales y números por favor). Intente de nuevo...!!!");

    vaciarCajaInput();

  } else {

    let largoPalabraAgregada = comprobarPalabra.length;

    if (largoPalabraAgregada <= 8) {

      agregarPalabra(comprobarPalabra);

    } else {

      alert("Hubo un error al ingresar la palabra. Recuerde que el número máximo de letras es 8. Intente de nuevo...!!!");

      vaciarCajaInput();
    }
  }
}

function agregarPalabra(palabra) {

  let repetida = false;

  for (let i = 0; i <= palabrasSecretas.length; i++) {

    if (palabra == palabrasSecretas[i]) {

      alert("La palabra ingresada ya ha sido cargada. Intente agregar otra...!!!");

      repetida = true;

      vaciarCajaInput();

      break;
    }
  }

  if (repetida == false) {

    palabrasSecretas.push(palabra);

    vaciarCajaInput();

    mostrarAlerta(".alerta_guardado");
    mostrarAlerta(".texto_alerta_guardado");

    console.log(palabrasSecretas);
  }
}

function mostrarAlerta(clase) {

  document.querySelector(clase).style.display = "inherit";

  setTimeout(function () {

    document.querySelector(clase).style.display = "none";
  }, 1500);
}

function vaciarCajaInput() {

  inputAgregarPalabra.value = "";
  inputAgregarPalabra.focus();
}

//Sentencias que desarrollan los botones al hacer click sobre ellos.

botonGuardar.onclick = comprobarExepcionesPalabras;
botonBorrar.onclick = vaciarCajaInput;
botonVolver.onclick = irPantallaInicio;