<?php

namespace App\Models;

use App\Enums\SkillCategory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

/**
 * Skill model for data specialist portfolio
 *
 * Represents technical skills, tools, and proficiencies
 * organized by category for data professionals.
 */
class Skill extends Model
{
    protected $fillable = [
        'name',
        'category',
        'skill_type',
        'level',
        'proficiency',
        'years_experience',
        'icon_url',
        'display_order',
        'is_featured',
    ];

    protected $casts = [
        'proficiency' => 'integer',
        'years_experience' => 'decimal:1',
        'display_order' => 'integer',
        'is_featured' => 'boolean',
    ];

    protected $attributes = [
        'proficiency' => 0,
        'display_order' => 0,
        'is_featured' => false,
    ];

    // ─────────────────────────────────────────────────────────────
    // SCOPES
    // ─────────────────────────────────────────────────────────────

    /**
     * Scope: Only featured skills
     */
    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope: Filter by category
     */
    public function scopeInCategory(Builder $query, SkillCategory|string $category): Builder
    {
        $categoryValue = $category instanceof SkillCategory ? $category->value : $category;
        return $query->where('category', $categoryValue);
    }

    /**
     * Scope: Order by display order, then by proficiency
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('display_order')->orderByDesc('proficiency');
    }

    /**
     * Scope: Order by category display order
     */
    public function scopeOrderedByCategory(Builder $query): Builder
    {
        return $query->orderBy('category')->orderBy('display_order');
    }

    // ─────────────────────────────────────────────────────────────
    // ACCESSORS
    // ─────────────────────────────────────────────────────────────

    /**
     * Get skill icon with fallback to devicons
     */
    public function getIconAttribute(): string
    {
        if ($this->icon_url) {
            return $this->icon_url;
        }

        // Auto-generate devicon URL
        $slug = strtolower(str_replace([' ', '.'], '', $this->name));
        return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{$slug}/{$slug}-original.svg";
    }

    /**
     * Get proficiency level as text
     */
    public function getProficiencyLevelAttribute(): string
    {
        return match(true) {
            $this->proficiency >= 90 => 'Expert',
            $this->proficiency >= 70 => 'Advanced',
            $this->proficiency >= 50 => 'Intermediate',
            $this->proficiency >= 30 => 'Beginner',
            default => 'Learning',
        };
    }

    /**
     * Get category label
     */
    public function getCategoryLabelAttribute(): string
    {
        $category = SkillCategory::tryFrom($this->category);
        return $category?->label() ?? $this->category ?? 'Other';
    }

    // ─────────────────────────────────────────────────────────────
    // HELPER METHODS
    // ─────────────────────────────────────────────────────────────

    /**
     * Get skills grouped by category
     */
    public static function groupedByCategory(): array
    {
        $skills = self::ordered()->get();
        $grouped = [];

        foreach ($skills as $skill) {
            $category = $skill->category ?? 'other';
            if (!isset($grouped[$category])) {
                $grouped[$category] = [
                    'category' => $category,
                    'label' => $skill->category_label,
                    'skills' => [],
                ];
            }
            $grouped[$category]['skills'][] = $skill;
        }

        return array_values($grouped);
    }
}

