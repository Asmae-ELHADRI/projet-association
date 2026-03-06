<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Artist;
use App\Models\Event;
use App\Models\Member;
use App\Models\ArtistApplication;
use App\Models\Announcement;
use App\Models\Order;

class StatisticsController extends Controller
{
    public function index()
    {
        return response()->json([
            'artists_count' => Artist::count(),
            'events_count' => Event::count(),
            'members_count' => Member::count(),
            'applications_pending_count' => ArtistApplication::where('status', 'pending')->count(),
            'announcements_count' => Announcement::count(),
            'orders_count' => Order::count(),
            'total_revenue' => Order::sum('total_amount'),
        ]);
    }
}
