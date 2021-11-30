/** @type {import("./assets/lib/phaser")} */

import Timer from "./Timer.js";
import Customer from "./Customer.js";
import Cookware from "./Cookware.js";
import Food from "./Food.js";

let text;
let scoreText;
let circle;
let test_int;
let dropOff;
var timer;
let pot;
let width;
let height;
let score;
let customerCounter = 4;
const customerCounterAll = customerCounter;
var timerCustomer;
var timedEvent;
let targetX;
let place;
let clock;
let endText;
let scene;
let ingredient;
let level = 1;

export default class MainScene extends Phaser.Scene {
    constructor() {
      super('MainScene');
        this.difficulty = "EASY"; //for now
        this.level = 3;
        this.delay= this.changeDelay();
        this.firstPlaceIsEmpty = true;
        this.secondPlaceIsEmpty = true;
        this.thirdPlaceIsEmpty = true;
        this.score = 0;
    }
  
    preload() {
        this.load.image('bubble','./assets/images/bubble.png');
        //this.load.image('order','./assets/images/circle.jpg');
        this.load.image('customer','./assets/images/customer.png');
        this.load.image('Mclock','./assets/images/Morning Clock.png');
        this.load.image('Nclock','./assets/images/Noon Clock.png');
        this.load.image('Eclock','./assets/images/Evening Clock.png');
        this.load.image('NIclock','./assets/images/Night Clock.png');
        this.load.image('background','./assets/images/Background.png');
        this.load.image('curtains','./assets/images/Curtains.png');
        this.load.image('table','./assets/images/Table.png');
        this.load.image('square','./assets/images/square.jpg');
        this.load.image('circle','./assets/images/circle.jpg');


        width = this.cameras.main.width;
        height = this.cameras.main.height;
    }

    create(){

        //štart hry keby ste nevedeli
        this.startGame(); //Matúš

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
        this.myUpdate(); //Matúš

    }

    startGame(){
        //pozadie
        let bg = this.add.sprite(0, 0, 'background');
        bg.setScale(2);
        // change origin to the top-left of the sprite
        bg.setOrigin(0,0);

        //záclony
        let curtains = this.add.sprite(0, 0, 'curtains');
        curtains.setScale(2);
        // change origin to the top-left of the sprite
        curtains.setOrigin(0,0);

        //stôl
        let table = this.add.sprite(0, height/6 , 'table');
        table.setScale(2);
        table.setDepth(25);
        // change origin to the top-left of the sprite
        table.setOrigin(0,0);

        //vytvorenie hodín
        clock= this.add.image(width/1.13,height/9,"Mclock");
        //clock.setOrigin(0,0);
        clock.setScale(1.25);

        //vytvorenie score textu
        scoreText = this.add.text(5, 5, 'SCORE: ' + this.score, { font: 'bold 24px Arial', fill: '#000000'});
        scoreText.setShadow(0, 0, 'rgb(255,255,255)', 30);

        //vytvorenie konecneho textu
        endText = this.add.text(width/8, height/2, '', { font: 'bold 100px Arial', fill: '#000000'});
        endText.setShadow(0, 0, 'rgb(255,255,255)', 30);
        endText.setDepth(69);
        endText.visible = false;

        //vytvorenie skupiny
        this.customerGroup = this.add.group({
            //key: 'customer',
            maxSize: 3,
        });

        //časovač na vytváranie zákazníkov
        timerCustomer = this.time.addEvent({ delay: this.delay * 1000, callback: this.setUpCustomer, callbackScope: this, repeat: customerCounter -1 });

    }
    myUpdate(){
        scoreText.setText('SCORE: ' + this.score);

        // ak sú traja zákazníci na scéne zastav timer na generovanie zákazníkov
        if (this.customerGroup.isFull()){
            timerCustomer.paused = true;
        }
        else {
            timerCustomer.paused = false;
        }
        //hýbanie so zákazníkmi
        for (let i = 0; i < this.customerGroup.getChildren().length; i++) {
            //console.log(this.customerGroup.getChildren()[i]) ;
            this.customerGroup.getChildren()[i].moveCustomer();
            this.customerGroup.getChildren()[i].walkOff();
        }
        this.changeClock();
        this.checkIfEnd();
    }

