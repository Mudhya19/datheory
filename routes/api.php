<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\Api\HealthCheckController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::post('/admin/logout', [AdminAuthController::class, 'logout']);
Route::get('/admin/me', [AdminAuthController::class, 'me']);

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
});

// Admin routes protected with admin token
Route::middleware('admin.auth')->group(function () {
    Route::get('/projects-all', [ProjectController::class, 'getAll']);
    Route::get('/projects-archived', [ProjectController::class, 'getArchived']);

    // Project routes with specific permissions
    Route::middleware('admin.permission:projects.view')->get('/projects', [ProjectController::class, 'index']);
    Route::middleware('admin.permission:projects.view')->get('/projects/{project}', [ProjectController::class, 'show']);
    Route::middleware('admin.permission:projects.create')->post('/projects', [ProjectController::class, 'store']);
    Route::middleware('admin.permission:projects.edit')->put('/projects/{project}', [ProjectController::class, 'update']);
    Route::middleware('admin.permission:projects.delete')->delete('/projects/{project}', [ProjectController::class, 'destroy']);
    Route::middleware('admin.permission:projects.edit')->patch('/projects/{project}/toggle-status', [ProjectController::class, 'toggleStatus']);
    Route::middleware('admin.permission:projects.edit')->patch('/projects/{id}/restore', [ProjectController::class, 'restore']);

    // User management routes with specific permissions
    Route::middleware('admin.permission:users.view')->get('/admin-users', [AdminUserController::class, 'index']);
    Route::middleware('admin.permission:users.create')->post('/admin-users', [AdminUserController::class, 'store']);
    Route::middleware('admin.permission:users.view')->get('/admin-users/{user}', [AdminUserController::class, 'show']);
    Route::middleware('admin.permission:users.edit')->put('/admin-users/{user}', [AdminUserController::class, 'update']);
    Route::middleware('admin.permission:users.delete')->delete('/admin-users/{user}', [AdminUserController::class, 'destroy']);
});

// Public routes
Route::get('/profile', [ProfileController::class, 'index']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{slug}', [ProjectController::class, 'show']);
Route::get('/skills', [SkillController::class, 'index']);

Route::get('/health', [HealthCheckController::class, 'health']);
