<?php

namespace Database\Seeders;

use App\Models\AdminRole;
use App\Models\AdminUser;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create Roles
        $adminRole = AdminRole::firstOrCreate(
            ['name' => 'admin'],
            [
                'display_name' => 'Administrator',
                'permissions' => ['*'], // Full access
                'description' => 'Full system access'
            ]
        );

        $editorRole = AdminRole::firstOrCreate(
            ['name' => 'editor'],
            [
                'display_name' => 'Editor',
                'permissions' => [
                    'projects.*',
                    'skills.*',
                    'profile.*',
                    'users.view'
                ],
                'description' => 'Can manage content but not users'
            ]
        );

        // 2. Create Default Admin User
        $email = env('ADMIN_EMAIL', 'admin@datheory.local');

        // Check if exists
        if (!AdminUser::where('email', $email)->exists()) {
            AdminUser::create([
                'name' => 'System Admin',
                'email' => $email,
                'password' => Hash::make(env('ADMIN_PASSWORD', 'admin123')), // Using Hash explicitly
                'role_id' => $adminRole->id,
                'is_active' => true,
            ]);
            $this->command->info("Admin user created: {$email}");
        } else {
            $this->command->info("Admin user already exists: {$email}");
        }
    }
}
