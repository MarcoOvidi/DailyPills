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


    public function farmaci()
    {
        return $this->belongsToMany(MedType::class, 'pianisfarmaci', 'idpiano', 'idmedtype')
            ->withPivot('quantitagg', 'orarioassunzione', 'giornosettimana', 'assunto', 'id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'iduserpiano')->withDefault();
    }

}
