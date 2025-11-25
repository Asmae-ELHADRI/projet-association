<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\Event;

class HomeController extends Controller
{
    public function index()
    {
        $announcements = Announcement::latest()->take(5)->get();
        $events = Event::orderBy('date', 'asc')->take(3)->get();

        return response()->json([
            'announcements' => $announcements,
            'events' => $events
        ]);
    }
}
