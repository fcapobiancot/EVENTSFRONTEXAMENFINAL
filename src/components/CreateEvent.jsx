import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const CreateEvent = () => {
    const [isEditing] = useState({
        name: true,
        description: true,
        date: true,
        location: true,
        capacity: true,
        isPrivate: true,
    });

    const [eventData, setEventData] = useState({
        name: "",
        description: "",
        date: "",
        location: "",
        capacity: "",
        isPrivate: false,
        imageUrl: "",
    });

    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEventData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };


    const handleCreateEvent = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("User is not logged in.");

            const decoded = jwtDecode(token);
            const organizerId = decoded.nameid;

            const eventPayload = {
                title: eventData.name,
                description: eventData.description,
                dateTime: eventData.date,
                location: eventData.location,
                capacity: parseInt(eventData.capacity, 10),
                isPrivate: eventData.isPrivate,
                imageUrl: eventData.imageUrl,
                organizerId: parseInt(organizerId, 10),
            };

            const response = await fetch("http://localhost:5220/api/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(eventPayload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create event.");
            }

            setMessage("Event created successfully!");
        } catch (error) {
            console.error("Failed to create event:", error.message);
            setMessage(error.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col px-6 sm:px-20 py-10 bg-white">
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Crea tu Evento</h1>

            {/* Message */}
            {message && <div className="mb-6 text-red-500">{message}</div>}

            {/* Event Fields */}
            <div className="space-y-6">
                {/* Event Name */}
                <div className="flex justify-between items-center border-b pb-4">
                    <div>
                        <h2 className="text-lg text-gray-700">Nombre</h2>
                        {isEditing.name ? (
                            <input
                                type="text"
                                name="name"
                                value={eventData.name}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
                            />
                        ) : (
                            <p className="text-gray-600">{eventData.name}</p>
                        )}
                    </div>

                </div>

                {/* Event Description */}
                <div className="flex justify-between items-center border-b pb-4">
                    <div>
                        <h2 className="text-lg text-gray-700">Descripción</h2>
                        {isEditing.description ? (
                            <textarea
                                name="description"
                                value={eventData.description}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
                                rows="3"
                            />
                        ) : (
                            <p className="text-gray-600">{eventData.description}</p>
                        )}
                    </div>

                </div>

                {/* Event Date */}
                <div className="flex justify-between items-center border-b pb-4">
                    <div>
                        <h2 className="text-lg text-gray-700">Fecha</h2>
                        {isEditing.date ? (
                            <input
                                type="date"
                                name="date"
                                value={eventData.date}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
                            />
                        ) : (
                            <p className="text-gray-600">{eventData.date}</p>
                        )}
                    </div>

                </div>

                {/* Event Location */}
                <div className="flex justify-between items-center border-b pb-4">
                    <div>
                        <h2 className="text-lg text-gray-700">Ubicación</h2>
                        <input
                            type="text"
                            name="location"
                            value={eventData.location}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
                        />
                    </div>
                </div>

                {/* Capacity */}
                <div className="flex justify-between items-center border-b pb-4">
                    <div>
                        <h2 className="text-lg text-gray-700">Capacidad</h2>
                        <input
                            type="number"
                            name="capacity"
                            value={eventData.capacity}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
                        />
                    </div>
                </div>

                {/* Privacy */}
                <div className="flex justify-between items-center border-b pb-4">
                    <div>
                        <h2 className="text-lg text-gray-700">¿Es Privado?</h2>
                        <input
                            type="checkbox"
                            name="isPrivate"
                            checked={eventData.isPrivate}
                            onChange={handleInputChange}
                            className="h-6 w-6"
                        />
                    </div>
                </div>

                {/* Image URL */}
                <div className="flex justify-between items-center border-b pb-4">
                    <div>
                        <h2 className="text-lg text-gray-700">URL de Imagen</h2>
                        <input
                            type="text"
                            name="imageUrl"
                            value={eventData.imageUrl}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
                        />
                    </div>
                </div>
            </div>

            {/* Create Event Button */}
            <div className="flex justify-center mt-10">
                <button
                    onClick={handleCreateEvent}
                    className="bg-customblue text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
                >
                    Crear Evento
                </button>
            </div>
        </div>
    );
};

export default CreateEvent;
