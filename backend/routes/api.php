<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// ---- HOME ----
Route::get('/home', function () {
    return response()->json([
        "status" => "success",
        "message" => "Bienvenue sur l'API de L'Orientale Espace",
    ]);
});

// ---- ARTISTS ----
Route::get('/artists', function () {
    return response()->json([
        ["id" => 1, "name" => "Artiste 1"],
        ["id" => 2, "name" => "Artiste 2"],
    ]);
});

Route::get('/artists/{id}', function ($id) {
    return response()->json([
        "id" => $id,
        "name" => "Artiste " . $id,
        "bio" => "Biographie exemple",
    ]);
});

Route::post('/artists/apply', function (Request $request) {
    return response()->json([
        "status" => "received",
        "data" => $request->all(),
    ]);
});

// ---- GUESTS ----
Route::get('/guests', function () {
    return response()->json([
        ["id" => 1, "name" => "Invité 1"],
        ["id" => 2, "name" => "Invité 2"],
    ]);
});

// ---- ABOUT ----
Route::get('/about', function () {
    return response()->json([
        "association" => "L'Orientale Espace",
        "ville" => "Berkane",
        "description" => "Espace culturel pour événements et expositions",
    ]);
});

// ---- CONTACT ----
Route::post('/contact', function (Request $request) {
    return response()->json([
        "status" => "sent",
        "message" => "Votre message a été reçu",
        "data" => $request->all(),
    ]);
});
