import axios from 'axios';
import AuthService from './auth.service';

const API_URL = 'http://localhost:4000/api/';

const authHeader = () => {
    const user = AuthService.getCurrentUser();
    if (user && user.access_token) {
        return { Authorization: 'Bearer ' + user.access_token };
    } else {
        return {};
    }
};

const uploadProject = (file, name, description) => {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("description", description);

    return axios.post(API_URL + "projects/upload", formData, {
        headers: {
            ...authHeader(),
            "Content-Type": "multipart/form-data",
        },
    });
};

const getProjects = () => {
    return axios.get(API_URL + "projects", { headers: authHeader() });
};

const runTest = (projectId) => {
    return axios.post(API_URL + `test-runs/${projectId}`, {}, { headers: authHeader() });
};

const getTestRuns = (projectId) => {
    return axios.get(API_URL + `test-runs/project/${projectId}`, { headers: authHeader() });
};

const DataService = {
    uploadProject,
    getProjects,
    runTest,
    getTestRuns
};

export default DataService;
