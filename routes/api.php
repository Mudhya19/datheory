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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Protected profile routes



});

// Admin routes protected with admin token
Route::middleware('admin.auth')->group(function () {
    // Admin authentication check
    Route::get('/admin/me', [AdminAuthController::class, 'me']);

    // Project management (admin only)
    Route::get('/projects-all', [ProjectController::class, 'getAll']);
    Route::get('/projects-archived', [ProjectController::class, 'getArchived']);

    // Project CRUD with specific permissions
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

    // Skill management
    Route::post('/skills', [SkillController::class, 'store']);
    Route::put('/skills/{skill}', [SkillController::class, 'update']);
    Route::delete('/skills/{skill}', [SkillController::class, 'destroy']);
    Route::put('/profile', [ProfileController::class, 'update']);
});

// Public routes
Route::get('/profile', [ProfileController::class, 'index']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{slug}', [ProjectController::class, 'show']);
Route::get('/project-types', [ProjectController::class, 'types']);
Route::get('/skills', [SkillController::class, 'index']);
Route::get('/skill-categories', [SkillController::class, 'categories']);

Route::get('/health', [HealthCheckController::class, 'health']);


