<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Artwork;
use Illuminate\Http\Request;

class ArtworkController extends Controller
{
    public function index(Request $request)
    {
        $query = Artwork::with('artist');

        // Filter by availability by default unless status is specified
        if ($request->has('status')) {
            $query->where('status', $request->status);
        } else {
            $query->where('status', 'available');
        }

        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        if ($request->has('style')) {
            $query->where('style', $request->style);
        }

        if ($request->has('artist_id')) {
            $query->where('artist_id', $request->artist_id);
        }

        return $query->latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'artist_id' => 'required|exists:artists,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'style' => 'nullable|string',
            'dimensions' => 'nullable|string',
            'price' => 'required|numeric',
            'image' => 'nullable|file|mimes:jpg,jpeg,png|max:10240',
            'status' => 'nullable|string'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('artworks', 'public');
            $validated['image_path'] = '/storage/' . $path;
        } elseif ($request->filled('image')) {
             // allow URL if provided as string
             $validated['image_path'] = $request->input('image');
        }

        $artwork = Artwork::create($validated);
        return response()->json($artwork, 201);
    }

    public function show(Artwork $artwork)
    {
        return $artwork->load('artist');
    }

    public function update(Request $request, Artwork $artwork)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric',
            'status' => 'sometimes|string',
            'artist_id' => 'sometimes|exists:artists,id',
            'description' => 'nullable|string',
            'style' => 'nullable|string',
            'dimensions' => 'nullable|string',
        ]);
        
        $artwork->update($validated);
        return response()->json($artwork);
    }

    public function destroy(Artwork $artwork)
    {
        $artwork->delete();
        return response()->json(null, 204);
    }
}
