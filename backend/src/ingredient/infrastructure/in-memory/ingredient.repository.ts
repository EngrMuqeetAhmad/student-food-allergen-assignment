import { Injectable } from "@nestjs/common";
import { IngredientInterface } from "src/ingredient/domain/ingredient.interface";
import { Ingredient } from "src/ingredient/domain/ingredient.model";

@Injectable()
export class InMemortIngredientRepository implements IngredientInterface {

    private ingredients: Ingredient[] = []

    constructor() { }

    findAll(): Ingredient[] {
        return this.ingredients;
    }

    findById(id: number): Ingredient | undefined {
        return this.ingredients.find(ingredient => ingredient.id == id);
    }

}