<?php

namespace App\Http\Controllers;

use App\Piani;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PianiController extends Controller
{

    public function list(Request $request)
    {
        $user = User::where('api_token', $request->header('api_token'))->first();
        $piani = Piani::where('iduserpiano', $user->id)->get();

        return $piani;
    }

    public function allFarmaciPianis(Request $request)
    {
        $user = User::where('api_token', $request->header('api_token'))->first();
        $actualdate = Carbon::now()->toDateString();
        $piani = Piani::where('iduserpiano', $user->id)
            ->where('inizio', '<=', $actualdate)
            ->where('fine', '>=', $actualdate)
            ->get();

        $farmaci = array();

        foreach ($piani as $piano) {
            foreach ($piano->farmaci as $farmaco) {
                $farmaco->farmaco;
                $farmaco->specifica;
                $farmaco->quantitagiorno = $farmaco->pivot->quantitagg;
                $farmaco->orarioassunzione = $farmaco->pivot->orarioassunzione;
                $farmaco->giornosettimana = $farmaco->pivot->giornosettimana;
                $farmaco->assunto = $farmaco->pivot->assunto;
                $farmaci[] = $farmaco;
            }
        }

        usort($farmaci, function($a, $b) {
            $v1 = strtotime($a['orarioassunzione']);
            $v2 = strtotime($b['orarioassunzione']);
            return $v1 - $v2;
        });

        return $farmaci;
    }


    public function farmaciPiano($idpiano, Request $request)
    {
        $user = User::where('api_token', $request->header('api_token'))->first();
        $piani = Piani::with('farmaci')->find($idpiano);

        if (!$piani) {
            return response()->json(["success" => false, "message" => ["error" => "piano not found"]], 200);
        }

        foreach ($piani->farmaci as $farmaco) {
            $farmaco->farmaco;
            $farmaco->specifica;
            $farmaco->quantitagiorno = $farmaco->pivot->quantitagg;
            $farmaco->orarioassunzione = $farmaco->pivot->orarioassunzione;
            $farmaco->giornosettimana = $farmaco->pivot->giornosettimana;
        }

        return $piani->farmaci;
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

    public function modify($idpiano, Request $request) {
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

        $user = User::where('api_token', $request->header('api_token'))->first();
        $piano = Piani::where('id', $idpiano)
            ->where('iduserpiano', $user->id)
            ->where('id', $idpiano)
            ->first();

        $piano->inizio = $request->input('inizio');
        $piano->fine = $request->input('fine');
        $piano->nome = $request->input('nome');
        $piano->descrizione = $request->input('descrizione');
        $piano->update();

        return response()->json(["success" => true, "message" => ["piano" => $piano, "operation" => "Piano has been modify"]], 200);

    }

    public function insertFarmaco($idpiano, Request $request) {

        $messages = [
            'required' => 'il campo :attribute non può essere vuoto',
            'alpha' => 'il campo :attribute deve contenere solo caratteri',
            'unique' => 'il campo :attribute è già presente nel sistema',
            'min:8' => 'il campo :attribute deve contenere almeno 8 caratteri',
            'alpha_num' => 'il campo :attribute deve contenere caratteri alfa-numerici',
            'confirmed' => 'le password inserite non corrispondono'
        ];

        $this->validate($request, [
            'idmedtype' => 'required',
            'orario' => 'required',
            'quantita' => 'required',
            'days' => 'required',
        ], $messages);

        $user = User::where('api_token', $request->header('api_token'))->first();
        $piano = Piani::where('id', $idpiano)
            ->where('iduserpiano', $user->id)
            ->first();

        $piano->farmaci()->attach($request->input('idmedtype'), ["quantitagg" => $request->input('quantita'), "orarioassunzione" => $request->input('orario'), "giornosettimana" => $request->input('days')]);

        return response()->json(["success" => true, "message" => ["mess" => "Farmaco inserito correttamente"]], 200);

    }

    public function removeFarmaco($idpiano, $medid, Request $request) {
        
        $user = User::where('api_token', $request->header('api_token'))->first();
        $idpiano = Piani::where('iduserpiano', $user->id)
            ->where('id', $idpiano)
            ->first();

        $idpiano->farmaci()->detach($medid);

        return response()->json(["success" => true, "message" => ["message" => "Farmaco rimosso correttamente"]], 200);
    }

    public function confirmAssunzione($idfarmacopiano, Request $request) {

        DB::table('pianisfarmaci')
            ->where('id', $idfarmacopiano)
            ->update(array("assunto" => 1));

        return response()->json(["success" => true, "message" => ["mess" => "Farmaco assunto"]], 200);

    }

}