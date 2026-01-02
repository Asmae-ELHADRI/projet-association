<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Artist;
use Illuminate\Http\Request;

class ArtistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Artist::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'specialty' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'portfolio_url' => 'nullable|url',
            'image_path' => 'nullable|string',
            'is_member' => 'nullable|boolean',
        ]);

        $artist = Artist::create($validated);
        return response()->json($artist, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Artist $artist)
    {
        return $artist;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Artist $artist)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'specialty' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'portfolio_url' => 'nullable|url',
            'image_path' => 'nullable|string',
            'is_member' => 'nullable|boolean',
        ]);

        $artist->update($validated);
        return response()->json($artist);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Artist $artist)
    {
        $artist->delete();
        return response()->json(null, 204);
    }
}
