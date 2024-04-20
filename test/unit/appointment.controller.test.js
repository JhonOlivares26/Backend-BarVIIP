const request = require('supertest');
const express = require('express');
const AppointmentController = require('../../src/controllers/appointment.controller');

const app = express();
app.use(express.json());
const appointmentController = new AppointmentController();
app.post('/appointments', appointmentController.createAppointment);
app.delete('/appointments/:id', appointmentController.deleteAppointment);
app.put('/appointments/:id', appointmentController.updateAppointment);
app.get('/appointments', appointmentController.getByFilter);

describe('AppointmentController', () => {
    // Arrange
    const appointment = {
        idBarber: '1',
        idUser: '1',
        date: '2022-16-12',
        hour: '12:00',
        address: '123 St',
        nameBarber: 'John'
    };

    let appointmentId;

    it('should create an appointment', async () => {
        // Act
        const res = await request(app)
            .post('/appointments')
            .send(appointment);

        // Assert
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('ok', true);
        expect(res.body).toHaveProperty('message', 'Appointment created');
        expect(res.body).toHaveProperty('info');

        // Save the ID of the created appointment
        appointmentId = res.body.info._id;
    });

    it('should delete an appointment', async () => {
        // Act
        const res = await request(app)
            .delete(`/appointments/${appointmentId}`);

        // Assert
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('ok', true);
        expect(res.body).toHaveProperty('message', 'Appointment deleted');
    });

    it('should update an appointment', async () => {
        // Act
        const res = await request(app)
            .put(`/appointments/${appointmentId}`)
            .send(appointment);

        // Assert
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('ok', true);
        expect(res.body).toHaveProperty('message', 'Appointment updated');
    });

    it('should get appointments by filter', async () => {
        // Act
        const res = await request(app)
            .get('/appointments')
            .send({ idBarber: '1' });

        // Assert
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('ok', true);
        expect(res.body).toHaveProperty('message', 'Appointments consulted');
        expect(res.body).toHaveProperty('info');
    });
});