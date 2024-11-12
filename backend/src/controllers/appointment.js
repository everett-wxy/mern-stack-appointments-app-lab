import Appointment from "../models/Appointment.js";

export const createAppointment = async (req, res) => {
    try {
        const newAppointment = {
            label: req.body.label,
            type: req.body.type,
            purpose: req.body.purpose,
            company: req.body.company,
            "person-involved": req.body["person-involved"],
            address: req.body.address,
            date: req.body.date,
            comments: req.body.comments,
        };
        await Appointment.create(newAppointment);
        const totalAppointments = await Appointment.find().select(
            "label date _id"
        );
        res.json({
            status: "ok",
            msg: "new appointment added",
            totalAppointments,
        });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error adding appointment",
        });
    }
};

export const getAllAppointment = async (req, res) => {
    try {
        const allAppointment = await Appointment.find().select(
            "label date _id"
        );
        res.json(allAppointment);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error getting all appointments",
        });
    }
};

export const getAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const appointment = await Appointment.findById(appointmentId);
        res.json(appointment);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error getting this appointment",
        });
    }
};

export const deleteAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        await Appointment.findByIdAndDelete(appointmentId);
        const remainingAppointments = await Appointment.find().select(
            "label date _id"
        );
        res.json({
            status: "ok",
            msg: "appointment deleted",
            remainingAppointments,
        });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error deleting this appointment",
        });
    }
};

export const updateAppointment = async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const oldAppointment = await Appointment.findById(appointmentId);

        if (!oldAppointment) {
            return res.status(400).json({
                status: "error",
                msg: "appointment not found",
            });
        }
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            req.body,
            { new: true }
        );
        res.json({
            status: "ok",
            msg: "appointment updated",
            oldAppointment,
            updatedAppointment,
        });
    } catch (error) {
        console.error(error.msg);
        res.status(400).json({
            status: "error",
            msg: "error updating this appointment",
        });
    }
};
