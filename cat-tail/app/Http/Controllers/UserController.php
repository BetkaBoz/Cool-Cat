<?php

namespace App\Http\Controllers;

use App\Models\Save;
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

        Save::create([
            'user_id' => $request->user_id,
            'difficulty' => $request->difficulty,
            'level' => $request->level,
            'score' => $request->score,
        ]);

        return response()->json(['msg' => 'Saved successfully']);
    }
}
