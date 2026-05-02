import { Injectable } from "@nestjs/common";
import { IngredientInterface } from "src/ingredient/domain/ingredient.interface";
import { Ingredient } from "src/ingredient/domain/ingredient.model";
import { IngredientsData } from "src/seed/ingredient.seed";

@Injectable()
export class InMemortIngredientRepository implements IngredientInterface {

    private ingredients: Ingredient[] = []

    constructor() {
        this.ingredients = IngredientsData
    }

    findAll(): Ingredient[] {
        return this.ingredients;
    }

    findById(id: number): Ingredient | undefined {
        return this.ingredients.find(ingredient => ingredient.id == id);
    }

}