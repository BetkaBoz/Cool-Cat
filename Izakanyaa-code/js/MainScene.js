/** @type {import("./assets/lib/phaser")} */

import Timer from "./Timer.js";
import Customer from "./Customer.js";
import Cookware from "./Cookware.js";
import Food from "./Food.js";
import PreparationPlate from "./PreparationPlate.js";
import Ingredient from "./Ingredient.js";
import Button from "./Button.js";
import FoodSlots from "./FoodSlots.js";
import Decoration from "./Decoration.js";

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

let summary;
let summaryText10;
let summaryText20;
let summaryText30;
let summaryText40;
let summaryText50;
let summaryText01;
let summaryText02;
let summaryText03;
let summaryText04;
let summaryText05;
let summaryTextALL;
let summaryArray = [];
let rectangle;
let bigChungusSummary;
let bigChungusSummaryText;



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

        this.veryGoodCustomers = 0;
        this.goodCustomers = 0;
        this.neutralCustomers = 0;
        this.badCustomers = 0;
        this.veryBadCustomers = 0;
        this.bossScore = 0;





        this.setUpGame();
    }
  
    preload() {
        //ENVIRONMENT
        this.load.image('Bubble','./assets/images/bubble.png');
        this.load.spritesheet('Customer', './assets/images/Customer_Spritesheet.png',  {frameWidth: 640, frameHeight: 640});
        this.load.image('Mclock','./assets/images/Morning Clock.png');
        this.load.image('Nclock','./assets/images/Noon Clock.png');
        this.load.image('Eclock','./assets/images/Evening Clock.png');
        this.load.image('NIclock','./assets/images/Night Clock.png');
        this.load.image('Customer_BG','./assets/images/BG_Costumer.png');
        this.load.image('Curtains','./assets/images/Curtains.png');
        this.load.image('Table','./assets/images/Table.png');
        this.load.image('YouLost','./assets/images/YouLost.png');
        this.load.image('YouWon','./assets/images/YouWon.png');
        this.load.spritesheet('Bonsai','./assets/images/Bonsai_Spritesheet.png',{frameWidth: 256, frameHeight: 220});

        this.load.image('Summary_screen','./assets/images/Summary_screen.png');
        this.load.image('VeryGood','./assets/images/React00.png');
        this.load.image('Good','./assets/images/React01.png');
        this.load.image('Neutral','./assets/images/React02.png');
        this.load.image('Bad','./assets/images/React03.png');
        this.load.image('VeryBad','./assets/images/React04.png');
        this.load.image('Sum','./assets/images/Rectangle.png');
        this.load.image('BigChungusSummary','./assets/images/BigChungus.png');

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
        this.load.image('Mackerel_Sliced','./assets/images/ingredients/Meat/Mackerel meat.png');
        this.load.image('Octopus','./assets/images/ingredients/Meat/Octopus.png');
        this.load.image('Salmon','./assets/images/ingredients/Meat/Salmon meat.png');
        this.load.image('Shrimp','./assets/images/ingredients/Meat/Shrimp.png');
        this.load.image('Squid','./assets/images/ingredients/Meat/Squid.png');
        this.load.image('Liquid_Dough','./assets/images/ingredients/Other/Liquid dough bowl.png');
        this.load.image('Panko','./assets/images/ingredients/Other/Panko Bowl.png');
        this.load.image('Rice','./assets/images/ingredients/Other/Rice Bowl.png');
        this.load.image('Tenkasu','./assets/images/ingredients/Other/Tenkasu Bowl lighter.png');
        this.load.image('Anko','./assets/images/ingredients/Seasonings/Anko.png');
        this.load.image('Mayo','./assets/images/ingredients/Seasonings/Mayonnaise.png');
        this.load.image('Salt','./assets/images/ingredients/Seasonings/Salt shaker.png');
        this.load.image('Seaweed','./assets/images/ingredients/Seasonings/Seaweed plate.png');
        this.load.image('Soy_Sauce','./assets/images/ingredients/Seasonings/Soy sauce.png');
        this.load.image('Cabbage','./assets/images/ingredients/Vegetables/Cabbage chopped.png');
        this.load.image('Daikon_Chopped','./assets/images/ingredients/Vegetables/Daikon chopped.png');
        this.load.image('Spring_Onion','./assets/images/ingredients/Vegetables/Spring onion chopped.png');

        //KITCHEN
        this.load.image('Kitchen_Table','./assets/images/kitchen/Background_Kitchen_Table.png');
        this.load.image('Kitchen_BG','./assets/images/kitchen/Background_Kitchen_Wall.png');
        this.load.image('Plate','./assets/images/kitchen/Plate.png');
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

        // ak sú traja zákazníci na scéne zastav timer na generovanie zákazníkov
        if (this.customerGroup.isFull()){
            timerCustomer.paused = true;
        }
        else {
            timerCustomer.paused = false;
        }
        //hýbanie so zákazníkmi
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
            this.score = Number(window.localStorage.getItem("score"));
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
        let bg = this.add.sprite(0, 0, 'Customer_BG');
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
        let table = this.add.sprite(0, height/6 , 'Table');
        table.setScale(2);
        table.setDepth(25);
        table.setOrigin(0,0);

        //vytvorenie hodín
        clock= this.add.image(10,10,"Mclock");
        clock.setOrigin(0,0);
        clock.setScale(1.25);


        //vytvorenie score textu
        scoreText = this.add.text(199, 5, 'SCORE: ' + this.score, { font: 'bold 32px Arial', fill: '#000000'});
        scoreText.setShadow(0, 0, 'rgb(255,255,255)', 30);

        //vytvorenie konecneho textu
        endText= this.add.image(width/2, (height/2)-50,"YouWon")
        endText.setScale(1.4)
        endText.setDepth(500);
        endText.visible = false;

        let bonsai = new Decoration({scene:this,image: "Bonsai",x: 500,y: 500});
        bonsai.setDepth(5000);
        bonsai.setScale(5)
        this.add.existing(bonsai);
        this.changeEnvironment();

        //sumár
        summary = this.add.image(0, 0,"Summary_screen")
        summary.setOrigin(0,0);
        summary.setDepth(1000)
        summary.visible = false;


        rectangle = this.add.image(869,490,"Sum");
        //lava strana
        summaryText10 = this.add.text(500, 150, '150    X ', { font: 'bold 40px Arial', fill: '#86d3ff'});
        summaryText20 = this.add.text(500, 220, '100    X ', { font: 'bold 40px Arial', fill: '#86d3ff'});
        summaryText30 = this.add.text(500, 290, '50      X ', { font: 'bold 40px Arial', fill: '#86d3ff'});
        summaryText40 = this.add.text(500, 360, '0        X ', { font: 'bold 40px Arial', fill: '#86d3ff'});
        summaryText50 = this.add.text(500, 430, '-50     X ', { font: 'bold 40px Arial', fill: '#86d3ff'});
        //prava strana
        summaryText01 = this.add.text(700, 150, '', { font: 'bold 40px Arial', fill: '#86d3ff'});
        summaryText02 = this.add.text(700, 220, '', { font: 'bold 40px Arial', fill: '#86d3ff'});
        summaryText03 = this.add.text(700, 290, '', { font: 'bold 40px Arial', fill: '#86d3ff'});
        summaryText04 = this.add.text(700, 360, '', { font: 'bold 40px Arial', fill: '#86d3ff'});
        summaryText05 = this.add.text(700, 430, '', { font: 'bold 40px Arial', fill: '#86d3ff'});

        summaryTextALL = this.add.text(675, 500, '', { font: 'bold 48px Arial', fill: '#86d3ff'});

        summaryArray.push(summaryText10,summaryText20,summaryText30,summaryText40,summaryText50,
                        summaryText01,summaryText02,summaryText03,summaryText04,summaryText05,
                        rectangle,summaryTextALL);

        for (let i = 0; i<summaryArray.length;i++){
            summaryArray[i].setDepth(1001);
            summaryArray[i].visible = false;
        }


    }
    cantOpenCookBook(){
        if (!this.isCookBookOpenable){
            cookBookText = this.add.text(width/8, height/1.7, 'COOKBOOK IS DISABLED ON HARD DIFFICULTY!', { font: 'bold 20px Arial', fill: '#000000'});
            cookBookText.setShadow(0, 0, 'rgb(255,255,255)', 30);
            cookBookText.setDepth(30);
            this.time.addEvent({ delay: 4000, callback: this.setTextInvisible, callbackScope: this, loop: false });
        }
        else {
            //otvor cookbook
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
            bigChungusSummary = this.add.image(1000,300,"BigChungusSummary")
            bigChungusSummary.setScale(0.5)
            bigChungusSummaryText =  this.add.text(935, 200, '' , { font: 'bold 40px Arial', fill: '#86d3ff'});
            summaryArray.push(bigChungusSummary,bigChungusSummaryText);

        }
    }
    setUpCustomer(){
        this.customerCounter--;
        console.log(this.customerCounter)

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
                targetX = width/2.5;
                place = 1;
                this.firstPlaceIsEmpty = false;
            }
            else if (this.secondPlaceIsEmpty){
                targetX = width/3.8;
                place = 2;
                this.secondPlaceIsEmpty = false;
            }
            else if (this.thirdPlaceIsEmpty){
                targetX = width/8;
                place = 3;
                this.thirdPlaceIsEmpty = false;
            }
            //viac ako traja BY nemali nikdy byť ale nikdy nevieš
            else {
                targetX = width/1.5;
            }
            this.createCustomer(place,targetX,width/2);
        }
    }
    createFinalBoss(targetX, width){
        let customer = new Customer({scene: this, image: "Customer",place: 2 ,targetX: targetX, edgeX: width, x: -100, y:205});
        customer.isBoss = true;
        customer.setScale(0.6,0.3);
        customer.order = "Ultimate_secret_bowl";
        customer.order_image.setTexture(customer.order);
        customer.bubble.setScale(0.8);
        customer.setOrderScale();
        customer.delay = 1;
        customer.gotFood = true;
        customer.customerScore = 500;//500
        this.add.existing(customer);
        this.customerGroup.add(customer);
        console.log( customer.order );
    }
    createCustomer(place,targetX,width){
        let customer = new Customer({scene: this, image: "Customer",place: place ,targetX: targetX, edgeX: width, x: -100, y:205});
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
            this.delayLeaving = 1;// 25
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
                this.createFinalBoss(width/3.8,width/1.6);
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
                //console.log("YOU WON!")
                endText.setTexture('YouWon')
                //this.time.addEvent({delay: 5000, callback: this.scene.stop, callbackScope: this, loop: false });
            }
            else {
                //console.log("YOU LOST")
                endText.setTexture('YouLost')
            }
            this.cameras.main.fade(3000);
            this.time.addEvent({ delay: 4000, callback: this.makeSummary, callbackScope: this, loop: false });
        }
    }

    makeSummary(){
        console.log("SUMMARY");
        this.cameras.main.fadeIn(2000);
        summary.visible= true;
        console.log( this.veryGoodCustomers);
        console.log( this.goodCustomers);
        console.log( this.neutralCustomers);
        console.log( this.badCustomers);
        console.log( this.veryBadCustomers);
        for (let i = 0; i<summaryArray.length;i++){
            summaryArray[i].visible = true;
        }
        summaryText01.setText(this.veryGoodCustomers+ '    =   '+this.veryGoodCustomers * (150));
        summaryText02.setText(this.goodCustomers+ '    =   '+this.goodCustomers * (100));
        summaryText03.setText(this.neutralCustomers+ '    =   '+this.neutralCustomers * (50));
        summaryText04.setText(this.badCustomers+ '    =   '+0);
        summaryText05.setText(this.veryBadCustomers+ '    =   '+this.veryBadCustomers * (-50));
        summaryTextALL.setText('           '+this.score);
        if (this.level ===3){
            bigChungusSummaryText.setText('+'+ this.bossScore);
        }

    }





    //function used only for testing
    //TIMO
    testingCreate(){
        scene = this;
        let kitchenBG
        // kitchenBG = scene.add.image(width/2,0,"Kitchen_BG");
        // kitchenBG.setOrigin(0,0);
        // kitchenBG.setScale(1.9);
        // kitchenBG.setDepth(25);
        kitchenBG = scene.add.image(width/2,59,"Kitchen_Table");
        kitchenBG.setOrigin(0,0);
        kitchenBG.setScale(1.7);
        kitchenBG.setDepth(25);
        let panImg = scene.add.sprite(0, 0, "Fryer");
        //panImg.setScale(0.45);
        let potImg = scene.add.sprite(0, 0, "Pot");
        timer = []
        timer.push(new Timer({scene: scene, x: 0, y: 0}));
        timer[timer.length-1].setDepth(27)
        pan = new Cookware({scene: scene, x: 1070, y:335, objectImg: panImg, type: "fry", timer: timer[timer.length-1]});
        timer.push(new Timer({scene: scene, x: 0, y: 0}));
        pot = new Cookware({scene: scene, x: 874, y:230, objectImg: potImg , type: "bake", timer: timer[timer.length-1]});
        prepPlate = new PreparationPlate({scene: scene, x: 825, y:382, plateImg:"Plate", ingredients:[], foods:foods});
        prepPlate.setHit(prepPlate);
        prepPlate.setDepth(25);
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
                ingredientBar[i].getChildren()[0].setNewPos(width+185);     
                ingredientBar[i].getChildren()[0].setSpeed(12);  
                for(let j = 1; j<ingredientBar[i].getLength();j++){
                    ingredientBar[i].getChildren()[j].setNewPos(width-55);        
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

        button = new Button({scene: scene, x: width-55,y: 65,img: 'Meat_Btn', name: "Meat Button",depth:27});
        button.setScale(0.4,0.3);
        button.addFunction("click",function(){
            isOver[0] = true;
            isOver[1] = false;
            isOver[2] = false;
            isOver[3] = false;
        });
        //button.addFunction("leave",function(){
        //    isOver[0] = false;
        //});
        button = new Button({scene: scene, x: width+152,y: 65,img: 'Meat_Bar', name: "Meat Bar",depth:26, originalX:970});
        ingredientBar[0].add(button);
        button.setScale(0.4);
        button.addFunction("hover",function(){
            isOver[0] = true;
        });
        button.addFunction("leave",function(){
            isOver[0] = false;
        });

        button = new Button({scene: scene, x: width-55,y: 185,img: 'Veggies_Btn', name: "Veggies Button",depth:27});
        button.setScale(0.4,0.3);
        button.addFunction("click",function(){
            isOver[0] = false;
            isOver[1] = true;
            isOver[2] = false;
            isOver[3] = false;
        });
        //button.addFunction("leave",function(){
        //    isOver[1] = false;
        //});

        button = new Button({scene: scene, x: width+152,y: 185,img: 'Veggies_Bar', name: "Veggies Bar",depth:26, originalX:970});
        button.setScale(0.4);
        ingredientBar[1].add(button);
        button.addFunction("hover",function(){
            isOver[1] = true;
        });
        button.addFunction("leave",function(){
            isOver[1] = false;
        });

        button = new Button({scene: scene, x: width-55,y: 305,img: 'Seasoning_Btn', name: "Seasoning Button",depth:27});
        button.setScale(0.4,0.3);
        button.addFunction("click",function(){
            isOver[0] = false;
            isOver[1] = false;
            isOver[2] = true;
            isOver[3] = false;
        });
        //button.addFunction("leave",function(){
        //    isOver[2] = false;
        //});

        button = new Button({scene: scene, x: width+152,y: 305,img: 'Seasoning_Bar', name: "Seasoning Bar",depth:26, originalX:970});
        button.setScale(0.4);
        ingredientBar[2].add(button);
        button.addFunction("hover",function(){
            isOver[2] = true;
        });
        button.addFunction("leave",function(){
            isOver[2] = false;
        });

        button = new Button({scene: scene, x: width-55,y: 425,img: 'Others_Btn', name: "Other Button",depth:27});
        button.setScale(0.4,0.3);
        button.addFunction("click",function(){
            isOver[0] = false;
            isOver[1] = false;
            isOver[2] = false;
            isOver[3] = true;
        });
        //button.addFunction("leave",function(){
        //    isOver[3] = false;
        //});

        button = new Button({scene: scene, x: width+152,y: 425,img: 'Others_Bar', name: "Other Bar",depth:26, originalX:970});
        button.setScale(0.4);
        ingredientBar[3].add(button);
        button.addFunction("hover",function(){
            isOver[3] = true;
        });
        button.addFunction("leave",function(){
            isOver[3] = false;
        });

        //meat
        button = new Button({scene: scene, x: width-76,y: 65,img: 'square', name: "Mackerel Button",depth:26, originalX:740});
        ingredientBar[0].add(button);
        button.setAlpha(0.1);
        button.addFunction("click",function (pointer){
            console.log("FFF");
            if(ingredient){
                ingredient.destroy();
                console.log("FFFF");
            }
            console.log("x: "+pointer.x +" y: "+pointer.y);
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Mackerel", name: "mackerel"});
            console.log("x: "+ingredient.x +" y: "+ingredient.y);
            ingredient.setDepth(27);
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
            //this.setAlpha(0.1);
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
            //this.setAlpha(0.01);
        });
        button = new Button({scene: scene, x: width-76,y: 65,img: 'square', name: "Shrimp Button",depth:26, originalX:830});
        ingredientBar[0].add(button);
        button.setAlpha(0.01);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Shrimp", name: "shrimp"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
            //this.setAlpha(0.1);
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
            //this.setAlpha(0.01);
        });
        button = new Button({scene: scene, x: width-76,y: 65,img: 'square', name: "Squid Button",depth:26, originalX:910});
        ingredientBar[0].add(button);
        button.setAlpha(0.01);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Squid", name: "squid"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
            //this.setAlpha(0.1);
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
            //this.setAlpha(0.01);
        });
        button = new Button({scene: scene, x: width-76,y: 65,img: 'square', name: "Octopus Button",depth:26, originalX:990});
        ingredientBar[0].add(button);
        button.setAlpha(0.01);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Octopus", name: "octopus"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
            //this.setAlpha(0.1);
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
            //this.setAlpha(0.01);
        });
        button = new Button({scene: scene, x: width-76,y: 65,img: 'square', name: "Sliced Mackerel Button",depth:26, originalX:1055});
        ingredientBar[0].add(button);
        button.setAlpha(0.01);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Mackerel_Sliced", name: "mackerel_sliced"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
            //this.setAlpha(0.1);
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
            //this.setAlpha(0.01);
        });
        button = new Button({scene: scene, x: width-76,y: 65,img: 'square', name: "Salmon Button",depth:26, originalX:1130});
        ingredientBar[0].add(button);
        button.setAlpha(0.01);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Salmon", name: "salmon"});
        });
        button.addFunction("hover",function (){
            isOver[0] = true;
            //this.setAlpha(0.1);
        });
        button.addFunction("leave",function (){
            isOver[0] = false;
            //this.setAlpha(0.01);
        });

         //Vegetables 1
         button = new Button({scene: scene, x: width-76,y: 185,img: 'square', name: "Daikon Button",depth:26, originalX:780});
         ingredientBar[1].add(button);
         button.setAlpha(0.01);
         button.addFunction("click",function (pointer){
             if(ingredient){
                 ingredient.destroy();
             }
             ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Daikon_Chopped", name: "daikon"});
         });
         button.addFunction("hover",function (){
             isOver[1] = true;
             //this.setAlpha(0.1);
         });
         button.addFunction("leave",function (){
             isOver[1] = false;
             //this.setAlpha(0.01);
         });
         button = new Button({scene: scene, x: width-76,y: 185,img: 'square', name: "Cabbage Button",depth:26, originalX:920});
         ingredientBar[1].add(button);
         button.setAlpha(0.01);
         button.addFunction("click",function (pointer){
             if(ingredient){
                 ingredient.destroy();
             }
             ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Cabbage", name: "cabbage"});
         });
         button.addFunction("hover",function (){
             isOver[1] = true;
             //this.setAlpha(0.1);
         });
         button.addFunction("leave",function (){
             isOver[1] = false;
             //this.setAlpha(0.01);
         });
         button = new Button({scene: scene, x: width-76,y: 185,img: 'square', name: "Spring onion Button",depth:26, originalX:1060});
         ingredientBar[1].add(button);
         button.setAlpha(0.01);
         button.addFunction("click",function (pointer){
             if(ingredient){
                 ingredient.destroy();
             }
             ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Spring_Onion", name: "spring onions"});
         });
         button.addFunction("hover",function (){
             isOver[1] = true;
             //this.setAlpha(0.1);
         });
         button.addFunction("leave",function (){
             isOver[1] = false;
             //this.setAlpha(0.01);
         });

        //Seasoning
        button = new Button({scene: scene, x: width-76,y: 305,img: 'square', name: "Mayonnaise Button",depth:26, originalX:770});
        ingredientBar[2].add(button);
        button.setAlpha(0.01);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Mayo", name: "mayo"});
        });
        button.addFunction("hover",function (){
            isOver[2] = true;
            //this.setAlpha(0.1);
        });
        button.addFunction("leave",function (){
            isOver[2] = false;
            //this.setAlpha(0.01);
        });
        button = new Button({scene: scene, x: width-76,y: 305,img: 'square', name: "Soy sauce Button",depth:26,originalX:870});
        ingredientBar[2].add(button);
        button.setAlpha(0.01);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Soy_Sauce", name: "soy sauce"});
        });
        button.addFunction("hover",function (){
            isOver[2] = true;
            //this.setAlpha(0.1);
        });
        button.addFunction("leave",function (){
            isOver[2] = false;
            //this.setAlpha(0.01);
        });
        button = new Button({scene: scene, x: width-76,y: 305,img: 'square', name: "Salt Button",depth:26,originalX: 970});
        ingredientBar[2].add(button);
        button.setAlpha(0.01);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Salt", name: "salt"});
        });
        button.addFunction("hover",function (){
            isOver[2] = true;
            //this.setAlpha(0.1);
        });
        button.addFunction("leave",function (){
            isOver[2] = false;
            //this.setAlpha(0.01);
        });
        button = new Button({scene: scene, x: width-76,y: 305,img: 'square', name: "Seaweed Button",depth:26,originalX:1091.5});
        ingredientBar[2].add(button);
        button.setAlpha(0.01);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Seaweed", name: "seaweed"});
        });
        button.addFunction("hover",function (){
            isOver[2] = true;
            //this.setAlpha(0.1);
        });
        button.addFunction("leave",function (){
            isOver[2] = false;
            //this.setAlpha(0.01);
        });

        //Other 3
        button = new Button({scene: scene, x: width-76,y: 425,img: 'square', name: "Tenkasu Button",depth:26,originalX:730});
        ingredientBar[3].add(button);
        button.setAlpha(0.01);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Tenkasu", name: "tenkasu"});
        });
        button.addFunction("hover",function (){
            isOver[3] = true;
            //this.setAlpha(0.1);
        });
        button.addFunction("leave",function (){
            isOver[3] = false;
            //this.setAlpha(0.01);
        });
        button = new Button({scene: scene, x: width-76,y: 425,img: 'square', name: "Panko Button",depth:26, originalX:820});
        ingredientBar[3].add(button);
        button.setAlpha(0.01);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Panko", name: "panko"});
        });
        button.addFunction("hover",function (){
            isOver[3] = true;
            //this.setAlpha(0.1);
        });
        button.addFunction("leave",function (){
            isOver[3] = false;
            //this.setAlpha(0.01);
        });
        button = new Button({scene: scene, x: width-76,y: 425,img: 'square', name: "Liqiud dough Button",depth:26,originalX:930});
        ingredientBar[3].add(button);
        button.setAlpha(0.01);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Liquid_Dough", name: "liqiud dough"});
        });
        button.addFunction("hover",function (){
            isOver[3] = true;
            //this.setAlpha(0.1);
        });
        button.addFunction("leave",function (){
            isOver[3] = false;
            //this.setAlpha(0.01);
        });
        button = new Button({scene: scene, x: width-76,y: 425,img: 'square', name: "Rice Button",depth:26,originalX:1040});
        ingredientBar[3].add(button);
        button.setAlpha(0.01);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Rice", name: "rice"});
        });
        button.addFunction("hover",function (){
            isOver[3] = true;
            //this.setAlpha(0.1);
        });
        button.addFunction("leave",function (){
            isOver[3] = false;
            //this.setAlpha(0.01);
        });
        button = new Button({scene: scene, x: width-76,y: 425,img: 'square', name: "Anko Button",depth:26,originalX:1140});
        ingredientBar[3].add(button);
        button.setAlpha(0.01);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Anko", name: "anko"});
        });
        button.addFunction("hover",function (){
            isOver[3] = true;
            //this.setAlpha(0.1);
        });
        button.addFunction("leave",function (){
            isOver[3] = false;
            //this.setAlpha(0.01);
        });
    }

    //function used to set input.on functions to elements in scene
    //TIMO

    setInteractivity(){
        scene.input.on('pointermove', function(pointer) {
            //check here is a scene has a selected gameObject
            if(ingredient){
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

        pot.object.on('pointerdown',function (){
            if(!pot.isCooking && pot.isBurning){
                let found = foods.find(element => element.name == pot.cookedFood);
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
                    console.log(pot.cookedFood);
                }
                pot.isBurning = false;
                pot.isCooking = false;
                pot.timer.timerControl("stop");
            }
        })
    }

    //function fills Foods array with instances of Food classed used in the level
    //this function should only be called in <createLevel> function
    //TIMO
    addFoods(){
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
        if(pot.isCooking || pot.isBurning){
            pot.draw();
        }
        this.hideButtons();
        this.moveButtons();
    }
}
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


