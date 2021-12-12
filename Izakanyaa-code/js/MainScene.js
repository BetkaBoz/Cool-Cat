/** @type {import("./assets/lib/phaser")} */

import Timer from "./Timer.js";
import Customer from "./Customer.js";
import Cookware from "./Cookware.js";
import Food from "./Food.js";
import PreparationPlate from "./PreparationPlate.js";
import Ingredient from "./Ingredient.js";
import Button from "./Button.js";
import FoodSlots from "./FoodSlots.js";
import RecipeBook from "./RecipeBook.js";

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
let trashcan;
let bossIsHere = false;
let recipeBook;
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
let summaryPreviousScore;
let summaryArray = [];
let rectangle;
let bigChungusSummary;
let bigChungusSummaryText;

let spacebar;
let retry;
let nextLevel;
let end;

export default class MainScene extends Phaser.Scene {
    constructor() {
      super('MainScene');

    }
  
    preload() {
        //ENVIRONMENT
        this.load.image('Bubble','./assets/images/bubble.png');
        this.load.spritesheet('Customer', './assets/images/Customer_Spritesheet.png',  {frameWidth: 640, frameHeight: 640});
        this.load.spritesheet('Chungus','./assets/images/BigChungus_Spritesheet.png',{frameWidth: 216, frameHeight: 256});
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

        //SUMMARY
        this.load.image('Summary_screen','./assets/images/Summary_screen.png');
        this.load.image('VeryGood','./assets/images/React00.png');
        this.load.image('Good','./assets/images/React01.png');
        this.load.image('Neutral','./assets/images/React02.png');
        this.load.image('Bad','./assets/images/React03.png');
        this.load.image('VeryBad','./assets/images/React04.png');
        this.load.image('Sum','./assets/images/Rectangle.png');
        this.load.image('BigChungusSummary','./assets/images/BigChungus.png');
        this.load.image('NextLevel','./assets/images/NEXT_LEVEL.png');
        this.load.image('Retry','./assets/images/RETRY.png');
        this.load.image('End','./assets/images/END.png');

        //FOODS
        this.load.image('Garbage','./assets/images/food/Blob.png');
        this.load.image('Burnt','./assets/images/food/Coal.png');
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
        this.load.image('Anko','./assets/images/ingredients/Seasonings/one_Anko.png');
        this.load.image('Mayo','./assets/images/ingredients/Seasonings/one_Majo.png');
        this.load.image('Salt','./assets/images/ingredients/Seasonings/one_Salt.png');
        this.load.image('Seaweed','./assets/images/ingredients/Seasonings/one_Seaweed.png');
        this.load.image('Soy_Sauce','./assets/images/ingredients/Seasonings/one_Soy_sauce.png');
        this.load.image('Cabbage','./assets/images/ingredients/Vegetables/Cabbage chopped.png');
        this.load.image('Daikon_Chopped','./assets/images/ingredients/Vegetables/Daikon chopped.png');
        this.load.image('Spring_Onion','./assets/images/ingredients/Vegetables/Spring onion chopped.png');

        //KITCHEN 
        this.load.image('Trashcan','./assets/images/kitchen/Trash.png');
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
        this.load.spritesheet('RecipeBook', './assets/images/kitchen/Recipes_Sspritesheet.png',  {frameWidth: 300, frameHeight: 300});
        this.load.image('Arrow_Right','./assets/images/kitchen/arrow-right.png');
        this.load.image('Arrow_Left','./assets/images/kitchen/arrow-left.png');
        this.load.image('Exit_Btn','./assets/images/kitchen/X.png');
        this.load.image('Recipe_Book','./assets/images/kitchen/Btn_Recipes1.png');
        this.load.image('Recipe_Book2','./assets/images/kitchen/Btn_Recipes2.png');

    }
    create(){
        this.difficulty = null;
        this.scoreFromPreviousLevels = null;
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

        //štart hry keby ste nevedeli
        this.startGame(); //Matúš
        this.testingCreate(); //Timo

        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(spacebar)) {
            this.scene.restart();
        }
        this.myUpdate(); //Matúš
        this.testUpdate(); //Timo
    }
    startGame(){
        this.cameras.main.fadeIn(2000);
        width = this.cameras.main.width;
        height = this.cameras.main.height;

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

            if (sprite.isStanding){
                sprite.draw();
            }
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
            this.level = Number( window.localStorage.getItem("level"));
            console.log("FOUND LEVEL: " + this.level)
        }
        else {
            this.level = 1;
            console.log("NO LEVEL DETECTED, GAME IS ON LEVEL: " + this.level)
        }

        if (window.localStorage.getItem("score")){
            this.scoreFromPreviousLevels = Number(window.localStorage.getItem("score"));
            console.log("FOUND SCORE: " + this.scoreFromPreviousLevels)
        }
        else {
            this.scoreFromPreviousLevels = 0;
            console.log("NO SCORE DETECTED, GAME IS ON SCORE: " + this.scoreFromPreviousLevels)
        }
        this.score = 0;
        this.changeDelay();
        console.log("CUSTOMER COMING DELAY IS: " + this.delayComing);
        console.log("CUSTOMER LEAVING DELAY IS: " + this.delayLeaving);

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

        //stôl
        let table = this.add.sprite(0, height/6 , 'Table');
        table.setScale(2);
        table.setDepth(25);
        table.setOrigin(0,0);

        //vytvorenie hodín
        clock= this.add.image(10,10,"Mclock");
        clock.setOrigin(0,0);
        clock.setScale(1.25);

        //vytvorenie bonsaiu
        this.anims.create({
            key: 'glow',
            frames: this.anims.generateFrameNumbers('Bonsai', {
                frames: [0,1,2,3,4,5,6,7,8,9,10]}),
            frameRate: 2,
            repeat: -1
        });

        this.bonsai = this.add.sprite(570,330,'Bonsai',0);
        this.bonsai.setScale(0.5);
        this.bonsai.setDepth(69);
        this.bonsai.play("glow");

        let shadow = this.add.sprite(580, 345, 'Bonsai');
        shadow.setScale(0.45)
        shadow.setDepth(68)
        shadow.setTint(0x000000)
        shadow.setAlpha(0.3)

        //vytvorenie score textu
        scoreText = this.add.text(199, 5, 'SCORE: ' + this.score, { font: 'bold 32px Arial', fill: '#000000'});
        scoreText.setShadow(0, 0, 'rgb(255,255,255)', 30);

        //vytvorenie konecneho textu
        endText= this.add.image(width/2, (height/2)-50,"YouWon")
        endText.setScale(1.4)
        endText.setDepth(500);
        endText.visible = false;

        this.changeEnvironment();

        //sumár
        summary = this.add.image(0, 0,"Summary_screen")
        summary.setOrigin(0,0);
        summary.setDepth(1000)
        summary.visible = false;

        nextLevel = new Button({x:970,y:520,scene: this,img: "NextLevel",depth:1001})
        nextLevel.setOrigin(0,0)
        nextLevel.setScale(0.4);
        nextLevel.addFunction("click", function(){
            nextLevel.scene.saveGame();
            nextLevel.scene.scene.restart();
        });

        retry = new Button({x:70,y:520,scene: this,img: "Retry",depth:1001})
        retry.setOrigin(0,0)
        retry.setScale(0.4);
        retry.addFunction("click", function(){
            retry.scene.scene.restart();
        });

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


        rectangle.setDepth(1001);
        summaryText10.setDepth(1001);
        summaryText20.setDepth(1001);
        summaryText30.setDepth(1001);
        summaryText40.setDepth(1001);
        summaryText50.setDepth(1001);
        summaryText01.setDepth(1001);
        summaryText02.setDepth(1001);
        summaryText03.setDepth(1001);
        summaryText04.setDepth(1001);
        summaryText05.setDepth(1001);
        summaryTextALL.setDepth(1001);

        summaryArray.push(summaryText10,summaryText20,summaryText30,summaryText40,summaryText50,
                          summaryText01,summaryText02,summaryText03,summaryText04,summaryText05,
                          rectangle,summaryTextALL,nextLevel,retry);
        summaryArray.forEach(element => {
            element.visible = false;
        })

    }
    cantOpenCookBook(){
        if (!this.isCookBookOpenable){//x: 1070,y: 195
            cookBookText = this.add.sprite(1065, 195, "Exit_Btn");
            cookBookText.setDepth(28);
            this.time.addEvent({ delay: 2000, callback: function(){cookBookText.destroy();} , callbackScope: this, loop: false });
        }
        else {
            recipeBook.openBook();
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
            bigChungusSummary.setDepth(1001);
            bigChungusSummaryText =  this.add.text(935, 200, '' , { font: 'bold 40px Arial', fill: '#86d3ff'});
            bigChungusSummaryText.setDepth(1001);
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
        let customer = new Customer({scene: this, image: "Chungus",place: 2 ,targetX: targetX, edgeX: width, x: -100, y:115});
        customer.isBoss = true;
        bossIsHere = true;
        customer.setScale(0.6,0.3);
        customer.order = "Ultimate_secret_bowl";
        customer.order_image.setTexture(customer.order);


        customer.graphics.setY(-20)
        customer.graphics.setX(-75)
        customer.graphics.setScale(0.4)

        customer.face.setY(-25)
        customer.face.setX(-95)
        customer.face.setScale(0.20)

        customer.bubble.setY(-10)
        customer.bubble.setX(10)
        customer.bubble.setScale(0.4);
        customer.order_image.setY(-20)
        customer.order_image.setX(10)
        customer.setOrderScale();

        customer.delay = this.delayLeaving + 20;
        customer.gotFood = false;
        customer.customerScore = 500;//500
        this.add.existing(customer);
        this.customerGroup.add(customer);
        customer.customerImg.play('moveChungus');

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
        customer.customerImg.play('move');

        console.log( customer.order );
    }
    changeDelay(){
        //delay ako často budú chodiť zákazníci
        if (this.difficulty === "EASY"){
            this.delayComing = 12;// 12
            this.delayLeaving = 30;// 30
        }
        else if  (this.difficulty === "MEDIUM"){
            this.delayComing = 10;//10
            this.delayLeaving = 25;// 25
        }
        else if  (this.difficulty === "HARD"){
            this.delayComing = 8;//8
            this.delayLeaving = 20;// 20
            this.isCookBookOpenable = false;//nezobrazia sa recepty
        }
    }
    changeCustomerCounter(){
        //počet zákazníkov v každom leveli
        if (this.level === 1){
            this.customerCounter = 12;// 12
        }
        else if  (this.level === 2){
            this.customerCounter = 16;//16
        }
        else if  (this.level === 3){
            this.customerCounter = 20;//20
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
            if (this.level=== 3){
                if (this.score >= (this.customerCounterAll * 50) +500){
                    //console.log("YOU WON!")
                    endText.setTexture('YouWon')
                }
                else {
                    //console.log("YOU LOST")
                    endText.setTexture('YouLost')
                }
            }
            else {
                if (this.score >= this.customerCounterAll * 50){
                    //console.log("YOU WON!")
                    endText.setTexture('YouWon')
                }
                else {
                    //console.log("YOU LOST")
                    endText.setTexture('YouLost')
                }
            }


            /*
            this.scene.pause();
            //console.log(this.events)
            if (this.scene.isActive('MainScene')){
                console.log("TUT")
                let newScene = new MainScene("MainScene")
                this.scene.switch("MainScene");
            }
*/
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

        this.scoreFromPreviousLevels += this.score;//TOTAL SCORE

        endText.setDepth(1001);
        endText.setScale(0.35);
        endText.setX(60)
        endText.setY(70)

        endText.setOrigin(0,0)

        if (this.level=== 3){
            if (this.bossScore < 0){
                bigChungusSummaryText.setText('  '+ this.bossScore);
            }
            else {
                bigChungusSummaryText.setText('+'+ this.bossScore);
            }
            nextLevel.destroy();

            if (this.score >= (this.customerCounterAll * 50)+500){
                //zobrazí sa END tlačídlo

                end = new Button({x:970,y:520,scene: this,img: "End",depth:1001})
                end.setOrigin(0,0)
                end.setScale(0.4);
                end.addFunction("click", function(){
                    end.scene.saveGame();
                    end.scene.scene.remove();
                    console.log("YOU BEAT THE GAME, THANKS FOR PLAYING ^^")
                });
            }
            else {
                //nezobrazí sa END tlačídlo
            }
        }
        else {
            if (this.score >= (this.customerCounterAll * 50)){
                //zobrazí sa MEXT LEVEL tlačídlo
            }
            else {
                //nezobrazí sa MEXT LEVEL tlačídlo
                nextLevel.destroy();
            }
        }
    }

    saveGame() {
        //let level = Number(localStorage.getItem('level'))
        let userid = Number(localStorage.getItem('user_id'));
        if (this.level < 3) {
            localStorage.clear();
            localStorage.setItem('level', this.level+1)
            localStorage.setItem('score', this.scoreFromPreviousLevels)
        }

        let saveData = {
            user_id: userid,
            difficulty: this.difficulty,
            level: this.level,
            score: this.scoreFromPreviousLevels,
        }

        /*
        axios.post('http://localhost/Cool-Cat/cat-tail/public/api/save', saveData).then(
            () => createToast('Save Successful', {type: 'success', position:"bottom-right", timeout: 4000})
        ).catch(er => {
            this.errors = er.response.data.errors
        })
        */
    }



 //function used only for testing
    //TIMO
    testingCreate(){
        scene = this;
        let kitchenBG
        kitchenBG = scene.add.image(width/2,0,"Kitchen_BG");
        kitchenBG.setOrigin(0,0);
        kitchenBG.setScale(1.9);
        kitchenBG.setDepth(25);
        kitchenBG = scene.add.image(width/2,59,"Kitchen_Table");
        kitchenBG.setOrigin(0,0);
        kitchenBG.setScale(1.7);
        kitchenBG.setDepth(25);
        let panImg = scene.add.sprite(0, 0, "Fryer");
        //panImg.setScale(0.45);
        let potImg = scene.add.sprite(0, 0, "Pot");
        timer = []
        timer.push(new Timer({scene: scene, x: 0, y: 0,showTimer:true,depth:27}));
        pan = new Cookware({scene: scene, x: 1070, y:335, objectImg: panImg, type: "fry", timer: timer[timer.length-1]});
        timer.push(new Timer({scene: scene, x: 0, y: 0,showTimer:true,depth:27}));
        pot = new Cookware({scene: scene, x: 874, y:230, objectImg: potImg , type: "bake", timer: timer[timer.length-1]});
        prepPlate = new PreparationPlate({scene: scene, x: 825, y:382, plateImg:"Plate", ingredients:[], foods:foods});
        prepPlate.setHit(prepPlate);
        prepPlate.setDepth(26);
        ingredientBar = [];
        ingredientBar.push(scene.add.group({maxSize:7}));
        ingredientBar.push(scene.add.group({maxSize:4}));
        ingredientBar.push(scene.add.group({maxSize:5}));
        ingredientBar.push(scene.add.group({maxSize:6}));
        recipeBook = new RecipeBook({scene:scene, x:width/2, y:235, objectImg:"Nothing", leftArrowImg:"Arrow_Left", rightArrowImg: "Arrow_Right", exitImg:"Exit_Btn", depth:69, level:level})
        
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
        let button;
        let recipeLook;

        // button = new Button({scene: scene, x: width/2+20,y: 64,img: 'square', name: "pause Button",depth:27});
        // button.addFunction("click",function(){
        //     if(scene.scene.isPaused()){
        //         scene.scene.resume('MainScene');
        //     }else{
        //         scene.scene.pause();
        //     }
        // })

        trashcan = new Button({scene: scene, x: 959,y: 65,img: 'Trashcan', name: "Trash Button",depth:25});
        trashcan.changeScale(1);
        
        if(level == 3){
            recipeLook = "Recipe_Book2";
        }else{
            recipeLook = "Recipe_Book";
        }

        button = new Button({scene: scene, x: 1070,y: 195,img: recipeLook, name: "Recipe Button",depth:25,frame:0});
        button.changeScale(0.6);
        button.addFunction("click",function(){
            scene.cantOpenCookBook();
        });

        button = new Button({scene: scene, x: width-55,y: 95,img: 'Meat_Btn', name: "Meat Button",depth:27});
        button.changeScale(0.4,0.3);
        button.addFunction("click",function(){
            isOver[0] = true;
            isOver[1] = false;
            isOver[2] = false;
            isOver[3] = false;
        });
        //button.addFunction("leave",function(){
        //    isOver[0] = false;
        //});
        button = new Button({scene: scene, x: width+152,y: 95,img: 'Meat_Bar', name: "Meat Bar",depth:26, originalX:970});
        ingredientBar[0].add(button);
        button.changeScale(0.4);
        button.addFunction("hover",function(){
            isOver[0] = true;
        });
        button.addFunction("leave",function(){
            isOver[0] = false;
        });

        button = new Button({scene: scene, x: width-55,y: 185,img: 'Veggies_Btn', name: "Veggies Button",depth:27});
        button.changeScale(0.4,0.3);
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
        button.changeScale(0.4);
        ingredientBar[1].add(button);
        button.addFunction("hover",function(){
            isOver[1] = true;
        });
        button.addFunction("leave",function(){
            isOver[1] = false;
        });

        button = new Button({scene: scene, x: width-55,y: 275,img: 'Seasoning_Btn', name: "Seasoning Button",depth:27});
        button.changeScale(0.4,0.3);
        button.addFunction("click",function(){
            isOver[0] = false;
            isOver[1] = false;
            isOver[2] = true;
            isOver[3] = false;
        });
        //button.addFunction("leave",function(){
        //    isOver[2] = false;
        //});

        button = new Button({scene: scene, x: width+152,y: 275,img: 'Seasoning_Bar', name: "Seasoning Bar",depth:26, originalX:970});
        button.changeScale(0.4);
        ingredientBar[2].add(button);
        button.addFunction("hover",function(){
            isOver[2] = true;
        });
        button.addFunction("leave",function(){
            isOver[2] = false;
        });

        button = new Button({scene: scene, x: width-55,y: 365,img: 'Others_Btn', name: "Other Button",depth:27});
        button.changeScale(0.4,0.3);
        button.addFunction("click",function(){
            isOver[0] = false;
            isOver[1] = false;
            isOver[2] = false;
            isOver[3] = true;
        });
        //button.addFunction("leave",function(){
        //    isOver[3] = false;
        //});

        button = new Button({scene: scene, x: width+152,y: 365,img: 'Others_Bar', name: "Other Bar",depth:26, originalX:970});
        button.changeScale(0.4);
        ingredientBar[3].add(button);
        button.addFunction("hover",function(){
            isOver[3] = true;
        });
        button.addFunction("leave",function(){
            isOver[3] = false;
        });

        //meat
        button = new Button({scene: scene, x: width-76,y: 95,img: 'Nothing', name: "Mackerel Button",depth:26, originalX:740});
        ingredientBar[0].add(button);
        button.setAlpha(0.1);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Mackerel", name: "mackerel"});
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
        button = new Button({scene: scene, x: width-76,y: 95,img: 'Nothing', name: "Shrimp Button",depth:26, originalX:830});
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
        button = new Button({scene: scene, x: width-76,y: 95,img: 'Nothing', name: "Squid Button",depth:26, originalX:910});
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
        button = new Button({scene: scene, x: width-76,y: 95,img: 'Nothing', name: "Octopus Button",depth:26, originalX:990});
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
        button = new Button({scene: scene, x: width-76,y: 95,img: 'Nothing', name: "Sliced Mackerel Button",depth:26, originalX:1055});
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
        button = new Button({scene: scene, x: width-76,y: 95,img: 'Nothing', name: "Salmon Button",depth:26, originalX:1130});
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
         button = new Button({scene: scene, x: width-76,y: 185,img: 'Nothing', name: "Daikon Button",depth:26, originalX:780});
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
         button = new Button({scene: scene, x: width-76,y: 185,img: 'Nothing', name: "Cabbage Button",depth:26, originalX:920});
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
         button = new Button({scene: scene, x: width-76,y: 185,img: 'Nothing', name: "Spring onion Button",depth:26, originalX:1060});
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
        button = new Button({scene: scene, x: width-76,y: 275,img: 'Nothing', name: "Mayonnaise Button",depth:26, originalX:770});
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
        button = new Button({scene: scene, x: width-76,y: 275,img: 'Nothing', name: "Soy sauce Button",depth:26,originalX:870});
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
        button = new Button({scene: scene, x: width-76,y: 275,img: 'Nothing', name: "Salt Button",depth:26,originalX: 970});
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
        button = new Button({scene: scene, x: width-76,y: 275,img: 'Nothing', name: "Seaweed Button",depth:26,originalX:1091.5});
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
        button = new Button({scene: scene, x: width-76,y: 365,img: 'Nothing', name: "Tenkasu Button",depth:26,originalX:730});
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
        button = new Button({scene: scene, x: width-76,y: 365,img: 'Nothing', name: "Panko Button",depth:26, originalX:820});
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
        button = new Button({scene: scene, x: width-76,y: 365,img: 'Nothing', name: "Liqiud dough Button",depth:26,originalX:930});
        ingredientBar[3].add(button);
        button.setAlpha(0.01);
        button.addFunction("click",function (pointer){
            if(ingredient){
                ingredient.destroy();
            }
            ingredient = new Ingredient({scene:scene, x : pointer.x, y:pointer.y,plate:prepPlate, img: "Liquid_Dough", name: "liquid dough"});
        });
        button.addFunction("hover",function (){
            isOver[3] = true;
            //this.setAlpha(0.1);
        });
        button.addFunction("leave",function (){
            isOver[3] = false;
            //this.setAlpha(0.01);
        });
        button = new Button({scene: scene, x: width-76,y: 365,img: 'Nothing', name: "Rice Button",depth:26,originalX:1040});
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
        button = new Button({scene: scene, x: width-76,y: 365,img: 'Nothing', name: "Anko Button",depth:26,originalX:1140});
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
                if(trashcan.checkOverlap(prepPlate)){
                    prepPlate.clearIngredients();
                }else{
                    if(!pan.checkOverlap(prepPlate)){
                        pot.checkOverlap(prepPlate);
                    }
                }
            }
            prepPlate.x = prepPlate.plate.x;
            prepPlate.y = prepPlate.plate.y;
        })

        pan.object.on('pointerdown',function (){
            let finished = false;
            if((!pan.isCooking && pan.isBurning)||pan.cookedFood == "Burnt"){
                let found = foods.find(element => element.name == pan.cookedFood);
                if(found){
                    finished = scene.fillSlot(found);
                }else {
                    console.log(pan.cookedFood);
                }
                if(finished){
                    pan.object.play(pan.type+"_idle");
                    pan.isBurning = false;
                    pan.isCooking = false;
                    pan.timer.timerControl("stop");
                }
            }
        })

        pot.object.on('pointerdown',function (){
            let finished = false;
            if((!pot.isCooking && pot.isBurning)||pot.cookedFood == "Burnt"){
                let found = foods.find(element => element.name == pot.cookedFood);
                if(found){
                    finished = scene.fillSlot(found);
                }else {
                    console.log(pot.cookedFood);
                }
                if(finished){
                    pot.object.play(pot.type+"_idle");
                    pot.object.x += 7;
                    //pot.object.y += 1;
                    pot.isBurning = false;
                    pot.isCooking = false;
                    pot.timer.timerControl("stop");
                }
            }
        })
    }

    checkCustomerOverlap(slot){
        for(let i = 0; i < this.customerGroup.getChildren().length; i++){
            if(this.customerGroup.getChildren()[i].checkOverlap(slot.food)){
                this.customerGroup.getChildren()[i].takeFood(slot.food);
                return true;
            }
        }
    }

    fillSlot(foundFood){        
        let alreadyFilled = false;
        for(let i = 0; i < 3;i++){
            if(!slots.getChildren()[i].isFilled && !alreadyFilled){
                let food = new Food({scene:scene, x:0, y:0, image:foundFood.name, ingredients:[], cookMethod:null, prepTime:null}) ;//found
                //console.log(food.name);
                slots.getChildren()[i].addFood(food);
                slots.getChildren()[i].makeInteractive(function (){
                    if(scene.checkCustomerOverlap(slots.getChildren()[i])){
                        slots.getChildren()[i].removeFood();
                    }else{
                        if(trashcan.checkOverlap(slots.getChildren()[i].food)){
                            slots.getChildren()[i].removeFood();
                        }else{
                            slots.getChildren()[i].food.x = slots.getChildren()[i].x;
                            slots.getChildren()[i].food.y = slots.getChildren()[i].y;
                        }
                    }
                });
                alreadyFilled = true;
                return true;
            }
        }
        return false;
    }

    //function fills Foods array with instances of Food classed used in the level
    //this function should only be called in <createLevel> function
    //TIMO
    addFoods(){
        foods.splice(0,foods.length-1);
        let ingredients,food;
        ingredients = ['mackerel','salt'];
        food = new Food({scene:scene, x:100, y:100, image: 'Shioyaki', ingredients: ingredients, cookMethod: "bake", prepTime: 3000});
        food.setFoodName("Shioyaki");
        foods.push(food);

        ingredients = ['squid','soy sauce'];
        food = new Food({scene:scene, x:100, y:100, image: 'Ikayaki', ingredients: ingredients, cookMethod: "fry", prepTime: 3000});
        food.setFoodName("Ikayaki");
        foods.push(food);

        ingredients = ['rice','mackerel_sliced', 'seaweed'];
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
        food = new Food({scene:scene, x:100, y:100, image: 'Blob', ingredients: ingredients, cookMethod: "nothing", prepTime: 3000});
        food.setFoodName("Garbage");
        foods.push(food);

        ingredients = ['none'];
        food = new Food({scene:scene, x:100, y:100, image: 'Burnt', ingredients: ingredients, cookMethod: "nothing", prepTime: 3000});
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
                ingredients = ['none'];
                food = new Food({scene:scene, x:100, y:100, image: 'Ultimate_secret_bowl', ingredients: ingredients, cookMethod: "frier"});
                food.setFoodName("Ultimate_Secret_Bowl");
                foods.push(food);
            }
        }
        foods.forEach(element => {
            element.setAlpha(0);
            element.setX(-100);
            element.setScale(0.5);
            //element.setDepth(70);
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


