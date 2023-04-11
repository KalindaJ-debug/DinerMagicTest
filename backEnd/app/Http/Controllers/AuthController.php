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
            'password' => 'required',
            'access_level' => 'required'
        ]);

        $user = new \App\Models\User();

        $user->name = $fields['name'];
        $user->email = $fields['email'];
        $user->password = Hash::make($fields['password']);
        $user->access_level = $fields['access_level'];

        $user->save();

        $token = $this->generateToken($user);

        return response()->json($token->plainTextToken, 200, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $fields['email'])->first();

        if (!$user || Hash::check($fields['password'], $user->password))
        {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);
     
            if (Auth::attempt($credentials)) {
                $token = $this->generateToken($user);
    

                return response()->json(['token' => $token->plainTextToken, 'access_level' => $user->access_level], 200, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
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


        // $request->user()->currentAccessToken()->delete();
        // auth('sanctum')->user()->tokens()->delete();
        // $request->user()->token()->revoke();
        auth()->user()->tokens()->delete();
        Session::flush();
        
        // Auth::logout();


        // $user = USer::where('email', $fields['email']);

        
        // $user->tokens()->delete();

        return response([
            'message' => 'Logged out'
        ], 200);
    }

    private function generateToken(User $user)
    {
        $token = '';

        if ($user->access_level == "admin")
        {
            $token = $user->createToken('admin-token', ['create', 'delete', 'view']);
        }
        else 
        {
            $token = $user->createToken('customer-token', ['view']);
        }

        return $token;
    }
}
