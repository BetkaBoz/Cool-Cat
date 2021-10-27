<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Routing\Controller;

class HomeController extends Controller
{


    public function test(){
        echo "<h1>GET READY COOL CAT </h1>";

        echo "<h2> COOL CAT RULES </h2>";

        echo "<h3> COOL FUCKING CAT </h3>";
    }

    public function insertTask(){
        $task = new Task();
        $task->content = "uprac izbu kek";
        $task->owner = "Feri";
        $task->save();

    }

    public function selectTask($id){
        $task = Task::find($id);
        if ($task){
            echo "Uloha s id: ".$id."<br>";
            echo "Uloha s ownerom: ".$task->owner."<br>";
            echo "Uloha s ulohou: ".$task->content ."<br>";
        }
        else{
            echo "Uloha neexistuje";
        }

    }


    public function selectAll(){
        $tasks = Task::all();
        foreach ($tasks as  $task)
        if ($task){
            echo "Uloha s id: ".$task->id."<br>";
            echo "Uloha s ownerom: ".$task->owner."<br>";
            echo "Uloha s ulohou: ".$task->content ."<br>";
            echo "----------------------------------------- <br>";
        }
    }



    public function updateTask($id,$owner){
        $task = Task::find($id);
        if ($task){
            $task->owner = $owner;
            $task->update();
        }
        else{
            echo "Uloha neexistuje";
        }
    }

    public function deleteTask($id){
        $task = Task::find($id);
        if ($task){
            $task->delete();
        }
        else{
            echo "Typek neexistuje";
        }
    }


}

