<?php

namespace App\Http\Controllers;

use App\Models\Save;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function save(Request $request)
    {
        $request->validate([
            'user_id' => ['required','integer'],
            'difficulty' => ['required', 'string'],
            'level' => ['required','integer'],
            'score' => ['required','integer'],
        ]);

        $user = User::where('id', $request->user_id)->first();
        if (!$user) {
            throw ValidationException::withMessages(['The provided user does not exist.']);
        }

        $existingSave = Save::where('user_id', $request->user_id)->first();
        if($existingSave){
            $existingSave->difficulty = $request->difficulty;
            $existingSave->level = $request->level;
            $existingSave->score = $request->score;
            $existingSave->save();
        } else {
            Save::create([
                'user_id' => $request->user_id,
                'difficulty' => $request->difficulty,
                'level' => $request->level,
                'score' => $request->score,
            ]);
        }

        return response()->json(['msg' => 'Saved successfully']);
    }
}
