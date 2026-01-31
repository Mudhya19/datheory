<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Skill resource for API responses
 *
 * Transforms Skill model data for frontend consumption
 * with data specialist specific fields.
 */
class SkillResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,

            // Category info
            'category' => $this->category,
            'category_label' => $this->category_label,
            'skill_type' => $this->skill_type,

            // Proficiency
            'level' => $this->level,
            'proficiency' => $this->proficiency ?? 0,
            'proficiency_level' => $this->proficiency_level,
            'years_experience' => $this->years_experience,

            // Icon
            'icon' => $this->icon,
            'icon_url' => $this->icon_url,

            // Display
            'display_order' => $this->display_order ?? 0,
            'is_featured' => $this->is_featured ?? false,

            // Timestamps
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

