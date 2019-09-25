<?php

namespace App\Providers;

use App\Device;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        $this->app['auth']->viaRequest('api', function ($request) {
            return Device::where('api_token', $request->header('api_token'))->where('auth_id', $request->header('device_id'))->first();
        });
    }
}
