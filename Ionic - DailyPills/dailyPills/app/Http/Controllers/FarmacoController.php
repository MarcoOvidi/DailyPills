<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use function response;

class FarmacoController extends Controller
{

    public function list()
    {
        $results = DB::select("SELECT * FROM farmaco");
        return response()->json($results);
    }
}