<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HealthCheckController extends Controller
{
    public function health()
    {
        return response()->json([
            'status' => 'ok',
            'service' => 'portfolio-api',
            'version' => '1.0.0',
            'timestamp' => now()->toISOString(),
            'database' => $this->checkDatabaseConnection(),
        ]);
    }

    private function checkDatabaseConnection(): string
    {
        try {
            DB::connection()->getPdo();
            return 'connected';
        } catch (\Exception $e) {
            return 'disconnected';
        }
    }
}
