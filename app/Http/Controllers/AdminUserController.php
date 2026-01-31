<?php

namespace App\Http\Controllers;

use App\Models\AdminUser;
use App\Models\AdminRole;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

/**
 * Admin User Controller
 *
 * Handles CRUD operations for admin users.
 * Protected by admin.auth middleware and admin.permission.
 */
class AdminUserController extends Controller
{
    use ApiResponse;

    /**
     * Validation rules for creating a user
     */
    private function storeRules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:admin_users,email',
            'password' => 'required|string|min:8|max:255',
            'role_id' => 'required|integer|exists:admin_roles,id',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Validation rules for updating a user
     */
    private function updateRules(int $userId): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255|unique:admin_users,email,' . $userId,
            'password' => 'nullable|string|min:8|max:255',
            'role_id' => 'sometimes|integer|exists:admin_roles,id',
            'is_active' => 'sometimes|boolean',
        ];
    }

    /**
     * Format user data for response
     */
    private function formatUser(AdminUser $user): array
    {
        // Safely handle missing role with fallback values
        $roleData = $user->role ? [
            'id' => $user->role->id,
            'name' => $user->role->name,
            'display_name' => $user->role->display_name,
        ] : [
            'id' => null,
            'name' => 'unassigned',
            'display_name' => 'No Role Assigned',
        ];

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $roleData,
            'is_active' => $user->is_active,
            'last_login_at' => $user->last_login_at?->toISOString(),
            'created_at' => $user->created_at->toISOString(),
            'updated_at' => $user->updated_at->toISOString(),
        ];
    }

    /**
     * GET /api/admin-users
     * List all admin users
     */
    public function index(): JsonResponse
    {
        $users = AdminUser::with('role')->get();

        $formatted = $users->map(function (AdminUser $user) {
            return $this->formatUser($user);
        });

        return $this->success($formatted);
    }

    /**
     * GET /api/admin-users/{user}
     * Show single admin user
     */
    public function show(AdminUser $user): JsonResponse
    {
        $user->load('role');

        return $this->success($this->formatUser($user));
    }

    /**
     * POST /api/admin-users
     * Create new admin user
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate($this->storeRules());

        try {
            $user = DB::transaction(function () use ($validated) {
                $validated['password'] = Hash::make($validated['password']);

                return AdminUser::create($validated);
            });

            $user->load('role');

            return $this->created(
                $this->formatUser($user),
                'Admin user created successfully'
            );
        } catch (\Exception $e) {
            report($e);
            return $this->serverError('Failed to create admin user');
        }
    }

    /**
     * PUT /api/admin-users/{user}
     * Update admin user
     */
    public function update(Request $request, AdminUser $user): JsonResponse
    {
        $validated = $request->validate($this->updateRules($user->id));

        try {
            DB::transaction(function () use ($user, $validated) {
                // Hash password if provided
                if (!empty($validated['password'])) {
                    $validated['password'] = Hash::make($validated['password']);
                } else {
                    unset($validated['password']);
                }

                $user->update($validated);
            });

            $user->load('role');

            return $this->success(
                $this->formatUser($user->fresh()),
                'Admin user updated successfully'
            );
        } catch (\Exception $e) {
            report($e);
            return $this->serverError('Failed to update admin user');
        }
    }

    /**
     * DELETE /api/admin-users/{user}
     * Delete admin user
     */
    public function destroy(AdminUser $user): JsonResponse
    {
        // Prevent deletion of the primary admin (id=1)
        if ($user->id === 1) {
            return $this->forbidden('Cannot delete the primary admin user');
        }

        try {
            $user->delete();

            return $this->success(null, 'Admin user deleted successfully');
        } catch (\Exception $e) {
            report($e);
            return $this->serverError('Failed to delete admin user');
        }
    }
}

