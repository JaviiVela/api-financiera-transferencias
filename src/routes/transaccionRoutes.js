const express = require("express");
const router = express.Router();
// importamos el controlador de las transferencias
const controladorTransacciones = require("../controllers/transaccionController");

// asignamos las rutas correspondientes del crud
router.post("/", controladorTransacciones.crearTransaccion);
router.get("/", controladorTransacciones.obtenerTransacciones);
router.get("/:id", controladorTransacciones.obtenerTransaccion);
router.put("/:id", controladorTransacciones.actualizarTransaccion);
router.delete("/:id", controladorTransacciones.eliminarTransaccion);

module.exports = router;
