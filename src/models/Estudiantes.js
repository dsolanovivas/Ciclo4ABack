const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let estudianteSchema = new Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cedula: { type: String, required: true, unique: true },
    nota: { type: Number },
    nacimiento: { type: Date },
    fecha_act: { type: Date, default: Date.now },
  },
  {
    collection: "estudiantes",
  }
);

module.exports = mongoose.Model("Estudiantes", estudianteSchema);
