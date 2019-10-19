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
        "created_at", "updated_at"
    ];


//    public function users()
//    {
//        $this->belongsToMany(User::class, 'favoritesfarmacos', 'id', 'idfarmaco');
//    }

}
