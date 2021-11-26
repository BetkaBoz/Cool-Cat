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
export default class Food extends Phaser.GameObjects.Container{
    constructor(data) {
        let{scene, x, y, image, type} = data;
        let foodImg = scene.add.image(x,y,image);
        super(scene, x, y, [foodImg]);//objectImg

        this.type = type;

        this.foods =["Shioyaki",
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
        this.scene = scene;



    }







}