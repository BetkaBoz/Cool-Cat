export default class FoodSlots extends Phaser.GameObjects.Container{
    constructor(data) {
        let {scene, x, y, slotImg} = data;
        let plate = scene.add.sprite(0,0,slotImg);
        let food = scene.add.sprite(0,0,slotImg);
        super(scene,x,y,[plate,food]);
        this.plate = plate;
        this.plate.setScale(0.5);
        this.food = food;
        this.food.setScale(0.5);
        this.food.setAlpha(0);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.isFilled = false;
        this.depth = 26;
        this.scene.add.existing(this);
        this.setDepth(this.depth);
    }

    makeInteractive(functionCode){
        this.food.setInteractive();
        this.scene.input.setDraggable(this.food);
        if(this.isFilled){
            this.food.on('dragend',functionCode);
        }else{
            this.food.off('dragend');
        }
    }

    addFood(food){
        this.isFilled = true;
        this.food = food;
        this.plate.setAlpha(0);
        this.food.setAlpha(1);
        this.food.x = this.x;
        this.food.y = this.y;
        this.food.setDepth(this.depth);
        this.food.setScale(0.5);
    }

    removeFood(){
        this.isFilled = false;
        this.plate.setAlpha(1);
        this.food.setAlpha(0);
        this.food.x = -100;
    }
}