<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next)
    {
        // Untuk keperluan portfolio, kita gunakan basic token auth sementara
        // Di implementasi production, gunakan sistem auth lengkap

        $adminToken = env('ADMIN_TOKEN', 'admin-secret-token');
        $token = $request->header('Authorization') ?? $request->query('token');

        if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Hapus prefix Bearer jika ada
        if (str_starts_with($token, 'Bearer ')) {
            $token = substr($token, 7);
        }

        if ($token !== $adminToken) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
