<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Project;

class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'slug' => $this->faker->unique()->slug,
            'description' => $this->faker->paragraph,
            'short_description' => $this->faker->sentence,
            'tech_stack' => ['PHP', 'Laravel', 'JavaScript'],
            'github_url' => $this->faker->url,
            'demo_url' => $this->faker->url,
            'thumbnail_url' => $this->faker->imageUrl,
            'is_published' => true,
            'metadata' => [],
        ];
    }
}
