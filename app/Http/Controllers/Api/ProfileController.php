<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProfileResource;
use App\Models\Profile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index()
    {
        $profile = Profile::first();
        return new ProfileResource($profile);
    }

    public function update(Request $request)
    {
        $profile = Profile::first();

        if (!$profile) {
            $profile = Profile::create($request->validate([
                'full_name' => 'required|string|max:255',
                'title' => 'nullable|string|max:255',
                'bio' => 'nullable|string',
                'email' => 'nullable|email',
                'phone' => 'nullable|string',
                'url' => 'nullable|url',
                'avatar_url' => 'nullable|url',
                'location' => 'nullable|string',
                'social_links' => 'nullable|array'
            ]));
        } else {
            $validatedData = $request->validate([
                'full_name' => 'sometimes|string|max:255',
                'title' => 'sometimes|string|max:255',
                'bio' => 'sometimes|string',
                'email' => 'sometimes|email',
                'phone' => 'sometimes|string',
                'url' => 'sometimes|url',
                'avatar_url' => 'sometimes|url',
                'location' => 'sometimes|string',
                'social_links' => 'sometimes|array'
            ]);

            $profile->update($validatedData);
        }

        return new ProfileResource($profile);
    }
}
