<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Auth;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/hello', function () {
    return response()->json([
        'message' => 'Hello'
    ], 200);
});

Route::post('/register', RegisterController::class);
Route::post('/login', [LoginController::class, 'login']);

Route::get('/auth/check', function (Request $request) {
    return response()->json(['authenticated' => Auth::check()]);
})->middleware('auth:sanctum');

Route::post('/logout', function (Request $request) {
    $request->user()->tokens()->delete();
    return response()->json(['message' => 'ログアウトしました。']);
})->middleware('auth:sanctum');