<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/hello', function () {
    return response()->json([
        'message' => 'Hello'
    ], 200);
});

Route::post('/register', RegisterController::class);
Route::post('/login', LoginController::class);

Route::get('/auth/check', function (Request $request) {
    $isAuthenticated = Auth::check();
    return response()->json(['authenticated' => $isAuthenticated]);
})->middleware('auth:sanctum');

Route::post('/logout', function (Request $request) {
    Auth::guard('web')->logout(); // セッション認証ユーザーをログアウト

    $request->session()->invalidate();       // セッションを無効にする
    $request->session()->regenerateToken();  // CSRFトークンを再生成（セキュリティ対策）

    return response()->json(['message' => 'ログアウトしました。']);
})->middleware('auth:sanctum');

Route::get('/contacts', [ContactController::class, 'index']);
Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);
Route::get('/contacts/export', [ContactController::class, 'export']);

// カテゴリー一覧を取得するエンドポイント
Route::get('/categories', [CategoryController::class, 'index']);

Route::post('/contact/temp-store', [ContactController::class, 'tempStore']);
Route::get('/contact/session-data', [ContactController::class, 'sessionData']);
Route::post('/contact/contact-store', [ContactController::class, 'contactStore']);