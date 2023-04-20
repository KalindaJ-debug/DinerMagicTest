<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');;

// Route::group(['prefix' => 'user', 'middleware' => 'auth:sanctum'], function() {
//     Route::get('/view', [UserController::class, 'viewUser']);
//     Route::post('/add', [UserController::class, 'addUser']);
// });

Route::group(['prefix' => 'user', 'middleware' => 'auth:sanctum'], function() {
    Route::get('/view', [UserController::class, 'viewUser']);
    Route::post('/view', [UserController::class, 'viewUpdatedUser']);
    Route::post('/add', [UserController::class, 'addUser']);
    Route::delete('/delete/{id}', [UserController::class, 'deleteUser']);
    Route::put('/update/{id}', [UserController::class, 'updateUser']);
});

// Route::get('/view', [UserController::class, 'viewUser']);