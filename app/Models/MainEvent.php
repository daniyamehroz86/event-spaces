<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MainEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'num_of_guests',
        'size',
        'unit_of_measure',
        'status',
    ];

    public function venueTypes()
    {
        return $this->belongsToMany(VenueType::class, 'main_event_types', 'main_event_id', 'type_id')
            ->wherePivot('type', 'venue')  // Ensure the correct 'type' is used
            ->withPivot('type');           // Include the 'type' column from the pivot table
    }

    public function eventTypes()
    {
        return $this->belongsToMany(EventType::class, 'main_event_types', 'main_event_id', 'type_id')
            ->wherePivot('type', 'event')  // Ensure the correct 'type' is used
            ->withPivot('type');           // Include the 'type' column from the pivot table
    }

    public function timings()
    {
        return $this->hasMany(Timing::class);
    }
}
