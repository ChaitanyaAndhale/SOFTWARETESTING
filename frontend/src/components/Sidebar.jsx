import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaHome, FaProjectDiagram, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
    const { logout, currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <div className="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
            <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">VSQuarters</h2>
            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav>
                    <Link className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700" to="/">
                        <FaHome className="w-5 h-5" />
                        <span className="mx-4 font-medium">Dashboard</span>
                    </Link>

                    <Link className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700" to="/projects">
                        <FaProjectDiagram className="w-5 h-5" />
                        <span className="mx-4 font-medium">Projects</span>
                    </Link>
                </nav>

                <div className="flex items-center px-4 -mx-2">
                    <button onClick={handleLogout} className="flex items-center w-full px-2 py-2 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700">
                        <FaSignOutAlt className="w-5 h-5" />
                        <span className="mx-4 font-medium">Logout</span>
                    </button>
                </div>
            </div>
            <div className="mt-4 text-sm text-center text-gray-500">
                Logged in as: {currentUser?.username}
            </div>
        </div>
    );
};

export default Sidebar;
