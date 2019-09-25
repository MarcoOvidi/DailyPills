<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Farmaco extends Migration
{
    public function up()
    {
        Schema::create('farmacos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('aic');
            $table->string('nome');
            $table->string('ptn');
            $table->string('modalita_prescrizione');
            $table->string('quantita_autorizzate');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::drop('farmacos');
    }
}
