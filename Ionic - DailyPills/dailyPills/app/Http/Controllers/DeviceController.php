<?php

namespace App\Http\Controllers;

use App\Device;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class DeviceController extends Controller
{
    public function signin(Request $request) {

        $device = Device::where('auth_id', $request->input('device_id'))->first();

        if ($device) {
            $device = $this->updateToken($device);
            return response()->json(["success" => true, "data" => ["api_token" => Device::where('auth_id', $device->auth_id)->first()->api_token]], Response::HTTP_OK);
        }

        $device = new Device();
        $device->auth_id = $request->input('device_id');
        $device->device_name = $request->input('device_name');
        $device->save();

        return response()->json(["success" => true, "data" => ["api_token" => Device::where('auth_id', $device->auth_id)->first()->api_token]], Response::HTTP_OK);
    }

    public function updateToken(Device $device) {
        $device->api_token = Str::random(64);
        $device->update();

        return $device;
    }
}




