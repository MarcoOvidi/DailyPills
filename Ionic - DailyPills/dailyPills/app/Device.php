<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Device extends Model
{

    protected $table = "devices";

    protected $fillable = [
        "api_token",
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
