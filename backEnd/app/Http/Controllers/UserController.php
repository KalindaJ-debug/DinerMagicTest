<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\user_view_request;
use App\Http\Resources\UserCollectionResource;
use App\Http\Requests\user_add_request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Builder;

class UserController extends Controller
{
    public function viewUser(user_view_request $request)
    {
        return new UserCollectionResource(User::orderBy('name')->get());
    }

    public function viewUpdatedUser(user_view_request $request)
    {
        $user = auth()->user();

        // return ($user->email);
        $userArray = User::orderBy($request->input('selection'))->where('created_by', $user->email)->get();
        // ->where('created_by', $user->email)
        // 
        // return ($userArray);
        // $clearedDependancy = [];
        // $containsWords = [];

        // $i = 0;

        // while($i < count($userArray))
        // {
        //     // if ($request->input('selection') == "name" && $request->input('searchString') != '')
        //     // {
        //     //     if (str_contains($userArray[$i]->name, $request->input('searchString')))
        //     //     {
        //     //         array_push($containsWords, $i);
        //     //     }
        //     // }

        //     // if ($request->input('selection') == "email")
        //     // {
        //     //     if (str_contains($userArray[$i]->email, $request->input('searchString')) && $request->input('searchString') != '')
        //     //     {
        //     //         array_push($containsWords, $i);
        //     //     }
        //     // }

        //     if ($userArray[$i]->access_level == "customer")
        //     {
        //         if ($userArray[$i]->created_by != $user->email)
        //         {
        //             array_push($clearedDependancy, $i);
        //         }
        //     }
        //     $i++;
        // }
        
        // // return ($sortedArray);

        // // foreach ($containsWords as $containsWord) {
        // //     array_push($sortedArray, $userArray[$containsWords]);
        // //     // $sortedArray[count($userArray) + 1] = $userArray[$containsWords];
        // // }

        // // return ($sortedArray);

        // foreach ($clearedDependancy as $dependancy) {
        //     unset($userArray[$dependancy]);
        // }
    
        return new UserCollectionResource($userArray);
    }

    public function addUser(user_add_request $request)
    {
        $loginUser = auth()->user();

        $user = new \App\Models\User();

        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->access_level = $request->input('access_level');
        $user->created_by = $loginUser->email;

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
