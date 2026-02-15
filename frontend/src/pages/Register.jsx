import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/auth.service';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("DEVELOPER");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);

        AuthService.register(username, password, role).then(
            (response) => {
                setMessage(response.data.message || "Registration successful!");
                setSuccessful(true);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            }
        );
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                    Create an Account
                </h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    {!successful && (
                        <>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">Username</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">Role</label>
                                <select
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="DEVELOPER">Developer</option>
                                    <option value="TESTER">Tester</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full px-4 py-2 font-bold text-white bg-primary rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            >
                                Sign Up
                            </button>
                        </>
                    )}

                    {message && (
                        <div className={`text-sm ${successful ? "text-green-500" : "text-red-500"}`} role="alert">
                            {message}
                        </div>
                    )}

                    {successful && (
                        <div className="text-center mt-4">
                            <Link to="/login" className="text-primary hover:underline">Proceed to Login</Link>
                        </div>
                    )}
                </form>
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
