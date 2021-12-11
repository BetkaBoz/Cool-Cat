import Button from './Button.js';
export default class RecipeBook extends Phaser.GameObjects.Container{
    constructor(data){
        let{scene, x, y, objectImg, leftArrowImg, rightArrowImg, exitImg, depth, level} = data;
        let bgImg = scene.add.sprite(0,0,objectImg);
        super(scene,x,y,[bgImg]);
        this.scene = scene;
        this.x = x;
        this.originalX = x;
        this.y = y;
        this.depth = depth;
        this.bg = bgImg;
        this.bg.setDepth(this.depth);
        this.left = new Button({scene: scene, x: this.x,y: this.y,img: leftArrowImg, name: "Previous Page Button",depth:this.depth});
        this.left.addFunction("click",function(){
            this.previousPage();
        });
        this.right = new Button({scene: scene, x: this.x,y: this.y,img: rightArrowImg, name: "Next Page Button",depth:this.depth});
        this.right.addFunction("click",function(){
            this.nextPage();
        });
        this.exit = new Button({scene: scene, x: this.x,y: this.y,img: exitImg, name: "Exit Button",depth:this.depth});
        this.pages = [];
        this.pageIdx = 0;
        this.exit("click",function() {
            this.closeBook();
        });
        this.loadPages(level);
        
        this.scene.anims.create({
            key: 'first',
            frames: this.scene.anims.generateFrameNumbers('Cookware', {frames: [0]}),
            frameRate: 8,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'second',
            frames: this.scene.anims.generateFrameNumbers('Cookware', {frames: [1]}),
            frameRate: 8,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'third',
            frames: this.scene.anims.generateFrameNumbers('Cookware', {frames: [2]}),
            frameRate: 8,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'fourth',
            frames: this.scene.anims.generateFrameNumbers('Cookware', {frames: [3]}),
            frameRate: 8,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'last',
            frames: this.scene.anims.generateFrameNumbers('Cookware', {frames: [4]}),
            frameRate: 8,
            repeat: 0
        });

        this.scene.add.existing(this);
        this.closeBook();
    }

    closeBook(){
        this.x = -100;
        //this.scene.resumeGame();
    }

    openBook(){
        this.x = this.originalX;
        this.pageIdx = 0;
        this.bg.play(this.pages[this.pageIdx]);
        //this.scene.pauseGame();
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
                this.right.setAlpha(1);
            }
        }
    }

    previousPage(){
        if(this.pageIdx > 0){
            this.pageIdx--;
            this.bg.play(this.pages[this.pageIdx]);
            if(this.pageIdx == 0){
                this.left.setAlpha(0);
            }else{
                this.left.setAlpha(1);
            }
        }
    }
}