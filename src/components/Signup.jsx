import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider.jsx";
import logoIcon from "../assets/logo.png";
import { signup } from "../../api/api";

const Signup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "User" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataWithCorrectField = {
                ...formData,
                PasswordHash: formData.password,
            };
            delete formDataWithCorrectField.password;
            console.log("Submitting signup form:", formDataWithCorrectField);

            const response = await signup(formDataWithCorrectField);

            if (!response.token || !response.user) {
                throw new Error("Invalid response from server.");
            }

            console.log("Signup successful:", response);


            localStorage.setItem("token", response.token);
            setUser(response.user);


            navigate("/");
        } catch (error) {
            console.error("Signup failed:", error.message);
            setMessage(error.message || "Signup failed. Please try again.");
        }
    };


    return (
        <div className="min-h-screen flex">
            {/* Left Section */}
            <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Regístrate</h1>
                <p className="text-gray-600 mb-8">Ingresa tus detalles para registrarte</p>
                <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    {/* Name Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Nombre
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customblue"
                            required
                        />
                    </div>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Correo
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Correo"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customblue"
                            required
                        />
                    </div>
                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customblue"
                            required
                        />
                    </div>
                    {/* Confirm Password Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                            Confirmar contraseña
                        </label>
                        <input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirma contraseña"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customblue"
                            required
                        />
                    </div>
                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-customblue text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Registrarme
                    </button>
                </form>
                {message && <p className="text-red-500 mt-4">{message}</p>}
                <p className="text-gray-600 mt-4">
                    ¿Ya registrado?{" "}
                    <a href="/login" className="text-customblue hover:underline">
                        Inicia Sesión
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

export default Signup;
