<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function login(Request $request) {

        $user = User::where('username', $request->input('userormail'))
            ->orWhere('email', $request->input('userormail'))
            ->first();

         if ($user && Hash::check($request->input('password'), $user->password)) {
             return $user;
         }

         return response()->json(["success" => false, "message" => ["status" => "user not found", "error" => "username or password are wrong"]], 401);
    }

    public function register(Request $request) {

        $messages = [
            'required' => 'il campo :attribute non può essere vuoto',
            'alpha' => 'il campo :attribute deve contenere solo caratteri',
            'unique' => 'il campo :attribute è già presente nel sistema',
            'min:8' => 'il campo :attribute deve contenere almeno 8 caratteri',
            'alpha_num' => 'il campo :attribute deve contenere caratteri alfa-numerici',
            'confirmed' => 'le password inserite non corrispondono'
        ];

        $this->validate($request, [
            'name' => 'required|alpha',
            'surname' => 'required',
            'username' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|alpha_num|confirmed'
        ], $messages);

        $utente = new User();

        $utente->name = $request->input('name');
        $utente->surname = $request->input('surname');
        $utente->username = $request->input('username');
        $utente->email = $request->input('email');
        $utente->password = Hash::make($request->input('password'));
        $utente->api_token = Str::random(64);
        $utente->save();

//        return response()->json(["success" => true, "data" => ["username" => $utente, "password" => User::where("name", 'Angelo')->first()->password]], 200);
        return $utente;

    }
}