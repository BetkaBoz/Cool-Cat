export default class Button extends Phaser.GameObjects.Sprite{
    constructor(data) {
        let {scene,x,y,img,name,functionCode,functionType} = data;
        super(scene,x,y,img);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.name = name;
        this.setInteractive();
        if(functionType && functionCode){
            this.addFunction(functionType,functionCode);
        }
        this.on('pointerover',function(){
            this.setTint(0xFFBBAA);
        });
        this.on('pointerout',function(){
            this.clearTint();
        });
        this.scene.add.existing(this);
    }

    addFunction(functionType,functionCode){
        switch (functionType){
            case "click":
                this.off('pointerdown');
                this.on('pointerdown', functionCode);
                break;
            case "hover":
                this.off('pointerover');
                this.on('pointerover',function(){
                    this.setTint(0xFFFFFF);
                });
                this.on('pointerover',functionCode);
                break;
            case "leave":
                this.off('pointerout');
                this.on('pointerout',function(){
                    this.clearTint();
                });
                this.on('pointerout',functionCode);
                break;
            default:
                console.log("Something went wrong");
                break;
        }
    }


}