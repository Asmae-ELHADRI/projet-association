<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Artist;
use Illuminate\Http\Request;

class ArtistFrontController extends Controller
{
    public function index()
    {
        return response()->json(Artist::all());
    }

    public function show($id)
    {
        $artist = Artist::findOrFail($id);
        return response()->json($artist);
    }

    public function apply(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'bio' => 'required|string|min:20',
            'portfolio' => 'nullable|url',
        ]);

        $artist = Artist::create([
            'name' => $request->name,
            'email' => $request->email,
            'bio' => $request->bio,
            'portfolio' => $request->portfolio,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Demande envoyée avec succès',
            'artist' => $artist
        ]);
    }
}
