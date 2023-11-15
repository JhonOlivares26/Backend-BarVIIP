require("express");

const User = require("../models/Users");
const ConfigService = require("../services/ConfigService");
const { MongoService } = require("../services/MongoService");

const colletion = "users";
const adapterDatabase = new MongoService();
const config = new ConfigService();

class BarberController {
  constructor() {}
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res   
   */
  async createBarber(req, res) {
    try {
      let payload = req.body;
      const user = new User(payload);
      user.valid();
      const response = await adapterDatabase.create(colletion, payload);
      payload._id = response.insertedId;
      res.status(201).json({
        ok: true,
        message: "User created",
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
}

module.exports = BarberController