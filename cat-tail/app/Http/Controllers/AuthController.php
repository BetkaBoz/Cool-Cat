<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        return [$user->createToken($request->device_name)->plainTextToken, $user->id];
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'min:6', 'confirmed'],
            'password_confirmation' => ['required'],
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['msg' => 'Registered successfully']);
    }

    public function logout(Request $request)
    {
        // TODO: mazanie tokenov funguje iba ak sa stranka refreshne, zatialco uz je user prihlaseny.
        //Podozrenie je, ze to sposobuje nieco v mounted() alebo created() v App.vue, ale ked skusim
        //dat to this.$axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}` aj do login() v Login.vue
        //nepomaha to, takze za tym moze byt nieco ine. Je vhodne to presetrit, ale nie nutne, kedze mazanie tokenu z
        //localStorage na frontende zrusi jeho pristup a na novom logine sa vzdy vytvori novy token
//        $request->user()->tokens()->delete();
//        $request->user()->currentAccessToken()->delete();
        return response()->json('Logout');
    }

}
