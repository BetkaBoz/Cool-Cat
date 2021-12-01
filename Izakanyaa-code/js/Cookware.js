import Timer from "./Timer.js";
export default class Cookware extends Phaser.GameObjects.Container{
    constructor(data){
        let{scene, x, y, objectImg, type, startEvent} = data;
        super(scene, x, y, []);//objectImg
        this.object = objectImg;
        this.object.setX(x);
        this.object.setY(y);
        this.onEnd = null;
        this.scene = scene;
        this.type = type;
        // this.timer = timer;
        this.isCooking = false;
        this.isBurning = false;
        this.object.setInteractive();
        // this.scene.add.existing(this);
    }

    // draw(){
    //     this.timer.draw();
    // }

    setType(type){
        this.type = type;
    }

    burnFood(){
        //console.log("BURNT");
        this.isBurning = false;
        this.isCooking = false;
        this.type = "burnt";
    }


    setCookEndEvent(event){
        this.onEnd = event;
    }

    setStart(timer){
        let pom = this;
        this.object.on('pointerdown', function(){
            pom.startCooking({timer: timer,time: 3000});
        });
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
        //console.log(this.type);
        if(this.type === "burnt"){
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