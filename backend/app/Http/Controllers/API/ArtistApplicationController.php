<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ArtistApplication;
use Illuminate\Http\Request;

class ArtistApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ArtistApplication::latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'specialty' => 'nullable|string|max:255',
            'message' => 'nullable|string',
            'portfolio_file' => 'nullable|string',
        ]);

        $application = ArtistApplication::create($validated);
        return response()->json($application, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ArtistApplication $artistApplication)
    {
        return $artistApplication;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ArtistApplication $artistApplication)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,accepted,rejected',
        ]);

        $artistApplication->update($validated);
        return response()->json($artistApplication);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ArtistApplication $artistApplication)
    {
        $artistApplication->delete();
        return response()->json(null, 204);
    }
}
