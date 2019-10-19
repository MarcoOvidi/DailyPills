<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Pianis extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pianis', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nome')->nullable(false)->change();
            $table->dateTime('inizio')->nullable(false)->change();
            $table->dateTime('fine')->nullable(false)->change();
            $table->string('descrizione', 500);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('pianis');
    }
}
