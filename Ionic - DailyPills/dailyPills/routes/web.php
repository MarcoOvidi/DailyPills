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

//get API version
$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function () use ($router) {

    $router->group(['middleware' => 'auth'], function() use ($router) {
        //Login route
        $router->post('signin', 'DeviceController@signin');

        //Farmaci route
        $router->post('/farmaci', ["middleware" => 'auth', "uses" => 'FarmacoController@list']);
        $router->post('/addFarmaco', 'FarmacoController@addRecord');
    });

});

//$router->post('signin', 'DeviceController@signin');
//
//$router->post('/farmaci', ["middleware" => 'auth', "uses" => 'FarmacoController@list']);
//$router->post('/addFarmaco', 'FarmacoController@addRecord');

