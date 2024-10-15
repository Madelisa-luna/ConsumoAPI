/// Función para mostrar el Toast
function mostrarToast() {
    const toastLive = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastLive);
    toast.show();
}

// Función que genera un arreglo de números en un rango especificado (inicio a fin) dependiendo de si son pares o impares.
function generarNumeros(inicio, fin, tipo) {
    let numeros = [];
    for (let i = inicio; i <= fin; i++) {
        if (tipo === "par" && i % 2 === 0) {
            numeros.push(i);
        } else if (tipo === "impar" && i % 2 !== 0) {
            numeros.push(i);
        }
    }
    return numeros;
}

// Función que llena los selects con los números generados.
function llenarSelects(numeros) {
    const select1 = document.getElementById("numero1");
    const select2 = document.getElementById("numero2");

    select1.innerHTML = "";
    select2.innerHTML = "";

    numeros.forEach(num => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");

        option1.value = option2.value = num;
        option1.textContent = option2.textContent = num;

        select1.appendChild(option1);
        select2.appendChild(option2);
    });
}

// Función para realizar operaciones seleccionadas
function realizarOperaciones() {
    const numero1 = parseInt(document.getElementById("numero1").value);
    const numero2 = parseInt(document.getElementById("numero2").value);

    let resultado = '';

    // Verificar las operaciones seleccionadas
    if (document.getElementById("suma").checked) {
        const suma = numero1 + numero2;
        resultado += `Suma: ${numero1} + ${numero2} = ${suma}<br>`;
    }

    if (document.getElementById("resta").checked) {
        const resta = numero1 - numero2;
        resultado += `Resta: ${numero1} - ${numero2} = ${resta}<br>`;
    }

    if (document.getElementById("multiplicacion").checked) {
        const multiplicacion = numero1 * numero2;
        resultado += `Multiplicación: ${numero1} * ${numero2} = ${multiplicacion}<br>`;
    }

    // Mostrar el resultado en el div con ID "resultado"
    document.getElementById("resultado").innerHTML = resultado;
}

// Event listener para el botón "Aceptar"
document.getElementById("aceptar").addEventListener("click", function () {
    const inicio = document.getElementById("inicio").value;
    const fin = document.getElementById("fin").value;
    const tipo = document.querySelector('input[name="tipo"]:checked');

    if (inicio === "" || fin === "" || tipo === null) {
        mostrarToast();
        return;
    }

    const inicioInt = parseInt(inicio);
    const finInt = parseInt(fin);

    if (inicioInt >= finInt) {
        alert("El valor de inicio debe ser menor que el valor de fin.");
        return;
    }

    const tipoValor = tipo.value;
    const listaNumeros = generarNumeros(inicioInt, finInt, tipoValor);
    llenarSelects(listaNumeros);
});

// Event listener para el botón "Realizar Operaciones"
document.getElementById("realizar-operaciones").addEventListener("click", realizarOperaciones);
