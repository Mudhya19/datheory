<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SkillResource;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        $skills = Skill::orderBy('category')->get();
        return SkillResource::collection($skills);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'level' => 'nullable|string|max:255',
            'proficiency' => 'nullable|integer|min:0|max:100',
            'icon_url' => 'nullable|url'
        ]);

        $skill = Skill::create($validatedData);
        return new SkillResource($skill);
    }

    public function update(Request $request, Skill $skill)
    {
        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'category' => 'sometimes|string|max:255',
            'level' => 'sometimes|string|max:255',
            'proficiency' => 'sometimes|integer|min:0|max:100',
            'icon_url' => 'sometimes|url'
        ]);

        $skill->update($validatedData);
        return new SkillResource($skill);
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();
        return response()->json(['message' => 'Skill deleted successfully']);
    }
}
