require("express");

const Appointment = require("../models/Appointment");
const ConfigService = require("../services/ConfigService");
const { MongoService } = require("../services/MongoService");

const colletion = "appointments";
const adapterDatabase = new MongoService();
const config = new ConfigService();

class AppointmentController {
    constructor() { }

    /**
    * @param {import('express').Request} req
    * @param {import('express').Response} res   
    */
    async createAppointment(req, res) {
        try {
            let payload = req.body;
            const appointment = new Appointment(payload);
            appointment.valid();
            let filter = {
                idBarber: payload.idBarber,
                date: payload.date
            }
            const existAppointment = await adapterDatabase.findOne(colletion, filter)
            if (existAppointment) {
                throw { status: 400, message: "The barber already has an appointment that day" }
            }
            const response = await adapterDatabase.create(colletion, payload);
            payload._id = response.insertedId;
            res.status(201).json({
                ok: true,
                message: "Appointment created",
                info: payload,
            });
        } catch (error) {
            console.error(error);
            res.status(error?.status || 500).json({
                ok: false,
                message: error?.message || error,
            });
        }
    };

    /**
    * @param {import('express').Request} req
    * @param {import('express').Response} res   
    */
    async deleteAppointment(req, res) {
        try {
            const id = req.params.id
            const { deleteCount: conut } = await adapterDatabase.delete(colletion, id)
            if (conut == 0) {
                throw { status: 400, message: "There is no appointment created" }
            }
            res.status(200).json({
                ok: true,
                message: "Appointment deleted",
                info: {}
            })
        } catch (error) {
            console.error(error);
            res.status(error?.status || 500).json({
                ok: false,
                message: error?.message || error,
            });
        }
    };

    /**
    * @param {import('express').Request} req
    * @param {import('express').Response} res   
    */
    async updateAppinment(req, res) {
        try {
            let payload = req.body
            const id = req.params.id
            const appointment = new Appointment(payload)
            appointment.valid()   
            let filter = {
                idBarber: payload.idBarber,
                date: payload.date
            }         
            const existAppointment = await adapterDatabase.findOne(colletion, filter)
            if (existAppointment) {
                throw { status: 400, message: "The barber already has an appointment that day" }
            }
            const { modifiedCount: count } = await adapterDatabase.update(colletion, payload, id);
            if (count == 0) {
                throw { status: 409, message: "Update failed" };
            }
            res.status(200).json({
                ok: true,
                message: "Appointment updated",
                info: appointment
            })
        } catch (error) {
            console.error(error);
            res.status(error?.status || 500).json({
                ok: false,
                message: error?.message || error,
            });
        }
    };

    /**
    * @param {import('express').Request} req
    * @param {import('express').Response} res   
    */
    async getByFilter(req, res) {
        try {
            let filter = req.body
            const appointments = await adapterDatabase.getByfilter(colletion, filter)
            res.status(200).json({
                ok: true,
                message: "Appointments consulted",
                info: appointments,
              });
        } catch (error) {
            console.error(error);
            res.status(error?.status || 500).json({
                ok: false,
                message: error?.message || error,
            });
        }
    };



}

module.exports = AppointmentController