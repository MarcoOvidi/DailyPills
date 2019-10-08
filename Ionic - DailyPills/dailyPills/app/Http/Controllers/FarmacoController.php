<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Farmaco;

class FarmacoController extends Controller
{

    public function list()
    {
        $results = Farmaco::all();
//        return response()
//            ->json(["success" => true, "data" => $results], 200);
        return $results;
    }

    public function addRecord(Request $request) {

        $this->validate($request, [
            'name' => 'required',
            'aic' => 'required',
            'ptn' => 'required',
            'modality' => 'required',
        ]);

        $farmaco = new Farmaco();
        $farmaco->nome = $request->input('name');
        $farmaco->aic = $request->input('aic');
        $farmaco->ptn = $request->input('ptn');
        $farmaco->modalita_prescrizione = $request->input('modality');
        $farmaco->quantita_autorizzate = $request->input('quantity');

        $farmaco->save();
        return response()
            ->json([ "success" => true,  "message" => " Farmco successfully insert", "data" => $farmaco], 200);
    }

    public function userfarmaco(Request $request) {

        $user = User::where('api_token', $request->header('api_token'))->first();
        $result = User::with('favorites')->find($user->id);

        return $result->favorites->toArray();

    }

    public function addFavoriteMedicine($medid, Request $request) {

        $user = User::where('api_token', $request->header('api_token'))->first();

        $user->favorites()->attach($medid);
    }

    public function remFavoriteMedicine($medid, Request $request) {

        $user = User::where('api_token', $request->header('api_token'))->first();

        $user->favorites()->detach($medid);

    }

}