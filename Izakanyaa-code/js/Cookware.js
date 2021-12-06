import Timer from "./Timer.js";
import PreparationPlate from "./PreparationPlate.js";
export default class Cookware extends Phaser.GameObjects.Container{
    constructor(data){
        let{scene, x, y, objectImg, type, timer} = data;
        let object = scene.add.sprite(0,0,objectImg);
        super(scene, x, y, [timer,objectImg]);//objectImg
        this.object = object;
        this.object.setScale(0.45);
        // this.object.setX(0);
        // this.object.setY(0);
        this.onEnd = null;
        this.scene = scene;
        this.type = type;
        this.timer = timer;
        this.timer.setX(x);
        this.timer.setY(y-50);
        this.cookedFood = "nothing";
        this.isCooking = false;
        this.isBurning = false;
        this.object.setInteractive();
        this.scene.add.existing(this);

        //animation for different cookware
        this.scene.anims.create({
            key: 'fry',
            frames: this.scene.anims.generateFrameNumbers('Cookware', {frames: [0,1,2,3]}),
            frameRate: 8,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'mix',
            frames: this.scene.anims.generateFrameNumbers('Cookware', {frames: [4,5,6,7]}),
            frameRate: 8,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'cook',
            frames: this.scene.anims.generateFrameNumbers('Cookware', {frames: [8,9,10,11,12,13,14,15,16,17]}),
            frameRate: 8,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'bake',
            frames: this.scene.anims.generateFrameNumbers('Cookware', {frames: [18,19,20,21]}),
            frameRate: 8,
            repeat: -1
        });

        const keys = [ 'fry', 'mix', 'cook', 'bake'];
    }

    checkOverlap(prep){
        let finalFood;
        if(prep instanceof PreparationPlate){
            if (prep.y >= this.y - this.object.height/2 && prep.y <= this.y + this.object.height/2) {
                if (prep.x >= this.x - this.object.width/2 && prep.x <= this.x + this.object.width/2) {
                    if(prep.isGarbage){
                        this.cookedFood = "Garbage";
                    }else{
                        finalFood = prep.potentialFood.find(word => word.cookMethod == this.type);
                        if(!finalFood){
                            console.log("here");
                            this.cookedFood = "Garbage";
                        }else{
                            this.cookedFood = finalFood.name;
                        }
                    }
                    if(this.cookedFood != "nothing"){
                        if(!finalFood){
                            this.startCooking(3000);
                        }else{
                            this.startCooking(finalFood.prepTime);
                        }
                        prep.clearIngredients();
                    }
                }
            }
        }
    }

    draw(){
        this.timer.draw();
    }

    setType(type){
        this.type = type;
    }

    burnFood(self){
        self.isBurning = false;
        self.isCooking = false;
        self.cookedFood = "Burnt";
    }

    startBurn(data){
        let{time, self} = data
        if(!(this.isBurning)){
            self.timer.setEvent({time: time, endEvent: this.burnFood,args: [self]});
            self.isBurning = true;
            self.isCooking = false;

            this.object.stop(keys[type]);   //stop animation of chosen cookware
        }
    }

    startCooking(time){
        if((this.isCooking == false) && (this.isBurning == false)){
            this.timer.setEvent({time: time, endEvent: this.startBurn, args:[{time: 3000, self: this}]});
            this.timer.setVisiblity(true);
            this.isCooking = true;

            this.object.play(keys[type]);   //play animation of chosen cookware
        }
    }
}