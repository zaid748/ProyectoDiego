"use strict";

var jwt = require('jsonwebtoken');

var User = require('../models/Usuarios');

var Empresa = require('../models/Empresas');

var bcrypt = require('bcryptjs');

var auth = {};

auth.authToke = function _callee(req, res, next) {
  var cookies, authorization, payload, user, payloadDB, EmpresaToken, EmpresaTokenActualizado, Token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          cookies = req.cookies;
          authorization = cookies.Authorization;

          if (authorization) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.json('Acceso Denegado. No hay Token'));

        case 5:
          payload = jwt.verify(authorization, 'dashboardndsfkjsjfjwbrjrwkgrefirwe');

          if (payload) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.json('El token no es valido'));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(User.findById(payload._id));

        case 10:
          user = _context.sent;
          payloadDB = jwt.verify(user.Token, 'dashboardndsfkjsjfjwbrjrwkgrefirwe');

          if (!(payloadDB.secion != payload.secion)) {
            _context.next = 15;
            break;
          }

          res.cookie('Authorization', "", {
            httpOnly: true,
            maxAge: 1
          });
          return _context.abrupt("return", res.json('Acceso Denegado. Necesitamos un token valido'));

        case 15:
          req.user = payload;
          _context.next = 18;
          return regeneratorRuntime.awrap(Empresa.findById({
            _id: req.user.idEmpresa
          }));

        case 18:
          req.empresa = _context.sent;
          EmpresaToken = jwt.verify(req.empresa.Token, 'dashboardndsfkjsjfjwbrjrwkgrefirwe');

          if (!(EmpresaToken.Estatus == "Bloqueado")) {
            _context.next = 33;
            break;
          }

          if (!(EmpresaToken.UsuariosEnUso > 0)) {
            _context.next = 26;
            break;
          }

          EmpresaToken.UsuariosEnUso = EmpresaToken.UsuariosEnUso - 1;
          EmpresaTokenActualizado = jwt.sign({
            Nombre: EmpresaToken.Nombre,
            CantidadUsuarios: EmpresaToken.CantidadUsuarios,
            UsuariosEnUso: EmpresaToken.UsuariosEnUso,
            Estatus: EmpresaToken.Estatus
          }, 'dashboardndsfkjsjfjwbrjrwkgrefirwe');
          _context.next = 26;
          return regeneratorRuntime.awrap(Empresa.findByIdAndUpdate(req.user.idEmpresa, {
            Token: EmpresaTokenActualizado
          }));

        case 26:
          Token = jwt.sign({
            _id: payload._id,
            name: payload.name,
            role: payload.role,
            idEmpresa: payload.idEmpresa,
            secion: 'Desconectado'
          }, 'dashboardndsfkjsjfjwbrjrwkgrefirwe');
          _context.next = 29;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(payload._id, {
            Token: Token
          }, function (err, Update) {
            err && res.status(500).send(err.message); //enviamos datos
            //res.status(200).json(Update);
          }).clone()["catch"](function (err) {
            console.log(err);
          }));

        case 29:
          res.cookie('Authorization', "", {
            httpOnly: true,
            maxAge: 1
          });
          res.json('No se a realizado el pago');
          _context.next = 34;
          break;

        case 33:
          res.json(payload);

        case 34:
          _context.next = 39;
          break;

        case 36:
          _context.prev = 36;
          _context.t0 = _context["catch"](0);
          res.json('Acceso Denegado. Token no valido');

        case 39:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 36]]);
};

