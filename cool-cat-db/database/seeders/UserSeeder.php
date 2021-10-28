<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            1 => [
                "name"=>"Jozko Vajda",
                "email"=>"jozkovajda@azet.sk",
                "password"=>"jozko",
            ],
            2 => [
                "name"=>"Feri",
                "email"=>"ferko@gmail.com",
                "password"=>"123456789",
            ]
        ];

        foreach ($users as $id => $userData){
            $user = User::find($id);
            if (!$user){
                $newuser = new User();
                $newuser->id = $id;
                $newuser->name = $userData["name"];
                $newuser->email = $userData["email"];
                $newuser->password = $userData["password"];
                $newuser->save();
            }
        }




    }
}
