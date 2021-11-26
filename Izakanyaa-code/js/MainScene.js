/** @type {import("./assets/lib/phaser")} */

import Timer from "./Timer.js";
import Customer from "./Customer.js";
import Cookware from "./Cookware.js";
import Food from "./Food.js";


let text;
let circle;
let test_int;
let dropOff;
var timer;
let pot;
let width;
let score;
let customer;


export default class MainScene extends Phaser.Scene {


    constructor() {
      super('MainScene');
    }
  
    preload() {
        this.load.image('square','./assets/images/square.jpg');
        this.load.image('circle','./assets/images/circle.jpg');
        this.load.image('customer','./assets/images/customer_1.png');
        width = this.cameras.main.width;
    }

    create(){
        //this.createStuff()
        text = this.add.text(10, 10, 'Move the mouse', { font: '16px Courier', fill: '#00ff00' });
        let scene = this;
        let potImg = scene.add.image(100, 200, "circle");
        // scene.input.on('pointerOver', function(gameObject) {
        //     gameObject.setTint(0x44ff4);
        // });
        timer = new Timer({scene: scene, x: 400, y: 300});
        this.add.existing(timer);
        pot = new Cookware({scene: scene, x: 400, y:300, objectImg: potImg, type: "pot"});
        this.add.existing(pot);
        pot.setCookEndEvent(this.onEvent);
        //pot.setCookEndEvent(this.onEvent);
        //console.log("FURNG");
        pot.startCooking({timer: timer, time:3000});
        // timer.setEvent({time: 3000,endEvent: this.onEvent});
        // timer.setVisiblity(true);


        customer = new Customer({scene: this, image: "customer", counterX: 200, edgeX: width, x: 250, y:200, timeLimit: 3000, timeOffset: 0, orderImg: "circle", bubble: "square", score: score});
        this.add.existing(customer);
        customer.generateOrder();
    }

    onEvent(){
        //console.log("wat"+timer);
        pot.startBurn({timer: timer, time: 3000});
    }

    oneEvent(){
        text.setText("DERG");
        //console.log("DERG");
        timer.setEvent({time: 3000,endEvent: this.onEvent});
    }

    update(){

        // if(!(pot.timer == null)){
        //    pot.draw();
        // }
        pot.testText(text);
        timer.draw();
        // if(circle != null && circle.y >= 300 ){
        //     circle.y = 10;
        //     //circle.destroy();
        // }
        // let pointer = this.input.activePointer;
        // if(circle != null){
        //     text.setText(""[
        //         'x: ' + pointer.x,
        //         'y: ' + pointer.y,
        //         'int: ' + test_int,
        //         'circle x: ' + circle.x,
        //         'circle y: ' + circle.y,
        //         'dropoff x: ' + dropOff.x,
        //         'dropoff y: ' + dropOff.y,
        //         'dropoff with: ' + dropOff.width,
        //         'dropoff height: ' + dropOff.height""
        //     ]);
        // }
    }

    createStuff(){
        score = 0;

        let test = this.add.image(300, 50, 'square');
        dropOff = this.add.image(100, 250, 'square');
        dropOff.setScale(1.5,1.0);
        //firstCustomer = new Customer({scene: this, image: "customer", counterX: 200, edgeX: width, x: 0, y:200, timeLimit: 3000, timeOffset: 0, order: "circle", bubble: "square", score: score});
        timer = new Timer({scene: this, x: 400, y: 300, time: 3000, showTimer: true,endEvent: this.onEvent});

        let selected = null;
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
}
