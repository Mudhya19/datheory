<?php

namespace App\Http\Controllers\Api;

use App\Enums\SkillCategory;
use App\Http\Controllers\Controller;
use App\Http\Resources\SkillResource;
use App\Models\Skill;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

/**
 * Skill Controller
 *
 * Handles skill-related API endpoints for data specialist portfolio.
 * Supports categorization, proficiency tracking, and featured skills.
 */
class SkillController extends Controller
{
    use ApiResponse;

    /**
     * Validation rules for creating a skill
     */
    private function storeRules(): array
    {
        return [
            'name' => 'required|string|max:100',
            'category' => 'required|string|max:100',
            'skill_type' => 'nullable|string|max:50',
            'level' => 'nullable|string|max:50',
            'proficiency' => 'nullable|integer|min:0|max:100',
            'years_experience' => 'nullable|numeric|min:0|max:50',
            'icon_url' => 'nullable|url|max:500',
            'display_order' => 'integer|min:0',
            'is_featured' => 'boolean',
        ];
    }

    /**
     * Validation rules for updating a skill
     */
    private function updateRules(): array
    {
        $rules = $this->storeRules();

        // Make required fields optional
        $rules['name'] = 'sometimes|string|max:100';
        $rules['category'] = 'sometimes|string|max:100';

        return $rules;
    }

    // ─────────────────────────────────────────────────────────────
    // PUBLIC ENDPOINTS
    // ─────────────────────────────────────────────────────────────

    /**
     * GET /api/skills
     * List all skills (public)
     */
    public function index(Request $request): JsonResponse
    {
        $query = Skill::ordered();

        // Filter by category
        if ($request->has('category') && in_array($request->category, SkillCategory::values())) {
            $query->inCategory($request->category);
        }

        // Featured only
        if ($request->boolean('featured')) {
            $query->featured();
        }

        // Grouped by category (optional)
        if ($request->boolean('grouped')) {
            return $this->success(Skill::groupedByCategory());
        }

        $skills = $query->get();

        return $this->success(SkillResource::collection($skills));
    }

    /**
     * GET /api/skill-categories
     * Get available skill categories
     */
    public function categories(): JsonResponse
    {
        return $this->success(SkillCategory::options());
    }

    // ─────────────────────────────────────────────────────────────
    // ADMIN ENDPOINTS
    // ─────────────────────────────────────────────────────────────

    /**
     * POST /api/skills
     * Create new skill
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate($this->storeRules());

        try {
            $skill = DB::transaction(function () use ($validated) {
                return Skill::create($validated);
            });

            return $this->created(
                new SkillResource($skill),
                'Skill created successfully'
            );
        } catch (\Exception $e) {
            report($e);
            return $this->serverError('Failed to create skill');
        }
    }

    /**
     * PUT /api/skills/{skill}
     * Update skill
     */
    public function update(Request $request, Skill $skill): JsonResponse
    {
        $validated = $request->validate($this->updateRules());

        try {
            DB::transaction(function () use ($skill, $validated) {
                $skill->update($validated);
            });

            return $this->success(
                new SkillResource($skill->fresh()),
                'Skill updated successfully'
            );
        } catch (\Exception $e) {
            report($e);
            return $this->serverError('Failed to update skill');
        }
    }

    /**
     * DELETE /api/skills/{skill}
     * Delete skill
     */
    public function destroy(Skill $skill): JsonResponse
    {
        try {
            $skill->delete();

            return $this->success(null, 'Skill deleted successfully');
        } catch (\Exception $e) {
            report($e);
            return $this->serverError('Failed to delete skill');
        }
    }
}

