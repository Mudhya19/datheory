<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Project;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Project::create([
            'title' => 'Customer Churn Prediction',
            'slug' => Str::slug('Customer Churn Prediction'),
            'short_description' => 'Predict customer churn using machine learning',
            'description' => 'Project ini bertujuan memprediksi pelanggan yang berpotensi berhenti...',
            'tech_stack' => ['Python', 'Pandas', 'Scikit-learn'],
            'github_url' => 'https://github.com/username/churn-project',
            'demo_url' => null,
            'thumbnail_url' => 'https://via.placeholder.com/600x400',
            'is_published' => true,
            'metadata' => json_encode([
                'problem_statement' => 'Memprediksi churn pelanggan',
                'dataset_size' => '10000 rows',
                'accuracy' => '85%'
            ])
        ]);
    }
}
