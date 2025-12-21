import { api } from './api';

// Setup request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Setup response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      // Log error details for debugging
      console.error(`API Error: ${status}`, data);

      // You can handle specific status codes here
      switch (status) {
        case 401:
          // Unauthorized - redirect to login or clear token
          localStorage.removeItem('token');
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden');
          break;
        case 404:
          // Resource not found
          console.error('Resource not found');
          break;
        case 500:
          // Server error
          console.error('Server error');
          break;
        default:
          // Other errors
          console.error(`HTTP Error: ${status}`);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error - no response received', error.request);
    } else {
      // Other errors
      console.error('Error', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
