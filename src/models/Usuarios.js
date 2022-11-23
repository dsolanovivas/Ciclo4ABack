const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let uniqueValidator = require("mongoose-unique-validator");

let rolesValido = {
  values: ["ADMIN", "USER"],
  message: "{VALUE} no es un role valido",
};

let usuarioSchema = new Schema({
  nombre: { type: String, required: [true, "El nombre es necesario"] },
  password: { type: String, required: [true, "La clave es requerida"] },
  email: {
    type: String,
    required: [true, "El correo es requerido"],
    unique: true,
  },
  role: { type: String, default: "USER", required: true, enum: rolesValido },
});

usuarioSchema.plugin(uniqueValidator, {
  message: "{PATH} debe ser unico",
});

module.exports = mongoose.model("usuarios", usuarioSchema);
