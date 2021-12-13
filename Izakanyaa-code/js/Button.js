export default class Button extends Phaser.GameObjects.Sprite{
    constructor(data) {
        let {scene,x,y,img,name,depth,originalX,originalY,frame,functionCode,functionType} = data;
        super(scene,x,y,img,frame);
        this.scene = scene;
        this.x = x;
        if(originalX){
            this.originalX = originalX;
        }else{
            this.originalX = x;
        }
        this.y = y;
        if(originalY){
            this.originalY = originalY;
        }else{
            this.originalY = y;
        }
        this.name = name;
        this.targetX = x;
        this.targetY = y;
        this.isMoving = false;
        this.speed = 3;
        this.setDepth(depth);
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
        this.scaleX = 1;
        this.scaleY = 1;
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
            case "overlap":
                this.off('dragenter');
                this.on('dragenter',functionCode);
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

    //animation will always mess up width and height so we have to use this
    changeScale(ratioX,ratioY){
        if(!ratioY){
            ratioY = ratioX;
        }
        this.scaleX = ratioX;
        this.scaleY = ratioY;
    }

    checkOverlap(gameObject){
        let offsetX = this.width*(this.scaleX/2);
        let offsetY = this.height*(this.scaleY/2);
        if (gameObject.y >= this.y - offsetY && gameObject.y <= this.y + offsetY) {
            if (gameObject.x >= this.x - offsetX && gameObject.x <= this.x + offsetX) {
                return true;
            }
        }
        return false;
    }

    setNewPos(newX,newY){
        if(!newX){
            newX = this.x;
        }
        if(!newY){
            newY = this.y;
        }
        this.isMoving = true;
        this.targetX = newX;
        this.targetY = newY;
    }

    setSpeed(newSpeed){
        this.speed = newSpeed;
    }

    move(){
        if(this.isMoving){
            if(this.x < this.targetX){
                if(this.targetX - this.x < this.speed){
                    this.x += this.targetX - this.x
                }else{
                    this.x += this.speed;
                }
            }else{
                if(this.x > this.targetX){
                    if(this.x - this.targetX < this.speed){
                        this.x -= this.x-this.targetX
                    }else{
                        this.x -= this.speed;
                    }
                }
            }
            if(this.y < this.targetY){
                if(this.targetY - this.y < this.speed){
                    this.y += this.targetY - this.x
                }else{
                    this.y += this.speed;
                }
            }else{
                if(this.y > this.targetY){
                    if(this.y - this.targetY < this.speed){
                        this.y -= this.y-this.targetY
                    }else{
                        this.y -= this.speed;
                    }
                }
            }

            if(this.x == this.targetX && this.y == this.targetY){
                this.isMoving = false;
            }
        }
    }

}