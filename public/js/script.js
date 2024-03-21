const socket = io();
var mensajeDiv = document.getElementById("mensaje");
var datos = document.getElementById("datos");
var datosP = document.getElementById("datosP");


//MOSTRAR DATOS DE USUARIO EN MONGO
socket.on("servidorEnviarUsuarios", (usuarios)=>{
    console.log(usuarios);
    var tr = "";
    usuarios.forEach((usuario,idLocal)=>{
        tr= tr + `
        <tr>
            <td>${idLocal+1}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.usuario}</td>
            <td>${usuario.password}</td>
            <td>
                <a href="#" onClick="editarUsuario('${usuario._id}')">Editar</a>
                <a href="#" onClick="borrarUsuario('${usuario._id}')">Borrar</a>
            </td>
        </tr>
        `;
    });
    datos.innerHTML = tr;
});

//GUARDAR DATOS DE USUARIO EN MONGO
var enviarDatos = document.getElementById("enviarDatos");
enviarDatos.addEventListener("submit", (e)=>{
    e.preventDefault();
    var usuario = {
        nombre: document.getElementById("nombre").value,
        usuario: document.getElementById("usuario").value,
        password: document.getElementById("password").value
    }
    socket.emit("clienteGuardarUsuario", usuario);
    socket.on("servidorUsuarioGuardado", (mensaje)=>{
        console.log(mensaje);
        mensajeDiv.innerHTML = mensaje;
        setTimeout(() => {
            mensajeDiv.innerHTML = "";
        }, 2000);
    });

    document.getElementById("nombre").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("password").value = "";
    document.getElementById("nombre").focus()

});

//MODIFICAR EL REGISTRO DE USUARIO EN MONGO
function editarUsuario(id) {
    console.log(id);
}
//ELIMINAR REGISTRO DE USUARIO EN MONGO
function borrarUsuario(id) {
    console.log(id);
}



//MOSTRAR DATOS DE PRODUCTOS EN MONGO 
socket.on("servidorEnviarProductos", (productos)=>{
    console.log(productos);
    var tr = "";
    productos.forEach((producto,idLocal)=>{
        tr= tr + `
        <tr>
            <td>${idLocal+1}</td>
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" onClick="editarProducto('${producto._id}')">Editar</a>
                <a href="#" onClick="borrarProducto('${producto._id}')">Borrar</a>
            </td>
        </tr>
        `;
    });
    datosP.innerHTML = tr;
});



//GARDAR DATOS DE P EN MONGO
var enviarDatosP = document.getElementById("enviarDatosP");
enviarDatosP.addEventListener("submit", (e)=>{
    e.preventDefault();
    var producto = {
        nombre: document.getElementById("nombreP").value,
        precio: document.getElementById("precio").value,
        cantidad: document.getElementById("cantidad").value
    }
    socket.emit("clienteGuardarProducto", producto);
    var mensajeProducto = document.getElementById("mensajeProducto");

socket.on("servidorProductoGuardado", (mensaje) => {
    console.log(mensaje);
    mensajeProducto.innerText = mensaje;
    setTimeout(() => {
        mensajeProducto.innerText = "";
    }, 2000);
});

    document.getElementById("nombreP").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("nombreP").focus()

});


//MODIFICAR REGISTRO DE PRODUCTOS MONGO
function editarProducto(id) {
    console.log(id);
}
//ELIMINAR UN  REGISTRO DE PRODUCTOS MONGO
function borrarProducto(id) {
    console.log(id);
}