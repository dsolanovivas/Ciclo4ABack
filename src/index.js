const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

// Ruta de Express
const backRoutes = require("./routes/routes");

//DB Config
const db = require("./database/db").mongoURILocal;

//Conectar con la base de datos
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Base de datos conectada exitosamente!!"))
  .catch((err) => console.log(err));

//configuraciones
app.set("port", process.env.PORT || 4000);

//middleware
app.use(morgan("dev"));
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

//Respuesta a Navegador
app.get("/", (req, res) => {
  res.json({
    Title: "Hola soy un API REST",
  });
});

app.use("/APIRESTCICLO4A", backRoutes);

//iniciando Servidor
app.listen(app.get("port"), () => {
  console.log("Server escuchando por el puerto : " + app.get("port"));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
