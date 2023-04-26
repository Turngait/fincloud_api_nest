<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/signin', [UsersController::class, 'signInAction'])->name('signIn');
Route::post('/signup', [UsersController::class, 'signUpAction'])->name('signUp');

Route::post('/getid', [UsersController::class, 'returnUserIdAction'])->name('returnUserId');
Route::post('/getdata', [UsersController::class, 'returnUserDataAction'])->name('returnUserData');

Route::put('/changename', [UsersController::class, 'changeUserNameAction'])->name('changeUserName');
Route::put('/changepassword', [UsersController::class, 'changeUserPassAction'])->name('changeUserPass');
Route::put('/restorepass', [UsersController::class, 'restoreUserPassAction'])->name('restorePass');
