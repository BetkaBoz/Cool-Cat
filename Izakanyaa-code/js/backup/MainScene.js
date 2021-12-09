/** @type {import("./assets/lib/phaser")} */

import Timer from "./Timer.js";
import Customer from "./Customer.js";
import Cookware from "./Cookware.js";
import Food from "./Food.js";
import PreparationPlate from "./PreparationPlate.js";
import Ingredient from "./Ingredient.js";
import Button from "./Button.js";
import FoodSlots from "./FoodSlots.js";


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
let cookBookText;
let isOver = [false,false,false,false];
let slots;
let ingredientBar;

export default class MainScene extends Phaser.Scene {
    constructor() {
      super('MainScene');
        this.difficulty = null;
        this.score = null;
        this.level = null;
        this.delayComing= null;
        this.delayLeaving = null;
        this.customerCounter = null;
        this.customerCounterAll = null;
        this.bossTimer = null;

        this.firstPlaceIsEmpty = true;
        this.secondPlaceIsEmpty = true;
        this.thirdPlaceIsEmpty = true;

        this.isCookBookOpenable = true;
        this.isLevelOver = false;
        this.isBossDone = true;
        this.setUpGame();
    }
  
    preload() {
        //ENVIRONMENT
        this.load.image('bubble','./assets/images/bubble.png');
        this.load.spritesheet('customer', './assets/images/Customer_Spritesheet.png',  {frameWidth: 640, frameHeight: 640});
        this.load.image('Mclock','./assets/images/Morning Clock.png');
        this.load.image('Nclock','./assets/images/Noon Clock.png');
        this.load.image('Eclock','./assets/images/Evening Clock.png');
        this.load.image('NIclock','./assets/images/Night Clock.png');
        //this.load.image('background','./assets/images/Background.png');
        //this.load.image('background2','./assets/images/Background2.png');
        this.load.image('background3','./assets/images/Background3.png');
        this.load.image('curtains','./assets/images/Curtains.png');
        this.load.image('table','./assets/images/Table.png');
        //this.load.image('square','./assets/images/square.jpg');
        //this.load.image('circle','./assets/images/circle.jpg');

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
        this.load.spritesheet('Cookware', './assets/images/Cookware_Spritesheet.png',  {frameWidth: 390, frameHeight: 300});
        this.load.image('Nothing','./assets/images/kitchen/Nothing.png');
        this.load.image('Pot','./assets/images/kitchen/Pot.png');
        this.load.image('Fryer','./assets/images/kitchen/Fryer.png');
        this.load.image('Meat_Btn','./assets/images/kitchen/Btn_Meat.png');
        this.load.image('Meat_Bar','./assets/images/kitchen/Bar_Meat.png');
        this.load.image('Seasoning_Btn','./assets/images/kitchen/Btn_Seasoning.png');
        this.load.image('Seasoning_Bar','./assets/images/kitchen/Bar_Seasonings.png');
        this.load.image('Others_Btn','./assets/images/kitchen/Btn_Others.png');
        this.load.image('Others_Bar','./assets/images/kitchen/Bar_Others.png');
        this.load.image('Veggies_Btn','./assets/images/kitchen/Btn_Veggies.png');
        this.load.image('Veggies_Bar','./assets/images/kitchen/Bar_Veggies.png');

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

        this.cameras.main.fadeIn(2000);

        this.createEnvironment();

        //vytvorenie skupiny
        this.customerGroup = this.add.group({
            //key: 'customer',
            maxSize: 3,
        });

        //časovač na vytváranie zákazníkov
        timerCustomer = this.time.addEvent({ delay: this.delayComing * 1000, callback: this.setUpCustomer, callbackScope: this, repeat: this.customerCounter -1 });
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
        /*
        for (let i = 0; i < this.customerGroup.getChildren().length; i++) {
            //console.log(this.customerGroup.getChildren()[i]) ;
            this.customerGroup.getChildren()[i].moveCustomer();
            this.customerGroup.getChildren()[i].walkOff();

            if (this.customerGroup.getChildren().length > 0 ){
                if ( this.customerGroup.getChildren()[i].isStanding){
                    this.customerGroup.getChildren()[i].draw();
                    //console.log(this.customerGroup.getChildren()[i].timer.getOverallProgress());
                }
            }
        }*/
        this.customerGroup.getChildren().forEach(function(sprite) {
            sprite.moveCustomer();
            sprite.walkOff();

            //if (this.customerGroup.getChildren().length > 0 ){
                if (sprite.isStanding){
                    sprite.draw();
                    //console.log(this.customerGroup.getChildren()[i].timer.getOverallProgress());
                }
           // }

        }, this);

        this.changeClock();
        this.checkIfEnd();
    }
    setUpGame(){
        //nastaví hodnoty podľa local storage hodnoty
        console.log("--------------------")
        console.log("SETTING UP GAME")
        if (window.localStorage.getItem("difficulty")){
            this.difficulty = window.localStorage.getItem("difficulty");
            console.log("FOUND DIFFICULTY: " + this.difficulty)
        }
        else {
            this.difficulty = "EASY"
            console.log("NO DIFF. DETECTED, GAME IS ON DIFF.: " + this.difficulty)
        }

        if (window.localStorage.getItem("level")){
            this.level = window.localStorage.getItem("level");
            console.log("FOUND LEVEL: " + this.level)
        }
        else {
            this.level = 3;
            console.log("NO LEVEL DETECTED, GAME IS ON LEVEL: " + this.level)
        }

        if (window.localStorage.getItem("score")){
            this.score = window.localStorage.getItem("score");
            console.log("FOUND SCORE: " + this.score)
        }
        else {
            this.score = 0;
            console.log("NO SCORE DETECTED, GAME IS ON SCORE: " + this.score)
        }
        this.changeDelay();
        console.log("CUSTOMER DELAY IS: " + this.delayComing);

        this.changeCustomerCounter();
        console.log("THE NUMBER OF ALL CUSTOMERS IS: " + this.customerCounterAll);

        console.log("SETUP IS COMPLETED")
        console.log("--------------------")

    }
    createEnvironment(){
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
        clock= this.add.image(width/9,height/10,"Mclock");
        //clock.setOrigin(0,0);
        clock.setScale(1.1);

        //vytvorenie score textu
        scoreText = this.add.text(width/2.8, 5, 'SCORE: ' + this.score, { font: 'bold 32px Arial', fill: '#000000'});
        scoreText.setShadow(0, 0, 'rgb(255,255,255)', 30);

        //vytvorenie konecneho textu
        endText = this.add.text(width/8, height/2, '', { font: 'bold 100px Arial', fill: '#ff0000'});
        endText.setShadow(0, 0, 'rgb(255,255,255)', 30);
        endText.setDepth(500);
        endText.visible = false;

        this.changeEnvironment();

    }
    cantOpenCookBook(){

        if (!this.isCookBookOpenable){
            cookBookText = this.add.text(width/8, height/1.7, 'COOKBOOK IS DISABLED ON HARD DIFFICULTY!', { font: 'bold 20px Arial', fill: '#000000'});
            cookBookText.setShadow(0, 0, 'rgb(255,255,255)', 30);
            cookBookText.setDepth(30);
            this.time.addEvent({ delay: 4000, callback: this.setTextInvisible, callbackScope: this, loop: false });
        }
    }
    setTextInvisible(){
        cookBookText.visible = false;
        return 0;
    }
    changeEnvironment(){
        //zmena prostredia podľa levelu
        if (this.level === 1){

        }
        else if  (this.level === 2){
            /*
            let lantern =  this.add.sprite(0, 0, 'curtains');
            lantern.setScale(2);
            // change origin to the top-left of the sprite
            lantern.setOrigin(0,0);
            */

        }
        else if  (this.level === 3){
            /*
            let lantern =  this.add.sprite(0, 0, 'curtains');
            lantern.setScale(2);
            // change origin to the top-left of the sprite
            lantern.setOrigin(0,0);

            let luckyCat =  this.add.sprite(0, 0, 'curtains');
            luckyCat.setScale(2);
            // change origin to the top-left of the sprite
            luckyCat.setOrigin(0,0);

            let bonsai =  this.add.sprite(0, 0, 'curtains');
            bonsai.setScale(2);
            // change origin to the top-left of the sprite
            bonsai.setOrigin(0,0);
            */

        }
    }
    setUpCustomer(){
        this.customerCounter--;
        console.log(this.customerCounter)
        //better riešenie, ify na zabranie miesta



        //check if it is last boss
        if (this.customerCounter === 0 && this.level === 3){
            //FINAL BOSS TIME
            //this.cameras.main.shake(40);
            this.isBossDone = false;
            this.checkPlaceForBoss();
        }
        else {
            if (this.firstPlaceIsEmpty){
                //stred okna
                targetX = width/1.3;
                place = 1;
                this.firstPlaceIsEmpty = false;
            }
            else if (this.secondPlaceIsEmpty){
                targetX = width/2;
                place = 2;
                this.secondPlaceIsEmpty = false;
            }
            else if (this.thirdPlaceIsEmpty){
                targetX = width/5;
                place = 3;
                this.thirdPlaceIsEmpty = false;
            }
            //viac ako traja BY nemali nikdy byť ale nikdy nevieš
            else {
                targetX = width/1.5;
            }
            //this.time.addEvent({ delay: this.delay * 1000, callback: this.customerIsDone, callbackScope: this, loop: false });
            this.createCustomer(place,targetX,width);
        }


    }
    createFinalBoss(targetX, width){
        let customer = new Customer({scene: this, image: "customer",place: 2 ,targetX: targetX, edgeX: width, x: -100, y:205, bubble: "bubble"});
        customer.setScale(0.6,0.3);
        customer.order = "Ultimate_secret_bowl";
        customer.order_image.setTexture(customer.order);
        customer.bubble.setScale(0.8);
        customer.setOrderScale();
        customer.delay = 3;
        //customer.gotFood = true;
        customer.customerScore = 500;
        this.add.existing(customer);
        this.customerGroup.add(customer);
        console.log( customer.order );
    }

