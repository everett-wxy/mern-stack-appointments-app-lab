import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    label: { type: String, require: true },
    type: { type: String, default: "general" },
    purpose: { type: String, default: "general" },
    company: { type: String, default: "unlisted" },
    "person-involved": { type: String, default: "unlisted" },
    address: { type: String, default: "unlisted" },
    date: { type: Date },
    comments: { type: String },
});

export default mongoose.model("Appointment", AppointmentSchema);
