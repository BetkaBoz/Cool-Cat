/*
var foods = ["Shioyaki",
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

*/
export default class Food extends Phaser.GameObjects.Sprite{
    constructor(data) {
        let{scene, x, y, image, ingredients, cookMethod} = data;
        super(scene, x, y, image);//objectImg
        this.name = image;
        this.ingredients = ingredients;
        this.cookMethod = cookMethod;
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.scene.add.existing(this);
    }

    setFoodName(name){
        this.name = name;
    }
}