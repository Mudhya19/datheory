<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HealthCheckController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\AuthController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Protected project routes
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

    // Protected profile routes
    Route::put('/profile', [ProfileController::class, 'update']);

    // Protected skill routes
    Route::post('/skills', [SkillController::class, 'store']);
    Route::put('/skills/{skill}', [SkillController::class, 'update']);
    Route::delete('/skills/{skill}', [SkillController::class, 'destroy']);

    // Admin project routes
    Route::get('/projects-all', [ProjectController::class, 'getAll'])->middleware('admin.auth');
    Route::post('/projects', [ProjectController::class, 'store'])->middleware('admin.auth');
    Route::put('/projects/{project}', [ProjectController::class, 'update'])->middleware('admin.auth');
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->middleware('admin.auth');
});

// Public routes
Route::get('/profile', [ProfileController::class, 'index']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{slug}', [ProjectController::class, 'show']);
Route::get('/skills', [SkillController::class, 'index']);

Route::get('/health', [HealthCheckController::class, 'health']);
