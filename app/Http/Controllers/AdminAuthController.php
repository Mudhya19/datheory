<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AdminUser;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Eager load role to prevent null access later
        $adminUser = AdminUser::with('role')
            ->where('email', $request->email)
            ->where('is_active', true)
            ->first();

        if (!$adminUser || !Hash::check($request->password, $adminUser->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Validate role exists
        if (!$adminUser->role) {
            return response()->json([
                'success' => false,
                'message' => 'User has no assigned role'
            ], 403);
        }

        // Generate a new token with expiration
        $token = Str::random(60);
        $expiresAt = now()->addHours(24);

        $adminUser->update([
            'remember_token' => $token,
            'token_expires_at' => $expiresAt,
            'last_login_at' => now(),
            'last_login_ip' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'token' => $token,
            'user' => [
                'id' => $adminUser->id,
                'name' => $adminUser->name,
                'email' => $adminUser->email,
                'role' => $adminUser->role->name,
                'role_display_name' => $adminUser->role->display_name,
                'permissions' => $adminUser->getAllPermissions(),
            ],
            'expires_at' => $expiresAt->timestamp
        ]);
    }

    public function logout(Request $request)
    {
        $token = $request->header('X-ADMIN-TOKEN');

        if ($token) {
            $adminUser = AdminUser::where('remember_token', $token)->first();
            if ($adminUser) {
                // Clear both token AND expiration for data consistency
                $adminUser->update([
                    'remember_token' => null,
                    'token_expires_at' => null,
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ]);
    }

    public function me(Request $request)
    {
        // Route is now protected by admin.auth middleware
        // so admin_user is always set when this method is called
        $adminUser = $request->attributes->get('admin_user');

        // Defensive check (should never happen with middleware, but safe)
        if (!$adminUser) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        // Ensure role is loaded
        $adminUser->load('role');

        if (!$adminUser->role) {
            return response()->json([
                'success' => false,
                'message' => 'User has no assigned role'
            ], 403);
        }

        return response()->json([
            'success' => true,
            'user' => [
                'id' => $adminUser->id,
                'name' => $adminUser->name,
                'email' => $adminUser->email,
                'role' => $adminUser->role->name,
                'role_display_name' => $adminUser->role->display_name,
                'permissions' => $adminUser->getAllPermissions(),
            ]
        ]);
    }
}

