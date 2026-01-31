<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Enhance projects table for data specialist portfolio
 * Adds domain-specific fields for data science/analysis/engineering projects
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            // Project type (data_science, data_analysis, data_engineering)
            if (!Schema::hasColumn('projects', 'project_type')) {
                $table->string('project_type')->default('data_science')->after('slug');
            }

            // Dataset information
            if (!Schema::hasColumn('projects', 'dataset_info')) {
                $table->json('dataset_info')->nullable()->after('metadata');
                // Structure: { "name": "...", "source": "...", "size": "...", "format": "..." }
            }

            // Tools & technologies used (more structured than tech_stack)
            if (!Schema::hasColumn('projects', 'tools_used')) {
                $table->json('tools_used')->nullable()->after('tech_stack');
                // Structure: ["Python", "Pandas", "Scikit-learn", ...]
            }

            // Notebook/repository links
            if (!Schema::hasColumn('projects', 'notebook_url')) {
                $table->string('notebook_url')->nullable()->after('demo_url');
            }

            // Metrics/results (for showcasing project outcomes)
            if (!Schema::hasColumn('projects', 'metrics')) {
                $table->json('metrics')->nullable()->after('dataset_info');
                // Structure: { "accuracy": "95%", "f1_score": "0.92", ... }
            }

            // Display order for manual sorting
            if (!Schema::hasColumn('projects', 'display_order')) {
                $table->integer('display_order')->default(0)->after('featured');
            }
        });

        // Enhance skills table for data specialist
        Schema::table('skills', function (Blueprint $table) {
            // Skill type for data specialist context
            if (!Schema::hasColumn('skills', 'skill_type')) {
                $table->string('skill_type')->nullable()->after('category');
                // Examples: "language", "framework", "tool", "database", "cloud"
            }

            // Display order for manual sorting
            if (!Schema::hasColumn('skills', 'display_order')) {
                $table->integer('display_order')->default(0)->after('proficiency');
            }

            // Years of experience (optional)
            if (!Schema::hasColumn('skills', 'years_experience')) {
                $table->decimal('years_experience', 3, 1)->nullable()->after('proficiency');
            }

            // Is featured skill
            if (!Schema::hasColumn('skills', 'is_featured')) {
                $table->boolean('is_featured')->default(false)->after('display_order');
            }
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $columns = ['project_type', 'dataset_info', 'tools_used', 'notebook_url', 'metrics', 'display_order'];
            foreach ($columns as $column) {
                if (Schema::hasColumn('projects', $column)) {
                    $table->dropColumn($column);
                }
            }
        });

        Schema::table('skills', function (Blueprint $table) {
            $columns = ['skill_type', 'display_order', 'years_experience', 'is_featured'];
            foreach ($columns as $column) {
                if (Schema::hasColumn('skills', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
