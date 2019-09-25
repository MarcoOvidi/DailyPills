<?php
/**
 * Created by PhpStorm.
 * User: angelodalfonso
 * Date: 2019-09-09
 * Time: 22:55
 */

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\Farmaco;

class FarmacoTableSeeder extends  Seeder {
    public function run()
    {
        Farmaco::create([
            'aic' => 12312,
            'nome' => 'Xanax',
            'ptn' => 'C',
            'modalità_prescrizione' => Farmaco::MODALITA_PRESCRIZIONE_OTC,
            'quantià_autorizzate' => 2000
        ]);
    }
}