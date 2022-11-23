const express = require("express");
const app = express();

app.use(require("./routesUsuarios"));
app.use(require("./routesEstudiantes"));

module.exports = app;
