<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\AdminUser;
use Illuminate\Support\Facades\Auth;

class AdminAuth
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->header('X-ADMIN-TOKEN');

        if (!$token) {
            return response()->json([
                'message' => 'Token required'
            ], 401);
        }

        // Try to find user by token (using remember token field)
        $adminUser = AdminUser::where('remember_token', $token)
            ->where('is_active', true)
            ->first();

        if (!$adminUser) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        // Update last login info
        $adminUser->update([
            'last_login_at' => now(),
            'last_login_ip' => $request->ip()
        ]);

        // Set the authenticated admin user for this request
        $request->attributes->set('admin_user', $adminUser);

        return $next($request);
    }
}
