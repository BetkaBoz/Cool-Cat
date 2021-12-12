import Button from './Button.js';
export default class RecipeBook extends Phaser.GameObjects.Container{
    constructor(data){
        let{scene, x, y, objectImg, leftArrowImg, rightArrowImg, exitImg, depth, level} = data;
        let bgImg = scene.add.sprite(0,0,objectImg);
        super(scene,x,y,[bgImg]);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.depth = depth;
        this.setScale(1.5);
        this.bg = bgImg;
        this.bg.setDepth(this.depth);
        this.left = new Button({scene: scene, x: -130,y: 130,img: leftArrowImg, name: "Previous Page Button",depth:this.depth});
        this.left.setScale(0.1);
        this.add(this.left);
        this.left.addFunction("click",function(){
            this.parentContainer.previousPage();
        });
        this.right = new Button({scene: scene, x: 130,y: 130,img: rightArrowImg, name: "Next Page Button",depth:this.depth});
        this.right.setScale(0.1);
        this.add(this.right);
        this.right.addFunction("click",function(){
            this.parentContainer.nextPage();
        });
        this.exit = new Button({scene: scene, x: -135,y: -145,img: exitImg, name: "Exit Button",depth:this.depth});
        this.exit.setScale(0.35);
        this.add(this.exit);
        this.exit.addFunction("click",function() {
            this.parentContainer.closeBook();
        });
        this.pages = [];
        this.pageIdx = 0;
        this.loadPages(level);
        
        this.scene.anims.create({
            key: 'first',
            frames: this.scene.anims.generateFrameNumbers('RecipeBook', {frames: [0]}),
            frameRate: 8
        });
        this.scene.anims.create({
            key: 'second',
            frames: this.scene.anims.generateFrameNumbers('RecipeBook', {frames: [1]}),
            frameRate: 8
        });
        this.scene.anims.create({
            key: 'third',
            frames: this.scene.anims.generateFrameNumbers('RecipeBook', {frames: [2]}),
            frameRate: 8
        });
        this.scene.anims.create({
            key: 'fourth',
            frames: this.scene.anims.generateFrameNumbers('RecipeBook', {frames: [3]}),
            frameRate: 8
        });
        this.scene.anims.create({
            key: 'last',
            frames: this.scene.anims.generateFrameNumbers('RecipeBook', {frames: [4]}),
            frameRate: 8
        });

        this.scene.add.existing(this);
        this.closeBook();
    }

    closeBook(){
        this.setAlpha(0);
        //this.scene.resumeGame();
    }

    openBook(){
        this.setAlpha(1);
        this.pageIdx = 0;
        this.bg.play(this.pages[this.pageIdx]);
        this.left.setAlpha(0);
        this.right.setAlpha(1);
    }

    loadPages(curLevel){
        this.pages.splice(0,this.pages.length-1);
        this.pages.push('first');
        this.pages.push('second');
        if(curLevel >1){
            this.pages.push('third');
            if(curLevel>2){
                this.pages.push('fourth');
            }
        }
        this.pages.push('last');
        this.pageIdx = 0;
    }

    nextPage(){
        if(this.pageIdx < this.pages.length){
            this.pageIdx++;
            this.bg.play(this.pages[this.pageIdx]);
            if(this.pageIdx == this.pages.length-1){
                this.right.setAlpha(0);
            }else{
                this.left.setAlpha(1);
            }
        }
    }

    previousPage(){
        console.log("yip yip");
        if(this.pageIdx > 0){
            this.pageIdx--;
            this.bg.play(this.pages[this.pageIdx]);
            if(this.pageIdx == 0){
                this.left.setAlpha(0);
            }else{
                this.right.setAlpha(1);
            }
        }
    }
}