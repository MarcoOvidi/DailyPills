<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Farmaco extends Model
{

    protected $table = "farmacos";

    protected $fillable = [
        "aic",
        "nome",
        "ptn",
        "modalita_prescrizione",
        "quantita_autorizzate"
    ];

    const CLASS_C_PTN = 'C', MODALITA_PRESCRIZIONE_SOP = 'SOP', MODALITA_PRESCRIZIONE_OTC = 'OTC';

    public function tipologies()
    {
        $this->belongsToMany('App\Tipologia');
    }

}
