import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { fetchAllUsers, deleteUser, fetchAllEvents, deleteEvent } from "../../api/api";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const loadAdminData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                const decoded = jwtDecode(token);
                if (decoded.role !== "admin") {
                    navigate("/");
                    return;
                }

                // Fetch all users and events
                const [fetchedUsers, fetchedEvents] = await Promise.all([
                    fetchAllUsers(),
                    fetchAllEvents(),
                ]);

                setUsers(fetchedUsers);
                setEvents(fetchedEvents);
            } catch (err) {
                console.error("Error loading admin data:", err);
                setError("Failed to load admin data.");
            } finally {
                setLoading(false);
            }
        };

        loadAdminData();
    }, [navigate]);

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            setUsers((prev) => prev.filter((user) => user.userId !== id));
        } catch (err) {
            console.error("Failed to delete user:", err);
            alert("Failed to delete user.");
        }
    };

    const handleDeleteEvent = async (id) => {
        try {
            await deleteEvent(id);
            setEvents((prev) => prev.filter((event) => event.eventId !== id));
        } catch (err) {
            console.error("Failed to delete event:", err);
            alert("Failed to delete event.");
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col px-10 sm:px-20 py-10 bg-white">
            <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
            <p className="text-lg text-gray-700 mb-6">Welcome, Admin!</p>

            {/* Manage Users */}
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <div className="space-y-4 mb-8">
                {users.map((user) => (
                    <div
                        key={user.userId}
                        className="p-4 border rounded shadow flex justify-between items-center"
                    >
                        <div>
                            <p className="font-bold">{user.name}</p>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-gray-600">Role: {user.role}</p>
                        </div>
                        <button
                            onClick={() => handleDeleteUser(user.userId)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {/* Manage Events */}
            <h2 className="text-2xl font-bold mb-4">Manage Events</h2>
            <div className="space-y-4">
                {events.map((event) => (
                    <div
                        key={event.eventId}
                        className="p-4 border rounded shadow flex justify-between items-center"
                    >
                        <div>
                            <p className="font-bold">{event.title}</p>
                            <p className="text-gray-600">
                                Date: {new Date(event.dateTime).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600">Location: {event.location}</p>
                        </div>
                        <button
                            onClick={() => handleDeleteEvent(event.eventId)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
