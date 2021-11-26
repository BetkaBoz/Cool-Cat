import Timer from "./Timer.js";
import Food from "./Food.js";
let scene;

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
        let{scene, image, counterX, edgeX, x, y, timeLimit, timeOffset, order, bubble, score} = data
        let customerImg = scene.add.image(x,y,image);
        let bubbleImg = scene.add.image(x, y-10, bubble);
        let orderImg = scene.add.image(x,y-10,order)
        super(scene, x, y, [customerImg,bubbleImg,orderImg]);
        this.customerImg = image;
        this.bubbleImg = bubble;
        this.orderImg = order;
        this.customer = customerImg;
        this.bubble = bubbleImg;
        this.order_image = orderImg;
        this.order = "nothing";
        this.scene = scene;
        this.timeLimit = timeLimit;
        this.counterX = counterX;
        this.edgeX = edgeX;
        this.targetX = this.counterX;
        this.timedEvent = null;
        this.isMoving = false;
        this.score = score;
        this.removeCustomer(timeOffset);
    }

    moveRight(){
        if(this.isMoving) {
            if (this.x < this.targetX) {
                this.x += 0.1;
            } else {
                this.isMoving = false;
                if(this.targetX > this.counterX){
                    this.removeCustomer();
                }else{
                    this.startOrder();
                }
            }
        }
    }

    walkOff(){
        this.score = -50;
        this.targetX = this.edgeX;
        this.bubble.destroy();
        this.order_image.destroy();
        this.isMoving = true;
    }

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

    newCustomer(){
        //this.customer = scene.add.image(this.x,this.y, this.customerImg);
        this.customer.setX(this.x);
        this.targetX = this.counterX;

    }

    generateOrder(){
        let level = 1;  // Keď budeme mať premennú tak to dáme preč zatiaľ je to je napevno
        if (level === 1){
            const random = Math.floor(Math.random() * (foods.length - 6) ) ;
            this.order = foods[random];
            console.log(random, foods[random]);
        }
        else if (level === 2){
            const random = Math.floor(Math.random() * (foods.length - 3) ) ;
            this.order = foods[random];
            console.log(random, foods[random]);
        }
        else if (level === 3){
            const random = Math.floor(Math.random() * (foods.length ) ) ;
            this.order = foods[random];
            console.log(random, foods[random]);
        }


    }
}