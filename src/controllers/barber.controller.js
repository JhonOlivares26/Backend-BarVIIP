require("express");
const { generateHash } = require("../services/Bcrypt");
const Barber = require("../models/barbers");
const ConfigService = require("../services/ConfigService");
const { MongoService } = require("../services/MongoService");

const colletion = "barbers";
const adapterDatabase = new MongoService();
const config = new ConfigService();

class BarbersController {
  constructor() {}
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async createBarber(req, res) {
    try {
      let payload = req.body;
      const barber = new Barber(payload);
      barber.valid();
      payload.password = await generateHash(payload.password);
      delete payload.confirmPassword;
      let filter = {
        email: payload.email,
      };
      const existBarber = await adapterDatabase.findOne(colletion, filter);
      if (existBarber) {
        throw {
          status: 400,
          message: "Exist already email",
        };
      }
      const response = await adapterDatabase.create(colletion, payload);
      payload._id = response.insertedId;
      res.status(201).json({
        ok: true,
        message: "Barber created successfully",
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
  async deleteBarber(req, res) {
    try {
      const id = req.params.id;
      const { deletedCount: count } = await adapterDatabase.delete(
        colletion,
        id
      );
      if (count == 0) {
        throw { status: 404, message: "Barber not found in database." };
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
  async updateBarber(req, res) {
    try {
      const payload = req.body;
      const id = req.params.id;
      const barber = new Barber(payload);
      barber.valid();
      payload.password = await generateHash(payload.password);
      delete payload.confirmPassword;
      const { modifiedCount: count } = await adapterDatabase.update(
        colletion,
        payload,
        id
      );
      if (count == 0) {
        res.status(404).json({
          ok: false,
          message: "Barber not found",
        });
      } else {
        res.status(200).json({
          ok: true,
          message: "Barber edited succesfully",
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
  async getBarber(req, res) {
    try {
      const id = req.params.id;
      const barber = await adapterDatabase.getById(colletion, id);
      if (!barber) {
        res.status(404).json({
          ok: false,
          message: "Barber not found",
        });
      } else {
        res.status(200).json({
          ok: true,
          message: "Barber found",
          info: barber,
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

module.exports = BarbersController;