    createCustomer(place,targetX,width){
        let customer = new Customer({scene: this, image: "customer",place: place ,targetX: targetX, edgeX: width, x: -100, y:205, bubble: "bubble"});
        customer.setScale(0.3);
        //customer.order = "Ebi_Furai";
        //customer.order_image.setTexture(customer.order);
        customer.setOrderScale();
        this.add.existing(customer);
        this.customerGroup.add(customer);
        console.log( customer.order );
    }

    changeDelay(){
        //delay ako často budú chodiť zákazníci
        if (this.difficulty === "EASY"){
            this.delayComing = 1;// 10
            this.delayLeaving = 5;// 25
        }
        else if  (this.difficulty === "MEDIUM"){
            this.delayComing = 8;//8
            this.delayLeaving = 20;// 20

        }
        else if  (this.difficulty === "HARD"){
            this.delayComing = 6;//6
            this.delayLeaving = 15;// 15
            this.isCookBookOpenable = false;//nezobrazia sa recepty
        }
    }

    changeCustomerCounter(){
        //počet zákazníkov v každom leveli
        if (this.level === 1){
            this.customerCounter = 2;// 12
        }
        else if  (this.level === 2){
            this.customerCounter = 16;//16
        }
        else if  (this.level === 3){
            this.customerCounter = 4;//20
        }
        this.customerCounterAll = this.customerCounter;
    }