    setUpCustomer(){
        /*
        //ak sa nenachádza customer na scéne daj ho do stredu okna
        if (this.customerGroup.getChildren().length === 0){
            targetX = width/2;
            this.firstPlaceIsEmpty = false;
        }
        //ak je jeden tak do 1/3 okna
        else if (this.customerGroup.getChildren().length === 1){
            targetX = width/3;
            this.secondPlaceIsEmpty = false;
        }
        //ak sú dvaja tak do 1/7 okna
        else if (this.customerGroup.getChildren().length === 2){
            targetX = width/7;
            this.thirdPlaceIsEmpty = false;
        }
        //viac ako traja by nemali nikdy byť
        else {
            targetX = width;
        }
*/
        customerCounter--;
        console.log(customerCounter)
        //better riešenie, ify na zabranie miesta
        if (this.firstPlaceIsEmpty){
            //stred okna
            targetX = width/2;
            place = 1;
            this.firstPlaceIsEmpty = false;
        }
        else if (this.secondPlaceIsEmpty){
            targetX = width/3;
            place = 2;
            this.secondPlaceIsEmpty = false;
        }
        else if (this.thirdPlaceIsEmpty){
            targetX = width/7;
            place = 3;
            this.thirdPlaceIsEmpty = false;
        }
        //viac ako traja BY nemali nikdy byť ale nikdy nevieš
        else {
            targetX = width/1.5;
        }

        //check if it is last boss
        if (customerCounter === 0 && this.level === 3){
            this.createFinalBoss(place,targetX,width);
        }
        else {
            this.createCustomer(place,targetX,width);


        }



        //console.log( this.customerGroup.getLength());
        //customer.isMoving = true;
        //customer.moveRight();
    }
    createFinalBoss(place, targetX, width){
        let customer = new Customer({scene: this, image: "customer",place: place ,targetX: targetX, edgeX: width, x: -100, y:205, orderImg: "circle", bubble: "bubble"});
        customer.setScale(0.6,0.3);
        customer.order = "Chef’s ultimate secret bowl";
        customer.bubble.setScale(0.8);
        customer.delay = 5;
        //customer.gotFood = true;
        customer.customerScore = 2000;
        this.add.existing(customer);
        this.customerGroup.add(customer);
        console.log( customer.order );
    }
    createCustomer(place,targetX,width){
        let customer = new Customer({scene: this, image: "customer",place: place ,targetX: targetX, edgeX: width, x: -100, y:205, orderImg: "circle", bubble: "bubble"});
        customer.setScale(0.3)
        this.add.existing(customer);
        this.customerGroup.add(customer);
        console.log( customer.order );
    }

    changeDelay(){
        //delay ako často budú chodiť zákazníci
        if (this.difficulty === "EASY"){
            this.delay = 10;
            return 1;
        }
        else if  (this.difficulty === "MEDIUM"){
            this.delay = 8;
            return 8;

        }
        else if  (this.difficulty === "HARD"){
            this.delay = 6;
            return 6;
        }
    }
    changeClock(){
        if (customerCounter< customerCounterAll *0.75 && customerCounter >= customerCounterAll *0.5){
            clock.setTexture('Nclock');
        }
        else if(customerCounter<= customerCounterAll *0.5  && customerCounter >= customerCounterAll *0.25){
            clock.setTexture('Eclock');
        }
        else if (customerCounter <= customerCounterAll *0.25){
            clock.setTexture('NIclock');
        }


    }
    checkIfEnd(){
        if (this.customerGroup.countActive(true)<1 && customerCounter ===0) {
            //console.log("KONIEC")
            endText.visible = true;
            if (this.score >= 1000){
                console.log("YOU WON!")
                endText.setText("YOU WON!");
            }
            else {
                console.log("YOU LOST")
                endText.setText("YOU LOST");

            }
        }
    }




