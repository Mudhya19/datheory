<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Profile;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Profile::create([
            'full_name' => 'Datheory',
            'title' => 'Data Science & Machine Learning Enthusiast',
            'bio' => 'Saya fokus membangun dasar data analysis dan machine learning melalui project studi case sampai use case.',
            'email' => 'email@domain.com',
            'phone' => '08xxxxxxxx',
            'url' => 'https://github.com/username',
            'avatar_url' => 'https://via.placeholder.com/150',
            'location' => 'Indonesia',
            'social_links' => json_encode([
                'github' => 'https://github.com/username',
                'linkedin' => 'https://linkedin.com/in/username',
                'twitter' => 'https://twitter.com/username'
            ])
        ]);
    }
}
