require("dotenv").config(); // para que lea el archivo .env
let express = require("express");
let mongoose = require("mongoose");

// inicializamos la aplicacion
let app = express();
let puerto = 5100;

//para que el req.body no salga como undefined al probar en thunder client
app.use(express.json());

// creamos una funcion para conectarnos a la base de datos de atlas
async function conectarBaseDeDatos() {
  try {
    // usamos la cadena de conexion que esta oculta en el archivo .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log("CONECTADO A MONGO DB");
  } catch (error) {
    // si falla la conexion imprimimos el error en la terminal
    console.log("hubo un error al conectar a la base de datos:");
    console.log(error);
  }
}

// ejecutamos la conexion
conectarBaseDeDatos();

// Importar el middleware
const validarTokenApp = require("./src/middlewares/auth");

// Aplicarlo a todas las rutas de la API
app.use("/api", validarTokenApp);

// Tus rutas de cuentas y transacciones van aquí abajo...

// cargamos nuestros archivos de rutas y los guardamos en variables
let rutasCuentas = require("./src/routes/cuentaRoutes");
let rutasTransacciones = require("./src/routes/transaccionRoutes");

// le asignamos la url base a cada grupo de rutas
app.use("/api/cuentas", rutasCuentas);
app.use("/api/transacciones", rutasTransacciones);

// encendemos el servidor web
app.listen(puerto, function () {
  console.log("Servidor corriendo en el puerto " + puerto);
});