    //function used only for testing
    //TIMO
    testingCreate(){
        scene = this;
        let potImg = scene.add.image(100, 200, "circle");
        timer = new Timer({scene: scene, x: 400, y: 300});
        this.add.existing(timer);
        pot = new Cookware({scene: scene, x: 400, y:300, objectImg: potImg, type: "pot"});
        this.add.existing(pot);
        pot.setCookEndEvent(this.onEvent);
        pot.setStart(timer);
        let plateObj = scene.add.sprite(0,0,"circle");
        dropOff = new PreparationPlate({scene: scene, x: 100, y:100, plateImg:plateObj, ingredients:[], foods:foods});
        dropOff.plate.setTint(0xB0FFFF);
        this.addFoods();
        this.addIngredients();
        scene.input.on('drag', function(pointer, gameObject, dragX, dragY){
            gameObject.x = dragX;
            gameObject.y = dragY;
            gameObject.setTint(0xB0FFFF);
            gameObject.setDepth(0);
        })


        scene.input.on('pointerup', function(){
            dropOff.checkOverlap(ingredientOne);
        });

    }

    //function used to test out the creation of ingredients
    //TIMO
    addIngredients(){
        ingredient = new Ingredient({scene:scene, x : 500, y:100, img: "square", name: "banana"});
        ingredient.setInteractive();
        scene.input.setDraggable(ingredient);
        ingredient.on('dragend', function(){
            this.clearTint();
        })
    }

    //function fills Foods array with instances of Food classed used in the level
    //this function should only be called in <createLevel> function
    //TIMO
    addFoods(){
        let ingredients;
        let food;

        ingredients = ['apple','banana','orange'];
        food = new Food({scene:scene, x:100, y:100, image: 'square', ingredients: ingredients, cookMethod: "pot"});
        food.setAlpha(0);
        food.setX(-100);
        food.setFoodName("Apple Split");
        foods.push(food);

        ingredients = ['banana','orange'];
        food = new Food({scene:scene, x:100, y:100, image: 'square', ingredients: ingredients, cookMethod: "pot"});
        food.setAlpha(0);
        food.setX(-100);
        food.setFoodName("Banana Split");
        foods.push(food);

        ingredients = ['apple','orange'];
        food = new Food({scene:scene, x:100, y:100, image: 'square', ingredients: ingredients, cookMethod: "pot"});
        food.setAlpha(0);
        food.setX(-100);
        food.setFoodName("Orange Split");
        foods.push(food);
        if(level >1){
            ingredients = ['orange'];
            food = new Food({scene:scene, x:100, y:100, image: 'square', ingredients: ingredients, cookMethod: "pot"});
            food.setAlpha(0);
            food.setX(-100);
            food.setFoodName("Literal Orange");
            foods.push(food);
            if(level = 3){
                ingredients = ['orange'];
                food = new Food({scene:scene, x:100, y:100, image: 'square', ingredients: ingredients, cookMethod: "frier"});
                food.setAlpha(0);
                food.setX(-100);
                food.setFoodName("WHAT?");
                foods.push(food);
            }
        }
    }

    //this is used to set different function to Timer in Cookware
    //will be changed
    //TIMO
    onEvent(){
        pot.startBurn({timer: timer, time: 3000});
    }

    timoUpdate(){
        if(pot.isCooking || pot.isBurning){
            timer.draw();
        }
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
/*
function createCustomer(){
    let customer = new Customer({scene: this, image: "customer", counterX: 200, edgeX: width, x: 350, y:200, timeLimit: 3000, timeOffset: 0, orderImg: "circle", bubble: "bubble", score: score});
    this.add.existing(customer);
    customer.setScale(0.4)
    return customer;
}
*/
/*
function onEvent ()
{
    this.initialTime -= 1; // One second
    text.setText('Countdown: ' + formatTime(this.initialTime));
}
function formatTime(seconds){
    // Minutes
    var minutes = Math.floor(seconds/60);
    // Seconds
    var partInSeconds = seconds%60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2,'0');
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
}*/


