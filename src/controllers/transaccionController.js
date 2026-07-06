const Transaccion = require("../models/Transaccion");

// funcion para registrar una nueva transaccion
const crearTransaccion = async (req, res) => {
  try {
    let nueva = new Transaccion(req.body);
    await nueva.save();
    res.json(nueva);
  } catch (error) {
    // si falla algo cae aqui
    console.log("error al guardar: ", error);
    res.status(500).json({ error: "Fallo al guardar la transaccion" });
  }
};

// trae el historial de transferencias
const obtenerTransacciones = async (req, res) => {
  try {
    // usamos populate para que nos traiga los datos de la cuenta origen y destino, no solo el id largo
    let lista = await Transaccion.find()
      .populate("cuentaOrigen")
      .populate("cuentaDestino");
    res.json(lista);
  } catch (error) {
    console.log(error);
    res.send("no se pudieron traer las transacciones");
  }
};

// buscar una transaccion especifica
const obtenerTransaccion = async (req, res) => {
  try {
    let idTransaccion = req.params.id;
    let transaccion = await Transaccion.findById(idTransaccion)
      .populate("cuentaOrigen")
      .populate("cuentaDestino");

    if (!transaccion) {
      res.send("esa transaccion no existe");
    } else {
      res.json(transaccion);
    }
  } catch (error) {
    res.send("error buscando por id");
  }
};

// modificar una transaccion (aunque en un banco real no se puede modificar una transaccion, pero para fines de prueba si)
const actualizarTransaccion = async (req, res) => {
  try {
    let editada = await Transaccion.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(editada);
  } catch (error) {
    res.json({ msj: "error actualizando" });
  }
};

// eliminar transaccion
const eliminarTransaccion = async (req, res) => {
  try {
    await Transaccion.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "borrado exitosamente" });
  } catch (error) {
    res.send("error al eliminar");
  }
};

// exportamos las variables del controlador
module.exports = {
  crearTransaccion,
  obtenerTransacciones,
  obtenerTransaccion,
  actualizarTransaccion,
  eliminarTransaccion,
};
