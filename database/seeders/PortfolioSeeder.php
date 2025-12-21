<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Profile;
use App\Models\Skill;
use App\Models\Project;

class PortfolioSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            ProfileSeeder::class,
            SkillSeeder::class,
            ProjectSeeder::class,
        ]);
    }
}
