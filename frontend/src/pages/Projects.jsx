import React, { useState, useEffect } from 'react';
import DataService from '../services/data.service';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = () => {
        DataService.getProjects().then(
            (response) => {
                setProjects(response.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    const handleUpload = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        DataService.uploadProject(file, name, description).then(
            (response) => {
                setMessage("Project uploaded successfully!");
                setLoading(false);
                loadProjects();
                setName("");
                setDescription("");
                setFile(null);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setLoading(false);
            }
        );
    }

    const handleRunTest = (projectId) => {
        DataService.runTest(projectId).then(
            (response) => {
                alert("Test started! Status: " + response.data.status);
            },
            (error) => {
                alert("Failed to start test: " + error.message);
            }
        )
    }

    return (
        <div className="container px-6 py-8 mx-auto">
            <h3 className="text-3xl font-medium text-gray-700">Projects</h3>

            <div className="mt-8">
                <div className="p-6 bg-white rounded-md shadow-md dark:bg-gray-800">
                    <h4 className="text-xl font-semibold text-gray-700 dark:text-white">Upload New Project</h4>
                    <form onSubmit={handleUpload} className="mt-6">
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="projectName">Project Name</label>
                                <input id="projectName" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="description">Description</label>
                                <input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="file">Project File (Zip/Jar)</label>
                                <input id="file" type="file" onChange={(e) => setFile(e.target.files[0])} required className="block w-full mt-2 text-gray-700 dark:text-gray-300" />
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button type="submit" disabled={loading} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                {loading ? "Uploading..." : "Upload"}
                            </button>
                        </div>
                        {message && <div className="mt-4 text-green-500">{message}</div>}
                    </form>
                </div>
            </div>

            <div className="flex flex-col mt-8">
                <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Name</th>
                                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Description</th>
                                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Uploaded At</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {projects.map((project) => (
                                    <tr key={project.id}>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm font-medium leading-5 text-gray-900">{project.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-500">{project.description}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-500">{new Date(project.createdAt).toLocaleDateString()}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                                            <button onClick={() => handleRunTest(project.id)} className="text-indigo-600 hover:text-indigo-900 focus:outline-none underline">Run Test</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projects;
