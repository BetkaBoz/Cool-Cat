import Timer from "./Timer.js";
import Food from "./Food.js";
import "./game.js"

var foods =["Shioyaki",
    "Ikayaki",
    "Onigiri",
    "Cabbage Salad",
    "Taiyaki",
    "Dorayaki",
    "Daikon Salad",
    "Sushi",
    "Ebi Furai",
    "Takoyaki",
    "Chef’s ultimate secret bowl"];

export default class Customer extends Phaser.GameObjects.Container{
    constructor(data) {
        let{scene, image,place, targetX, edgeX, x, y, bubble} = data
        let customerImg = scene.add.image(x,y,image);
        customerImg.flipX= true;
        let bubbleImg = scene.add.image(x+269, y-400, bubble);
        //let orderImg = scene.add.image(x,y-10,order)
        //super(scene, x, y, [customerImg,bubbleImg,orderImg]);
        super(scene, x, y, [customerImg,bubbleImg]);
        //this.customerImg = image;
        //this.bubbleImg = bubble;
        //this.orderImg = order;
        //this.customer = customerImg;
        this.bubble = bubbleImg;
        this.bubble.visible = false;
        //this.order_image = orderImg;
        this.order = this.generateOrder();
        this.scene = scene;
        this.speed = 10;
        //this.timeLimit = timeLimit;
        //this.counterX = counterX;
        this.edgeX = edgeX;
        this.targetX = targetX;
        this.isMovingAway = false;
        this.isStanding = false;
        this.gotFood = false;
        //this.timedEvent = null;
        this.delay = 2;
        this.place = place;
        this.timer = null;
        this.customerScore = -50;
        //this.score = score;
        //this.removeCustomer(timeOffset);
    }
/*
    moveRight(){
        if(this.isMovingAway) {
            if (this.x < this.targetX) {
                this.x += 10;

            } else {
                this.isMovingAway = false;
                if(this.targetX > this.counterX){
                    this.removeCustomer();
                }else{
                    this.startOrder();
                }
            }
        }
    }
*/
    moveCustomer(){
        //ak je X súradnica menšia tak sa približuj k požadovanej pozíciíí
        if (this.x < this.targetX) {
            this.x += this.speed;
            if (this.x >= this.targetX){
                // zákazník stojí na mieste
                this.isStanding = true;
                //ukáže sa mu bublina a jedlo čo chce
                this.bubble.visible = true;
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
        if (this.x < this.edgeX+105) {
            this.x += this.speed;
            //je na kraji
            if (this.x >= this.edgeX+105){
                // zákazník odišiel preč
                // pridaj skóre
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
        //stojí na mieste a dostal svoje jedlo
        if (this.gotFood && this.isStanding){
            this.bubble.destroy();
            this.timer.paused = true;
            this.moveCustomerAway();

        }
        //stojí na mieste a nedostal svoje jedlo po dlhšom čase
        else if (this.isMovingAway && this.isStanding){
            this.bubble.destroy();
            //ide na kraj scény a ešte ďalej
            this.moveCustomerAway();
        }
    }

    
    generateOrder(){
        let level = 1;  // Keď budeme mať premennú tak to dáme preč zatiaľ to je napevno
        if (level === 1){
            const random = Math.floor(Math.random() * (foods.length - 6) ) ;
            this.order = foods[random];
            //console.log(random, foods[random]);
            return foods[random];
        }
        else if (level === 2){
            const random = Math.floor(Math.random() * (foods.length - 3) ) ;
            this.order = foods[random];
            //console.log(random, foods[random]);
            return foods[random];
        }
        else if (level === 3){
            const random = Math.floor(Math.random() * (foods.length -1 ) ) ;
            this.order = foods[random];
            console.log(random, foods[random]);
            return foods[random];
        }
    }



    takeFood(){
        if (!this.gotFood){

        }


    }




    /*
    startOrder(){
        let showTimer = true;
        this.timedEvent = new Timer({scene: this.scene, x: this.x, y: this.y-10, time: this.timeLimit, showTimer, endEvent: this.walkOff});
    }

    removeCustomer(timeOffset){
        let showTimer = false;
        this.customer.setX(-20);
        if(!(this.timedEvent == null)){
            this.timedEvent.destroy();
        }
        this.timedEvent = new Timer({scene: this.scene, x: this.x, y: this.y-10, time: timeOffset, showTimer, endEvent: this.newCustomer});
    }
    */
}