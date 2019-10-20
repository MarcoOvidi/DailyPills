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
            $table->integer('idmedtype')->unsigned()->nullable(false)->change();
            $table->integer('quantitagg')->unsigned()->nullable(false)->change();
            $table->dateTime('orarioassunzione')->nullable(false)->change();
            $table->enum('giornosettimana', ['Lunedi', 'Martedi', 'Mercoledi', 'Giovedi', 'Venerdi', 'Sabato'])->nullable(false)->change();
            $table->timestamps();

            $table->foreign('idpiano')
                ->references('id')
                ->on('pianis')
                ->onDelete('cascade');
            $table->foreign('idmedtype')
                ->references('id')
                ->on('med_types')
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
