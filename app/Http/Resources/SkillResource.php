<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SkillResource extends BaseResource
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
            'category' => $this->category,
            'level' => $this->level,
            'proficiency' => $this->proficiency,
            'icon_url' => $this->icon_url,
            'icon' => $this->icon_url ?? 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/' . strtolower($this->name) . '/' . strtolower($this->name) . '-original.svg',
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
