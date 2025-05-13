<?php


use App\Http\Controllers\Admin\Types\AmenitiesTypeController;
use App\Http\Controllers\Admin\Types\EventTypeController;
use App\Http\Controllers\Admin\Types\FacilitiesTypeController;
use App\Http\Controllers\Admin\Types\VenueTypeController;
use App\Http\Controllers\Admin\MainEventManageController;
use App\Http\Controllers\Admin\UserController;
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

    Route::get('events', [MainEventManageController::class, 'index'])->name('events-index');
    Route::get('events/create', [MainEventManageController::class, 'create'])->name('events-create');
    Route::post('events/store', [MainEventManageController::class, 'store'])->name('events-store');
    Route::get('/events/{id}/edit', [MainEventManageController::class, 'edit'])->name('events.edit');
    Route::put('/events/{id}', [MainEventManageController::class, 'update'])->name('events-update');
    Route::delete('/events/{id}', [MainEventManageController::class, 'destroy'])->name('events-destroy');
});


Route::middleware(['auth', 'verified', 'check-status-role:admin'])->name('admin.')->prefix('admin')->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('venue', VenueTypeController::class);
    Route::resource('event', EventTypeController::class);
    Route::resource('facilities', FacilitiesTypeController::class);
    Route::resource('amenities', AmenitiesTypeController::class);
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
