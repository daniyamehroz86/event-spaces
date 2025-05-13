<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('main_event_types', function (Blueprint $table) {
            $table->id();
            $table->foreignId('main_event_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('type_id'); // refers to either VenueType or EventType
            $table->enum('type', ['venue', 'event']);
            $table->timestamps();

            $table->unique(['main_event_id', 'type_id', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('main_event_types');
    }
};
