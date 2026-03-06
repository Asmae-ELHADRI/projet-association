<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ArtistController;
use App\Http\Controllers\API\EventController;
use App\Http\Controllers\API\AnnouncementController;
use App\Http\Controllers\API\MemberController;
use App\Http\Controllers\API\GuestController;
use App\Http\Controllers\API\ContactMessageController;
use App\Http\Controllers\API\ArtistApplicationController;
use App\Http\Controllers\API\ArtworkController;
use App\Http\Controllers\API\OrderController;

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\StatisticsController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/statistics', [StatisticsController::class, 'index']);
});

Route::apiResource('artists', ArtistController::class);
Route::apiResource('events', EventController::class);
Route::apiResource('announcements', AnnouncementController::class);
Route::apiResource('members', MemberController::class);
Route::apiResource('guests', GuestController::class);
Route::apiResource('contact-messages', ContactMessageController::class);
Route::apiResource('artist-applications', ArtistApplicationController::class);
Route::apiResource('paintings', ArtworkController::class);
Route::apiResource('orders', OrderController::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
