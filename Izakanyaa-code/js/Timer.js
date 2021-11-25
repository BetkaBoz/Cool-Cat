export default class Timer extends Phaser.GameObjects.Container{

    constructor(data){
        let{scene, x, y, showTimer} = data;
        let graphics = scene.add.graphics();
        super(scene, x, y, [graphics]);
        this.graphics = null
        this.scene = scene;
        this.showTimer = showTimer;
        this.timedEvent = null;
        this.graphics = this.scene.add.graphics();
        this.showTimer = true;
    }

    setEvent(data){
        if(this.scene == null){
            this.scene = parent.scene;
        }
        let{time, endEvent} = data;
        //console.log(time);
        this.timedEvent = this.scene.time.delayedCall(time, endEvent, [], this.scene);
    }

    setVisiblity(visible){
        //console.log(this.showTimer);
        this.showTimer = visible;
    }

    draw(){   
        //this.graphics = this.scene.add.graphics();
        //console.log(this.showTimer);
        if(this.showTimer){
            // console.log("should be true");
            let colour;
            if(this.timedEvent.getOverallProgress() <= 0.33){
                colour = 0x57f542;
            }else{
                if(this.timedEvent.getOverallProgress() <= 0.66){
                    colour = 0xf2b93d;
                }else{
                    colour = 0xed463e;
                }
            }
            this.graphics.clear();
            this.graphics.lineStyle(2, colour, 1);
            this.graphics.beginPath();
            let angle = (360 * this.timedEvent.getOverallProgress()-90);
            let radius = 10;
            this.graphics.arc(this.x, this.y, radius,Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(angle));
            this.graphics.strokePath();
        }else{
            //console.log("FUCK");
            this.graphics.clear();
            this.graphics.arc(this.x, this.y, 0,Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(0));
            this.graphics.strokePath();
        }
    }

}