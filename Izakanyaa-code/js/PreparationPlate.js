import Ingredient from "./Ingredient";

export default class PreparationPlate extends Phaser.GameObjects.Container {
    constructor(data){
        let{scene, x, y, plateImg, ingredients, foods} = data;
        let plateObj = plateImg;
        super(scene, x, y, []);
        this.plate = plateObj;
        this.ingredients = ingredients;
        this.potentialFood = foods;
        this.food = foods;
        this.isGarbage = false;
        this.setSize(5,5);
        this.width = this.plate.width;
        this.height = this.plate.height * 2;
        this.scene.add.existing(this);
    }

    setHit(self){
        self.input.hitArea.setTo(0,-this.height/4,this.width,this.height);
    }

    addIngredient(ingredient){
        let self = this;
        ingredient.removeInteractive();
        this.ingredients.push(ingredient);
        this.add(ingredient);
        ingredient.x = 0;
        ingredient.y = -10 * this.ingredients.length;
        ingredient.isUsed = true;
        this.updateFoods();
    }

    checkOverlap(ingredient){
        if(ingredient instanceof Ingredient && !(ingredient.isUsed)) {
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