<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Userfarmacis extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_farmacos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('iduser')->unsigned()->nullable();
            $table->integer('idfarmaco')->unsigned()->nullable();
            $table->timestamps();

            $table->foreign('iduser')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
            $table->foreign('idfarmaco')
                ->references('id')
                ->on('farmacos')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('user_farmacos');
    }
}
