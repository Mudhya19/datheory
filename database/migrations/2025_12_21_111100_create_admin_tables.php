<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('admin_roles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // admin, editor, viewer
            $table->string('display_name');
            $table->text('description')->nullable();
            $table->json('permissions')->nullable(); // Store permissions as JSON
            $table->timestamps();
        });

        Schema::create('admin_users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->unsignedBigInteger('role_id')->default(1); // Default to viewer role
            $table->boolean('is_active')->default(true);
            $table->timestamp('last_login_at')->nullable();
            $table->string('last_login_ip')->nullable();
            $table->rememberToken();
            $table->timestamps();

            $table->foreign('role_id')->references('id')->on('admin_roles')->onDelete('cascade');
        });

        // Insert default roles after table creation
        \Illuminate\Support\Facades\DB::table('admin_roles')->insert([
            [
                'name' => 'admin',
                'display_name' => 'Administrator',
                'description' => 'Full access to all admin features',
                'permissions' => json_encode(['*']), // Wildcard means all permissions
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'editor',
                'display_name' => 'Editor',
                'description' => 'Can manage content but not settings',
                'permissions' => json_encode(['projects.view', 'projects.create', 'projects.edit', 'projects.delete', 'skills.view', 'skills.create', 'skills.edit', 'skills.delete']),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'viewer',
                'display_name' => 'Viewer',
                'description' => 'Read-only access to admin panel',
                'permissions' => json_encode(['dashboard.view', 'projects.view', 'skills.view']),
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);

        // Insert default admin user after table creation
        \Illuminate\Support\Facades\DB::table('admin_users')->insert([
            'name' => 'Admin User',
            'email' => env('ADMIN_EMAIL', 'admin@datheory.local'),
            'password' => \Illuminate\Support\Facades\Hash::make(env('ADMIN_PASSWORD', 'admin123')),
            'role_id' => 1, // admin role
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_users');
        Schema::dropIfExists('admin_roles');
    }
};
