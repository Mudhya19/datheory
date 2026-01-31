<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminPermission
{
    public function handle(Request $request, Closure $next, string $permission)
    {
        $adminUser = $request->attributes->get('admin_user');

        if (!$adminUser) {
            return response()->json([
                'message' => 'Authentication required'
            ], 401);
        }

        if (!$adminUser->hasPermission($permission)) {
            return response()->json([
                'message' => 'Insufficient permissions'
            ], 403);
        }

        return $next($request);
    }
}
