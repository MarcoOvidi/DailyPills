<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{

    protected $table = "types";

    protected $fillable = [
        "formato",
        "quantita",
        "id"
    ];

    protected $hidden = [
        "created_at", "updated_at"
    ];

    const OROSOLUBILE = 'Orosolubile', COMPRESSE = 'Compresse', EFFERVESCENTE = 'Effervescente';

    public function users()
    {
        $this->belongsToMany(User::class, 'favoritesfarmacos', 'id', 'idfarmaco');
    }

}
