import Timer from "./Timer";
import PreparationPlate from "./PreparationPlate";
export default class Cookware extends Phaser.GameObjects.Container{
    constructor(data){
        let{scene, x, y, objectImg, type, timer} = data;
        super(scene, x, y, [timer,objectImg]);//objectImg
        this.object = objectImg;
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
    }

    checkOverlap(prep){
        let finalFood;
        if(prep instanceof PreparationPlate){
            if (prep.y >= this.y - this.object.height && prep.y <= this.y + this.object.height) {
                if (prep.x >= this.x - this.object.width && prep.x <= this.x + this.object.width) {
                    if(prep.isGarbage){
                        this.cookedFood = "Garbage";
                    }else{
                        finalFood = prep.potentialFood.find(word => word.cookMethod == this.type);
                        if(!finalFood){
                            this.cookedFood = "Garbage";
                        }else{
                            this.cookedFood = finalFood.name;
                        }
                    }
                    if(this.cookedFood != "nothing"){
                        this.startCooking(finalFood.prepTime);
                        prep.ingredients.forEach(element => element.destroy());
                        prep.ingredients.splice(0,prep.ingredients.length);
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
        }
    }

    startCooking(time){
        if((this.isCooking == false) && (this.isBurning == false)){
            this.timer.setEvent({time: time, endEvent: this.startBurn, args:[{time: 3000, self: this}]});
            this.timer.setVisiblity(true);
            this.isCooking = true;
        }
    }
}