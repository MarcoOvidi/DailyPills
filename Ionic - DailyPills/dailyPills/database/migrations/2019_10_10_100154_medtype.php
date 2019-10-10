<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Medtype extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('med_types', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('idtype')->unsigned()->nullable();
            $table->integer('idfarmaco')->unsigned()->nullable();
            $table->timestamps();

            $table->foreign('idtype')
                ->references('id')
                ->on('types')
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
        Schema::drop('med_types');
    }
}
