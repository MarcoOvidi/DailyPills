<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MedType extends Model
{

    protected $table = "med_types";

    protected $fillable = [
        "idtype", "idfarmaco", "id"
    ];

    protected $hidden = [
        'pivot', 'created_at', 'updated_at', "idtype", "idfarmaco"
    ];

    const OROSOLUBILE = 'Orosolubile', COMPRESSE = 'Compresse', EFFERVESCENTE = 'Effervescente';

    public function farmaco()
    {
        return $this->belongsTo(Farmaco::class, 'idfarmaco');
    }

    public function specifica()
    {
        return $this->belongsTo(Type::class, 'idtype');
    }

}
