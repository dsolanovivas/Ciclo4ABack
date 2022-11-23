const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const Usuario = require("../models/Usuarios");

router.route("/login").post((req, res, next) => {
  let body = req.body;

  Usuario.findOne({ email: body.email }, (err, UsuarioDB) => {
    //Verifica si hay errores con el servidor
    if (err) {
      return res.status(500).json({
        ok: false,
        error: err,
      });
    }

    //Verifica que exista un usuario con el email escrito por el usuario final
    if (!UsuarioDB) {
      return res.status(401).json({
        ok: false,
        error: {
          msg: "Usuario o Contraseña Incorrectos",
        },
      });
    }

    //Valida que la contraseña escrita por el usuario, sea la almacenada en la BD
    if (!bcrypt.compareSync(body.password, UsuarioDB.password)) {
      return res.status(401).json({
        ok: false,
        error: {
          msg: "Usuario o Contraseña Incorrectos",
        },
      });
    }

    //Genera el token de autenticación
    let token = jwt.sign(
      {
        usuario: UsuarioDB,
      },
      process.env.SEED_AUTENTICACION,
      {
        expiresIn: process.env.CADUCIDAD_TOKEN,
      }
    );

    res.status(200).json({
      ok: true,
      usuario: UsuarioDB,
      token,
    });
  });
});

router.route("/register").post((req, res, next) => {
  let body = req.body;

  let { nombre, email, password, role } = body;

  let usuario = new Usuario({
    nombre,
    email,
    password: bcrypt.hashSync(password, 10),
    role,
  });

  usuario.save((err, UsuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        error: err,
      });
    }

    res.json({
      ok: true,
      usuario: UsuarioDB,
    });
  });
});

router.route("/refresh").post((req, res, next) => {
  let body = req.body;

  if (!body.token) {
    return res.status(400).json({
      ok: false,
      error: {
        msg: "Token no enviado",
      },
    });
  }

  // Verificar el refresh token
  jwt.verify(body.token, process.env.SEED_AUTENTICACION, (err, decoded) => {
    if (err) {
      return res.status(406).json({
        ok: false,
        error: {
          msg: "No autorizado",
        },
      });
    }

    Usuario.findOne({ email: body.email }, (err, UsuarioDB) => {
      //Verifica si hay errores con el servidor
      if (err) {
        return res.status(500).json({
          ok: false,
          error: err,
        });
      }

      //Verifica que exista un usuario con el email escrito por el usuario final
      if (!UsuarioDB) {
        return res.status(401).json({
          ok: false,
          error: {
            msg: "Usuario o Contraseña Incorrectos",
          },
        });
      }

      //Genera Token nuevo
      let token = jwt.sign(
        {
          usuario: UsuarioDB,
        },
        process.env.SEED_AUTENTICACION,
        {
          expiresIn: process.env.CADUCIDAD_TOKEN,
        }
      );

      res.status(200).json({
        ok: true,
        usuario: UsuarioDB,
        token,
      });
    });
  });
});

module.exports = router;
