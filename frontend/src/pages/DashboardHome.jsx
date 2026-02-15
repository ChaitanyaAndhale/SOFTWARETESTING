import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const DashboardHome = () => {
    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Test Executions',
                data: [12, 19, 3, 5, 2, 3],
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const barData = {
        labels: ['Project A', 'Project B', 'Project C', 'Project D'],
        datasets: [
            {
                label: 'Quality Score',
                data: [85, 92, 78, 88],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="container px-6 py-8 mx-auto">
            <h3 className="text-3xl font-medium text-gray-700">Dashboard Overview</h3>

            <div className="mt-4">
                <div className="flex flex-wrap -mx-6">
                    <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                        <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                            <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                                {/* Icon */}
                            </div>

                            <div className="mx-5">
                                <h4 className="text-2xl font-semibold text-gray-700">12</h4>
                                <div className="text-gray-500">Active Test Environments</div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                        <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                            <div className="p-3 bg-orange-600 bg-opacity-75 rounded-full">
                                {/* Icon */}
                            </div>

                            <div className="mx-5">
                                <h4 className="text-2xl font-semibold text-gray-700">24</h4>
                                <div className="text-gray-500">Total Projects</div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                        <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                            <div className="p-3 bg-green-600 bg-opacity-75 rounded-full">
                                {/* Icon */}
                            </div>

                            <div className="mx-5">
                                <h4 className="text-2xl font-semibold text-gray-700">98%</h4>
                                <div className="text-gray-500">System Uptime</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <div className="flex flex-wrap -mx-6">
                    <div className="w-full px-6 mt-6 sm:w-1/2">
                        <div className="p-6 bg-white rounded-md shadow-sm">
                            <h4 className="text-xl font-semibold text-gray-700 mb-4">Test Execution Trend</h4>
                            <Line data={lineData} />
                        </div>
                    </div>
                    <div className="w-full px-6 mt-6 sm:w-1/2">
                        <div className="p-6 bg-white rounded-md shadow-sm">
                            <h4 className="text-xl font-semibold text-gray-700 mb-4">Project Quality Scores</h4>
                            <Bar data={barData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