    checkPlaceForBoss(){
        if (!this.secondPlaceIsEmpty || this.customerGroup.countActive(true)>=1){
            this.bossTimer = this.time.addEvent({ delay: 1000, callback: this.checkPlaceForBoss , callbackScope: this, loop: true });
        }
        else {
            if (!this.isBossDone){
                this.createFinalBoss(width/2,width);
            }
            //this.bossTimer.paused =true;
            this.isBossDone = true;


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
        if (this.customerGroup.countActive(true)<1 && this.customerCounter ===0 && this.isLevelOver === false && this.isBossDone) {
            //console.log("KONIEC")
            this.isLevelOver = true;
            endText.visible = true;
            if (this.score >= 1000){
                console.log("YOU WON!")
                endText.setText("YOU WON!");

                //this.time.addEvent({delay: 5000, callback: this.scene.stop, callbackScope: this, loop: false });
            }
            else {
                console.log("YOU LOST")
                endText.setText("YOU LOST");
            }
            this.cameras.main.fade(5000);
        }
    }






    //function used only for testing
    //TIMO
    testingCreate(){
        scene = this;
        let panImg = scene.add.image(0, 0, "Fryer");
        panImg.setScale(0.45);
        let potImg = scene.add.image(0, 0, "Pot");
        potImg.setScale(0.45);
        timer = []
        timer.push(new Timer({scene: scene, x: 0, y: 0}));
        pan = new Cookware({scene: scene, x: 75, y:height-50, objectImg: panImg, type: "fry", timer: timer[timer.length-1]});
        timer.push(new Timer({scene: scene, x: 0, y: 0}));
        pot = new Cookware({scene: scene, x: (pan.object.width/2)+10, y:height-100, objectImg: potImg, type: "bake", timer: timer[timer.length-1]});
        prepPlate = new PreparationPlate({scene: scene, x: width/2, y:height-50, plateImg:"Plate", ingredients:[], foods:foods});
        prepPlate.plate.setScale(0.5);
        prepPlate.width = prepPlate.width/2;
        prepPlate.height = prepPlate.height/2;
        prepPlate.setHit(prepPlate);
        ingredientBar = [];
        ingredientBar.push(scene.add.group({maxSize:7}));
        ingredientBar.push(scene.add.group({maxSize:4}));
        ingredientBar.push(scene.add.group({maxSize:5}));
        ingredientBar.push(scene.add.group({maxSize:6}));
        //TEMP
        this.addButtons();
        this.addFoods();
        this.createFoodSlots();
        this.setInteractivity();
    }

    createFoodSlots(){
        let foodSlot;
        slots = scene.add.group({maxSize:3});
        foodSlot = new FoodSlots({scene:scene, x:width/8, y: height/1.55, slotImg:'Plate'});
        slots.add(foodSlot);
        foodSlot = new FoodSlots({scene:scene, x:width/4, y: height/1.55, slotImg:'Plate'});
        slots.add(foodSlot);
        foodSlot = new FoodSlots({scene:scene, x:(width/8)*3, y: height/1.55, slotImg:'Plate'});
        slots.add(foodSlot);
    }

    hideButtons(){
        for(let i = 0; i<4;i++){//width-76
            if(!isOver[i]){
                ingredientBar[i].getChildren()[0].setNewPos(width+152);     
                ingredientBar[i].getChildren()[0].setSpeed(12);  
                for(let j = 1; j<ingredientBar[i].getLength();j++){
                    ingredientBar[i].getChildren()[j].setNewPos(width-76);        
                    ingredientBar[i].getChildren()[j].setSpeed(12);                
                }
            }else{
                for(let j = 0; j<ingredientBar[i].getLength();j++){
                    ingredientBar[i].getChildren()[j].setNewPos(ingredientBar[i].getChildren()[j].originalX);  
                    if(j >0){
                        ingredientBar[i].getChildren()[j].setSpeed(13-j);        
                    }                         
                }                
            }
        }
    }

    moveButtons(){
        for(let i =0; i<4;i++){
            for(let j = 0; j<ingredientBar[i].getLength();j++){
                ingredientBar[i].getChildren()[j].move();                   
            }     
        }   
    }

    addButtons(){
        let button

        button = new Button({scene: scene, x: width-76,y: 65,img: 'Meat_Btn', name: "Meat Button",depth:27});
        button.setScale(0.5,0.4);
        button.addFunction("click",function(){
            isOver[0] = true;
        });
        button.addFunction("leave",function(){
            isOver[0] = false;
        });

        button = new Button({scene: scene, x: ((width/4)*3)-20,y: 65,img: 'Meat_Bar', name: "Meat Bar",depth:26});
        ingredientBar[0].add(button);
        button.setScale(0.4);
        button.addFunction("hover",function(){
            isOver[0] = true;
        });
        button.addFunction("leave",function(){
            isOver[0] = false;
        });

        button = new Button({scene: scene, x: width-76,y: 185,img: 'Veggies_Btn', name: "Veggies Button",depth:27});
        button.setScale(0.5,0.4);
        button.addFunction("click",function(){
            isOver[1] = true;
        });
        button.addFunction("leave",function(){
            isOver[1] = false;
        });

        button = new Button({scene: scene, x: ((width/4)*3)-20,y: 185,img: 'Veggies_Bar', name: "Veggies Bar",depth:26});
        button.setScale(0.4);
        ingredientBar[1].add(button);
        button.addFunction("hover",function(){
            isOver[1] = true;
        });
        button.addFunction("leave",function(){
            isOver[1] = false;
        });

        button = new Button({scene: scene, x: width-76,y: 305,img: 'Seasoning_Btn', name: "Seasoning Button",depth:27});
        button.setScale(0.5,0.4);
        button.addFunction("click",function(){
            isOver[2] = true;
        });
        button.addFunction("leave",function(){
            isOver[2] = false;
        });

        button = new Button({scene: scene, x: ((width/4)*3)-20,y: 305,img: 'Seasoning_Bar', name: "Seasoning Bar",depth:26});
        button.setScale(0.4);
        ingredientBar[2].add(button);
        button.addFunction("hover",function(){
            isOver[2] = true;
        });
        button.addFunction("leave",function(){
            isOver[2] = false;
        });

        button = new Button({scene: scene, x: width-76,y: 425,img: 'Others_Btn', name: "Other Button",depth:27});
        button.setScale(0.5,0.4);
        button.addFunction("click",function(){
            isOver[3] = true;
        });
        button.addFunction("leave",function(){
            isOver[3] = false;
        });

        button = new Button({scene: scene, x: ((width/4)*3)-20,y: 425,img: 'Others_Bar', name: "Other Bar",depth:26});
        button.setScale(0.4);
        ingredientBar[3].add(button);
        button.addFunction("hover",function(){
            isOver[3] = true;
        });
        button.addFunction("leave",function(){
            isOver[3] = false;
        });

        //meat
        button = new Button({scene: scene, x: 710,y: 65,img: 'square', name: "Mackerel Button",depth:26});
        ingredientBar[0].add(button);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Mackerel", name: "mackerel"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
            button.setAlpha(0.3);
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
            button.setAlpha(0);
        });
        button = new Button({scene: scene, x: 800,y: 65,img: 'square', name: "Octopus Button",depth:26});
        ingredientBar[0].add(button);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Octopus", name: "octopus"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
            button.setAlpha(0.3);
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
            button.setAlpha(0);
        });
        button = new Button({scene: scene, x: 880,y: 65,img: 'square', name: "Salmon Button",depth:26});
        ingredientBar[0].add(button);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Salmon", name: "salmon"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
            button.setAlpha(0.3);
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
            button.setAlpha(0);
        });
        button = new Button({scene: scene, x: 960,y: 65,img: 'square', name: "Shrimp Button",depth:26});
        ingredientBar[0].add(button);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Shrimp", name: "shrimp"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
            button.setAlpha(0.3);
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
            button.setAlpha(0);
        });
        button = new Button({scene: scene, x: 1025,y: 65,img: 'square', name: "Chopped Makrel Button",depth:26});
        ingredientBar[0].add(button);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Squid", name: "squid"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
            button.setAlpha(0.3);
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
            button.setAlpha(0);
        });
        button = new Button({scene: scene, x: 1100,y: 65,img: 'square', name: "Squid Button",depth:26});
        ingredientBar[0].add(button);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Squid", name: "squid"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
            button.setAlpha(0.3);
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
            button.setAlpha(0);
        });

        //Seasoning
        button = new Button({scene: scene, x: 740,y: 305,img: 'square', name: "Mayonnaise Button",depth:26});
        ingredientBar[2].add(button);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Mayo", name: "mayo"});
        });
        button.addFunction("hover",function (){
            isOver[2] = true;
            button.setAlpha(0.3);
        });
        button.addFunction("leave",function (){
            isOver[2] = false;
            button.setAlpha(0);
        });
        button = new Button({scene: scene, x: 840,y: 305,img: 'square', name: "Salt Button",depth:26});
        ingredientBar[2].add(button);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Salt", name: "salt"});
        });
        button.addFunction("hover",function (){
            isOver[2] = true;
            button.setAlpha(0.3);
        });
        button.addFunction("leave",function (){
            isOver[2] = false;
            button.setAlpha(0);
        });
        button = new Button({scene: scene, x: 940,y: 305,img: 'square', name: "Seaweed Button",depth:26});
        ingredientBar[2].add(button);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Seaweed", name: "seaweed"});
        });
        button.addFunction("hover",function (){
            isOver[2] = true;
            button.setAlpha(0.3);
        });
        button.addFunction("leave",function (){
            isOver[2] = false;
            button.setAlpha(0);
        });
        button = new Button({scene: scene, x: 1061.5,y: 305,img: 'square', name: "Soy sauce Button",depth:26});
        ingredientBar[2].add(button);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Soy_sauce", name: "soy sauce"});
        });
        button.addFunction("hover",function (){
            isOver[2] = true;
            button.setAlpha(0.3);
        });
        button.addFunction("leave",function (){
            isOver[2] = false;
            button.setAlpha(0);
        });
        //Other 3
        button = new Button({scene: scene, x: 700,y: 425,img: 'square', name: "Anko Button",depth:26});
        ingredientBar[3].add(button);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Anko", name: "anko"});
        });
        button.addFunction("hover",function (){
            isOver[2] = true;
            button.setAlpha(0.3);
        });
        button.addFunction("leave",function (){
            isOver[2] = false;
            button.setAlpha(0);
        });
        button = new Button({scene: scene, x: 790,y: 425,img: 'square', name: "Liqiud dough Button",depth:26});
        ingredientBar[3].add(button);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Liqiud_dough", name: "liqiud dough"});
        });
        button.addFunction("hover",function (){
            isOver[3] = true;
            button.setAlpha(0.3);
        });
        button.addFunction("leave",function (){
            isOver[3] = false;
            button.setAlpha(0);
        });
        button = new Button({scene: scene, x: 900,y: 425,img: 'square', name: "Panko Button",depth:26});
        ingredientBar[3].add(button);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Panko", name: "panko"});
        });
        button.addFunction("hover",function (){
            isOver[3] = true;
            button.setAlpha(0);
        });
        button.addFunction("leave",function (){
            isOver[3] = false;
            button.setAlpha(0);
        });
        button = new Button({scene: scene, x: 1010,y: 425,img: 'square', name: "Rice Button",depth:26});
        ingredientBar[3].add(button);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Rice", name: "rice"});
        });
        button.addFunction("hover",function (){
            isOver[3] = true;
            button.setAlpha(0.3);
        });
        button.addFunction("leave",function (){
            isOver[3] = false;
            button.setAlpha(0);
        });
        button = new Button({scene: scene, x: 1110,y: 425,img: 'square', name: "Tenkasu Button",depth:26});
        ingredientBar[3].add(button);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Tenkasu", name: "tenkasu"});
        });
        button.addFunction("hover",function (){
            isOver[3] = true;
            button.setAlpha(0.3);
        });
        button.addFunction("leave",function (){
            isOver[3] = false;
            button.setAlpha(0);
        });

        //Vegetables 1
        button = new Button({scene: scene, x: 750,y: 185,img: 'square', name: "Cabbage Button",depth:26});
        ingredientBar[1].add(button);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Cabbage", name: "cabbage"});
        });
        button.addFunction("hover",function (){
            isOver[1] = true;
            button.setAlpha(0.3);
        });
        button.addFunction("leave",function (){
            isOver[1] = false;
            button.setAlpha(0);
        });
        button = new Button({scene: scene, x: 890,y: 185,img: 'square', name: "Daikon Button",depth:26});
        ingredientBar[1].add(button);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Daikon_Chopped", name: "daikon"});
        });
        button.addFunction("hover",function (){
            isOver[1] = true;
            button.setAlpha(0.3);
        });
        button.addFunction("leave",function (){
            isOver[1] = false;
            button.setAlpha(0);
        });
        button = new Button({scene: scene, x: 1030,y: 185,img: 'square', name: "Spring onion Button",depth:26});
        ingredientBar[1].add(button);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Spring_onion", name: "spring onions"});
        });
        button.addFunction("hover",function (){
            isOver[1] = true;
            button.setAlpha(0.3);
        });
        button.addFunction("leave",function (){
            isOver[1] = false;
            button.setAlpha(0);
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
                pot.checkOverlap(prepPlate);
            }
            prepPlate.x = prepPlate.plate.x;
            prepPlate.y = prepPlate.plate.y;
        })

        pan.object.on('pointerdown',function (){
            if(!pan.isCooking && pan.isBurning){
                let found = foods.find(element => element.name == pan.cookedFood);
                if(found){
                    let alreadyFilled = false;
                    for(let i = 0; i < 3;i++){
                        if(!slots.getChildren()[i].isFilled && !alreadyFilled){
                            let food = new Food({scene:scene, x:0, y:0, image:found.name, ingredients:[], cookMethod:null, prepTime:null}) ;//found
                            console.log(food.name);
                            slots.getChildren()[i].addFood(food);
                            slots.getChildren()[i].makeInteractive(function (){
                                console.log("boop");
                                slots.getChildren()[i].food.x = slots.getChildren()[i].x;
                                slots.getChildren()[i].food.y = slots.getChildren()[i].y;
                            });
                            alreadyFilled = true;
                        }
                    }
                }else {
                    console.log(pan.cookedFood);
                }
                pan.isBurning = false;
                pan.isCooking = false;
                pan.timer.timerControl("stop");
            }
        })
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
        food.setFoodName("Cabbage_Salad");
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
            food.setFoodName("Daikon_Salad");
            foods.push(food);
            if(level = 3){
                ingredients = ['shrimp','panko','liquid dough'];
                food = new Food({scene:scene, x:100, y:100, image: 'Ebi Furai', ingredients: ingredients, cookMethod: "fry"});
                food.setFoodName("Ebi_Furai");
                foods.push(food);

                ingredients = ['octopus','tenkasu','liquid dough','spring onions', 'mayo'];
                food = new Food({scene:scene, x:100, y:100, image: 'Takoyaki', ingredients: ingredients, cookMethod: "fry"});
                food.setFoodName("Takoyaki");
                foods.push(food);

                //TODO: Figure how to actually make this!!!
                ingredients = ['UGHHH'];
                food = new Food({scene:scene, x:100, y:100, image: 'square', ingredients: ingredients, cookMethod: "frier"});
                food.setFoodName("Ultimate_Secrete_Bowl");
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
        this.hideButtons();
        this.moveButtons();
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


