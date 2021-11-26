import Timer from "./Timer.js";
export default class Cookware extends Phaser.GameObjects.Container{
    constructor(data){
        let{scene, x, y, objectImg, type} = data;
        super(scene, x, y, []);//objectImg
        //this.object = objectImg;
        this.onEnd = null;
        this.scene = scene;
        this.type = type;
        // this.timer = timer;
        this.isCooking = false;
        this.isBurning = false;
        // this.scene.add.existing(this);
    }

    // draw(){
    //     this.timer.draw();
    // }

    burnFood(){
        // console.log("BURNT");
        this.isBurning = false;
        this.isCooking = false;
        this.type = "burnt";
    }

    setCookEndEvent(endEvent){
        this.onEnd = endEvent;
    }

    startBurn(data){
        let{timer, time} = data
        //console.log(this.isBurning);
        if(!(this.isBurning)){
            //console.log("BURN");
            timer.setVisiblity(false);
            timer.setEvent({time: time, endEvent: this.burnFood});
            this.isBurning = true;
            this.isCooking = false;
        }
    }

    startCooking(data){
        let{timer, time} = data
        if((this.isCooking == false) && (this.isBurning == false)){
            //console.log("Cook");
            timer.setEvent({time: time, endEvent: this.onEnd});
            timer.setVisiblity(true);
            this.isCooking = true;
        }
    }

    testText(text){
        if(this.type == "burnt"){
            text.setText("burnt!");
        }else{
            if(this.isCooking){
                text.setText("Cooking!");
            }
            if(this.isBurning){
                text.setText("Burning!");
            }
        }
    }
}