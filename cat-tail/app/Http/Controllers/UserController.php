<?php

namespace App\Http\Controllers;

use App\Models\Save;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private function newSave($user_id, $existingSave)
    {
        if ($existingSave) {
            $existingSave->level = 1;
            $existingSave->score = 0;
            $existingSave->save();
        } else {
            $existingSave = Save::create([
                'user_id' => $user_id,
                'difficulty' => "EASY",
                'level' => 1,
                'score' => 0,
            ]);
        }
        return $existingSave;
    }

    public function newGame(Request $request)
    {
        $request->validate([
            'user_id' => ['required', 'integer']
        ]);

        $user = User::where('id', $request->user_id)->first();
        if (!$user) {
            throw ValidationException::withMessages(['The provided user does not exist.']);
        }

        $existingSave = Save::where('user_id', $request->user_id)->first();
        $this->newSave($request->user_id, $existingSave);

        return response()->json(['msg' => 'New Game started']);
    }

    public function save(Request $request)
    {
        $request->validate([
            'user_id' => ['required', 'integer'],
            'difficulty' => ['required', 'string'],
            'level' => ['required', 'integer'],
            'score' => ['required', 'integer'],
        ]);

        $user = User::where('id', $request->user_id)->first();
        if (!$user) {
            throw ValidationException::withMessages(['The provided user does not exist.']);
        }

        $existingSave = Save::where('user_id', $request->user_id)->first();
        if ($existingSave) {
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

    public function load(Request $request)
    {
        $request->validate([
            'user_id' => ['required', 'integer']
        ]);

        $user = User::where('id', $request->user_id)->first();
        if (!$user) {
            throw ValidationException::withMessages(['The provided user does not exist.']);
        }

        $existingSave = Save::where('user_id', $request->user_id)->first();
        if (!$existingSave) {
            $existingSave = $this->newSave($request->user_id, $existingSave);
        }

        return $existingSave;
    }

    public function difficulty(Request $request)
    {
        $request->validate([
            'user_id' => ['required', 'integer'],
            'difficulty' => ['required', 'string']
        ]);

        $user = User::where('id', $request->user_id)->first();
        if (!$user) {
            throw ValidationException::withMessages(['The provided user does not exist.']);
        }

        $existingSave = Save::where('user_id', $request->user_id)->first();

        if (!$existingSave) $existingSave = $this->newSave($request->user_id, $existingSave);
        $existingSave->difficulty = $request->difficulty;
        $existingSave->save();

        return response()->json(['msg' => ('Difficulty changed to '.$existingSave->difficulty)]);
    }

}
