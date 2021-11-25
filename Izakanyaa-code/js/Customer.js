import Timer from "./Timer";

let scene;
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
        this.order = orderImg;
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
        this.order.destroy();
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
}