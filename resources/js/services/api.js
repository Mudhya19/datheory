import axios from "axios";

const api = axios.create({
    baseURL: "/api",
});

// Add a request interceptor to show loading
api.interceptors.request.use(
    (config) => {
        try {
            const token = sessionStorage.getItem("admin_token");
            if (token) {
                config.headers["X-ADMIN-TOKEN"] = token;
            }
        } catch (e) {
            console.error('Error accessing session storage in request interceptor:', e);
            // Don't break the request, just continue without the token
        }

        // Show loading indicator
        window.dispatchEvent(new CustomEvent('apiRequestStarted'));
        return config;
    },
    (error) => {
        // Hide loading indicator on error
        try {
            window.dispatchEvent(new CustomEvent('apiRequestFinished'));
        } catch (e) {
            console.error('Error dispatching event in request interceptor:', e);
        }
        return Promise.reject(error);
    }
);

// Add a response interceptor to hide loading
api.interceptors.response.use(
    (response) => {
        // Hide loading indicator
        try {
            window.dispatchEvent(new CustomEvent('apiRequestFinished'));
        } catch (e) {
            console.error('Error dispatching event in response interceptor:', e);
        }
        return response;
    },
    (error) => {
        // Hide loading indicator on error
        try {
            window.dispatchEvent(new CustomEvent('apiRequestFinished'));
        } catch (e) {
            console.error('Error dispatching event in response interceptor:', e);
        }
        return Promise.reject(error);
    }
);

export { api };
export default api;