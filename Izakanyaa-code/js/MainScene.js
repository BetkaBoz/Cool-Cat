/** @type {import("./assets/lib/phaser")} */

var text;
var circle;
var test_int;
var dropOff;
export default class MainScene extends Phaser.Scene {


    constructor() {
      super('MainScene');
    }
  
    preload() {
        this.load.image('square','./assets/images/square.jpg');
        this.load.image('circle','./assets/images/circle.jpg');
    }

    create(){
        text = this.add.text(10, 10, 'Move the mouse', { font: '16px Courier', fill: '#00ff00' });
        var test = this.add.image(300, 50, 'square');
        dropOff = this.add.image(100, 250, 'square');
        dropOff.setScale(1.5,1.0);
        var scene = this;
        var selected = null;
        circle = null;
        test_int = 0;
        test.setInteractive();
        test.on('pointerdown', function(){
            circle = scene.add.image(this.x, this.y,'circle');
            circle.setInteractive();
            scene.input.setDraggable(circle);
            scene.selected = circle;
            selected = circle;
            circle.on('dragend', function(){
                this.clearTint();
            })
        })

        scene.input.on('pointermove', function(pointer) {
                //check here is a scene has a selected gameObject
                
                if(selected != null){
                    //text.setText('TRIGGERED');
                    selected.setTint(0x44ff4);
                    selected.setPosition(pointer.x, pointer.y);                        
                }else{
                    //text.setText('NOT');
                }
        })

        scene.input.on('pointerup', function(){
            if(dropOff == null){
                dropOff = dropOff_help;
            }
            if(selected != null){
                if(selected.y >= dropOff.y-dropOff.height && selected.y <= dropOff.y+dropOff.height){
                    if(selected.x >= dropOff.x-dropOff.width && selected.x <= dropOff.x+dropOff.width){
                        test_int++;
                        text.setText("" + test_int);
                    }
                }
                selected.y ++;
                selected.clearTint();
                selected.destroy();
                selected = null;
            }
        })
        
        /*scene.input.on('pointerdown',function(gameObject){
            if(gameObject = circle){
                gameObject.body.setGravity(0);
                gameObject.body.setAllowGravity(false);
            }
        })*/

        scene.input.on('drag', function(pointer, gameObject, dragX, dragY){
            gameObject.x = dragX;
            gameObject.y = dragY;
            gameObject.setTint(0x44ff4);
            /*if(gameObject = circle){
                gameObject.body.setGravity(0);
                gameObject.body.setAllowGravity(false);
            }*/
        })
        dropOff.setInteractive();
        dropOff.on('pointerdown', function(){
            if(selected != null){
                test_int++;
                selected.destroy();
                selected = null;
            }else{                
                if(circle != null){
                    test_int++;
                    circle.destroy();
                    circle = null;
                }
            }
            text.setText("FUUUUUCK"/*[
                'x: ' + pointer.x,
                'y: ' + pointer.y,
                'int: ' + test_int,
                'circle x: ' + circle.x,
                'circle y: ' + circle.y,
                'dropoff x: ' + dropOff.x,
                'dropoff y: ' + dropOff.y
            ]*/);   
        })
    }

    update(){
        if(circle != null && circle.y >= 300 ){
            circle.y = 10;
            //circle.destroy();
        }
        var pointer = this.input.activePointer;
        if(circle != null){
            text.setText([
                'x: ' + pointer.x,
                'y: ' + pointer.y,
                'int: ' + test_int,
                'circle x: ' + circle.x,
                'circle y: ' + circle.y,
                'dropoff x: ' + dropOff.x,
                'dropoff y: ' + dropOff.y,
                'dropoff with: ' + dropOff.width,
                'dropoff height: ' + dropOff.height
            ]); 
        }       
    }
}