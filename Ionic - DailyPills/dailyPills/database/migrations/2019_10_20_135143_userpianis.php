<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UserPianis extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('userpianis', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('idpiano')->unsigned()->nullable(false)->change();
            $table->integer('idfarmaco')->unsigned()->nullable(false)->change();
            $table->timestamps();

            $table->foreign('idpiano')
                ->references('id')
                ->on('pianis')
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
