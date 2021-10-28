export default class Timer extends Phaser.GameObjects.Container{
    constructor(data){
        let{scene, x, y, time, endEvent} = data;        
        let timedEvent = scene.time.delayedCall(time, endEvent, [], scene);
        let graphics = scene.add.graphics();
        super(scene, x, y, [graphics]);
        this.graphics = null
        this.scene = scene;
        this.timedEvent = timedEvent;
        this.graphics = this.scene.add.graphics();
    }

    draw(){   
        //this.graphics = this.scene.add.graphics();
        var colour;
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
        
    }

}