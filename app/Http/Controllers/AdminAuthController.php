<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AdminUser;
use Illuminate\Support\Str;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $adminUser = AdminUser::where('email', $request->email)
            ->where('is_active', true)
            ->first();

        if (!$adminUser || !\Illuminate\Support\Facades\Hash::check($request->password, $adminUser->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Generate a new token
        $token = Str::random(60);
        $adminUser->update(['remember_token' => $token]);

        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $adminUser->id,
                'name' => $adminUser->name,
                'email' => $adminUser->email,
                'role' => $adminUser->role->name,
                'role_display_name' => $adminUser->role->display_name,
                'permissions' => $adminUser->getAllPermissions(),
            ],
            'expires_at' => now()->addHours(24)->timestamp // 24 hours token expiry
        ]);
    }

    public function logout(Request $request)
    {
        $token = $request->header('X-ADMIN-TOKEN');

        if ($token) {
            $adminUser = AdminUser::where('remember_token', $token)->first();
            if ($adminUser) {
                $adminUser->update(['remember_token' => null]);
            }
        }

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function me(Request $request)
    {
        $adminUser = $request->attributes->get('admin_user');

        if (!$adminUser) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return response()->json([
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
