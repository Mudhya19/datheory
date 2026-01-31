<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Project resource for API responses
 *
 * Transforms Project model data for frontend consumption
 * with data specialist specific fields.
 */
class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            // Core identifiers
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,

            // Data specialist type
            'project_type' => $this->project_type?->value ?? 'data_science',
            'project_type_label' => $this->project_type_label,

            // Descriptions
            'short_description' => $this->short_description,
            'description' => $this->description,

            // Tools & technologies
            'tech_stack' => $this->tech_stack ?? [],
            'tools_used' => $this->tools_used ?? [],
            'all_tools' => $this->getAllTools(),

            // Links
            'github_url' => $this->github_url,
            'demo_url' => $this->demo_url,
            'notebook_url' => $this->notebook_url,
            'thumbnail_url' => $this->thumbnail_url,
            'image_url' => $this->image_url,

            // Link availability flags (for conditional rendering)
            'has_github' => $this->has_github,
            'has_demo' => $this->has_demo,
            'has_notebook' => $this->has_notebook,

            // Data specialist metadata
            'dataset_info' => $this->dataset_info,
            'metrics' => $this->metrics,
            'metadata' => $this->metadata,

            // Status
            'is_published' => $this->is_published,
            'featured' => $this->featured ?? false,
            'display_order' => $this->display_order ?? 0,

            // Soft delete status
            'deleted_at' => $this->deleted_at,
            'is_archived' => $this->deleted_at !== null,

            // Timestamps
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

