<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Farmaco extends Migration
{
    public function up()
    {
        Schema::create('farmacos', function (Blueprint $table) {
            $table->increments('id')->nullable(false);;
            $table->string('codice')->nullable(false);;
            $table->string('nome')->nullable(false);;
            $table->string('ptn')->nullable(false);;
            $table->string('modalita_prescrizione')->nullable(false);;
            $table->string('quantita_autorizzate')->nullable(false);;
            $table->string('produttore')->nullable(false);;
            $table->string('principio')->nullable(false);
            $table->integer('prezzo')->nullable(false);
            $table->timestamps();
        });
    }

    public function down() {
        Schema::drop('farmacos');
    }
}
