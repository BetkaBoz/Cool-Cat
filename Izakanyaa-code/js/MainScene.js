/** @type {import("./assets/lib/phaser")} */

import Timer from "./Timer.js";
import Customer from "./Customer.js";
import Cookware from "./Cookware.js";
import Food from "./Food.js";
import PreparationPlate from "./PreparationPlate.js";
import Ingredient from "./Ingredient.js";
import Button from "./Button";


let text;
let scoreText;
let circle;
let prepPlate;
let test_int;
let dropOff;
var timer;
let pan;
let pot;
let width;
let height;
let score;
var timerCustomer;
var timedEvent;
let targetX;
let place;
let clock;
let endText;
let scene;
let ingredient;
let level = 1;
let foods = [];
let isOver = [false,false,false,false];

export default class MainScene extends Phaser.Scene {
    constructor() {
      super('MainScene');
        this.difficulty = "EASY"; //for now
        this.level = 3;
        this.delay= this.changeDelay();
        this.score = 0;
        this.customerCounter = 4;
        this.customerCounterAll = this.customerCounter;
        this.firstPlaceIsEmpty = true;
        this.secondPlaceIsEmpty = true;
        this.thirdPlaceIsEmpty = true;
    }
  
    preload() {
        //ENVIRONMENT
        this.load.image('bubble','./assets/images/bubble.png');
        // this.load.image('order','./assets/images/circle.jpg');
        this.load.image('customer','./assets/images/customer.png');
        this.load.image('Mclock','./assets/images/Morning Clock.png');
        this.load.image('Nclock','./assets/images/Noon Clock.png');
        this.load.image('Eclock','./assets/images/Evening Clock.png');
        this.load.image('NIclock','./assets/images/Night Clock.png');
        //this.load.image('background','./assets/images/Background.png');
        //this.load.image('background2','./assets/images/Background2.png');
        this.load.image('background3','./assets/images/Background3.png');
        this.load.image('curtains','./assets/images/Curtains.png');
        this.load.image('table','./assets/images/Table.png');
        this.load.image('square','./assets/images/square.jpg');
        this.load.image('circle','./assets/images/circle.jpg');

        //FOODS
        this.load.image('Blob','./assets/images/food/Blob.png');
        this.load.image('Shioyaki','./assets/images/food/Shioyaki.png');
        this.load.image('Ikayaki','./assets/images/food/Ikayaki.png');
        this.load.image('Onigiri','./assets/images/food/Onigiri.png');
        this.load.image('Cabbage_Salad','./assets/images/food/Salad.png');
        this.load.image('Taiyaki','./assets/images/food/Taiyaki.png');
        this.load.image('Dorayaki','./assets/images/food/Dorayaki.png');
        this.load.image('Daikon_Salad','./assets/images/food/Daikon.png');
        this.load.image('Sushi','./assets/images/food/Sushi.png');
        this.load.image('Ebi_Furai','./assets/images/food/Ebi_Furai.png');
        this.load.image('Takoyaki','./assets/images/food/Takoyaki.png');
        this.load.image('Ultimate_secret_bowl','./assets/images/food/Ultimate_secret_bowl.png');

        //INGREDIENTS
        this.load.image('Mackerel','./assets/images/ingredients/Meat/Mackerel.png');
        this.load.image('Octopus','./assets/images/ingredients/Meat/Octopus.png');
        this.load.image('Salmon','./assets/images/ingredients/Meat/Salmon.png');
        this.load.image('Shrimp','./assets/images/ingredients/Meat/Shrimp.png');
        this.load.image('Squid','./assets/images/ingredients/Meat/Squid.png');
        this.load.image('Liquid_Dough','./assets/images/ingredients/Other/Liqiud dough bowl.png');
        this.load.image('Panko','./assets/images/ingredients/Other/Panko Bowl.png');
        this.load.image('Rice','./assets/images/ingredients/Other/Rice Bowl.png');
        this.load.image('Tenkasu','./assets/images/ingredients/Other/Tenkasu Bowl lighter.png');
        this.load.image('Anko','./assets/images/ingredients/Seasonings/Anko.png');
        this.load.image('Mayo','./assets/images/ingredients/Seasonings/Mayonnaise.png');
        this.load.image('Salt','./assets/images/ingredients/Seasonings/Salt shaker.png');
        this.load.image('Seaweed','./assets/images/ingredients/Seasonings/Seaweed plate.png');
        this.load.image('Soy_Sauce','./assets/images/ingredients/Seasonings/Soy sauce.png');
        this.load.image('Cabbage','./assets/images/ingredients/Vegetables/Cabbage.png');
        this.load.image('Daikon_Chopped','./assets/images/ingredients/Vegetables/Daikon.png');
        this.load.image('Spring_Onion','./assets/images/ingredients/Vegetables/Spring onion.png');

        //KITCHEN
        this.load.image('Plate','./assets/images/food/Plate.png');



    }

