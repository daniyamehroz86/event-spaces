<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Type;
use Illuminate\Http\Request;
use Inertia\Inertia;


class TypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $types = Type::paginate(10); // Adjust per-page limit as needed
        return Inertia::render('admin/types/index', [
            'types' => $types,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/types/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:event,venue,facilities,amenities',
            'status' => 'required|in:active,inactive',
        ]);

        Type::create($validated);

        return redirect()->route('admin.types.index')->with('success', 'Type created successfully.');
    }
    /**
     * Display the specified resource.
     */
    public function show(Type $type) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Type $type)
    {
        return Inertia::render('admin/types/edit', [
            'type' => $type,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Type $type)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:event,venue,facilities,amenities',
            'status' => 'required|in:active,inactive',
        ]);



        $type->update($validated);

        return redirect()->route('admin.types.index')->with('success', 'Type updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Type $type)
    {
        $type->delete();
        return redirect()->route('admin.types.index')->with('success', 'Type deleted successfully.');
    }
}
