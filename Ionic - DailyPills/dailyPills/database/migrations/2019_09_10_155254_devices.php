<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Str;

class Devices extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('devices', function (Blueprint $table) {
            $table->increments('id');
            $table->string('auth_id')->unique();
            $table->string('api_token', 64)->default(Str::random(64));
//            $table->integer('user_id')->unsigned()->nullable();
            $table->string('device_name', 200);
            $table->timestamps();

//            $table->foreign('user_id')
//                ->references('id')
//                ->on('users')
//                ->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('devices');
    }
}
