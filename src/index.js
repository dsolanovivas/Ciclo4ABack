require("./config/config");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

// Ruta de Express
const backRoutes = require("./routes/routes");

//DB Config
const db = require("./database/db").mongoURI;

//Conectar con la base de datos
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Base de datos conectada exitosamente!!"))
  .catch((err) => console.log(err));

//configuraciones
app.set("port", process.env.PORT);

//middleware
//app.use(morgan("dev"));
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());

//parse application/json
app.use(bodyParser.json());

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Respuesta a Navegador
app.get("/", (req, res) => {
  res.json({
    Title: "Hola soy un API REST",
  });
});

// Configurar cabeceras y cors
app.use(cors());
/*app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});*/

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
