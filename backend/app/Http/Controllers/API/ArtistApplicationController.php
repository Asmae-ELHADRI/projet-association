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
            'portfolio_file' => 'nullable', // Validation handled manually for mixed types
        ]);

        // Custom validation for portfolio_file
        if ($request->hasFile('portfolio_file')) {
            $request->validate([
                'portfolio_file' => 'file|mimes:pdf,jpg,jpeg,png,zip|max:10240'
            ]);
            $file = $request->file('portfolio_file');
            $path = $file->store('artist_applications', 'public');
            $validated['portfolio_file'] = '/storage/' . $path;
        } elseif ($request->filled('portfolio_file')) {
            $validated['portfolio_file'] = $request->input('portfolio_file');
        }

        $validated['status'] = 'pending';

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

        $oldStatus = $artistApplication->status;
        $artistApplication->update($validated);

        // Logic: if accepted, create an Artist record
        if ($validated['status'] === 'accepted' && $oldStatus !== 'accepted') {
            \App\Models\Artist::create([
                'name' => $artistApplication->name,
                'specialty' => $artistApplication->specialty,
                'bio' => $artistApplication->message, // Using message as bio
                'portfolio_url' => $artistApplication->portfolio_file, // Store same URL/Path
                'is_member' => true,
            ]);
        }

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
