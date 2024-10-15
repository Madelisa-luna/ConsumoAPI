
// Se añade un event listener al botón con ID "aceptar" para ejecutar una función cuando se hace clic.
document.getElementById("aceptar").addEventListener("click", function () {
    // Se obtienen los valores de los campos de texto con IDs "inicio" y "fin", convirtiéndolos a enteros.
    const inicio = parseInt(document.getElementById("inicio").value);
    const fin = parseInt(document.getElementById("fin").value);

    // Se obtiene el valor del radio button seleccionado (par o impar) con el nombre "tipo".
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    // Se verifica que el valor de inicio sea menor que el de fin. Si no lo es, muestra una alerta y termina la ejecución.
    if (inicio >= fin) {
        alert("El valor de inicio debe ser menor que el valor de fin.");
        return;
    }

    // Llama a la función generarNumeros con los valores de inicio, fin y tipo, y almacena el resultado en listaNumeros.
    const listaNumeros = generarNumeros(inicio, fin, tipo);

    // Llama a la función llenarSelects pasando la lista de números generada para llenar los selects.
    llenarSelects(listaNumeros);
});

// Se añade un event listener al botón con ID "realizar-operaciones" para ejecutar una función cuando se hace clic.
document.getElementById("realizar-operaciones").addEventListener("click", function () {
    // Se obtienen los valores seleccionados en los select con IDs "numero1" y "numero2", convirtiéndolos a enteros.
    const numero1 = parseInt(document.getElementById("numero1").value);
    const numero2 = parseInt(document.getElementById("numero2").value);

    // Se obtiene el div donde se mostrará el resultado de las operaciones.
    const resultadoDiv = document.getElementById("resultado");

    // Inicializa una cadena vacía donde se almacenarán los resultados.
    let resultados = "";

    // Verifica si el checkbox con ID "suma" está marcado. Si es así, realiza la suma y la agrega a la cadena resultados.
    if (document.getElementById("suma").checked) {
        resultados += `La suma de ${numero1} + ${numero2} = ${numero1 + numero2}<br>`;
    }

    // Verifica si el checkbox con ID "resta" está marcado. Si es así, realiza la resta y la agrega a la cadena resultados.
    if (document.getElementById("resta").checked) {
        resultados += `La resta de ${numero1} - ${numero2} = ${numero1 - numero2}<br>`;
    }

    // Verifica si el checkbox con ID "multiplicacion" está marcado. Si es así, realiza la multiplicación y la agrega a la cadena resultados.
    if (document.getElementById("multiplicacion").checked) {
        resultados += `La multiplicación de ${numero1} * ${numero2} = ${numero1 * numero2}<br>`;
    }

    // Inserta el contenido de la cadena resultados en el div resultadoDiv, mostrando el resultado de las operaciones.
    resultadoDiv.innerHTML = resultados;
});

// Función que genera un arreglo de números en un rango especificado (inicio a fin) dependiendo de si son pares o impares.
function generarNumeros(inicio, fin, tipo) {
    let numeros = [];
    // Bucle que recorre desde inicio hasta fin.
    for (let i = inicio; i <= fin; i++) {
        // Si el tipo es "par" y el número es divisible entre 2, se añade al arreglo.
        if (tipo === "par" && i % 2 === 0) {
            numeros.push(i);
        }
        // Si el tipo es "impar" y el número no es divisible entre 2, se añade al arreglo.
        else if (tipo === "impar" && i % 2 !== 0) {
            numeros.push(i);
        }
    }
    return numeros; // Devuelve el arreglo de números.
}

// Función que llena los selects de la página con los números generados.
function llenarSelects(numeros) {
    // Se obtienen los select con IDs "numero1" y "numero2".
    const select1 = document.getElementById("numero1");
    const select2 = document.getElementById("numero2");

    // Limpia el contenido actual de ambos selects.
    select1.innerHTML = "";
    select2.innerHTML = "";

    // Por cada número en el arreglo de números:
    numeros.forEach(num => {
        // Crea una nueva opción para cada select.
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");

        // Asigna el valor y texto de la opción al número actual.
        option1.value = option2.value = num;
        option1.textContent = option2.textContent = num;

        // Añade la opción al select correspondiente.
        select1.appendChild(option1);
        select2.appendChild(option2);
    });
}

