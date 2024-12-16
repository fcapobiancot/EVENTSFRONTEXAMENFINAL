import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { fetchUserById, updateUser } from '../../api/api'; // Add these API calls

const AccountInfo = () => {
    const [isEditing, setIsEditing] = useState({
        name: false,
        email: false,
        password: false,
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const decoded = jwtDecode(token);
                const userId = decoded.nameid;

                const userData = await fetchUserById(userId);
                setFormData({
                    name: userData.name,
                    email: userData.email,
                    password: '',
                });
            } catch (err) {
                console.error('Failed to load user data:', err);
                setError(err.message || 'Failed to load user data.');
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const handleEditToggle = (field) => {
        setIsEditing((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async (field) => {
        try {
            const updatedData = {
                name: field === 'name' ? formData.name : undefined,
                email: field === 'email' ? formData.email : undefined,
                password: field === 'password' ? formData.password : undefined,
            };

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const decoded = jwtDecode(token);
            const userId = decoded.nameid;

            await updateUser(userId, updatedData);

            setSuccessMessage(`${field} updated successfully.`);
            handleEditToggle(field);
        } catch (err) {
            console.error('Failed to update user:', err);
            setError(err.message || 'Failed to update user.');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col px-6 sm:px-20 py-10 bg-white">
            {/* Breadcrumb */}
            <div className="mb-6 text-sm text-gray-500">
                <Link to="/Account" className="hover:underline">
                    Mi cuenta
                </Link>{' '}
                &gt;{' '}
                <span className="text-gray-800 font-medium">Información Personal</span>
            </div>

            {/* Page Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Información Personal</h1>

            {/* Success Message */}
            {successMessage && (
                <div className="mb-4 text-green-600 font-semibold">{successMessage}</div>
            )}

            {/* Information List */}
            <div className="space-y-6">
                {/* Name */}
                <div className="flex justify-between items-center border-b pb-4">
                    <div>
                        <h2 className="text-lg text-gray-700">Nombre</h2>
                        {isEditing.name ? (
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
                            />
                        ) : (
                            <p className="text-gray-600">{formData.name}</p>
                        )}
                    </div>
                    <button
                        onClick={() =>
                            isEditing.name ? handleSave('name') : handleEditToggle('name')
                        }
                        className="text-blue-600 font-medium hover:underline"
                    >
                        {isEditing.name ? 'Guardar' : 'Editar'}
                    </button>
                </div>

                {/* Email */}
                <div className="flex justify-between items-center border-b pb-4">
                    <div>
                        <h2 className="text-lg text-gray-700">Dirección de Correo</h2>
                        {isEditing.email ? (
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
                            />
                        ) : (
                            <p className="text-gray-600">{formData.email}</p>
                        )}
                    </div>
                    <button
                        onClick={() =>
                            isEditing.email ? handleSave('email') : handleEditToggle('email')
                        }
                        className="text-blue-600 font-medium hover:underline"
                    >
                        {isEditing.email ? 'Guardar' : 'Editar'}
                    </button>
                </div>

                {/* Change Password */}
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg text-gray-700">Cambiar Contraseña</h2>
                        {isEditing.password ? (
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-md p-2 w-full text-gray-800"
                            />
                        ) : (
                            <p className="text-gray-600">{formData.password}</p>
                        )}
                    </div>
                    <button
                        onClick={() =>
                            isEditing.password ? handleSave('password') : handleEditToggle('password')
                        }
                        className="text-blue-600 font-medium hover:underline"
                    >
                        {isEditing.password ? 'Guardar' : 'Editar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountInfo;
