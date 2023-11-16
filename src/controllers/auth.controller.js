require("express");

/* const { TokenExpiredError } = require("jsonwebtoken"); */
const { createToken, verifyToken } = require("../services/JwtService");
const { MongoService } = require("../services/MongoService");
const { compareHash } = require("../services/Bcrypt");
const jwt = require("jsonwebtoken");

const collection_user = "users";
const collection_barber = "barbers";

const adapterDatabase = new MongoService();

class AuthController {
  constructor() {}

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await adapterDatabase.findOne(collection_user, { email });
      const barber = await adapterDatabase.findOne(collection_barber, {
        email,
      });

      let isValidUser = false;

      if (user) {
        const passwordEqual = compareHash(password, user.password);
        if (passwordEqual) {
          delete user.password;
          const token = createToken(user);
          res.status(200).json({
            ok: true,
            message: "It's good to see you again",
            info: { ...user, token },
          });
          isValidUser = true;
        }
      }

      if (barber && !isValidUser) {
        const passwordEqual = compareHash(password, barber.password);
        if (passwordEqual) {
          delete barber.password;
          const token = createToken(barber);
          res.status(200).json({
            ok: true,
            message: "It's good to see you again",
            info: { ...barber, token },
          });
        } else {
          throw {
            status: 404,
            message: "Invalid barber",
          };
        }
      }

      if (!isValidUser && !barber) {
        throw {
          status: 404,
          message: "Invalid user",
        };
      }
    } catch (error) {
      res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
  }

  async verifyToken(req, res) {
    try {
      const { token } = req.body;
      const user = verifyToken(token);
      if (!user) {
        throw { status: 400, message: "Error verificando el token." };
      }
      // CREAR TOKEN
      res.status(200).json({
        ok: true,
        message: "Token verificado",
        info: { ...user },
      });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(400).json({
          ok: false,
          message: "Token no valido",
        });
      }
      return res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
  }
}
module.exports = { AuthController };