    create(){
        //štart hry keby ste nevedeli
        this.startGame(); //Matúš
        this.testingCreate(); //Timo
    }

    update(){
        this.myUpdate(); //Matúš
        this.testUpdate(); //Timo
    }

    startGame(){
        width = this.cameras.main.width;
        height = this.cameras.main.height;
        //pozadie
        let bg = this.add.sprite(0, 0, 'background3');
        bg.setScale(2);
        // change origin to the top-left of the sprite
        bg.setOrigin(0,0);

        //záclony
        /*
            let curtains = this.add.sprite(0, 0, 'curtains');
            curtains.setScale(2);
            // change origin to the top-left of the sprite
            curtains.setOrigin(0,0);
        */
        //stôl
        let table = this.add.sprite(0, height/6 , 'table');
        table.setScale(2);
        table.setDepth(25);
        // change origin to the top-left of the sprite
        table.setOrigin(0,0);

        //vytvorenie hodín
        //clock= this.add.image(width/1.13,height/9,"Mclock");
        clock= this.add.image(width/9,height/9,"Mclock");
        //clock.setOrigin(0,0);
        clock.setScale(1.25);

        //vytvorenie score textu
        scoreText = this.add.text(width/2.8, 5, 'SCORE: ' + this.score, { font: 'bold 32px Arial', fill: '#000000'});
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
        timerCustomer = this.time.addEvent({ delay: this.delay * 1000, callback: this.setUpCustomer, callbackScope: this, repeat: this.customerCounter -1 });

    }
    myUpdate(){
        scoreText.setText('SCORE: ' + this.score);

        //this.cameras.main.shake(500);

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
        this.customerCounter--;
        console.log(this.customerCounter)
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
        if (this.customerCounter === 0 && this.level === 3){
            this.cameras.main.shake(40);
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
        let customer = new Customer({scene: this, image: "customer",place: place ,targetX: targetX, edgeX: width, x: -100, y:205, order: "Ikayaki", bubble: "bubble"});
        customer.setScale(0.6,0.3);
        customer.order = "Ultimate_secret_bowl";
        customer.order_image.setTexture(customer.order);
        customer.bubble.setScale(0.8);
        customer.setOrderScale();
        customer.delay = 1;
        //customer.gotFood = true;
        customer.customerScore = 2000;
        this.add.existing(customer);
        this.customerGroup.add(customer);
        console.log( customer.order );
    }
    createCustomer(place,targetX,width){
        let customer = new Customer({scene: this, image: "customer",place: place ,targetX: targetX, edgeX: width, x: -100, y:205, order: "Ikayaki", bubble: "bubble"});
        customer.setScale(0.3);
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
        if (this.customerCounter< this.customerCounterAll *0.75 && this.customerCounter >= this.customerCounterAll *0.5){
            clock.setTexture('Nclock');
        }
        else if(this.customerCounter<= this.customerCounterAll *0.5  && this.customerCounter >= this.customerCounterAll *0.25){
            clock.setTexture('Eclock');
        }
        else if (this.customerCounter <= this.customerCounterAll *0.25){
            clock.setTexture('NIclock');
        }


    }
    checkIfEnd(){
        if (this.customerGroup.countActive(true)<1 && this.customerCounter ===0) {
            //console.log("KONIEC")
            endText.visible = true;
            if (this.score >= 1000){
                console.log("YOU WON!")
                endText.setText("YOU WON!");
                //this.cameras.main.fade(2550);
                //this.time.addEvent({delay: 5000, callback: this.scene.stop, callbackScope: this, loop: false });
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
        let panImg = scene.add.image(0, 0, "circle");
        timer = new Timer({scene: scene, x: 0, y: 0});
        pan = new Cookware({scene: scene, x: 100, y:height-50, objectImg: panImg, type: "pan", timer: timer});
        prepPlate = new PreparationPlate({scene: scene, x: 300, y:height-50, plateImg:"Plate", ingredients:[], foods:foods});
        prepPlate.plate.setScale(0.5);
        prepPlate.width = prepPlate.width/2;
        prepPlate.height = prepPlate.height/2;
        prepPlate.setHit(prepPlate);
        //TEMP
        this.addButtons();
        this.addFoods();
        // this.addIngredients();
        this.setInteractivity();
    }

    addButtons(){
        let button
        //meat
        button = new Button({scene: scene, x: width-200,y: height-50,img: 'square', name: "Mackerel Button"});
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Mackerel", name: "mackerel"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
        });
        button = new Button({scene: scene, x: width-200,y: height-50,img: 'square', name: "Octopus Button"});
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Octopus", name: "octopus"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
        });
        button = new Button({scene: scene, x: width-200,y: height-50,img: 'square', name: "Salmon Button"});
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Salmon", name: "salmon"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
        });
        button = new Button({scene: scene, x: width-200,y: height-50,img: 'square', name: "Shrimp Button"});
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Shrimp", name: "shrimp"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
        });
        button = new Button({scene: scene, x: width-200,y: height-50,img: 'square', name: "Squid Button"});
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Squid", name: "squid"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
        });

        //Seasoning
        button = new Button({scene: scene, x: width-200,y: height-50,img: 'square', name: "Anko Button"});
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Anko", name: "anko"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
        });
        button = new Button({scene: scene, x: width-200,y: height-50,img: 'square', name: "Mayonnaise Button"});
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Mayo", name: "mayo"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
        });
        button = new Button({scene: scene, x: width-200,y: height-50,img: 'square', name: "Salt Button"});
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Salt", name: "salt"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
        });
        button = new Button({scene: scene, x: width-200,y: height-50,img: 'square', name: "Seaweed Button"});
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Seaweed", name: "seaweed"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
        });
        button = new Button({scene: scene, x: width-200,y: height-50,img: 'square', name: "Soy sauce Button"});
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Soy_sauce", name: "soy sauce"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
        });
        //Other
        button = new Button({scene: scene, x: width-200,y: height-50,img: 'square', name: "Liqiud dough Button"});
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Liqiud_dough", name: "liqiud dough"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
        });
        button = new Button({scene: scene, x: width-200,y: height-50,img: 'square', name: "Panko Button"});
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Panko", name: "panko"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
        });
        button = new Button({scene: scene, x: width-200,y: height-50,img: 'square', name: "Rice Button"});
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Rice", name: "rice"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
        });
        button = new Button({scene: scene, x: width-200,y: height-50,img: 'square', name: "Tenkasu Button"});
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Tenkasu", name: "tenkasu"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
        });

        //Vegetables
        button = new Button({scene: scene, x: width-200,y: height-50,img: 'square', name: "Cabbage Button"});
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Cabbage", name: "cabbage"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
        });
        button = new Button({scene: scene, x: width-200,y: height-50,img: 'square', name: "Daikon Button"});
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Daikon_Chopped", name: "daikon"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
        });
        button = new Button({scene: scene, x: width-200,y: height-50,img: 'square', name: "Spring onion Button"});
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Spring_onion", name: "spring onions"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
        });
    }

    //function used to set input.on functions to elements in scene
    //TIMO

    setInteractivity(){
        scene.input.on('pointermove', function(pointer) {
            //check here is a scene has a selected gameObject
            if(ingredient){
                ingredient.setTint(0x44ff4);
                ingredient.setPosition(pointer.x, pointer.y);
            }
        })

        scene.input.on('pointerup', function (){
            if(ingredient){
                if(!prepPlate.checkOverlap(ingredient)){
                    ingredient.destroy();
                }else {
                    ingredient.emit('dragend');
                }
                ingredient = undefined;
            }
        })

        scene.input.on('drag', function(pointer, gameObject, dragX, dragY){
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        prepPlate.on('dragend',function (){
            if(prepPlate.ingredients.length > 0){
                pan.checkOverlap(prepPlate);
                if(pan.isCooking && !pan.isBurning) {
                    this.scene.addIngredients();
                }
            }
            prepPlate.x = prepPlate.plate.x;
            prepPlate.y = prepPlate.plate.y;
        })

        pan.object.on('pointerdown',function (){
            if(!pan.isCooking && pan.isBurning){
                let food = foods.find(element => element.name == pan.cookedFood);
                if(food){
                    food.x = pan.x;
                    food.y = pan.y-75;
                    food.setAlpha(1);
                }else {
                    console.log(pan.cookedFood);
                }
                pan.isBurning = false;
                pan.isCooking = false;
                timer.timerControl("stop");
            }
        })
    }

    //function used to test out the creation of ingredients
    //TIMO

    addIngredients(){
        ingredient = new Ingredient({scene:scene, x : width-100, y:height-50,plate:prepPlate, img: "Daikon_Chopped", name: "daikon"});
        ingredient = new Ingredient({scene:scene, x : width-50, y:height-50,plate:prepPlate, img: "Salt", name: "salt"});
        // ingredient.setInteractive();
        // scene.input.setDraggable(ingredient);
        // ingredient.setDepth(70);
        // ingredient.on('dragend', function(){
        //     this.clearTint();
        //     prepPlate.checkOverlap(this);
        // })
    }

    //function fills Foods array with instances of Food classed used in the level
    //this function should only be called in <createLevel> function
    //TIMO
    addFoods(){
        level = 3;
        console.log("level: "+level);
        let ingredients,food;
        ingredients = ['mackerel','salt'];
        food = new Food({scene:scene, x:100, y:100, image: 'Shioyaki', ingredients: ingredients, cookMethod: "bake", prepTime: 3000});
        food.setFoodName("Shioyaki");
        foods.push(food);

        ingredients = ['squid','soy sauce'];
        food = new Food({scene:scene, x:100, y:100, image: 'Ikayaki', ingredients: ingredients, cookMethod: "fry", prepTime: 3000});
        food.setFoodName("Ikayaki");
        foods.push(food);

        ingredients = ['rice','mackerel', 'seaweed'];
        food = new Food({scene:scene, x:100, y:100, image: 'Onigiri', ingredients: ingredients, cookMethod: "mix", prepTime: 3000});
        food.setFoodName("Onigiri");
        foods.push(food);

        ingredients = ['liquid dough','anko'];
        food = new Food({scene:scene, x:100, y:100, image: 'Taiyaki', ingredients: ingredients, cookMethod: "fry", prepTime: 3000});
        food.setFoodName("Taiyaki");
        foods.push(food);

        ingredients = ['cabbage','salt','soy sauce'];
        food = new Food({scene:scene, x:100, y:100, image: 'Cabbage_Salad', ingredients: ingredients, cookMethod: "mix", prepTime: 3000});
        food.setFoodName("Salad");
        foods.push(food);

        ingredients = ['none'];
        food = new Food({scene:scene, x:100, y:100, image: 'square', ingredients: ingredients, cookMethod: "nothing", prepTime: 3000});
        food.setFoodName("Garbage");
        foods.push(food);

        ingredients = ['none'];
        food = new Food({scene:scene, x:100, y:100, image: 'square', ingredients: ingredients, cookMethod: "nothing", prepTime: 3000});
        food.setFoodName("Burnt");
        foods.push(food);
        if(level >1){
            ingredients = ['liquid dough','anko'];
            food = new Food({scene:scene, x:100, y:100, image: 'Dorayaki', ingredients: ingredients, cookMethod: "bake", prepTime: 3000});
            food.setFoodName("Dorayaki");
            foods.push(food);

            ingredients = ['rice','salmon', 'seaweed'];
            food = new Food({scene:scene, x:100, y:100, image: 'Sushi', ingredients: ingredients, cookMethod: "mix", prepTime: 3000});
            food.setFoodName("Sushi");
            foods.push(food);

            ingredients = ['daikon', 'salt'];
            food = new Food({scene:scene, x:100, y:100, image: 'Daikon_Salad', ingredients: ingredients, cookMethod: "mix", prepTime: 3000});
            food.setFoodName("Daikon");
            foods.push(food);
            if(level = 3){
                ingredients = ['shrimp','panko','liquid dough'];
                food = new Food({scene:scene, x:100, y:100, image: 'Ebi Furai', ingredients: ingredients, cookMethod: "fry"});
                food.setFoodName("Ebi Furai");
                foods.push(food);

                ingredients = ['octopus','tenkasu','liquid dough','spring onions', 'mayo'];
                food = new Food({scene:scene, x:100, y:100, image: 'Takoyaki', ingredients: ingredients, cookMethod: "fry"});
                food.setFoodName("Takoyaki");
                foods.push(food);

                //TODO: Figure how to actually make this!!!
                ingredients = ['UGHHH'];
                food = new Food({scene:scene, x:100, y:100, image: 'square', ingredients: ingredients, cookMethod: "frier"});
                food.setFoodName("Ultimate Secrete Bowl");
                foods.push(food);
            }
        }
        foods.forEach(element => {
            element.setAlpha(0);
            element.setX(-100);
            element.setScale(0.5);
            element.setDepth(70);
        })
    }

    //this is used to set different function to Timer in Cookware
    //will be changed
    //TIMO
    // onEvent(){
    //     pan.startBurn({timer: timer, time: 3000});
    // }

    //this function is only used for testing
    //TIMO
    testUpdate(){
        if(pan.isCooking || pan.isBurning){
            pan.draw();
        }
    }

    //This function contains code that might get used later to create proper functions
    //Will be deleted once useless
    //TIMO
    createStuff(){
        let test = this.add.image(300, 50, 'square');
        let selected = null;
        circle = null;
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

        scene.input.on('drag', function(pointer, gameObject, dragX, dragY){
            gameObject.x = dragX;
            gameObject.y = dragY;
            gameObject.setTint(0x44ff4);
            /*if(gameObject = circle){
                gameObject.body.setGravity(0);
                gameObject.body.setAllowGravity(false);
            }*/
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


