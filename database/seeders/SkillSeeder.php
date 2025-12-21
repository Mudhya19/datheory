<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Skill;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Skill::create([
            'name' => 'Python',
            'category' => 'Programming',
            'level' => 'advanced',
            'proficiency' => 90,
            'icon_url' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
        ]);

        Skill::create([
            'name' => 'Machine Learning',
            'category' => 'Data Science',
            'level' => 'intermediate',
            'proficiency' => 75,
            'icon_url' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg'
        ]);

        Skill::create([
            'name' => 'SQL',
            'category' => 'Database',
            'level' => 'advanced',
            'proficiency' => 85,
            'icon_url' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
        ]);

        Skill::create([
            'name' => 'React',
            'category' => 'Frontend',
            'level' => 'intermediate',
            'proficiency' => 70,
            'icon_url' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
        ]);

        Skill::create([
            'name' => 'Laravel',
            'category' => 'Backend',
            'level' => 'intermediate',
            'proficiency' => 75,
            'icon_url' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg'
        ]);
    }
}
