<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class TypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $now = Carbon::now();

        // Event Types
        $eventTypes = [
            'Baby Shower',
            'Bar and Bat Mitzvah',
            'Birthday Party',
            'Brand Activation',
            'Bridal Shower',
            'Cocktail Party',
            'Concert',
            'Cooking Class',
            'Corporate',
            'Dance Party',
            'Dinner Party',
            'Product Launch',
            'Fashion Show',
        ];

        foreach ($eventTypes as $name) {
            DB::table('event_types')->insert([
                'name' => $name,
                'status' => 'active',
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // Venue Types
        $venueTypes = [
            'All White Space',
            'Banquet Hall',
            'Concert Event Hall',
            'Conference Room',
            'Exposed Brick',
            'Immersive/Projection Mapping',
            'Gallery',
            'Industrial/Warehouse',
            'Kitchen',
            'Loft',
            'Garden',
            'Rooftop',
        ];

        foreach ($venueTypes as $name) {
            DB::table('venue_types')->insert([
                'name' => $name,
                'status' => 'active',
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // Facilities Types
        $facilitiesTypes = [
            'Sound System',
            'Lighting Equipment',
            'Stage Setup',
        ];

        foreach ($facilitiesTypes as $name) {
            DB::table('facilities_types')->insert([
                'name' => $name,
                'status' => 'active',
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }

        // Amenities Types
        $amenitiesTypes = [
            'Wi-Fi',
            'Parking',
            'Air Conditioning',
        ];

        foreach ($amenitiesTypes as $name) {
            DB::table('amenities_types')->insert([
                'name' => $name,
                'status' => 'active',
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }
}