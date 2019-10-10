<?php

namespace App\Http\Controllers;

use App\Type;
use Illuminate\Http\Request;

class TypeController extends Controller
{
    public function addType(Request $request)
    {
        $this->validate($request, [
            'formato' => 'required',
            'quantita' => 'required',
        ]);

        $type = new Type();
        $type->formato = ($request->input('formato'));
        $type->quantita = ($request->input('quantita'));

        $type->save();

        return response()->json(["success" => true, 'data' => ["tipo" => $type]], 200);
    }

}




