<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Member;

class AboutController extends Controller
{
    public function index()
    {
        $members = Member::all();
        return view('front.about', compact('members'));
    }
}
