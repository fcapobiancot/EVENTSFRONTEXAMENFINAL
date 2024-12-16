import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Account = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                // Decode the token to get user details
                const decoded = jwtDecode(token);

                setUser({
                    email: decoded.email,
                });
            } catch (error) {
                console.error("Failed to load user data:", error);
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        loadUser();
    }, [navigate]);

    if (!user) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-start px-10 sm:px-20 bg-white">
            {/* Main Container */}
            <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
                {/* Header Section */}
                <div className="flex-1 lg:max-w-xs">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Mi Cuenta</h1>
                    <p className="text-lg text-gray-700">{user.email}</p>
                </div>

                {/* Cards Section */}
                <div className="flex flex-col sm:flex-row gap-6 lg:flex-1">
                    {/* Personal Information Card */}
                    <div className="w-full sm:w-1/2 lg:w-auto bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:shadow-xl transition">
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center mr-4">
                                <span className="text-lg font-bold text-gray-600">AE</span>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                <Link to="/account/info" className="cursor-pointer">Información Personal</Link>
                            </h2>
                        </div>
                        <p className="text-gray-600">Detalles de tu información personal</p>
                    </div>

                    {/* My Events Card */}
                    <div className="w-full sm:w-1/2 lg:w-auto bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:shadow-xl transition">
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center mr-4">
                                <span className="text-lg font-bold text-gray-600">📊</span>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                <Link to="/account/events" className="cursor-pointer">Mis Eventos</Link>
                            </h2>
                        </div>
                        <p className="text-gray-600">Detalles de los eventos que has creado</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
