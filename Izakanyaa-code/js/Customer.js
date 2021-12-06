import Timer from "./Timer.js";
import Food from "./Food.js";
import "./game.js"

var foods =["Shioyaki",
    "Ikayaki",
    "Onigiri",
    "Cabbage_Salad",
    "Taiyaki",
    "Dorayaki",
    "Daikon_Salad",
    "Sushi",
    "Ebi_Furai",
    "Takoyaki",
    "Ultimate_secret_bowl"];

export default class Customer extends Phaser.GameObjects.Container{
    constructor(data) {
        let{scene,image,place,targetX,edgeX,x,y,bubble} = data
        let customerImg = scene.add.sprite(x,y,image);
        customerImg.flipX= true;
        let bubbleImg = scene.add.image(x+269, y-400, bubble);
        bubbleImg.flipX= true;
        let orderImg = scene.add.image(x+269, y-420);
        let graphics = scene.add.graphics({x: x+55, y: y-275});
        super(scene, x, y, [customerImg,bubbleImg,orderImg,graphics]);

        this.customerImg = customerImg;
        this.graphics = graphics;
        this.bubble = bubbleImg;
        this.bubble.visible = false;

        this.order = this.generateOrder();
        this.order_image = orderImg;
        this.order_image.setTexture(this.order);
        this.order_image.visible = false;

        this.place = place;
        this.scene = scene;
        this.edgeX = edgeX;
        this.targetX = targetX;

        this.delay = scene.delayLeaving;//v sekundách
        this.speed = 10;

        this.isMovingAway = false;
        this.isStanding = false;
        this.gotFood = false;
        this.gotWrongFood = false;
        this.countPoints = false;


        this.timer = null;
        this.showTimer = true;
        this.customerScore = 50;

        //animation of customer
        this.scene.anims.create({
            key: 'move',
            frames: this.scene.anims.generateFrameNumbers('customer', {
                frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]}),
            frameRate: 8,
            repeat: -1
        });
        this.customerImg.play('move');
        
    }
    moveCustomer(){
        //ak je X súradnica menšia tak sa približuj k požadovanej pozíciíí
        if (this.x < this.targetX) {
            this.x += this.speed;
            if (this.x >= this.targetX){
                // zákazník stojí na mieste
                this.isStanding = true;
                //ukáže sa mu bublina a jedlo čo chce
                this.bubble.visible = true;
                this.order_image.visible = true;
                //odíde po určitom čase
                this.timer = this.scene.time.addEvent({ delay: this.delay * 1000, callback: this.customerIsDone, callbackScope: this, loop: false });
            }
        }
    }
    customerIsDone(){
        //zákazník už má toho dosť
        this.isMovingAway = true;
    }
    moveCustomerAway(){
        //ide na kraj scény a ešte ďalej
        if (this.x < this.edgeX+105) {
            this.x += this.speed;
            //je na kraji
            if (this.x >= this.edgeX+105){
                // zákazník odišiel preč
                // pridaj skóre
                console.log(this.customerScore);
                this.scene.score += this.customerScore;

                //uvolni miesto
                if (this.place === 1){
                    this.scene.firstPlaceIsEmpty = true;
                }
                else if (this.place === 2){
                    this.scene.secondPlaceIsEmpty = true;
                }
                else if (this.place === 3){
                    this.scene.thirdPlaceIsEmpty = true;
                }
                //vymaž zákazníka
                this.destroy();
            }
        }
    }


    //Niekto si myslí,že sa táto funkcia sa nepoužíva ale je mimo
    walkOff(){
        //stojí na mieste a dostal jedlo(aj zlé)
        if (this.gotFood && this.isStanding || this.gotWrongFood && this.isStanding){
            this.showTimer = false;
            this.bubble.destroy();
            this.order_image.destroy();
            //zastav timer na "nasratie" zákazníka
            this.timer.paused = true;
            if (!this.countPoints){
                if (this.gotWrongFood){
                    //zlé jedlo
                    this.customerScore = 0;
                }else {
                    if(this.timer.getOverallProgress() <= 0.33){
                        //vynikajúce 150B
                        this.customerScore = this.customerScore * 3;
                    }else if (this.timer.getOverallProgress() <= 0.66){
                        //veľmi dobre 100B
                        this.customerScore = this.customerScore * 2;
                    }
                    else{
                        //dobre 50B
                    }
                }
                this.countPoints = true;
            }
            this.moveCustomerAway();
        }
        //stojí na mieste a nedostal svoje jedlo po dlhšom čase
        else if (this.isMovingAway && this.isStanding){
            this.showTimer = false;
            this.bubble.destroy();
            this.order_image.destroy();
            if (!this.countPoints){
                //-50
                this.customerScore = this.customerScore * (-1);
                this.countPoints = true;
            }
            this.moveCustomerAway();
        }
    }
    generateOrder(){
        if (this.scene.level === 1){
            const random = Math.floor(Math.random() * (foods.length - 6) ) ;
            this.order = foods[random];
            //console.log(random, foods[random]);
            return foods[random];
        }
        else if (this.scene.level === 2){
            const random = Math.floor(Math.random() * (foods.length - 3) ) ;
            this.order = foods[random];
            //console.log(random, foods[random]);
            return foods[random];
        }
        else if (this.scene.level === 3){
            const random = Math.floor(Math.random() * (foods.length -1 ) ) ;
            this.order = foods[random];
            //console.log(random, foods[random]);
            return foods[random];
        }
    }
    setOrderScale(){
        if (this.order === "Shioyaki"){
            this.order_image.setScale(0.9);
        }
        else  if (this.order === "Ultimate_secret_bowl"){
            this.order_image.setScale(0.65);
        }
        else  if (this.order === "Cabbage_Salad"){
            this.order_image.setScale(1.3);
        }
        else  if (this.order === "Daikon_Salad"){
            this.order_image.setScale(1.5);
        }
        else  if (this.order === "Ebi_Furai"){
            this.order_image.x += 10;
        }
    }
    takeFood(food){
        if (!this.gotFood){
            if (food.name === this.order){
                console.log("dostal jedlo")
                this.gotFood = true;
            }
            else {
                console.log("dostal ZLÉ jedlo")
                this.gotWrongFood = true;
            }
        }
    }
    draw(){
        if(this.showTimer){
            let colour;
            if(this.timer.getOverallProgress() <= 0.33){
                colour = 0x58db70;
            }else{
                if(this.timer.getOverallProgress() <= 0.66){
                    colour = 0xf2b93d;
                }else{
                    colour = 0xed463e;
                }
            }
            this.graphics.clear();
            this.graphics.lineStyle(35, colour, 1);
            this.graphics.beginPath();
            let angle = (360 * this.timer.getOverallProgress()-90);
            let radius = 50;
            this.graphics.arc(this.graphics.x,this.graphics.y, radius,Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(angle));
            this.graphics.strokePath();
        }else{
            this.graphics.clear();
            this.graphics.arc(this.x, this.y, 0,Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(0));
            this.graphics.strokePath();
        }
    }
}