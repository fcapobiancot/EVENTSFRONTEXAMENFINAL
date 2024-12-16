import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEventById, updateEvent, deleteEvent } from "../../api/api";

const EditEvent = () => {
    const { eventId } = useParams();
    const [eventData, setEventData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const loadEvent = async () => {
            try {
                const data = await fetchEventById(eventId);
                setEventData(data);
            } catch (error) {
                console.error("Failed to load event:", error);
                navigate("/account/events");
            } finally {
                setLoading(false);
            }
        };

        loadEvent();
    }, [eventId, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEvent(eventId, eventData);
            setMessage("Event updated successfully!");
            navigate("/account/events");
        } catch (error) {
            console.error("Failed to update event:", error);
            setMessage("Failed to update event.");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
            return;
        }

        try {
            await deleteEvent(eventId);
            navigate("/account/events");
        } catch (err) {
            err.setError("Failed to delete the event.");
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col px-10 sm:px-20 py-10 bg-white">
            <h1 className="text-3xl font-bold mb-6">Editar Evento</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Título
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={eventData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={eventData.description}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateTime">
                        Fecha y Hora
                    </label>
                    <input
                        id="dateTime"
                        name="dateTime"
                        type="datetime-local"
                        value={eventData.dateTime}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                        Ubicación
                    </label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        value={eventData.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
                        Capacidad
                    </label>
                    <input
                        id="capacity"
                        name="capacity"
                        type="number"
                        value={eventData.capacity}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
                        Imagen URL
                    </label>
                    <input
                        id="imageUrl"
                        name="imageUrl"
                        type="text"
                        value={eventData.imageUrl}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Guardar Cambios
                </button>

                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition"
                >
                    Delete Event
                </button>
                {message && <p className="mt-4 text-green-500">{message}</p>}
            </form>
        </div>
    );
};

export default EditEvent;
