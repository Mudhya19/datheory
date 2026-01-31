<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'full_name',
        'title',
        'bio',
        'email',
        'phone',
        'url',
        'avatar_url',
        'location',
        'social_links',
    ];

    protected $casts = [
        'social_links' => 'array',
    ];

    protected $appends = ['name', 'location', 'avatar'];

    public function getNameAttribute()
    {
        return $this->full_name;
    }



    public function getAvatarAttribute()
    {
        // Default avatar if none exists
        return $this->avatar_url ?? 'https://via.placeholder.com/150';
    }
}
