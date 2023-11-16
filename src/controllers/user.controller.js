require("express");
const { generateHash } = require("../services/Bcrypt");
const User = require("../models/Users");
const ConfigService = require("../services/ConfigService");
const { MongoService } = require("../services/MongoService");

const colletion = "users";
const adapterDatabase = new MongoService();
const config = new ConfigService();

class UsersController {
  constructor() {}
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async createUser(req, res) {
    try {
      let payload = req.body;
      const user = new User(payload);
      user.valid();
      payload.password = await generateHash(payload.password);
      delete payload.confirmPassword;
      let filter = {
        email: payload.email,
      };
      const existUser = await adapterDatabase.findOne(colletion, filter);
      if (existUser) {
        throw {
          status: 400,
          message: "Exist already email",
        };
      }
      const response = await adapterDatabase.create(colletion, payload);
      payload._id = response.insertedId;
      res.status(201).json({
        ok: true,
        message: "User created successfully",
        info: payload,
      });
    } catch (error) {
      console.error(error);
      res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
  }
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const { deleteCount: count } = await adapterDatabase.delete(
        colletion,
        id
      );
      if (count == 0) {
        throw {
          status: 404,
          message: "User not found in database",
        };
      }
      res.status(200).json({
        ok: true,
        message: "User deleted successfully",
        info: {},
      });
    } catch (error) {
      console.error(error);
      res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
  }
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async updateUser(req, res) {
    try {
      const payload = req.body;
      const id = req.params.id;
      const user = new User(payload);
      user.valid();
      payload.password = await generateHash(payload.password);
      delete payload.confirmPassword;
      const { modifiedCount: count } = await adapterDatabase.update(colletion,payload,id);
      if (count == 0) {
        res.status(404).json({
          ok: false,
          message: "User not found",
        });
      } else {
        res.status(200).json({
          ok: true,
          message: "User edited succesfully",
          info: payload,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
  }
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async getUser(req, res) {
    try {
      const id = req.params.id;
      const user = await adapterDatabase.getById(colletion, id);
      console.log(user);
      if (!user) {
        res.status(404).json({
          ok: false,
          message: "User not found",
        });
      } else {
        res.status(200).json({
          ok: true,
          message: "User found",
          info: user,
        });
      }
    } catch (error) {
      res.status(error?.status || 500).json({
        ok: false,
        message: error?.message || error,
      });
    }
  }
}

module.exports = UsersController;
