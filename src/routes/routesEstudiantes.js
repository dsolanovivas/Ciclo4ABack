const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//Modelos
let estudianteSchema = require("../models/Estudiantes");

//Crear Estudiante
router.route("/crear-estudiante").post((req, res, next) => {
  console.log(req.body);
  estudianteSchema.create(req.body, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      console.log(data);
      console.log("Estudiante agregado con exito");
      res.json(data);
    }
  });
});

//Leer Estudiantes
router.route("/listar-estudiantes").get((req, res, next) => {
  estudianteSchema
    .find((error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        console.log(data);
        res.json(data);
      }
    })
    .sort({ nombre: 1 });
  //.limit(2);
});

//Actualizar Estudiantes
router.route("/actualizar-estudiante/:id").put((req, res, next) => {
  estudianteSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        console.log(data);
        console.log("Estudiante actualizado con exito");
        res.json(data);
      }
    }
  );
});

//Borrar Estudiantes
router.route("/borrar-estudiante/:id").delete((req, res, next) => {
  estudianteSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      console.log(data);
      console.log("Estudiante eliminado con exito");
      res.status(200).json({
        msg: data,
      });
    }
  });
});

//Obtener un Estudiante
router.route("/obtener-estudiante/:id").get((req, res, next) => {
  estudianteSchema.findById(req.params.id, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

//Busqueda de Estudiantes
router.route("/busqueda-estudiante/:texto").get((req, res, next) => {
  estudianteSchema.find(
    {
      $or: [
        { nombre: { $regex: req.params.texto, $options: "i" } },
        { email: { $regex: req.params.texto, $options: "i" } },
        { cedula: { $regex: req.params.texto, $options: "i" } },
      ],
    },
    //{ nombre: { $regex: req.params.texto } },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        console.log(data);
        res.json(data);
      }
    }
  );
});

module.exports = router;
