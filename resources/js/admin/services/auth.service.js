import api from "../../services/api";

export function logout() {
    // Call the logout API endpoint to invalidate the token
    const token = sessionStorage.getItem("admin_token");
    if (token) {
        api.post('/admin/logout', {}, {
            headers: {
                'X-ADMIN-TOKEN': token
            }
        }).catch(() => {
            // If logout API fails, still clear the session
        });
    }

    sessionStorage.clear();
    window.location.href = "/admin/login";
}

export function getCurrentUser() {
    const token = sessionStorage.getItem("admin_token");
    if (!token) {
        return null;
    }

    let user = null;
    const userStr = sessionStorage.getItem("admin_user");
    if (userStr) {
        try {
            user = JSON.parse(userStr);
        } catch (e) {
            console.error('Error parsing user from sessionStorage:', e);
            user = null;
        }
    }

    let expiresAt = null;
    const expiresAtStr = sessionStorage.getItem("admin_expires_at");
    if (expiresAtStr) {
        try {
            expiresAt = JSON.parse(expiresAtStr);
        } catch (e) {
            console.error('Error parsing expiresAt from sessionStorage:', e);
            expiresAt = null;
        }
    }

    return {
        token: token,
        expiresAt: expiresAt,
        user: user
    };
}

export function setCurrentUser(userData, token, expiresAt) {
    sessionStorage.setItem("admin_token", token);
    sessionStorage.setItem("admin_expires_at", expiresAt);
    sessionStorage.setItem("admin_user", JSON.stringify(userData));
}