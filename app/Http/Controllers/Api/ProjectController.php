<?php

namespace App\Http\Controllers\Api;

use App\Enums\ProjectType;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;

/**
 * Project Controller
 *
 * Handles all project-related API endpoints for the data specialist portfolio.
 * Supports filtering by project type, CRUD operations, and soft delete management.
 */
class ProjectController extends Controller
{
    use ApiResponse;

    /**
     * Validation rules for creating a project
     */
    private function storeRules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects,slug',
            'project_type' => 'required|string|in:' . implode(',', ProjectType::values()),
            'short_description' => 'required|string|max:500',
            'description' => 'required|string',
            'tech_stack' => 'nullable|array',
            'tech_stack.*' => 'string|max:100',
            'tools_used' => 'nullable|array',
            'tools_used.*' => 'string|max:100',
            'github_url' => 'nullable|url|max:500',
            'demo_url' => 'nullable|url|max:500',
            'notebook_url' => 'nullable|url|max:500',
            'thumbnail_url' => 'nullable|url|max:500',
            'is_published' => 'boolean',
            'featured' => 'boolean',
            'display_order' => 'integer|min:0',
            'metadata' => 'nullable|array',
            'dataset_info' => 'nullable|array',
            'dataset_info.name' => 'nullable|string|max:255',
            'dataset_info.source' => 'nullable|string|max:255',
            'dataset_info.size' => 'nullable|string|max:100',
            'dataset_info.format' => 'nullable|string|max:100',
            'metrics' => 'nullable|array',
        ];
    }

    /**
     * Validation rules for updating a project
     */
    private function updateRules(int $projectId): array
    {
        $rules = $this->storeRules();

        // Make all rules optional for update
        foreach ($rules as $key => $rule) {
            if (is_string($rule)) {
                $rules[$key] = str_replace('required|', 'sometimes|', $rule);
            }
        }

        // Unique slug should exclude current project
        $rules['slug'] = 'sometimes|string|max:255|unique:projects,slug,' . $projectId;

        return $rules;
    }

    // ─────────────────────────────────────────────────────────────
    // PUBLIC ENDPOINTS
    // ─────────────────────────────────────────────────────────────

    /**
     * GET /api/projects
     * List published projects for public view
     */
    public function index(Request $request): JsonResponse
    {
        $query = Project::published()->ordered();

        // Filter by project type if specified
        if ($request->has('type') && in_array($request->type, ProjectType::values())) {
            $query->ofType($request->type);
        }

        // Optional: featured only
        if ($request->boolean('featured')) {
            $query->featured();
        }

        $projects = $query->get();

        return $this->success(ProjectResource::collection($projects));
    }

    /**
     * GET /api/projects/{slug}
     * Show single project by slug
     */
    public function show(string $slug): JsonResponse
    {
        try {
            $project = Project::where('slug', $slug)->firstOrFail();

            return $this->success(new ProjectResource($project));
        } catch (ModelNotFoundException) {
            return $this->notFound('Project not found');
        }
    }

    // ─────────────────────────────────────────────────────────────
    // ADMIN ENDPOINTS
    // ─────────────────────────────────────────────────────────────

    /**
     * GET /api/projects-all
     * List all projects for admin (including drafts)
     */
    public function getAll(Request $request): JsonResponse
    {
        $query = Project::query()->ordered();

        // Filter by published status
        if ($request->has('published')) {
            $query->where('is_published', $request->boolean('published'));
        }

        // Filter by project type
        if ($request->has('type') && in_array($request->type, ProjectType::values())) {
            $query->ofType($request->type);
        }

        // Include trashed if requested
        if ($request->boolean('with_trashed')) {
            $query->withTrashed();
        }

        $projects = $query->get();

        return $this->success(ProjectResource::collection($projects));
    }

    /**
     * GET /api/projects-archived
     * List archived (soft-deleted) projects
     */
    public function getArchived(): JsonResponse
    {
        $projects = Project::onlyTrashed()->ordered()->get();

        return $this->success(ProjectResource::collection($projects));
    }

    /**
     * POST /api/projects
     * Create new project
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate($this->storeRules());

        try {
            $project = DB::transaction(function () use ($validated) {
                return Project::create($validated);
            });

            return $this->created(
                new ProjectResource($project),
                'Project created successfully'
            );
        } catch (\Exception $e) {
            report($e);
            return $this->serverError('Failed to create project');
        }
    }

    /**
     * PUT /api/projects/{project}
     * Update existing project
     */
    public function update(Request $request, Project $project): JsonResponse
    {
        $validated = $request->validate($this->updateRules($project->id));

        try {
            DB::transaction(function () use ($project, $validated) {
                $project->update($validated);
            });

            return $this->success(
                new ProjectResource($project->fresh()),
                'Project updated successfully'
            );
        } catch (\Exception $e) {
            report($e);
            return $this->serverError('Failed to update project');
        }
    }

    /**
     * DELETE /api/projects/{project}
     * Archive (soft delete) project
     */
    public function destroy(Project $project): JsonResponse
    {
        try {
            $project->delete();

            return $this->success(null, 'Project archived successfully');
        } catch (\Exception $e) {
            report($e);
            return $this->serverError('Failed to archive project');
        }
    }

    /**
     * PATCH /api/projects/{id}/restore
     * Restore archived project
     */
    public function restore(int $id): JsonResponse
    {
        try {
            $project = Project::withTrashed()->findOrFail($id);
            $project->restore();

            return $this->success(
                new ProjectResource($project),
                'Project restored successfully'
            );
        } catch (ModelNotFoundException) {
            return $this->notFound('Project not found');
        } catch (\Exception $e) {
            report($e);
            return $this->serverError('Failed to restore project');
        }
    }

    /**
     * PATCH /api/projects/{project}/toggle-status
     * Toggle published status
     */
    public function toggleStatus(Project $project): JsonResponse
    {
        try {
            $project->update(['is_published' => !$project->is_published]);

            return $this->success([
                'id' => $project->id,
                'is_published' => $project->is_published,
            ], 'Project status updated successfully');
        } catch (\Exception $e) {
            report($e);
            return $this->serverError('Failed to update project status');
        }
    }

    /**
     * DELETE /api/projects/{project}/force
     * Permanently delete project (admin only)
     */
    public function forceDestroy(Project $project): JsonResponse
    {
        try {
            $project->forceDelete();

            return $this->success(null, 'Project permanently deleted');
        } catch (\Exception $e) {
            report($e);
            return $this->serverError('Failed to delete project');
        }
    }

    // ─────────────────────────────────────────────────────────────
    // UTILITY ENDPOINTS
    // ─────────────────────────────────────────────────────────────

    /**
     * GET /api/project-types
     * Get available project types for dropdowns
     */
    public function types(): JsonResponse
    {
        return $this->success(ProjectType::options());
    }
}

