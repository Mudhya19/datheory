import api from "../../services/api";

export async function fetchAllProjects(params = {}) {
    const res = await api.get("/projects-all", { params });
    return res.data.data;
}

export async function fetchProjectById(id) {
    const res = await api.get(`/projects/${id}`);
    return res.data.data;
}

// Alias for compatibility
export const getProjectById = fetchProjectById;

export async function createProject(data) {
    const res = await api.post("/projects", data);
    return res.data.data;
}

export async function updateProject(id, data) {
    const res = await api.put(`/projects/${id}`, data);
    return res.data.data;
}

export async function deleteProject(id) {
    return api.delete(`/projects/${id}`);
}

export async function restoreProject(id) {
    return api.patch(`/projects/${id}/restore`);
}

export async function toggleProjectStatus(id) {
    return api.patch(`/projects/${id}/toggle-status`);
}

export async function getArchivedProjects() {
    const res = await api.get("/projects-archived");
    return res.data.data;
}

export async function fetchProjectTypes() {
    const res = await api.get("/project-types");
    return res.data.data;
}