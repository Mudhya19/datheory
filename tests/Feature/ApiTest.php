<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\User;

class ApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_health_endpoint()
    {
        $response = $this->get('/api/health');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'ok',
                'service' => 'portfolio-api',
                'version' => '1.0.0'
            ]);
    }

    public function test_profile_endpoint()
    {
        // Create a profile record for testing
        Profile::create([
            'full_name' => 'Test User',
            'title' => 'Test Title',
            'bio' => 'Test Bio',
            'email' => 'test@example.com',
            'phone' => '1234567890',
            'url' => 'https://test.com',
            'avatar_url' => 'https://via.placeholder.com/150',
            'location' => 'Test Location',
            'social_links' => json_encode([
                'github' => 'https://github.com/test',
                'linkedin' => 'https://linkedin.com/test'
            ])
        ]);

        $response = $this->get('/api/profile');

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'full_name' => 'Test User',
                    'title' => 'Test Title',
                    'bio' => 'Test Bio'
                ]
            ]);
    }

    public function test_projects_endpoint()
    {
        // Create a project record for testing
        Project::create([
            'title' => 'Test Project',
            'slug' => 'test-project',
            'short_description' => 'Test Description',
            'description' => 'Test full description',
            'tech_stack' => json_encode(['PHP', 'Laravel']),
            'github_url' => 'https://github.com/test',
            'demo_url' => 'https://demo.com',
            'thumbnail_url' => 'https://via.placeholder.com/600x400',
            'is_published' => true,
            'metadata' => json_encode([
                'problem_statement' => 'Test problem',
                'dataset_size' => '1000 rows',
                'accuracy' => '90%'
            ])
        ]);

        $response = $this->get('/api/projects');

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    [
                        'title' => 'Test Project',
                        'slug' => 'test-project',
                        'short_description' => 'Test Description',
                        'is_published' => true
                    ]
                ]
            ]);
    }

    public function test_skills_endpoint()
    {
        // Create a skill record for testing
        Skill::create([
            'name' => 'Test Skill',
            'category' => 'Test Category',
            'level' => 'intermediate',
            'proficiency' => 75,
            'icon_url' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/test/test-original.svg'
        ]);

        $response = $this->get('/api/skills');

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    [
                        'name' => 'Test Skill',
                        'category' => 'Test Category',
                        'level' => 'intermediate'
                    ]
                ]
            ]);
    }

    public function test_login_endpoint()
    {
        $user = User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password123')
        ]);

        $response = $this->post('/api/login', [
            'email' => 'test@example.com',
            'password' => 'password123'
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'token',
                'user' => [
                    'id',
                    'name',
                    'email',
                    'email_verified_at',
                    'created_at',
                    'updated_at',
                ]
            ]);
    }
}
