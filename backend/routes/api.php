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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', 'AuthController@login');

Route::post('register', 'AuthController@register');

Route::group(['middleware' => 'auth:api'], function(){
	Route::get('details', 'AuthController@details');
});

Route::group(['middleware' => 'auth:api', 'prefix' => 'company'], function(){
	Route::post('/create', 'CompaniesController@create');
	Route::get('/view', 'CompaniesController@index');
	Route::get('/view/{id}', 'CompaniesController@view');
	Route::put('/edit/{id}', 'CompaniesController@update');
	Route::delete('/delete/{id}', 'CompaniesController@delete');
});

Route::group(['middleware' => 'auth:api', 'prefix' => 'employee'], function(){
	Route::post('/create', 'EmployeesController@create');
	Route::get('/view', 'EmployeesController@index');
	Route::get('/view/{id}', 'EmployeesController@view');
	Route::put('/edit/{id}', 'EmployeesController@update');
	Route::delete('/delete/{id}', 'EmployeesController@delete');
});
