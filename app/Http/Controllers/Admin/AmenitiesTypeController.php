<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AmenitiesType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AmenitiesTypeController extends Controller
{
    public function index()
    {
        $amenitiesTypes = AmenitiesType::paginate(10);
        return Inertia::render('admin/types/amenities/index', ['types' => $amenitiesTypes]);
    }

    public function create()
    {
        return Inertia::render('admin/types/amenities/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);

        AmenitiesType::create($validated);
        return redirect()->route('admin.amenities.index')->with('success', 'Amenities Type created successfully.');
    }

    public function edit(AmenitiesType $amenity)
    {
        return Inertia::render('admin/types/amenities/edit', ['type' => $amenity]);
    }

    public function update(Request $request, AmenitiesType $amenity)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);

        $amenity->update($validated);
        return redirect()->route('admin.amenities.index')->with('success', 'Amenities Type updated successfully.');
    }

    public function destroy(AmenitiesType $amenity)
    {
        $amenity->delete();
        return redirect()->route('admin.amenities.index')->with('success', 'Amenities Type deleted successfully.');
    }
}
