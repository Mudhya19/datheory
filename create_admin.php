<?php

require_once 'vendor/autoload.php';

use Illuminate\Support\Facades\Hash;
use App\Models\User;

// Create the artisan application to access Laravel functionality
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Check if admin user already exists
$admin = User::where('email', 'admin@portfolio.com')->first();

if (!$admin) {
    $admin = User::create([
        'name' => 'Admin User',
        'email' => 'admin@portfolio.com',
        'password' => Hash::make('password123'),
    ]);

    echo "Admin user created successfully!\n";
    echo "Email: admin@portfolio.com\n";
    echo "Password: password123\n";
} else {
    echo "Admin user already exists!\n";
    echo "Email: admin@portfolio.com\n";
    echo "Password: password123\n";
}
