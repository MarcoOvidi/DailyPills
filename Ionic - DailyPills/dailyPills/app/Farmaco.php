<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Farmaco extends Model
{

    protected $table = "farmacos";

    protected $fillable = [
        "codice",
        "nome",
        "ptn",
        "modalita_prescrizione",
        "quantita_autorizzate",
        "id",
        "produttore",
        "principio",
        "prezzo"
    ];

    protected $hidden = [
        'pivot'
    ];

    const CLASS_C_PTN = 'C', MODALITA_PRESCRIZIONE_SOP = 'SOP', MODALITA_PRESCRIZIONE_OTC = 'OTC';

    public function types()
    {
        return $this->belongsToMany(Type::class, 'med_types', 'idfarmaco', 'idtype');
    }

}
