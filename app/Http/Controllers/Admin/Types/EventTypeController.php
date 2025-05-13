<?php

namespace App\Http\Controllers\Admin\Types;

use App\Http\Controllers\Controller;
use App\Models\EventType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventTypeController extends Controller
{
    public function index()
    {
        $eventTypes = EventType::paginate(10);
        return Inertia::render('admin/types/event/index', ['types' => $eventTypes]);
    }

    public function create()
    {
        return Inertia::render('admin/types/event/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);

        EventType::create($validated);
        return redirect()->route('admin.event.index')->with('success', 'Event Type created successfully.');
    }

    public function edit(EventType $event)
    {
        return Inertia::render('admin/types/event/edit', ['type' => $event]);
    }

    public function update(Request $request, EventType $event)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
        ]);

        $event->update($validated);
        return redirect()->route('admin.event.index')->with('success', 'Event Type updated successfully.');
    }

    public function destroy(EventType $event)
    {
        $event->delete();
        return redirect()->route('admin.event.index')->with('success', 'Event Type deleted successfully.');
    }
}
