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
        this.plate.setScale(0.56);
        this.setSize(5,5);
        this.width = this.plate.width;
        this.height = this.plate.height/2;
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
        this.scene.anims.create({
            key: 'mix',
            frames: this.scene.anims.generateFrameNumbers('Cookware', {frames: [4,5,6,7]}),
            frameRate: 8,
            //repeat: 1
        });
        // this.setHit(this);
        this.scene.add.existing(this);
    }

    setHit(self){
        self.input.hitArea.setTo(0,0,this.width,this.height);
    }

    addIngredient(ingredient){
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
        if(!this.potentialFood || this.checkForDupes(this.ingredients)){
            this.isGarbage = true;
        }else{
        if(this.potentialFood.length == 1 && this.potentialFood[0].cookMethod == "mix"&& this.potentialFood[0].ingredients.length == this.ingredients.length){
            if(this.arraysEqual(this.potentialFood[0].ingredients,this.ingredients)){
                let found = this.food.find(element => element.name == this.potentialFood[0].name);
                if(found){
                    let animation = this.scene.add.sprite(0,0,"Nothing");
                    animation.setScale(0.5);
                    this.add(animation);
                    animation.play('mix');
                    this.scene.sound.play("mix_sound")
                    animation.on('animationcomplete',function(){
                        let found = this.parentContainer.food.find(element => element.name == this.parentContainer.potentialFood[0].name);
                        if(this.scene.fillSlot(found)){
                            this.parentContainer.clearIngredients();
                        }
                        this.parentContainer.remove(this);
                        this.destroy();
                    })
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

    checkForDupes(array){
        for(let i = 0; i < array.length-1;i++){
            for(let j = i+1; j< array.length;j++){
                console.log(array[i],array[j]);
                if(array[i].name == array[j].name){
                    return true;
                }
            }
        }
        return false;
    }

    arraysEqual(food, ingre){
        if(!food || !ingre){
            console.log("one of them doesn't exist")
            return false;
        }
        if(food.length != ingre.length){
            console.log(food.name);
            console.log("different lenghts");
            return false;
        }
        food.sort();
        ingre.sort(function (a,b){
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
        for(let idx = 0; idx < food.length; idx++){
            if(food[idx] != ingre[idx].name){
                console.log("doesn't equal"+idx);
                return false;
            }
        }
        console.log("finished");
        return true;
    }

    clearIngredients() {
        this.ingredients.forEach(element => element.destroy());
        this.ingredients.splice(0,this.ingredients.length);
        this.potentialFood = this.food;
    }

}