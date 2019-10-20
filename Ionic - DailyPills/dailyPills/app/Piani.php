<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Piani extends Model
{

    protected $table = "pianis";

    protected $fillable = [
        "inizio",
        "fine",
        "descrizione",
        "nome",
        "id"
    ];

    protected $hidden = [
        "created_at", "updated_at", 'iduserpiano'
    ];


    public function farmacipiano()
    {
        $this->belongsToMany(null, 'pianisfarmaci', 'id', 'idpiano');
    }

}
