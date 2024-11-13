import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const EditAppointment = () => {
    const [label, setLabel] = useState("");
    const [type, setType] = useState("");
    const [purpose, setPurpose] = useState("");
    const [company, setCompany] = useState("");
    const [person, setPerson] = useState("");
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("");
    const [comments, setComments] = useState("");
    const [loading, setLoading] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5001/appointment/${id}`)
            .then((response) => {
                setLabel(response.data.label);
                setType(response.data.type);
                setPurpose(response.data.purpose);
                setCompany(response.data.company);
                setPerson(response.data["person-involved"]);
                setAddress(response.data.address);
                setDate(response.data.date);
                setComments(response.data.comments);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert("An error happened. Please Check console");
                console.error(error.msg);
            });
    }, []);

    const handleEditAppointment = () => {
        const data = {
            label,
            type,
            purpose,
            company,
            person,
            address,
            date,
            comments,
        };
        setLoading(true);
        axios
            .patch(`http://localhost:5001/appointment/update/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate("/");
            })
            .catch((error) => {
                setLoading(false);
                alert("An error happened. Please Check console");
                console.error(error.msg);
            });
    };

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Edit Appointment</h1>
            {loading ? <Spinner /> : ""}
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Label</label>
                    <input
                        type="text"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2 w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Type</label>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2  w-full "
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">
                        Purpose
                    </label>
                    <input
                        type="text"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2  w-full "
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">
                        Company
                    </label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2  w-full "
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">
                        People Involved
                    </label>
                    <input
                        type="text"
                        value={person}
                        onChange={(e) => setPerson(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2  w-full "
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">
                        Address
                    </label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2  w-full "
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2  w-full "
                    />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">
                        Comment
                    </label>
                    <textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2  w-full "
                    />
                </div>
                <button
                    className="p-2 bg-sky-300 m-8"
                    onClick={handleEditAppointment}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditAppointment;
