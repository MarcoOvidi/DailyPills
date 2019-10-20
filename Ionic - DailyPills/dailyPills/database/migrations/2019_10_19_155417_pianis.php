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
            $table->date('inizio')->nullable(false)->change();
            $table->date('fine')->nullable(false)->change();
            $table->string('descrizione', 500);
            $table->integer('iduserpiano')->unsigned()->nullable(false)->change();
            $table->timestamps();

            $table->foreign('iduserpiano')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
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
