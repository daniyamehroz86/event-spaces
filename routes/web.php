<?php

use App\Http\Controllers\Admin\AmenitiesTypeController;
use App\Http\Controllers\Admin\EventTypeController;
use App\Http\Controllers\Admin\FacilitiesTypeController;
use App\Http\Controllers\Admin\TypeController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\VenueTypeController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');




Route::middleware(['auth', 'verified', 'check-status-role:admin,host'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('stepper', function () {
        return Inertia::render('AddProperty');
    })->name('stepper');
});


Route::middleware(['auth', 'verified', 'check-status-role:admin'])->name('admin.')->prefix('admin')->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('types', TypeController::class);
    Route::resource('venue', VenueTypeController::class);
    Route::resource('event', EventTypeController::class);
    Route::resource('facilities', FacilitiesTypeController::class);
    Route::resource('amenities', AmenitiesTypeController::class);
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
