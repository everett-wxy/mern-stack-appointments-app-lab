import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5001/appointment")
            .then((response) => {
                console.log(response); // Log the entire response object
                if (response.data && response.data) {
                    setAppointments(response.data); // Set appointments if data exists
                } else {
                    console.error("Unexpected response structure:", response);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error(error.message);
                setLoading(false);
            });
    }, []);
    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Appointments List</h1>
                <Link to="/appointment/create">
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className="w-full border-separate border-spacing-2">
                    <thead>
                        <tr>
                            <th className="border border-slate-600 rounded-md">
                                No
                            </th>
                            <th className="border border-slate-600 rounded-md">
                                Title
                            </th>
                            <th className="border border-slate-600 rounded-md max-md:hidden">
                                Date
                            </th>
                            <th className="border border-slate-600 rounded-md">
                                Operations
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={appointment._id} className="h-8">
                                <td className="border border-slate-700 rounded-md text-center">
                                    {index + 1}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    {appointment.label}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                                    {appointment.date}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    <div className="flex justify-center gap-x-4">
                                        <Link
                                            to={`/appointment/${appointment._id}`}
                                        >
                                            <BsInfoCircle className="text-2xl text-green-800" />
                                        </Link>
                                        <Link
                                            to={`/appointment/edit/${appointment._id}`}
                                        >
                                            <AiOutlineEdit className="text-2xl text-yellow-600" />
                                        </Link>
                                        <Link
                                            to={`/appointment/delete/${appointment._id}`}
                                        >
                                            <MdOutlineDelete className="text-2xl text-red-600" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Home;
