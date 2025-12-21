<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::where('is_published', true)->latest()->get();
        return ProjectResource::collection($projects);
    }

    public function getAll(Request $request)
    {
        $query = Project::query();

        if ($request->has('published')) {
            $query->where('is_published', $request->published);
        }

        $projects = $query->latest()->get();
        return ProjectResource::collection($projects);
    }

    public function show($slug)
    {
        $project = Project::where('slug', $slug)->firstOrFail();
        return new ProjectResource($project);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'short_description' => 'required|string',
            'slug' => 'required|string|unique:projects',
            'tech_stack' => 'nullable|array',
            'tech_stack.*' => 'string',
            'github_url' => 'nullable|url',
            'demo_url' => 'nullable|url',
            'thumbnail_url' => 'nullable|url',
            'is_published' => 'boolean',
            'metadata' => 'nullable|array'
        ]);

        $project = Project::create($validatedData);
        return new ProjectResource($project);
    }

    public function update(Request $request, Project $project)
    {
        $validatedData = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'short_description' => 'sometimes|string',
            'slug' => 'sometimes|string|unique:projects,slug,' . $project->id,
            'tech_stack' => 'nullable|array',
            'tech_stack.*' => 'string',
            'github_url' => 'nullable|url',
            'demo_url' => 'nullable|url',
            'thumbnail_url' => 'nullable|url',
            'is_published' => 'boolean',
            'metadata' => 'nullable|array'
        ]);

        $project->update($validatedData);
        return new ProjectResource($project);
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(['message' => 'Project deleted successfully']);
    }
}
