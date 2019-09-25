<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Device extends Model
{

    protected $table = "devices";

    protected $fillable = [
        "auth_id",
        "api_token",
        "device_name",
    ];


    public function user() {
        return $this->belongsTo('App\User');
    }

//    public static function boot() {
//        parent::boot();
//
//        self::creating(function($model) {
//            $model->token = Str::random(64);
//        });
//    }

}
