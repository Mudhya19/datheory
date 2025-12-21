<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends BaseResource
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
            'full_name' => $this->full_name,
            'name' => $this->full_name,
            'title' => $this->title,
            'bio' => $this->bio,
            'location' => $this->location,
            'avatar_url' => $this->avatar_url,
            'avatar' => $this->avatar_url ?? 'https://via.placeholder.com/150',
            'social_links' => $this->social_links,
            'contact' => [
                'email' => $this->email,
                'phone' => $this->phone,
            ],
            'links' => [
                'website' => $this->url,
            ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
