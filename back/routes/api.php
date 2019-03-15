<?php

use Illuminate\Http\Request;

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

Route::post('items', 'ItemController@store');
Route::get('items', 'ItemController@index');
Route::get('items/{id}','ItemController@show');
Route::delete('items/{id}','ItemController@destroy');
Route::put('items/{id}','ItemController@update');



Route::middleware('auth:api')->post('/user', function (Request $request) {
    return $request->user();
});
