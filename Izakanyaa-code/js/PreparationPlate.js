import Ingredient from "./Ingredient";

export default class PreparationPlate extends Phaser.GameObjects.Container {
    constructor(data){
        let{scene, x, y, plateImg, ingredients, foods} = data;
        let plateObj = plateImg;
        super(scene, x, y, [plateObj]);
        this.plate = plateObj;
        this.ingredients = ingredients;
        this.potentialFood = foods;
        this.food = foods;
        this.isGarbage = false;
        this.scene.add.existing(this);
    }

    addIngredient(ingredient){
        this.ingredients.push(ingredient);
        this.updateFoods();
    }

    checkOverlap(ingredient){
        console.log(ingredient instanceof Ingredient);
        if(ingredient instanceof Ingredient) {
            if (ingredient.y >= this.y - this.plate.height && ingredient.y <= this.y + this.plate.height) {
                if (ingredient.x >= this.x - this.plate.width && ingredient.x <= this.x + this.plate.width) {
                    this.addIngredient(ingredient);
                }
            }
        }
    }

    updateFoods(){
        this.ingredients.forEach(ingredient => this.potentialFood = this.potentialFood.filter(element => element.ingredients.find(word => word == ingredient.name)));
        if(!this.potentialFood){
            this.isGarbage = true;
        }else{
            this.isGarbage = false;
        }
        this.potentialFood.forEach(element => console.log(element.name));
    }

}