const Cuenta = require("../models/Cuenta");

// esta funcion crea una cuenta nueva en la base de datos
const crearCuenta = async (req, res) => {
  try {
    // agarramos los datos que vienen en el body de la peticion
    let datos = req.body;
    let nuevaCuenta = new Cuenta(datos);

    // guardamos en la bd, usamos await porque tarda un poco
    await nuevaCuenta.save();

    // mandamos la cuenta creada, usamos 200 normal
    res.status(200).send(nuevaCuenta);
  } catch (error) {
    console.log(error); // imprimimos el error para verlo en la terminal
    res.status(500).send("hubo un error al crear la cuenta");
  }
};

// funcion para ver todas las cuentas guardadas
const obtenerCuentas = async (req, res) => {
  try {
    // el find() vacio trae todo lo de la coleccion
    let todasLasCuentas = await Cuenta.find();
    res.json(todasLasCuentas);
  } catch (e) {
    res.send("error al consultar");
  }
};

// buscar solo una cuenta usando su id
const obtenerCuenta = async (req, res) => {
  try {
    let id = req.params.id; // sacamos el id de la url
    let cuenta = await Cuenta.findById(id);

    if (cuenta == null) {
      res.send("no se encontro nada con ese id");
    } else {
      res.json(cuenta);
    }
  } catch (error) {
    res.json({ mensaje: "falla en el servidor", error });
  }
};

// actualizar los datos de una cuenta
const actualizarCuenta = async (req, res) => {
  try {
    let id = req.params.id;
    // el { new: true } es para que nos regrese el dato ya actualizado en la respuesta
    let actualizado = await Cuenta.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(actualizado);
  } catch (err) {
    console.log(err);
    res.send("error actualizando la cuenta");
  }
};

// borrar una cuenta de la bd
const eliminarCuenta = async (req, res) => {
  try {
    let id = req.params.id;
    await Cuenta.findByIdAndDelete(id);
    res.json({ mensaje: "se borro con exito la cuenta" });
  } catch (error) {
    res.status(500).send("no se pudo borrar");
  }
};

// exportamos todas las funciones juntas al final
module.exports = {
  crearCuenta,
  obtenerCuentas,
  obtenerCuenta,
  actualizarCuenta,
  eliminarCuenta,
};
