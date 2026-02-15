import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="flex h-screen bg-gray-200 dark:bg-gray-900 font-roboto">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-600 dark:bg-gray-800">
                    <div className="flex items-center">
                        <button className="text-gray-500 focus:outline-none lg:hidden">
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center">
                        {/* Notifications or User Menu could go here */}
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-gray-900">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
