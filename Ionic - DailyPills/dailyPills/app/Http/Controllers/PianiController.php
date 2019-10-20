<?php

namespace App\Http\Controllers;

use App\MedType;
use App\Piani;
use App\Type;
use App\User;
use Illuminate\Http\Request;
use App\Farmaco;
use Illuminate\Support\Facades\DB;

class PianiController extends Controller
{

    public function list(Request $request)
    {
        $user = User::where('api_token', $request->header('api_token'))->first();
        $piani = Piani::where('iduserpiano', $user->id)->get();

        return $piani;
    }

    public function farmaciPiano($idpiano)
    {
        $piani = Piani::with('farmacipiano')->find($idpiano);

        if (!$piani) {
            return response()->json(["success" => false, "message" => ["error" => "piano not found"]], 200);
        }

        foreach ($piani->farmacipiano as $farmaco) {
            $farmaco->farmaco;
            $farmaco->specifica;
            $farmaco->quantitagiorno = $farmaco->pivot->quantitagg;
            $farmaco->orarioassunzione = $farmaco->pivot->orarioassunzione;
            $farmaco->giornosettimana = $farmaco->pivot->giornosettimana;
        }

        return $piani->farmacipiano;
    }


}