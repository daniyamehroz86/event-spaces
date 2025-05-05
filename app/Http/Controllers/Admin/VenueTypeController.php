<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VenueType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VenueTypeController extends Controller
{
    public function index()
    {
        $venueTypes = VenueType::paginate(10);
        return Inertia::render('admin/types/venue/index', ['types' => $venueTypes]);
    }

    public function create()
    {
        return Inertia::render('admin/types/venue/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);

        VenueType::create($validated);
        return redirect()->route('admin.venue.index')->with('success', 'Venue Type created successfully.');
    }

    public function edit(VenueType $venue)
    {
        return Inertia::render('admin/types/venue/edit', ['type' => $venue]);
    }

    public function update(Request $request, VenueType $venue)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);

        $venue->update($validated);
        return redirect()->route('admin.venue.index')->with('success', 'Venue Type updated successfully.');
    }

    public function destroy(VenueType $venue)
    {
        $venue->delete();
        return redirect()->route('admin.venue.index')->with('success', 'Venue Type deleted successfully.');
    }
}
