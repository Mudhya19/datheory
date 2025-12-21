<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Project;

class AdminApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_project()
    {
        $projectData = [
            'title' => 'Test Project',
            'slug' => 'test-project',
            'description' => 'Test description',
            'short_description' => 'Short desc',
            'tech_stack' => ['PHP', 'Laravel'],
            'github_url' => 'https://github.com/test',
            'demo_url' => 'https://demo.com',
            'is_published' => true
        ];

        $project = Project::create($projectData);

        $this->assertDatabaseHas('projects', [
            'title' => 'Test Project',
            'slug' => 'test-project',
        ]);
    }

    public function test_admin_can_update_project()
    {
        $project = Project::factory()->create();

        $project->update([
            'title' => 'Updated Project',
            'slug' => 'updated-project',
        ]);

        $this->assertDatabaseHas('projects', [
            'id' => $project->id,
            'title' => 'Updated Project',
            'slug' => 'updated-project',
        ]);
    }

    public function test_admin_can_delete_project()
    {
        $project = Project::factory()->create();

        $project->delete();

        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
    }
}
