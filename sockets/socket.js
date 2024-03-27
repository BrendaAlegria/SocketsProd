const Usuario = require("../models/usuario");
const Producto = require("../models/producto");

function socket(io) {
    io.on("connection", (socket) => {
        //MOSTRAR USUARIOS
        mostrarUsuarios();
        async function mostrarUsuarios() {
            const usuarios = await Usuario.find();
            io.emit("servidorEnviarUsuarios", usuarios);
        }
        //Guardar usuario
        socket.on("clienteGuardarUsuario", async (usuario) => {
            try {
                if(usuario.id === ""){
                    await new Usuario(usuario).save();
                    io.emit("servidorUsuarioGuardado", "Usuario guardado");
                    console.log("Usuario guardado");
                }
                else{
                    await Usuario.findByIdAndUpdate(usuario.id,usuario);
                    io.emit("servidorUsuarioGuardado", "Usuario Modificado");
                }
            } catch (error) {
                console.log("Error al registrar el usuario"+error);
            }
            mostrarUsuarios();
        });

        //MOSTRAR PRODUCTOS
        mostrarProductos();
        async function mostrarProductos() {
            const productos = await Producto.find();
            io.emit("servidorEnviarProductos", productos);
        }
        
        //Guardar PRODUCTO
        socket.on("clienteGuardarProducto", async (producto) => {
            try {
                if(producto.id === ""){
                    await new Producto(producto).save();
                    io.emit("servidorProductoGuardado", "Producto guardado");
                    console.log("Producto guardado");
                }
                else{
                    await Producto.findByIdAndUpdate(producto.id,producto);
                    io.emit("servidorProductoGuardado", "Producto Modificado");
                }
            } catch (error) {
                console.log("Error al registrar el producto"+error);
            }
            mostrarProductos();
        });
        //Obtener usuario por ID
        socket.on("clienteObtenerUsuarioPorID",async(id)=>{
            const usuario = await Usuario.findById(id);
            //Mandar usuario al cliente
            io.emit("servidorObtenerUsuarioPorID",usuario);

        });
        //BORAR USUARIOPOR ID
        socket.on("clienteBorrarUsuario",async(id)=>{
            await Usuario.findByIdAndDelete(id);
            io.emit("servidorUsuarioGuardado", "Usuario Borrado");
            mostrarUsuarios();
        });


        //Obtener Producto por ID
        socket.on("clienteObtenerProductoPorID",async(id)=>{
            const producto = await Producto.findById(id);
            //Mandar usuario al cliente
            io.emit("servidorObtenerProductoPorID",producto);

        });
        //BORAR Producto POR ID
        socket.on("clienteBorrarProducto",async(id)=>{
            await Producto.findByIdAndDelete(id);
            io.emit("servidorProductoGuardado", "Producto Borrado");
            mostrarProductos();
        });

    });
    //Fin de io.on("connection")
}


module.exports = socket;