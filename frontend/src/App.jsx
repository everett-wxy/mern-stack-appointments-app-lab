import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ShowAppointment from "./pages/ShowAppointment";
import ShowAllAppointments from "./pages/ShowAllAppointments";
import EditAppointment from "./pages/EditAppointment";
import DeleteAppointment from "./pages/DeleteAppointment";
import CreateAppointment from "./pages/CreateAppointment";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/appointmnent" element={<ShowAllAppointments />} />
            <Route path="/appointment/:id" element={<ShowAppointment />} />
            <Route path="/appointment/create" element={<CreateAppointment />} />
            <Route path="/appointment/edit/:id" element={<EditAppointment />} />
            <Route
                path="/appointment/delete/:id"
                element={<DeleteAppointment />}
            />
        </Routes>
    );
};

export default App;
