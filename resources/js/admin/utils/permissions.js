import { getCurrentUser } from '../services/auth.service';

/**
 * Check if the current user has a specific permission
 * @param {string} permission - The permission to check
 * @returns {boolean} - True if user has the permission, false otherwise
 */
export function hasPermission(permission) {
    const currentUser = getCurrentUser();

    if (!currentUser || !currentUser.user) {
        return false;
    }

    // Check if user has wildcard permission (all permissions)
    if (currentUser.user.permissions.includes('*')) {
        return true;
    }

    // Check for exact permission match
    if (currentUser.user.permissions.includes(permission)) {
        return true;
    }

    // Check for wildcard permission groups (e.g., 'projects.*' matches 'projects.view')
    for (const perm of currentUser.user.permissions) {
        if (perm.endsWith('.*')) {
            const prefix = perm.slice(0, -2); // Remove '.*' from the end
            if (permission.startsWith(prefix)) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Check if the current user has any of the given permissions
 * @param {Array<string>} permissions - Array of permissions to check
 * @returns {boolean} - True if user has any of the permissions, false otherwise
 */
export function hasAnyPermission(permissions) {
    return permissions.some(permission => hasPermission(permission));
}

/**
 * Check if the current user has all of the given permissions
 * @param {Array<string>} permissions - Array of permissions to check
 * @returns {boolean} - True if user has all permissions, false otherwise
 */
export function hasAllPermissions(permissions) {
    return permissions.every(permission => hasPermission(permission));
}

/**
 * Get all permissions for the current user
 * @returns {Array<string>} - Array of permissions
 */
export function getAllPermissions() {
    const currentUser = getCurrentUser();

    if (!currentUser || !currentUser.user) {
        return [];
    }

    return currentUser.user.permissions || [];
}

/**
 * Check if the current user has admin role (full permissions)
 * @returns {boolean} - True if user has admin role, false otherwise
 */
export function isAdmin() {
    const currentUser = getCurrentUser();

    if (!currentUser || !currentUser.user) {
        return false;
    }

    return currentUser.user.role === 'admin';
}