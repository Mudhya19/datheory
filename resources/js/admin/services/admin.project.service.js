import api from "../../services/api";

export async function fetchAllProjects() {
    const token = sessionStorage.getItem("admin_token");
    const res = await api.get("/projects-all", {
        headers: {
            'X-ADMIN-TOKEN': token
        }
    });
    return res.data.data;
}

export async function getProjectById(id) {
    const token = sessionStorage.getItem("admin_token");
    const res = await api.get(`/projects/${id}`, {
        headers: {
            'X-ADMIN-TOKEN': token
        }
    });
    return res.data.data;
}

export async function fetchProjectById(id) {
    const token = sessionStorage.getItem("admin_token");
    const res = await api.get(`/projects/${id}`, {
        headers: {
            'X-ADMIN-TOKEN': token
        }
    });
    return res.data.data;
}

export async function createProject(data) {
    const token = sessionStorage.getItem("admin_token");
    const res = await api.post("/projects", data, {
        headers: {
            'X-ADMIN-TOKEN': token
        }
    });
    return res.data.data;
}

export async function updateProject(id, data) {
    const token = sessionStorage.getItem("admin_token");
    const res = await api.put(`/projects/${id}`, data, {
        headers: {
            'X-ADMIN-TOKEN': token
        }
    });
    return res.data.data;
}

export async function deleteProject(id) {
    // Archive the project instead of permanently deleting it
    const token = sessionStorage.getItem("admin_token");
    return api.delete(`/projects/${id}`, {
        headers: {
            'X-ADMIN-TOKEN': token
        }
    });
}

export async function restoreProject(id) {
    const token = sessionStorage.getItem("admin_token");
    return api.patch(`/projects/${id}/restore`, {}, {
        headers: {
            'X-ADMIN-TOKEN': token
        }
    });
}

export async function toggleProjectStatus(id) {
    const token = sessionStorage.getItem("admin_token");
    return api.patch(`/projects/${id}/toggle-status`, {}, {
        headers: {
            'X-ADMIN-TOKEN': token
        }
    });
}

export async function getArchivedProjects() {
    const token = sessionStorage.getItem("admin_token");
    const res = await api.get("/projects-archived", {
        headers: {
            'X-ADMIN-TOKEN': token
        }
    });
    return res.data.data;
}