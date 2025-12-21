// Service untuk mengelola proyek di admin panel
// Menggunakan API endpoint yang sudah tersedia

const API_BASE_URL = '/api';

// Header untuk permintaan API admin
const getHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

/**
 * Mendapatkan semua proyek (termasuk draft)
 */
export const getAllProjects = async() => {
    try {
        const response = await fetch(`${API_BASE_URL}/projects-all`, {
            method: 'GET',
            headers: getHeaders(),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data || data; // Handle both resource dan array langsung
    } catch (error) {
        console.error('Error fetching all projects:', error);
        throw error;
    }
};

/**
 * Mendapatkan proyek berdasarkan ID
 */
export const getProjectById = async(id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
            method: 'GET',
            headers: getHeaders(),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data || data; // Handle both resource dan array langsung
    } catch (error) {
        console.error(`Error fetching project with id ${id}:`, error);
        throw error;
    }
};

/**
 * Membuat proyek baru
 */
export const createProject = async(projectData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/projects`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(projectData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

/**
 * Memperbarui proyek
 */
export const updateProject = async(id, projectData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(projectData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error(`Error updating project with id ${id}:`, error);
        throw error;
    }
};

/**
 * Menghapus proyek
 */
export const deleteProject = async(id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // For DELETE requests, we might not always get JSON back
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            return { message: 'Project deleted successfully' };
        }
    } catch (error) {
        console.error(`Error deleting project with id ${id}:`, error);
        throw error;
    }
};