import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Ensure you have `npm install jwt-decode`
import { fetchEventById, registerForEvent, unregisterFromEvent, checkAttendance } from "../../api/api";

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [isAttending, setIsAttending] = useState(false);
    const navigate = useNavigate();

    const getUserIdFromToken = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return null;
        }
        try {
            const decoded = jwtDecode(token);
            return decoded.nameid;
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    };

    useEffect(() => {
        const loadEventDetails = async () => {
            try {
                const data = await fetchEventById(id);
                setEvent(data);

                const userId = getUserIdFromToken();
                if (userId) {

                    const attending = await checkAttendance(id, userId);
                    setIsAttending(attending);
                }
            } catch (error) {
                console.error("Failed to load event:", error);
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        loadEventDetails();
    }, [id, navigate]);

    const handleAttendToggle = async () => {
        const userId = getUserIdFromToken();
        if (!userId) {
            setMessage("You must be logged in to attend or unregister from this event.");
            return;
        }

        try {
            const response = isAttending
                ? await unregisterFromEvent(id, userId)
                : await registerForEvent(id, userId);

            setMessage(response.message);


            setEvent((prev) => ({
                ...prev,
                capacity: isAttending ? prev.capacity + 1 : prev.capacity - 1,
                attendeeNames: isAttending
                    ? prev.attendeeNames.filter((name) => name !== "You")
                    : [...(prev.attendeeNames || []), "You"],
            }));

            setIsAttending(!isAttending);
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to update attendance.");
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading event...</div>;
    }

    return (
        <div className="min-h-screen bg-white p-6">
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
            <p className="text-gray-700">{event.description}</p>
            <p className="text-gray-700">Date: {new Date(event.dateTime).toLocaleDateString()}</p>
            <p className="text-gray-700">Location: {event.location}</p>
            <p className="text-gray-700">Capacity: {event.capacity}</p>

            <div className="mt-4">
                <button
                    onClick={handleAttendToggle}
                    className={`px-4 py-2 rounded ${isAttending ? "bg-red-500 hover:bg-red-700" : "bg-blue-500 hover:bg-blue-700"
                        } text-white`}
                    disabled={event.capacity === 0 && !isAttending}
                >
                    {isAttending ? "Deaslistarme" : "Alistarme"}
                </button>
                {message && <p className="mt-2 text-red-500">{message}</p>}
            </div>

            <h2 className="text-2xl font-bold mt-8">Attendees</h2>
            <ul>
                {(event.attendeeNames || []).map((name, index) => (
                    <li key={index} className="text-gray-700">{name}</li>
                ))}
            </ul>
        </div>
    );
};

export default EventDetails;
