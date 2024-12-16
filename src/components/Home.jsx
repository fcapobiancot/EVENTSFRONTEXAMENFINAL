import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ilustration from "../assets/ilustration1.png"
import { fetchEventById } from "../../api/api";

const Home = () => {
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const eventId = 6;

    useEffect(() => {
        const loadEvent = async () => {
            try {
                const data = await fetchEventById(eventId);
                setEvent(data); // Set the fetched event
            } catch (error) {
                console.error("Failed to load event:", error);
            } finally {
                setLoading(false);
            }
        };

        loadEvent();
    }, [eventId]);

    const handleClick = () => {
        navigate(`/events/${eventId}`);
    };

    const handleCreateEventClick = () => {
        navigate("/createEvent");
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading event...</div>;
    }

    if (!event) {
        return <div className="flex justify-center items-center h-screen">Event not found.</div>;
    }

    return (
        <div className="w-full">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left Column (Text Content) */}
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-500 uppercase">{event.category || "Evento"}</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mt-2">
                            {event.title}
                        </h1>
                        <p className="text-gray-600 mt-4 leading-relaxed">
                            {event.description}
                        </p>
                        <button
                            className="inline-block mt-6 px-6 py-2 border border-gray-800 text-gray-800 rounded-full hover:bg-slate-400 hover:text-white transition"
                            onClick={handleClick}
                        >
                            Quiero Asistir!
                        </button>
                    </div>
                    {/* Right Column (Image) */}
                    <div className="flex justify-center md:justify-end">
                        <img
                            src={event.imageUrl || "https://via.placeholder.com/400"}
                            alt={event.title}
                            className="w-full h-auto rounded-lg shadow-lg max-w-md object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Secondary Section */}
            <div className="mt-20 w-full bg-blue-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Illustration on the left */}
                        <div className="flex justify-center md:justify-start">
                            <img
                                src={ilustration}
                                alt="People planning event"
                                className="w-full max-w-sm h-auto"
                            />
                        </div>
                        {/* Text + Button on the right */}
                        <div className="flex flex-col">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                                Crea tu evento
                            </h2>
                            <p className="text-gray-600 mb-6">
                                ¿Tienes algo especial en mente? Comienza a planificar tu próximo evento con nosotros.
                            </p>
                            <button
                                onClick={handleCreateEventClick}
                                className="inline-block px-6 py-2 bg-customblue text-white rounded-full hover:bg-slate-400 transition-shadow shadow-md"
                            >
                                Crear Evento
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
