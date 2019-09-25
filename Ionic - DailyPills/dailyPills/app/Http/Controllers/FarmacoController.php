<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Farmaco;

class FarmacoController extends Controller
{

    public function list()
    {
        $results = Farmaco::all();
        return response()
            ->json(["success" => true, "data" => $results], 200);
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
}