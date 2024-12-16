import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider.jsx";
import logo from "../assets/logo.png";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="flex justify-between items-center text-black py-6 px-8 md:px-32 bg-white drop-shadow-md">
            {/* Logo */}
            <Link to="/">
                <img src={logo} alt="Logo" className="w-52 hover:scale-105 transition-all" />
            </Link>

            {/* Navigation Links */}
            <ul className="hidden xl:flex items-center gap-12 font-semibold text-base ml-auto">
                <li className="p-3 hover:bg-slate-600 hover:text-white rounded-md transition-all cursor-pointer">
                    <Link to="/explore">Explorar</Link>
                </li>
                <li className="p-3 hover:bg-slate-600 hover:text-white rounded-md transition-all cursor-pointer">
                    <Link to="/Account">Mi Cuenta</Link>
                </li>
                <li className="p-3 hover:bg-slate-600 hover:text-white rounded-md transition-all cursor-pointer">
                    <Link to="/Support">Soporte</Link>
                </li>

                {/* Conditional Rendering */}
                {user ? (
                    <li
                        className="p-3 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-all cursor-pointer"
                        onClick={handleLogout}
                    >
                        Logout
                    </li>
                ) : (
                    <li className="p-3 bg-slate-600 text-white rounded-2xl hover:bg-slate-700 transition-all cursor-pointer">
                        <Link to="/Login">Iniciar Sesion</Link>
                    </li>
                )}
            </ul>
        </header>
    );
};

export default Navbar;
