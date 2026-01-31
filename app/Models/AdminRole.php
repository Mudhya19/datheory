<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AdminRole extends Model
{
    protected $fillable = [
        'name',
        'display_name',
        'description',
        'permissions',
    ];

    protected $casts = [
        'permissions' => 'array',
    ];

    public function adminUsers(): HasMany
    {
        return $this->hasMany(AdminUser::class, 'role_id');
    }

    /**
     * Check if the role has a specific permission
     */
    public function hasPermission(string $permission): bool
    {
        $permissions = $this->permissions ?? [];

        // Check for wildcard permission (all permissions)
        if (in_array('*', $permissions)) {
            return true;
        }

        // Check for exact permission match
        if (in_array($permission, $permissions)) {
            return true;
        }

        // Check for wildcard permission groups (e.g., 'projects.*' matches 'projects.view')
        foreach ($permissions as $perm) {
            if (str_ends_with($perm, '.*')) {
                // Extract prefix correctly: 'projects.*' -> 'projects.'
                $prefix = substr($perm, 0, -1); // Remove '*', keep 'projects.'
                if (str_starts_with($permission, $prefix)) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Get all permissions for this role
     */
    public function getAllPermissions(): array
    {
        return $this->permissions ?? [];
    }
}
