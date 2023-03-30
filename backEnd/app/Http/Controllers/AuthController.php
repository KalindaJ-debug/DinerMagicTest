<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = new \App\Models\User();

        $user->name = $fields['name'];
        $user->email = $fields['email'];
        $user->password = Hash::make($fields['password']);

        $user->save();

        
        $adminToken = $user->createToken('admin-token', ['create', 'update', 'delete']);
        // $updateToken = $user->createToken('update-token', ['create', 'update']);
        // $basicToken = $user->createToken('basic-token', ['none']);

        return response()->json($adminToken->plainTextToken, 200, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
        // return [
        //     'admin' => $adminToken->plainTextToken,
        //     'update' => $updateToken->plainTextToken,
        //     'basic' => $basicToken->plainTextToken,
        // ];
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $fields['email'])->first();

        //return ($fields['password']);
        if (!$user || Hash::check($fields['password'], $user->password))
        {
           

            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);
     
            if (Auth::attempt($credentials)) {
                $adminToken = $user->createToken('admin-token', ['create', 'update', 'delete']);
                // $updateToken = $user->createToken('update-token', ['create', 'update']);
                // $basicToken = $user->createToken('basic-token', ['none']);
    
                return response()->json($adminToken->plainTextToken, 200, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
                // return json_encode($adminToken->plainTextToken);
                // return [
                //     'admin' => $adminToken->plainTextToken,
                //     'update' => $updateToken->plainTextToken,
                //     'basic' => $basicToken->plainTextToken,
                // ];
            }
        }
        else 
        {
            return response([
                'message' => 'Bad Credentials'
            ], 401);
        }
        
        
    }

    public function logout(Request $request)
    {
        // auth()->user()->tokens()->delete();

        $fields = $request->validate([
            'email' => 'required|email',
        ]);


        $request->user()->currentAccessToken()->delete();

        auth()->user()->tokens()->delete();
        Session::flush();
        
        // Auth::logout();


        // $user = USer::where('email', $fields['email']);

        
        // $user->tokens()->delete();

        return ('Logout');
    }
}
