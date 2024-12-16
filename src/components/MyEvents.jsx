import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { fetchEventsByOrganizerId } from '../../api/api';

const MyEvents = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadUserEvents = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No token found. Please log in.");
                }

                const decoded = jwtDecode(token);
                const organizerId = decoded.nameid;

                const fetchedEvents = await fetchEventsByOrganizerId(organizerId);
                if (fetchedEvents.length === 0) {
                    setError("You have no events created yet.");
                    setEvents([]);
                } else {
                    setEvents(fetchedEvents);
                }
            } catch (err) {
                if (err.response?.status === 404) {
                    setError("You have no events created yet.");
                    setEvents([]);
                } else {
                    console.error("Error fetching events:", err);
                    setError(err.message || "Failed to fetch events.");
                }
            } finally {
                setLoading(false);
            }
        };

        loadUserEvents();
    }, []);


    const handleCreateEventClick = () => {
        navigate('/CreateEvent');
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    const handleEditEventClick = (eventId) => {
        navigate(`/account/events/edit/${eventId}`);
    };


    return (
        <div className="min-h-screen flex flex-col px-6 sm:px-20 py-10 bg-white">
            {/* Breadcrumb */}
            <div className="mb-6 text-sm text-gray-500">
                <Link to="/account" className="hover:underline">
                    Mi cuenta
                </Link>{' '}
                &gt;{' '}
                <span className="text-gray-800 font-medium">Mis eventos</span>
            </div>

            {/* Page Title */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Mis eventos</h1>
                <button
                    onClick={handleCreateEventClick}
                    className="bg-customblue text-white py-2 px-6 rounded-lg hover:bg-slate-700 transition"
                >
                    Crear Evento
                </button>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div
                            key={event.eventId}
                            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition"
                        >
                            <img
                                src={event.imageUrl || "https://via.placeholder.com/400x200?text=No+Image"}
                                alt={event.title}
                                className="h-40 w-full object-cover"
                            />
                            <div className="p-4">
                                <div className="flex items-baseline space-x-2 mb-2">
                                    <span className="text-indigo-700 font-bold text-xl">
                                        {new Date(event.dateTime).toLocaleString("default", { month: "short" }).toUpperCase()}
                                    </span>
                                    <span className="text-xl font-bold text-gray-700">
                                        {new Date(event.dateTime).getDate()}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-gray-800 text-lg">
                                    <Link to={`/Account/events/${event.eventId}`} className="cursor-pointer">
                                        {event.title}
                                    </Link>
                                </h3>
                            </div>
                            <button
                                onClick={() => handleEditEventClick(event.eventId)}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Editar
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 text-center col-span-full">
                        {error || "You have no events created yet."}
                    </p>
                )}
            </div>

        </div>
    );
};

export default MyEvents;
