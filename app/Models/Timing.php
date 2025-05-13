<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Timing extends Model
{
    use HasFactory;

    protected $fillable = [
        'main_event_id',
        'day',
        'open',
        'close',
        'is_closed',
    ];

    public function mainEvent()
    {
        return $this->belongsTo(MainEvent::class);
    }
}

