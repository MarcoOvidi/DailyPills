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

    public function createPiano(Request $request) {

        $user = User::where('api_token', $request->header('api_token'))->first();

        $messages = [
            'required' => 'il campo :attribute non può essere vuoto',
            'alpha' => 'il campo :attribute deve contenere solo caratteri',
            'unique' => 'il campo :attribute è già presente nel sistema',
            'min:8' => 'il campo :attribute deve contenere almeno 8 caratteri',
            'alpha_num' => 'il campo :attribute deve contenere caratteri alfa-numerici',
            'confirmed' => 'le password inserite non corrispondono'
        ];

        $this->validate($request, [
            'inizio' => 'required',
            'fine' => 'required',
            'nome' => 'required',
            'descrizione' => 'required',
        ], $messages);

        $piano = new Piani();
        $piano->inizio = $request->input('inizio');
        $piano->fine = $request->input('fine');
        $piano->nome = $request->input('nome');
        $piano->descrizione = $request->input('descrizione');
        $piano->iduserpiano = $user->id;

        $piano->save();
    }

    public function removepiano($idpiano, Request $request) {

        $user = User::where('api_token', $request->header('api_token'))->first();
        $piano = Piani::where('id', $idpiano)
            ->where('iduserpiano', $user->id)
            ->first();

        if(!$piano) {
            return response()->json(["success" => false, "message" => "Piano not found"], 200);
        }

        $piano->delete();

        return response()->json(["success" => true, "message" => ["piano" => $piano->nome, "operation" => "Piano has been removed"]], 200);
    }

}