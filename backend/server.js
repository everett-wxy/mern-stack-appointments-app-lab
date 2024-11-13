import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from 'cors';

import dotenv from "dotenv";
import connectDB from "./src/db/db.js";
dotenv.config();
connectDB();
import appointmentRoutes from './src/routers/appointment.js'

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/appointment',appointmentRoutes);

app.listen(5001, () => {
    console.log("App is listening to port 5001");
});
