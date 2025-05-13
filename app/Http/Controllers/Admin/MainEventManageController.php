<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\EventType;
use App\Models\MainEvent;
use App\Models\Type;
use App\Models\VenueType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class MainEventManageController extends Controller
{
    public function index()
    {
        $mainEvents = MainEvent::paginate(5);
        return Inertia::render('admin/events/index', ['mainEvents' => $mainEvents]);
    }

    public function create()
    {
        $venues = VenueType::get(['id', 'name']);
        $events = EventType::get(['id', 'name']);

        return Inertia::render('admin/events/main', [
            'venues' => $venues,
            'events' => $events,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'num_of_guests' => 'nullable|integer',
            'size' => 'nullable|numeric',
            'unitOfMeasure' => 'nullable|string',
            'status' => 'required|in:draft,active',

            'selectedVenueTypes' => 'array',
            'selectedVenueTypes.*' => 'integer',

            'selectedEventTypes' => 'array',
            'selectedEventTypes.*' => 'integer',

            'openingHours' => 'array',
            'openingHours.*.day' => 'required|string',
            'openingHours.*.open' => 'nullable',
            'openingHours.*.close' => 'nullable',
            'openingHours.*.is_closed' => 'boolean',
        ]);

        DB::beginTransaction();
        try {

            // Create main event
            $mainEvent = MainEvent::create([
                'title' => $validated['title'],
                'description' => $validated['description'] ?? null,
                'num_of_guests' => $validated['num_of_guests'] ?? null,
                'size' => $validated['size'] ?? null,
                'unit_of_measure' => $validated['unitOfMeasure'] ?? null,
                'status' => $validated['status'],
            ]);

            // Attach venue types
            foreach ($validated['selectedVenueTypes'] ?? [] as $venueTypeId) {
                $mainEvent->venueTypes()->attach($venueTypeId, ['type' => 'venue']);
            }

            // Attach event types
            foreach ($validated['selectedEventTypes'] ?? [] as $eventTypeId) {
                $mainEvent->eventTypes()->attach($eventTypeId, ['type' => 'event']);
            }

            // Save timings
            foreach ($validated['openingHours'] ?? [] as $timing) {
                $mainEvent->timings()->create([
                    'day' => $timing['day'],
                    'open' => $timing['open'],
                    'close' => $timing['close'],
                    'is_closed' => $timing['is_closed'] ?? false,
                ]);
            }

            DB::commit();
            return redirect()->route('events-create')->with('success', 'Event saved successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => $e->getMessage()])->withInput();
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $event = MainEvent::with(['venueTypes:id', 'eventTypes:id'])
            ->findOrFail($id);

        $venues = VenueType::get(['id', 'name']);
        $events = EventType::get(['id', 'name']);

        return Inertia::render('admin/events/main', [
            'editEvent' => [
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'selectedVenueTypes' => $event->venueTypes->pluck('id'),
                'selectedEventTypes' => $event->eventTypes->pluck('id'),
                'numOfGuests' => $event->num_of_guests,
                'size' => $event->size,
                'unitOfMeasure' => $event->unit_of_measure,
                'openingHours' => $event->opening_hours, // This should already be transformed
            ],
            'venues' => $venues,
            'events' => $events,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy($id)
    {
        $event = MainEvent::findOrFail($id);
        $event->delete();

        return redirect()->route('events-index')
            ->with('success', 'Event deleted successfully.');
    }
}
