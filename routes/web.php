<?php

use App\Http\Controllers\Admin\TypeController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified', 'check-status-role:admin,host'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::middleware(['auth', 'verified', 'check-status-role:admin'])->name('admin.')->prefix('admin')->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('types', TypeController::class);
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
