<?php

namespace App\Http\Controllers\Admin\Types;

use App\Http\Controllers\Controller;
use App\Models\FacilitiesType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacilitiesTypeController extends Controller
{
    public function index()
    {
        $facilities = FacilitiesType::paginate(10);
        return Inertia::render('admin/types/facilities/index', ['types' => $facilities]);
    }

    public function create()
    {
        return Inertia::render('admin/types/facilities/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);

        FacilitiesType::create($validated);

        return redirect()
            ->route('admin.facilities.index')
            ->with('success', 'Facilities Type created successfully.');
    }

    public function edit(FacilitiesType $facility)
    {
        return Inertia::render('admin/types/facilities/edit', ['type' => $facility]);
    }

    public function update(Request $request, FacilitiesType $facility)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);

        $facility->update($validated);

        return redirect()
            ->route('admin.facilities.index')
            ->with('success', 'Facilities Type updated successfully.');
    }

    public function destroy(FacilitiesType $facility)
    {
        $facility->delete();

        return redirect()
            ->route('admin.facilities.index')
            ->with('success', 'Facilities Type deleted successfully.');
    }
}