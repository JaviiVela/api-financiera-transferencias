const express = require("express");
const router = express.Router();
// importamos nuestro archivo de controlador de cuentas
const controladorCuentas = require("../controllers/cuentaController");

// aqui definimos las rutas y le decimos que funcion del controlador usar
router.post("/", controladorCuentas.crearCuenta); // post para insertar datos
router.get("/", controladorCuentas.obtenerCuentas); // get para leer todo
router.get("/:id", controladorCuentas.obtenerCuenta); // get pero pidiendo un parametro id
router.put("/:id", controladorCuentas.actualizarCuenta); // put para modificar
router.delete("/:id", controladorCuentas.eliminarCuenta); // delete para borrar

// esto es necesario para que el index.js pueda leer las rutas
module.exports = router;
