import express from "express";
import {
    createAppointment,
    getAllAppointment,
    getAppointment,
    deleteAppointment,
    updateAppointment,
} from "../controllers/appointment.js";
const router = express.Router();

router.post("/create", createAppointment);
router.get("/", getAllAppointment);
router.get("/:id", getAppointment);
router.delete("/delete/:id", deleteAppointment);
router.patch("/update/:id", updateAppointment);

export default router;
