<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request) {

        $user = User::where('username', $request->input('userormail'))
            ->orWhere('email', $request->input('userormail'))
            ->first();

         if ($user && Hash::check($request->input('password'), $user->password)) {
             return $user;
         }

         return response()->json(["success" => false, "message" => ["status" => "user not found", "error" => "username or password are wrong"]], 200);
    }

    public function register(Request $request) {

        $this->validate($request, [
            'name' => 'required|alpha',
            'surname' => 'required',
            'username' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|alpha_num|confirmed'
        ]);

        $utente = new User();

        $utente->name = $request->input('name');
        $utente->surname = $request->input('surname');
        $utente->username = $request->input('username');
        $utente->email = $request->input('email');
        $utente->password = Hash::make($request->input('password'));
        $utente->save();

        return response()->json(["success" => true, "data" => ["username" => $utente, "password" => User::where("name", 'Angelo')->first()->password]], 200);

    }
}