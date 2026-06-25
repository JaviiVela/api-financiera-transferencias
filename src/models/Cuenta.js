const mongoose = require("mongoose");

const cuentaSchema = new mongoose.Schema(
  {
    titular: {
      type: String,
      required: true,
    },
    saldo: {
      type: Number,
      required: true,
      default: 0,
      min: 0, // El saldo no puede ser negativo
    },
    // cuenta cifrada
    cuentaInterbancariaCifrada: {
      type: String,
      required: true,
    },
    // Vector de Inicialización (IV) único para descifrar este registro específico
    iv: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Cuenta", cuentaSchema);
