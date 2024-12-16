import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { fetchEventAttendees, removeAttendee } from "../../api/api";

const ManageAttendees = () => {
    const { eventId } = useParams();
    const [attendees, setAttendees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(() => {

        const loadUserId = () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("You must be logged in to manage attendees.");
                    return;
                }
                const decoded = jwtDecode(token);
                setUserId(decoded.nameid);
            } catch (err) {
                console.error("Failed to decode token:", err);
                setError("Failed to decode user information. Please log in again.");
            }
        };

        loadUserId();
    }, []);

    useEffect(() => {
        if (!userId) return;

        const loadAttendees = async () => {
            try {
                const data = await fetchEventAttendees(eventId);
                console.log("Attendees:", data);
                setAttendees(data);
            } catch (err) {
                console.error("Failed to load attendees:", err);
                setError("Failed to load attendees.");
            } finally {
                setLoading(false);
            }
        };

        loadAttendees();
    }, [eventId, userId]);

    const handleRemove = async (attendeeName) => {
        const justification = prompt("Provee ina justificacion:");
        if (!justification) {
            alert("Justification is required.");
            return;
        }

        try {
            await removeAttendee(eventId, { name: attendeeName, justification });
            setAttendees((prev) => prev.filter((attendee) => attendee !== attendeeName));
            setMessage("Attendee removed successfully.");
        } catch (err) {
            console.error("Failed to remove attendee:", err);
            setError("Failed to remove attendee.");
        }
    };
    if (loading) return <div>Loading attendees...</div>;

    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Gestionar Asisitidores</h1>
            {message && <p className="text-green-500">{message}</p>}
            <ul className="space-y-2">
                {attendees.map((attendee, index) => (
                    <li
                        key={`attendee-${index}`}
                        className="flex justify-between items-center bg-gray-100 p-2 rounded shadow"
                    >
                        <span>{attendee}</span>
                        <button
                            onClick={() => handleRemove(attendee)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>


        </div>
    );
};

export default ManageAttendees;
