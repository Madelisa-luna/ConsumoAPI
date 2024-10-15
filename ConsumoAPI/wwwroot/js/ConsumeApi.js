window.onload = function () {
    ConsumeWebAPIPersonasTabla();
}
function ConsumeWebAPIPersonasTabla() {
    var Mensaje;
    //concateacion de          http:               //          localhost                Metodo
    var urlCompleta = window.location.protocol + "//" + window.location.host + "/Home/AlmacenaDatosPersonas";
    fetch(urlCompleta)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                let Mensaje = 'No hay Registros';
                MuestraToast(Mensaje);
            } else {
                let tabla = document.getElementById("tablaDatos"); // Asegúrate de tener una tabla en tu HTML con este ID
                data.forEach((item, index) => {
                    let fila = tabla.insertRow(); // Insertar nueva fila al final de la tabla

                    let celdaNombre = fila.insertCell(0);
                    let celdaEdad = fila.insertCell(1);
                    let celdaNacionalidad = fila.insertCell(2);
                    let celdaCasado = fila.insertCell(3);
                    let celdaDireccion = fila.insertCell(4);
                    let celdaSueldo = fila.insertCell(5);
                    let celdaPlatos = fila.insertCell(6);
                    let celdaImagen = fila.insertCell(7);

                    celdaNombre.innerText = item.nombre;
                    celdaEdad.innerText = item.edad;
                    celdaNacionalidad.innerText = item.nacionalidad;

                    let checkboxCasado = document.createElement('input');
                    checkboxCasado.type = 'checkbox';
                    checkboxCasado.checked = item.estaCasado;
                    checkboxCasado.disabled = true;
                    celdaCasado.appendChild(checkboxCasado);


                    celdaDireccion.innerText = item.direccion;
                    celdaSueldo.innerText = "$"+item.sueldo;
                    celdaPlatos.innerText = item.platos;

                    let img = document.createElement('img');
                    img.src = `../imagenes/${item.imagen}`;
                    img.alt = item.nombre;
                    img.style.width = '100px'; // ajusta el tamaño según tus necesidades
                    img.style.height = 'auto';
                    celdaImagen.appendChild(img);
                });

            }
        })
        .catch(error => {
            Mensaje = 'No tiene conexiÃ³n a Internet';
            MuestraToast(Mensaje);
            console.log(error.message);
            //alert("No tiene conexiÃ³n a Internet ");
        });
}

function MuestraToast(Mensaje) {
    document.getElementById('msjnotif').innerHTML = Mensaje;
    let myAlert = document.querySelector(".toast");
    let bsAlert = new bootstrap.Toast(myAlert, { autohide: true, delay: 2000 });
    bsAlert.show();
}