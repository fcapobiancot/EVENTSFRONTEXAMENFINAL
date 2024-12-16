import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUsers } from "../../api/api";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <img src="https://i.imgur.com/tKBzwsQ.jpeg" />
            <h1>Users List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.userId}>
                        <Link to={`/user/${user.userId}`}>
                            <strong>{user.name}</strong> ({user.role}) - {user.email}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
