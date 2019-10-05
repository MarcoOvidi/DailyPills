<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

//get api version
$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function () use ($router) {
    //Login route
    $router->post('/login', 'UserController@login');
    $router->post('/register', 'UserController@register');

    $router->group(['middleware' => 'auth'], function($router) {

        //Farmaci route
        $router->post('/farmaci', 'FarmacoController@list');
        $router->post('/searchFarmaci', 'FarmacoController@search');
        $router->post('/addFarmaco', 'FarmacoController@addRecord');
    });

});

