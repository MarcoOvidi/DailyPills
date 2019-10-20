<?php

namespace App;

use function foo\func;
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
        return $this->belongsToMany(MedType::class, 'pianisfarmaci', 'id', 'idmedtype')
            ->withPivot('quantitagg', 'orarioassunzione', 'giornosettimana');
    }

    public function user() {
        return $this->belongsTo(User::class, 'iduserpiano')->withDefault();
    }

}
