import PreparationPlate from "./PreparationPlate.js";
import Phaser from "phaser";

export default class Cookware extends Phaser.GameObjects.Container{
    constructor(data){
        let{scene, x, y, objectImg, type, timer} = data;
        super(scene, x, y, [timer,objectImg]);
        this.object = objectImg;
        this.object.setScale(0.57);
        this.scaleNum = 0.57;
        this.onEnd = null;
        this.scene = scene;
        this.type = type;
        this.timer = timer;
        this.timer.setX(x);
        if(type == "bake"){
            this.timer.setY(y-120);
        }else{
            this.timer.setY(y-100);
        }
        this.cookedFood = "nothing";
        this.isCooking = false;
        this.isBurning = false;
        this.setDepth(25);
        this.object.setInteractive();
        this.object.on("pointerover",function(){
            this.setTint(0xBBFFCC);
        })
        this.object.on("pointerout",function(){
            this.clearTint();
        })
        this.scene.add.existing(this);

        //animation for different cookware
        this.scene.anims.create({
            key: 'fry',
            frames: this.scene.anims.generateFrameNumbers('Cookware', {frames: [0,1,2,3]}),
            frameRate: 8,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'fry_idle',
            frames: this.scene.anims.generateFrameNumbers('Cookware', {frames: [0]}),
            frameRate: 8,
            repeat: 1
        });
        this.scene.anims.create({
            key: 'bake',
            frames: this.scene.anims.generateFrameNumbers('Cookware', {frames: [9,10,11,12,13,14,15,16,17,18]}),
            frameRate: 8,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'bake_idle',
            frames: this.scene.anims.generateFrameNumbers('Cookware', {frames: [8]}),
            frameRate: 8,
            repeat: 1
        });

    }

    checkOverlap(prep,bossPresent){        
        if(!bossPresent){
            bossPresent = false
        } 
        console.log(this.scene);
        let finalFood;
        let offsetX = this.object.width*(this.scaleNum/2);
        let offsetY = this.object.height*(this.scaleNum/2);
        if(prep instanceof PreparationPlate){
            if (prep.y >= this.y - offsetY && prep.y <= this.y + offsetY) {
                if (prep.x >= this.x - offsetX && prep.x <= this.x + offsetX) {
                    if(prep.isGarbage){
                        console.log("prep is garbage");
                        this.cookedFood = "Garbage";
                    }else{
                        finalFood = prep.potentialFood.find(word => word.cookMethod == this.type);
                        if(!finalFood){
                            console.log("there's no final food")
                            this.cookedFood = "Garbage";
                        }else{
                            if(prep.arraysEqual(finalFood.ingredients,prep.ingredients)){
                                this.cookedFood = finalFood.name;
                            }else{
                                console.log("arrays don't equal")
                                this.cookedFood = "Garbage";
                            }                            
                        }
                    }
                    if(this.cookedFood != "nothing"){
                        console.log(this.cookedFood);
                        console.log("boss?"+bossPresent);
                        if(!finalFood){
                            if(bossPresent){
                                console.log("yu here so work")
                                this.cookedFood = "Ultimate_secret_bowl";
                            }
                            this.startCooking(3000);
                        }else{
                            this.startCooking(finalFood.prepTime);
                        }
                        prep.clearIngredients();
                        return true;
                    }
                }
            }
        }
        return false;
    }

    draw(){
        this.timer.draw();
    }

    setType(type){
        this.type = type;
    }

    burnFood(self){
        console.log("here "+self.cookedFood);
        self.isBurning = false;
        self.isCooking = false;
        self.cookedFood = "Burnt";
        console.log("down here "+self.cookedFood);
    }

    startBurn(data){
        let{time, self} = data
        if(!(this.isBurning)){
            self.timer.setEvent({time: time, endEvent: self.burnFood,args: [self]});
            self.isBurning = true;
            self.isCooking = false; //stop animation of chosen cookware
        }
    }

    startCooking(time){
        if((this.isCooking == false) && (this.isBurning == false)){
            this.timer.setEvent({time: time, endEvent: this.startBurn, args:[{time: 3000, self: this}]});
            this.timer.setVisiblity(true);
            this.isCooking = true;
            this.scene.sound.play(this.type+"_sound")
            this.object.play(this.type);   //play animation of chosen cookware
            if(this.type == "bake"){
                this.object.x -= 7;
            }
        }
    }
}