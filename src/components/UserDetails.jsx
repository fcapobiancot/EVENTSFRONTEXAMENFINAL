import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserById } from "../../api/api";

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            try {
                const data = await fetchUserById(id);
                console.log("API Response:", data);
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }


    const createdEvents = user.createdEvents || [];
    const notifications = user.notifications || [];
    const attendingEvents = user.attendingEvents || [];

    return (
        <div>
            <h1>
                {user.name} ({user.role})
            </h1>
            <p>Email: {user.email}</p>

            <h2>Created Events</h2>
            <ul>
                {createdEvents.length > 0 ? (
                    createdEvents.map((event) => (
                        <li key={event.eventId}>
                            <strong>{event.title}</strong> - {event.dateTime} at {event.location}
                        </li>
                    ))
                ) : (
                    <p>No created events.</p>
                )}
            </ul>

            <h2>Notifications</h2>
            <ul>
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <li key={notification.notificationId}>
                            {notification.message} (Sent at: {notification.sentAt})
                        </li>
                    ))
                ) : (
                    <p>No notifications.</p>
                )}
            </ul>

            <h2>Attending Events</h2>
            <ul>
                {attendingEvents.length > 0 ? (
                    attendingEvents.map((event) => (
                        <li key={event.eventId}>
                            <strong>{event.title}</strong> - {event.dateTime} at {event.location}
                        </li>
                    ))
                ) : (
                    <p>No attending events.</p>
                )}
            </ul>
        </div>
    );
};

export default UserDetails;
