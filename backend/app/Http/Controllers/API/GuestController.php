<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Guest;
use Illuminate\Http\Request;

class GuestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Guest::all();
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
        ]);

        $guest = Guest::create($validated);
        return response()->json($guest, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Guest $guest)
    {
        return $guest;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Guest $guest)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'specialty' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'portfolio_url' => 'nullable|url',
            'image_path' => 'nullable|string',
        ]);

        $guest->update($validated);
        return response()->json($guest);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Guest $guest)
    {
        $guest->delete();
        return response()->json(null, 204);
    }
}
