const { verifyToken } = require("../services/JwtService");
const jwt = require("jsonwebtoken");
require("express");
/**
 *
 * @param {Request{"express"}} req
 * @param {Response} res
 * @param {*} next
 */

const AuthMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const user = verifyToken(token);
    // Alternativa para guardar la información del usuario a lo largo de la solicitud
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        ok: false,
        message: "Error en el token de autenticación",
        // Puedes agregar más información específica del error si lo deseas
      });
      
    } else {
      res.status(500).json({
        ok: false,
        message: "Error de Middleware",
      });
    }
  }
};

module.exports = { AuthMiddleware };
