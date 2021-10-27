<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', [HomeController::class, 'test']);

Route::get('/insert_task', [HomeController::class, 'insertTask']);
Route::get('/select_task/{id}', [HomeController::class, 'selectTask']);
Route::get('/select_all', [HomeController::class, 'selectAll']);
Route::get('/update/{id}/{owner}', [HomeController::class, 'updateTask']);
Route::get('/delete_task/{id}', [HomeController::class, 'deleteTask']);
