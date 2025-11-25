<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Guest;

class GuestFrontController extends Controller
{
    public function index()
    {
        $guests = Guest::all();
        return view('front.guests.index', compact('guests'));
    }

    public function show($id)
    {
        $guest = Guest::findOrFail($id);
        return view('front.guests.show', compact('guest'));
    }
}
