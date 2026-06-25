const mongoose = require("mongoose");

const transaccionSchema = new mongoose.Schema(
  {
    cuentaOrigen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cuenta",
      required: true,
    },
    cuentaDestino: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cuenta",
      required: true,
    },
    monto: {
      type: Number,
      required: true,
      min: 1,
    },
    estado: {
      type: String,
      enum: ["PENDIENTE", "COMPLETADA", "FALLIDA"],
      default: "PENDIENTE",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Transaccion", transaccionSchema);
