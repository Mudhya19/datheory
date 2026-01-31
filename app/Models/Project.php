<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'description',
        'tech_stack',
        'github_url',
        'demo_url',
        'thumbnail_url',
        'is_published',
        'featured',
        'metadata'
    ];

    protected $casts = [
        'tech_stack' => 'array',
        'metadata' => 'array',
        'is_published' => 'boolean',
        'featured' => 'boolean',
    ];

    protected $appends = ['description', 'content', 'image_url'];

    public function getDescriptionAttribute()
    {
        return $this->short_description;
    }

    public function getContentAttribute()
    {
        return $this->description;
    }

    public function getImageUrlAttribute()
    {
        // Default image if none exists
        return $this->image ?? 'https://via.placeholder.com/600x400';
    }
}
