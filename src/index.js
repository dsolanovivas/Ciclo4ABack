const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

//DB Config
const db = require("./database/db").mongoURI;

//Conectar con la base de datos
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Base de datos conectada exitosamente!!"))
  .catch((err) => console.log(err));

//configuraciones
app.set("port", process.env.PORT || 4000);

//middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Respuesta a Navegador
app.get("/", (req, res) => {
  res.json({
    Title: "Hola soy un API REST",
  });
});

//iniciando Servidor
app.listen(app.get("port"), () => {
  console.log("Server escuchando por el puerto : " + app.get("port"));
});
