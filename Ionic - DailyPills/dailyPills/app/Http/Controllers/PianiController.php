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

    public function list()
    {
        $piani = Piani::with('farmacipiano')->get();
        return $piani;
    }


}