auth.authValidarUser = function _callee2(req, res, next) {
  var user, validadPassword, Token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 2:
          user = _context2.sent;

          if (user) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", res.status(400).json('Usuario o contraseña incorrectos'));

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, user.password));

        case 7:
          validadPassword = _context2.sent;

          if (validadPassword) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(400).json('Usuario o contraseña incorrectos'));

        case 10:
          Token = jwt.sign({
            _id: user._id,
            name: user.name,
            role: user.role,
            idEmpresa: user.idEmpresa
          }, 'dashboardndsfkjsjfjwbrjrwkgrefirwe', {
            expiresIn: 25000
          });
          res.cookie('Authorization', Token, {
            httpOnly: true,
            maxAge: 25000 * 1000
          });
          res.header('Authorization', Token);
          res.status(200).json({
            'Authorization': Token
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
};

auth.ValidadEmpresa = function _callee3(req, res, next) {
  var cookies, authorization, payload, user, payloadDB, EmpresaToken, EmpresaTokenActualizado, Token;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          cookies = req.cookies;
          authorization = cookies.Authorization;

          if (authorization) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", res.json('Acceso Denegado. Necesitamos un token valido'));

        case 5:
          payload = jwt.verify(authorization, 'dashboardndsfkjsjfjwbrjrwkgrefirwe');

          if (payload) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.json('El token no es valido'));

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap(User.findById(payload._id));

        case 10:
          user = _context3.sent;
          payloadDB = jwt.verify(user.Token, 'dashboardndsfkjsjfjwbrjrwkgrefirwe');

          if (!(payloadDB.secion != payload.secion)) {
            _context3.next = 15;
            break;
          }

          res.cookie('Authorization', "", {
            httpOnly: true,
            maxAge: 1
          });
          return _context3.abrupt("return", res.json('Acceso Denegado. Necesitamos un token valido'));

        case 15:
          req.user = payload;
          _context3.next = 18;
          return regeneratorRuntime.awrap(Empresa.findById({
            _id: req.user.idEmpresa
          }));

        case 18:
          req.empresa = _context3.sent;
          EmpresaToken = jwt.verify(req.empresa.Token, 'dashboardndsfkjsjfjwbrjrwkgrefirwe');

          if (!(EmpresaToken.Estatus == "Bloqueado")) {
            _context3.next = 31;
            break;
          }

          if (!(EmpresaToken.UsuariosEnUso > 0)) {
            _context3.next = 26;
            break;
          }

          EmpresaToken.UsuariosEnUso = EmpresaToken.UsuariosEnUso - 1;
          EmpresaTokenActualizado = jwt.sign({
            Nombre: EmpresaToken.Nombre,
            CantidadUsuarios: EmpresaToken.CantidadUsuarios,
            UsuariosEnUso: EmpresaToken.UsuariosEnUso,
            Estatus: EmpresaToken.Estatus
          }, 'dashboardndsfkjsjfjwbrjrwkgrefirwe');
          _context3.next = 26;
          return regeneratorRuntime.awrap(Empresa.findByIdAndUpdate(req.user.idEmpresa, {
            Token: EmpresaTokenActualizado
          }));

        case 26:
          Token = jwt.sign({
            _id: payload._id,
            name: payload.name,
            role: payload.role,
            idEmpresa: payload.idEmpresa,
            secion: 'Desconectado'
          }, 'dashboardndsfkjsjfjwbrjrwkgrefirwe');
          _context3.next = 29;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(payload._id, {
            Token: Token
          }, function (err, Update) {
            err && res.status(500).send(err.message); //enviamos datos
            //res.status(200).json(Update);
          }).clone()["catch"](function (err) {
            console.log(err);
          }));

        case 29:
          res.cookie('Authorization', "", {
            httpOnly: true,
            maxAge: 1
          });
          res.json('No se a realizado el pago');

        case 31:
          next();
          _context3.next = 37;
          break;

        case 34:
          _context3.prev = 34;
          _context3.t0 = _context3["catch"](0);
          res.json('Acceso Denegado. Token no valido');

        case 37:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 34]]);
}; //middleware para validar que los usuarios sean administradores


auth.Adminstrador = function _callee4(req, res, next) {
  var payload;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          payload = req.user;

          if (!(payload.role != "Administrador")) {
            _context4.next = 4;
            break;
          }

          return _context4.abrupt("return", res.json('El useario no es Administrado'));

        case 4:
          next();
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.json('Acceso Denegado. Token no valido');

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports = auth;