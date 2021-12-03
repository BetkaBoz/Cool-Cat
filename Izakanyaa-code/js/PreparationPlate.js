import Ingredient from "./Ingredient.js";

export default class PreparationPlate extends Phaser.GameObjects.Container {
    constructor(data){
        let{scene, x, y, plateImg, ingredients, foods} = data;
        let plateObj = scene.add.sprite(0,0,plateImg);
        super(scene, x, y, []);
        this.plate = plateObj;
        this.ingredients = ingredients;
        this.potentialFood = foods;
        this.food = foods;
        this.isGarbage = false;
        this.setSize(5,5);
        this.width = this.plate.width;
        this.height = this.plate.height;
        this.plate.x = this.x;
        this.plate.y = this.y;
        this.setInteractive();
        scene.input.setDraggable(this);
        this.on('pointerover',function (){
            this.plate.setTint(0xB0FFFF);
        })
        this.on('pointerout',function (){
            this.plate.clearTint();
        })
        // this.setHit(this);
        this.scene.add.existing(this);
    }

    setHit(self){
        self.input.hitArea.setTo(0,0,this.width,this.height);
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
            if (ingredient.y >= this.y - this.height/2 && ingredient.y <= this.y + this.height/2) {
                if (ingredient.x >= this.x - this.width/2 && ingredient.x <= this.x + this.width/2) {
                    this.addIngredient(ingredient);
                    return true;
                }
            }
        }
        return false;
    }

    updateFoods(){
        this.ingredients.forEach(ingredient => this.potentialFood = this.potentialFood.filter(element => element.ingredients.find(word => word == ingredient.name)));
        if(!this.potentialFood){
            this.isGarbage = true;
        }else{
        if(this.potentialFood.length == 1 && this.potentialFood[0].cookMethod == "mix"&& this.potentialFood[0].ingredients.length == this.ingredients.length){
            if(this.arraysEqual(this.potentialFood[0].ingredients,this.ingredients)){
                let found = this.food.find(element => element.name == this.potentialFood[0].name);
                if(found){
                    found.x = this.x+this.width;
                    found.y = this.y-75;
                    found.setAlpha(1);
                    this.clearIngredients();
                }else {
                    console.log(this.potentialFood.name);
                }
            }else{
                this.isGarbage = true;
            }
        }
            this.isGarbage = false;
        }
    }

    arraysEqual(first, second){
        first.sort();
        second.sort(function (a,b){
            if(a.name < b.name){
                return -1;
            }
            if(a.name > b.name){
                return 1;
            }
            if(a.name = b.name){
                return 0;
            }
        })
        for(let idx = 0; idx < first.length; idx++){
            if(first[idx] != second[idx].name){
                return false;
            }
        }
        return true;
    }

    clearIngredients() {
        this.ingredients.forEach(element => element.destroy());
        this.ingredients.splice(0,this.ingredients.length);
        this.potentialFood = this.food;
    }

}