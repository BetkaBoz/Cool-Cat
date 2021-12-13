<?php

namespace Database\Seeders;

use App\Models\Save;
use Illuminate\Database\Seeder;

class SaveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $saves = [
            1 => [
                "user_id"=>1,
                "difficulty"=>"HARD",
                "level"=>2,
                "score"=>69,
            ],
            2 => [
                "user_id"=>2,
                "difficulty"=>"EASY",
                "level"=>3,
                "score"=>69666420,
            ],
            3 => [
                "user_id"=>3,
                "difficulty"=>"MEDIUM",
                "level"=>1,
                "score"=>0,
            ],
            4 => [
                "user_id"=>5,
                "difficulty"=>"MEDIUM",
                "level"=>1,
                "score"=>0,
            ]
        ];

        foreach ($saves as $id => $saveData){
            $save = Save::find($id);
            if (!$save){
                $newsave = new Save();
                $newsave->id = $id;
                $newsave->user_id = $saveData["user_id"];
                $newsave->difficulty = $saveData["difficulty"];
                $newsave->level = $saveData["level"];
                $newsave->score = $saveData["score"];
                $newsave->save();
            }
        }

    }
}
