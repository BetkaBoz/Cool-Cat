


export default class Decoration extends Phaser.GameObjects.Container{
    constructor(data) {
        let{scene,image,x,y} = data
        let decorationImg = scene.add.sprite(x,y,image);

        super(scene, x, y, decorationImg);
        this.scene = scene;
        this.decorationImg = decorationImg;

        this.scene.anims.create({
            key: 'glow',
            frames: this.scene.anims.generateFrameNumbers('Bonsai', {
                frames: [0,1,2,3,4,5,6,7,8,9,10]}),
            frameRate: 8,
            repeat: -1
        });

        this.decorationImg.play('glow');

    }

}