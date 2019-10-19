<?php

namespace App\Http\Controllers;

use App\MedType;
use App\Type;
use App\User;
use Illuminate\Http\Request;
use App\Farmaco;
use Illuminate\Support\Facades\DB;

class FarmacoController extends Controller
{

    public function list()
    {
        $results = Farmaco::with('types')->get();
//        return response()
//            ->json(["success" => true, "data" => $results], 200);
        return $results;
    }

    public function specifichelist() {
        $specifiche = Type::all();

        return $specifiche;
    }

    public function addRecord(Request $request) {

        $this->validate($request, [
            'name' => 'required',
            'codice' => 'required',
            'ptn' => 'required',
            'modality' => 'required',
            'produttore' => 'required',
            'principio' => 'required',
            "prezzo" => 'required'
        ]);

        $farmaco = new Farmaco();
        $farmaco->nome = $request->input('name');
        $farmaco->codice = $request->input('codice');
        $farmaco->ptn = $request->input('ptn');
        $farmaco->modalita_prescrizione = $request->input('modality');
        $farmaco->quantita_autorizzate = $request->input('quantity');
        $farmaco->produttore = $request->input('produttore');
        $farmaco->principio = $request->input('principio');
        $farmaco->prezzo = $request->input('prezzo');

        $farmaco->save();
        return response()
            ->json([ "success" => true,  "message" => " Farmco successfully insert", "data" => $farmaco], 200);
    }

    public function userfarmaco(Request $request) {

        $user = User::where('api_token', $request->header('api_token'))->first();
        $result = User::with('favorites')->find($user->id);

        foreach ($result->favorites as $typo) {
           $typo->farmaco;
           $typo->specifica;
           $typo->numero = $typo->pivot->quantity;
        }


        return $result->favorites;

    }

    public function addFavoriteMedicine(Request $request) {

        $user = User::where('api_token', $request->header('api_token'))->first();
        $medtype = MedType::where('idfarmaco', $request->input('idfarmaco'))
            ->where('idtype', $request->input('idtipo'))->first();

        $present = DB::table('userfarmacis')->where('iduser', $user->id)
            ->where('idfarmacotype', $medtype->id )->first();

        if($present) {
            return response()->json(["success" => false, "data" => ["message" => "Formato già presente nel proprio armadietto"]], 200);
        }

        $user->favorites()->attach($medtype->id, ["quantity" => $request->input('quantita')]);

        return response()->json(["success" => true, "data" => ["message" => "row add"]], 200);
    }

    public function remFavoriteMedicine($medid, Request $request) {

        $user = User::where('api_token', $request->header('api_token'))->first();

        $user->favorites()->detach($medid);

    }

}