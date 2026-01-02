<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Member::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'nullable|string|max:255',
            'image_path' => 'nullable|string',
        ]);

        $member = Member::create($validated);
        return response()->json($member, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Member $member)
    {
        return $member;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Member $member)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'role' => 'nullable|string|max:255',
            'image_path' => 'nullable|string',
        ]);

        $member->update($validated);
        return response()->json($member);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Member $member)
    {
        $member->delete();
        return response()->json(null, 204);
    }
}
