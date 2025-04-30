<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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

        $data = [
            // Events
            ['name' => 'Baby Shower', 'type' => 'event', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Bar and Bat Mitzvah', 'type' => 'event', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Birthday Party', 'type' => 'event', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Brand Activation', 'type' => 'event', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Bridal Shower', 'type' => 'event', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Cocktail Party', 'type' => 'event', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Concert', 'type' => 'event', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Cooking Class', 'type' => 'event', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Corporate', 'type' => 'event', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Dance Party', 'type' => 'event', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Dinner Party', 'type' => 'event', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Product Launch', 'type' => 'event', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Fashion Show', 'type' => 'event', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],

            // Venues
            ['name' => 'All White Space', 'type' => 'venue', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Banquet Hall', 'type' => 'venue', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Concert Event Hall', 'type' => 'venue', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Conference Room', 'type' => 'venue', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Exposed Brick', 'type' => 'venue', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Immersive/Projection Mapping', 'type' => 'venue', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Gallery', 'type' => 'venue', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Industrial/Warehouse', 'type' => 'venue', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Kitchen', 'type' => 'venue', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Loft', 'type' => 'venue', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Garden', 'type' => 'venue', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Rooftop', 'type' => 'venue', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],

            // Facilities
            ['name' => 'Sound System', 'type' => 'facilities', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Lighting Equipment', 'type' => 'facilities', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Stage Setup', 'type' => 'facilities', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],

            // Amenities
            ['name' => 'Wi-Fi', 'type' => 'amenities', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Parking', 'type' => 'amenities', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Air Conditioning', 'type' => 'amenities', 'status' => 'active', 'created_at' => $now, 'updated_at' => $now],
        ];

        DB::table('types')->insert($data); // Replace with your actual table name
    }
}
