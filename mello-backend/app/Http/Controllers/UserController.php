<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return UserResource::collection(User::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'unique:users,email'
        ]);
        
        $user = new User([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password'))
        ]);
        $user->save();
        
        return new UserResource($user);
    }

    public function update($id, Request $request)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return UserResource::collection(User::all());
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return UserResource::collection(User::all());
    }
}
