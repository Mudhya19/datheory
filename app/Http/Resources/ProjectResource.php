<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends BaseResource
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
            'title' => $this->title,
            'slug' => $this->slug,
            'short_description' => $this->short_description,
            'description' => $this->description,
            'content' => $this->description, // For compatibility with frontend
            'tech_stack' => $this->tech_stack,
            'github_url' => $this->github_url,
            'demo_url' => $this->demo_url,
            'thumbnail_url' => $this->thumbnail_url,
            'image_url' => $this->thumbnail_url ?? 'https://via.placeholder.com/600x400',
            'is_published' => $this->is_published,
            'metadata' => $this->metadata,
            'links' => [
                'github' => $this->github_url,
                'demo' => $this->demo_url,
            ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
