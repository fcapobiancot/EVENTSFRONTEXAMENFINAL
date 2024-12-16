import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider"; // Import the AuthProvider
import logoIcon from "../assets/logo.png";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const response = await fetch("http://localhost:5220/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login failed. Please try again.");
            }

            const data = await response.json();
            console.log("Login successful:", data);

            // Save token to local storage
            localStorage.setItem("token", data.token);

            // Set user in the context
            setUser({
                id: data.user.id,
                email: data.user.email,
                role: data.user.role,
            });

            // Redirect based on user role
            if (data.user.role === "admin") {
                navigate("/dashboard"); // Redirect to admin dashboard
            } else {
                navigate("/account"); // Redirect to user account page
            }
        } catch (error) {
            console.error("Login failed:", error.message);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Section */}
            <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Login</h1>
                <p className="text-gray-600 mb-8">
                    Ingresa tu usuario y contraseña para iniciar sesión
                </p>
                <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                    {/* Error Message */}
                    {errorMessage && (
                        <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
                    )}
                    {/* Email Field */}
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Correo
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Correo"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customblue"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Password Field */}
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Contraseña"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customblue"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-customblue text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <p className="text-gray-600 mt-4">
                    ¿No tienes una cuenta?{" "}
                    <a href="/SignUp" className="text-customblue hover:underline">
                        Regístrate
                    </a>
                </p>
            </div>

            {/* Right Section */}
            <div className="hidden md:flex w-1/2 bg-customblue justify-center items-center">
                <div className="text-white text-9xl font-bold">
                    <img src={logoIcon} alt="TicketBO" className="w-52" />
                </div>
            </div>
        </div>
    );
};

export default Login;
