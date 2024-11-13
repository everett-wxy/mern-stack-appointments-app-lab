import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowAppointment = () => {
    const [appointment, setAppointment] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        console.log("Appointment ID:", id); // Log the id to verify it's defined
        setLoading(true);

        axios
            .get(`http://localhost:5001/appointment/${id}`)
            .then((response) => {
                setAppointment(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Appointment Details</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Id</span>
                        <span>{appointment._id}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">
                            Label
                        </span>
                        <span>{appointment.label}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">
                            People
                        </span>
                        <span>{appointment["person-involved"]}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">
                            Date
                        </span>
                        <span>{appointment.date}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">
                            Purpose
                        </span>
                        <span>{appointment.purpose}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">
                            Type
                        </span>
                        <span>{appointment.type}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">
                            Company
                        </span>
                        <span>{appointment.company}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">
                            Address
                        </span>
                        <span>{appointment.address}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">
                            Comments
                        </span>
                        <span>{appointment.comments}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowAppointment;
