//import Phaser from 'phaser'

export default class Timer extends Phaser.GameObjects.Container{

    constructor(data){
        let{scene, x, y, showTimer,depth} = data;
        let graphics = scene.add.graphics();
        super(scene, x, y, [graphics]);
        this.graphics = null
        this.scene = scene;
        this.showTimer = showTimer;
        this.timedEvent = null;
        this.graphics = this.scene.add.graphics();
        if(depth){
            this.graphics.setDepth(depth);
        }
        this.showTimer = true;
        this.scene.add.existing(this);
    }

    setEvent(data){
        if(this.scene == null){
            this.scene = parent.scene;
        }
        let{time, endEvent, args} = data;
        this.timedEvent = this.scene.time.delayedCall(time, endEvent, args, this.scene);
    }

    timerControl(action){
        switch (action){
            case "pause":
                this.timedEvent.paused = true;
                break;
            case "resume":
                this.timedEvent.paused = false;
                break;
            case "stop":
                this.setVisiblity(false);
                this.draw();
                this.timedEvent.remove();
                break;
            default:
                console.log("WRONG COMMAND BUDDY");
        }
    }

    setVisiblity(visible){
        this.showTimer = visible;
    }

    draw(){
        if(this.showTimer){
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
            this.graphics.lineStyle(10, colour, 1);
            this.graphics.beginPath();
            let angle = (360 * this.timedEvent.getOverallProgress()-90);
            let radius = 15;
            this.graphics.arc(this.x, this.y, radius,Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(angle));
            this.graphics.strokePath();
        }else{
            this.graphics.clear();
            this.graphics.arc(this.x, this.y, 0,Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(0));
            this.graphics.strokePath();
        }
    }

}