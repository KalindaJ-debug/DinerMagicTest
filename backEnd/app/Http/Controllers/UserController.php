<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\user_view_request;
use App\Http\Resources\UserCollectionResource;
use App\Http\Requests\user_add_request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function viewUser(user_view_request $request)
    {
        return new UserCollectionResource(User::all());
    }

    public function addUser(user_add_request $request)
    {
        $user = new \App\Models\User();

        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->access_level = $request->input('access_level');
        $user->created_by = $request->input('created_by');

        $user->save();

        return response()->json($user, 201, ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'], JSON_UNESCAPED_UNICODE);
    }

    public function deleteUser($id)
    {
        
        $user = User::findOrFail($id);
        if ($user)
        {
            $user->delete();
        }
        else
        {
            return response()->json(null, 422);
        }

        return response()->json(null, 204);
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->access_level = $request->input('access_level');

        $user->save();
        
        return response()->json(["data" => [
            "success" => true
        ]], 201);
    }
}
