<?php

require_once 'vendor/autoload.php';

use Illuminate\Support\Facades\Hash;
use App\Models\AdminUser;
use App\Models\AdminRole;

// Create the artisan application to access Laravel functionality
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Check if admin user already exists
$admin = AdminUser::where('email', 'admin@datheory.local')->first();

if (!$admin) {
    // Get the admin role (should be created by our migration)
    $adminRole = AdminRole::where('name', 'admin')->first();

    if (!$adminRole) {
        // Create default roles if they don't exist
        $adminRole = AdminRole::create([
            'name' => 'admin',
            'display_name' => 'Administrator',
            'description' => 'Full access to all admin features',
            'permissions' => ['*']
        ]);

        AdminRole::create([
            'name' => 'editor',
            'display_name' => 'Editor',
            'description' => 'Can manage content but not settings',
            'permissions' => ['projects.view', 'projects.create', 'projects.edit', 'projects.delete', 'skills.view', 'skills.create', 'skills.edit', 'skills.delete']
        ]);

        AdminRole::create([
            'name' => 'viewer',
            'display_name' => 'Viewer',
            'description' => 'Read-only access to admin panel',
            'permissions' => ['dashboard.view', 'projects.view', 'skills.view']
        ]);

        echo "Created default admin roles\n";
    }

    $admin = AdminUser::create([
        'name' => 'Admin User',
        'email' => 'admin@datheory.local',
        'password' => Hash::make('admin123'), // Using the same password as in .env
        'role_id' => $adminRole->id,
        'is_active' => true,
    ]);

    echo "Admin user created successfully!\n";
    echo "Email: admin@datheory.local\n";
    echo "Password: admin123\n";
} else {
    echo "Admin user already exists!\n";
    echo "Email: admin@datheory.local\n";
    echo "Password: admin123\n";
}
