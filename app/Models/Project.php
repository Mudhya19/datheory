<?php

namespace App\Models;

use App\Enums\ProjectType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

/**
 * Project model for data specialist portfolio
 *
 * Represents data science, data analysis, and data engineering projects
 * with support for datasets, metrics, and tool tracking.
 */
class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'project_type',
        'short_description',
        'description',
        'tech_stack',
        'tools_used',
        'github_url',
        'demo_url',
        'notebook_url',
        'thumbnail_url',
        'is_published',
        'featured',
        'display_order',
        'metadata',
        'dataset_info',
        'metrics',
    ];

    protected $casts = [
        'project_type' => ProjectType::class,
        'tech_stack' => 'array',
        'tools_used' => 'array',
        'metadata' => 'array',
        'dataset_info' => 'array',
        'metrics' => 'array',
        'is_published' => 'boolean',
        'featured' => 'boolean',
        'display_order' => 'integer',
    ];

    protected $attributes = [
        'project_type' => 'data_science',
        'is_published' => false,
        'featured' => false,
        'display_order' => 0,
    ];

    // ─────────────────────────────────────────────────────────────
    // SCOPES - Query builders for common filters
    // ─────────────────────────────────────────────────────────────

    /**
     * Scope: Only published projects
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    /**
     * Scope: Only featured projects
     */
    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('featured', true);
    }

    /**
     * Scope: Filter by project type
     */
    public function scopeOfType(Builder $query, ProjectType|string $type): Builder
    {
        $typeValue = $type instanceof ProjectType ? $type->value : $type;
        return $query->where('project_type', $typeValue);
    }

    /**
     * Scope: Order by display order, then by created date
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('display_order')->orderByDesc('created_at');
    }

    // ─────────────────────────────────────────────────────────────
    // ACCESSORS - Computed attributes
    // ─────────────────────────────────────────────────────────────

    /**
     * Get project type label for display
     */
    public function getProjectTypeLabelAttribute(): string
    {
        return $this->project_type?->label() ?? 'Unknown';
    }

    /**
     * Get image URL with fallback
     */
    public function getImageUrlAttribute(): string
    {
        return $this->thumbnail_url ?? 'https://via.placeholder.com/600x400?text=Data+Project';
    }

    /**
     * Check if project has notebook
     */
    public function getHasNotebookAttribute(): bool
    {
        return !empty($this->notebook_url);
    }

    /**
     * Check if project has demo
     */
    public function getHasDemoAttribute(): bool
    {
        return !empty($this->demo_url);
    }

    /**
     * Check if project has GitHub repository
     */
    public function getHasGithubAttribute(): bool
    {
        return !empty($this->github_url);
    }

    // ─────────────────────────────────────────────────────────────
    // HELPER METHODS
    // ─────────────────────────────────────────────────────────────

    /**
     * Get all tools used (combined tech_stack and tools_used)
     */
    public function getAllTools(): array
    {
        $techStack = $this->tech_stack ?? [];
        $toolsUsed = $this->tools_used ?? [];

        return array_unique(array_merge($techStack, $toolsUsed));
    }

    /**
     * Check if project uses a specific tool
     */
    public function usesTool(string $tool): bool
    {
        return in_array(
            strtolower($tool),
            array_map('strtolower', $this->getAllTools())
        );
    }
}

