<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    //This method directly checks the user's credentials without relying on the session state and returns a token for successful authentication.
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        $user = User::where('email', $credentials['email'])->first();
    
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'The provided credentials do not match our records.'], 401);
        }
    
        $token = $user->createToken('token')->plainTextToken;
    
        return response()->json(['user' => $user, 'token' => $token]);
    }
    
    public function register(Request $request)
    {
        \Log::info($request->all());

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('YourAppTokenName')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function logout(Request $request)
    {
        $user = Auth::user();
    
        // Revoke the token that was used to authenticate the current request...
        $user->currentAccessToken()->delete();
    
        // Or revoke all tokens...
        // $user->tokens()->delete();
    
        return response()->json(['message' => 'Logged out successfully']);
    }
    
}
