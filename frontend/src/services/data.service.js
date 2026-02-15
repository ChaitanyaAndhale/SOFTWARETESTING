import axios from 'axios';
import AuthService from './auth.service';

const API_URL = 'http://localhost:8080/api/';

const authHeader = () => {
    const user = AuthService.getCurrentUser();
    if (user && user.jwt) {
        return { Authorization: 'Bearer ' + user.jwt };
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
    return axios.post(API_URL + `tests/run/${projectId}`, {}, { headers: authHeader() });
};

const getTestRuns = (projectId) => {
    return axios.get(API_URL + `tests/project/${projectId}`, { headers: authHeader() });
};

const DataService = {
    uploadProject,
    getProjects,
    runTest,
    getTestRuns
};

export default DataService;
