<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = [
        'name',
        'category',
        'level',
        'proficiency',
        'icon_url'
    ];

    protected $casts = [
        'proficiency' => 'integer'
    ];

    protected $appends = ['icon'];

    public function getIconAttribute()
    {
        // Default icon if none exists
        return $this->icon_url ?? 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/' . strtolower($this->name) . '/' . strtolower($this->name) . '-original.svg';
    }
}
