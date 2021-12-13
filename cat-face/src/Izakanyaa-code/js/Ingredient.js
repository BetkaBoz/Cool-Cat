
export default class Ingredient extends Phaser.GameObjects.Sprite{
    constructor(data) {
        let {scene, x, y, img, name} = data;
        super(scene, x, y, img);
        this.name = name;
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.isUsed = false;
        this.setDepth(27);
        this.scene.add.existing(this);
    }

    // addInteractivity(){
    //
    // }
}